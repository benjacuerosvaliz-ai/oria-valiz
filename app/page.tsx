import Link from "next/link";
import { getPiezasConShopify } from "@/lib/piezas";
import { PiezaCard } from "@/components/PiezaCard";
import { Placeholder } from "@/components/Placeholder";
import { MarceloBanner } from "@/components/MarceloBanner";
import { LogoMark } from "@/components/LogoMark";

export default async function HomePage() {
  const piezas = await getPiezasConShopify();
  return (
    <div>
      {/* Hero — manifiesto de entrada ORIA */}
      <section className="border-b border-linea/60">
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-28 text-center">
          <p className="eyebrow mb-10">Vol. 01 · Colección 2026</p>

          <div className="mb-10 md:mb-14 flex justify-center">
            <LogoMark
              className="h-20 sm:h-28 md:h-36 lg:h-44 w-auto"
              priority
            />
          </div>

          <h1 className="display text-3xl md:text-4xl lg:text-5xl leading-[1.1] mb-7 max-w-2xl mx-auto">
            Donde el cuero<br className="hidden md:inline" />{" "}
            se firma con nombre.
          </h1>

          <p className="text-base md:text-lg text-ceniza leading-relaxed mb-8 max-w-xl mx-auto">
            Cada colección, un nuevo autor. Carteras, mochilas y accesorios
            hechos a mano por maestros chilenos.
          </p>

          <p className="text-xs md:text-sm text-ceniza tracking-[0.18em] uppercase mb-2">
            hist<span className="text-sepia">oria</span>
            <span className="mx-2">·</span>
            mem<span className="text-sepia">oria</span>
            <span className="mx-2">·</span>
            trayect<span className="text-sepia">oria</span>
            <span className="mx-2">·</span>
            vict<span className="text-sepia">oria</span>
          </p>
          <p className="text-xs text-ceniza italic mb-10">
            Victoria, la calle donde están los talleres.
          </p>

          <div className="flex gap-5 items-center justify-center flex-wrap">
            <Link
              href="#piezas"
              className="bg-tinta text-papel px-6 py-3.5 text-sm tracking-wide hover:bg-sepia transition"
            >
              Ver las piezas
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
            {piezas.map(({ pieza, image, price, availableForSale }) => (
              <PiezaCard
                key={pieza.slug}
                pieza={pieza}
                image={image}
                price={price}
                availableForSale={availableForSale}
              />
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <p className="text-xs text-ceniza">
              Despachamos a todo Chile. Checkout en valiz.cl.
            </p>
          </div>
        </div>
      </section>

      {/* Banner Marcelo — autor del Vol. 01 */}
      <MarceloBanner showCTA />

      {/* Video documental — espacio reservado */}
      <section className="border-b border-linea/60">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <p className="eyebrow mb-6 text-center">Su oficio en movimiento</p>
          <Placeholder label="Video documental (16:9, sin sonido, loop)" height="380px">
            Video corto del taller: manos cortando cuero, costura, herramienta
            en uso. Sin diálogo, con loop, autoplay muted. Reemplazar cuando
            llegue el material.
          </Placeholder>
        </div>
      </section>

      {/* Manifiesto reducido */}
      <section className="border-b border-linea/60">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="eyebrow mb-5">Qué es ORIA</p>
          <p className="display text-2xl md:text-3xl leading-tight mb-8">
            Cada colección le da{" "}
            <span className="text-sepia">vitrina, branding y alcance</span>{" "}
            a un maestro chileno del cuero. La obra siempre es del autor.
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
