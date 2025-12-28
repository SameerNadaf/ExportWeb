/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Product } from "@/types/firestore";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.categorySlug}/${product.slug}`}
      className="group block bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:border-accent/50"
    >
      <div className="relative aspect-square w-full bg-muted overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0].url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
            <span className="font-bold text-2xl opacity-20">
              {product.name.charAt(0)}
            </span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.certifications &&
            product.certifications.slice(0, 1).map((cert, idx) => (
              <span
                key={idx}
                className="bg-white/90 backdrop-blur text-primary text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider"
              >
                {cert}
              </span>
            ))}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {product.origin}
          </span>
          <span className="text-xs font-bold text-secondary uppercase tracking-wide">
            {product.categorySlug}
          </span>
        </div>

        <h3 className="text-lg font-bold font-heading text-primary group-hover:text-accent transition-colors mb-2 line-clamp-1">
          {product.name}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2 break-all mb-4">
          {product.description}
        </p>

        <div className="flex items-center text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
          View Details
          <svg
            className="ml-1 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
