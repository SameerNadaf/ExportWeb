import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductInfo } from "@/components/products/ProductInfo";
import { notFound } from "next/navigation";
import { adminDb } from "@/lib/firebase/admin";
import { Product } from "@/types/firestore";
import { JsonLd } from "@/components/seo/JsonLd";

export const revalidate = 60; // ISR

export async function generateStaticParams() {
  const snapshot = await adminDb
    .collection("products")
    .where("isActive", "==", true)
    .get();
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      category: data.categorySlug,
      slug: data.slug,
    };
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const snapshot = await adminDb
    .collection("products")
    .where("slug", "==", slug)
    .limit(1)
    .get();
  const product = snapshot.empty ? null : snapshot.docs[0].data();

  if (!product) return { title: "Product Not Found" };

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images.map((img: { url: string }) => img.url),
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;

  const snapshot = await adminDb
    .collection("products")
    .where("slug", "==", slug)
    .where("isActive", "==", true)
    .limit(1)
    .get();

  if (snapshot.empty) {
    notFound();
  }

  const productData = snapshot.docs[0].data();
  // Validate category match
  if (productData.categorySlug !== category) {
    notFound();
  }

  const product = {
    id: snapshot.docs[0].id,
    ...productData,
  } as unknown as Product;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            image: product.images?.map((img: any) => img.url),
            description: product.description,
            brand: {
              "@type": "Brand",
              name: "Anfal Global Export",
            },
            offers: {
              "@type": "Offer",
              url: `https://anfalglobalexport.in/products/${product.categorySlug}/${product.slug}`,
              availability: "https://schema.org/InStock",
            },
          }}
        />
        <div className="lg:sticky lg:top-24 lg:self-start">
          <ProductGallery images={product.images || []} name={product.name} />
        </div>
        <ProductInfo product={product} />
      </div>
    </div>
  );
}
