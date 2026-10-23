import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { getProduct, type Product } from "@/data/catalog";
import { CAMPAIGN, LOOKBOOK } from "@/data/site";
import { Bubbles } from "@/components/Bubbles";

export const metadata: Metadata = {
  title: "Lookbook ABISSAL",
  description: `Lookbook da coleção ${CAMPAIGN.name}, ${CAMPAIGN.chapter}: aquário abandonado, píer à noite e casa de máquinas.`,
};

/** Posição de cada foto na grade editorial de 12 colunas (desktop). */
const LAYOUT = [
  "lg:col-span-7",
  "lg:col-span-5 lg:mt-40",
  "lg:col-span-5 lg:col-start-2",
  "lg:col-span-6 lg:mt-28",
  "lg:col-span-6",
  "lg:col-span-5 lg:col-start-8 lg:-mt-24",
];

export default function LookbookPage() {
  return (
    <div className="grain relative overflow-hidden bg-abyss text-paper">
      <Bubbles count={16} />
      <header className="relative mx-auto flex max-w-[1600px] flex-col items-center px-5 pb-16 pt-16 text-center md:px-10 md:pt-24">
        <p className="t-label mb-8 flex items-center gap-3 text-[0.72rem] text-glow">
          <span className="h-px w-10 bg-glow" /> Lookbook · {CAMPAIGN.chapter} <span className="h-px w-10 bg-glow" />
        </p>
        <h1 className="sr-only">Lookbook {CAMPAIGN.name}</h1>
        <Image src="/images/editorial/abissal-title.webp" alt="" width={1400} height={683} preload sizes="(min-width: 768px) 640px, 90vw" className="rise w-[min(88vw,640px)]" />
        <p className="mt-10 max-w-[46ch] font-serif text-xl italic leading-snug text-paper/85 md:text-2xl">“{CAMPAIGN.manifesto.split(". ")[0]}.”</p>
      </header>

      <div className="relative w-full">
        <div className="relative aspect-[4/5] md:aspect-[16/9]">
          <Image src="/images/editorial/hero.webp" alt="Elenco da campanha ABISSAL diante do tanque de um aquário abandonado" fill sizes="100vw" className="object-cover object-left md:object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-abyss via-transparent to-abyss" />
        </div>
      </div>

      <div className="relative mx-auto grid max-w-[1600px] gap-x-10 gap-y-16 px-5 py-20 md:px-10 lg:grid-cols-12 lg:gap-y-24 lg:py-28">
        {LOOKBOOK.map((look, i) => {
          const products = look.products.map((s) => getProduct(s)).filter((p): p is Product => !!p);
          return (
            <figure key={look.src} className={clsx("group", LAYOUT[i])} data-reveal>
              <div className="zoom-img relative aspect-[4/5] overflow-hidden">
                <Image src={look.src} alt={look.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
                <span className="tabular absolute left-4 top-4 text-xs text-paper/80">0{i + 1}</span>
              </div>
              <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-3">
                <span className="t-wide text-lg font-semibold uppercase">{look.caption}</span>
                <span className="flex flex-wrap gap-2">
                  {products.map((p) => (
                    <Link key={p.slug} href={`/produto/${p.slug}`} className="border border-paper/30 px-3 py-1.5 text-xs transition-colors hover:border-glow hover:text-glow">
                      {p.name}
                    </Link>
                  ))}
                </span>
              </figcaption>
            </figure>
          );
        })}
      </div>

      <div className="relative border-t border-paper/10 px-5 py-20 text-center md:py-28">
        <p className="t-wide text-[2rem] font-semibold uppercase leading-none md:text-[4rem]">Desça mais fundo</p>
        <p className="mx-auto mt-5 max-w-[44ch] text-sm text-paper/65">{CAMPAIGN.manifesto.split(". ").slice(1).join(". ")}</p>
        <Link href="/colecao/novidades" className="btn btn-light mt-10">
          Comprar a coleção
        </Link>
      </div>
    </div>
  );
}
