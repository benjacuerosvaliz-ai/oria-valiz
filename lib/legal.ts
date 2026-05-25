import { getPage, getShopPolicies, type ShopPolicies } from "@/lib/shopify";

/**
 * Páginas legales / informativas de ORIA.
 *
 * Filosofía: ORIA tiene URLs propias (/legal/garantia, /legal/envios, etc.)
 * pero el CONTENIDO viene en vivo del store Shopify de Valiz. Eso garantiza:
 * - URLs propias y branding ORIA en la navegación.
 * - Una sola fuente de verdad: si Valiz actualiza una política, ORIA refleja
 *   sin redeploy y sin desincronización.
 *
 * El "About / Nosotros" de Valiz NO se replica acá. ORIA tiene su propio
 * manifiesto (/manifiesto) que cuenta el sello editorial, no la marca Valiz.
 */

export type LegalDoc = {
  title: string;
  body: string;
};

export type LegalSection = {
  slug: string;
  label: string;
  group: "informacion" | "legales";
  loader: () => Promise<LegalDoc | null>;
};

function pageLoader(handle: string) {
  return async (): Promise<LegalDoc | null> => {
    const p = await getPage(handle);
    return p ? { title: p.title, body: p.body } : null;
  };
}

function policyLoader(key: keyof ShopPolicies) {
  return async (): Promise<LegalDoc | null> => {
    const policies = await getShopPolicies();
    if (!policies) return null;
    const policy = policies[key];
    return policy ? { title: policy.title, body: policy.body } : null;
  };
}

export const LEGAL_SECTIONS: LegalSection[] = [
  // Páginas informativas
  {
    slug: "garantia",
    label: "Garantía",
    group: "informacion",
    loader: pageLoader("garantia"),
  },
  {
    slug: "cambios",
    label: "Cambios y devoluciones",
    group: "informacion",
    loader: pageLoader("cambios"),
  },
  {
    slug: "preguntas",
    label: "Preguntas frecuentes",
    group: "informacion",
    loader: pageLoader("preguntas-frecuentes"),
  },
  {
    slug: "donde-estamos",
    label: "Dónde estamos",
    group: "informacion",
    loader: pageLoader("donde-encontrarnos"),
  },
  // Políticas Shopify
  {
    slug: "envios",
    label: "Política de envíos",
    group: "legales",
    loader: policyLoader("shippingPolicy"),
  },
  {
    slug: "reembolso",
    label: "Política de reembolso",
    group: "legales",
    loader: policyLoader("refundPolicy"),
  },
  {
    slug: "privacidad",
    label: "Política de privacidad",
    group: "legales",
    loader: policyLoader("privacyPolicy"),
  },
  {
    slug: "terminos",
    label: "Términos del servicio",
    group: "legales",
    loader: policyLoader("termsOfService"),
  },
];

export function getLegalSection(slug: string): LegalSection | undefined {
  return LEGAL_SECTIONS.find((s) => s.slug === slug);
}

export function legalByGroup(group: LegalSection["group"]): LegalSection[] {
  return LEGAL_SECTIONS.filter((s) => s.group === group);
}
