import { Hero } from "@/components/home/Hero";
import { CompanyIntro } from "@/components/home/CompanyIntro";
import { ExportMessaging } from "@/components/home/ExportMessaging";
import { CategoryPreview } from "@/components/home/CategoryPreview";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { CertificationsHighlight } from "@/components/home/CertificationsHighlight";
import { HomeCTA } from "@/components/home/HomeCTA";

export const revalidate = 60; // ISR: 1 minute

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <CompanyIntro />
      <ExportMessaging />
      <CategoryPreview />
      <WhyChooseUs />
      <CertificationsHighlight />
      <HomeCTA />
    </div>
  );
}
