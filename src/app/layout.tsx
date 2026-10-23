import type { Metadata, Viewport } from "next";
import { Archivo, Fraunces } from "next/font/google";
import { SITE } from "@/data/site";
import { StoreProvider } from "@/components/StoreProvider";
import { CartDrawer } from "@/components/CartDrawer";
import { SearchOverlay } from "@/components/SearchOverlay";
import { RevealObserver } from "@/components/Reveal";
import { Toast } from "@/components/Toast";
import "./globals.css";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], axes: ["wdth"], display: "swap" });
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], style: ["normal", "italic"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} | ${SITE.tagline}`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "pt_BR",
    images: [{ url: "/images/editorial/hero.webp", width: 2560, height: 1440, alt: "Campanha ABISSAL da NEPZERA" }],
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${fraunces.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* habilita as animações de revelação só quando há JS (sem JS o conteúdo fica visível) */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <StoreProvider>
          {children}
          <CartDrawer />
          <SearchOverlay />
          <Toast />
          <RevealObserver />
        </StoreProvider>
      </body>
    </html>
  );
}
