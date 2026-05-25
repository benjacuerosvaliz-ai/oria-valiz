import { cookies } from "next/headers";
import { getCart, type Cart } from "@/lib/shopify";

const COOKIE = "oria_cart_id";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 días

export async function readCartId(): Promise<string | null> {
  const c = await cookies();
  return c.get(COOKIE)?.value ?? null;
}

export async function writeCartId(cartId: string): Promise<void> {
  const c = await cookies();
  c.set(COOKIE, cartId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: MAX_AGE,
    path: "/",
  });
}

export async function clearCartId(): Promise<void> {
  const c = await cookies();
  c.delete(COOKIE);
}

/** Devuelve el cart activo o null si no hay cookie o si Shopify lo perdió. */
export async function readCart(): Promise<Cart | null> {
  const id = await readCartId();
  if (!id) return null;
  return getCart(id);
}
