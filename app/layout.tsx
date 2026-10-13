import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { business, faqs, serviceGroups, siteUrl } from "@/content/site";
import "./globals.css";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-display", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

const title = `${business.name} | Professional Electrical Services`;
const description = `Contact ${business.name} for professional electrical service inquiries, installations, repairs, and project needs. Call ${business.phoneDisplay}.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: business.name,
    title,
    description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  themeColor: "#050a16",
  colorScheme: "dark",
};

// Structured data limited to verified facts: name, phone, city/state, services offered.
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Electrician",
    "@id": `${siteUrl}/#business`,
    name: business.name,
    url: siteUrl,
    telephone: business.phoneE164,
    address: {
      "@type": "PostalAddress",
      addressLocality: business.city,
      addressRegion: business.region,
      addressCountry: business.country,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Electrical services",
      itemListElement: serviceGroups.map((g) => ({
        "@type": "OfferCatalog",
        name: g.title,
        itemListElement: g.items.map((item) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: item },
        })),
      })),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
