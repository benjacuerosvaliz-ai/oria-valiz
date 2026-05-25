"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { PIEZAS, type Pieza } from "@/lib/piezas";

/**
 * Categorías por slug. Hoy hardcoded; cuando el catálogo crezca o queramos
 * usar tags de Shopify, mover a lib/piezas.ts y derivar.
 */
const CATEGORIAS: { label: string; slugs: string[] }[] = [
  { label: "Carteras", slugs: ["cartera-saco", "cartera-tote"] },
  { label: "Mochilas", slugs: ["mochila"] },
  {
    label: "Accesorios",
    slugs: ["neceser", "funda-computador", "tarjetero", "juego-cartas"],
  },
];

type Maestro = { handle: string; nombre: string; vol: string };

const MAESTROS: Maestro[] = [
  { handle: "marcelo-rojas", nombre: "Marcelo Rojas", vol: "Vol. 01 · 2026" },
];

type OpenPanel = "productos" | "maestros" | "mobile" | null;

export function NavMenu({ cartButton }: { cartButton: ReactNode }) {
  const [open, setOpen] = useState<OpenPanel>(null);
  const close = () => setOpen(null);

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-7 text-sm">
        <Dropdown
          label="Productos"
          isOpen={open === "productos"}
          onToggle={() => setOpen(open === "productos" ? null : "productos")}
          close={close}
          widthClass="min-w-[520px]"
        >
          <div className="grid grid-cols-3 gap-6">
            {CATEGORIAS.map((cat) => (
              <div key={cat.label}>
                <p className="eyebrow mb-3">{cat.label}</p>
                <ul className="space-y-2">
                  {cat.slugs.map((slug) => {
                    const p = piezaBySlug(slug);
                    if (!p) return null;
                    return (
                      <li key={slug}>
                        <Link
                          href={`/pieza/${slug}`}
                          onClick={close}
                          className="text-sm hover:text-sepia transition"
                        >
                          {p.titulo}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-3 border-t border-linea/40 text-right">
            <Link
              href="/#piezas"
              onClick={close}
              className="text-xs text-ceniza underline underline-offset-4 hover:text-sepia transition"
            >
              Ver todas las obras →
            </Link>
          </div>
        </Dropdown>

        <Dropdown
          label="Maestros"
          isOpen={open === "maestros"}
          onToggle={() => setOpen(open === "maestros" ? null : "maestros")}
          close={close}
          widthClass="min-w-[260px]"
        >
          <ul className="space-y-3">
            {MAESTROS.map((m) => (
              <li key={m.handle}>
                <Link
                  href={`/autor/${m.handle}`}
                  onClick={close}
                  className="block group"
                >
                  <p className="display text-lg group-hover:text-sepia transition">
                    {m.nombre}
                  </p>
                  <p className="eyebrow text-[0.65rem] mt-0.5">{m.vol}</p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5 pt-3 border-t border-linea/40">
            <p className="text-xs text-ceniza italic">
              Cada estación, un nuevo maestro.
            </p>
          </div>
        </Dropdown>

        <Link href="/manifiesto" className="hover:text-sepia transition">
          Sobre ORIA
        </Link>

        {cartButton}
      </nav>

      {/* Mobile: cart + hamburger */}
      <div className="flex md:hidden items-center gap-4">
        {cartButton}
        <button
          onClick={() => setOpen(open === "mobile" ? null : "mobile")}
          aria-label="Abrir menú"
          aria-expanded={open === "mobile"}
          className="p-2 -mr-2"
        >
          <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden>
            {open === "mobile" ? (
              <path
                d="M3 1 L17 13 M3 13 L17 1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            ) : (
              <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M0 1 H20" />
                <path d="M0 7 H20" />
                <path d="M0 13 H20" />
              </g>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile panel: vive fuera del flex del header, full width */}
      {open === "mobile" && (
        <div className="md:hidden absolute left-0 right-0 top-full border-t border-linea/40 bg-papel z-40">
          <div className="px-6 py-8 space-y-8 max-h-[80vh] overflow-y-auto">
            <section>
              <p className="eyebrow mb-4">Productos</p>
              <div className="space-y-5">
                {CATEGORIAS.map((cat) => (
                  <div key={cat.label}>
                    <p className="text-xs text-ceniza uppercase tracking-wider mb-2">
                      {cat.label}
                    </p>
                    <ul className="space-y-1.5 pl-3 border-l border-linea/40">
                      {cat.slugs.map((slug) => {
                        const p = piezaBySlug(slug);
                        if (!p) return null;
                        return (
                          <li key={slug}>
                            <Link
                              href={`/pieza/${slug}`}
                              onClick={close}
                              className="text-sm hover:text-sepia transition"
                            >
                              {p.titulo}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
              <Link
                href="/#piezas"
                onClick={close}
                className="block mt-4 text-xs text-ceniza underline underline-offset-4"
              >
                Ver todas las obras →
              </Link>
            </section>

            <section>
              <p className="eyebrow mb-4">Maestros</p>
              <ul className="space-y-3 pl-3 border-l border-linea/40">
                {MAESTROS.map((m) => (
                  <li key={m.handle}>
                    <Link
                      href={`/autor/${m.handle}`}
                      onClick={close}
                      className="block"
                    >
                      <p className="text-base">{m.nombre}</p>
                      <p className="text-[0.7rem] text-ceniza uppercase tracking-wider">
                        {m.vol}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <Link
              href="/manifiesto"
              onClick={close}
              className="block text-sm pt-3 border-t border-linea/40"
            >
              Sobre ORIA →
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

function piezaBySlug(slug: string): Pieza | undefined {
  return PIEZAS.find((p) => p.slug === slug);
}

function Dropdown({
  label,
  isOpen,
  onToggle,
  close,
  widthClass = "",
  children,
}: {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  close: () => void;
  widthClass?: string;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-1.5 hover:text-sepia transition"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label}
        <svg
          width="9"
          height="6"
          viewBox="0 0 10 6"
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden
        >
          <path
            d="M1 1 L5 5 L9 1"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={close} aria-hidden />
          <div
            className={`absolute top-full right-0 mt-3 bg-papel border border-linea/60 shadow-xl shadow-tinta/10 p-6 z-50 ${widthClass}`}
            onMouseLeave={close}
          >
            {children}
          </div>
        </>
      )}
    </div>
  );
}
