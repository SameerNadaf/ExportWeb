import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { OrganizationSchema } from "@/components/seo/JsonLd";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  manifest: "/site.webmanifest",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://anfalglobalexport.in"
  ),
  title: {
    default: "Anfal Global Export | Premium Spices, Fruits & Vegetables",
    template: "%s | Anfal Global Export",
  },
  description:
    "Exporting premium organic Indian spices, fresh fruits, and vegetables worldwide. Trusted exporter of high-quality agricultural products.",
  keywords: [
    "spices exporter",
    "indian spices",
    "fresh fruits export",
    "vegetables export",
    "organic spices",
    "turmeric finger",
    "black pepper",
    "moringa powder",
    "anfal global export",
  ],
  authors: [{ name: "Anfal Global Export" }],
  creator: "Anfal Global Export",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anfalglobalexport.in",
    siteName: "Anfal Global Export",
    title: "Anfal Global Export | Premium Spices, Fruits & Vegetables",
    description:
      "Exporting premium organic Indian spices, fresh fruits, and vegetables worldwide.",
    images: [
      {
        url: "/og-image.jpg", // We need to add this image later
        width: 1200,
        height: 630,
        alt: "Anfal Global Export",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anfal Global Export",
    description:
      "Exporting premium organic Indian spices, fresh fruits, and vegetables worldwide.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} min-h-screen font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="export-web-theme"
        >
          {children}
          <OrganizationSchema />
        </ThemeProvider>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
      </body>
    </html>
  );
}
