import type { Money } from "@/lib/commerce/types";
import { siteConfig } from "@/config/site";

export function formatMoney(money: Money): string {
  return new Intl.NumberFormat(siteConfig.locale, {
    style: "currency",
    currency: money.currency,
    maximumFractionDigits: money.amount % 100 === 0 ? 0 : 2,
  }).format(money.amount / 100);
}
