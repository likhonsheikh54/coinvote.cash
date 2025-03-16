"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function FeaturedSection() {
  const featuredCoins = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/OIP%20%2830%29.jpg-ViKfPPayNPTxWpytyFUoamdzeHSZHF.jpeg",
      description: "The original cryptocurrency and the largest by market capitalization.",
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      logo: "/placeholder.svg?height=64&width=64",
      description: "A decentralized platform that enables smart contracts and dApps.",
    },
    {
      name: "Solana",
      symbol: "SOL",
      logo: "/placeholder.svg?height=64&width=64",
      description: "A high-performance blockchain supporting fast, secure, scalable decentralized apps.",
    },
  ]

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Featured Cryptocurrencies</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {featuredCoins.map((coin) => (
          <Card key={coin.symbol} className="bg-[#0a0a0a] border-gray-800 hover:border-gray-700 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative h-12 w-12 rounded-full overflow-hidden bg-gray-800">
                  <Image
                    src={coin.logo || "/placeholder.svg?height=48&width=48"}
                    alt={coin.name}
                    width={48}
                    height={48}
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.onerror = null // Prevent infinite loop
                      target.src = `/placeholder.svg?height=48&width=48`
                    }}
                  />
                </div>
                <div>
                  <Link
                    href={`/coins/${coin.symbol.toLowerCase()}`}
                    className="font-semibold hover:text-blue-400 transition"
                  >
                    {coin.name}
                  </Link>
                  <p className="text-sm text-gray-400">{coin.symbol}</p>
                </div>
              </div>
              <p className="text-sm text-gray-300">{coin.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

