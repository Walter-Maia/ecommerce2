import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, PRODUCTS, productImages, related } from "@/data/catalog";
import { LOOKBOOK } from "@/data/site";
import { pixPrice } from "@/lib/format";
import { Gallery } from "@/components/pdp/Gallery";
import { BuyBox } from "@/components/pdp/BuyBox";
import { ProductCard } from "@/components/ProductCard";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  const img = productImages(p);
  return {
    title: p.name,
    description: p.description,
    openGraph: { images: [{ url: img.front.src, width: 1200, height: 1500, alt: img.front.alt }] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const img = productImages(product);
  const looks = LOOKBOOK.filter((l) => (l.products as readonly string[]).includes(product.slug));
  const images = [
    { ...img.front, tone: "mist" as const },
    { ...img.back, tone: "mist" as const },
    { ...img.model, tone: "mist" as const },
    ...looks.map((l) => ({ src: l.src, alt: l.alt, tone: "dark" as const })),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    color: product.color,
    image: images.map((i) => i.src),
    brand: { "@type": "Brand", name: "NEPZERA" },
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      price: (pixPrice(product.price) / 100).toFixed(2),
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[minmax(0,1.55fr)_minmax(380px,1fr)]">
        <Gallery images={images} name={product.name} />
        <BuyBox product={product} />
      </div>

      <section aria-labelledby="related-title" className="mt-10 border-t border-line pt-14 md:mt-16">
        <h2 id="related-title" className="t-wide mx-auto mb-8 max-w-[1600px] px-5 text-[1.6rem] font-semibold uppercase leading-none tracking-tight md:px-10 md:text-[2.2rem]">
          Você também vai curtir
        </h2>
        <div className="grid grid-cols-2 gap-[2px] pb-16 lg:grid-cols-4">
          {related(product).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
