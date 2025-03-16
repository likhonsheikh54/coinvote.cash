import { NextResponse } from "next/server"
import { sql } from "@neondatabase/serverless"
import { isAdmin } from "@/lib/auth"
import { submitPagesToIndexNow } from "@/lib/actions-indexnow"
import { generateCanonicalUrl } from "@/lib/utils/seo-utils"

export async function POST(request: Request) {
  try {
    // Check if the user is an admin
    const admin = await isAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get all site URLs from the database
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://coinvote.cash"

    // Fetch all coins
    const coinsResult = await sql`
      SELECT id, symbol, name
      FROM coins
      ORDER BY updated_at DESC
    `

    // Collect all URLs
    const staticPaths = [
      "/",
      "/coins",
      "/nft",
      "/airdrops",
      "/icos",
      "/articles",
      "/events",
      "/listing",
      "/dictionary",
      "/about",
      "/contact",
      "/privacy",
      "/terms",
      "/disclaimer",
      "/portfolio",
      "/app",
      // Add other important paths
    ]

    const staticUrls = staticPaths.map((path) => generateCanonicalUrl(path, baseUrl))

    const coinUrls = coinsResult.rows.map((coin) =>
      generateCanonicalUrl(`/coins/${coin.symbol.toLowerCase()}`, baseUrl),
    )

    const allUrls = [...staticUrls, ...coinUrls]

    // Submit URLs to search engines
    // 1. Submit to IndexNow (Bing, Yandex)
    const indexNowResult = await submitPagesToIndexNow(allUrls)

    // 2. Save sitemap to XML file
    // This would typically be done by writing to a file or to a CDN storage

    // 3. Ping Google
    const googleResult = await fetch(
      `https://www.google.com/ping?sitemap=${encodeURIComponent(`${baseUrl}/sitemap.xml`)}`,
    )

    return NextResponse.json({
      success: true,
      message: `Generated and submitted sitemap with ${allUrls.length} URLs`,
      indexNowResult,
      googlePingStatus: googleResult.status,
    })
  } catch (error) {
    console.error("Error generating sitemap:", error)
    return NextResponse.json(
      {
        error: "Failed to generate sitemap",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

