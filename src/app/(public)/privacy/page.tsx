import { adminDb } from "@/lib/firebase/admin";

export const metadata = {
  title: "Privacy Policy | Anfal Global Export",
  description: "Our commitment to protecting your personal information.",
};

export default async function PrivacyPolicyPage() {
  const doc = await adminDb.collection("content").doc("contact").get();
  const data = doc.exists ? doc.data()?.value : {};
  const companyEmail = data?.email || "info@anfalglobalexport.com";

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
      <h1 className="text-4xl font-bold font-heading text-primary mb-8">
        Privacy Policy
      </h1>
      <div className="prose prose-green max-w-none text-muted-foreground">
        <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>

        <p className="mb-6">
          At Anfal Global Export, we are committed to protecting your privacy
          and ensuring the security of your personal information. This Privacy
          Policy outlines how we collect, use, and safeguard your data when you
          visit our website or interact with our services.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
          1. Information We Collect
        </h2>
        <p className="mb-4">
          We may collect personal information that you voluntarily provide to us
          when you:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Fill out our contact forms (Name, Email, Phone Number).</li>
          <li>Subscribe to our newsletters or updates.</li>
          <li>Request quotes or product specifications.</li>
        </ul>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
          2. How We Use Your Information
        </h2>
        <p className="mb-4">
          The information we collect is used for the following purposes:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>To respond to your inquiries and support requests.</li>
          <li>To process orders and export documentation.</li>
          <li>
            To send you important updates about our products and services.
          </li>
          <li>To improve our website functionality and user experience.</li>
        </ul>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
          3. Data Security
        </h2>
        <p className="mb-6">
          We implement industry-standard security measures to protect your
          personal data from unauthorized access, alteration, disclosure, or
          destruction. However, please note that no method of transmission over
          the internet is 100% secure.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
          4. Third-Party Sharing
        </h2>
        <p className="mb-6">
          We do not sell, trade, or rent your personal identification
          information to others. We may share generic aggregated demographic
          information not linked to any personal identification information
          regarding visitors and users with our business partners and
          advertisers.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
          5. Contact Us
        </h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us
          at:
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
