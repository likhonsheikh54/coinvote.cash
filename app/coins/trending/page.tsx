import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { getTopCoins } from "@/lib/actions"
import TrendingCoins from "@/components/trending-coins"
import AdBanner from "@/components/ad-banner"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Trending Cryptocurrencies - Coinvote.cash",
  description: "Discover which cryptocurrencies are trending right now. See the hottest coins by price movement and community activity.",
}

export default function TrendingPage() {
  return (
    <div className="min-h-screen bg-moon-night text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Trending Cryptocurrencies</h1>
        <p className="text-gray-400 mb-8">Discover the most popular and trending cryptocurrencies right now.</p>

        <AdBanner />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-[#0D1217] rounded-lg border border-gray-800 p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Top Trending Coins</h2>
              <p className="text-gray-400 mb-6">
                These cryptocurrencies have shown significant price movements and social activity in the last 24 hours.
              </p>
              
              <div className="space-y-6">
                <TrendingCoins expandable={false} />
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-[#0D1217] rounded-lg border border-gray-800 p-6 mb-6">
              <h2 className="text-lg font-bold mb-4">Why Coins Trend</h2>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-coin-yellow">•</span>
                  <span>Significant price movements (up or down)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-coin-yellow">•</span>
                  <span>Increased trading volume</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-coin-yellow">•</span>
                  <span>Social media attention and mentions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-coin-yellow">•</span>
                  <span>Recent project announcements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-coin-yellow">•</span>
                  <span>Community votes on Coinvote.cash</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-[#0D1217] rounded-lg border border-gray-800 p-6">
              <h2 className="text-lg font-bold mb-4">Explore More</h2>
              <div className="space-y-3">
                <Link href="/coins-list/recently-listed">
                  <Button variant="outline" className="w-full border-gray-700 hover:border-coin-yellow justify-start">
                    Recently Listed
                  </Button>
                </Link>
                <Link href="/community-votes">
                  <Button variant="outline" className="w-full border-gray-700 hover:border-coin-yellow justify-start">
                    Community Votes
                  </Button>
                </Link>
                <Link href="/gainers-losers">
                  <Button variant="outline" className="w-full border-gray-700 hover:border-coin-yellow justify-start">
                    Biggest Gainers/Losers
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 