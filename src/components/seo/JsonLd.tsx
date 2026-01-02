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
  const baseUrl = "https://anfalglobalexport.in";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Anfal Global Export",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-6362534842",
        contactType: "sales",
        areaServed: "World",
        availableLanguage: "English",
      },
      {
        "@type": "ContactPoint",
        telephone: "+91-9731423320",
        contactType: "customer service",
        areaServed: "World",
        availableLanguage: "English",
      },
    ],
    sameAs: [
      "https://www.instagram.com/anfalglobal/",
      "https://www.linkedin.com/in/anfal-global-export-6612283a3",
    ],
  };

  return <JsonLd data={schema} />;
}
