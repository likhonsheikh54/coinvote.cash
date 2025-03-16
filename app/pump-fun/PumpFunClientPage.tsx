"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getColorForChange } from "@/lib/coinmarketcap-api"
import { voteForToken } from "@/lib/actions"
import { useEffect, useState } from "react"
import { getPumpFunTrending } from "@/lib/actions-extended"

export default function PumpFunClientPage() {
  const [tokens, setTokens] = useState([])

  useEffect(() => {
    const fetchTokens = async () => {
      const result = await getPumpFunTrending()
      setTokens(result.success ? result.data : [])
    }

    fetchTokens()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Pump.fun Explorer</h1>
      <p className="text-gray-400 mb-8">
        Discover trending tokens on pump.fun. Find the best pump.fun and Moonshot tokens with real-time data.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {tokens.map((token) => (
          <div
            key={token.id}
            className="bg-[#0D1217] rounded-lg border border-gray-800 overflow-hidden hover:border-[#FFDD33] transition-colors"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-lg font-bold">
                    {token.symbol.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{token.name}</h3>
                    <div className="text-sm text-gray-400">{token.symbol}</div>
                  </div>
                </div>
                <div className={`text-sm font-medium ${getColorForChange(token.change24h)}`}>
                  {token.change24h >= 0 ? "+" : ""}
                  {token.change24h.toFixed(2)}%
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs text-gray-400">Price</div>
                  <div className="font-medium">
                    ${token.price < 0.01 ? token.price.toExponential(2) : token.price.toFixed(6)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Market Cap</div>
                  <div className="font-medium">${token.marketCap.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Volume (24h)</div>
                  <div className="font-medium">${token.volume24h.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Holders</div>
                  <div className="font-medium">{token.holders}</div>
                </div>
              </div>

              <Link href={`/pump-fun/${token.id}`}>
                <Button className="w-full bg-[#FFDD33] text-black hover:bg-[#FFDD33]/90">View Details</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#0D1217] rounded-lg border border-gray-800 p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">What is pump.fun?</h2>
        <p className="text-gray-300 mb-4">
          pump.fun is a platform that allows anyone to create coins with fair launches, meaning everyone has equal
          access to buy and sell when the coin is first created. The platform uses a bonding curve mechanism for
          pricing.
        </p>

        <h3 className="text-lg font-semibold mb-2">How it works:</h3>
        <ol className="list-decimal pl-5 text-gray-300 space-y-2 mb-4">
          <li>
            <strong>Step 1:</strong> Pick a coin that you like
          </li>
          <li>
            <strong>Step 2:</strong> Buy the coin on the bonding curve
          </li>
          <li>
            <strong>Step 3:</strong> Sell at any time to lock in your profits or losses
          </li>
        </ol>

        <div className="bg-gray-800/50 p-4 rounded-lg">
          <p className="text-sm text-gray-400">
            Note: Coinvote.xyz is not affiliated with pump.fun. We provide this data for informational purposes only.
            Always do your own research before investing in any cryptocurrency.
          </p>
        </div>
      </div>

      <div className="bg-[#0D1217] rounded-lg border border-gray-800 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <h2 className="text-xl font-bold">Moonshot Potential</h2>
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
                <th className="px-6 py-3">Market Cap</th>
                <th className="px-6 py-3">Volume (24h)</th>
                <th className="px-6 py-3">Created</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((token, index) => (
                <tr key={token.id} className="border-b border-gray-800 hover:bg-gray-900/50">
                  <td className="px-6 py-4 text-sm">{index + 1}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-sm font-bold">
                        {token.symbol.charAt(0)}
                      </div>
                      <div>
                        <Link href={`/pump-fun/${token.id}`} className="font-medium hover:text-[#FFDD33]">
                          {token.name}
                        </Link>
                        <div className="text-xs text-gray-400">{token.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">
                    ${token.price < 0.01 ? token.price.toExponential(2) : token.price.toFixed(6)}
                  </td>
                  <td className={`px-6 py-4 ${getColorForChange(token.change24h)}`}>
                    {token.change24h >= 0 ? "+" : ""}
                    {token.change24h.toFixed(2)}%
                  </td>
                  <td className="px-6 py-4">${token.marketCap.toLocaleString()}</td>
                  <td className="px-6 py-4">${token.volume24h.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm">{new Date(token.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <Button
                      size="sm"
                      className="bg-[#FFDD33] text-black hover:bg-[#FFDD33]/90 w-16"
                      onClick={() => voteForToken(token.id, "pumpfun")}
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
  )
}

