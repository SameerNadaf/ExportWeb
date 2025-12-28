import { adminDb } from "@/lib/firebase/admin";
import { ProductForm } from "@/components/admin/products/ProductForm";
import { notFound } from "next/navigation";
import { Product, Category } from "@/types/firestore";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Parallel fetch product and categories
  const [doc, catSnap] = await Promise.all([
    adminDb.collection("products").doc(id).get(),
    adminDb.collection("categories").get(),
  ]);

  if (!doc.exists) {
    notFound();
  }

  const data = doc.data()!;

  const product = {
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
  } as unknown as Product;

  const categories = catSnap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  })) as unknown as Category[];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-heading text-foreground">
        Edit Product
      </h1>
      <ProductForm initialData={product} isEdit categories={categories} />
    </div>
  );
}
