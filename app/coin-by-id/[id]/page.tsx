import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { sql } from "@/lib/db/neon"
import { Redis } from "@upstash/redis"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { getCanonicalUrl } from "@/lib/utils/canonical"
import { createRedisClient } from '@/lib/redis-upstash'

// Initialize Redis client for caching
const redis = createRedisClient()

// Fetch coin data with caching
async function getCoinDataById(id: string) {
  // Try to get cached data first
  const cacheKey = `coin_data_id_${id}`
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
    WHERE c.id = ${id}
    LIMIT 1
  `

  if (result.rows.length === 0) {
    return null
  }

  // Cache the result for 5 minutes
  await redis.set(cacheKey, result.rows[0], { ex: 300 })

  return result.rows[0]
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = params

  try {
    const coin = await getCoinDataById(id)

    if (!coin) {
      return {
        title: "Coin Not Found | Coinvote",
        description: "The requested cryptocurrency could not be found.",
      }
    }

    return {
      title: `${coin.name} (${coin.symbol}) Price, Chart & Info | Coinvote`,
      description: `Get the latest ${coin.name} price, market cap, trading volume, chart, and info. Vote for ${coin.symbol} on Coinvote.`,
      alternates: {
        canonical: getCanonicalUrl(`/coins/${coin.symbol.toLowerCase()}`),
      },
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "Cryptocurrency Details | Coinvote",
      description: "View detailed information about this cryptocurrency.",
    }
  }
}

export default async function CoinByIdPage({ params }: { params: { id: string } }) {
  const { id } = params

  try {
    // Fetch coin data
    const coin = await getCoinDataById(id)

    if (!coin) {
      notFound()
    }

    // Redirect to the symbol-based URL for better SEO
    redirect(`/coins/${coin.symbol.toLowerCase()}`)

    // The code below won't execute due to the redirect, but we'll keep it as a fallback
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="bg-[#0a0a0a] rounded-lg border border-gray-800 p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative h-16 w-16 rounded-full overflow-hidden bg-gray-700">
              <Image
                src={coin.logo || `/placeholder.svg?height=64&width=64`}
                alt={coin.name}
                width={64}
                height={64}
                className="object-cover"
                priority
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.onerror = null
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

          <div className="mt-6">
            <Link href={`/coins/${coin.symbol.toLowerCase()}`}>
              <Button className="bg-yellow-400 text-black hover:bg-yellow-500">View Full Details</Button>
            </Link>
          </div>
        </div>
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

