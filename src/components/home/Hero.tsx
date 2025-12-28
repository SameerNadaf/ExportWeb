import Link from "next/link";

interface HeroProps {
  title?: string;
  subtitle?: string;
}

export function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className="relative w-full bg-primary text-primary-foreground py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-accent blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-secondary blur-3xl"></div>
      </div>

      <div className="container relative mx-auto px-4 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold font-heading tracking-tight mb-6 max-w-4xl">
          {title || (
            <>
              Premium Organic Spices, Fruits & Vegetables{" "}
              <br className="hidden md:block" /> from{" "}
              <span className="text-accent">Nature's Finest Farms</span>
            </>
          )}
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mb-10 leading-relaxed">
          {subtitle ||
            "We bridge the gap between authentic local farmers and the global market, delivering freshness and quality in every shipment."}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            href="/products"
            className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-8 text-base font-medium text-accent-foreground shadow hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Explore Products
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center rounded-md border border-primary-foreground bg-transparent px-8 text-base font-medium text-primary-foreground shadow-sm hover:bg-primary-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Contact for Export
          </Link>
        </div>
      </div>
    </section>
  );
}
