import Link from "next/link";
import { Product } from "@/types/firestore";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-4 text-sm">
          <Link
            href="/products"
            className="text-muted-foreground hover:text-primary"
          >
            Products
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link
            href={`/products/${product.categorySlug}`}
            className="text-muted-foreground hover:text-primary capitalize"
          >
            {product.categorySlug}
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium text-foreground">{product.name}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-primary mb-4 break-words">
          {product.name}
        </h1>

        <div className="flex flex-wrap gap-2 mb-6">
          {product.certifications?.map((cert) => (
            <span
              key={cert}
              className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary"
            >
              {cert}
            </span>
          ))}
        </div>

        <p className="text-base md:text-lg text-muted-foreground leading-relaxed break-words overflow-hidden">
          {product.description}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-y border-border">
        <div>
          <h3 className="font-semibold text-foreground mb-1">Origin</h3>
          <p className="text-muted-foreground">{product.origin}</p>
        </div>
        <div>
          <h3 className="font-semibold text-foreground mb-1">Packaging</h3>
          <p className="text-muted-foreground">
            Bulk / Retail Packs (Customizable)
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-foreground mb-1">Harvest Season</h3>
          <p className="text-muted-foreground">Seasonal / All Year</p>
        </div>
        <div>
          <h3 className="font-semibold text-foreground mb-1">MOQ</h3>
          <p className="text-muted-foreground">500 kg</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/contact"
          className="w-full sm:flex-1 inline-flex h-14 sm:h-12 items-center justify-center rounded-md bg-primary px-8 text-base font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          Request Quote
        </Link>
        <button className="w-full sm:flex-1 inline-flex h-14 sm:h-12 items-center justify-center rounded-md border border-input bg-background px-8 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
          Download Specification
        </button>
      </div>
    </div>
  );
}
