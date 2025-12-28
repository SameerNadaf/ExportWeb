import Link from "next/link";
import { Category } from "@/types/firestore";

interface CategoryFilterProps {
  currentCategory?: string;
  categories: Category[];
}

export function CategoryFilter({
  currentCategory,
  categories,
}: CategoryFilterProps) {
  const filterItems = [
    { label: "All Products", value: undefined, href: "/products" },
    ...categories.map((cat) => ({
      label: cat.name,
      value: cat.slug,
      href: `/products/${cat.slug}`,
    })),
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 mb-8">
      {filterItems.map((cat) => {
        const isActive = currentCategory === cat.value;
        return (
          <Link
            key={cat.label}
            href={cat.href}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-primary"
            }`}
          >
            {cat.label}
          </Link>
        );
      })}
    </div>
  );
}
