import { adminDb } from "@/lib/firebase/admin";
import { ProductForm } from "@/components/admin/products/ProductForm";
import { notFound } from "next/navigation";
import { Product } from "@/types/firestore";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doc = await adminDb.collection("products").doc(id).get();

  if (!doc.exists) {
    notFound();
  }

  const data = doc.data()!;
  // Serialize
  const product = {
    id: doc.id,
    ...data,
    // Cast to unknown to match Product interface for client component
  } as unknown as Product;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-heading text-foreground">
        Edit Product
      </h1>
      <ProductForm initialData={product} isEdit />
    </div>
  );
}
