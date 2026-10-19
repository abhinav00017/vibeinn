import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Newsletter } from "@/components/layout/newsletter";
import { Logo } from "@/components/layout/logo";

export function Footer() {
  const year = 2026;
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <Logo className="h-5" />
          <p className="mt-2 text-sm text-muted">{siteConfig.tagline}</p>
          <a
            href={siteConfig.socials.instagram}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block text-xs uppercase tracking-[0.18em] underline-offset-4 hover:underline"
          >
            Instagram
          </a>
        </div>
        <FooterList title="Policies" items={siteConfig.footer.policies} />
        <FooterList title="Services" items={siteConfig.footer.services} />
      </div>
      <Newsletter />
      <p className="border-t border-line px-4 py-5 text-center text-[11px] uppercase tracking-[0.18em] text-muted">
        © {year} {siteConfig.name}
      </p>
    </footer>
  );
}

function FooterList({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.18em]">{title}</p>
      <ul className="mt-4 space-y-2 text-sm">
        {items.map((i) => (
          <li key={i.href}>
            <Link href={i.href} className="hover:opacity-60">
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
