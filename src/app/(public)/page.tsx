import { Hero } from "@/components/home/Hero";
import { CompanyIntro } from "@/components/home/CompanyIntro";
import { ExportMessaging } from "@/components/home/ExportMessaging";
import { CategoryPreview } from "@/components/home/CategoryPreview";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { CertificationsHighlight } from "@/components/home/CertificationsHighlight";
import { HomeCTA } from "@/components/home/HomeCTA";
import { adminDb } from "@/lib/firebase/admin";

export const revalidate = 60; // ISR: 1 minute

export default async function Home() {
  // Fetch Home Content
  const homeDoc = await adminDb.collection("content").doc("home").get();
  const homeData = homeDoc.exists ? homeDoc.data() : null;

  return (
    <div className="flex flex-col min-h-screen">
      <Hero
        title={homeData?.value?.heroTitle as string}
        subtitle={homeData?.value?.mission as string}
      />
      <CompanyIntro />
      <ExportMessaging />
      <CategoryPreview />
      <WhyChooseUs />
      <CertificationsHighlight />
      <HomeCTA />
    </div>
  );
}
