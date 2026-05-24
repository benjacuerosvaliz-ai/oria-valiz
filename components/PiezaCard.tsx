import Link from "next/link";
import type { Pieza } from "@/lib/piezas";

export function PiezaCard({ pieza }: { pieza: Pieza }) {
  return (
    <Link
      href={`/pieza/${pieza.slug}`}
      className="group block"
    >
      <div className="aspect-[4/5] bg-archivo border border-linea/50 flex items-end p-5">
        <p className="eyebrow text-bramante">Foto pendiente</p>
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-4">
        <h3 className="display text-xl group-hover:text-sepia transition">
          {pieza.titulo}
        </h3>
        <p className="text-xs text-ceniza shrink-0">
          {pieza.autor}
        </p>
      </div>
      {pieza.subtitulo && (
        <p className="mt-1 text-sm text-ceniza italic">{pieza.subtitulo}</p>
      )}
    </Link>
  );
}
