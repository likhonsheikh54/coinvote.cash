"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

interface PromotedCoin {
  id: string
  name: string
  symbol: string
  logo: string
  price: number
  pricePerToken: number
  createdAt: Date
  txHash: string
}

export default function PromotedCoins() {
  const [promotedCoins, setPromotedCoins] = useState<PromotedCoin[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPromotedCoins() {
      try {
        const response = await fetch("/api/promoted-coins", {
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })

        if (!response.ok) {
          const text = await response.text()
          console.error(`Server error (${response.status}): ${text}`)
          throw new Error(`Server responded with ${response.status}`)
        }

        const data = await response.json()
        setPromotedCoins(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error("Error fetching promoted coins:", error)
        setError("Failed to load promoted coins")
        setPromotedCoins([])
      } finally {
        setLoading(false)
      }
    }

    fetchPromotedCoins()
  }, [])

  return (
    <div className="bg-[#0a0a0a] rounded-lg border border-gray-800 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-yellow-400"></span>
          <h3 className="font-medium">Promoted Coins</h3>
        </div>
      </div>

      <div className="p-4">
        {loading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="text-center text-sm text-red-400 py-2">{error}</div>
        ) : promotedCoins.length === 0 ? (
          <p className="text-center text-sm text-gray-400 py-2">No promoted coins available</p>
        ) : (
          <div className="space-y-4">
            {promotedCoins.map((coin) => (
              <div key={coin.id} className="bg-gray-900 rounded-lg p-3 hover:bg-gray-800 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="relative h-8 w-8 rounded-full overflow-hidden bg-gray-700">
                      <Image
                        src={coin.logo || `/placeholder.svg?height=32&width=32`}
                        alt={coin.name}
                        width={32}
                        height={32}
                        className="object-cover"
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).src = `/placeholder.svg?height=32&width=32`
                        }}
                      />
                    </div>
                    <Link
                      href={`/coins/${coin.symbol.toLowerCase()}`}
                      className="font-medium hover:text-blue-400 transition"
                    >
                      {coin.name} ({coin.symbol})
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm text-gray-400">
                  <div>
                    <p className="text-xs text-gray-500">Price:</p>
                    <p className="font-mono text-white">${coin.price?.toFixed(6) || "0.00"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Price/Token:</p>
                    <p className="font-mono text-white">${coin.pricePerToken?.toFixed(8) || "0.00"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Time:</p>
                    <p>
                      {coin.createdAt ? formatDistanceToNow(new Date(coin.createdAt), { addSuffix: true }) : "Unknown"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Tx:</p>
                    {coin.txHash ? (
                      <a
                        href={`https://etherscan.io/tx/${coin.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 truncate block"
                      >
                        {coin.txHash.substring(0, 10)}...
                      </a>
                    ) : (
                      <span>N/A</span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-4 pt-3 border-t border-gray-800">
              <div className="text-center mb-4">
                <a
                  href="https://a-ads.com/?partner=2386175"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-400 hover:text-blue-300 transition"
                >
                  Advertise with AADS
                </a>
              </div>

              <div className="w-full overflow-hidden mb-4 flex justify-center">
                <iframe
                  data-aa="2386176"
                  src="//ad.a-ads.com/2386176?size=728x90"
                  style={{
                    width: "728px",
                    height: "90px",
                    border: "0px",
                    padding: 0,
                    overflow: "hidden",
                    backgroundColor: "transparent",
                  }}
                />
              </div>

              <div className="w-full overflow-hidden mb-4 flex justify-center">
                <iframe
                  data-aa="2386176"
                  src="//ad.a-ads.com/2386176?size=728x90"
                  style={{
                    width: "728px",
                    height: "90px",
                    border: "0px",
                    padding: 0,
                    overflow: "hidden",
                    backgroundColor: "transparent",
                  }}
                />
              </div>

              <div className="w-full overflow-hidden flex justify-center">
                <iframe
                  data-aa="2386176"
                  src="//acceptable.a-ads.com/2386176"
                  style={{
                    border: "0px",
                    padding: 0,
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    backgroundColor: "transparent",
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

