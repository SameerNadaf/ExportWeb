import { Hero } from "@/components/home/Hero";
import { CompanyIntro } from "@/components/home/CompanyIntro";
import { ExportMessaging } from "@/components/home/ExportMessaging";
import { CategoryPreview } from "@/components/home/CategoryPreview";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { CertificationsHighlight } from "@/components/home/CertificationsHighlight";
import { HomeCTA } from "@/components/home/HomeCTA";

import { adminDb } from "@/lib/firebase/admin";
import { Certificate } from "@/types/firestore";

export const revalidate = 60; // ISR: 1 minute

export default async function Home() {
  let certificates: Certificate[] = [];

  try {
    const snapshot = await adminDb
      .collection("certificates")
      .orderBy("createdAt", "desc")
      .limit(6)
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
    console.error("Error fetching certificates for home:", error);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <CompanyIntro />
      <ExportMessaging />
      <CategoryPreview />
      <WhyChooseUs />
      <CertificationsHighlight certificates={certificates} />
      <HomeCTA />
    </div>
  );
}
