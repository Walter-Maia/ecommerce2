"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { CATEGORIES, PRODUCTS, productImages } from "@/data/catalog";
import { formatPrice, pixPrice } from "@/lib/format";
import { CloseIcon, SearchIcon } from "./Icons";
import { useStore } from "./StoreProvider";

const SUGGESTIONS = ["Heavy Tee", "Hoodie", "Medusa", "Jeans", "Boné"];

/** Remove acentos e caixa para a busca casar "mare" com "Maré". */
function norm(s: string) {
  return s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const [q, setQ] = useState("");
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!searchOpen) return;
    input.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSearchOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [searchOpen, setSearchOpen]);

  const results = useMemo(() => {
    const term = norm(q.trim());
    if (term.length < 2) return [];
    return PRODUCTS.filter((p) => {
      const cat = CATEGORIES.find((c) => c.slug === p.category)?.name ?? "";
      return norm(`${p.name} ${p.color} ${cat} ${p.description}`).includes(term);
    }).slice(0, 8);
  }, [q]);

  if (!searchOpen) return null;
  const close = () => setSearchOpen(false);

  return (
    <div className="fixed inset-0 z-[90]" role="dialog" aria-modal="true" aria-label="Buscar produtos">
      <button type="button" className="fade-in absolute inset-0 bg-ink/45 backdrop-blur-[2px]" onClick={close} aria-label="Fechar busca" />
      <div className="drop-in relative max-h-[90vh] overflow-y-auto bg-paper">
        <div className="mx-auto max-w-[1200px] px-5 pb-10 pt-6 md:px-10">
          <div className="flex items-center gap-4 border-b border-ink pb-3">
            <SearchIcon className="size-6 shrink-0" />
            <input
              ref={input}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="O que você procura?"
              aria-label="Buscar produtos"
              className="t-wide w-full bg-transparent py-2 text-xl font-medium outline-none placeholder:text-mute/60 md:text-3xl"
            />
            <button type="button" onClick={close} className="p-2" aria-label="Fechar busca">
              <CloseIcon className="size-6" />
            </button>
          </div>

          {q.trim().length < 2 ? (
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="t-label mr-2 text-[0.7rem] text-mute">Mais buscados</span>
              {SUGGESTIONS.map((s) => (
                <button key={s} type="button" onClick={() => setQ(s)} className="border border-line px-3.5 py-1.5 text-sm transition-colors hover:border-ink">
                  {s}
                </button>
              ))}
            </div>
          ) : results.length === 0 ? (
            <p className="mt-8 text-sm text-mute">Nada encontrado para “{q}”. Tente outra palavra.</p>
          ) : (
            <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4">
              {results.map((p) => {
                const img = productImages(p);
                return (
                  <li key={p.slug}>
                    <Link href={`/produto/${p.slug}`} onClick={close} className="group block">
                      <div className="relative aspect-[4/5] overflow-hidden bg-mist">
                        <Image src={img.front.src} alt={img.front.alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      </div>
                      <p className="mt-2 text-sm">{p.name}</p>
                      <p className="tabular text-xs text-mute">{formatPrice(pixPrice(p.price))} no Pix</p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
