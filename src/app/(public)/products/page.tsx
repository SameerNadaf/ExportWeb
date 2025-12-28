import { ProductGrid } from "@/components/products/ProductGrid";
import { CategoryFilter } from "@/components/products/CategoryFilter";
import { adminDb } from "@/lib/firebase/admin";
import { Product, Category } from "@/types/firestore";

export const metadata = {
  title: "Our Products | Anfal Global Export",
  description:
    "Explore our range of premium organic spices, fruits, and vegetables.",
};

export const revalidate = 60;

export default async function ProductsPage() {
  const [productSnap, categorySnap] = await Promise.all([
    adminDb
      .collection("products")
      .where("isActive", "==", true)
      .orderBy("createdAt", "desc")
      .get(),
    adminDb.collection("categories").where("isActive", "==", true).get(),
  ]);

  const products = productSnap.docs.map((doc) => {
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

  const categories = categorySnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as unknown as Category[];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold font-heading text-primary mb-4">
          Our Products
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Browse our complete catalog of export-quality organic produce, sourced
          directly from certified farms.
        </p>
      </div>

      <CategoryFilter categories={categories} />
      <ProductGrid products={products} />
    </div>
  );
}
