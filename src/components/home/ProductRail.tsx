"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Product } from "@/data/catalog";
import { ArrowLeft, ArrowRight } from "../Icons";
import { ProductCard } from "../ProductCard";

/** Carrossel com scroll-snap nativo, setas e barra de progresso. */
export function ProductRail({ title, href, products }: { title: string; href: string; products: Product[] }) {
  const rail = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(0.25);

  const update = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setVisible(Math.min(1, el.clientWidth / el.scrollWidth));
  }, []);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    el.addEventListener("scroll", update, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", update);
    };
  }, [update]);

  const go = (dir: 1 | -1) => rail.current?.scrollBy({ left: dir * rail.current.clientWidth * 0.75, behavior: "smooth" });

  return (
    <section aria-labelledby="rail-title" className="py-14 md:py-20">
      <div className="mx-auto mb-8 flex max-w-[1600px] items-end justify-between gap-6 px-5 md:px-10" data-reveal>
        <h2 id="rail-title" className="t-wide text-[1.9rem] font-semibold uppercase leading-none tracking-tight md:text-[2.8rem]">
          {title}
        </h2>
        <Link href={href} className="t-label u-link shrink-0 whitespace-nowrap text-[0.75rem] font-semibold">
          Ver tudo
        </Link>
      </div>
      <div ref={rail} className="rail flex gap-[2px] overflow-x-auto" tabIndex={0} aria-label={`${title}: role para os lados`}>
        {products.map((p) => (
          <div key={p.slug} className="w-[72vw] shrink-0 sm:w-[46vw] lg:w-[calc((100vw-6px)/4)]">
            <ProductCard product={p} sizes="(min-width: 1024px) 25vw, 72vw" />
          </div>
        ))}
      </div>
      <div className="mx-auto mt-4 flex max-w-[1600px] items-center gap-6 px-5 md:px-10">
        <div className="relative h-px flex-1 bg-line" aria-hidden="true">
          <div
            className="absolute inset-y-[-1px] bg-ink transition-[left] duration-200"
            style={{ width: `${visible * 100}%`, left: `${progress * (1 - visible) * 100}%` }}
          />
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(-1)} disabled={progress <= 0.01} className="grid size-10 place-items-center border border-line transition-colors hover:border-ink disabled:opacity-30" aria-label="Anterior">
            <ArrowLeft />
          </button>
          <button type="button" onClick={() => go(1)} disabled={progress >= 0.99} className="grid size-10 place-items-center border border-line transition-colors hover:border-ink disabled:opacity-30" aria-label="Próximo">
            <ArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}
