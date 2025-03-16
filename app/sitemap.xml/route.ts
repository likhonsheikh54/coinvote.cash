import { NextResponse } from "next/server"
import { sql } from "@neondatabase/serverless"
import { generateCanonicalUrl, generateSitemapEntry } from "@/lib/utils/seo-utils"
import { Redis } from "@upstash/redis"

// Initialize Redis client for caching
const redis = new Redis({
  url: process.env.REDIS_URL || "",
})

export async function GET() {
  try {
    // Try to get cached sitemap
    const cacheKey = "sitemap_xml_cache"
    const cachedSitemap = await redis.get(cacheKey)

    if (cachedSitemap) {
      return new NextResponse(cachedSitemap as string, {
        headers: {
          "Content-Type": "application/xml",
          "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
      })
    }

    // Fetch all active coins for the sitemap
    const coins = await sql`
      SELECT id, symbol, name, updated_at
      FROM coins
      ORDER BY updated_at DESC
    `

    // Fetch trending coins
    const trendingCoins = await sql`
      SELECT coin_id
      FROM trending_coins
      ORDER BY trend_score DESC
      LIMIT 50
    `

    // Create a set of trending coin IDs for O(1) lookup
    const trendingCoinIds = new Set(trendingCoins.rows.map((row) => row.coin_id))

    // Base URL of your site
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://coinvote.cash"

    // Define static pages with their priorities and change frequencies
    const staticPages = [
      { route: "/", priority: 1.0, changefreq: "daily" as const },
      { route: "/coins", priority: 0.9, changefreq: "hourly" as const },
      { route: "/nft", priority: 0.8, changefreq: "daily" as const },
      { route: "/articles", priority: 0.8, changefreq: "daily" as const },
      { route: "/icos", priority: 0.8, changefreq: "daily" as const },
      { route: "/airdrops", priority: 0.8, changefreq: "daily" as const },
      { route: "/events", priority: 0.7, changefreq: "daily" as const },
      { route: "/listing", priority: 0.8, changefreq: "weekly" as const },
      { route: "/dictionary", priority: 0.7, changefreq: "weekly" as const },
      { route: "/portfolio", priority: 0.6, changefreq: "monthly" as const },
      { route: "/app", priority: 0.6, changefreq: "monthly" as const },
      { route: "/about", priority: 0.5, changefreq: "monthly" as const },
      { route: "/contact", priority: 0.5, changefreq: "monthly" as const },
      { route: "/privacy", priority: 0.4, changefreq: "monthly" as const },
      { route: "/terms", priority: 0.4, changefreq: "monthly" as const },
      { route: "/disclaimer", priority: 0.4, changefreq: "monthly" as const },
      // Ranking pages
      { route: "/ranking/rising", priority: 0.8, changefreq: "daily" as const },
      { route: "/ranking/trending", priority: 0.9, changefreq: "hourly" as const },
      { route: "/ranking/new-listed", priority: 0.8, changefreq: "daily" as const },
      { route: "/ranking/all-time", priority: 0.7, changefreq: "weekly" as const },
      { route: "/ranking/presales", priority: 0.7, changefreq: "daily" as const },
      { route: "/ranking/soon-launched", priority: 0.7, changefreq: "daily" as const },
      { route: "/ranking/blacklisted", priority: 0.5, changefreq: "weekly" as const },
    ]

    // Generate XML sitemap
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

    // Add static pages
    staticPages.forEach((page) => {
      xml += generateSitemapEntry(generateCanonicalUrl(page.route, baseUrl), {
        lastmod: new Date().toISOString(),
        changefreq: page.changefreq,
        priority: page.priority,
      })
    })

    // Add dynamic coin pages
    coins.rows.forEach((coin) => {
      const url = generateCanonicalUrl(`/coins/${coin.symbol.toLowerCase()}`, baseUrl)
      const isTrending = trendingCoinIds.has(coin.id)

      xml += generateSitemapEntry(url, {
        lastmod: new Date(coin.updated_at).toISOString(),
        changefreq: isTrending ? "hourly" : "daily",
        priority: isTrending ? 0.9 : 0.8,
      })
    })

    // Close XML
    xml += `
</urlset>`

    // Cache sitemap for 1 hour
    await redis.set(cacheKey, xml, { ex: 3600 })

    // Return the XML sitemap
    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    })
  } catch (error) {
    console.error("Error generating sitemap:", error)
    return NextResponse.json({ error: "Failed to generate sitemap" }, { status: 500 })
  }
}

