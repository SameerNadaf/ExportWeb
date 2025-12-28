import Image from "next/image";

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="md:w-1/3">
            <h2 className="text-sm font-bold tracking-widest text-secondary uppercase mb-2">
              Why Choose Us
            </h2>
            <h3 className="text-3xl font-bold font-heading text-primary mb-6">
              Committed to Quality & Sustainability
            </h3>
            <p className="text-muted-foreground">
              We don't just export products; we build lasting partnerships based
              on trust, quality, and ethical sourcing.
            </p>
            <div className="mt-8">
              <div className="h-64 w-full bg-muted rounded-xl relative overflow-hidden flex items-center justify-center text-muted-foreground shadow-sm">
                <Image
                  src="/assets/images/quality-handshake.png"
                  alt="Quality and Trust"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                1
              </div>
              <h4 className="text-xl font-bold">100% Organic Certified</h4>
              <p className="text-muted-foreground text-sm">
                Our products are sourced from farms that strictly adhere to
                organic farming practices, free from harmful pesticides.
              </p>
            </div>

            <div className="space-y-4">
              <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                2
              </div>
              <h4 className="text-xl font-bold">Fair Trade Practices</h4>
              <p className="text-muted-foreground text-sm">
                We believe in fair compensation for our farmers, ensuring a
                sustainable livelihood and community growth.
              </p>
            </div>

            <div className="space-y-4">
              <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                3
              </div>
              <h4 className="text-xl font-bold">Traceability</h4>
              <p className="text-muted-foreground text-sm">
                Every batch can be traced back to its origin, guaranteeing
                complete transparency in our supply chain.
              </p>
            </div>

            <div className="space-y-4">
              <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                4
              </div>
              <h4 className="text-xl font-bold">Timely Delivery</h4>
              <p className="text-muted-foreground text-sm">
                Our optimized logistics network ensures your order reaches you
                on time, preserving product freshness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
