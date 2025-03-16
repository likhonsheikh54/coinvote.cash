"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"
import Link from "next/link"
import { Search, Plus, Pencil, Trash, CheckCircle, XCircle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { executeQuery } from "@/lib/db/schema"

interface Coin {
  id: string
  name: string
  symbol: string
  logo: string
  market_cap: number
  price: number
  change_24h: number
  votes_count: number
  is_verified: boolean
  is_promoted: boolean
  created_at: string
}

export default function AdminCoinsPage() {
  const [coins, setCoins] = useState<Coin[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const ITEMS_PER_PAGE = 10

  const fetchCoins = async () => {
    setLoading(true)
    try {
      const result = await executeQuery(`
        SELECT c.*, COUNT(v.id) as votes_count
        FROM coins c
        LEFT JOIN votes v ON c.id = v.coin_id
        GROUP BY c.id
        ORDER BY c.created_at DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${(currentPage - 1) * ITEMS_PER_PAGE}
      `)

      if (result.success && result.data) {
        setCoins(result.data)

        // Get total count for pagination
        const countResult = await executeQuery(`
          SELECT COUNT(*) as total FROM coins
        `)

        if (countResult.success && countResult.data && countResult.data[0]) {
          const total = countResult.data[0].total
          setTotalPages(Math.ceil(total / ITEMS_PER_PAGE))
        }
      } else {
        toast({
          title: "Error fetching coins",
          description: "There was a problem retrieving coin data",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching coins:", error)
      toast({
        title: "Error fetching coins",
        description: "There was a problem retrieving coin data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCoins()
  }, [currentPage])

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteCoin = async (id: string) => {
    if (confirm("Are you sure you want to delete this coin? This action cannot be undone.")) {
      try {
        const result = await executeQuery(
          `
          DELETE FROM coins WHERE id = $1
        `,
          [id],
        )

        if (result.success) {
          toast({
            title: "Coin deleted",
            description: "The coin has been successfully deleted",
          })
          fetchCoins() // Refresh the list
        } else {
          toast({
            title: "Error deleting coin",
            description: "There was a problem deleting the coin",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error deleting coin:", error)
        toast({
          title: "Error deleting coin",
          description: "There was a problem deleting the coin",
          variant: "destructive",
        })
      }
    }
  }

  const toggleVerification = async (id: string, currentState: boolean) => {
    try {
      const result = await executeQuery(
        `
        UPDATE coins 
        SET is_verified = $1
        WHERE id = $2
      `,
        [!currentState, id],
      )

      if (result.success) {
        toast({
          title: `Coin ${currentState ? "unverified" : "verified"}`,
          description: `The coin has been ${currentState ? "unverified" : "verified"} successfully`,
        })

        // Update the local state
        setCoins(coins.map((coin) => (coin.id === id ? { ...coin, is_verified: !currentState } : coin)))
      } else {
        toast({
          title: "Error updating coin",
          description: "There was a problem updating the coin",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating coin:", error)
      toast({
        title: "Error updating coin",
        description: "There was a problem updating the coin",
        variant: "destructive",
      })
    }
  }

  const togglePromotion = async (id: string, currentState: boolean) => {
    try {
      const result = await executeQuery(
        `
        UPDATE coins 
        SET is_promoted = $1
        WHERE id = $2
      `,
        [!currentState, id],
      )

      if (result.success) {
        toast({
          title: `Coin ${currentState ? "unpromoted" : "promoted"}`,
          description: `The coin has been ${currentState ? "removed from promotion" : "promoted"} successfully`,
        })

        // Update the local state
        setCoins(coins.map((coin) => (coin.id === id ? { ...coin, is_promoted: !currentState } : coin)))
      } else {
        toast({
          title: "Error updating coin",
          description: "There was a problem updating the coin",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating coin:", error)
      toast({
        title: "Error updating coin",
        description: "There was a problem updating the coin",
        variant: "destructive",
      })
    }
  }

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1000000000) {
      return `$${(marketCap / 1000000000).toFixed(2)}B`
    } else if (marketCap >= 1000000) {
      return `$${(marketCap / 1000000).toFixed(2)}M`
    } else if (marketCap >= 1000) {
      return `$${(marketCap / 1000).toFixed(2)}K`
    } else {
      return `$${marketCap.toFixed(2)}`
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Coins</h1>
        <Button asChild className="bg-coin-green hover:bg-coin-green/90">
          <Link href="/admin/coins/new">
            <Plus className="h-4 w-4 mr-2" />
            Add New Coin
          </Link>
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search coins..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-[#1a1f25] border-gray-700"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="border-gray-700"
          >
            Previous
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="border-gray-700"
          >
            Next
          </Button>
        </div>
      </div>

      <div className="rounded-md border border-gray-800 overflow-hidden">
        <Table>
          <TableHeader className="bg-[#0D1217]">
            <TableRow className="border-gray-800 hover:bg-transparent">
              <TableHead className="text-gray-400">Name</TableHead>
              <TableHead className="text-gray-400">Price</TableHead>
              <TableHead className="text-gray-400">24h Change</TableHead>
              <TableHead className="text-gray-400">Market Cap</TableHead>
              <TableHead className="text-gray-400">Votes</TableHead>
              <TableHead className="text-gray-400">Verified</TableHead>
              <TableHead className="text-gray-400">Promoted</TableHead>
              <TableHead className="text-gray-400 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#FFDD33]"></div>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredCoins.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-gray-400">
                  No coins found
                </TableCell>
              </TableRow>
            ) : (
              filteredCoins.map((coin) => (
                <TableRow key={coin.id} className="border-gray-800 bg-[#0D1217] hover:bg-[#1a1f25]">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        src={coin.logo || "/placeholder.svg?height=40&width=40"}
                        alt={coin.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <div className="font-medium">{coin.name}</div>
                        <div className="text-xs text-gray-400">{coin.symbol}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>${coin.price?.toFixed(6) || "0.00"}</TableCell>
                  <TableCell className={coin.change_24h >= 0 ? "text-coin-green" : "text-red-500"}>
                    {coin.change_24h >= 0 ? "+" : ""}
                    {coin.change_24h?.toFixed(2) || "0.00"}%
                  </TableCell>
                  <TableCell>{formatMarketCap(coin.market_cap || 0)}</TableCell>
                  <TableCell>{coin.votes_count}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => toggleVerification(coin.id, coin.is_verified)}>
                      {coin.is_verified ? (
                        <CheckCircle className="h-5 w-5 text-coin-green" />
                      ) : (
                        <XCircle className="h-5 w-5 text-gray-400" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => togglePromotion(coin.id, coin.is_promoted)}>
                      {coin.is_promoted ? (
                        <CheckCircle className="h-5 w-5 text-coin-yellow" />
                      ) : (
                        <XCircle className="h-5 w-5 text-gray-400" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/coins/edit/${coin.id}`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteCoin(coin.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

