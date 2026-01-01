import { adminDb } from "@/lib/firebase/admin";
import { ContactContent } from "@/components/contact/ContactContent";

export const metadata = {
  title: "Contact Us | Anfal Global Export",
  description: "Get in touch for export inquiries and support.",
};

export const revalidate = 60;

export default async function ContactPage() {
  const doc = await adminDb.collection("content").doc("contact").get();
  const data = doc.exists ? doc.data()?.value : {};

  return <ContactContent data={data} />;
}
