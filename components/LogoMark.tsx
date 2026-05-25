import Image from "next/image";
import Link from "next/link";

/**
 * Logo ORIA — wordmark con huella como letra O.
 * PNG transparente generado en Krea (Flux 2) + processed con ImageMagick.
 * Tamaño nativo: 866x275 (aspect ~3.15:1).
 *
 * Para isotipo solo (huella sin letras), generar aparte en Krea y agregar
 * como /oria-huella.png — uso futuro para favicon, hangtag, etc.
 */
export function LogoMark({
  className = "h-7 w-auto md:h-8",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/oria-logo.png"
      alt="ORIA"
      width={866}
      height={275}
      className={className}
      priority={priority}
    />
  );
}

/** Versión clickeable que linkea a /, para usar en Nav. */
export function LogoLink({ className }: { className?: string }) {
  return (
    <Link href="/" className="inline-flex items-center" aria-label="ORIA — Inicio">
      <LogoMark className={className} priority />
    </Link>
  );
}
