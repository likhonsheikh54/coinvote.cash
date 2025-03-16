"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { searchForPairs } from "@/lib/actions-dexscreener"
import DexPairsTable from "@/components/dex-pairs-table"

export default function DexSearch() {
  const [query, setQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!query.trim()) return

    setIsSearching(true)
    setHasSearched(true)

    try {
      const result = await searchForPairs(query)
      setSearchResults(result.success ? result.data : [])
    } catch (error) {
      console.error("Error searching for pairs:", error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-[#0D1217] rounded-lg border border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4">Search DEX Pairs</h2>

        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            type="text"
            placeholder="Search by token name, symbol, or address..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-[#1A1A1A] border-gray-700 focus:border-[#FFDD33] focus:ring-[#FFDD33]"
          />
          <Button type="submit" className="bg-[#FFDD33] text-black hover:bg-[#FFDD33]/90" disabled={isSearching}>
            {isSearching ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
            ) : (
              <Search className="h-4 w-4" />
            )}
            <span className="ml-2">Search</span>
          </Button>
        </form>

        <div className="mt-2 text-xs text-gray-400">
          Search for tokens, pairs, or addresses across multiple blockchains
        </div>
      </div>

      {hasSearched && <DexPairsTable initialPairs={searchResults} title="Search Results" loading={isSearching} />}
    </div>
  )
}

