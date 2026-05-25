/**
 * Catálogo inicial ORIA Vol. 01.
 *
 * Hoy es mock estático con los 7 productos ya activos en Shopify (colección "ORIA",
 * vendor "Valiz"). En Sesión 3 esto se reemplaza por consulta live a Shopify
 * Storefront API — ver lib/shopify.ts.
 *
 * Los slugs deben coincidir con los handles que tendrán en Shopify para que
 * /pieza/[slug] mapee 1:1.
 */

export type Pieza = {
  slug: string;
  titulo: string;
  subtitulo?: string;
  autor: string;
  shopifyHandle: string;
};

export const PIEZAS: Pieza[] = [
  {
    slug: "cartera-saco",
    titulo: "Cartera saco",
    subtitulo: "Forma simple, carácter propio",
    autor: "Marcelo Rojas",
    shopifyHandle: "cartera-saco-oria",
  },
  {
    slug: "mochila",
    titulo: "Mochila",
    autor: "Marcelo Rojas",
    shopifyHandle: "mochila-oria",
  },
  {
    slug: "neceser",
    titulo: "Neceser",
    autor: "Marcelo Rojas",
    shopifyHandle: "neceser-oria",
  },
  {
    slug: "cartera-tote",
    titulo: "Cartera Tote",
    autor: "Marcelo Rojas",
    shopifyHandle: "cartera-tote-oria",
  },
  {
    slug: "funda-computador",
    titulo: "Funda de computador",
    autor: "Marcelo Rojas",
    shopifyHandle: "funda-de-computador-marcelo-oria",
  },
  {
    slug: "tarjetero",
    titulo: "Tarjetero",
    autor: "Marcelo Rojas",
    shopifyHandle: "tarjetero-oria",
  },
  {
    slug: "juego-cartas",
    titulo: "Juego de cartas",
    autor: "Marcelo Rojas",
    shopifyHandle: "juego-de-cartas-oria",
  },
];

export function getPieza(slug: string): Pieza | undefined {
  return PIEZAS.find((p) => p.slug === slug);
}

/**
 * Une el mock estático con los datos vivos de Shopify (precio, foto, stock).
 * Usado en grids (home, vol-01, perfil de autor) para mostrar fichas vendibles.
 */
import { getProductByHandle } from "@/lib/shopify";

export type PiezaConShopify = {
  pieza: Pieza;
  image: { url: string; altText: string | null } | null;
  price: { amount: string; currencyCode: string } | null;
  availableForSale: boolean | null;
};

export async function getPiezasConShopify(
  piezas: Pieza[] = PIEZAS
): Promise<PiezaConShopify[]> {
  return Promise.all(
    piezas.map(async (p) => {
      const product = await getProductByHandle(p.shopifyHandle);
      return {
        pieza: p,
        image: product?.featuredImage ?? null,
        price: product?.priceRange.minVariantPrice ?? null,
        availableForSale: product?.availableForSale ?? null,
      };
    })
  );
}
