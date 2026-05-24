import Link from "next/link";
import { PIEZAS } from "@/lib/piezas";
import { PiezaCard } from "@/components/PiezaCard";
import { Placeholder } from "@/components/Placeholder";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-linea/60">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <p className="eyebrow mb-6">Vol. 01 · 2026</p>
          <h1 className="display text-6xl md:text-8xl leading-[0.95] max-w-4xl">
            Hay maestros del cuero
            <br />
            que aún no conoces.
          </h1>
          <p className="mt-8 max-w-xl text-lg text-ceniza leading-relaxed">
            ORIA es la vitrina que cada estación elige a uno de ellos y le da
            espacio para que su trabajo te llegue con su nombre adelante.
          </p>
          <div className="mt-12 flex gap-6 items-center">
            <Link
              href="/vol-01"
              className="bg-tinta text-papel px-6 py-3 text-sm tracking-wide hover:bg-sepia transition"
            >
              Conocer Vol. 01
            </Link>
            <Link
              href="/manifiesto"
              className="text-sm underline underline-offset-4 hover:text-sepia transition"
            >
              Leer el manifiesto
            </Link>
          </div>
        </div>
      </section>

      {/* Autor vigente */}
      <section className="border-b border-linea/60">
        <div className="mx-auto max-w-6xl px-6 py-20 grid md:grid-cols-2 gap-12">
          <div>
            <p className="eyebrow mb-4">El autor de esta estación</p>
            <h2 className="display text-5xl mb-6">Marcelo Rojas</h2>
            <p className="text-ceniza leading-relaxed mb-4">
              <em>Bio editorial pendiente.</em> Lo que sabemos hoy: diseñó las
              siete piezas que abren esta vitrina. Cada una nació en su taller,
              hecha a mano, sin que nosotros pusiéramos un punto en el diseño.
            </p>
            <Link
              href="/autor/marcelo-rojas"
              className="text-sm underline underline-offset-4 hover:text-sepia transition"
            >
              Conocer a Marcelo →
            </Link>
          </div>
          <Placeholder label="Retrato Marcelo Rojas" height="420px">
            Aquí va el retrato documental. Foto blanco y negro o color cálido,
            de cuerpo o medio cuerpo, en su taller, con manos visibles si es
            posible. Pendiente sesión 2.
          </Placeholder>
        </div>
      </section>

      {/* Las piezas */}
      <section className="border-b border-linea/60">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="display text-4xl">Las piezas</h2>
            <p className="eyebrow">7 obras · firmadas a mano</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {PIEZAS.map((pieza) => (
              <PiezaCard key={pieza.slug} pieza={pieza} />
            ))}
          </div>
        </div>
      </section>

      {/* Manifiesto reducido */}
      <section className="border-b border-linea/60">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <p className="eyebrow mb-6">Nuestra apuesta</p>
          <p className="display text-3xl md:text-4xl leading-tight">
            En las ferias, en las calles, en los talleres escondidos de Chile
            hay creadores cuyo trabajo tiene nivel mundial.
            <br />
            <span className="text-sepia">
              Lo único que les ha faltado es vitrina.
            </span>
          </p>
          <Link
            href="/manifiesto"
            className="inline-block mt-10 text-sm underline underline-offset-4 hover:text-sepia transition"
          >
            Leer el manifiesto completo
          </Link>
        </div>
      </section>
    </div>
  );
}
