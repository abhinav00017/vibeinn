"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Money, Size } from "@/lib/commerce/types";

export type CartLine = {
  id: string; // `${handle}:${variantId}`
  handle: string;
  variantId: string;
  title: string;
  size: Size;
  price: Money;
  image: { src: string; alt: string };
  quantity: number;
};

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
          const id = `${line.handle}:${line.variantId}`;
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
      partialize: (s) => ({ lines: s.lines }),
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
