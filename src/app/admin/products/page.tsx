import Link from "next/link";
import { ProductTable } from "@/components/admin/products/ProductTable";
import { adminDb } from "@/lib/firebase/admin";
import { Product } from "@/types/firestore";

// Force dynamic rendering to ensure we always get fresh data
export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const snapshot = await adminDb
    .collection("products")
    .orderBy("createdAt", "desc")
    .get();

  // Serialize data for Client Component
  const products = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      // Convert Timestamps to serialized dates or allow them if Next.js supports it (it usually warns)
      // For safety, let's treat them as any or convert to JSON-safe if strict
      // Implementation Plan types used Timestamp, but for UI we might default to just passing the data.
      // We'll cast to any to bypass strict type check on the server->client boundary for now
      // as the Client Component will receive the serialized version.
    } as unknown as Product;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-heading text-foreground">
          Products
        </h1>
        <Link
          href="/admin/products/new"
          className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
        >
          Add Product
        </Link>
      </div>

      <ProductTable products={products} />
    </div>
  );
}
