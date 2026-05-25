"use client";

import { useState, useTransition } from "react";
import { addToCart, buyNow } from "@/app/carrito/actions";

export function AddToCart({ handle }: { handle: string }) {
  const [adding, startAdding] = useTransition();
  const [buying, startBuying] = useTransition();
  const [feedback, setFeedback] = useState<string | null>(null);

  function handleAdd() {
    setFeedback(null);
    startAdding(async () => {
      const res = await addToCart(handle);
      setFeedback(res.ok ? "Agregado al carrito" : (res.error ?? "Error"));
    });
  }

  function handleBuy() {
    startBuying(async () => {
      await buyNow(handle);
    });
  }

  return (
    <div className="mt-12 space-y-3">
      <button
        type="button"
        onClick={handleBuy}
        disabled={buying || adding}
        className="w-full bg-tinta text-papel px-6 py-4 text-sm tracking-wide hover:bg-sepia transition disabled:opacity-50"
      >
        {buying ? "Llevando al checkout…" : "Comprar ahora"}
      </button>
      <button
        type="button"
        onClick={handleAdd}
        disabled={adding || buying}
        className="w-full border border-tinta px-6 py-4 text-sm tracking-wide hover:bg-tinta hover:text-papel transition disabled:opacity-50"
      >
        {adding ? "Agregando…" : "Agregar al carrito"}
      </button>
      {feedback && (
        <p
          className={`text-xs text-center ${
            feedback.toLowerCase().includes("error") ||
            feedback.toLowerCase().includes("no ")
              ? "text-red-700"
              : "text-musgo"
          }`}
          aria-live="polite"
        >
          {feedback}
        </p>
      )}
      <p className="text-[0.7rem] text-ceniza text-center mt-3 leading-relaxed">
        Pago procesado por Valiz, sello que distribuye ORIA.
      </p>
    </div>
  );
}
