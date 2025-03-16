import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { slug?: string[] } }) {
  const slug = params.slug || []

  // If the slug looks like an ID (numeric or alphanumeric without special characters)
  if (slug.length === 1 && /^[a-zA-Z0-9]+$/.test(slug[0]) && !/^[a-zA-Z]{2,5}$/.test(slug[0])) {
    // Redirect to the coin-by-id route
    return NextResponse.redirect(new URL(`/coin-by-id/${slug[0]}`, request.url))
  }

  // Otherwise, let the request continue to be handled by the symbol-based route
  return NextResponse.next()
}

