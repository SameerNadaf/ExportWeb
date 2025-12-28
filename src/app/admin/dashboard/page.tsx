import Link from "next/link";
import { adminDb } from "@/lib/firebase/admin";
import { Product } from "@/types/firestore";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  // Parallel Data Fetching
  const [productsSnap, categoriesSnap] = await Promise.all([
    adminDb.collection("products").orderBy("createdAt", "desc").get(),
    adminDb.collection("categories").get(),
  ]);

  const products = productsSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as unknown as Product[];
  const categoriesCount = categoriesSnap.size;

  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.isActive).length;
  const recentProducts = products.slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Overview of your catalog performance.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/products/new"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            + New Product
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex items-center justify-between group hover:border-primary/50 transition-colors">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Total Products
            </h3>
            <p className="text-4xl font-bold text-primary mt-2">
              {totalProducts}
            </p>
          </div>
          <div className="p-3 bg-primary/10 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex items-center justify-between group hover:border-green-500/50 transition-colors">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Active Listings
            </h3>
            <p className="text-4xl font-bold text-green-600 mt-2">
              {activeProducts}
            </p>
          </div>
          <div className="p-3 bg-green-100 rounded-full text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex items-center justify-between group hover:border-amber-500/50 transition-colors">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Categories
            </h3>
            <p className="text-4xl font-bold text-amber-600 mt-2">
              {categoriesCount}
            </p>
          </div>
          <div className="p-3 bg-amber-100 rounded-full text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-6 border-b border-border flex justify-between items-center bg-muted/20">
            <h3 className="font-bold text-lg">Recent Products</h3>
            <Link
              href="/admin/products"
              className="text-sm text-primary hover:underline"
            >
              View All
            </Link>
          </div>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-muted-foreground font-medium bg-muted/50">
                <tr>
                  <th className="px-6 py-3">Product Name</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-muted/10 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-foreground">
                      {product.name}
                    </td>
                    <td className="px-6 py-4">
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
                    <td className="px-6 py-4 text-right text-muted-foreground">
                      {/* Simple date format fallback */}
                      {product.createdAt
                        ? new Date(
                            (product.createdAt as any)._seconds * 1000
                          ).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
                {recentProducts.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="p-6 text-center text-muted-foreground"
                    >
                      No recent products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Tips / Actions */}
        <div className="space-y-6">
          <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-xl">
            <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Next Steps
            </h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• Add high-quality images to your products.</li>
              <li>
                • Ensure categories are active before adding products to them.
              </li>
              <li>
                • Update your{" "}
                <Link href="/admin/content" className="underline font-medium">
                  Contact Info
                </Link>{" "}
                frequently.
              </li>
            </ul>
          </div>

          <div className="bg-card p-6 rounded-xl border border-border">
            <h3 className="font-bold mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/admin/categories"
                className="block p-4 rounded-lg bg-muted hover:bg-muted/80 text-center transition-colors"
              >
                Manage Categories
              </Link>
              <Link
                href="/admin/content"
                className="block p-4 rounded-lg bg-muted hover:bg-muted/80 text-center transition-colors"
              >
                Edit Site Content
              </Link>
              <Link
                href="/"
                target="_blank"
                className="block p-4 rounded-lg bg-muted hover:bg-muted/80 text-center transition-colors col-span-2"
              >
                View Public Website →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
