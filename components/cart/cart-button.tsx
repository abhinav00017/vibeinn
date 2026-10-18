"use client";

import { useSyncExternalStore } from "react";
import { cartCount, useCart } from "@/lib/cart/store";

const noop = () => () => {};

export function CartButton() {
  const lines = useCart((s) => s.lines);
  const setOpen = useCart((s) => s.setOpen);
  // Avoid a hydration mismatch: the persisted cart only exists on the client.
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  const count = mounted ? cartCount(lines) : 0;
  return (
    <button onClick={() => setOpen(true)} className="hover:opacity-60">
      Cart{count > 0 && ` (${count})`}
    </button>
  );
}
