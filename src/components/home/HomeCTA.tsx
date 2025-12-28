import Link from "next/link";

export function HomeCTA() {
  return (
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="container relative mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">
          Ready to Partner With Us?
        </h2>
        <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto mb-10">
          Get in touch today for a custom quote or to learn more about our
          export capabilities.
        </p>
        <Link
          href="/contact"
          className="inline-flex h-14 items-center justify-center rounded-md bg-accent px-10 text-lg font-bold text-accent-foreground shadow-lg hover:bg-accent/90 hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          Request a Quote
        </Link>
      </div>
    </section>
  );
}
