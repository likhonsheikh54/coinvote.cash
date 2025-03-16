import type { Metadata } from "next"
import CoinTable from "@/components/coin-table"
import AdBanner from "@/components/ad-banner"

export const metadata: Metadata = {
  title: "All Cryptocurrencies - Coinvote.cash",
  description:
    "Browse and vote for the best cryptocurrencies. Track prices, market caps, and community activity in real-time.",
}

export default function CoinsListPage() {
  return (
    <div className="min-h-screen bg-moon-night text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">All Cryptocurrencies</h1>

        <AdBanner />

        <div className="mt-8">
          <CoinTable showPagination={true} itemsPerPage={50} />
        </div>
      </div>
    </div>
  )
} 