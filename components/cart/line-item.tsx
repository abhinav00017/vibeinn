"use client";

import Image from "next/image";
import Link from "next/link";
import type { CartLine } from "@/lib/cart/store";
import { useCart } from "@/lib/cart/store";
import { formatMoney } from "@/lib/utils/money";

export function LineItem({ line }: { line: CartLine }) {
  const setQuantity = useCart((s) => s.setQuantity);
  const remove = useCart((s) => s.remove);
  return (
    <li className="flex gap-4 py-4">
      <div className="relative h-24 w-20 shrink-0 bg-sand">
        <Image src={line.image.src} alt={line.image.alt} fill sizes="80px" className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col text-sm">
        <Link href={`/products/${line.handle}`} className="leading-snug hover:opacity-60">
          {line.title}
        </Link>
        <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted">Size {line.size}</p>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center border border-line">
            <button
              aria-label="Decrease quantity"
              onClick={() => setQuantity(line.id, line.quantity - 1)}
              className="h-8 w-8"
            >
              −
            </button>
            <span className="w-8 text-center text-xs">{line.quantity}</span>
            <button
              aria-label="Increase quantity"
              onClick={() => setQuantity(line.id, line.quantity + 1)}
              className="h-8 w-8"
            >
              +
            </button>
          </div>
          <p>{formatMoney({ ...line.price, amount: line.price.amount * line.quantity })}</p>
        </div>
        <button
          onClick={() => remove(line.id)}
          className="mt-2 self-start text-[11px] uppercase tracking-[0.12em] text-muted underline-offset-4 hover:underline"
        >
          Remove
        </button>
      </div>
    </li>
  );
}
