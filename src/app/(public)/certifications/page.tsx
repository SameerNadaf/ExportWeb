import { CertificationsContent } from "@/components/certifications/CertificationsContent";
import { adminDb } from "@/lib/firebase/admin";
import { Certificate } from "@/types/firestore";

export const metadata = {
  title: "Distinctions & Certifications",
  description:
    "Verified quality: USDA Organic, Global GAP, ISO 9001 certified.",
};

// Revalidate every hour
export const revalidate = 3600;

export default async function CertificationsPage() {
  let certificates: Certificate[] = [];

  try {
    const snapshot = await adminDb
      .collection("certificates")
      .orderBy("createdAt", "desc")
      .get();

    certificates = snapshot.docs.map((doc) => {
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
  } catch (error) {
    console.error("Error fetching certificates:", error);
  }

  return <CertificationsContent certificates={certificates} />;
}
