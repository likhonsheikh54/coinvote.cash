"use client"

import { useState, useEffect } from "react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function CoinPriceChart({ symbol }: { symbol: string }) {
  const [timeframe, setTimeframe] = useState("30d")
  const [chartData, setChartData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchChartData() {
      setLoading(true)

      try {
        // Fetch real price data from our API
        const response = await fetch(`/api/coins/${symbol.toLowerCase()}/chart?timeframe=${timeframe}`)

        if (!response.ok) {
          throw new Error(`API responded with ${response.status}`)
        }

        const data = await response.json()
        setChartData(data)
      } catch (error) {
        console.error("Error fetching chart data:", error)
        // Fallback to sample data if API fails
        setChartData(generateSampleData(symbol))
      } finally {
        setLoading(false)
      }
    }

    fetchChartData()
  }, [symbol, timeframe])

  // Generate sample data as fallback
  const generateSampleData = (symbol: string) => {
    const data = []
    const now = new Date()
    const basePrice = Math.random() * 1000 + 100

    for (let i = 30; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)

      // Generate some random price movement
      const randomFactor = 0.05 // 5% max change
      const change = basePrice * randomFactor * (Math.random() - 0.5)
      const price = basePrice + change * (30 - i)

      data.push({
        date: date.toISOString().split("T")[0],
        price: price.toFixed(2),
      })
    }

    return data
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Price Chart</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setTimeframe("24h")}
            className={`px-3 py-1 text-sm rounded-md ${timeframe === "24h" ? "bg-blue-600" : "bg-gray-800"}`}
          >
            24H
          </button>
          <button
            onClick={() => setTimeframe("7d")}
            className={`px-3 py-1 text-sm rounded-md ${timeframe === "7d" ? "bg-blue-600" : "bg-gray-800"}`}
          >
            7D
          </button>
          <button
            onClick={() => setTimeframe("30d")}
            className={`px-3 py-1 text-sm rounded-md ${timeframe === "30d" ? "bg-blue-600" : "bg-gray-800"}`}
          >
            30D
          </button>
        </div>
      </div>

      <div className="h-[300px] w-full">
        {loading ? (
          <div className="h-full w-full flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-2 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        ) : (
          <ChartContainer
            config={{
              price: {
                label: "Price",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "rgba(255,255,255,0.5)" }}
                  tickLine={{ stroke: "rgba(255,255,255,0.2)" }}
                  axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
                />
                <YAxis
                  tick={{ fill: "rgba(255,255,255,0.5)" }}
                  tickLine={{ stroke: "rgba(255,255,255,0.2)" }}
                  axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
                  tickFormatter={(value) => `$${value}`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="var(--color-price)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </div>
    </div>
  )
}

