import { ProductForm } from "@/components/admin/products/ProductForm";
import { adminDb } from "@/lib/firebase/admin";
import { Category } from "@/types/firestore";

export default async function NewProductPage() {
  const snapshot = await adminDb.collection("categories").get();
  const categories = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as unknown as Category[];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-heading text-foreground">
        Add New Product
      </h1>
      <ProductForm categories={categories} />
    </div>
  );
}
