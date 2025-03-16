"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { formatNumber } from "@/lib/coinmarketcap-api"
import { getCMCGainersLosers } from "@/lib/actions-extended"
import { useEffect, useState } from "react"

export default function GainersLosersClientPage() {
  const [gainersLosersData, setGainersLosersData] = useState({ top_gainers: [], top_losers: [] })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCMCGainersLosers()
      setGainersLosersData(result.success ? result.data : { top_gainers: [], top_losers: [] })
      setIsLoading(false)
    }

    fetchData()
  }, [])

  // Dummy function for voteForToken, replace with actual implementation
  const voteForToken = (tokenId: string, source: string) => {
    console.log(`Voting for token ${tokenId} from source ${source}`)
    alert(`Voting for token ${tokenId} from source ${source}! (This is a placeholder)`)
  }

  const { top_gainers = [], top_losers = [] } = gainersLosersData

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Biggest Gainers & Losers</h1>
      <p className="text-gray-400 mb-8">
        Track the biggest gainers and losers in the cryptocurrency market. Real-time data on price movements.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-[#0D1217] rounded-lg border border-gray-800 overflow-hidden">
          <div className="flex items-center px-6 py-4 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#4BCC00]"></div>
              <h2 className="text-xl font-bold">Top Gainers (24h)</h2>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-gray-400 border-b border-gray-800">
                  <th className="px-6 py-3 w-12">#</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">24h %</th>
                  <th className="px-6 py-3">Market Cap</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {top_gainers.map((coin, index) => (
                  <tr key={coin.id} className="border-b border-gray-800 hover:bg-gray-900/50">
                    <td className="px-6 py-4 text-sm">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`}
                          alt={coin.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                          onError={(e) => {
                            ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=24&width=24"
                          }}
                        />
                        <div>
                          <Link href={`/coins/${coin.slug}`} className="font-medium hover:text-[#FFDD33]">
                            {coin.name}
                          </Link>
                          <div className="text-xs text-gray-400">{coin.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">
                      $
                      {coin.quote.USD.price < 0.01
                        ? coin.quote.USD.price.toExponential(2)
                        : coin.quote.USD.price.toFixed(4)}
                    </td>
                    <td className="px-6 py-4 text-[#4BCC00]">+{coin.quote.USD.percent_change_24h.toFixed(2)}%</td>
                    <td className="px-6 py-4">{formatNumber(coin.quote.USD.market_cap)}</td>
                    <td className="px-6 py-4">
                      <Button
                        size="sm"
                        className="bg-[#FFDD33] text-black hover:bg-[#FFDD33]/90 w-16"
                        onClick={() => voteForToken(coin.id.toString(), "cmc")}
                      >
                        Vote
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[#0D1217] rounded-lg border border-gray-800 overflow-hidden">
          <div className="flex items-center px-6 py-4 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <h2 className="text-xl font-bold">Top Losers (24h)</h2>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-gray-400 border-b border-gray-800">
                  <th className="px-6 py-3 w-12">#</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">24h %</th>
                  <th className="px-6 py-3">Market Cap</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {top_losers.map((coin, index) => (
                  <tr key={coin.id} className="border-b border-gray-800 hover:bg-gray-900/50">
                    <td className="px-6 py-4 text-sm">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`}
                          alt={coin.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                          onError={(e) => {
                            ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=24&width=24"
                          }}
                        />
                        <div>
                          <Link href={`/coins/${coin.slug}`} className="font-medium hover:text-[#FFDD33]">
                            {coin.name}
                          </Link>
                          <div className="text-xs text-gray-400">{coin.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">
                      $
                      {coin.quote.USD.price < 0.01
                        ? coin.quote.USD.price.toExponential(2)
                        : coin.quote.USD.price.toFixed(4)}
                    </td>
                    <td className="px-6 py-4 text-red-500">{coin.quote.USD.percent_change_24h.toFixed(2)}%</td>
                    <td className="px-6 py-4">{formatNumber(coin.quote.USD.market_cap)}</td>
                    <td className="px-6 py-4">
                      <Button
                        size="sm"
                        className="bg-[#FFDD33] text-black hover:bg-[#FFDD33]/90 w-16"
                        onClick={() => voteForToken(coin.id.toString(), "cmc")}
                      >
                        Vote
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-[#0D1217] rounded-lg border border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4">Market Insights</h2>
        <p className="text-gray-300 mb-4">
          Gainers and losers can provide valuable insights into market sentiment and potential opportunities. Here are
          some tips for analyzing price movements:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800/30 p-4 rounded-lg">
            <h3 className="font-semibold text-[#4BCC00] mb-2">Analyzing Gainers</h3>
            <ul className="list-disc pl-5 text-gray-300 space-y-1">
              <li>Look for fundamental reasons behind the price increase</li>
              <li>Check if the volume supports the price movement</li>
              <li>Be cautious of pump and dump schemes</li>
              <li>Research recent news and developments</li>
            </ul>
          </div>

          <div className="bg-gray-800/30 p-4 rounded-lg">
            <h3 className="font-semibold text-red-500 mb-2">Analyzing Losers</h3>
            <ul className="list-disc pl-5 text-gray-300 space-y-1">
              <li>Determine if the drop is market-wide or token-specific</li>
              <li>Look for potential buying opportunities</li>
              <li>Check for negative news or developments</li>
              <li>Assess if the project fundamentals have changed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

