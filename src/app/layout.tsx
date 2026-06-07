import type { Metadata } from "next";
import { Bebas_Neue, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";
import { Toaster } from "@/components/Toaster";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s · ${SITE_NAME}` },
  description: "Vul de groepsuitslagen in en zie live wie doorgaat naar de knockout-fase van het WK 2026.",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/icon.svg",
  },
  openGraph: {
    title: `${SITE_NAME} — WK 2026 Simulator`,
    description: "Vul de groepsuitslagen in en zie live wie doorgaat.",
    locale: "nl_NL",
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — WK 2026 Simulator`,
    description: "Vul de groepsuitslagen in en zie live wie doorgaat.",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" className={`${bebasNeue.variable} ${barlowCondensed.variable} h-full antialiased`}>
      <head>
        {/* Geen flash bij laden: theme uit localStorage voor hydration */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.dataset.theme='light';}catch(e){}})();` }} />
      </head>
      <body className="min-h-full flex flex-col font-ui">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
