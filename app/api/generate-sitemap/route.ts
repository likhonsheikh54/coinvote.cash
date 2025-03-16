import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db/schema"
import { submitPagesToIndexNow } from "@/lib/actions-indexnow"

export async function GET() {
  try {
    // Get all coins from the database
    const result = await executeQuery(`
      SELECT id, name, symbol, updated_at FROM coins
    `)

    if (!result.success || !result.data) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to fetch coins for sitemap",
        },
        { status: 500 },
      )
    }

    const coins = result.data

    // Generate sitemap entries for coins
    const coinUrls = coins.map((coin) => `https://coinvote.xyz/coins/${coin.id}`)

    // Generate sitemap entries for other pages
    const staticPages = [
      "https://coinvote.xyz/",
      "https://coinvote.xyz/coins",
      "https://coinvote.xyz/nft",
      "https://coinvote.xyz/airdrops",
      "https://coinvote.xyz/icos",
      "https://coinvote.xyz/articles",
      "https://coinvote.xyz/eth-wars",
      "https://coinvote.xyz/listing",
      "https://coinvote.xyz/dictionary",
      "https://coinvote.xyz/about",
      "https://coinvote.xyz/contact",
      "https://coinvote.xyz/privacy",
      "https://coinvote.xyz/terms",
      "https://coinvote.xyz/disclaimer",
    ]

    // Combine all URLs
    const allUrls = [...staticPages, ...coinUrls]

    // Submit URLs to IndexNow
    await submitPagesToIndexNow(allUrls)

    // Generate XML sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(
      (url) => `
  <url>
    <loc>${url}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  `,
    )
    .join("")}
  ${coinUrls
    .map(
      (url) => `
  <url>
    <loc>${url}</loc>
    <changefreq>hourly</changefreq>
    <priority>0.6</priority>
  </url>
  `,
    )
    .join("")}
</urlset>`

    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
      },
    })
  } catch (error) {
    console.error("Error generating sitemap:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Error generating sitemap",
        error,
      },
      { status: 500 },
    )
  }
}

