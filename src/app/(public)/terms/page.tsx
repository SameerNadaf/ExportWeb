import { adminDb } from "@/lib/firebase/admin";

export const metadata = {
  title: "Terms of Use | Anfal Global Export",
  description: "Terms and conditions for using our website and services.",
};

export default async function TermsPage() {
  const doc = await adminDb.collection("content").doc("contact").get();
  const data = doc.exists ? doc.data()?.value : {};
  const companyEmail = data?.email || "info@anfalglobalexport.com";

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
      <h1 className="text-4xl font-bold font-heading text-primary mb-8">
        Terms of Use
      </h1>
      <div className="prose prose-green max-w-none text-muted-foreground">
        <p className="mb-4">Last Updated: January 5, 2026</p>

        <p className="mb-6">
          Welcome to Anfal Global Export. By accessing and using this website,
          you agree to comply with and be bound by the following terms and
          conditions. Please read them carefully.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
          1. Acceptance of Terms
        </h2>
        <p className="mb-6">
          By accessing this website, you accept these Terms of Use in full. If
          you disagree with these terms and conditions or any part of these
          terms and conditions, you must not use this website.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
          2. Intellectual Property
        </h2>
        <p className="mb-6">
          Unless otherwise stated, Anfal Global Export and/or its licensors own
          the intellectual property rights for all material on this website. All
          intellectual property rights are reserved. You may view and/or print
          pages from the site for your own personal use subject to restrictions
          set in these terms and conditions.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
          3. Product Information
        </h2>
        <p className="mb-6">
          We strive to ensure that all product descriptions, specifications, and
          images are accurate. However, we do not warrant that the product
          descriptions, images (which are for illustrative purposes only), or
          other content of this site is accurate, complete, reliable, current,
          or error-free. Natural products may vary in color, texture, and size.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
          4. Commercial Terms
        </h2>
        <p className="mb-6">
          These Terms of Use govern the use of this website only. The actual
          sale of goods, pricing, shipping, and liability for products exported
          by Anfal Global Export are governed exclusively by separate Sales
          Contracts, Proforma Invoices, and Purchase Orders agreed upon between
          the buyer and seller. Nothing on this website constitutes a binding
          legal offer to sell.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
          5. Limitation of Liability
        </h2>
        <p className="mb-6">
          In no event shall Anfal Global Export, nor any of its officers,
          directors, and employees, be liable to you for anything arising out of
          or in any way connected with your use of this website, whether such
          liability is under contract, tort or otherwise.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
          6. Governing Law
        </h2>
        <p className="mb-6">
          These terms and conditions are governed by and construed in accordance
          with the laws of India and you irrevocably submit to the exclusive
          jurisdiction of the courts in that State or location.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
          7. Changes to Terms
        </h2>
        <p className="mb-6">
          We reserve the right to revise these terms and conditions at any time.
          By using this website you are agreeing to be bound by the then current
          version of these Terms of Use.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
          8. Contact Information
        </h2>
        <p className="mb-4">
          If you have any questions about these Terms, please contact us at:
        </p>
        <p className="font-semibold text-foreground">
          Email:{" "}
          <a
            href={`mailto:${companyEmail}`}
            className="text-primary hover:underline"
          >
            {companyEmail}
          </a>
        </p>
      </div>
    </div>
  );
}
