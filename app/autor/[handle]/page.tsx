import { notFound } from "next/navigation";
import Link from "next/link";
import { loadDoc } from "@/lib/content";
import { PIEZAS, getPiezasConShopify } from "@/lib/piezas";
import { PiezaCard } from "@/components/PiezaCard";
import { Placeholder } from "@/components/Placeholder";
import { MarceloBanner } from "@/components/MarceloBanner";

type AutorFrontmatter = {
  nombre: string;
  oficio?: string;
  ciudad?: string;
  anos_oficio?: number | string;
  taller?: string;
  vol?: string;
};

const AUTORES_REGISTRADOS = ["marcelo-rojas"];

export async function generateStaticParams() {
  return AUTORES_REGISTRADOS.map((handle) => ({ handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  if (!AUTORES_REGISTRADOS.includes(handle)) return {};
  try {
    const doc = loadDoc<AutorFrontmatter>("autores", handle);
    return { title: doc.frontmatter.nombre };
  } catch {
    return {};
  }
}

export default async function AutorPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  if (!AUTORES_REGISTRADOS.includes(handle)) notFound();

  const doc = loadDoc<AutorFrontmatter>("autores", handle);
  const obras = await getPiezasConShopify(
    PIEZAS.filter((p) => p.autor === doc.frontmatter.nombre)
  );

  return (
    <div>
      <MarceloBanner showCTA={false} />

      <section className="border-b border-linea/60">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <dl className="text-sm text-ceniza grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-8">
            {doc.frontmatter.oficio && (
              <div>
                <dt className="eyebrow mb-1">Oficio</dt>
                <dd>{doc.frontmatter.oficio}</dd>
              </div>
            )}
            {doc.frontmatter.ciudad && (
              <div>
                <dt className="eyebrow mb-1">Ciudad</dt>
                <dd>{doc.frontmatter.ciudad}</dd>
              </div>
            )}
            {doc.frontmatter.anos_oficio && (
              <div>
                <dt className="eyebrow mb-1">Años de oficio</dt>
                <dd>{doc.frontmatter.anos_oficio}</dd>
              </div>
            )}
            {doc.frontmatter.taller && (
              <div>
                <dt className="eyebrow mb-1">Taller</dt>
                <dd>{doc.frontmatter.taller}</dd>
              </div>
            )}
          </dl>
        </div>
      </section>

      <section className="border-b border-linea/60">
        <article className="mx-auto max-w-2xl px-6 py-20">
          <div
            className="prose-oria text-lg"
            dangerouslySetInnerHTML={{ __html: doc.html }}
          />
        </article>
      </section>

      <section className="border-b border-linea/60">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="display text-3xl mb-8">Obras firmadas</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {obras.map(({ pieza, image, price, availableForSale }) => (
              <PiezaCard
                key={pieza.slug}
                pieza={pieza}
                image={image}
                price={price}
                availableForSale={availableForSale}
              />
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/vol-01"
              className="text-sm underline underline-offset-4 hover:text-sepia transition"
            >
              ← Volver al Vol. 01
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
