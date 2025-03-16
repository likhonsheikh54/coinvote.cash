import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const pathname = url.pathname

  // Check if the path is in the /coins/ directory and looks like an ID
  if (pathname.startsWith("/coins/") && pathname.split("/").length === 3) {
    const potentialIdOrSymbol = pathname.split("/")[2]

    // If it looks like an ID (numeric) and not a typical symbol (2-5 letters)
    if (/^\d+$/.test(potentialIdOrSymbol) && !/^[a-zA-Z]{2,5}$/.test(potentialIdOrSymbol)) {
      // Redirect to the coin-by-id route
      url.pathname = `/coin-by-id/${potentialIdOrSymbol}`
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/coins/:path*"],
}

