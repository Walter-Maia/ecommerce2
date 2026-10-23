import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { productImages, type Product } from "@/data/catalog";
import { discountPercent } from "@/lib/format";
import { Price } from "./Price";
import { QuickAdd } from "./QuickAdd";

/**
 * Card no padrão da loja: packshot em fundo cinza, costas no hover,
 * nome à esquerda e preço no Pix à direita. Tamanhos rápidos aparecem no hover.
 */
export function ProductCard({ product, sizes, preload, className }: { product: Product; sizes?: string; preload?: boolean; className?: string }) {
  const img = productImages(product);
  const off = discountPercent(product.price, product.compareAt);
  const href = `/produto/${product.slug}`;
  const imgSizes = sizes ?? "(min-width: 1024px) 25vw, 50vw";
  return (
    <article className={clsx("card relative", className)}>
      <div className="relative overflow-hidden">
        <Link href={href} className="card-media relative block aspect-[4/5] overflow-hidden bg-mist" aria-label={product.name}>
          <Image src={img.front.src} alt={img.front.alt} fill sizes={imgSizes} preload={preload} className="main object-cover" />
          <Image src={img.back.src} alt="" fill sizes={imgSizes} className="alt object-cover" />
          <span className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
            {off ? <span className="bg-signal px-2 py-1 text-[0.65rem] font-semibold tracking-wider text-paper">-{off}%</span> : null}
            {product.isNew && !off ? <span className="t-label bg-paper px-2 py-1 text-[0.62rem] font-semibold">New</span> : null}
          </span>
        </Link>
        <QuickAdd product={product} />
      </div>
      <Link href={href} className="flex flex-col gap-1.5 px-2.5 pb-5 pt-3 md:flex-row md:items-start md:justify-between md:gap-3 md:px-3">
        <h3 className="max-w-[16ch] text-[0.86rem] leading-snug md:text-[0.92rem]">{product.name}</h3>
        <Price price={product.price} compareAt={product.compareAt} />
      </Link>
    </article>
  );
}
