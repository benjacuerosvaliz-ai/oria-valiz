import Link from "next/link";
import Image from "next/image";
import { readCart } from "@/lib/cart-cookie";
import { formatCLP, hasShopify } from "@/lib/shopify";
import { removeLine, updateLineQuantity, goToCheckout } from "./actions";

export const metadata = {
  title: "Tu carrito",
};

export default async function CarritoPage() {
  if (!hasShopify()) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <p className="eyebrow mb-4">Carrito</p>
        <h1 className="display text-3xl mb-4">
          Pronto vas a poder comprar acá mismo.
        </h1>
        <p className="text-ceniza mb-8">
          Mientras conectamos la pasarela, las compras se realizan en valiz.cl.
        </p>
        <Link
          href="/#piezas"
          className="bg-tinta text-papel px-6 py-3 text-sm tracking-wide hover:bg-sepia transition"
        >
          Ver las piezas
        </Link>
      </div>
    );
  }

  const cart = await readCart();

  if (!cart || cart.lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <p className="eyebrow mb-4">Tu carrito</p>
        <h1 className="display text-4xl mb-6">Todavía está vacío.</h1>
        <p className="text-ceniza mb-10">
          Las piezas de Marcelo te esperan.
        </p>
        <Link
          href="/#piezas"
          className="bg-tinta text-papel px-6 py-3 text-sm tracking-wide hover:bg-sepia transition"
        >
          Ver las piezas
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <p className="eyebrow mb-3">Tu carrito</p>
      <h1 className="display text-4xl md:text-5xl mb-10">
        {cart.totalQuantity} {cart.totalQuantity === 1 ? "pieza" : "piezas"}
      </h1>

      <ul className="border-t border-linea/60">
        {cart.lines.map((line) => (
          <li
            key={line.id}
            className="flex gap-5 py-6 border-b border-linea/60 items-start"
          >
            <div className="w-24 h-28 shrink-0 bg-archivo border border-linea/50 overflow-hidden">
              {line.merchandise.product.featuredImage ? (
                <Image
                  src={line.merchandise.product.featuredImage.url}
                  alt={line.merchandise.product.featuredImage.altText ?? line.merchandise.product.title}
                  width={96}
                  height={112}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="eyebrow text-bramante">Sin foto</span>
                </div>
              )}
            </div>

            <div className="flex-1">
              <Link
                href={`/pieza/${line.merchandise.product.handle.replace(/-oria$/, "")}`}
                className="display text-xl hover:text-sepia transition"
              >
                {line.merchandise.product.title.replace(/\s*ORIA$/i, "")}
              </Link>
              {line.merchandise.title && line.merchandise.title !== "Default Title" && (
                <p className="text-xs text-ceniza mt-1">{line.merchandise.title}</p>
              )}
              <p className="text-sm text-ceniza mt-1">Marcelo Rojas</p>

              <div className="mt-4 flex items-center gap-3">
                <form action={async () => {
                  "use server";
                  await updateLineQuantity(line.id, line.quantity - 1);
                }}>
                  <button
                    type="submit"
                    className="w-8 h-8 border border-linea text-tinta hover:bg-tinta hover:text-papel transition"
                    aria-label="Quitar uno"
                  >
                    −
                  </button>
                </form>
                <span className="text-sm w-6 text-center">{line.quantity}</span>
                <form action={async () => {
                  "use server";
                  await updateLineQuantity(line.id, line.quantity + 1);
                }}>
                  <button
                    type="submit"
                    className="w-8 h-8 border border-linea text-tinta hover:bg-tinta hover:text-papel transition"
                    aria-label="Agregar uno"
                  >
                    +
                  </button>
                </form>
                <form action={async () => {
                  "use server";
                  await removeLine(line.id);
                }} className="ml-3">
                  <button
                    type="submit"
                    className="text-xs text-ceniza underline underline-offset-4 hover:text-sepia transition"
                  >
                    Eliminar
                  </button>
                </form>
              </div>
            </div>

            <div className="text-right shrink-0">
              <p className="display text-lg">
                {formatCLP(line.cost.totalAmount.amount)}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <Link
          href="/#piezas"
          className="text-sm underline underline-offset-4 hover:text-sepia transition"
        >
          ← Seguir mirando
        </Link>

        <div className="text-right">
          <div className="flex items-baseline justify-end gap-6 mb-4">
            <span className="eyebrow">Subtotal</span>
            <span className="display text-3xl">
              {formatCLP(cart.cost.subtotalAmount.amount)}
            </span>
          </div>
          <p className="text-xs text-ceniza mb-4">
            Despacho calculado en el checkout.
          </p>
          <div className="mb-4 border-l-2 border-bramante pl-3 max-w-sm text-left ml-auto">
            <p className="text-xs text-ceniza leading-relaxed">
              El pago se procesa a través de <span className="text-tinta">Valiz</span>,
              el sello que produce y distribuye ORIA. Tu compra apoya directo
              al oficio de Marcelo Rojas.
            </p>
          </div>
          <form action={goToCheckout}>
            <button
              type="submit"
              className="bg-tinta text-papel px-8 py-4 text-sm tracking-wide hover:bg-sepia transition"
            >
              Ir al checkout →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
