"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { getLatestListings, getGainersLosers, getTrending, getMemeCoins } from "./coinmarketcap-api"
import { getTrendingTokens, getTokenDetails } from "./pumpfun-api"
import { getTopCoins as getTopCoinsFromActions } from "./actions"

// Re-export getTopCoins from actions.ts
export const getTopCoins = getTopCoinsFromActions

// Get CoinMarketCap latest listings
export async function getCMCLatestListings(limit = 100, start = 1) {
  try {
    const result = await getLatestListings(limit, start)

    return {
      success: true,
      data: result.data,
    }
  } catch (error) {
    console.error("Error fetching CMC listings:", error)
    return { success: false, message: "Failed to fetch listings", data: [] }
  }
}

// Get CoinMarketCap gainers and losers
export async function getCMCGainersLosers(limit = 20) {
  try {
    const result = await getGainersLosers(limit)

    return {
      success: true,
      data: result.data,
    }
  } catch (error) {
    console.error("Error fetching gainers and losers:", error)
    return { success: false, message: "Failed to fetch gainers and losers", data: { top_gainers: [], top_losers: [] } }
  }
}

// Get CoinMarketCap trending coins
export async function getCMCTrending(limit = 20) {
  try {
    const result = await getTrending(limit)

    return {
      success: true,
      data: result.data,
    }
  } catch (error) {
    console.error("Error fetching trending coins:", error)
    return { success: false, message: "Failed to fetch trending coins", data: [] }
  }
}

// Get CoinMarketCap meme coins
export async function getCMCMemeCoins(limit = 50) {
  try {
    const result = await getMemeCoins(limit)

    return {
      success: true,
      data: result.data[0]?.coins || [],
    }
  } catch (error) {
    console.error("Error fetching meme coins:", error)
    return { success: false, message: "Failed to fetch meme coins", data: [] }
  }
}

// Get pump.fun trending tokens
export async function getPumpFunTrending() {
  try {
    const result = await getTrendingTokens()

    return {
      success: true,
      data: result.tokens,
    }
  } catch (error) {
    console.error("Error fetching pump.fun trending tokens:", error)
    return { success: false, message: "Failed to fetch pump.fun trending tokens", data: [] }
  }
}

// Get pump.fun token details
export async function getPumpFunTokenDetails(id: string) {
  try {
    const result = await getTokenDetails(id)

    return {
      success: true,
      data: result,
    }
  } catch (error) {
    console.error(`Error fetching pump.fun token details for ${id}:`, error)
    return { success: false, message: "Failed to fetch pump.fun token details", data: null }
  }
}

// Vote for a token (community votes)
export async function voteForToken(tokenId: string, source: "cmc" | "coingecko" | "pumpfun") {
  try {
    const cookieStore = cookies()
    const cookieName = `${source}_votes`
    const existingVotes = cookieStore.get(cookieName)

    let votesMap: Record<string, number> = {}

    if (existingVotes) {
      votesMap = JSON.parse(existingVotes.value)
    }

    // Increment vote count
    votesMap[tokenId] = (votesMap[tokenId] || 0) + 1

    // Store updated votes in cookie
    cookieStore.set(cookieName, JSON.stringify(votesMap), {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    })

    // Revalidate relevant paths
    revalidatePath("/meme-explorer")
    revalidatePath("/pump-fun")
    revalidatePath("/gainers-losers")
    revalidatePath("/community-votes")

    return { success: true, message: "Vote recorded successfully" }
  } catch (error) {
    console.error("Error voting for token:", error)
    return { success: false, message: "Failed to record vote" }
  }
}

// Get community votes for a specific source
export async function getCommunityVotes(source: "cmc" | "coingecko" | "pumpfun") {
  try {
    const cookieStore = cookies()
    const cookieName = `${source}_votes`
    const existingVotes = cookieStore.get(cookieName)

    let votesMap: Record<string, number> = {}

    if (existingVotes) {
      votesMap = JSON.parse(existingVotes.value)
    }

    return {
      success: true,
      data: votesMap,
    }
  } catch (error) {
    console.error("Error getting community votes:", error)
    return { success: false, message: "Failed to get community votes", data: {} }
  }
}

