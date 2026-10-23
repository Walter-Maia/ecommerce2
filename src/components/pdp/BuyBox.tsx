"use client";

import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import { CATEGORIES, type Product } from "@/data/catalog";
import { FREE_SHIPPING_FROM } from "@/data/site";
import { formatPrice } from "@/lib/format";
import { Price } from "../Price";
import { MinusIcon, PlusIcon, PixIcon, RulerIcon, SwapIcon, TruckIcon } from "../Icons";
import { useStore } from "../StoreProvider";
import { SizeGuide } from "./SizeGuide";

export function BuyBox({ product }: { product: Product }) {
  const { add } = useStore();
  const single = product.sizes.length === 1;
  const soldOut = new Set(product.soldOut ?? []);
  const [size, setSize] = useState<string | null>(single ? product.sizes[0] : null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState(false);
  const [guide, setGuide] = useState(false);
  const category = CATEGORIES.find((c) => c.slug === product.category);

  const submit = () => {
    if (!size) {
      setError(true);
      return;
    }
    add(product.slug, size, qty);
    setQty(1);
  };

  return (
    <div className="px-5 pb-6 pt-8 md:px-10 lg:pt-12">
      <div className="lg:sticky lg:top-[calc(var(--announce-h)+var(--header-h)+2rem)]">
        <p className="t-label text-[0.68rem] text-mute">
          <Link href="/" className="u-hover">
            Início
          </Link>{" "}
          /{" "}
          <Link href={`/colecao/${product.category}`} className="u-hover">
            {category?.name}
          </Link>
        </p>
        <h1 className="t-wide mt-4 text-[1.9rem] font-semibold uppercase leading-[1.02] tracking-tight md:text-[2.3rem]">{product.name}</h1>
        <Price price={product.price} compareAt={product.compareAt} size="lg" className="mt-4" />

        <p className="mt-7 text-sm">
          <span className="text-mute">Cor:</span> {product.color}
        </p>

        <div className="mt-6">
          <div className="flex items-center justify-between">
            <p className="t-label text-[0.78rem] font-medium" id="size-label">
              {single ? "Tamanho" : "Tamanhos"}
            </p>
            {!single ? (
              <button type="button" onClick={() => setGuide(true)} className="u-link flex items-center gap-1.5 text-xs">
                <RulerIcon /> Guia de medidas
              </button>
            ) : null}
          </div>
          <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-labelledby="size-label">
            {product.sizes.map((s) => {
              const out = soldOut.has(s);
              return (
                <button
                  key={s}
                  type="button"
                  role="radio"
                  aria-checked={size === s}
                  disabled={out}
                  onClick={() => {
                    setSize(s);
                    setError(false);
                  }}
                  className={clsx(
                    "tabular relative h-11 min-w-[52px] border px-3 text-[0.82rem] transition-colors",
                    size === s ? "border-ink bg-ink text-paper" : "border-ink/25 hover:border-ink",
                    out && "cursor-not-allowed border-line text-mute/50 hover:border-line",
                  )}
                  aria-label={out ? `${s}, esgotado` : s}
                >
                  {s}
                  {out ? <span className="absolute left-1/2 top-1/2 h-px w-[70%] -translate-x-1/2 -translate-y-1/2 -rotate-[20deg] bg-mute/50" aria-hidden="true" /> : null}
                </button>
              );
            })}
          </div>
          {error ? (
            <p role="alert" className="mt-2 text-xs text-signal">
              Selecione um tamanho.
            </p>
          ) : null}
        </div>

        <div className="mt-6 flex gap-3">
          <div className="flex h-[52px] items-center border border-ink/25">
            <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-full w-11 place-items-center hover:bg-mist" aria-label="Diminuir quantidade">
              <MinusIcon />
            </button>
            <span className="tabular w-8 text-center text-sm" aria-live="polite">
              {qty}
            </span>
            <button type="button" onClick={() => setQty((q) => Math.min(10, q + 1))} className="grid h-full w-11 place-items-center hover:bg-mist" aria-label="Aumentar quantidade">
              <PlusIcon />
            </button>
          </div>
          <button type="button" onClick={submit} className="btn btn-dark h-[52px] flex-1">
            Adicionar à sacola
          </button>
        </div>

        <p className="mt-4 text-[0.82rem] text-mute">{product.model}</p>

        <ul className="mt-6 space-y-3 border-y border-line py-5 text-[0.84rem]">
          <li className="flex items-center gap-3">
            <TruckIcon className="size-5" /> Frete grátis a partir de {formatPrice(FREE_SHIPPING_FROM)}
          </li>
          <li className="flex items-center gap-3">
            <SwapIcon className="size-5" /> Primeira troca grátis em até 30 dias
          </li>
          <li className="flex items-center gap-3">
            <PixIcon className="size-5" /> 10% de desconto pagando com Pix
          </li>
        </ul>

        <div className="divide-y divide-line border-b border-line">
          <Detail title="Descrição" open>
            <p>{product.description}</p>
          </Detail>
          <Detail title="Composição">
            <ul className="list-inside list-disc space-y-1">
              {product.composition.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Detail>
          <Detail title="Trocas e envio">
            <p>
              Postagem em até 2 dias úteis. Primeira troca grátis em até 30 dias após o recebimento, com a peça sem uso e com etiqueta.{" "}
              <Link href="/ajuda#trocas" className="u-link">
                Ver política
              </Link>
            </p>
          </Detail>
        </div>
      </div>
      {guide ? <SizeGuide product={product} onClose={() => setGuide(false)} /> : null}
    </div>
  );
}

function Detail({ title, open, children }: { title: string; open?: boolean; children: React.ReactNode }) {
  return (
    <details open={open} className="group py-4">
      <summary className="t-label flex cursor-pointer list-none items-center justify-between text-[0.78rem] font-medium [&::-webkit-details-marker]:hidden">
        {title}
        <PlusIcon className="size-4 transition-transform duration-300 group-open:rotate-45" />
      </summary>
      <div className="pt-3 text-[0.88rem] leading-relaxed text-ink-2">{children}</div>
    </details>
  );
}
