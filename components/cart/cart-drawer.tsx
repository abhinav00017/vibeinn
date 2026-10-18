"use client";

import Link from "next/link";
import { useCallback } from "react";
import { Drawer } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { cartSubtotal, useCart } from "@/lib/cart/store";
import { formatMoney } from "@/lib/utils/money";
import { LineItem } from "./line-item";

export function CartDrawer() {
  const open = useCart((s) => s.open);
  const setOpen = useCart((s) => s.setOpen);
  const lines = useCart((s) => s.lines);
  const close = useCallback(() => setOpen(false), [setOpen]);

  return (
    <Drawer open={open} onClose={close} title="Your cart">
      {lines.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-sm text-muted">
          <p>Your cart is empty.</p>
          <Link href="/collections/all" onClick={close} className="underline underline-offset-4">
            Shop all
          </Link>
        </div>
      ) : (
        <>
          <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
            {lines.map((l) => (
              <LineItem key={l.id} line={l} />
            ))}
          </ul>
          <div className="space-y-3 border-t border-line p-5">
            <div className="flex justify-between text-sm">
              <span>Estimated total</span>
              <span>{formatMoney(cartSubtotal(lines))}</span>
            </div>
            <p className="text-xs text-muted">
              Taxes included. Discounts and shipping calculated at checkout.
            </p>
            <Link href="/checkout" onClick={close} className="block">
              <Button full>Complete purchase</Button>
            </Link>
          </div>
        </>
      )}
    </Drawer>
  );
}
