"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, TrendingUp } from "lucide-react"

export default function MarketOverview() {
  const [marketData, setMarketData] = useState({
    totalMarketCap: "2.45T",
    volume24h: "78.6B",
    btcDominance: "52.4%",
    activeCryptos: "8,452",
    marketCapChange: 2.34,
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real implementation, fetch market data from an API
    const fetchMarketData = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setLoading(false)
      } catch (error) {
        console.error("Error fetching market data:", error)
        setLoading(false)
      }
    }

    fetchMarketData()
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Market Overview</h2>
      <Card className="bg-[#0a0a0a] border-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-coin-green" />
            Crypto Market Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div>
                <p className="text-sm text-gray-400">Market Cap</p>
                <p className="text-lg font-semibold">${marketData.totalMarketCap}</p>
                <div className="flex items-center text-xs text-coin-green">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  {marketData.marketCapChange}%
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-400">24h Volume</p>
                <p className="text-lg font-semibold">${marketData.volume24h}</p>
              </div>

              <div>
                <p className="text-sm text-gray-400">BTC Dominance</p>
                <p className="text-lg font-semibold">{marketData.btcDominance}</p>
              </div>

              <div>
                <p className="text-sm text-gray-400">Active Cryptos</p>
                <p className="text-lg font-semibold">{marketData.activeCryptos}</p>
              </div>

              <div>
                <p className="text-sm text-gray-400">ETH Gas</p>
                <p className="text-lg font-semibold">32 Gwei</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

