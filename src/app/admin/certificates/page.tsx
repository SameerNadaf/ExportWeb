import { CertificateManager } from "@/components/admin/certificates/CertificateManager";
import { adminDb } from "@/lib/firebase/admin";
import { Certificate } from "@/types/firestore";

// Force dynamic rendering to ensure we always get fresh data
export const dynamic = "force-dynamic";

export default async function AdminCertificatesPage() {
  const snapshot = await adminDb
    .collection("certificates")
    .orderBy("createdAt", "desc")
    .get();

  const certificates = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt:
        data.createdAt && typeof data.createdAt.toDate === "function"
          ? data.createdAt.toDate().toISOString()
          : new Date().toISOString(),
    };
  }) as Certificate[];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-heading text-foreground">
        Certificates
      </h1>
      <p className="text-muted-foreground">
        Manage the certificates displayed on your website.
      </p>

      <CertificateManager initialCertificates={certificates} />
    </div>
  );
}
