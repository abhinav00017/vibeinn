import fs from "node:fs";
import path from "node:path";
import type {
  Collection,
  CollectionFilter,
  Commerce,
  Policy,
  Product,
} from "./types";
import { isInStock } from "./types";

const root = path.join(process.cwd(), "content");

function readJsonDir<T>(dir: string): T[] {
  const full = path.join(root, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .map((f) => JSON.parse(fs.readFileSync(path.join(full, f), "utf8")) as T);
}

function readPolicies(): Policy[] {
  const full = path.join(root, "policies");
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .map((f) => {
      const body = fs.readFileSync(path.join(full, f), "utf8");
      const firstLine = body.split("\n")[0] ?? "";
      return {
        slug: f.replace(/\.md$/, ""),
        title: firstLine.replace(/^#\s*/, "").trim() || f,
        body: body.split("\n").slice(1).join("\n").trim(),
      };
    });
}

function applyFilter(products: Product[], filter?: CollectionFilter): Product[] {
  if (!filter) return products;
  return products.filter((p) => {
    if (filter.type?.length && !filter.type.includes(p.type)) return false;
    if (filter.size?.length) {
      const has = p.variants.some((v) => filter.size!.includes(v.size) && v.stock > 0);
      if (!has) return false;
    }
    if (filter.availability === "in-stock" && !isInStock(p)) return false;
    if (filter.availability === "out-of-stock" && isInStock(p)) return false;
    return true;
  });
}

export const localCommerce: Commerce = {
  async getProducts() {
    return readJsonDir<Product>("products");
  },
  async getProduct(handle) {
    return (await this.getProducts()).find((p) => p.handle === handle) ?? null;
  },
  async getCollections() {
    return readJsonDir<Collection>("collections");
  },
  async getCollection(handle) {
    if (handle === "all") {
      return { handle: "all", title: "Shop all", description: "Everything we make." };
    }
    return (await this.getCollections()).find((c) => c.handle === handle) ?? null;
  },
  async getCollectionProducts(handle, filter) {
    const all = await this.getProducts();
    const inCollection =
      handle === "all" ? all : all.filter((p) => p.collections.includes(handle));
    return applyFilter(inCollection, filter);
  },
  async getPolicy(slug) {
    return readPolicies().find((p) => p.slug === slug) ?? null;
  },
  async getPolicies() {
    return readPolicies();
  },
};
