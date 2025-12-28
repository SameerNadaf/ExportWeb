import { ContactForm } from "@/components/ui/ContactForm";
import { adminDb } from "@/lib/firebase/admin";

export const metadata = {
  title: "Contact Us | Greenary Export",
  description: "Get in touch for export inquiries and support.",
};

export const revalidate = 60;

export default async function ContactPage() {
  const doc = await adminDb.collection("content").doc("contact").get();
  const data = doc.exists ? doc.data()?.value : {};

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-heading text-primary mb-6">
          Get In Touch
        </h1>
        <p className="text-lg text-muted-foreground">
          Ready to order or have questions about our products? Fill out the form
          below or reach us directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {/* Contact Info */}
        <div className="lg:col-span-1 space-y-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Head Office</h3>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {data?.address ||
                `123 Export Plaza, Sector 5\nMumbai, Maharashtra\nIndia - 400001`}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Direct Contact</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="font-semibold text-foreground">Phone:</span>{" "}
                {data?.phone || "+91 98765 43210"}
              </li>
              <li className="flex items-center gap-2">
                <span className="font-semibold text-foreground">Email:</span>{" "}
                {data?.email || "export@greenary.com"}
              </li>
            </ul>
          </div>

          <div className="pt-4">
            <div className="aspect-video w-full bg-muted rounded-xl flex items-center justify-center text-muted-foreground text-sm">
              [Google Map Placeholder]
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
