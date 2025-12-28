import { Timestamp } from "firebase/firestore";

export interface ProductImage {
  url: string;
  publicId: string;
}

export interface Product {
  id?: string; // Optional because it's not in the document data itself usually, but helpful for frontend
  name: string;
  slug: string;
  categorySlug: string;
  description: string;
  images: ProductImage[];
  origin: string;
  certifications: string[]; // e.g., ["USDA Organic", "ISO 9001"]
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Category {
  id?: string;
  name: string;
  slug: string;
  type: "spice" | "fruit" | "vegetable" | "other";
  isActive: boolean;
}

export interface ContentData {
  [key: string]: string | number | boolean | object;
}

export interface SiteContent {
  id?: string; // e.g. 'about', 'contact'
  key: string;
  value: ContentData;
}
