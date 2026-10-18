export type Money = {
  amount: number; // minor units (paise)
  currency: "INR";
};

export type Size = "XS" | "S" | "M" | "L" | "XL" | "2XL";

export type Variant = {
  id: string;
  size: Size;
  stock: number;
};

export type Product = {
  handle: string;
  title: string;
  description: string;
  price: Money;
  compareAtPrice?: Money;
  images: { src: string; alt: string }[];
  type: string; // "shirt", "tee"
  tags: string[];
  variants: Variant[];
  collections: string[]; // collection handles
};

export type Collection = {
  handle: string;
  title: string;
  description?: string;
  image?: { src: string; alt: string };
};

export type CollectionFilter = {
  size?: Size[];
  type?: string[];
  availability?: "in-stock" | "out-of-stock";
};

export type Policy = {
  slug: string;
  title: string;
  body: string; // markdown
};

export interface Commerce {
  getProducts(): Promise<Product[]>;
  getProduct(handle: string): Promise<Product | null>;
  getCollections(): Promise<Collection[]>;
  getCollection(handle: string): Promise<Collection | null>;
  getCollectionProducts(handle: string, filter?: CollectionFilter): Promise<Product[]>;
  getPolicy(slug: string): Promise<Policy | null>;
  getPolicies(): Promise<Policy[]>;
}

export function isInStock(product: Product): boolean {
  return product.variants.some((v) => v.stock > 0);
}
