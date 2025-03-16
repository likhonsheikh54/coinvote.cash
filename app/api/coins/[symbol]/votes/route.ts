import { NextResponse } from "next/server"
import { sql } from "@neondatabase/serverless"
import { Redis } from "@upstash/redis"
import { revalidatePath } from "next/cache"

// Initialize Redis client for caching
const redis = new Redis({
  url: process.env.REDIS_URL || "",
})

export async function GET(request: Request, { params }: { params: { symbol: string } }) {
  const { symbol } = params

  try {
    // Try to get cached vote count first
    const cacheKey = `votes_${symbol.toLowerCase()}`
    const cachedVotes = await redis.get(cacheKey)

    if (cachedVotes !== null) {
      return NextResponse.json({ votes: cachedVotes })
    }

    // If no cached data, query the database
    const result = await sql`
      SELECT 
        c.id,
        c.votes
      FROM coins c
      WHERE LOWER(c.symbol) = LOWER(${symbol})
      LIMIT 1
    `

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Coin not found" }, { status: 404 })
    }

    const votes = result.rows[0].votes || 0

    // Cache the vote count for 5 minutes
    await redis.set(cacheKey, votes, { ex: 300 })

    return NextResponse.json({ votes })
  } catch (error) {
    console.error("Error fetching votes:", error)
    return NextResponse.json({ error: "Failed to fetch votes" }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: { params: { symbol: string } }) {
  const { symbol } = params

  try {
    // Get the coin ID from the request body
    const { coinId } = await request.json()

    if (!coinId) {
      return NextResponse.json({ error: "Coin ID is required" }, { status: 400 })
    }

    // Update the vote count in the database
    const result = await sql`
      UPDATE coins
      SET votes = votes + 1
      WHERE id = ${coinId}
      RETURNING votes
    `

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Coin not found" }, { status: 404 })
    }

    const votes = result.rows[0].votes

    // Update the cached vote count
    const cacheKey = `votes_${symbol.toLowerCase()}`
    await redis.set(cacheKey, votes, { ex: 300 })

    // Revalidate the paths that display vote counts
    revalidatePath(`/coins/${symbol.toLowerCase()}`)
    revalidatePath("/")

    return NextResponse.json({ votes })
  } catch (error) {
    console.error("Error updating votes:", error)
    return NextResponse.json({ error: "Failed to update votes" }, { status: 500 })
  }
}

