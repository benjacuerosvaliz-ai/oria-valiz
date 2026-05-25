import Link from "next/link";
import { CartButton } from "@/components/CartButton";
import { LogoLink } from "@/components/LogoMark";

export function Nav() {
  return (
    <header className="border-b border-linea/60 bg-papel sticky top-0 z-30">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <LogoLink className="h-7 w-auto md:h-9" />
        <nav className="flex items-center gap-5 md:gap-7 text-sm">
          <Link href="/#piezas" className="hover:text-sepia transition">
            Las obras
          </Link>
          <Link
            href="/autor/marcelo-rojas"
            className="hidden sm:inline hover:text-sepia transition"
          >
            Marcelo
          </Link>
          <Link
            href="/manifiesto"
            className="hidden sm:inline hover:text-sepia transition"
          >
            Manifiesto
          </Link>
          <CartButton />
        </nav>
      </div>
    </header>
  );
}
