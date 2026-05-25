import Link from "next/link";
import { LogoMark } from "@/components/LogoMark";
import { legalByGroup } from "@/lib/legal";

export function Footer() {
  const informacion = legalByGroup("informacion");
  const legales = legalByGroup("legales");

  return (
    <footer className="border-t border-linea/60 mt-32 bg-archivo/40">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Top: brand + columnas */}
        <div className="grid gap-12 md:grid-cols-4 mb-12">
          <div className="md:col-span-1">
            <LogoMark className="h-10 w-auto md:h-12" />
            <p className="mt-5 text-sm text-ceniza max-w-xs leading-relaxed">
              Vitrina editorial para los maestros chilenos del cuero. Una
              iniciativa de Valiz.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-4">Comprar</p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/#piezas" className="hover:text-sepia transition">
                  Las obras
                </Link>
              </li>
              <li>
                <Link
                  href="/autor/marcelo-rojas"
                  className="hover:text-sepia transition"
                >
                  Marcelo Rojas
                </Link>
              </li>
              <li>
                <Link
                  href="/manifiesto"
                  className="hover:text-sepia transition"
                >
                  Manifiesto
                </Link>
              </li>
              <li>
                <Link href="/carrito" className="hover:text-sepia transition">
                  Tu carrito
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4">Información</p>
            <ul className="space-y-2.5 text-sm">
              {informacion.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/legal/${s.slug}`}
                    className="hover:text-sepia transition"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4">Legales</p>
            <ul className="space-y-2.5 text-sm">
              {legales.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/legal/${s.slug}`}
                    className="hover:text-sepia transition"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom: contacto + redes + copy */}
        <div className="border-t border-linea/60 pt-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between text-sm text-ceniza">
          <div className="flex flex-col gap-1">
            <p>Santiago, Chile</p>
            <a
              href="mailto:oria@valiz.cl"
              className="hover:text-tinta transition"
            >
              oria@valiz.cl
            </a>
          </div>

          <div className="flex gap-5">
            <a
              href="https://www.instagram.com/oria.cl"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-tinta transition"
            >
              Instagram <span className="text-ceniza/70">· @oria.cl</span>
            </a>
            <a
              href="https://www.tiktok.com/@valiz.z"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-tinta transition"
            >
              TikTok
            </a>
            <a
              href="https://bitacora.valiz.cl"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-tinta transition"
            >
              Bitácora ↗
            </a>
          </div>

          <p className="text-xs">© {new Date().getFullYear()} ORIA · Valiz</p>
        </div>
      </div>
    </footer>
  );
}
