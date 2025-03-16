import { NextResponse } from "next/server"
import { Redis } from "@upstash/redis"
import { createRedisClient } from '@/lib/redis-upstash'

// Initialize Redis client for caching
const redis = createRedisClient()

// Fetch historical price data from CoinGecko
async function fetchCoinGeckoChartData(symbol: string, days: string) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${symbol.toLowerCase()}/market_chart?vs_currency=usd&days=${days}&x_cg_demo_api_key=${apiKey}`,
      { next: { revalidate: 3600 } }, // Cache for 1 hour
    )

    if (!response.ok) {
      throw new Error(`CoinGecko API responded with ${response.status}`)
    }

    const data = await response.json()

    // Format the data for our chart
    return data.prices.map((price: [number, number]) => ({
      date: new Date(price[0]).toISOString().split("T")[0],
      price: price[1].toFixed(2),
    }))
  } catch (error) {
    console.error("Error fetching chart data from CoinGecko:", error)
    return null
  }
}

export async function GET(request: Request, { params }: { params: { symbol: string } }) {
  const { symbol } = params
  const { searchParams } = new URL(request.url)
  const timeframe = searchParams.get("timeframe") || "30d"

  // Convert timeframe to days for CoinGecko API
  const days = timeframe === "24h" ? "1" : timeframe === "7d" ? "7" : "30"

  try {
    // Try to get cached chart data first
    const cacheKey = `chart_${symbol.toLowerCase()}_${timeframe}`
    const cachedData = await redis.get(cacheKey)

    if (cachedData) {
      return NextResponse.json(cachedData)
    }

    // If no cached data, fetch from CoinGecko
    const chartData = await fetchCoinGeckoChartData(symbol, days)

    if (!chartData) {
      // If CoinGecko fails, generate sample data
      const sampleData = generateSampleData(symbol, days)
      return NextResponse.json(sampleData)
    }

    // Cache the chart data
    const cacheTime = timeframe === "24h" ? 300 : timeframe === "7d" ? 1800 : 3600 // 5min, 30min, or 1hr
    await redis.set(cacheKey, chartData, { ex: cacheTime })

    return NextResponse.json(chartData)
  } catch (error) {
    console.error("Error fetching chart data:", error)

    // Return sample data as fallback
    const sampleData = generateSampleData(symbol, days)
    return NextResponse.json(sampleData)
  }
}

// Generate sample chart data as fallback
function generateSampleData(symbol: string, days: string) {
  const data = []
  const now = new Date()
  const daysNum = Number.parseInt(days)
  const basePrice = Math.random() * 1000 + 100

  for (let i = daysNum; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    // Generate some random price movement
    const randomFactor = 0.05 // 5% max change
    const change = basePrice * randomFactor * (Math.random() - 0.5)
    const price = basePrice + change * (daysNum - i)

    data.push({
      date: date.toISOString().split("T")[0],
      price: price.toFixed(2),
    })
  }

  return data
}

