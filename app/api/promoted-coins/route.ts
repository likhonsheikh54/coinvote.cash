import { NextResponse } from "next/server"
import { sql } from "@neondatabase/serverless"
import { revalidatePath } from "next/cache"
import { Redis } from "@upstash/redis"

// Initialize Redis client for caching
const redis = new Redis({
  url: process.env.REDIS_URL || "",
})

export async function GET() {
  try {
    // Try to get cached data first
    const cachedData = await redis.get("promoted_coins")

    if (cachedData) {
      return NextResponse.json(cachedData)
    }

    // If no cached data, query the database
    const result = await sql`
      SELECT 
        pc.id, 
        c.name, 
        c.symbol, 
        c.logo, 
        c.price, 
        c.price_per_token as "pricePerToken", 
        pc.created_at as "createdAt", 
        pc.tx_hash as "txHash"
      FROM promoted_coins pc
      JOIN coins c ON pc.coin_id = c.id
      WHERE pc.active = true
      ORDER BY pc.created_at DESC
      LIMIT 10
    `

    // Cache the result for 5 minutes
    await redis.set("promoted_coins", result.rows, { ex: 300 })

    // Return the data as JSON
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error("Error fetching promoted coins:", error)

    // Return a proper error response
    return NextResponse.json({ error: "Failed to fetch promoted coins" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { coinId, txHash } = await request.json()

    // Verify admin authorization
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]
    // In a real implementation, verify the token against your auth system

    // Insert the promoted coin
    const result = await sql`
      INSERT INTO promoted_coins (coin_id, tx_hash, active)
      VALUES (${coinId}, ${txHash}, true)
      RETURNING id
    `

    // Invalidate the cache
    await redis.del("promoted_coins")

    // Revalidate the paths that display promoted coins
    revalidatePath("/")
    revalidatePath("/coins")

    return NextResponse.json({
      success: true,
      id: result.rows[0].id,
    })
  } catch (error) {
    console.error("Error adding promoted coin:", error)
    return NextResponse.json({ error: "Failed to add promoted coin" }, { status: 500 })
  }
}

