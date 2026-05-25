import Link from "next/link";

/**
 * Strip comercial arriba de todo. Anuncia el volumen vigente y un CTA directo
 * a las piezas. Editable cambiando el texto acá — sin CMS por ahora.
 */
export function TopStrip() {
  return (
    <div className="bg-tinta text-papel text-xs md:text-sm">
      <div className="mx-auto max-w-6xl px-6 py-2.5 flex items-center justify-between gap-4">
        <p className="tracking-wide">
          <span className="text-bramante">ORIA</span>
          <span className="hidden sm:inline">
            {" "}· Cuero de autor chileno · Despachos a todo Chile
          </span>
          <span className="sm:hidden">
            {" "}· Despachos a todo Chile
          </span>
        </p>
        <Link
          href="/#piezas"
          className="underline underline-offset-4 hover:text-bramante transition whitespace-nowrap"
        >
          Ver las obras →
        </Link>
      </div>
    </div>
  );
}
