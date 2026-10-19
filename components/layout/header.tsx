import Link from "next/link";
import { siteConfig } from "@/config/site";
import { CartButton } from "@/components/cart/cart-button";
import { Logo } from "@/components/layout/logo";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <nav className="hidden gap-6 text-xs uppercase tracking-[0.18em] md:flex">
          {siteConfig.nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:opacity-60">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/" aria-label="Home" className="hover:opacity-70">
          <Logo className="h-4 sm:h-5" />
        </Link>
        <div className="flex items-center gap-5 text-xs uppercase tracking-[0.18em]">
          <Link href="/account" className="hidden hover:opacity-60 sm:inline">
            Log in
          </Link>
          <CartButton />
        </div>
      </div>
      <nav className="flex gap-5 overflow-x-auto border-t border-line px-4 py-2 text-xs uppercase tracking-[0.18em] md:hidden">
        {siteConfig.nav.map((item) => (
          <Link key={item.href} href={item.href} className="whitespace-nowrap">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
