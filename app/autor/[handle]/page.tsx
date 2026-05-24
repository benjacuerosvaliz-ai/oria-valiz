import { notFound } from "next/navigation";
import Link from "next/link";
import { loadDoc } from "@/lib/content";
import { PIEZAS } from "@/lib/piezas";
import { PiezaCard } from "@/components/PiezaCard";
import { Placeholder } from "@/components/Placeholder";

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
  const obras = PIEZAS.filter((p) => p.autor === doc.frontmatter.nombre);

  return (
    <div>
      <section className="border-b border-linea/60">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-end">
          <div>
            <p className="eyebrow mb-6">{doc.frontmatter.vol ?? "Autor ORIA"}</p>
            <h1 className="display text-6xl md:text-7xl">
              {doc.frontmatter.nombre}
            </h1>
            <dl className="mt-8 text-sm text-ceniza grid grid-cols-2 gap-y-3 gap-x-8 max-w-md">
              {doc.frontmatter.oficio && (
                <>
                  <dt className="eyebrow">Oficio</dt>
                  <dd>{doc.frontmatter.oficio}</dd>
                </>
              )}
              {doc.frontmatter.ciudad && (
                <>
                  <dt className="eyebrow">Ciudad</dt>
                  <dd>{doc.frontmatter.ciudad}</dd>
                </>
              )}
              {doc.frontmatter.anos_oficio && (
                <>
                  <dt className="eyebrow">Años de oficio</dt>
                  <dd>{doc.frontmatter.anos_oficio}</dd>
                </>
              )}
              {doc.frontmatter.taller && (
                <>
                  <dt className="eyebrow">Taller</dt>
                  <dd>{doc.frontmatter.taller}</dd>
                </>
              )}
            </dl>
          </div>
          <Placeholder label="Retrato editorial" height="480px" />
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
            {obras.map((p) => (
              <PiezaCard key={p.slug} pieza={p} />
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
