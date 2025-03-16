import { NextResponse } from "next/server"
import { sql } from "@/lib/db/neon"
import { Redis } from "@upstash/redis"
import { createRedisClient } from '@/lib/redis-upstash'

// Initialize Redis client for notifications
const redis = createRedisClient()

export async function POST(request: Request) {
  try {
    const { name, symbol, description, website, twitter, telegram, contractAddress, logo, email } = await request.json()

    // Validate required fields
    if (!name || !symbol || !description || !website || !contractAddress || !logo || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if coin already exists
    const existingCoin = await sql`
      SELECT id FROM coins WHERE LOWER(symbol) = LOWER(${symbol})
    `

    if (existingCoin.rows.length > 0) {
      return NextResponse.json({ error: "A coin with this symbol already exists" }, { status: 409 })
    }

    // Insert the listing request
    const result = await sql`
      INSERT INTO listing_requests (
        name,
        symbol,
        description,
        website,
        twitter,
        telegram,
        contract_address,
        logo,
        email,
        status
      ) VALUES (
        ${name},
        ${symbol},
        ${description},
        ${website},
        ${twitter || ""},
        ${telegram || ""},
        ${contractAddress},
        ${logo},
        ${email},
        'pending'
      ) RETURNING id
    `

    const requestId = result.rows[0].id

    // Notify admin about new listing request
    await redis.lpush(
      "admin_notifications",
      JSON.stringify({
        type: "listing_request",
        id: requestId,
        name,
        symbol,
        timestamp: new Date().toISOString(),
      }),
    )

    // Send email notification to admin (would be implemented with an email service)

    return NextResponse.json({
      success: true,
      message: "Listing request submitted successfully",
      id: requestId,
    })
  } catch (error) {
    console.error("Error submitting listing request:", error)
    return NextResponse.json({ error: "Failed to submit listing request" }, { status: 500 })
  }
}

