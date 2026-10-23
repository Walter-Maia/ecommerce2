import Link from "next/link";
import type { Product } from "@/data/catalog";
import { ProductCard } from "../ProductCard";

/** Grade de lançamentos sangrada, 4 colunas no desktop, com "Ver tudo" no fim. */
export function FeaturedGrid({ title, kicker, products, href }: { title: string; kicker: string; products: Product[]; href: string }) {
  return (
    <section aria-labelledby="featured-title" className="pt-14 md:pt-20">
      <div className="mx-auto mb-8 flex max-w-[1600px] items-end justify-between gap-6 px-5 md:mb-10 md:px-10" data-reveal>
        <div>
          <p className="t-label mb-2 text-[0.7rem] text-mute">{kicker}</p>
          <h2 id="featured-title" className="t-wide text-[1.9rem] font-semibold uppercase leading-none tracking-tight md:text-[2.8rem]">
            {title}
          </h2>
        </div>
        <Link href={href} className="t-label u-link hidden text-[0.75rem] font-semibold md:inline">
          Ver tudo
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-[2px] lg:grid-cols-4">
        {products.map((p, i) => (
          <div key={p.slug} data-reveal style={{ "--d": `${(i % 4) * 80}ms` } as React.CSSProperties}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center px-5">
        <Link href={href} className="btn btn-dark min-w-[200px]">
          Ver tudo
        </Link>
      </div>
    </section>
  );
}
