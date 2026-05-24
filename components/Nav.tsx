import Link from "next/link";

export function Nav() {
  return (
    <header className="border-b border-linea/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="display text-2xl tracking-tight">
          ORIA
        </Link>
        <nav className="flex items-center gap-8 text-sm">
          <Link href="/vol-01" className="hover:text-sepia transition">
            Vol. 01
          </Link>
          <Link href="/manifiesto" className="hover:text-sepia transition">
            Manifiesto
          </Link>
          <a
            href="https://www.valiz.cl"
            className="text-ceniza hover:text-tinta transition"
          >
            Valiz ↗
          </a>
        </nav>
      </div>
    </header>
  );
}
