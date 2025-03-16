import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { sql } from "@neondatabase/serverless"
import { CoinDetails } from "@/components/coin-details"
import { CoinPriceChart } from "@/components/coin-price-chart"
import { CoinSocialLinks } from "@/components/coin-social-links"
import { CoinVotingSection } from "@/components/coin-voting-section"
import { Redis } from "@upstash/redis"
import { getCanonicalUrl } from "@/lib/utils/canonical"
import {
  generateCryptoCurrencyStructuredData,
  generateBreadcrumbStructuredData,
  StructuredData,
} from "@/lib/utils/structured-data"

// Initialize Redis client for caching
const redis = new Redis({
  url: process.env.REDIS_URL || "",
})

// Fetch coin data with caching
async function getCoinData(symbol: string) {
  // Try to get cached data first
  const cacheKey = `coin_data_${symbol.toLowerCase()}`
  const cachedData = await redis.get(cacheKey)

  if (cachedData) {
    return cachedData
  }

  // If no cached data, query the database
  const result = await sql`
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

  if (result.rows.length === 0) {
    return null
  }

  // Cache the result for 5 minutes
  await redis.set(cacheKey, result.rows[0], { ex: 300 })

  return result.rows[0]
}

// Update the generateMetadata function to include canonical URL
export async function generateMetadata({ params }: { params: { symbol: string } }): Promise<Metadata> {
  const { symbol } = params

  try {
    const coin = await getCoinData(symbol)

    if (!coin) {
      return {
        title: "Coin Not Found | Coinvote",
        description: "The requested cryptocurrency could not be found.",
        alternates: {
          canonical: getCanonicalUrl(`/coins/${symbol}`),
        },
      }
    }

    return {
      title: `${coin.name} (${coin.symbol}) Price, Chart & Info | Coinvote`,
      description: `Get the latest ${coin.name} price, market cap, trading volume, chart, and info. Vote for ${coin.symbol} on Coinvote.`,
      alternates: {
        canonical: getCanonicalUrl(`/coins/${symbol}`),
      },
      openGraph: {
        title: `${coin.name} (${coin.symbol}) - $${Number.parseFloat(coin.price).toFixed(6)}`,
        description: `Get the latest ${coin.name} price, market cap, trading volume, chart, and info. Vote for ${coin.symbol} on Coinvote.`,
        images: [{ url: coin.logo || "/icons/coinvote-og.png" }],
        url: getCanonicalUrl(`/coins/${symbol}`),
      },
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "Cryptocurrency Details | Coinvote",
      description: "View detailed information about this cryptocurrency.",
      alternates: {
        canonical: getCanonicalUrl(`/coins/${symbol}`),
      },
    }
  }
}

// Generate static paths for common coins
export async function generateStaticParams() {
  try {
    const result = await sql`
      SELECT symbol
      FROM coins
      ORDER BY market_cap DESC
      LIMIT 100
    `

    return result.rows.map((coin) => ({
      symbol: coin.symbol.toLowerCase(),
    }))
  } catch (error) {
    console.error("Error generating static paths:", error)
    return []
  }
}

export default async function CoinPage({ params }: { params: { symbol: string } }) {
  const { symbol } = params
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

  try {
    // Fetch coin data
    const coin = await getCoinData(symbol)

    if (!coin) {
      notFound()
    }

    // Fetch real-time price data from CoinGecko or CoinMarketCap if needed
    // This would be implemented in a separate API route

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Coin info */}
          <div className="lg:col-span-2">
            <div className="bg-[#0a0a0a] rounded-lg border border-gray-800 p-6 mb-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative h-16 w-16 rounded-full overflow-hidden bg-gray-700">
                  {/* Update the image handling to better handle errors */}
                  <Image
                    src={coin.logo || `/placeholder.svg?height=64&width=64`}
                    alt={coin.name}
                    width={64}
                    height={64}
                    className="object-cover"
                    priority
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.onerror = null // Prevent infinite loop
                      target.src = `/placeholder.svg?height=64&width=64`
                    }}
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{coin.name}</h1>
                  <p className="text-gray-400">{coin.symbol}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="text-xl font-bold">${Number.parseFloat(coin.price).toFixed(6)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Market Cap</p>
                  <p className="text-xl font-bold">${Number.parseFloat(coin.marketCap || "0").toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">24h Volume</p>
                  <p className="text-xl font-bold">${Number.parseFloat(coin.volume24h || "0").toLocaleString()}</p>
                </div>
              </div>

              {/* Price chart */}
              <CoinPriceChart symbol={coin.symbol} />
            </div>

            {/* Coin details */}
            <CoinDetails coin={coin} />

            {/* Ad section */}
            <div className="bg-[#0a0a0a] rounded-lg border border-gray-800 p-6 mt-6">
              <h3 className="text-lg font-semibold mb-4">Sponsored</h3>

              <div className="w-full overflow-hidden mb-4 flex justify-center">
                <iframe
                  data-aa="2386176"
                  src="//ad.a-ads.com/2386176?size=728x90"
                  title="Cryptocurrency Advertisement Banner"
                  className="ad-banner-728x90"
                />
              </div>

              <div className="w-full overflow-hidden flex justify-center">
                <iframe
                  data-aa="2386176"
                  src="//acceptable.a-ads.com/2386176"
                  title="Cryptocurrency Acceptable Advertisement"
                  className="ad-banner-full"
                />
              </div>
            </div>
          </div>

          {/* Right column - Voting and social */}
          <div>
            <CoinVotingSection coinId={coin.id} symbol={coin.symbol} />
            <CoinSocialLinks coin={coin} />
          </div>
        </div>
        {/* Add structured data for SEO */}
        <StructuredData
          data={generateCryptoCurrencyStructuredData({
            name: coin.name,
            symbol: coin.symbol,
            description:
              coin.description ||
              `${coin.name} (${coin.symbol}) cryptocurrency price, market data and voting information.`,
            image: coin.logo || `${baseUrl}/icons/coinvote-og.png`,
            price: Number.parseFloat(coin.price),
            priceCurrency: "USD",
            url: getCanonicalUrl(`/coins/${coin.symbol.toLowerCase()}`, baseUrl),
          })}
        />
        <StructuredData
          data={generateBreadcrumbStructuredData({
            items: [
              { name: "Home", url: baseUrl },
              { name: "Coins", url: `${baseUrl}/coins` },
              { name: coin.name, url: getCanonicalUrl(`/coins/${coin.symbol.toLowerCase()}`, baseUrl) },
            ],
          })}
        />
      </div>
    )
  } catch (error) {
    console.error("Error fetching coin data:", error)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-[#0a0a0a] rounded-lg border border-gray-800 p-6">
          <h1 className="text-2xl font-bold mb-4">Error Loading Coin Data</h1>
          <p>There was a problem loading the data for this coin. Please try again later.</p>
        </div>
      </div>
    )
  }
}

