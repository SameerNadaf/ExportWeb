import { ProductGrid } from "@/components/products/ProductGrid";
import { CategoryFilter } from "@/components/products/CategoryFilter";
import { adminDb } from "@/lib/firebase/admin";
import { Product } from "@/types/firestore";

export const metadata = {
  title: "Our Products | Greenary Export",
  description: "Explore our range of premium organic spices and fruits.",
};

export const revalidate = 60;

export default async function ProductsPage() {
  const snapshot = await adminDb
    .collection("products")
    .where("isActive", "==", true)
    .orderBy("createdAt", "desc")
    .get();

  const products = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as unknown as Product[];

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

      <CategoryFilter />
      <ProductGrid products={products} />
    </div>
  );
}
