"use client";

import { useState } from "react";
import type { Artwork, PrintChoice, PrintSide, Product } from "@/lib/commerce/types";
import { useCart } from "@/lib/cart/store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { Customiser, type Prints } from "./customiser";

type Props = { product: Product; artworks: Artwork[] };

export function ProductForm({ product, artworks }: Props) {
  const add = useCart((s) => s.add);
  const available = product.variants.filter((v) => v.stock > 0);
  const soldOut = available.length === 0;
  const customisable = product.customisable && artworks.length > 0;

  const [variantId, setVariantId] = useState<string | null>(
    available.length === 1 ? available[0].id : null,
  );
  const [prints, setPrints] = useState<Prints>(customisable ? { back: null } : {});
  const [activeSide, setActiveSide] = useState<PrintSide>("back");
  const variant = product.variants.find((v) => v.id === variantId);

  const enabledSides = Object.keys(prints) as PrintSide[];
  const missing = enabledSides.filter((s) => !prints[s]);
  const chosen = enabledSides.map((s) => prints[s]).filter((p): p is PrintChoice => !!p);

  const blocker = soldOut
    ? "Sold out"
    : !variant
      ? "Select a size"
      : customisable && enabledSides.length === 0
        ? "Choose at least one side to print"
        : missing.length > 0
          ? `Pick a ${missing[0]} artwork`
          : null;

  function toggleSide(side: PrintSide) {
    setPrints((p) => {
      const next = { ...p };
      if (side in next) delete next[side];
      else next[side] = null;
      return next;
    });
    if (side === activeSide) {
      const other = enabledSides.find((s) => s !== side);
      if (other) setActiveSide(other);
    }
  }

  function pick(side: PrintSide, a: Artwork) {
    setPrints((p) => ({
      ...p,
      [side]: { side, artworkId: a.id, code: a.code, name: a.name, image: a.image },
    }));
  }

  return (
    <div className="space-y-8">
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
        {variant && variant.stock <= 5 && (
          <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-muted">
            Low stock: {variant.stock} left
          </p>
        )}
      </div>

      {customisable && (
        <Customiser
          artworks={artworks}
          prints={prints}
          activeSide={activeSide}
          onToggleSide={toggleSide}
          onSelectSide={setActiveSide}
          onPick={pick}
        />
      )}

      <div className="space-y-3 border-t border-line pt-5">
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-xs">
          <dt className="uppercase tracking-[0.12em] text-muted">Size</dt>
          <dd>{variant?.size ?? "—"}</dd>
          {customisable &&
            (["back", "front"] as PrintSide[]).map((side) => (
              <SummaryRow key={side} label={side} print={prints[side]} enabled={side in prints} />
            ))}
        </dl>
        <Button
          full
          disabled={!!blocker}
          onClick={() => {
            if (!variant || blocker) return;
            add({
              handle: product.handle,
              variantId: variant.id,
              title: product.title,
              size: variant.size,
              price: product.price,
              image: product.images[0],
              prints: chosen,
            });
          }}
        >
          Add to cart
        </Button>
        {blocker && !soldOut && (
          <p className="text-center text-[11px] uppercase tracking-[0.12em] text-muted">{blocker}</p>
        )}
      </div>
    </div>
  );
}

function SummaryRow({ label, print, enabled }: { label: string; print: PrintChoice | null | undefined; enabled: boolean }) {
  return (
    <>
      <dt className="uppercase tracking-[0.12em] text-muted">{label}</dt>
      <dd className={cn(!enabled && "text-muted")}>
        {!enabled ? "No print" : print ? `${print.code} · ${print.name}` : "Not picked"}
      </dd>
    </>
  );
}
