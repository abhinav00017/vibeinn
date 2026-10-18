import Image from "next/image";
import Link from "next/link";
import { commerce } from "@/lib/commerce";
import { siteConfig } from "@/config/site";
import { ProductGrid } from "@/components/product/product-grid";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const [collections, products] = await Promise.all([
    commerce.getCollections(),
    commerce.getProducts(),
  ]);
  const featured = collections[0];

  return (
    <>
      <section className="relative mt-4 aspect-[4/5] overflow-hidden bg-ink sm:aspect-[16/7]">
        {featured?.image && (
          <Image
            src={featured.image.src}
            alt={featured.image.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-80"
          />
        )}
        <div className="absolute inset-0 flex flex-col items-start justify-end p-6 text-paper sm:p-12">
          <p className="text-xs uppercase tracking-[0.3em]">{siteConfig.tagline}</p>
          <h1 className="mt-2 text-3xl font-semibold uppercase tracking-[0.2em] sm:text-5xl">
            {featured?.title ?? siteConfig.name}
          </h1>
          <Link href={featured ? `/collections/${featured.handle}` : "/collections/all"} className="mt-6">
            <Button variant="secondary" className="border-paper text-paper hover:bg-paper hover:text-ink">
              Shop the drop
            </Button>
          </Link>
        </div>
      </section>

      <section className="mt-20">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-xs font-medium uppercase tracking-[0.18em]">Choose a piece to make yours</h2>
          <Link href="/collections/all" className="text-xs uppercase tracking-[0.18em] underline-offset-4 hover:underline">
            Shop all
          </Link>
        </div>
        <ProductGrid products={products.slice(0, 8)} />
      </section>
    </>
  );
}
