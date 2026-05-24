import { notFound } from "next/navigation";
import Link from "next/link";
import { PIEZAS, getPieza } from "@/lib/piezas";
import { loadDoc } from "@/lib/content";
import { Placeholder } from "@/components/Placeholder";

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

  const shopifyUrl = `https://www.valiz.cl/products/${pieza.shopifyHandle}`;

  return (
    <article className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-12">
        <Placeholder label="Galería de fotos" height="640px">
          Aquí van las imágenes de la pieza. Mínimo 3: producto en fondo
          neutro, detalle de costura/material, contexto de uso o taller.
          Pendiente sesión 4–5.
        </Placeholder>

        <div className="flex flex-col">
          <p className="eyebrow mb-4">{pieza.autor}</p>
          <h1 className="display text-5xl md:text-6xl mb-3">{pieza.titulo}</h1>
          {pieza.subtitulo && (
            <p className="text-ceniza italic text-lg mb-8">
              {pieza.subtitulo}
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

          <a
            href={shopifyUrl}
            className="mt-12 bg-tinta text-papel px-6 py-4 text-sm tracking-wide text-center hover:bg-sepia transition"
          >
            Llevar esta pieza →
          </a>
          <p className="mt-3 text-xs text-ceniza text-center">
            El checkout se realiza en valiz.cl
          </p>

          <Link
            href={`/autor/marcelo-rojas`}
            className="mt-8 text-sm underline underline-offset-4 hover:text-sepia transition self-start"
          >
            ← Conocer a {pieza.autor}
          </Link>
        </div>
      </div>
    </article>
  );
}
