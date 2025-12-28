import Link from "next/link";

export function CertificationsHighlight() {
  return (
    <section className="py-20 bg-background border-t border-border">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold font-heading text-primary mb-12">
          Certified Excellence
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          {/* Placeholders for logos */}
          <div className="h-16 w-32 bg-muted rounded flex items-center justify-center text-xs font-bold">
            ISO 9001
          </div>
          <div className="h-16 w-32 bg-muted rounded flex items-center justify-center text-xs font-bold">
            USDA Organic
          </div>
          <div className="h-16 w-32 bg-muted rounded flex items-center justify-center text-xs font-bold">
            Global GAP
          </div>
          <div className="h-16 w-32 bg-muted rounded flex items-center justify-center text-xs font-bold">
            Fair Trade
          </div>
          <div className="h-16 w-32 bg-muted rounded flex items-center justify-center text-xs font-bold">
            HACCP
          </div>
        </div>

        <div className="mt-12">
          <Link
            href="/certifications"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            View all certifications &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
