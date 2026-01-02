import { MetadataRoute } from "next";
import { adminDb } from "@/lib/firebase/admin";

export const revalidate = 3600; // Cache sitemap for 1 hour to save database reads

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://anfalglobalexport.in";

  // Static routes
  const routes = ["", "/about", "/contact", "/certifications"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic product routes
  try {
    const productsSnapshot = await adminDb
      .collection("products")
      .where("isActive", "==", true)
      .get();

    const productRoutes = productsSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        url: `${baseUrl}/products/${data.categorySlug}/${data.slug}`,
        lastModified: data.updatedAt
          ? new Date(
              typeof data.updatedAt === "string"
                ? data.updatedAt
                : data.updatedAt.toDate()
            )
          : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.9,
      };
    });

    return [...routes, ...productRoutes];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return routes;
  }
}
