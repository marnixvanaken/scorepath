import type { Metadata } from "next";
import { Bebas_Neue, Barlow_Condensed } from "next/font/google";
import Script from "next/script";
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
    <html lang="nl" className={`${bebasNeue.variable} ${barlowCondensed.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full font-ui">
        {/* Theme init: run vóór eerste paint om flash te voorkomen */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.dataset.theme='light';}else if(!t&&window.matchMedia('(prefers-color-scheme: light)').matches){document.documentElement.dataset.theme='light';}}catch(e){}})();` }} />
        {children}
        <Toaster />
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1392037508470232"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XMHT2LS1P6"
          strategy="beforeInteractive"
        />
        <Script
          id="ga4-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XMHT2LS1P6');` }}
        />
      </body>
    </html>
  );
}
