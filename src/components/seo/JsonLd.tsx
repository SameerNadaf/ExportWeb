import Head from "next/head";
import Script from "next/script";

interface JsonLdProps {
  data: Record<string, any>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <Script
      id="json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Anfal Global Export",
    url: "https://anfalglobalexport.in",
    logo: "https://anfalglobalexport.in/logo.png", // Ensure this exists or use a default
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-XXXXXXXXXX", // Needs to be updated with real info
      contactType: "customer service",
      areaServed: "World",
      availableLanguage: "English",
    },
    sameAs: [
      // Add social profiles here
    ],
  };

  return <JsonLd data={schema} />;
}
