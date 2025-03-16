import { NextResponse } from "next/server"
import { fixBrokenLink } from "@/lib/actions/seo-actions"
import { isAdmin } from "@/lib/auth"
import { createRedisClient } from "@/lib/redis-upstash"

// Initialize Redis client using our wrapper
const redis = createRedisClient();

export async function POST(request: Request) {
  try {
    // Check if the user is an admin
    const admin = await isAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Parse request body
    const body = await request.json()
    const { id, url } = body

    if (!id || !url) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    // Fix the broken link
    const result = await fixBrokenLink(parseInt(id), url)

    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error("Error fixing broken link:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

