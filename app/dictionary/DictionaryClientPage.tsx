"use client"

import { useState } from "react"
import cryptoTermsData from "@/lib/crypto-terms"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function DictionaryClientPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredTerms, setFilteredTerms] = useState<Array<{ term: string; definition: string }>>([])

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredTerms([])
      return
    }

    const filtered = cryptoTermsData.filter(
      (item) =>
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredTerms(filtered)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Crypto Dictionary</h1>
      <div className="flex gap-2 mb-6">
        <Input
          type="text"
          placeholder="Search for a term or definition..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch()
            }
          }}
          className="max-w-md"
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      {filteredTerms.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTerms.map((item, index) => (
            <div key={index} className="border rounded-lg p-4 bg-card">
              <h3 className="text-xl font-semibold mb-2">{item.term}</h3>
              <p className="text-muted-foreground">{item.definition}</p>
            </div>
          ))}
        </div>
      ) : searchTerm ? (
        <p>No results found for "{searchTerm}"</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cryptoTermsData.slice(0, 9).map((item, index) => (
            <div key={index} className="border rounded-lg p-4 bg-card">
              <h3 className="text-xl font-semibold mb-2">{item.term}</h3>
              <p className="text-muted-foreground">{item.definition}</p>
            </div>
          ))}
          {cryptoTermsData.length > 9 && (
            <div className="border rounded-lg p-4 bg-card flex items-center justify-center">
              <p className="text-muted-foreground">
                + {cryptoTermsData.length - 9} more terms. Use search to find specific terms.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

