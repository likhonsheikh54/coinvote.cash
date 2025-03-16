import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    template: "%s | Coinvote.cash",
    default: "Coinvote.cash - Most Voted Cryptocurrencies Today by Active Communities",
  },
  description:
    "Discover and vote for the best cryptocurrencies. Track prices, market caps, and community activity in real-time.",
  keywords: ["cryptocurrency", "crypto voting", "coin ranking", "blockchain", "bitcoin", "ethereum", "altcoins", "defi", "nft", "web3", "crypto market", "token voting"],
  authors: [{ name: "Coinvote Team", url: "https://coinvote.cash/about" }],
  creator: "Coinvote.cash",
  publisher: "Coinvote.cash",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://coinvote.cash"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://coinvote.cash",
    siteName: "Coinvote.cash",
    title: "Coinvote.cash - Most Voted Cryptocurrencies Today",
    description:
      "Discover and vote for the best cryptocurrencies. Track prices, market caps, and community activity in real-time.",
    images: [
      {
        url: "https://coinvote.cash/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Coinvote.cash - Cryptocurrency Voting Platform",
        type: "image/jpeg",
      },
      {
        url: "https://coinvote.cash/og-image-alt.png",
        width: 1200,
        height: 630,
        alt: "Vote for your favorite cryptocurrencies",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coinvote.cash - Most Voted Cryptocurrencies Today",
    description:
      "Discover and vote for the best cryptocurrencies. Track prices, market caps, and community activity in real-time.",
    site: "@coinvotecash",
    creator: "@coinvotecash",
    images: ["https://coinvote.cash/twitter-image.jpg"],
  },
  manifest: "/manifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#FFDD33",
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
    bing: "bing-verification-code",
  },
  alternates: {
    canonical: "/",
    languages: {
      'en-US': "/en-US",
      'es-ES': "/es-ES",
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}