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

  const [editId, setEditId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function startEdit(cat: Category) {
    setEditId(cat.id || null);
    setNewName(cat.name);
    setNewSlug(cat.slug);
    setNewType(cat.type);
    setIsAdding(true);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this category?")) return;
    setDeletingId(id);
    try {
      await fetch(`/api/admin/categories?id=${id}`, { method: "DELETE" });
      router.refresh();
    } catch (error) {
      alert("Failed to delete");
    } finally {
      setDeletingId(null);
    }
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newName || !newSlug) return;

    const payload: any = { name: newName, slug: newSlug, type: newType };
    if (editId) payload.id = editId;

    try {
      await fetch("/api/admin/categories", {
        method: "POST", // POST handles both create and update in our API
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setIsAdding(false);
      setEditId(null);
      setNewName("");
      setNewSlug("");
      router.refresh();
    } catch (error) {
      alert("Failed to save category");
    }
  }

  function handleCancel() {
    setIsAdding(false);
    setEditId(null);
    setNewName("");
    setNewSlug("");
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
                <td className="px-4 py-3 text-right space-x-2">
                  <button
                    onClick={() => startEdit(cat)}
                    className="text-primary hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => cat.id && handleDelete(cat.id)}
                    disabled={deletingId === cat.id}
                    className="text-destructive hover:text-red-600 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deletingId === cat.id ? "Deleting..." : "Delete"}
                  </button>
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
          <h3 className="font-bold">
            {editId ? "Edit Category" : "New Category"}
          </h3>
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
              {editId ? "Update" : "Save"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-1 border rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => {
            setEditId(null);
            setNewName("");
            setNewSlug("");
            setIsAdding(true);
          }}
          className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
        >
          Add Category
        </button>
      )}
    </div>
  );
}
