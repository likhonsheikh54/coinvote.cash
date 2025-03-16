// CoinGecko API integration
const COINGECKO_API_URL = "https://api.coingecko.com/api/v3"
const COINGECKO_API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY || ""

// Helper function to make API requests
async function fetchCoinGecko<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  try {
    const url = new URL(`${COINGECKO_API_URL}${endpoint}`)

    // Add parameters to URL
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value)
    })

    const response = await fetch(url.toString(), {
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": COINGECKO_API_KEY,
      },
    })

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status} ${response.statusText}`)
    }

    return (await response.json()) as T
  } catch (error) {
    console.error(`Error fetching from CoinGecko API: ${error}`)
    throw error
  }
}

// Helper functions for formatting
export const formatNumber = (num: number): string => {
  if (num >= 1000000000) {
    return `$${(num / 1000000000).toFixed(2)}B`
  } else if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(2)}M`
  } else if (num >= 1000) {
    return `$${(num / 1000).toFixed(2)}K`
  } else {
    return `$${num.toFixed(2)}`
  }
}

export const getColorForChange = (change: number): string => {
  return change >= 0 ? "text-[#4BCC00]" : "text-red-500"
}

// Get coins list with market data
export const getCoins = async (page = 1, perPage = 100, vsCurrency = "usd") => {
  try {
    const response = await fetchCoinGecko<any[]>("/coins/markets", {
      vs_currency: vsCurrency,
      per_page: perPage.toString(),
      page: page.toString(),
      sparkline: "false",
      price_change_percentage: "24h",
    })
    return response
  } catch (error) {
    console.error("Error fetching coins:", error)
    return []
  }
}

// Get detailed information for a specific coin
export const getCoinDetail = async (id: string) => {
  try {
    const response = await fetchCoinGecko<any>(`/coins/${id}`, {
      localization: "false",
      tickers: "false",
      market_data: "true",
      community_data: "true",
      developer_data: "true",
    })
    return response
  } catch (error) {
    console.error(`Error fetching details for coin ${id}:`, error)
    return null
  }
}

// Get trending coins
export const getTrendingCoins = async () => {
  try {
    const response = await fetchCoinGecko<any>("/search/trending")
    return response
  } catch (error) {
    console.error("Error fetching trending coins:", error)
    return { coins: [] }
  }
}

// Get global market data
export const getGlobalData = async () => {
  try {
    const response = await fetchCoinGecko<any>("/global")
    return { data: response }
  } catch (error) {
    console.error("Error fetching global data:", error)
    return { data: {} }
  }
}

// Get newly listed coins
export const getNewCoins = async () => {
  try {
    const response = await fetchCoinGecko<any[]>("/coins/list/new")
    return response
  } catch (error) {
    console.error("Error fetching new coins:", error)
    return []
  }
}

// Get NFT collections
export const getNFTs = async (page = 1, perPage = 20) => {
  try {
    const response = await fetchCoinGecko<any[]>("/nfts/list", {
      per_page: perPage.toString(),
      page: page.toString(),
    })
    return response
  } catch (error) {
    console.error("Error fetching NFTs:", error)
    return []
  }
}

// Get NFT collection details
export const getNFTDetail = async (id: string) => {
  try {
    const response = await fetchCoinGecko<any>(`/nfts/${id}`)
    return response
  } catch (error) {
    console.error(`Error fetching NFT detail for ${id}:`, error)
    return {}
  }
}

// Get top gainers and losers
export const getTopGainersLosers = async () => {
  try {
    // Fetch a larger set of coins to find gainers and losers
    const allCoins = await getCoins(1, 250)

    // Sort by price change percentage
    const sortedByGain = [...allCoins].sort(
      (a, b) => (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0),
    )

    const sortedByLoss = [...allCoins].sort(
      (a, b) => (a.price_change_percentage_24h || 0) - (b.price_change_percentage_24h || 0),
    )

    return {
      top_gainers: sortedByGain.slice(0, 20),
      top_losers: sortedByLoss.slice(0, 20),
    }
  } catch (error) {
    console.error("Error fetching gainers and losers:", error)
    return { top_gainers: [], top_losers: [] }
  }
}

// Additional helper functions
export const timeSinceLaunch = (dateString: string): string => {
  const launchDate = new Date(dateString)
  const now = new Date()

  const diffTime = Math.abs(now.getTime() - launchDate.getTime())
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays > 365) {
    const years = Math.floor(diffDays / 365)
    return `${years} ${years === 1 ? "year" : "years"}`
  } else if (diffDays > 30) {
    const months = Math.floor(diffDays / 30)
    return `${months} ${months === 1 ? "month" : "months"}`
  } else {
    return `${diffDays} ${diffDays === 1 ? "day" : "days"}`
  }
}

export const getLogoUrl = (symbol: string): string => {
  return `https://assets.coingecko.com/coins/images/1/small/${symbol.toLowerCase()}.png`
}

