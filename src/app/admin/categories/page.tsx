import { adminDb } from "@/lib/firebase/admin";
import { Category } from "@/types/firestore";
import { CategoryList } from "@/components/admin/categories/CategoryList";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const snapshot = await adminDb.collection("categories").get();
  const categories = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as unknown as Category[];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-heading text-foreground">
          Categories
        </h1>
      </div>
      <CategoryList categories={categories} />
    </div>
  );
}
