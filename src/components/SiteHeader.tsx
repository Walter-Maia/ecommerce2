"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { CATEGORIES } from "@/data/catalog";
import { AnnouncementBar } from "./AnnouncementBar";
import { Logo } from "./Logo";
import { BagIcon, ChevronDown, CloseIcon, MenuIcon, SearchIcon, UserIcon } from "./Icons";
import { useStore } from "./StoreProvider";

const NAV = [
  { label: "New", href: "/colecao/novidades" },
  { label: "Produtos", href: "/colecao/todos", mega: true },
  { label: "Lookbook", href: "/lookbook" },
  { label: "Sale", href: "/colecao/sale" },
];

const COLLECTION_LINKS = [
  { label: "Shop all", href: "/colecao/todos" },
  { label: "New", href: "/colecao/novidades" },
  { label: "Mais vendidos", href: "/colecao/mais-vendidos" },
  { label: "Sale", href: "/colecao/sale" },
];

/**
 * Cabeçalho fixo: faixa de avisos + logo, navegação central e ícones.
 * Na home ele vem depois do hero e "gruda" no topo quando chega lá.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const { count, openCart, setSearchOpen } = useStore();
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [lastPath, setLastPath] = useState(pathname);

  // fecha menus ao trocar de página
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMega(false);
    setMobile(false);
  }

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobile]);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMega(true);
  };
  const closeMega = () => {
    closeTimer.current = setTimeout(() => setMega(false), 120);
  };

  return (
    <header className="sticky top-0 z-50" onKeyDown={(e) => e.key === "Escape" && setMega(false)}>
      <AnnouncementBar />
      <div className="relative border-b border-line bg-paper/95 backdrop-blur-md">
        <div className="mx-auto grid h-[var(--header-h)] max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-4 md:px-10">
          <div className="flex items-center">
            <button type="button" className="-ml-1 p-1 lg:hidden" onClick={() => setMobile(true)} aria-label="Abrir menu">
              <MenuIcon />
            </button>
            <Link href="/" className="hidden lg:block" aria-label="NEPZERA, página inicial">
              <Logo />
            </Link>
          </div>

          <Link href="/" className="lg:hidden" aria-label="NEPZERA, página inicial">
            <Logo />
          </Link>
          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {NAV.map((item) =>
                item.mega ? (
                  <li key={item.label} onMouseEnter={openMega} onMouseLeave={closeMega}>
                    <button
                      type="button"
                      aria-expanded={mega}
                      aria-controls="mega-menu"
                      onClick={() => setMega((v) => !v)}
                      className="t-label u-hover flex items-center gap-1.5 text-[0.78rem] font-medium"
                    >
                      {item.label}
                      <ChevronDown className={clsx("size-3.5 transition-transform", mega && "rotate-180")} />
                    </button>
                  </li>
                ) : (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={clsx("t-label u-hover text-[0.78rem] font-medium", item.label === "Sale" && "text-signal")}
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center justify-end gap-1 md:gap-3">
            <button type="button" onClick={() => setSearchOpen(true)} className="p-2 transition-opacity hover:opacity-60" aria-label="Buscar">
              <SearchIcon />
            </button>
            <Link href="/conta" className="hidden p-2 transition-opacity hover:opacity-60 sm:block" aria-label="Minha conta e pedidos">
              <UserIcon />
            </Link>
            <button type="button" onClick={openCart} className="relative p-2 transition-opacity hover:opacity-60" aria-label={`Sacola, ${count} ${count === 1 ? "item" : "itens"}`}>
              <BagIcon />
              {count > 0 ? (
                <span className="tabular absolute right-0 top-0 grid size-[18px] place-items-center rounded-full bg-ink text-[0.6rem] font-semibold text-paper">
                  {count}
                </span>
              ) : null}
            </button>
          </div>
        </div>

        {mega ? (
          <div
            id="mega-menu"
            onMouseEnter={openMega}
            onMouseLeave={closeMega}
            className="drop-in absolute inset-x-0 top-full hidden border-b border-line bg-paper shadow-[0_30px_60px_-30px_rgb(0_0_0/0.25)] lg:block"
          >
            <div className="mx-auto grid max-w-[1600px] grid-cols-[1fr_1fr_2fr] gap-10 px-10 py-10">
              <div>
                <p className="t-label mb-5 text-[0.7rem] text-mute">Categorias</p>
                <ul className="space-y-3">
                  {CATEGORIES.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/colecao/${c.slug}`} className="u-hover text-[1.05rem]">
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="t-label mb-5 text-[0.7rem] text-mute">Coleções</p>
                <ul className="space-y-3">
                  {COLLECTION_LINKS.map((c) => (
                    <li key={c.href}>
                      <Link href={c.href} className="u-hover text-[1.05rem]">
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <MegaFeature href="/lookbook" src="/images/editorial/lookbook-01.webp" title="ABISSAL — Lookbook" note="Capítulo 03" />
                <MegaFeature href="/colecao/moletons" src="/images/produtos/cardume-hoodie/costas.webp" title="Cardume Hoodie" note="Moletom 420 g/m²" gray />
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {mobile ? <MobileMenu onClose={() => setMobile(false)} /> : null}
    </header>
  );
}

function MegaFeature({ href, src, title, note, gray }: { href: string; src: string; title: string; note: string; gray?: boolean }) {
  return (
    <Link href={href} className="zoom-img group block">
      <div className={clsx("relative aspect-[16/10] overflow-hidden", gray ? "bg-mist" : "bg-abyss")}>
        <Image src={src} alt="" fill sizes="25vw" className={clsx(gray ? "object-contain" : "object-cover")} />
      </div>
      <p className="mt-3 text-sm font-medium">{title}</p>
      <p className="text-xs text-mute">{note}</p>
    </Link>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
      <button type="button" className="fade-in absolute inset-0 bg-ink/40" onClick={onClose} aria-label="Fechar menu" />
      <div className="drop-in absolute inset-y-0 left-0 flex w-[min(88vw,380px)] flex-col overflow-y-auto bg-paper">
        <div className="flex h-16 items-center justify-between border-b border-line px-5">
          <Logo />
          <button type="button" onClick={onClose} className="p-2" aria-label="Fechar menu">
            <CloseIcon />
          </button>
        </div>
        <nav className="flex-1 px-5 py-6" aria-label="Menu móvel">
          <ul className="space-y-1">
            {COLLECTION_LINKS.map((c) => (
              <li key={c.href}>
                <Link href={c.href} className={clsx("t-wide block py-2 text-2xl font-medium uppercase", c.label === "Sale" && "text-signal")}>
                  {c.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/lookbook" className="t-wide block py-2 text-2xl font-medium uppercase">
                Lookbook
              </Link>
            </li>
          </ul>
          <p className="t-label mb-3 mt-8 text-[0.7rem] text-mute">Categorias</p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/colecao/${c.slug}`} className="text-[0.95rem]">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-line px-5 py-5 text-sm">
          <Link href="/conta" className="flex items-center gap-2">
            <UserIcon /> Meus pedidos
          </Link>
        </div>
      </div>
    </div>
  );
}
