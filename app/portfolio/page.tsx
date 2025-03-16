"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Plus, Settings, Share2, ChevronDown } from "lucide-react"
import { viewport } from "../viewport"

// Mock portfolio data
const portfolioData = {
  balance: 11000,
  assets: [
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      amount: 0.12,
      value: 7200,
      price: 60000,
      change24h: 2.5,
      allocation: 65.45,
    },
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      amount: 1.2,
      value: 3600,
      price: 3000,
      change24h: 1.8,
      allocation: 32.73,
    },
    {
      id: "solana",
      name: "Solana",
      symbol: "SOL",
      amount: 2.0,
      value: 200,
      price: 100,
      change24h: 5.2,
      allocation: 1.82,
    },
  ],
  notes: [
    {
      id: 1,
      title: "Slurpi",
      date: "03 Mar 2024",
      content: "Check out the new Slurpi token launch on March 10th",
    },
  ],
}

export default function PortfolioPage() {
  const [timeframe, setTimeframe] = useState("24h")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Portfolio</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          <Button className="bg-[#FFDD33] text-black hover:bg-[#FFDD33]/90">
            <Plus className="h-4 w-4 mr-2" /> Add Asset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-[#0D1217] rounded-lg border border-gray-800 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">Current Balance</h2>
                <div className="text-4xl font-bold text-[#FFDD33] mt-2">${portfolioData.balance.toLocaleString()}</div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={timeframe === "24h" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeframe("24h")}
                  className={timeframe === "24h" ? "bg-[#FFDD33] text-black hover:bg-[#FFDD33]/90" : ""}
                >
                  24h
                </Button>
                <Button
                  variant={timeframe === "7d" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeframe("7d")}
                  className={timeframe === "7d" ? "bg-[#FFDD33] text-black hover:bg-[#FFDD33]/90" : ""}
                >
                  7d
                </Button>
                <Button
                  variant={timeframe === "30d" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeframe("30d")}
                  className={timeframe === "30d" ? "bg-[#FFDD33] text-black hover:bg-[#FFDD33]/90" : ""}
                >
                  30d
                </Button>
                <Button
                  variant={timeframe === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeframe("all")}
                  className={timeframe === "all" ? "bg-[#FFDD33] text-black hover:bg-[#FFDD33]/90" : ""}
                >
                  All
                </Button>
              </div>
            </div>

            <div className="h-64 bg-[#121212] rounded-lg flex items-center justify-center text-gray-400 mb-6">
              Chart would be rendered here with a library like Chart.js or Recharts
            </div>

            <button className="w-full flex items-center justify-center text-gray-400 hover:text-white">
              <span>More Details</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>

        <div>
          <div className="bg-[#0D1217] rounded-lg border border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Notes</h2>
              <Button size="sm" className="bg-[#FFDD33] text-black hover:bg-[#FFDD33]/90">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {portfolioData.notes.length > 0 ? (
              <div className="space-y-4">
                {portfolioData.notes.map((note) => (
                  <div key={note.id} className="bg-[#121212] rounded-lg p-4">
                    <div className="font-medium mb-1">{note.title}</div>
                    <div className="text-xs text-gray-400 mb-2">{note.date}</div>
                    <p className="text-sm text-gray-300">{note.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8">No notes yet. Click the + button to add one.</div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-[#0D1217] rounded-lg border border-gray-800 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <h2 className="text-xl font-bold">Portfolio Overview</h2>
          <Button variant="outline" size="sm">
            Export
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-400 border-b border-gray-800">
                <th className="px-6 py-3">Asset</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">24h</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Value</th>
                <th className="px-6 py-3">Allocation</th>
              </tr>
            </thead>
            <tbody>
              {portfolioData.assets.map((asset) => (
                <tr key={asset.id} className="border-b border-gray-800 hover:bg-gray-900/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={`/placeholder.svg?height=32&width=32`}
                        alt={asset.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div>
                        <div className="font-medium">{asset.name}</div>
                        <div className="text-xs text-gray-400">{asset.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">${asset.price.toLocaleString()}</td>
                  <td className={`px-6 py-4 ${asset.change24h >= 0 ? "text-[#4BCC00]" : "text-red-500"}`}>
                    {asset.change24h >= 0 ? "+" : ""}
                    {asset.change24h}%
                  </td>
                  <td className="px-6 py-4">
                    {asset.amount} {asset.symbol}
                  </td>
                  <td className="px-6 py-4 font-medium">${asset.value.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-800 rounded-full h-1.5">
                        <div
                          className="bg-[#FFDD33] h-1.5 rounded-full"
                          style={{ width: `${asset.allocation}%` }}
                        ></div>
                      </div>
                      <span>{asset.allocation.toFixed(2)}%</span>
                    </div>
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

export { viewport }

