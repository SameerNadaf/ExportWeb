import { adminDb } from "@/lib/firebase/admin";
import { ContentForm } from "@/components/admin/content/ContentForm";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const contactDoc = await adminDb.collection("content").doc("contact").get();
  const homeDoc = await adminDb.collection("content").doc("home").get();

  const contactData = contactDoc.exists ? contactDoc.data() : {};
  const homeData = homeDoc.exists ? homeDoc.data() : {};

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-heading text-foreground">
        Site Content
      </h1>
      <ContentForm contactData={contactData} homeData={homeData} />
    </div>
  );
}
