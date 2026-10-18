import { localCommerce } from "./local";
import type { Commerce } from "./types";

// Swap this one line to change the backend (database, Shopify, ...).
export const commerce: Commerce = localCommerce;

export * from "./types";
