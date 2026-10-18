"use client";

import { useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export function Drawer({ open, onClose, title, children }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div aria-hidden={!open} className={cn("fixed inset-0 z-50", !open && "pointer-events-none")}>
      <button
        aria-label="Close"
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-ink/40 transition-opacity",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-paper shadow-xl transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <header className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="text-xs font-medium uppercase tracking-[0.18em]">{title}</h2>
          <button onClick={onClose} aria-label="Close cart" className="text-xl leading-none">
            ×
          </button>
        </header>
        {children}
      </aside>
    </div>
  );
}
