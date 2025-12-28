import Link from "next/link";

interface CategoryFilterProps {
  currentCategory?: string;
}

export function CategoryFilter({ currentCategory }: CategoryFilterProps) {
  const categories = [
    { label: "All Products", value: undefined, href: "/products" },
    { label: "Spices", value: "spices", href: "/products/spices" },
    { label: "Fruits", value: "fruits", href: "/products/fruits" },
    { label: "Vegetables", value: "vegetables", href: "/products/vegetables" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 mb-8">
      {categories.map((cat) => {
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
