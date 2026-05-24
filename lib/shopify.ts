/**
 * Cliente Shopify Storefront API — esqueleto.
 *
 * Activación pendiente Sesión 3: cuando tengamos el Storefront API token del
 * store valiz-cl, completar fetchProductByHandle() y reemplazar el mock de
 * lib/piezas.ts por consulta live.
 *
 * Notas:
 * - Store: valiz-cl.myshopify.com (mismo que Valiz; cart redirige a checkout valiz.cl).
 * - El token va en .env.local como SHOPIFY_STOREFRONT_TOKEN.
 * - Aislamiento: este archivo NUNCA debe importar nada de valiz-bitacora.
 */

const SHOPIFY_DOMAIN = "valiz-cl.myshopify.com";
const API_VERSION = "2025-01";

export async function fetchProductByHandle(handle: string) {
  const token = process.env.SHOPIFY_STOREFRONT_TOKEN;
  if (!token) {
    return null;
  }

  const query = /* GraphQL */ `
    query GetProduct($handle: String!) {
      productByHandle(handle: $handle) {
        id
        handle
        title
        description
        priceRange {
          minVariantPrice { amount currencyCode }
        }
        featuredImage { url altText }
        images(first: 6) {
          edges { node { url altText } }
        }
      }
    }
  `;

  const res = await fetch(
    `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({ query, variables: { handle } }),
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) return null;
  const json = await res.json();
  return json.data?.productByHandle ?? null;
}
