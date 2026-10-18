import { cn } from "@/lib/utils/cn";
import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  full?: boolean;
};

export function Button({ className, variant = "primary", full, ...rest }: Props) {
  return (
    <button
      className={cn(
        "inline-flex h-11 items-center justify-center px-5 text-xs font-medium uppercase tracking-[0.18em] transition-colors disabled:cursor-not-allowed disabled:opacity-40",
        variant === "primary" && "bg-ink text-paper hover:bg-ink/85",
        variant === "secondary" && "border border-ink text-ink hover:bg-ink hover:text-paper",
        variant === "ghost" && "text-ink underline-offset-4 hover:underline",
        full && "w-full",
        className,
      )}
      {...rest}
    />
  );
}
