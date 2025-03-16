import { COINMARKETCAP_API_KEY } from "@/lib/config"

const CMC_API_URL = "https://pro-api.coinmarketcap.com"

// Helper function to make API requests
async function fetchCMC<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  try {
    const url = new URL(`${CMC_API_URL}${endpoint}`)

    // Add parameters to URL
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value)
    })

    const response = await fetch(url.toString(), {
      headers: {
        "X-CMC_PRO_API_KEY": COINMARKETCAP_API_KEY || "",
        Accept: "application/json",
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    })

    if (!response.ok) {
      throw new Error(`CoinMarketCap API error: ${response.status} ${response.statusText}`)
    }

    return response.json() as Promise<T>
  } catch (error) {
    console.error(`Error fetching from CoinMarketCap API: ${error}`)
    throw error
  }
}

// Get latest listings
export async function getLatestListings(limit = 100, start = 1, convert = "USD") {
  return fetchCMC("/v1/cryptocurrency/listings/latest", {
    limit: limit.toString(),
    start: start.toString(),
    convert,
  })
}

// Get trending coins
export async function getTrending(limit = 20, convert = "USD", time_period = "24h") {
  return fetchCMC("/v1/cryptocurrency/trending/latest", {
    limit: limit.toString(),
    convert,
    time_period,
  })
}

// Get gainers and losers
export async function getGainersLosers(limit = 20, convert = "USD", time_period = "24h") {
  return fetchCMC("/v1/cryptocurrency/trending/gainers-losers", {
    limit: limit.toString(),
    convert,
    time_period,
  })
}

// Get airdrops
export async function getAirdrops(start = 1, limit = 100, status = "ONGOING") {
  return fetchCMC("/v1/cryptocurrency/airdrops", {
    start: start.toString(),
    limit: limit.toString(),
    status,
  })
}

// Get airdrop details
export async function getAirdropDetails(id: string) {
  return fetchCMC("/v1/cryptocurrency/airdrop", {
    id,
  })
}

// Get DEX listings
export async function getDexListings(start = 1, limit = 100, sort = "volume_24h", sort_dir = "desc") {
  return fetchCMC("/v4/dex/listings/quotes", {
    start: start.toString(),
    limit: limit.toString(),
    sort,
    sort_dir,
  })
}

// Get networks list
export async function getNetworksList(start = 1, limit = 100, sort = "id", sort_dir = "desc") {
  return fetchCMC("/v4/dex/networks/list", {
    start: start.toString(),
    limit: limit.toString(),
    sort,
    sort_dir,
  })
}

