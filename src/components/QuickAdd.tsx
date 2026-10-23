"use client";

import clsx from "clsx";
import type { Product } from "@/data/catalog";
import { useStore } from "./StoreProvider";

/** Barra de tamanhos que sobe no hover do card (desktop). */
export function QuickAdd({ product }: { product: Product }) {
  const { add } = useStore();
  const soldOut = new Set(product.soldOut ?? []);
  const single = product.sizes.length === 1;
  return (
    <div className="quick absolute inset-x-0 bottom-0 hidden bg-paper/92 backdrop-blur-sm md:block">
      {single ? (
        <button
          type="button"
          onClick={() => add(product.slug, product.sizes[0])}
          className="t-label w-full py-3.5 text-[0.72rem] font-semibold transition-colors hover:bg-ink hover:text-paper"
        >
          Adicionar à sacola
        </button>
      ) : (
        <div className="flex items-center">
          <span className="t-label shrink-0 px-3 text-[0.62rem] text-mute">Adicionar</span>
          <ul className="flex flex-1 justify-end">
            {product.sizes.map((s) => {
              const out = soldOut.has(s);
              return (
                <li key={s} className="flex-1">
                  <button
                    type="button"
                    disabled={out}
                    onClick={() => add(product.slug, s)}
                    aria-label={out ? `${s} esgotado` : `Adicionar tamanho ${s} à sacola`}
                    className={clsx(
                      "tabular w-full py-3.5 text-[0.72rem] font-medium transition-colors",
                      out ? "cursor-not-allowed text-mute/50 line-through" : "hover:bg-ink hover:text-paper",
                    )}
                  >
                    {s}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
