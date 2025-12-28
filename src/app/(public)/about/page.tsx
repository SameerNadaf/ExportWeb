import Link from "next/link";
import Image from "next/image";
import { adminDb } from "@/lib/firebase/admin";

export const metadata = {
  title: "About Us | Greenary Export",
  description:
    "Our heritage, mission, and commitment to sustainable organic export.",
};

export const revalidate = 60;

export default async function AboutPage() {
  const doc = await adminDb.collection("content").doc("home").get();
  const data = doc.exists ? doc.data()?.value : {};

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">
            Cultivating Trust, Exporting Health
          </h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            From the fertile soils of India to the global table, we are
            dedicated to delivering the purest organic produce.
          </p>
        </div>
        <div className="absolute inset-0 opacity-10 bg-[url('/placeholder-texture.png')] mix-blend-overlay"></div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold font-heading text-primary">
              Our Mission
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {data?.mission ||
                "To empower local farmers by connecting them with international markets, while providing global consumers with access to high-quality, ethically sourced organic products."}
            </p>
            <h2 className="text-3xl font-bold font-heading text-primary pt-6">
              Our Vision
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              To become the world's most trusted partner in the organic food
              supply chain, setting the standard for quality, sustainability,
              and transparency.
            </p>
          </div>
          <div className="h-[400px] relative bg-muted rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/assets/images/mission-vision.png"
              alt="Our Global Vision"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-heading text-primary">
              Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Integrity",
                desc: "We conduct our business with absolute honesty and transparency.",
              },
              {
                title: "Sustainability",
                desc: "We prioritize eco-friendly farming and supply chain practices.",
              },
              {
                title: "Quality",
                desc: "We never compromise on the freshness and purity of our products.",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="bg-background p-8 rounded-xl shadow-sm border border-border text-center"
              >
                <h3 className="text-xl font-bold text-primary mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold font-heading text-primary mb-6">
          Join Our Journey
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
          Whether you are a buyer looking for premium produce or a farmer
          seeking a reliable partner, we welcome you to Greenary Export.
        </p>
        <Link
          href="/contact"
          className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-8 text-base font-medium text-accent-foreground shadow hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
}
