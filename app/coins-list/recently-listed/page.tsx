import type { Metadata } from "next"
import CoinTable from "@/components/coin-table"
import AdBanner from "@/components/ad-banner"

export const metadata: Metadata = {
  title: "Recently Listed Cryptocurrencies - Coinvote.cash",
  description: "Discover the latest cryptocurrencies added to Coinvote.cash. Track new coins, their prices, and community activity.",
}

export default function RecentlyListedPage() {
  return (
    <div className="min-h-screen bg-moon-night text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Recently Listed Cryptocurrencies</h1>
        <p className="text-gray-400 mb-8">Discover the newest additions to the cryptocurrency market.</p>

        <AdBanner />

        <div className="mt-8">
          <CoinTable showPagination={true} itemsPerPage={50} sortBy="listed_date" />
        </div>
      </div>
    </div>
  )
} 