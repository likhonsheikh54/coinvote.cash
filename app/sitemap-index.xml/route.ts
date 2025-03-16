import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Base URL of your site
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://coinvote.cash"

    // Current date for lastmod
    const today = new Date().toISOString()

    // Generate sitemap index XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemaps/coins.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemaps/static.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemaps/articles.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`

    // Return the XML sitemap index
    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    })
  } catch (error) {
    console.error("Error generating sitemap index:", error)
    return NextResponse.json({ error: "Failed to generate sitemap index" }, { status: 500 })
  }
}

