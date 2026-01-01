"use client";

import Link from "next/link";
import { Category } from "@/types/firestore";
import { motion } from "framer-motion";

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-wrap items-center gap-3 mb-8"
    >
      {filterItems.map((cat) => {
        const isActive = currentCategory === cat.value;
        return (
          <motion.div key={cat.label} variants={item}>
            <Link
              href={cat.href}
              className={`relative inline-block px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isActive
                  ? "text-primary-foreground"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-primary"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-primary rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {cat.label}
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
