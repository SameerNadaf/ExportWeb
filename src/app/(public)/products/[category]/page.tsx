import { ProductGrid } from "@/components/products/ProductGrid";
import { CategoryFilter } from "@/components/products/CategoryFilter";
import { notFound } from "next/navigation";
import { adminDb } from "@/lib/firebase/admin";
import { Product } from "@/types/firestore";

export const revalidate = 60; // ISR

export async function generateStaticParams() {
  const snapshot = await adminDb.collection("categories").get();
  return snapshot.docs.map((doc) => ({
    category: doc.data().slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  return {
    title: `${
      category.charAt(0).toUpperCase() + category.slice(1)
    } | Greenary Export`,
    description: `Premium ${category} available for export.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  // Verify category exists
  const catSnapshot = await adminDb
    .collection("categories")
    .where("slug", "==", category)
    .get();
  if (catSnapshot.empty) {
    notFound();
  }

  // Fetch Active Products in Category
  // Note: Requires Index (categorySlug Asc + isActive Asc)
  const productSnapshot = await adminDb
    .collection("products")
    .where("categorySlug", "==", category)
    .where("isActive", "==", true)
    .orderBy("createdAt", "desc")
    .get();

  const filteredProducts = productSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as unknown as Product[];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold font-heading text-primary mb-4 capitalize">
          {category}
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Premium quality {category} sourced with care.
        </p>
      </div>

      <CategoryFilter currentCategory={category} />
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
