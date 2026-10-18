import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import { commerce, isInStock, type CollectionFilter, type Size } from "@/lib/commerce";
import { ProductGrid } from "@/components/product/product-grid";
import { Filters } from "@/components/collection/filters";

type Params = { handle: string };
type Search = Record<string, string | string[] | undefined>;

export async function generateStaticParams() {
  const collections = await commerce.getCollections();
  return [{ handle: "all" }, ...collections.map((c) => ({ handle: c.handle }))];
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const collection = await commerce.getCollection((await params).handle);
  return { title: collection?.title ?? "Collection" };
}

function list(v: string | string[] | undefined): string[] {
  return v === undefined ? [] : Array.isArray(v) ? v : [v];
}

function parseFilter(search: Search): CollectionFilter {
  const availability = search.availability;
  return {
    size: list(search.size) as Size[],
    type: list(search.type),
    availability:
      availability === "in-stock" || availability === "out-of-stock" ? availability : undefined,
  };
}

type PageProps = { params: Promise<Params>; searchParams: Promise<Search> };

export default function CollectionPage(props: PageProps) {
  return (
    <Suspense fallback={<div className="mt-10 h-8 w-48 bg-sand" />}>
      <CollectionContent {...props} />
    </Suspense>
  );
}

async function CollectionContent({ params, searchParams }: PageProps) {
  const { handle } = await params;
  const collection = await commerce.getCollection(handle);
  if (!collection) notFound();

  return (
    <div className="mt-10">
      <header className="mb-10">
        <h1 className="text-2xl font-semibold uppercase tracking-[0.2em]">{collection.title}</h1>
        {collection.description && <p className="mt-2 max-w-xl text-sm text-muted">{collection.description}</p>}
      </header>
      <Suspense fallback={<p className="text-sm text-muted">Loading…</p>}>
        <Results handle={handle} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function Results({ handle, searchParams }: { handle: string; searchParams: Promise<Search> }) {
  const filter = parseFilter(await searchParams);
  const [products, unfiltered] = await Promise.all([
    commerce.getCollectionProducts(handle, filter),
    commerce.getCollectionProducts(handle),
  ]);
  const types = [...new Set(unfiltered.map((p) => p.type))];
  const inStock = unfiltered.filter(isInStock).length;

  const filters = (
    <Filters
      basePath={`/collections/${handle}`}
      filter={filter}
      types={types}
      counts={{ inStock, outOfStock: unfiltered.length - inStock }}
    />
  );
  const active = (filter.size?.length ?? 0) + (filter.type?.length ?? 0) + (filter.availability ? 1 : 0);

  return (
    <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-10">
      <details className="group border-y border-line lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-xs uppercase tracking-[0.18em] [&::-webkit-details-marker]:hidden">
          <span>Filter{active > 0 && ` (${active})`}</span>
          <span className="transition-transform group-open:rotate-45">+</span>
        </summary>
        <div className="pb-6">{filters}</div>
      </details>
      <div className="hidden lg:block">{filters}</div>
      <div>
        <p className="mb-6 text-xs uppercase tracking-[0.18em] text-muted">
          {products.length} {products.length === 1 ? "product" : "products"}
        </p>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
