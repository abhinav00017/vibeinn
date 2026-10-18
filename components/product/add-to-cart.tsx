"use client";

import { useState } from "react";
import type { Product } from "@/lib/commerce/types";
import { useCart } from "@/lib/cart/store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

export function AddToCart({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const available = product.variants.filter((v) => v.stock > 0);
  const [variantId, setVariantId] = useState<string | null>(
    available.length === 1 ? available[0].id : null,
  );
  const variant = product.variants.find((v) => v.id === variantId);
  const soldOut = available.length === 0;

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs uppercase tracking-[0.18em]">Size</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.variants.map((v) => {
            const out = v.stock <= 0;
            const selected = v.id === variantId;
            return (
              <button
                key={v.id}
                type="button"
                disabled={out}
                onClick={() => setVariantId(v.id)}
                aria-pressed={selected}
                className={cn(
                  "h-10 min-w-12 border px-3 text-xs uppercase tracking-[0.12em] transition-colors",
                  selected ? "border-ink bg-ink text-paper" : "border-line hover:border-ink",
                  out && "cursor-not-allowed text-muted line-through opacity-50",
                )}
              >
                {v.size}
              </button>
            );
          })}
        </div>
      </div>
      <Button
        full
        disabled={soldOut || !variant}
        onClick={() => {
          if (!variant) return;
          add({
            handle: product.handle,
            variantId: variant.id,
            title: product.title,
            size: variant.size,
            price: product.price,
            image: product.images[0],
          });
        }}
      >
        {soldOut ? "Sold out" : variant ? "Add to cart" : "Select a size"}
      </Button>
    </div>
  );
}
