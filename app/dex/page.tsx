import type { Metadata } from "next"
import { getTrendingPairs, getHotPairs } from "@/lib/actions-dexscreener"
import DexPairsTable from "@/components/dex-pairs-table"
import DexSearch from "@/components/dex-search"

export const metadata: Metadata = {
  title: "DEX Explorer | Coinvote.xyz",
  description: "Explore DEX pairs, liquidity pools, and trading activity across multiple blockchains.",
  keywords: ["DEX", "decentralized exchange", "liquidity pools", "trading pairs", "DeFi", "cryptocurrency"],
}

export default async function DexPage() {
  // Get trending pairs
  const trendingResult = await getTrendingPairs()
  const trendingPairs = trendingResult.success ? trendingResult.data : []

  // Get hot pairs
  const hotResult = await getHotPairs()
  const hotPairs = hotResult.success ? hotResult.data : []

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">DEX Explorer</h1>
      <p className="text-gray-400 mb-8">
        Explore DEX pairs, liquidity pools, and trading activity across multiple blockchains.
      </p>

      <div className="mb-8">
        <DexSearch />
      </div>

      <div className="space-y-8">
        <DexPairsTable
          initialPairs={trendingPairs}
          title="Trending Pairs"
          description="Top pairs by liquidity across multiple chains"
        />

        <DexPairsTable initialPairs={hotPairs} title="Hot Pairs" description="Pairs with highest 24h trading volume" />
      </div>
    </div>
  )
}

