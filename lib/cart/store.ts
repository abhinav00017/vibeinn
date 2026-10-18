"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Money, PrintChoice, Size } from "@/lib/commerce/types";

export type CartLine = {
  id: string; // `${handle}:${variantId}:${print ids}`
  handle: string;
  variantId: string;
  title: string;
  size: Size;
  price: Money;
  image: { src: string; alt: string };
  prints: PrintChoice[]; // empty for plain products
  quantity: number;
};

export function lineId(handle: string, variantId: string, prints: PrintChoice[]): string {
  const p = prints.map((x) => `${x.side}=${x.artworkId}`).sort().join(",");
  return `${handle}:${variantId}:${p}`;
}

type CartState = {
  lines: CartLine[];
  open: boolean;
  add: (line: Omit<CartLine, "id" | "quantity">, quantity?: number) => void;
  remove: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      open: false,
      add: (line, quantity = 1) =>
        set((s) => {
          const id = lineId(line.handle, line.variantId, line.prints);
          const existing = s.lines.find((l) => l.id === id);
          const lines = existing
            ? s.lines.map((l) => (l.id === id ? { ...l, quantity: l.quantity + quantity } : l))
            : [...s.lines, { ...line, id, quantity }];
          return { lines, open: true };
        }),
      remove: (id) => set((s) => ({ lines: s.lines.filter((l) => l.id !== id) })),
      setQuantity: (id, quantity) =>
        set((s) => ({
          lines:
            quantity <= 0
              ? s.lines.filter((l) => l.id !== id)
              : s.lines.map((l) => (l.id === id ? { ...l, quantity } : l)),
        })),
      clear: () => set({ lines: [] }),
      setOpen: (open) => set({ open }),
    }),
    {
      name: "vibeinn-cart",
      version: 2,
      partialize: (s) => ({ lines: s.lines }),
      migrate: (persisted, version) => {
        // v1 lines had no `prints`. Drop them rather than guess.
        if (version < 2) return { lines: [] };
        return persisted as { lines: CartLine[] };
      },
    },
  ),
);

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((n, l) => n + l.quantity, 0);
}

export function cartSubtotal(lines: CartLine[]): Money {
  return {
    amount: lines.reduce((n, l) => n + l.price.amount * l.quantity, 0),
    currency: "INR",
  };
}
