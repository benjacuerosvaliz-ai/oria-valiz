import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PIEZAS, getPieza } from "@/lib/piezas";
import { loadDoc } from "@/lib/content";
import { getProductByHandle, formatCLP, hasShopify } from "@/lib/shopify";
import { Placeholder } from "@/components/Placeholder";
import { AddToCart } from "@/components/AddToCart";

type PiezaFrontmatter = {
  gesto?: string;
  materiales?: string;
  tiempo?: string;
};

export async function generateStaticParams() {
  return PIEZAS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pieza = getPieza(slug);
  if (!pieza) return {};
  return {
    title: `${pieza.titulo} · ${pieza.autor}`,
  };
}

export default async function PiezaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pieza = getPieza(slug);
  if (!pieza) notFound();

  let doc;
  try {
    doc = loadDoc<PiezaFrontmatter>("piezas", slug);
  } catch {
    doc = null;
  }

  const shopProduct = await getProductByHandle(pieza.shopifyHandle);

  return (
    <article className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Galería */}
        {shopProduct?.featuredImage ? (
          <div className="space-y-3">
            <div className="aspect-[4/5] bg-archivo border border-linea/50 overflow-hidden">
              <Image
                src={shopProduct.featuredImage.url}
                alt={shopProduct.featuredImage.altText ?? pieza.titulo}
                width={800}
                height={1000}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            {shopProduct.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {shopProduct.images.slice(0, 4).map((img, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-archivo border border-linea/50 overflow-hidden"
                  >
                    <Image
                      src={img.url}
                      alt={img.altText ?? `${pieza.titulo} ${i + 1}`}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Placeholder label="Galería de fotos" height="640px">
            Aquí van las imágenes de la pieza. Llegan automáticas cuando se
            conecte Shopify Storefront API (o cuando subas fotos al producto
            en Shopify Admin).
          </Placeholder>
        )}

        {/* Info + compra */}
        <div className="flex flex-col">
          <p className="eyebrow mb-4">{pieza.autor}</p>
          <h1 className="display text-5xl md:text-6xl mb-3">{pieza.titulo}</h1>
          {pieza.subtitulo && (
            <p className="text-ceniza italic text-lg mb-6">
              {pieza.subtitulo}
            </p>
          )}

          {shopProduct ? (
            <p className="display text-3xl mb-8">
              {formatCLP(shopProduct.priceRange.minVariantPrice.amount)}
              {!shopProduct.availableForSale && (
                <span className="ml-3 text-xs text-ceniza align-middle">
                  · agotado
                </span>
              )}
            </p>
          ) : (
            <p className="text-sm text-ceniza mb-8 italic">
              {hasShopify()
                ? "Precio no disponible."
                : "Precio aparece cuando se conecte Shopify."}
            </p>
          )}

          {doc ? (
            <div
              className="prose-oria text-base"
              dangerouslySetInnerHTML={{ __html: doc.html }}
            />
          ) : (
            <Placeholder label="Texto editorial de la pieza">
              Sin contenido aún. Crear <code>content/piezas/{slug}.md</code>.
            </Placeholder>
          )}

          {doc?.frontmatter && (
            <dl className="mt-10 border-t border-linea/60 pt-6 grid grid-cols-2 gap-y-3 gap-x-8 text-sm text-ceniza">
              {doc.frontmatter.gesto && (
                <>
                  <dt className="eyebrow">Gesto</dt>
                  <dd>{doc.frontmatter.gesto}</dd>
                </>
              )}
              {doc.frontmatter.materiales && (
                <>
                  <dt className="eyebrow">Materiales</dt>
                  <dd>{doc.frontmatter.materiales}</dd>
                </>
              )}
              {doc.frontmatter.tiempo && (
                <>
                  <dt className="eyebrow">Tiempo de taller</dt>
                  <dd>{doc.frontmatter.tiempo}</dd>
                </>
              )}
            </dl>
          )}

          {hasShopify() ? (
            <AddToCart handle={pieza.shopifyHandle} />
          ) : (
            <div className="mt-12">
              <a
                href={`https://www.valiz.cl/products/${pieza.shopifyHandle}`}
                className="block w-full bg-tinta text-papel px-6 py-4 text-sm tracking-wide text-center hover:bg-sepia transition"
              >
                Llevar esta pieza →
              </a>
              <p className="mt-3 text-xs text-ceniza text-center">
                Mientras conectamos Shopify, el checkout se realiza en valiz.cl.
              </p>
            </div>
          )}

          <Link
            href="/autor/marcelo-rojas"
            className="mt-8 text-sm underline underline-offset-4 hover:text-sepia transition self-start"
          >
            ← Conocer a {pieza.autor}
          </Link>
        </div>
      </div>
    </article>
  );
}
