import { headers } from "next/headers"

/**
 * Generate a canonical URL for the current page
 * @param path Optional path to append to the base URL
 * @returns The canonical URL
 */
export function getCanonicalUrl(path?: string): string {
  const headersList = headers()
  const host = headersList.get("host") || "coinvote.cash"
  const protocol = host.includes("localhost") ? "http" : "https"

  if (path) {
    return `${protocol}://${host}${path.startsWith("/") ? path : `/${path}`}`
  }

  // Get the current path from headers
  const currentPath = headersList.get("x-url") || "/"
  return `${protocol}://${host}${currentPath}`
}

