import { NextResponse } from "next/server"
import { sql } from "@neondatabase/serverless"
import { Redis } from "@upstash/redis"

// Initialize Redis client for caching
const redis = new Redis({
  url: process.env.REDIS_URL || "",
})

// Fetch real-time price data from CoinGecko
async function fetchCoinGeckoData(symbol: string) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${symbol.toLowerCase()}&x_cg_demo_api_key=${apiKey}`,
      { next: { revalidate: 300 } }, // Cache for 5 minutes
    )

    if (!response.ok) {
      throw new Error(`CoinGecko API responded with ${response.status}`)
    }

    const data = await response.json()
    return data[0] || null
  } catch (error) {
    console.error("Error fetching from CoinGecko:", error)
    return null
  }
}

// Fetch real-time price data from CoinMarketCap
async function fetchCoinMarketCapData(symbol: string) {
  try {
    const apiKey = process.env.COINMARKETCAP_API_KEY
    const response = await fetch(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol.toUpperCase()}`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": apiKey || "",
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      },
    )

    if (!response.ok) {
      throw new Error(`CoinMarketCap API responded with ${response.status}`)
    }

    const data = await response.json()
    return data.data[symbol.toUpperCase()] || null
  } catch (error) {
    console.error("Error fetching from CoinMarketCap:", error)
    return null
  }
}

export async function GET(request: Request, { params }: { params: { symbol: string } }) {
  const { symbol } = params

  try {
    // Try to get cached data first
    const cacheKey = `coin_api_${symbol.toLowerCase()}`
    const cachedData = await redis.get(cacheKey)

    if (cachedData) {
      return NextResponse.json(cachedData)
    }

    // Get base data from our database
    const dbResult = await sql`
      SELECT 
        c.id, 
        c.name, 
        c.symbol, 
        c.logo, 
        c.price, 
        c.price_per_token as "pricePerToken",
        c.market_cap as "marketCap",
        c.volume_24h as "volume24h",
        c.created_at as "createdAt",
        c.description,
        c.website,
        c.twitter,
        c.telegram,
        c.github
      FROM coins c
      WHERE LOWER(c.symbol) = LOWER(${symbol})
      LIMIT 1
    `

    if (dbResult.rows.length === 0) {
      return NextResponse.json({ error: "Coin not found" }, { status: 404 })
    }

    const coin = dbResult.rows[0]

    // Try to get real-time data from CoinGecko
    const geckoData = await fetchCoinGeckoData(symbol)

    // If CoinGecko fails, try CoinMarketCap
    const cmcData = !geckoData ? await fetchCoinMarketCapData(symbol) : null

    // Merge data, prioritizing external APIs for price data
    const mergedData = {
      ...coin,
      price: geckoData?.current_price || cmcData?.quote?.USD?.price || coin.price,
      marketCap: geckoData?.market_cap || cmcData?.quote?.USD?.market_cap || coin.marketCap,
      volume24h: geckoData?.total_volume || cmcData?.quote?.USD?.volume_24h || coin.volume24h,
      priceChange24h: geckoData?.price_change_percentage_24h || cmcData?.quote?.USD?.percent_change_24h || 0,
      dataSource: geckoData ? "coingecko" : cmcData ? "coinmarketcap" : "database",
    }

    // Cache the merged data for 5 minutes
    await redis.set(cacheKey, mergedData, { ex: 300 })

    return NextResponse.json(mergedData)
  } catch (error) {
    console.error("Error fetching coin data:", error)
    return NextResponse.json({ error: "Failed to fetch coin data" }, { status: 500 })
  }
}

