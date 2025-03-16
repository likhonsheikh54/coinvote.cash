import { NextResponse } from "next/server"
import { generateRobotsTxt } from "@/lib/utils/seo-utils"

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://coinvote.cash"
  const robotsTxt = generateRobotsTxt(baseUrl)

  return new NextResponse(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  })
}

