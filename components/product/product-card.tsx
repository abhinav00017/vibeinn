import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/commerce/types";
import { isInStock } from "@/lib/commerce/types";
import { formatMoney } from "@/lib/utils/money";

export function ProductCard({ product }: { product: Product }) {
  const soldOut = !isInStock(product);
  const [front, back] = product.images;
  return (
    <Link href={`/products/${product.handle}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        <Image
          src={front.src}
          alt={front.alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-opacity duration-300 group-hover:opacity-0"
        />
        {back && (
          <Image
            src={back.src}
            alt={back.alt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}
        {soldOut && (
          <span className="absolute left-3 top-3 bg-paper px-2 py-1 text-[10px] uppercase tracking-[0.18em]">
            Sold out
          </span>
        )}
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="text-sm">{product.title}</h3>
        <p className="text-sm text-muted">{formatMoney(product.price)}</p>
      </div>
    </Link>
  );
}
