import Link from "next/link";
import { PIEZAS } from "@/lib/piezas";
import { PiezaCard } from "@/components/PiezaCard";
import { Placeholder } from "@/components/Placeholder";

export const metadata = {
  title: "Vol. 01 — Marcelo Rojas",
};

export default function Vol01Page() {
  return (
    <div>
      <section className="border-b border-linea/60">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="eyebrow mb-6">Vol. 01 · Estación 2026</p>
          <h1 className="display text-6xl md:text-7xl max-w-3xl">
            Marcelo Rojas
          </h1>
          <p className="mt-6 text-xl text-ceniza max-w-2xl">
            Siete piezas. Un autor. Su diseño, su mano, su tiempo.
          </p>
        </div>
      </section>

      <section className="border-b border-linea/60">
        <div className="mx-auto max-w-6xl px-6 py-20 grid md:grid-cols-5 gap-12">
          <div className="md:col-span-3">
            <p className="eyebrow mb-4">Por qué él</p>
            <Placeholder label="Texto editorial de presentación">
              Texto que explica por qué elegimos a Marcelo para abrir ORIA.
              Tono documental, sin lugares comunes. Idealmente apoyado en una
              conversación grabada (10–20 min) con él. Pendiente sesión 2.
            </Placeholder>
            <Link
              href="/autor/marcelo-rojas"
              className="inline-block mt-8 text-sm underline underline-offset-4 hover:text-sepia transition"
            >
              Perfil completo de Marcelo →
            </Link>
          </div>
          <div className="md:col-span-2">
            <Placeholder label="Foto del taller" height="380px" />
          </div>
        </div>
      </section>

      <section className="border-b border-linea/60">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="display text-4xl mb-10">Las siete obras</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {PIEZAS.map((p) => (
              <PiezaCard key={p.slug} pieza={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
