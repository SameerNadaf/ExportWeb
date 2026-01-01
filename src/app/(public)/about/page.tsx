import { adminDb } from "@/lib/firebase/admin";
import { AboutContent } from "@/components/about/AboutContent";

export const metadata = {
  title: "About Us | Anfal Global Export",
  description:
    "Our heritage, mission, and commitment to sustainable organic export.",
};

export const revalidate = 60;

export default async function AboutPage() {
  const doc = await adminDb.collection("content").doc("about").get();
  const data = doc.exists ? doc.data()?.value : {};

  return <AboutContent data={data} />;
}
