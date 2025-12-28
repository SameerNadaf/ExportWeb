import { ProductForm } from "@/components/admin/products/ProductForm";

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-heading text-foreground">
        Add New Product
      </h1>
      <ProductForm />
    </div>
  );
}
