import { Button } from "@/components/ui/button"
import CoinTable from "@/components/coin-table"
import TrendingCoins from "@/components/trending-coins"
import PromotedCoins from "@/components/promoted-coins"
import AdBanner from "@/components/ad-banner"
import MobileAppBanner from "@/components/mobile-app-banner"
import MarketOverview from "@/components/market-overview"
import FeaturedSection from "@/components/featured-section"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Coinvote.cash - Most Voted Cryptocurrencies Today by Active Communities",
  description:
    "Discover and vote for the best cryptocurrencies. Track prices, market caps, and community activity in real-time.",
  keywords: "cryptocurrency, crypto voting, coin ranking, blockchain, bitcoin, ethereum",
}

export default function Home() {
  return (
    <div className="min-h-screen bg-moon-night text-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-moon-night to-[#1a1f25] py-12 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Find <span className="text-coin-yellow">New Cryptos</span> Early
              </h1>
              <p className="text-gray-300 text-lg mb-6">
                Discover and vote for the best cryptocurrencies. Track prices, market caps, and community activity in
                real-time.
              </p>
              <div className="flex gap-4">
                <Link href="/coins-list">
                  <Button className="bg-coin-green hover:bg-coin-green/90 text-white">Explore Coins</Button>
                </Link>
                <Link href="/listing">
                  <Button
                    variant="outline"
                    className="border-coin-yellow text-coin-yellow hover:bg-coin-yellow hover:text-black"
                  >
                    Free Listing
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/coinvote_logo%20%281%29-Mhlr3NEy1JIomccGbBwqECbqVMd2o1.webp"
                alt="Coinvote Logo"
                width={256}
                height={256}
                className="w-64 h-64 object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <AdBanner />

        <div className="mb-8">
          <MarketOverview />
        </div>

        <FeaturedSection />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <TrendingCoins />
          <div className="lg:col-span-2">
            <PromotedCoins />
          </div>
        </div>

        <CoinTable />

        <MobileAppBanner />
      </main>
    </div>
  )
}

