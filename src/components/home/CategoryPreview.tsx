import Link from "next/link";

export function CategoryPreview() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-primary mb-4">
            Our Core Offerings
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Sourced directly from certified organic farms, we bring you the
            finest produce nature has to offer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Spices Category */}
          <Link
            href="/products/spices"
            className="group relative h-[300px] w-full overflow-hidden rounded-2xl bg-muted block"
          >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10" />
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6 text-center">
              <h3 className="text-3xl font-bold text-white mb-2">
                Premium Spices
              </h3>
              <p className="text-white/90 mb-6 max-w-sm">
                Turmeric, Black Pepper, Cardamom, and more.
              </p>
              <span className="inline-flex items-center text-sm font-medium text-white underline decoration-accent decoration-2 underline-offset-4 group-hover:decoration-white transition-all">
                View Collection
              </span>
            </div>
            {/* Image Placeholder */}
            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center text-white/20 font-bold text-4xl">
              [Spices Image]
            </div>
          </Link>

          {/* Fruits Category */}
          <Link
            href="/products/fruits"
            className="group relative h-[300px] w-full overflow-hidden rounded-2xl bg-muted block"
          >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10" />
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6 text-center">
              <h3 className="text-3xl font-bold text-white mb-2">
                Exotic Fruits
              </h3>
              <p className="text-white/90 mb-6 max-w-sm">
                Mangoes, Bananas, Pineapples, and seasonal delights.
              </p>
              <span className="inline-flex items-center text-sm font-medium text-white underline decoration-accent decoration-2 underline-offset-4 group-hover:decoration-white transition-all">
                View Collection
              </span>
            </div>
            {/* Image Placeholder */}
            <div className="absolute inset-0 bg-secondary/20 flex items-center justify-center text-white/20 font-bold text-4xl">
              [Fruits Image]
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
