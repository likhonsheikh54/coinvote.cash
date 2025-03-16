"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { TrendingUp } from "lucide-react"

export default function TrendingCoins() {
  const [trendingCoins, setTrendingCoins] = useState([
    {
      id: "1",
      name: "Bitcoin",
      symbol: "BTC",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/OIP%20%2830%29.jpg-ViKfPPayNPTxWpytyFUoamdzeHSZHF.jpeg",
      price: 65432.1,
      change24h: 2.34,
    },
    {
      id: "2",
      name: "Ethereum",
      symbol: "ETH",
      logo: "/placeholder.svg?height=32&width=32",
      price: 3456.78,
      change24h: 1.23,
    },
    {
      id: "3",
      name: "Solana",
      symbol: "SOL",
      logo: "/placeholder.svg?height=32&width=32",
      price: 123.45,
      change24h: 5.67,
    },
    {
      id: "4",
      name: "Cardano",
      symbol: "ADA",
      logo: "/placeholder.svg?height=32&width=32",
      price: 0.56,
      change24h: -1.23,
    },
    {
      id: "5",
      name: "Polkadot",
      symbol: "DOT",
      logo: "/placeholder.svg?height=32&width=32",
      price: 6.78,
      change24h: 3.45,
    },
  ])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real implementation, fetch trending coins from an API
    const fetchTrendingCoins = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setLoading(false)
      } catch (error) {
        console.error("Error fetching trending coins:", error)
        setLoading(false)
      }
    }

    fetchTrendingCoins()
  }, [])

  return (
    <div className="bg-[#0a0a0a] rounded-lg border border-gray-800 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-coin-green" />
          <h3 className="font-medium">Trending</h3>
        </div>
      </div>

      <div className="p-4">
        {loading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        ) : (
          <div className="space-y-3">
            {trendingCoins.map((coin) => (
              <Link
                key={coin.id}
                href={`/coins/${coin.symbol.toLowerCase()}`}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-900 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-8 w-8 rounded-full overflow-hidden bg-gray-800">
                    <Image
                      src={coin.logo || "/placeholder.svg"}
                      alt={coin.name}
                      width={32}
                      height={32}
                      className="object-cover"
                      onError={(e) => {
                        ;(e.target as HTMLImageElement).src = `/placeholder.svg?height=32&width=32`
                      }}
                    />
                  </div>
                  <div>
                    <p className="font-medium">{coin.name}</p>
                    <p className="text-xs text-gray-400">{coin.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono">${coin.price.toLocaleString()}</p>
                  <p className={`text-xs ${coin.change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {coin.change24h >= 0 ? "+" : ""}
                    {coin.change24h}%
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

