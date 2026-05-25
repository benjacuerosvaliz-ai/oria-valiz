import Link from "next/link";

/**
 * Hero editorial de Marcelo Rojas — autor del Vol. 01.
 *
 * Usado en dos lugares con leve variación:
 * - Home: con CTA "Conocer a Marcelo →" hacia /autor/marcelo-rojas
 * - Página /autor/marcelo-rojas: sin CTA (ya estás ahí)
 *
 * Todo el material (foto, quote, bio) hoy es placeholder marcado. Reemplazar
 * cuando llegue:
 *  - public/marcelo/retrato.jpg (foto editorial, vertical, 4:5 o 3:4)
 *  - frontmatter de content/autores/marcelo-rojas.md con quote real
 */
export function MarceloBanner({ showCTA = true }: { showCTA?: boolean }) {
  return (
    <section className="bg-archivo border-y border-linea/60">
      <div className="grid md:grid-cols-2 min-h-[600px] md:min-h-[680px]">
        {/* Foto / placeholder */}
        <div className="relative bg-tinta/5 border-r border-linea/40 aspect-[4/5] md:aspect-auto md:min-h-[680px]">
          {/* Cuando llegue la foto real, reemplazar este bloque por <Image src="/marcelo/retrato.jpg" ... fill /> */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
            <div className="border-l-2 border-bramante pl-4">
              <p className="eyebrow text-bramante mb-2">Pendiente</p>
              <p className="text-sm text-ceniza max-w-xs leading-relaxed">
                Retrato editorial de Marcelo Rojas. Formato vertical, color cálido
                o blanco y negro, en su taller, con sus manos visibles.
              </p>
            </div>
          </div>
          {/* Líneas decorativas sutiles para que el placeholder se vea intencional */}
          <div className="absolute top-8 left-8 md:top-12 md:left-12 eyebrow text-ceniza/60">
            01 — Autor
          </div>
        </div>

        {/* Texto editorial */}
        <div className="flex flex-col justify-center px-8 py-14 md:px-16 md:py-20">
          <p className="eyebrow mb-6">Vol. 01 · 2026</p>
          <h2 className="display text-5xl md:text-7xl leading-[0.95] mb-8">
            Marcelo<br />Rojas
          </h2>
          <p className="text-lg md:text-xl text-tinta/90 leading-relaxed mb-6 max-w-md">
            Diseñó las siete piezas que abren ORIA. Cada una nació en su
            taller, cortada y cosida por su mano, sin que nadie pusiera un
            punto en el diseño.
          </p>
          <p className="text-base text-sepia italic mb-10 max-w-md">
            &ldquo;Quote pendiente — sale de la conversación grabada con él.&rdquo;
          </p>
          {showCTA && (
            <Link
              href="/autor/marcelo-rojas"
              className="inline-block self-start border-b-2 border-tinta text-sm hover:text-sepia hover:border-sepia transition pb-1"
            >
              Conocer a Marcelo →
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
