import { adminDb } from "@/lib/firebase/admin";
import { ContentForm } from "@/components/admin/content/ContentForm";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const contactDoc = await adminDb.collection("content").doc("contact").get();
  const aboutDoc = await adminDb.collection("content").doc("about").get();

  const contactData = contactDoc.exists ? contactDoc.data() : {};
  const aboutData = aboutDoc.exists ? aboutDoc.data() : {};

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-heading text-foreground">
        Site Content
      </h1>
      <ContentForm contactData={contactData} aboutData={aboutData} />
    </div>
  );
}
