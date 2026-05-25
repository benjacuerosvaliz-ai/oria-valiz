import Link from "next/link";
import { readCart } from "@/lib/cart-cookie";

export async function CartButton() {
  const cart = await readCart();
  const count = cart?.totalQuantity ?? 0;
  return (
    <Link
      href="/carrito"
      className="relative inline-flex items-center gap-1.5 text-sm hover:text-sepia transition"
      aria-label={`Carrito${count > 0 ? ` con ${count} pieza${count === 1 ? "" : "s"}` : ""}`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M3 4.5h2l1.5 9h9l1.5-7H6"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <circle cx="8" cy="16.5" r="1" fill="currentColor" />
        <circle cx="14" cy="16.5" r="1" fill="currentColor" />
      </svg>
      {count > 0 && (
        <span className="bg-tinta text-papel text-[0.65rem] leading-none px-1.5 py-1 rounded-full min-w-[18px] text-center font-medium">
          {count}
        </span>
      )}
    </Link>
  );
}
