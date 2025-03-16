import type { MetadataRoute } from "next"
import { getCoins } from "@/lib/coingecko-api"

// In a real application, this would be fetched from a database
const staticPages = [
  { route: "/" },
  { route: "/coins" },
  { route: "/nft" },
  { route: "/articles" },
  { route: "/icos" },
  { route: "/airdrops" },
  { route: "/events" },
  { route: "/tools" },
  { route: "/partners" },
  { route: "/about" },
  { route: "/contact" },
  { route: "/privacy" },
  { route: "/terms" },
  { route: "/portfolio" },
  { route: "/coins-list" },
  // Ranking pages
  { route: "/ranking/rising" },
  { route: "/ranking/trending" },
  { route: "/ranking/new-listed" },
  { route: "/ranking/all-time" },
  { route: "/ranking/presales" },
  { route: "/ranking/soon-launched" },
  { route: "/ranking/blacklisted" },
  // Cryptocurrency pages
  { route: "/coins/recently-listed" },
  { route: "/coins/trending" },
  { route: "/coins/presales" },
  { route: "/coins/categories" },
  { route: "/coins/most-voted" },
  { route: "/coins/blacklisted" },
  // Campaign pages
  { route: "/campaigns/airdrops" },
  { route: "/campaigns/icos" },
  { route: "/campaigns/events" },
  // Listing page
  { route: "/listing" },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://coinvote.cash"

  // Generate sitemap entries for static pages
  const staticEntries = staticPages.map(({ route }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "/" ? 1.0 : 0.8,
  }))

  // Get dynamic coin data
  const coins = await getCoins(1, 100).catch(() => [])

  // Generate sitemap entries for dynamic coin pages
  const coinEntries = coins.map((coin) => ({
    url: `${baseUrl}/coins/${coin.id}`,
    lastModified: new Date(),
    changeFrequency: "hourly" as const,
    priority: 0.9,
  }))

  // Mock NFT collection IDs for demo
  const nftCollectionIds = [1, 2, 3, 4, 5, 6]

  // Generate sitemap entries for NFT collection pages
  const nftEntries = nftCollectionIds.map((id) => ({
    url: `${baseUrl}/nft/${id}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }))

  // Mock ICO IDs for demo
  const icoIds = [1, 2, 3, 4, 5, 6]

  // Generate sitemap entries for ICO pages
  const icoEntries = icoIds.map((id) => ({
    url: `${baseUrl}/icos/${id}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }))

  // Mock airdrop IDs for demo
  const airdropIds = [1, 2, 3, 4, 5, 6]

  // Generate sitemap entries for airdrop pages
  const airdropEntries = airdropIds.map((id) => ({
    url: `${baseUrl}/airdrops/${id}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }))

  // Add proper error handling for the return statement
  try {
    return [...staticEntries, ...coinEntries, ...nftEntries, ...icoEntries, ...airdropEntries]
  } catch (error) {
    console.error("Error generating sitemap:", error)
    return [...staticEntries] // Return at least the static entries if there's an error
  }
}

