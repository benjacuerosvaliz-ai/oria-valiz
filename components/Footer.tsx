export function Footer() {
  return (
    <footer className="border-t border-linea/60 mt-32">
      <div className="mx-auto max-w-6xl px-6 py-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="display text-3xl leading-none">ORIA</p>
          <p className="mt-3 text-sm text-ceniza max-w-sm">
            Vitrina editorial para maestros chilenos del cuero. Una iniciativa de
            Valiz.
          </p>
        </div>
        <div className="text-sm text-ceniza space-y-1">
          <p>Santiago, Chile</p>
          <p>
            <a href="mailto:hola@valiz.cl" className="hover:text-tinta">
              hola@valiz.cl
            </a>
          </p>
          <p className="text-xs mt-4">© {new Date().getFullYear()} ORIA · Valiz</p>
        </div>
      </div>
    </footer>
  );
}
