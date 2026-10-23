"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import clsx from "clsx";
import { CATEGORIES, type Product } from "@/data/catalog";
import { ProductCard } from "../ProductCard";

const TABS = [
  { slug: "todos", label: "Shop all" },
  { slug: "novidades", label: "New" },
  { slug: "mais-vendidos", label: "Mais vendidos" },
  ...CATEGORIES.map((c) => ({ slug: c.slug, label: c.name })),
  { slug: "sale", label: "Sale" },
];

const SORTS = {
  relevancia: { label: "Relevância", fn: () => 0 },
  "menor-preco": { label: "Menor preço", fn: (a: Product, b: Product) => a.price - b.price },
  "maior-preco": { label: "Maior preço", fn: (a: Product, b: Product) => b.price - a.price },
  az: { label: "A–Z", fn: (a: Product, b: Product) => a.name.localeCompare(b.name, "pt-BR") },
} as const;
type SortKey = keyof typeof SORTS;

export function ListingView({ slug, title, description, products }: { slug: string; title: string; description: string; products: Product[] }) {
  const [sort, setSort] = useState<SortKey>("relevancia");
  const [size, setSize] = useState<string | null>(null);
  const [cols, setCols] = useState<2 | 4>(4);

  const sizes = useMemo(() => {
    const all = new Set(products.flatMap((p) => p.sizes));
    return [...all];
  }, [products]);

  const list = useMemo(() => {
    const filtered = size ? products.filter((p) => p.sizes.includes(size) && !p.soldOut?.includes(size)) : products;
    return [...filtered].sort(SORTS[sort].fn);
  }, [products, size, sort]);

  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1600px] px-5 pb-8 pt-10 md:px-10 md:pb-10 md:pt-16">
          <p className="t-label text-[0.7rem] text-mute">
            <Link href="/" className="u-hover">
              Início
            </Link>{" "}
            / {title}
          </p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <h1 className="t-wide text-[2.6rem] font-semibold uppercase leading-[0.9] tracking-tight md:text-[4.5rem]">{title}</h1>
            <p className="max-w-[40ch] text-sm text-mute">{description}</p>
          </div>
        </div>
        <nav aria-label="Coleções" className="rail mx-auto flex max-w-[1600px] gap-2 overflow-x-auto px-5 pb-5 md:px-10">
          {TABS.map((t) => (
            <Link
              key={t.slug}
              href={`/colecao/${t.slug}`}
              aria-current={t.slug === slug ? "page" : undefined}
              className={clsx(
                "t-label shrink-0 border px-4 py-2 text-[0.7rem] font-medium transition-colors",
                t.slug === slug ? "border-ink bg-ink text-paper" : "border-line hover:border-ink",
                t.slug === "sale" && t.slug !== slug && "text-signal",
              )}
            >
              {t.label}
            </Link>
          ))}
        </nav>
      </section>

      <div className="sticky top-[calc(var(--announce-h)+var(--header-h))] z-30 border-b border-line bg-paper/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3 px-5 py-3 md:px-10">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="t-label mr-2 text-[0.68rem] text-mute">Tamanho</span>
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={size === s}
                onClick={() => setSize(size === s ? null : s)}
                className={clsx(
                  "tabular min-w-9 border px-2 py-1.5 text-[0.72rem] transition-colors",
                  size === s ? "border-ink bg-ink text-paper" : "border-line hover:border-ink",
                )}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-5">
            <p className="tabular text-xs text-mute" aria-live="polite">
              {list.length} {list.length === 1 ? "produto" : "produtos"}
            </p>
            <label className="flex items-center gap-2 text-xs">
              <span className="t-label text-[0.68rem] text-mute">Ordenar</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="cursor-pointer border-b border-ink bg-transparent py-1 pr-1 text-xs outline-none">
                {Object.entries(SORTS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.label}
                  </option>
                ))}
              </select>
            </label>
            <div className="hidden items-center gap-1 lg:flex" role="group" aria-label="Colunas da grade">
              {([2, 4] as const).map((n) => (
                <button key={n} type="button" aria-pressed={cols === n} onClick={() => setCols(n)} className={clsx("grid size-8 place-items-center", cols === n ? "text-ink" : "text-mute/50")} aria-label={`${n} colunas`}>
                  <span className={clsx("grid gap-[2px]", n === 2 ? "grid-cols-2" : "grid-cols-4")}>
                    {Array.from({ length: n * 2 }).map((_, i) => (
                      <span key={i} className={clsx("block bg-current", n === 2 ? "size-[6px]" : "size-[3px]")} />
                    ))}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {list.length === 0 ? (
        <div className="mx-auto max-w-[1600px] px-5 py-24 text-center md:px-10">
          <p className="t-wide text-xl font-medium uppercase">Nada nesse tamanho por aqui</p>
          <button type="button" onClick={() => setSize(null)} className="btn btn-outline mt-6">
            Limpar filtro
          </button>
        </div>
      ) : (
        <div className={clsx("grid grid-cols-2 gap-[2px] pb-16", cols === 4 ? "lg:grid-cols-4" : "lg:grid-cols-2")}>
          {list.map((p, i) => (
            <div key={p.slug} data-reveal style={{ "--d": `${(i % 4) * 70}ms` } as React.CSSProperties}>
              <ProductCard product={p} preload={i < 4} sizes={cols === 2 ? "50vw" : "(min-width: 1024px) 25vw, 50vw"} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
