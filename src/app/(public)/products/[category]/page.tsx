import { ProductGrid } from "@/components/products/ProductGrid";
import { CategoryFilter } from "@/components/products/CategoryFilter";
import { notFound } from "next/navigation";
import { adminDb } from "@/lib/firebase/admin";
import { Product, Category } from "@/types/firestore";

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
  // Fetch Category, Products, and All Categories (for filter) in parallel
  const [catSnapshot, productSnapshot, allCategoriesSnapshot] =
    await Promise.all([
      adminDb.collection("categories").where("slug", "==", category).get(),
      adminDb
        .collection("products")
        .where("categorySlug", "==", category)
        .where("isActive", "==", true)
        .orderBy("createdAt", "desc")
        .get(),
      adminDb.collection("categories").where("isActive", "==", true).get(),
    ]);

  if (catSnapshot.empty) {
    notFound();
  }

  const filteredProducts = productSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt:
        data.createdAt && typeof data.createdAt.toDate === "function"
          ? data.createdAt.toDate().toISOString()
          : new Date().toISOString(),
      updatedAt:
        data.updatedAt && typeof data.updatedAt.toDate === "function"
          ? data.updatedAt.toDate().toISOString()
          : new Date().toISOString(),
    };
  }) as unknown as Product[];

  const categories = allCategoriesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as unknown as Category[];

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

      <CategoryFilter currentCategory={category} categories={categories} />
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
