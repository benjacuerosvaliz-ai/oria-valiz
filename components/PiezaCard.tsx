import Link from "next/link";
import Image from "next/image";
import type { Pieza } from "@/lib/piezas";
import { formatCLP } from "@/lib/shopify";

type Props = {
  pieza: Pieza;
  image?: { url: string; altText: string | null } | null;
  price?: { amount: string; currencyCode: string } | null;
  availableForSale?: boolean | null;
};

export function PiezaCard({ pieza, image, price, availableForSale }: Props) {
  return (
    <Link href={`/pieza/${pieza.slug}`} className="group block">
      <div className="aspect-[4/5] bg-archivo border border-linea/50 overflow-hidden relative">
        {image ? (
          <Image
            src={image.url}
            alt={image.altText ?? pieza.titulo}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-[1.02] transition duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-end p-5">
            <p className="eyebrow text-bramante">Foto pendiente</p>
          </div>
        )}
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-4">
        <h3 className="display text-xl group-hover:text-sepia transition">
          {pieza.titulo}
        </h3>
        <p className="text-xs text-ceniza shrink-0">{pieza.autor}</p>
      </div>
      {pieza.subtitulo && (
        <p className="mt-1 text-sm text-ceniza italic">{pieza.subtitulo}</p>
      )}
      {price && parseFloat(price.amount) > 0 ? (
        <p className="mt-1.5 text-sm">
          <span className="display">{formatCLP(price.amount)}</span>
          {availableForSale === false && (
            <span className="text-xs text-ceniza ml-2">· agotado</span>
          )}
        </p>
      ) : (
        <p className="mt-1.5 text-xs text-ceniza italic">Próximamente</p>
      )}
    </Link>
  );
}
