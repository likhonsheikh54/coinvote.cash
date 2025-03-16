import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db/neon"
import { getRedisClient } from "@/lib/redis"
import { getAuthSession } from "@/lib/auth"

export async function POST(request: NextRequest) {
  const session = await getAuthSession()

  // Check if user is authenticated and is admin
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const adminResult = await sql`
    SELECT is_admin FROM users WHERE email = ${session.user.email}
  `

  if (!adminResult.rows[0]?.is_admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { coinId, txHash } = await request.json()

    if (!coinId || !txHash) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Insert new promoted coin
    await sql`
      INSERT INTO promoted_coins (coin_id, tx_hash, active)
      VALUES (${coinId}, ${txHash}, true)
    `

    // Clear cache
    const redis = getRedisClient()
    await redis.del("promoted-coins")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error adding promoted coin:", error)
    return NextResponse.json({ error: "Failed to add promoted coin" }, { status: 500 })
  }
}

