import Image from "next/image";
import Link from "next/link";
import { CAMPAIGN, LOOKBOOK } from "@/data/site";
import { Bubbles } from "../Bubbles";
import { ArrowRight } from "../Icons";

const WORDS = ["Onde a luz não chega", "ABISSAL", "Capítulo 03", "Feito em São Paulo"];

/**
 * Momento escuro da home: letreiro gigante vazado, foto da campanha com o
 * manifesto e um trilho com as fotos do lookbook.
 */
export function CampaignSection() {
  const words = [...WORDS, ...WORDS];
  return (
    <section className="grain relative overflow-hidden bg-abyss text-paper" aria-labelledby="campaign-title">
      <Bubbles count={10} />

      <div className="overflow-hidden border-b border-paper/10 py-6 md:py-8" aria-hidden="true">
        <div className="marquee [animation-duration:60s]">
          {[0, 1].map((half) => (
            <div key={half} className="flex shrink-0 items-center">
              {words.map((w, i) => (
                <span key={i} className="t-wide flex items-center whitespace-nowrap text-[3.2rem] font-semibold uppercase leading-none md:text-[6.5rem]">
                  <span className={i % 2 ? "text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.55)]" : ""}>{w}</span>
                  <span className="mx-8 inline-block size-3 rounded-full bg-glow shadow-[0_0_24px_var(--glow)] md:mx-12 md:size-4" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto grid max-w-[1600px] gap-10 px-5 py-14 md:grid-cols-[1.15fr_1fr] md:items-center md:gap-16 md:px-10 md:py-24">
        <div className="zoom-img relative aspect-[4/5] overflow-hidden md:aspect-[5/6]" data-reveal>
          <Image src="/images/editorial/lookbook-05.webp" alt={LOOKBOOK[4].alt} fill sizes="(min-width: 768px) 55vw, 100vw" className="object-cover" />
          <span className="t-label absolute bottom-4 left-4 bg-abyss/70 px-3 py-1.5 text-[0.65rem] backdrop-blur">Lookbook — {LOOKBOOK[4].caption}</span>
        </div>
        <div className="max-w-[520px]" data-reveal style={{ "--d": "150ms" } as React.CSSProperties}>
          <p className="t-label mb-6 flex items-center gap-3 text-[0.72rem] text-glow">
            <span className="h-px w-10 bg-glow" /> {CAMPAIGN.chapter}
          </p>
          <h2 id="campaign-title" className="sr-only">
            {CAMPAIGN.name}
          </h2>
          <Image src="/images/editorial/abissal-title.webp" alt="" width={1400} height={683} sizes="(min-width: 768px) 520px, 90vw" className="w-full max-w-[460px]" />
          <p className="mt-8 font-serif text-[1.35rem] italic leading-snug text-paper/90 md:text-[1.6rem]">“{CAMPAIGN.manifesto.split(". ")[0]}.”</p>
          <p className="mt-5 text-[0.95rem] leading-relaxed text-paper/65">{CAMPAIGN.manifesto.split(". ").slice(1).join(". ")}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/colecao/novidades" className="btn btn-light">
              Comprar coleção
            </Link>
            <Link href="/lookbook" className="btn border border-paper/40 text-paper hover:border-paper">
              Ver lookbook <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="relative pb-16 md:pb-24">
        <div className="rail flex gap-3 overflow-x-auto px-5 md:gap-4 md:px-10">
          {LOOKBOOK.map((l, i) => (
            <Link
              key={l.src}
              href="/lookbook"
              className="zoom-img group relative w-[62vw] shrink-0 overflow-hidden sm:w-[38vw] lg:w-[23vw]"
              data-reveal
              style={{ "--d": `${i * 70}ms` } as React.CSSProperties}
            >
              <div className="relative aspect-[4/5]">
                <Image src={l.src} alt={l.alt} fill sizes="(min-width: 1024px) 23vw, 62vw" className="object-cover" />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-abyss/90 to-transparent p-4 pt-12">
                <span className="text-sm">{l.caption}</span>
                <span className="tabular text-xs text-paper/60">0{i + 1}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
