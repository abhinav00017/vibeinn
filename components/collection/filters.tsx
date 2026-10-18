import Link from "next/link";
import type { CollectionFilter, Size } from "@/lib/commerce/types";
import { cn } from "@/lib/utils/cn";

const SIZES: Size[] = ["XS", "S", "M", "L", "XL", "2XL"];

type Props = {
  basePath: string;
  filter: CollectionFilter;
  types: string[];
  counts: { inStock: number; outOfStock: number };
};

function toQuery(filter: CollectionFilter): string {
  const q = new URLSearchParams();
  filter.size?.forEach((s) => q.append("size", s));
  filter.type?.forEach((t) => q.append("type", t));
  if (filter.availability) q.set("availability", filter.availability);
  const s = q.toString();
  return s ? `?${s}` : "";
}

function toggle<T>(list: T[] | undefined, value: T): T[] {
  const cur = list ?? [];
  return cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value];
}

export function Filters({ basePath, filter, types, counts }: Props) {
  const active =
    (filter.size?.length ?? 0) + (filter.type?.length ?? 0) + (filter.availability ? 1 : 0);

  return (
    <aside className="space-y-8 text-sm">
      <Group title="Size">
        {SIZES.map((s) => (
          <Chip
            key={s}
            href={basePath + toQuery({ ...filter, size: toggle(filter.size, s) })}
            on={filter.size?.includes(s) ?? false}
          >
            {s}
          </Chip>
        ))}
      </Group>
      {types.length > 1 && (
        <Group title="Product type">
          {types.map((t) => (
            <Chip
              key={t}
              href={basePath + toQuery({ ...filter, type: toggle(filter.type, t) })}
              on={filter.type?.includes(t) ?? false}
            >
              {t}
            </Chip>
          ))}
        </Group>
      )}
      <Group title="Availability">
        <Chip
          href={
            basePath +
            toQuery({
              ...filter,
              availability: filter.availability === "in-stock" ? undefined : "in-stock",
            })
          }
          on={filter.availability === "in-stock"}
        >
          In stock ({counts.inStock})
        </Chip>
        <Chip
          href={
            basePath +
            toQuery({
              ...filter,
              availability: filter.availability === "out-of-stock" ? undefined : "out-of-stock",
            })
          }
          on={filter.availability === "out-of-stock"}
        >
          Out of stock ({counts.outOfStock})
        </Chip>
      </Group>
      {active > 0 && (
        <Link href={basePath} className="block text-xs uppercase tracking-[0.18em] underline underline-offset-4">
          Remove all
        </Link>
      )}
    </aside>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.18em]">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({ href, on, children }: { href: string; on: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      scroll={false}
      className={cn(
        "border px-3 py-1.5 text-xs uppercase tracking-[0.12em] transition-colors",
        on ? "border-ink bg-ink text-paper" : "border-line hover:border-ink",
      )}
    >
      {children}
    </Link>
  );
}
