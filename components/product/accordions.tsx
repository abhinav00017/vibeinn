import type { Product } from "@/lib/commerce/types";
import { siteConfig } from "@/config/site";

export function Accordions({ product }: { product: Product }) {
  const items: { title: string; body: React.ReactNode }[] = [
    {
      title: "Garment details",
      body: product.details?.length ? (
        <ul className="list-disc space-y-1 pl-5">
          {product.details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      ) : (
        <p>{product.description}</p>
      ),
    },
    { title: "Service disclaimer", body: <p>{siteConfig.productInfo.disclaimer}</p> },
    { title: "Easy returns", body: <p>{siteConfig.productInfo.returns}</p> },
  ];

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.title} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-xs uppercase tracking-[0.18em] [&::-webkit-details-marker]:hidden">
            {item.title}
            <span aria-hidden className="transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <div className="pb-5 text-sm leading-relaxed text-muted">{item.body}</div>
        </details>
      ))}
    </div>
  );
}
