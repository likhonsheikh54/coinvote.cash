import type { Metadata } from "next"
import { getNewlyListedCoins } from "@/lib/actions"
import CoinTable from "@/components/coin-table"
import MarketOverview from "@/components/market-overview"

export const metadata: Metadata = {
  title: "Recently Listed Cryptocurrencies | Coinvote.xyz",
  description:
    "Discover the newest cryptocurrencies added to the market. Vote for promising projects and track their performance.",
  keywords: ["new cryptocurrencies", "recently listed coins", "new tokens", "crypto voting", "new crypto projects"],
}

export default async function RecentlyListedPage() {
  // Get recently listed coins
  const result = await getNewlyListedCoins()
  const coins = result.success ? result.data : []

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Recently Listed Cryptocurrencies</h1>
      <p className="text-gray-400 mb-8">
        Discover the newest cryptocurrencies added to the market. Vote for promising projects and track their
        performance.
      </p>

      <div className="mb-8">
        <MarketOverview />
      </div>

      <CoinTable initialCoins={coins} />
    </div>
  )
}

