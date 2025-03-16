"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface Coin {
  id: string
  name: string
  symbol: string
}

export default function PromotedCoinForm({ coins }: { coins: Coin[] }) {
  const [coinId, setCoinId] = useState("")
  const [txHash, setTxHash] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch("/api/promoted-coins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coinId, txHash }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess("Promoted coin added successfully!")
        setCoinId("")
        setTxHash("")
        router.refresh()
      } else {
        setError(data.error || "Failed to add promoted coin")
      }
    } catch (error) {
      setError("An error occurred while adding the promoted coin")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#0a0a0a] rounded-lg border border-gray-800 p-4">
      <div className="mb-4">
        <label htmlFor="coinId" className="block text-sm font-medium text-gray-300 mb-1">
          Select Coin
        </label>
        <select
          id="coinId"
          value={coinId}
          onChange={(e) => setCoinId(e.target.value)}
          required
          className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Select a coin</option>
          {coins.map((coin) => (
            <option key={coin.id} value={coin.id}>
              {coin.name} ({coin.symbol})
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="txHash" className="block text-sm font-medium text-gray-300 mb-1">
          Transaction Hash
        </label>
        <input
          type="text"
          id="txHash"
          value={txHash}
          onChange={(e) => setTxHash(e.target.value)}
          placeholder="0x..."
          required
          className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Adding..." : "Add Promoted Coin"}
      </button>

      {error && <div className="mt-3 text-sm text-red-400">{error}</div>}

      {success && <div className="mt-3 text-sm text-green-400">{success}</div>}
    </form>
  )
}

