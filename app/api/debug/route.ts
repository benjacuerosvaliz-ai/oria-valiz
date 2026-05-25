import { NextResponse } from "next/server";
import { getProductByHandle, hasShopify } from "@/lib/shopify";
import { PIEZAS } from "@/lib/piezas";

/**
 * Endpoint de diagnóstico temporal. NO devuelve nada secreto — solo info
 * pública del catálogo, útil para validar que los handles del mock coincidan
 * con los reales en Shopify. Borrar este archivo cuando el catálogo esté
 * sincronizado.
 *
 * GET /api/debug                → estado de cada handle del mock
 * GET /api/debug?list=oria      → lista productos cuyo título incluye "ORIA"
 * GET /api/debug?list=all       → lista los primeros 50 productos del store
 */

const SHOPIFY_DOMAIN = "valiz-cl.myshopify.com";
const API_VERSION = "2025-01";

async function gqlRaw<T>(query: string, variables: Record<string, unknown> = {}): Promise<T | { error: string }> {
  const token = process.env.SHOPIFY_STOREFRONT_TOKEN || process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
  if (!token) return { error: "no token" };
  const res = await fetch(
    `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
    }
  );
  if (!res.ok) return { error: `HTTP ${res.status}` };
  const json = await res.json();
  if (json.errors) return { error: JSON.stringify(json.errors) };
  return json.data;
}

export async function GET(req: Request) {
  if (!hasShopify()) {
    return NextResponse.json({ ok: false, reason: "no token configured" });
  }

  const url = new URL(req.url);
  const list = url.searchParams.get("list");
  const inspect = url.searchParams.get("inspect");

  if (inspect === "token") {
    const t = process.env.SHOPIFY_STOREFRONT_TOKEN || process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || "";
    const probe = await gqlRaw<{ shop: { name: string } }>(`{ shop { name } }`);
    return NextResponse.json({
      ok: true,
      tokenSource: process.env.SHOPIFY_STOREFRONT_TOKEN ? "SHOPIFY_STOREFRONT_TOKEN" : process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN ? "NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN" : "none",
      tokenLength: t.length,
      tokenPrefix: t.slice(0, 4),
      tokenSuffix: t.slice(-4),
      tokenHasWhitespace: /\s/.test(t),
      tokenStartsWithAtkn: t.startsWith("atkn_"),
      tokenStartsWithShpat: t.startsWith("shpat_"),
      shopProbe: probe,
      apiDomain: "valiz-cl.myshopify.com",
      apiVersion: "2025-01",
    });
  }

  if (list === "all" || list === "oria") {
    const query = list === "oria"
      ? `query { products(first: 50, query: "title:ORIA") { edges { node { handle title availableForSale } } } }`
      : `query { products(first: 50) { edges { node { handle title availableForSale } } } }`;
    const data = await gqlRaw<{ products: { edges: { node: { handle: string; title: string; availableForSale: boolean } }[] } }>(query);
    if ("error" in data) {
      return NextResponse.json({ ok: false, error: data.error });
    }
    return NextResponse.json({
      ok: true,
      filter: list,
      count: data.products.edges.length,
      products: data.products.edges.map((e) => e.node),
    });
  }

  // Default: validar handles del mock. Bypass de cache para diagnóstico.
  const freshQuery = `
    query Probe($handle: String!) {
      product: productByHandle(handle: $handle) {
        handle
        title
        availableForSale
        totalInventory
        priceRange { minVariantPrice { amount currencyCode } }
        variants(first: 5) {
          edges {
            node {
              title
              availableForSale
              quantityAvailable
              price { amount currencyCode }
            }
          }
        }
      }
    }`;
  const results = await Promise.all(
    PIEZAS.map(async (p) => {
      const data = await gqlRaw<{ product: { handle: string; title: string; availableForSale: boolean; totalInventory: number | null; priceRange: { minVariantPrice: { amount: string; currencyCode: string } }; variants: { edges: { node: { title: string; availableForSale: boolean; quantityAvailable: number | null; price: { amount: string; currencyCode: string } } }[] } } | null }>(freshQuery, { handle: p.shopifyHandle });
      if ("error" in data) {
        return { slug: p.slug, mockHandle: p.shopifyHandle, found: false, error: data.error };
      }
      const product = data.product;
      return {
        slug: p.slug,
        mockHandle: p.shopifyHandle,
        found: !!product,
        realTitle: product?.title ?? null,
        availableForSale: product?.availableForSale ?? null,
        totalInventory: product?.totalInventory ?? null,
        priceMin: product?.priceRange.minVariantPrice ?? null,
        variants: product?.variants.edges.map((e) => e.node) ?? [],
      };
    })
  );

  const found = results.filter((r) => r.found).length;
  return NextResponse.json({
    ok: true,
    summary: `${found}/${results.length} handles encontrados`,
    results,
    hint: found === 0
      ? "Ningún handle del mock matcheó. Llamar GET /api/debug?list=oria para ver los handles reales."
      : found < results.length
        ? "Algunos handles del mock no matchearon. Revisar /api/debug?list=oria."
        : "Todos los handles del mock están bien.",
  });
}
