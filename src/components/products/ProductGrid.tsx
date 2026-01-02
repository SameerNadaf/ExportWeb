"use client";

import { Product } from "@/types/firestore";
import { ProductCard } from "./ProductCard";
import { motion } from "framer-motion";
import { PackageOpen } from "lucide-react";
import Link from "next/link";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-24 text-center px-4"
      >
        <div className="bg-primary/10 p-6 rounded-full mb-6">
          <PackageOpen className="w-12 h-12 text-primary" />
        </div>
        <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
          No Products Found
        </h3>
        <p className="text-muted-foreground text-base max-w-md mb-8">
          We currently don't have any products in this category. Please check
          back later or browse our full collection.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          Browse All Products
        </Link>
      </motion.div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </motion.div>
  );
}
