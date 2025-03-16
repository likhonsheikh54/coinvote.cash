"use server"
import {
  getLatestTokenProfiles,
  getLatestBoostedTokens,
  getTopBoostedTokens,
  searchPairs,
  getTokenPools,
  getPairsByTokenAddresses,
} from "./dexscreener-api"

// Get latest token profiles
export async function getLatestProfiles() {
  try {
    const profiles = await getLatestTokenProfiles()

    return {
      success: true,
      data: profiles,
    }
  } catch (error) {
    console.error("Error fetching latest token profiles:", error)
    return { success: false, message: "Failed to fetch token profiles", data: [] }
  }
}

// Get latest boosted tokens
export async function getLatestBoosts() {
  try {
    const boostedTokens = await getLatestBoostedTokens()

    return {
      success: true,
      data: boostedTokens,
    }
  } catch (error) {
    console.error("Error fetching latest boosted tokens:", error)
    return { success: false, message: "Failed to fetch boosted tokens", data: [] }
  }
}

// Get top boosted tokens
export async function getTopBoosts() {
  try {
    const topTokens = await getTopBoostedTokens()

    return {
      success: true,
      data: topTokens,
    }
  } catch (error) {
    console.error("Error fetching top boosted tokens:", error)
    return { success: false, message: "Failed to fetch top boosted tokens", data: [] }
  }
}

// Search for pairs
export async function searchForPairs(query: string) {
  try {
    const results = await searchPairs(query)

    return {
      success: true,
      data: results.pairs,
    }
  } catch (error) {
    console.error("Error searching for pairs:", error)
    return { success: false, message: "Failed to search for pairs", data: [] }
  }
}

// Get token pools
export async function getTokenPoolsData(chainId: string, tokenAddress: string) {
  try {
    const pools = await getTokenPools(chainId, tokenAddress)

    return {
      success: true,
      data: pools,
    }
  } catch (error) {
    console.error("Error fetching token pools:", error)
    return { success: false, message: "Failed to fetch token pools", data: [] }
  }
}

// Get pairs by token addresses
export async function getPairsByTokens(chainId: string, tokenAddresses: string[]) {
  try {
    const pairs = await getPairsByTokenAddresses(chainId, tokenAddresses)

    return {
      success: true,
      data: pairs,
    }
  } catch (error) {
    console.error("Error fetching pairs by token addresses:", error)
    return { success: false, message: "Failed to fetch pairs", data: [] }
  }
}

// Get trending pairs across multiple chains
export async function getTrendingPairs() {
  try {
    // Search for trending pairs across popular chains
    const chains = ["ethereum", "bsc", "arbitrum", "base", "solana"]
    const queries = ["USDC", "ETH", "BTC", "SOL"]

    const results = await Promise.all(
      queries.map(async (query) => {
        const result = await searchPairs(query)
        return result.pairs
      }),
    )

    // Flatten and filter results
    const allPairs = results.flat()

    // Sort by liquidity
    const sortedPairs = allPairs
      .filter((pair) => pair.liquidity?.usd > 10000) // Only pairs with at least $10k liquidity
      .sort((a, b) => (b.liquidity?.usd || 0) - (a.liquidity?.usd || 0))
      .slice(0, 20) // Get top 20

    return {
      success: true,
      data: sortedPairs,
    }
  } catch (error) {
    console.error("Error fetching trending pairs:", error)
    return { success: false, message: "Failed to fetch trending pairs", data: [] }
  }
}

// Get hot pairs (high volume in last 24h)
export async function getHotPairs() {
  try {
    // Search for hot pairs across popular chains
    const chains = ["ethereum", "bsc", "arbitrum", "base", "solana"]
    const queries = ["USDC", "ETH", "BTC", "SOL"]

    const results = await Promise.all(
      queries.map(async (query) => {
        const result = await searchPairs(query)
        return result.pairs
      }),
    )

    // Flatten and filter results
    const allPairs = results.flat()

    // Sort by 24h volume
    const sortedPairs = allPairs
      .filter((pair) => pair.volume?.h24 > 10000) // Only pairs with at least $10k 24h volume
      .sort((a, b) => (b.volume?.h24 || 0) - (a.volume?.h24 || 0))
      .slice(0, 20) // Get top 20

    return {
      success: true,
      data: sortedPairs,
    }
  } catch (error) {
    console.error("Error fetching hot pairs:", error)
    return { success: false, message: "Failed to fetch hot pairs", data: [] }
  }
}

