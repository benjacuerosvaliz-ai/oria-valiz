import Link from "next/link";
import { PIEZAS } from "@/lib/piezas";
import { PiezaCard } from "@/components/PiezaCard";
import { Placeholder } from "@/components/Placeholder";

export default function HomePage() {
  return (
    <div>
      {/* Hero compacto comercial */}
      <section className="border-b border-linea/60">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="eyebrow mb-4">Vol. 01 · Estación 2026</p>
            <h1 className="display text-5xl md:text-6xl leading-[1] mb-5">
              ORIA
            </h1>
            <p className="text-xl md:text-2xl text-tinta/85 leading-snug mb-6 display">
              Siete piezas de cuero,<br />
              hechas a mano por <span className="text-sepia">Marcelo Rojas</span>.
            </p>
            <p className="text-ceniza text-base leading-relaxed mb-8 max-w-md">
              Diseños originales del autor. Cada pieza única, firmada y hecha
              en Chile.
            </p>
            <div className="flex gap-4 items-center">
              <Link
                href="#piezas"
                className="bg-tinta text-papel px-6 py-3.5 text-sm tracking-wide hover:bg-sepia transition"
              >
                Ver las piezas
              </Link>
              <Link
                href="/autor/marcelo-rojas"
                className="text-sm underline underline-offset-4 hover:text-sepia transition"
              >
                Quién es Marcelo
              </Link>
            </div>
          </div>
          <Placeholder label="Hero — pieza destacada o retrato" height="380px">
            Imagen comercial fuerte: producto estrella sobre fondo neutro o
            retrato de Marcelo con una pieza en mano. Reemplazar cuando llegue
            material fotográfico.
          </Placeholder>
        </div>
      </section>

      {/* PRODUCTOS — sección principal */}
      <section id="piezas" className="border-b border-linea/60 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="flex items-end justify-between mb-10 gap-4">
            <div>
              <p className="eyebrow mb-2">Las obras · Vol. 01</p>
              <h2 className="display text-4xl md:text-5xl">7 piezas firmadas</h2>
            </div>
            <p className="text-sm text-ceniza hidden md:block max-w-xs text-right">
              Todas diseñadas y hechas a mano por Marcelo Rojas en su taller.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {PIEZAS.map((pieza) => (
              <PiezaCard key={pieza.slug} pieza={pieza} />
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <p className="text-xs text-ceniza">
              Despachamos a todo Chile. Checkout en valiz.cl.
            </p>
          </div>
        </div>
      </section>

      {/* Detrás del oficio — Marcelo */}
      <section className="border-b border-linea/60 bg-archivo/60">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <p className="eyebrow mb-3 text-center">Detrás del oficio</p>
          <h2 className="display text-4xl md:text-5xl text-center mb-12 max-w-2xl mx-auto">
            Marcelo Rojas, autor del Vol. 01.
          </h2>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            <Placeholder label="Video documental (16:9, sin sonido, loop)" height="320px">
              Video corto del taller: manos cortando cuero, costura, herramienta
              en uso. Sin diálogo, con loop, autoplay muted. Reemplazar cuando
              llegue el material.
            </Placeholder>

            <div>
              <p className="text-lg leading-relaxed text-tinta/90 mb-5">
                Marcelo es uno de esos maestros que llevan años haciendo cuero
                de autor sin que nadie los nombre. ORIA existe para cambiar eso.
              </p>
              <p className="text-base leading-relaxed text-ceniza mb-8">
                <em className="text-sepia not-italic">Bio editorial pendiente.</em>{" "}
                Cuando tengamos su historia grabada, este espacio cuenta de
                dónde viene, cómo aprendió y por qué cada una de sus piezas
                tiene la forma que tiene.
              </p>
              <Link
                href="/autor/marcelo-rojas"
                className="inline-block text-sm border-b border-tinta pb-0.5 hover:text-sepia hover:border-sepia transition"
              >
                Conocer a Marcelo →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Manifiesto reducido */}
      <section className="border-b border-linea/60">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="eyebrow mb-5">Qué es ORIA</p>
          <p className="display text-2xl md:text-3xl leading-tight mb-8">
            Un sello editorial que cada estación elige a un maestro chileno
            del cuero y le da{" "}
            <span className="text-sepia">vitrina, branding y alcance</span>.
            La obra siempre es del autor.
          </p>
          <Link
            href="/manifiesto"
            className="text-sm underline underline-offset-4 hover:text-sepia transition"
          >
            Leer el manifiesto completo
          </Link>
        </div>
      </section>
    </div>
  );
}
