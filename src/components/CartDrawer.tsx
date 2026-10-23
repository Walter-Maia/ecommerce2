"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { productImages } from "@/data/catalog";
import { FREE_SHIPPING_FROM } from "@/data/site";
import { formatInstallments, formatPrice, pixPrice } from "@/lib/format";
import { CloseIcon, MinusIcon, PlusIcon } from "./Icons";
import { useStore } from "./StoreProvider";

export function CartDrawer() {
  const { cartOpen, closeCart, lines, count, subtotal, setQty, remove } = useStore();

  useEffect(() => {
    if (!cartOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [cartOpen, closeCart]);

  if (!cartOpen) return null;

  const missing = Math.max(0, FREE_SHIPPING_FROM - subtotal);
  const progress = Math.min(1, subtotal / FREE_SHIPPING_FROM);

  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label="Sacola de compras">
      <button type="button" className="fade-in absolute inset-0 bg-ink/45 backdrop-blur-[2px]" onClick={closeCart} aria-label="Fechar sacola" />
      <aside className="drawer-enter absolute inset-y-0 right-0 flex w-full max-w-[460px] flex-col bg-paper">
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="t-label text-sm font-semibold">
            Sacola <span className="tabular font-normal text-mute">({count})</span>
          </h2>
          <button type="button" onClick={closeCart} className="-mr-2 p-2" aria-label="Fechar sacola">
            <CloseIcon />
          </button>
        </div>

        {lines.length > 0 ? (
          <div className="border-b border-line px-6 py-4">
            <p className="text-[0.8rem]">
              {missing > 0 ? (
                <>
                  Faltam <strong className="font-semibold">{formatPrice(missing)}</strong> para o <strong className="font-semibold">frete grátis</strong>
                </>
              ) : (
                <strong className="font-semibold">Você ganhou frete grátis 🌊</strong>
              )}
            </p>
            <div className="mt-2.5 h-[3px] bg-mist">
              <div className="h-full bg-ink transition-[width] duration-700" style={{ width: `${progress * 100}%` }} />
            </div>
          </div>
        ) : null}

        <div className="flex-1 overflow-y-auto">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-5 px-8 text-center">
              <p className="t-wide text-xl font-medium uppercase">Sua sacola está vazia</p>
              <p className="max-w-[28ch] text-sm text-mute">O fundo do mar está cheio de coisa boa. Comece pelos lançamentos.</p>
              <Link href="/colecao/novidades" onClick={closeCart} className="btn btn-dark mt-2">
                Ver lançamentos
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-line">
              {lines.map((l) => {
                const img = productImages(l.product);
                return (
                  <li key={`${l.slug}-${l.size}`} className="flex gap-4 px-6 py-5">
                    <Link href={`/produto/${l.slug}`} onClick={closeCart} className="relative aspect-[4/5] w-[92px] shrink-0 overflow-hidden bg-mist">
                      <Image src={img.front.src} alt={img.front.alt} fill sizes="92px" className="object-cover" />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link href={`/produto/${l.slug}`} onClick={closeCart} className="text-[0.92rem] leading-snug">
                            {l.product.name}
                          </Link>
                          <p className="mt-1 text-xs text-mute">
                            {l.product.color} · Tam. {l.size}
                          </p>
                        </div>
                        <p className="tabular whitespace-nowrap text-sm">{formatPrice(l.product.price * l.qty)}</p>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="flex items-center border border-line">
                          <button type="button" onClick={() => setQty(l.slug, l.size, l.qty - 1)} className="grid size-8 place-items-center hover:bg-mist" aria-label="Diminuir quantidade">
                            <MinusIcon className="size-3.5" />
                          </button>
                          <span className="tabular w-8 text-center text-sm" aria-live="polite">
                            {l.qty}
                          </span>
                          <button type="button" onClick={() => setQty(l.slug, l.size, l.qty + 1)} className="grid size-8 place-items-center hover:bg-mist" aria-label="Aumentar quantidade">
                            <PlusIcon className="size-3.5" />
                          </button>
                        </div>
                        <button type="button" onClick={() => remove(l.slug, l.size)} className="u-link text-xs text-mute">
                          Remover
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {lines.length > 0 ? (
          <div className="border-t border-line px-6 py-5">
            <div className="flex items-baseline justify-between">
              <span className="text-sm">Subtotal</span>
              <span className="tabular text-lg font-medium">{formatPrice(subtotal)}</span>
            </div>
            <p className="tabular mt-1 text-right text-xs text-mute">
              {formatPrice(pixPrice(subtotal))} no Pix · ou {formatInstallments(subtotal)}
            </p>
            <Link href="/checkout" onClick={closeCart} className="btn btn-dark mt-5 w-full">
              Finalizar compra
            </Link>
            <button type="button" onClick={closeCart} className="u-link mx-auto mt-4 block text-xs">
              Continuar comprando
            </button>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
