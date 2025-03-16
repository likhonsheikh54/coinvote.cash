import { NextResponse } from "next/server"
import { sql } from "@neondatabase/serverless"

export async function GET() {
  try {
    // Fetch all active coins for the sitemap
    const coins = await sql`
      SELECT symbol, updated_at
      FROM coins
      ORDER BY updated_at DESC
    `

    // Base URL of your site
    const baseUrl = "https://coinvote.cash"

    // Generate XML sitemap
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/dictionary</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/app</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  ${coins.rows
    .map(
      (coin) => `
  <url>
    <loc>${baseUrl}/coins/${coin.symbol.toLowerCase()}</loc>
    <lastmod>${new Date(coin.updated_at).toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`,
    )
    .join("")}
</urlset>`

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

