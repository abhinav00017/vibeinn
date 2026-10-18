"use client";

import Image from "next/image";
import type { Artwork, PrintChoice, PrintSide } from "@/lib/commerce/types";
import { cn } from "@/lib/utils/cn";
import { ShirtPreview } from "./shirt-preview";

export type Prints = Partial<Record<PrintSide, PrintChoice | null>>; // key present = side enabled

const SIDES: { side: PrintSide; label: string; hint: string }[] = [
  { side: "back", label: "Back print", hint: "Big, between the shoulders" },
  { side: "front", label: "Front print", hint: "Small, on the left chest" },
];

type Props = {
  artworks: Artwork[];
  prints: Prints;
  activeSide: PrintSide;
  onToggleSide: (side: PrintSide) => void;
  onSelectSide: (side: PrintSide) => void;
  onPick: (side: PrintSide, artwork: Artwork) => void;
};

export function Customiser({ artworks, prints, activeSide, onToggleSide, onSelectSide, onPick }: Props) {
  const enabled = (side: PrintSide) => side in prints;
  const current = prints[activeSide] ?? undefined;
  const options = artworks.filter((a) => a.side === activeSide);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.18em]">Print on</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {SIDES.map(({ side, label, hint }) => {
            const on = enabled(side);
            const pick = prints[side];
            return (
              <button
                key={side}
                type="button"
                onClick={() => {
                  onToggleSide(side);
                  if (!on) onSelectSide(side);
                }}
                aria-pressed={on}
                className={cn(
                  "flex flex-col items-start border p-3 text-left transition-colors",
                  on ? "border-ink" : "border-line hover:border-ink",
                )}
              >
                <span className="flex w-full items-center justify-between text-xs uppercase tracking-[0.12em]">
                  {label}
                  <span
                    aria-hidden
                    className={cn(
                      "flex h-4 w-4 items-center justify-center border text-[10px]",
                      on ? "border-ink bg-ink text-paper" : "border-line",
                    )}
                  >
                    {on && "✓"}
                  </span>
                </span>
                <span className="mt-1 text-[11px] text-muted">
                  {on ? (pick ? pick.name : "Pick an artwork below") : hint}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {Object.keys(prints).length > 0 && (
        <div>
          <div className="flex items-center justify-between">
            <div className="flex gap-1 border border-line p-1">
              {SIDES.filter((s) => enabled(s.side)).map(({ side }) => (
                <button
                  key={side}
                  type="button"
                  onClick={() => onSelectSide(side)}
                  className={cn(
                    "px-4 py-1.5 text-xs uppercase tracking-[0.12em]",
                    side === activeSide ? "bg-ink text-paper" : "hover:bg-sand",
                  )}
                >
                  {side}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-muted">
              {current ? `${current.code} · ${current.name}` : "Nothing picked yet"}
            </p>
          </div>

          <div className="mt-3 bg-sand">
            <ShirtPreview side={activeSide} print={current} className="mx-auto aspect-square w-full max-w-xs" />
          </div>

          <p className="mt-5 text-xs uppercase tracking-[0.18em]">
            Choose {activeSide} artwork <span className="text-muted">*</span>
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
            {options.map((a) => {
              const selected = current?.artworkId === a.id;
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => onPick(activeSide, a)}
                  aria-pressed={selected}
                  className={cn(
                    "group border text-left transition-colors",
                    selected ? "border-ink" : "border-line hover:border-ink",
                  )}
                >
                  <div className="relative aspect-square bg-paper">
                    <Image src={a.image.src} alt={a.image.alt} fill sizes="120px" className="object-contain p-2" />
                    {a.new && (
                      <span className="absolute left-1 top-1 bg-ink px-1 text-[9px] uppercase tracking-[0.12em] text-paper">
                        New
                      </span>
                    )}
                  </div>
                  <p className="truncate px-2 py-1.5 text-[10px] uppercase tracking-[0.08em]">
                    {a.code} · {a.name}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
