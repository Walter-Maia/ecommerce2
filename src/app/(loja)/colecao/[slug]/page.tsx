import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COLLECTIONS, getCollection, PRODUCTS } from "@/data/catalog";
import { ListingView } from "@/components/listing/ListingView";

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCollection(slug);
  return c ? { title: c.name, description: c.description } : {};
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();
  const products = PRODUCTS.filter(collection.filter);
  return <ListingView slug={collection.slug} title={collection.name} description={collection.description} products={products} />;
}
