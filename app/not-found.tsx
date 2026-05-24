import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <p className="eyebrow mb-6">404</p>
      <h1 className="display text-5xl mb-6">Esa página todavía no existe.</h1>
      <p className="text-ceniza mb-10">
        Puede que estemos preparándola. Mientras tanto, vuelve al manifiesto o
        al Vol. 01.
      </p>
      <div className="flex gap-6 justify-center text-sm">
        <Link href="/" className="underline underline-offset-4 hover:text-sepia">
          Inicio
        </Link>
        <Link href="/vol-01" className="underline underline-offset-4 hover:text-sepia">
          Vol. 01
        </Link>
      </div>
    </div>
  );
}
