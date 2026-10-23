import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "../Icons";

const TILES = [
  { label: "Camisetas", href: "/colecao/camisetas", src: "/images/produtos/anglerfish-classic-tee/modelo.webp", note: "Classic & Heavy" },
  { label: "Moletons", href: "/colecao/moletons", src: "/images/produtos/cardume-hoodie/costas.webp", note: "420 g/m²" },
  { label: "Jaquetas", href: "/colecao/jaquetas", src: "/images/produtos/tridente-varsity-jacket/modelo.webp", note: "Varsity & flanela" },
  { label: "Jeans", href: "/colecao/calcas", src: "/images/produtos/mare-baggy-jeans/modelo.webp", note: "Baggy & jorts" },
];

export function CategoryTiles() {
  return (
    <section aria-labelledby="cat-title" className="pb-16 md:pb-24">
      <div className="mx-auto mb-8 max-w-[1600px] px-5 md:px-10" data-reveal>
        <h2 id="cat-title" className="t-wide text-[1.9rem] font-semibold uppercase leading-none tracking-tight md:text-[2.8rem]">
          Explore
        </h2>
      </div>
      <ul className="grid grid-cols-2 gap-[2px] lg:grid-cols-4">
        {TILES.map((t, i) => (
          <li key={t.href} data-reveal style={{ "--d": `${i * 80}ms` } as React.CSSProperties}>
            <Link href={t.href} className="zoom-img group block">
              <div className="relative aspect-[3/4] overflow-hidden bg-mist">
                <Image src={t.src} alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                <span className="t-wide absolute left-4 top-4 text-[0.7rem] font-semibold tabular">0{i + 1}</span>
              </div>
              <div className="flex items-center justify-between px-3 py-4 md:px-4">
                <div>
                  <p className="t-wide text-lg font-semibold uppercase leading-none md:text-xl">{t.label}</p>
                  <p className="mt-1 text-xs text-mute">{t.note}</p>
                </div>
                <span className="grid size-10 place-items-center rounded-full border border-line transition-all duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                  <ArrowRight />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
