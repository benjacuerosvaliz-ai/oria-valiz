import { notFound } from "next/navigation";
import Link from "next/link";
import { LEGAL_SECTIONS, getLegalSection } from "@/lib/legal";

export async function generateStaticParams() {
  return LEGAL_SECTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const section = getLegalSection(slug);
  return section ? { title: section.label } : {};
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const section = getLegalSection(slug);
  if (!section) notFound();

  const doc = await section.loader();

  return (
    <article className="mx-auto max-w-2xl px-6 py-16 md:py-24">
      <p className="eyebrow mb-4">
        {section.group === "legales" ? "Términos legales" : "Información"}
      </p>
      <h1 className="display text-4xl md:text-5xl mb-10">
        {doc?.title ?? section.label}
      </h1>

      {doc ? (
        <div
          className="prose-oria text-base"
          dangerouslySetInnerHTML={{ __html: doc.body }}
        />
      ) : (
        <div className="text-ceniza italic">
          <p>Este contenido aún no está disponible.</p>
          <p className="mt-3 text-sm">
            Para consultas, escríbenos a{" "}
            <a
              href="mailto:oria@valiz.cl"
              className="underline underline-offset-4 hover:text-sepia"
            >
              oria@valiz.cl
            </a>
            .
          </p>
        </div>
      )}

      <div className="mt-16 pt-8 border-t border-linea/60 text-sm text-ceniza">
        <p>
          Esta política aplica al ecosistema completo —{" "}
          <span className="text-tinta">ORIA</span> opera sobre la infraestructura
          comercial de Valiz, el sello que produce y distribuye estas piezas.
        </p>
        <p className="mt-4">
          ¿Dudas?{" "}
          <a
            href="mailto:oria@valiz.cl"
            className="underline underline-offset-4 hover:text-sepia"
          >
            oria@valiz.cl
          </a>
        </p>
      </div>

      <div className="mt-10">
        <Link
          href="/"
          className="text-sm underline underline-offset-4 hover:text-sepia transition"
        >
          ← Volver a la home
        </Link>
      </div>
    </article>
  );
}
