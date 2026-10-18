import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import { commerce } from "@/lib/commerce";
import { formatMoney } from "@/lib/utils/money";
import { Gallery } from "@/components/product/gallery";
import { AddToCart } from "@/components/product/add-to-cart";

type Params = { handle: string };

export async function generateStaticParams() {
  const products = await commerce.getProducts();
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const product = await commerce.getProduct((await params).handle);
  return { title: product?.title ?? "Product", description: product?.description };
}

export default function ProductPage({ params }: { params: Promise<Params> }) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductContent params={params} />
    </Suspense>
  );
}

function ProductSkeleton() {
  return (
    <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div className="aspect-[4/5] bg-sand" />
      <div className="space-y-3">
        <div className="h-6 w-2/3 bg-sand" />
        <div className="h-4 w-1/4 bg-sand" />
      </div>
    </div>
  );
}

async function ProductContent({ params }: { params: Promise<Params> }) {
  const product = await commerce.getProduct((await params).handle);
  if (!product) notFound();

  return (
    <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
      <Gallery images={product.images} />
      <div className="lg:sticky lg:top-28 lg:self-start">
        <h1 className="text-xl font-medium leading-snug">{product.title}</h1>
        <p className="mt-2 text-sm">
          {formatMoney(product.price)}
          {product.compareAtPrice && (
            <span className="ml-2 text-muted line-through">{formatMoney(product.compareAtPrice)}</span>
          )}
        </p>
        <p className="mt-1 text-xs text-muted">Taxes included. Shipping calculated at checkout.</p>
        <div className="mt-8">
          <AddToCart product={product} />
        </div>
        <p className="mt-8 text-sm leading-relaxed text-muted">{product.description}</p>
      </div>
    </div>
  );
}
