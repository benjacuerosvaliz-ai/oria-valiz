/**
 * Shopify Storefront API client + cart mutations.
 *
 * Store: valiz-cl.myshopify.com (compartido con Valiz; los productos ORIA
 * viven en la colección "ORIA" del mismo store).
 *
 * El token Storefront es público-seguro y va en NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN
 * (o SHOPIFY_STOREFRONT_TOKEN). Si falta, las funciones devuelven null y la UI
 * cae a un fallback amable.
 */

const SHOPIFY_DOMAIN = "valiz-cl.myshopify.com";
const API_VERSION = "2025-01";

function token(): string | null {
  return (
    process.env.SHOPIFY_STOREFRONT_TOKEN ||
    process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN ||
    null
  );
}

export function hasShopify(): boolean {
  return token() !== null;
}

type GqlResponse<T> = { data?: T; errors?: { message: string }[] };

async function gql<T>(
  query: string,
  variables: Record<string, unknown> = {},
  opts: { cache?: RequestCache; revalidate?: number } = {}
): Promise<T | null> {
  const t = token();
  if (!t) return null;
  const res = await fetch(
    `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": t,
      },
      body: JSON.stringify({ query, variables }),
      cache: opts.cache,
      next: opts.revalidate !== undefined ? { revalidate: opts.revalidate } : undefined,
    }
  );
  if (!res.ok) {
    console.error("[shopify] HTTP", res.status, await res.text().catch(() => ""));
    return null;
  }
  const json = (await res.json()) as GqlResponse<T>;
  if (json.errors?.length) {
    console.error("[shopify] errors", json.errors);
    return null;
  }
  return json.data ?? null;
}

// ─────────────────────── Productos ───────────────────────

export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
  };
  featuredImage: { url: string; altText: string | null } | null;
  images: { url: string; altText: string | null }[];
  variants: {
    id: string;
    title: string;
    availableForSale: boolean;
    price: { amount: string; currencyCode: string };
  }[];
};

const PRODUCT_FIELDS = /* GraphQL */ `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    availableForSale
    priceRange {
      minVariantPrice { amount currencyCode }
    }
    featuredImage { url altText }
    images(first: 8) {
      edges { node { url altText } }
    }
    variants(first: 12) {
      edges {
        node {
          id
          title
          availableForSale
          price { amount currencyCode }
        }
      }
    }
  }
`;

function normalizeProduct(p: {
  id: string;
  handle: string;
  title: string;
  description: string;
  availableForSale: boolean;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  featuredImage: { url: string; altText: string | null } | null;
  images: { edges: { node: { url: string; altText: string | null } }[] };
  variants: {
    edges: {
      node: {
        id: string;
        title: string;
        availableForSale: boolean;
        price: { amount: string; currencyCode: string };
      };
    }[];
  };
}): ShopifyProduct {
  return {
    id: p.id,
    handle: p.handle,
    title: p.title,
    description: p.description,
    availableForSale: p.availableForSale,
    priceRange: p.priceRange,
    featuredImage: p.featuredImage,
    images: p.images.edges.map((e) => e.node),
    variants: p.variants.edges.map((e) => e.node),
  };
}

export async function getProductByHandle(
  handle: string
): Promise<ShopifyProduct | null> {
  const data = await gql<{ product: Parameters<typeof normalizeProduct>[0] | null }>(
    `${PRODUCT_FIELDS}
    query GetProduct($handle: String!) {
      product: productByHandle(handle: $handle) { ...ProductFields }
    }`,
    { handle },
    { revalidate: 300 }
  );
  if (!data?.product) return null;
  return normalizeProduct(data.product);
}

// ─────────────────────── Cart ───────────────────────

export type CartLine = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      handle: string;
      title: string;
      featuredImage: { url: string; altText: string | null } | null;
    };
    price: { amount: string; currencyCode: string };
  };
  cost: {
    totalAmount: { amount: string; currencyCode: string };
  };
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: { amount: string; currencyCode: string };
    totalAmount: { amount: string; currencyCode: string };
  };
  lines: CartLine[];
};

const CART_FIELDS = /* GraphQL */ `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount { amount currencyCode }
    }
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount { amount currencyCode }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              price { amount currencyCode }
              product {
                handle
                title
                featuredImage { url altText }
              }
            }
          }
        }
      }
    }
  }
`;

function normalizeCart(c: {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: { amount: string; currencyCode: string };
    totalAmount: { amount: string; currencyCode: string };
  };
  lines: { edges: { node: Omit<CartLine, "merchandise"> & { merchandise: CartLine["merchandise"] } }[] };
}): Cart {
  return {
    id: c.id,
    checkoutUrl: c.checkoutUrl,
    totalQuantity: c.totalQuantity,
    cost: c.cost,
    lines: c.lines.edges.map((e) => e.node),
  };
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const data = await gql<{ cart: Parameters<typeof normalizeCart>[0] | null }>(
    `${CART_FIELDS}
    query GetCart($id: ID!) {
      cart(id: $id) { ...CartFields }
    }`,
    { id: cartId },
    { cache: "no-store" }
  );
  if (!data?.cart) return null;
  return normalizeCart(data.cart);
}

type CartMutationResult = { cart: Parameters<typeof normalizeCart>[0] | null };

export async function createCart(
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart | null> {
  const data = await gql<{ cartCreate: CartMutationResult }>(
    `${CART_FIELDS}
    mutation CreateCart($input: CartInput!) {
      cartCreate(input: $input) {
        cart { ...CartFields }
      }
    }`,
    { input: { lines } },
    { cache: "no-store" }
  );
  if (!data?.cartCreate.cart) return null;
  return normalizeCart(data.cartCreate.cart);
}

export async function addLines(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart | null> {
  const data = await gql<{ cartLinesAdd: CartMutationResult }>(
    `${CART_FIELDS}
    mutation AddLines($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
      }
    }`,
    { cartId, lines },
    { cache: "no-store" }
  );
  if (!data?.cartLinesAdd.cart) return null;
  return normalizeCart(data.cartLinesAdd.cart);
}

export async function updateLines(
  cartId: string,
  lines: { id: string; quantity: number }[]
): Promise<Cart | null> {
  const data = await gql<{ cartLinesUpdate: CartMutationResult }>(
    `${CART_FIELDS}
    mutation UpdateLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
      }
    }`,
    { cartId, lines },
    { cache: "no-store" }
  );
  if (!data?.cartLinesUpdate.cart) return null;
  return normalizeCart(data.cartLinesUpdate.cart);
}

export async function removeLines(
  cartId: string,
  lineIds: string[]
): Promise<Cart | null> {
  const data = await gql<{ cartLinesRemove: CartMutationResult }>(
    `${CART_FIELDS}
    mutation RemoveLines($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ...CartFields }
      }
    }`,
    { cartId, lineIds },
    { cache: "no-store" }
  );
  if (!data?.cartLinesRemove.cart) return null;
  return normalizeCart(data.cartLinesRemove.cart);
}

// ─────────────────────── Helpers ───────────────────────

export function formatCLP(amount: string | number): string {
  const n = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(n);
}
