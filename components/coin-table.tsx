"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"

interface CoinTableProps {
  showPagination?: boolean
  itemsPerPage?: number
}

export default function CoinTable({ showPagination = false, itemsPerPage = 20 }: CoinTableProps) {
  const [coins, setCoins] = useState([
    {
      id: "1",
      name: "Bitcoin",
      symbol: "BTC",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/OIP%20%2830%29.jpg-ViKfPPayNPTxWpytyFUoamdzeHSZHF.jpeg",
      price: 65432.1,
      marketCap: 1245678901234,
      volume24h: 32456789012,
      change24h: 2.34,
      votes: 12345,
    },
    {
      id: "2",
      name: "Ethereum",
      symbol: "ETH",
      logo: "/placeholder.svg?height=32&width=32",
      price: 3456.78,
      marketCap: 456789012345,
      volume24h: 12345678901,
      change24h: 1.23,
      votes: 9876,
    },
    {
      id: "3",
      name: "Solana",
      symbol: "SOL",
      logo: "/placeholder.svg?height=32&width=32",
      price: 123.45,
      marketCap: 56789012345,
      volume24h: 3456789012,
      change24h: 5.67,
      votes: 7654,
    },
    {
      id: "4",
      name: "Cardano",
      symbol: "ADA",
      logo: "/placeholder.svg?height=32&width=32",
      price: 0.56,
      marketCap: 23456789012,
      volume24h: 1234567890,
      change24h: -1.23,
      votes: 5432,
    },
    {
      id: "5",
      name: "Polkadot",
      symbol: "DOT",
      logo: "/placeholder.svg?height=32&width=32",
      price: 6.78,
      marketCap: 12345678901,
      volume24h: 987654321,
      change24h: 3.45,
      votes: 4321,
    },
  ])

  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("marketCap")
  const [sortDirection, setSortDirection] = useState("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    // In a real implementation, fetch coins from an API
    const fetchCoins = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setLoading(false)

        // Set total pages based on the total number of coins and items per page
        setTotalPages(Math.ceil(coins.length / itemsPerPage))
      } catch (error) {
        console.error("Error fetching coins:", error)
        setLoading(false)
      }
    }

    fetchCoins()
  }, [coins.length, itemsPerPage])

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortDirection("desc")
    }
  }

  const sortedCoins = [...coins].sort((a, b) => {
    const aValue = a[sortBy as keyof typeof a]
    const bValue = b[sortBy as keyof typeof b]

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return 0
  })

  // Get current page coins
  const indexOfLastCoin = currentPage * itemsPerPage
  const indexOfFirstCoin = indexOfLastCoin - itemsPerPage
  const currentCoins = sortedCoins.slice(indexOfFirstCoin, indexOfLastCoin)

  const SortIcon = ({ column }: { column: string }) => {
    if (sortBy !== column) return <ArrowUpDown className="h-4 w-4 ml-1" />
    return sortDirection === "asc" ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />
  }

  return (
    <div className="bg-[#0a0a0a] rounded-lg border border-gray-800 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-800">
        <h3 className="font-medium">All Cryptocurrencies</h3>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin h-8 w-8 border-2 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-right cursor-pointer" onClick={() => handleSort("price")}>
                  <div className="flex items-center justify-end">
                    Price <SortIcon column="price" />
                  </div>
                </th>
                <th className="px-4 py-3 text-right cursor-pointer" onClick={() => handleSort("change24h")}>
                  <div className="flex items-center justify-end">
                    24h % <SortIcon column="change24h" />
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-right cursor-pointer hidden md:table-cell"
                  onClick={() => handleSort("marketCap")}
                >
                  <div className="flex items-center justify-end">
                    Market Cap <SortIcon column="marketCap" />
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-right cursor-pointer hidden md:table-cell"
                  onClick={() => handleSort("volume24h")}
                >
                  <div className="flex items-center justify-end">
                    Volume (24h) <SortIcon column="volume24h" />
                  </div>
                </th>
                <th className="px-4 py-3 text-right cursor-pointer" onClick={() => handleSort("votes")}>
                  <div className="flex items-center justify-end">
                    Votes <SortIcon column="votes" />
                  </div>
                </th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentCoins.map((coin, index) => (
                <tr key={coin.id} className="border-b border-gray-800 hover:bg-gray-900">
                  <td className="px-4 py-4">{indexOfFirstCoin + index + 1}</td>
                  <td className="px-4 py-4">
                    <Link href={`/coins/${coin.symbol.toLowerCase()}`} className="flex items-center gap-3">
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
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-right font-mono">${coin.price.toLocaleString()}</td>
                  <td className={`px-4 py-4 text-right ${coin.change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {coin.change24h >= 0 ? "+" : ""}
                    {coin.change24h}%
                  </td>
                  <td className="px-4 py-4 text-right hidden md:table-cell">
                    ${(coin.marketCap / 1000000000).toFixed(2)}B
                  </td>
                  <td className="px-4 py-4 text-right hidden md:table-cell">
                    ${(coin.volume24h / 1000000000).toFixed(2)}B
                  </td>
                  <td className="px-4 py-4 text-right">{coin.votes.toLocaleString()}</td>
                  <td className="px-4 py-4 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-coin-yellow border-coin-yellow hover:bg-coin-yellow hover:text-black"
                    >
                      Vote
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showPagination && (
        <div className="flex justify-center mt-6 pb-6">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>

            <div className="flex items-center px-4 bg-gray-900 rounded-md">
              Page {currentPage} of {totalPages}
            </div>

            <Button
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

