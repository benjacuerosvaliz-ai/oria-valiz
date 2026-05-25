"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  addLines,
  createCart,
  getProductByHandle,
  removeLines,
  updateLines,
  hasShopify,
} from "@/lib/shopify";
import { readCart, readCartId, writeCartId } from "@/lib/cart-cookie";

type ActionResult = { ok: boolean; error?: string };

async function resolveVariantId(handle: string): Promise<string | null> {
  const product = await getProductByHandle(handle);
  if (!product) return null;
  // Por ahora asumimos primer variant disponible. Si una pieza pasa a tener
  // múltiples variants (color/tamaño), la UI deberá pasar el variantId directo.
  const v = product.variants.find((x) => x.availableForSale) ?? product.variants[0];
  return v?.id ?? null;
}

export async function addToCart(handle: string): Promise<ActionResult> {
  if (!hasShopify()) {
    return { ok: false, error: "Shopify aún no está conectado." };
  }
  const merchandiseId = await resolveVariantId(handle);
  if (!merchandiseId) {
    return { ok: false, error: "No encontramos esa pieza en Shopify." };
  }

  const existingId = await readCartId();
  if (existingId) {
    const cart = await addLines(existingId, [{ merchandiseId, quantity: 1 }]);
    if (cart) {
      revalidatePath("/", "layout");
      return { ok: true };
    }
    // si el cart caducó en Shopify, creamos uno nuevo abajo
  }

  const cart = await createCart([{ merchandiseId, quantity: 1 }]);
  if (!cart) return { ok: false, error: "No pudimos crear el carrito." };
  await writeCartId(cart.id);
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function buyNow(handle: string): Promise<void> {
  if (!hasShopify()) {
    redirect(`https://www.valiz.cl/products/${handle}`);
  }
  const merchandiseId = await resolveVariantId(handle);
  if (!merchandiseId) {
    redirect(`https://www.valiz.cl/products/${handle}`);
  }
  const cart = await createCart([{ merchandiseId: merchandiseId!, quantity: 1 }]);
  if (!cart) {
    redirect(`https://www.valiz.cl/products/${handle}`);
  }
  redirect(cart!.checkoutUrl);
}

export async function updateLineQuantity(
  lineId: string,
  quantity: number
): Promise<ActionResult> {
  const cartId = await readCartId();
  if (!cartId) return { ok: false, error: "Carrito no encontrado." };

  if (quantity <= 0) {
    const cart = await removeLines(cartId, [lineId]);
    revalidatePath("/", "layout");
    return cart ? { ok: true } : { ok: false, error: "No pudimos actualizar." };
  }

  const cart = await updateLines(cartId, [{ id: lineId, quantity }]);
  revalidatePath("/", "layout");
  return cart ? { ok: true } : { ok: false, error: "No pudimos actualizar." };
}

export async function removeLine(lineId: string): Promise<ActionResult> {
  const cartId = await readCartId();
  if (!cartId) return { ok: false, error: "Carrito no encontrado." };
  const cart = await removeLines(cartId, [lineId]);
  revalidatePath("/", "layout");
  return cart ? { ok: true } : { ok: false, error: "No pudimos eliminar la pieza." };
}

export async function goToCheckout(): Promise<void> {
  const cart = await readCart();
  if (!cart) redirect("/carrito");
  redirect(cart.checkoutUrl);
}
