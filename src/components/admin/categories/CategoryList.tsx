"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Category } from "@/types/firestore";

interface CategoryListProps {
  categories: Category[];
}

export function CategoryList({ categories }: CategoryListProps) {
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  const [newLast, setNewLast] = useState("");
  const [newName, setNewName] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [newType, setNewType] = useState<
    "spice" | "fruit" | "vegetable" | "other"
  >("spice");

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newName || !newSlug) return;

    try {
      await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, slug: newSlug, type: newType }),
      });
      setIsAdding(false);
      setNewName("");
      setNewSlug("");
      router.refresh();
    } catch (error) {
      alert("Failed to add category");
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-md border border-border overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/50 text-muted-foreground font-medium">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-muted/10 transition-colors">
                <td className="px-4 py-3 font-medium text-foreground">
                  {cat.name}
                </td>
                <td className="px-4 py-3">{cat.slug}</td>
                <td className="px-4 py-3 capitalize">{cat.type}</td>
                <td className="px-4 py-3 text-right">
                  <span className="text-muted-foreground text-xs">
                    Managed via DB
                  </span>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="p-4 text-center text-muted-foreground"
                >
                  No categories.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isAdding ? (
        <form
          onSubmit={handleAdd}
          className="bg-muted/20 p-4 rounded-lg border border-border space-y-4"
        >
          <h3 className="font-bold">New Category</h3>
          <div className="grid grid-cols-3 gap-4">
            <input
              placeholder="Name"
              className="p-2 rounded border"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
            />
            <input
              placeholder="Slug"
              className="p-2 rounded border"
              value={newSlug}
              onChange={(e) => setNewSlug(e.target.value)}
              required
            />
            <select
              className="p-2 rounded border"
              value={newType}
              onChange={(e) => setNewType(e.target.value as any)}
            >
              <option value="spice">Spice</option>
              <option value="fruit">Fruit</option>
              <option value="vegetable">Vegetable</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-1 bg-primary text-white rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-1 border rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
        >
          Add Category
        </button>
      )}
    </div>
  );
}
