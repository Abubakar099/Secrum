import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Overlays } from "@/components/layout/overlays"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
})

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://secrum-apotheke.example.com"),
  title: {
    default: "Secrum — Quiet Luxury Botanical Apothecary & Skincare",
    template: "%s · Secrum Apothecary",
  },
  description:
    "Secrum is a boutique Swiss extraction workshop isolating bio-active cellular nutrients of glacier-grown alpine flora and fjord-drawn marine silts, sealed in photoprotective twilight violet glass.",
  keywords: [
    "Secrum",
    "luxury skincare",
    "botanical apothecary",
    "alpine skincare",
    "organic serums",
    "clean beauty",
    "quiet luxury",
  ],
  authors: [{ name: "Secrum Apothecary" }],
  openGraph: {
    title: "Secrum — Quiet Luxury Botanical Apothecary & Skincare",
    description:
      "Bio-intelligent skincare distilled with glacial Swiss flora and oceanic silts. Rejecting fast chemical noise since 2021.",
    type: "website",
    siteName: "Secrum Apothecary",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Secrum — Quiet Luxury Botanical Apothecary & Skincare",
    description:
      "Bio-intelligent skincare distilled with glacial Swiss flora and oceanic silts.",
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export const viewport: Viewport = {
  themeColor: "#f5f5f0",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} bg-[#f5f5f0]`}
    >
      <body className="min-h-screen bg-[#f5f5f0] text-[#222222] font-sans antialiased overflow-x-hidden pb-12">
        <Header />
        <main className="pt-24 min-h-[75vh]">{children}</main>
        <Footer />
        <Overlays />
      </body>
    </html>
  )
}
