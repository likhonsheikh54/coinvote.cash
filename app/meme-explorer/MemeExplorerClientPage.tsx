"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { formatNumber, getColorForChange } from "@/lib/coinmarketcap-api"
import { voteForToken } from "@/lib/actions"
import { getCMCMemeCoins } from "@/lib/actions-extended"
import { useEffect, useState } from "react"

export default function MemeExplorerClientPage() {
  const [memeCoins, setMemeCoins] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMemeCoins = async () => {
      setIsLoading(true)
      const result = await getCMCMemeCoins(50)
      setMemeCoins(result.success ? result.data : [])
      setIsLoading(false)
    }

    fetchMemeCoins()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Meme Coin Explorer</h1>
      <p className="text-gray-400 mb-8">
        Discover and track the best meme coins. Find trending meme tokens, their performance, and community sentiment.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          memeCoins.slice(0, 6).map((coin) => (
            <div
              key={coin.id}
              className="bg-[#0D1217] rounded-lg border border-gray-800 overflow-hidden hover:border-[#FFDD33] transition-colors"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`}
                      alt={coin.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                      onError={(e) => {
                        ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=48&width=48"
                      }}
                    />
                    <div>
                      <h3 className="text-xl font-bold">{coin.name}</h3>
                      <div className="text-sm text-gray-400">{coin.symbol}</div>
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${getColorForChange(coin.quote.USD.percent_change_24h)}`}>
                    {coin.quote.USD.percent_change_24h >= 0 ? "+" : ""}
                    {coin.quote.USD.percent_change_24h.toFixed(2)}%
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-gray-400">Price</div>
                    <div className="font-medium">
                      $
                      {coin.quote.USD.price < 0.01
                        ? coin.quote.USD.price.toExponential(2)
                        : coin.quote.USD.price.toFixed(4)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Market Cap</div>
                    <div className="font-medium">{formatNumber(coin.quote.USD.market_cap)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Volume (24h)</div>
                    <div className="font-medium">{formatNumber(coin.quote.USD.volume_24h)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Rank</div>
                    <div className="font-medium">#{coin.cmc_rank}</div>
                  </div>
                </div>

                <Link href={`/coins/${coin.slug}`}>
                  <Button className="w-full bg-[#FFDD33] text-black hover:bg-[#FFDD33]/90">View Details</Button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-[#0D1217] rounded-lg border border-gray-800 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <h2 className="text-xl font-bold">All Meme Coins</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Market Cap
            </Button>
            <Button variant="outline" size="sm">
              24h %
            </Button>
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
                <th className="px-6 py-3">7d %</th>
                <th className="px-6 py-3">Market Cap</th>
                <th className="px-6 py-3">Volume (24h)</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : (
                memeCoins.map((coin) => (
                  <tr key={coin.id} className="border-b border-gray-800 hover:bg-gray-900/50">
                    <td className="px-6 py-4 text-sm">{coin.cmc_rank}</td>
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
                    <td className={`px-6 py-4 ${getColorForChange(coin.quote.USD.percent_change_24h)}`}>
                      {coin.quote.USD.percent_change_24h >= 0 ? "+" : ""}
                      {coin.quote.USD.percent_change_24h.toFixed(2)}%
                    </td>
                    <td className={`px-6 py-4 ${getColorForChange(coin.quote.USD.percent_change_7d)}`}>
                      {coin.quote.USD.percent_change_7d >= 0 ? "+" : ""}
                      {coin.quote.USD.percent_change_7d.toFixed(2)}%
                    </td>
                    <td className="px-6 py-4">{formatNumber(coin.quote.USD.market_cap)}</td>
                    <td className="px-6 py-4">{formatNumber(coin.quote.USD.volume_24h)}</td>
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

