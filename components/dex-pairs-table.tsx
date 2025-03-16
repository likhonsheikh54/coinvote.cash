"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import {
  type Pair,
  formatLiquidity,
  getColorForPriceChange,
  formatPriceChange,
  getChainName,
  getChainLogo,
} from "@/lib/dexscreener-api"

interface DexPairsTableProps {
  initialPairs?: Pair[]
  title?: string
  description?: string
  loading?: boolean
}

export default function DexPairsTable({
  initialPairs,
  title = "DEX Pairs",
  description,
  loading = false,
}: DexPairsTableProps) {
  const [pairs, setPairs] = useState<Pair[]>(initialPairs || [])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(loading)

  useEffect(() => {
    if (initialPairs) {
      setPairs(initialPairs)
      setIsLoading(false)
    }
  }, [initialPairs])

  const itemsPerPage = 10
  const totalPages = Math.ceil(pairs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const displayedPairs = pairs.slice(startIndex, startIndex + itemsPerPage)

  if (isLoading) {
    return (
      <div className="bg-[#0D1217] rounded-lg border border-gray-800 p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFDD33]"></div>
      </div>
    )
  }

  return (
    <div className="bg-[#0D1217] rounded-lg border border-gray-800 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-800">
        <h2 className="text-xl font-bold">{title}</h2>
        {description && <p className="text-gray-400 text-sm mt-1">{description}</p>}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs text-gray-400 border-b border-gray-800">
              <th className="px-6 py-3 w-12">#</th>
              <th className="px-6 py-3">Pair</th>
              <th className="px-6 py-3">Chain</th>
              <th className="px-6 py-3">DEX</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">24h</th>
              <th className="px-6 py-3">Liquidity</th>
              <th className="px-6 py-3">Volume (24h)</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedPairs.length > 0 ? (
              displayedPairs.map((pair, index) => (
                <tr
                  key={`${pair.chainId}-${pair.pairAddress}`}
                  className="border-b border-gray-800 hover:bg-gray-900/50"
                >
                  <td className="px-6 py-4 text-sm">{startIndex + index + 1}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-xs">
                          {pair.baseToken.symbol.charAt(0)}
                        </div>
                        <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs">
                          {pair.quoteToken.symbol.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">
                          {pair.baseToken.symbol}/{pair.quoteToken.symbol}
                        </div>
                        <div className="text-xs text-gray-400">{pair.baseToken.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <Image
                        src={getChainLogo(pair.chainId) || "/placeholder.svg"}
                        alt={getChainName(pair.chainId)}
                        width={16}
                        height={16}
                        className="rounded-full"
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=16&width=16"
                        }}
                      />
                      <span>{getChainName(pair.chainId)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 capitalize">{pair.dexId}</td>
                  <td className="px-6 py-4 font-medium">
                    $
                    {Number.parseFloat(pair.priceUsd).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: Number.parseFloat(pair.priceUsd) < 0.01 ? 8 : 6,
                    })}
                  </td>
                  <td className={`px-6 py-4 ${getColorForPriceChange(pair.priceChange?.h24 || 0)}`}>
                    {formatPriceChange(pair.priceChange?.h24 || 0)}
                  </td>
                  <td className="px-6 py-4">{formatLiquidity(pair.liquidity?.usd || 0)}</td>
                  <td className="px-6 py-4">{formatLiquidity(pair.volume?.h24 || 0)}</td>
                  <td className="px-6 py-4">
                    <a
                      href={pair.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#FFDD33] hover:underline"
                    >
                      View <ExternalLink className="h-3 w-3" />
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="px-6 py-8 text-center text-gray-400">
                  No pairs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pairs.length > itemsPerPage && (
        <div className="flex items-center justify-center gap-1 p-4 border-t border-gray-800">
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8 text-gray-400 border-gray-700"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "default" : "outline"}
              size="icon"
              className={`w-8 h-8 ${
                currentPage === i + 1
                  ? "bg-[#FFDD33] text-black hover:bg-[#FFDD33]/90"
                  : "text-gray-400 border-gray-700"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8 text-gray-400 border-gray-700"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

