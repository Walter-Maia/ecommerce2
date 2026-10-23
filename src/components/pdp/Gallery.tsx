"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { CloseIcon } from "../Icons";

interface Img {
  src: string;
  alt: string;
  tone: "mist" | "dark";
}

/**
 * Galeria da PDP: grade de 2 colunas no desktop (como as lojas de drop),
 * trilho com swipe e contador no celular. Clique abre a foto em tela cheia.
 */
export function Gallery({ images, name }: { images: Img[]; name: string }) {
  const rail = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState<number | null>(null);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const onScroll = () => setIndex(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (zoom === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(null);
      if (e.key === "ArrowRight") setZoom((z) => (z === null ? z : (z + 1) % images.length));
      if (e.key === "ArrowLeft") setZoom((z) => (z === null ? z : (z - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [zoom, images.length]);

  return (
    <div className="relative">
      <div ref={rail} className="rail flex overflow-x-auto lg:grid lg:grid-cols-2 lg:gap-[2px] lg:overflow-visible">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setZoom(i)}
            className={clsx("relative aspect-[4/5] w-full shrink-0 cursor-zoom-in overflow-hidden lg:w-auto", img.tone === "mist" ? "bg-mist" : "bg-abyss")}
            aria-label={`Ampliar foto ${i + 1} de ${images.length}: ${img.alt}`}
          >
            <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 30vw, 100vw" preload={i === 0} className="object-cover" />
          </button>
        ))}
      </div>
      <div className="tabular pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 lg:hidden" aria-hidden="true">
        {images.map((_, i) => (
          <span key={i} className={clsx("h-[3px] rounded-full transition-all", i === index ? "w-6 bg-ink" : "w-3 bg-ink/25")} />
        ))}
      </div>

      {zoom !== null ? (
        <div className="fade-in fixed inset-0 z-[95] bg-paper" role="dialog" aria-modal="true" aria-label={`Fotos de ${name}`}>
          <button type="button" onClick={() => setZoom(null)} className="absolute right-5 top-5 z-10 grid size-11 place-items-center bg-paper" aria-label="Fechar">
            <CloseIcon className="size-6" />
          </button>
          <div className={clsx("relative h-full w-full", images[zoom].tone === "mist" ? "bg-mist" : "bg-abyss")}>
            <Image src={images[zoom].src} alt={images[zoom].alt} fill sizes="100vw" quality={85} className="object-contain" />
          </div>
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
            {images.map((img, i) => (
              <button key={img.src} type="button" onClick={() => setZoom(i)} className={clsx("relative h-16 w-12 overflow-hidden border", i === zoom ? "border-ink" : "border-transparent opacity-60")} aria-label={`Foto ${i + 1}`}>
                <Image src={img.src} alt="" fill sizes="48px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
