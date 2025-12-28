import Link from "next/link";
import Image from "next/image";

interface HeroProps {
  title?: string;
  subtitle?: string;
}

export function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className="relative w-full bg-black text-white py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/hero-bg.png"
          alt="Premium Spices and Fruits"
          fill
          className="object-cover opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-black/60 md:bg-black/50" />
      </div>

      <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold font-heading tracking-tight mb-6 max-w-4xl text-white">
          {title || (
            <>
              Premium Organic Spices, Fruits & Vegetables{" "}
              <br className="hidden md:block" /> from{" "}
              <span className="text-accent">Nature's Finest Farms</span>
            </>
          )}
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-10 leading-relaxed">
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
            className="inline-flex h-12 items-center justify-center rounded-md border border-white bg-transparent px-8 text-base font-medium text-white shadow-sm hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Contact for Export
          </Link>
        </div>
      </div>
    </section>
  );
}
