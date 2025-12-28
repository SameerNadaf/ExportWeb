"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/types/firestore";

interface ProductTableProps {
  products: Product[];
}

export function ProductTable({ products }: ProductTableProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    setDeletingId(id);
    try {
      await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
      router.refresh();
    } catch (error) {
      alert("Failed to delete");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="rounded-md border border-border bg-card overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="bg-muted/50 text-muted-foreground font-medium">
          <tr>
            <th className="px-4 py-3">Product Name</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Origin</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {products.map((product) => (
            <tr
              key={product.id}
              className="hover:bg-muted/10 transition-colors"
            >
              <td className="px-4 py-3 font-medium text-foreground">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md bg-muted border border-border">
                    {product.images?.[0]?.url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.images[0].url}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                        No IMG
                      </div>
                    )}
                  </div>
                  <span>{product.name}</span>
                </div>
              </td>
              <td className="px-4 py-3 capitalize">{product.categorySlug}</td>
              <td className="px-4 py-3">{product.origin}</td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    product.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {product.isActive ? "Active" : "Draft"}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <Link
                  href={`/admin/products/${product.id}/edit`}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium text-primary hover:underline"
                >
                  Edit
                </Link>
                <span className="mx-2 text-muted-foreground/30">|</span>
                <button
                  onClick={() => product.id && handleDelete(product.id)}
                  disabled={deletingId === product.id}
                  className="text-destructive hover:text-red-600 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deletingId === product.id ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="px-4 py-8 text-center text-muted-foreground"
              >
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
