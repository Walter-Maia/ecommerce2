import { getProduct, PRODUCTS, type Product } from "@/data/catalog";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/home/Hero";
import { FeaturedGrid } from "@/components/home/FeaturedGrid";
import { Advantages } from "@/components/home/Advantages";
import { CampaignSection } from "@/components/home/CampaignSection";
import { ProductRail } from "@/components/home/ProductRail";
import { CategoryTiles } from "@/components/home/CategoryTiles";

const LAUNCHES = [
  "anglerfish-classic-tee",
  "kraken-heavy-tee",
  "medusa-blue-heavy-tee",
  "cardume-hoodie",
  "escafandro-long-tee",
  "tridente-varsity-jacket",
  "medusa-black-heavy-tee",
  "rede-mesh-jersey",
];

export default function Home() {
  const launches = LAUNCHES.map(getProduct).filter((p): p is Product => !!p);
  const bestSellers = PRODUCTS.filter((p) => p.bestSeller);
  return (
    <>
      <Hero />
      <SiteHeader />
      <main>
        <FeaturedGrid kicker="ABISSAL — Capítulo 03" title="Lançamentos" products={launches} href="/colecao/novidades" />
        <div className="mt-14 md:mt-20">
          <Advantages />
        </div>
        <ProductRail title="Mais vendidos" href="/colecao/mais-vendidos" products={bestSellers} />
        <CampaignSection />
        <div className="pt-16 md:pt-24">
          <CategoryTiles />
        </div>
      </main>
      <Footer />
    </>
  );
}
