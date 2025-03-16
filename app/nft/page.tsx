import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getTopNFTs } from "@/lib/actions"

export const metadata: Metadata = {
  title: "NFT Collections | Coinvote.xyz",
  description:
    "Discover and vote for the best NFT collections. Track floor prices, volume, and community activity in real-time.",
  keywords: ["NFT", "non-fungible tokens", "digital art", "collectibles", "crypto art", "NFT marketplace"],
}

export default async function NFTPage() {
  // Get top NFTs
  const result = await getTopNFTs()
  const nfts = result.success ? result.data : []

  // Mock data for floor prices and volumes
  const mockData = {
    floorPrice: [0.5, 2.3, 0.8, 1.2, 0.3, 0.7],
    volume24h: [120, 85, 45, 30, 15, 25],
    change: [2.5, -1.2, 5.2, 1.8, -0.5, 3.2],
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Top NFT Collections</h1>
      <p className="text-gray-400 mb-8">
        Discover and vote for the best NFT collections. Track floor prices, volume, and community activity in real-time.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nfts.slice(0, 6).map((nft, index) => (
          <div
            key={nft.id}
            className="bg-[#0D1217] rounded-lg border border-gray-800 overflow-hidden hover:border-[#FFDD33] transition-colors"
          >
            <div className="relative aspect-square">
              <Image src={`/placeholder.svg?height=300&width=300`} alt={nft.name} fill className="object-cover" />
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold">{nft.name}</h3>
                <span className="text-sm text-gray-400">{nft.symbol}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs text-gray-400">Floor Price</div>
                  <div className="font-medium">{mockData.floorPrice[index]} ETH</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">24h Volume</div>
                  <div className="font-medium">{mockData.volume24h[index]} ETH</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">24h Change</div>
                  <div className={`font-medium ${mockData.change[index] >= 0 ? "text-[#4BCC00]" : "text-red-500"}`}>
                    {mockData.change[index] >= 0 ? "+" : ""}
                    {mockData.change[index]}%
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Platform</div>
                  <div className="font-medium">{nft.asset_platform_id}</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="w-full bg-[#FFDD33] text-black hover:bg-[#FFDD33]/90">Vote</Button>
                <Link href={`/nft/${nft.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    View
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

