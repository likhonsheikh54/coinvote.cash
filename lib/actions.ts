"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import {
  getCoins as getCoinGeckoCoins,
  getCoinDetail,
  getTrendingCoins,
  getGlobalData,
  getNewCoins,
  getNFTs,
  getNFTDetail,
  getTopGainersLosers,
} from "./coingecko-api"

// Store votes in cookies for demo purposes
// In a real app, this would use a database
export async function voteCoin(coinId: string) {
  try {
    const cookieStore = cookies()
    const existingVotes = cookieStore.get("coin_votes")

    let votesMap: Record<string, number> = {}

    if (existingVotes) {
      votesMap = JSON.parse(existingVotes.value)
    }

    // Increment vote count
    votesMap[coinId] = (votesMap[coinId] || 0) + 1

    // Store updated votes in cookie
    cookieStore.set("coin_votes", JSON.stringify(votesMap), {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    })

    // Revalidate the home page to show updated vote counts
    revalidatePath("/")

    return { success: true, message: "Vote recorded successfully" }
  } catch (error) {
    console.error("Error voting for coin:", error)
    return { success: false, message: "Failed to record vote" }
  }
}

export async function getTopCoins(page = 1, perPage = 50) {
  try {
    // Get coins from CoinGecko
    const coins = await getCoinGeckoCoins(page, perPage)

    // Get votes from cookies
    const cookieStore = cookies()
    const existingVotes = cookieStore.get("coin_votes")
    let votesMap: Record<string, number> = {}

    if (existingVotes) {
      votesMap = JSON.parse(existingVotes.value)
    }

    // Add votes to coin data
    const coinsWithVotes = coins.map((coin) => ({
      ...coin,
      votes: votesMap[coin.id] || 0,
    }))

    return {
      success: true,
      data: coinsWithVotes,
    }
  } catch (error) {
    console.error("Error fetching coins:", error)
    return { success: false, message: "Failed to fetch coins", data: [] }
  }
}

// Export the getCoins function that was missing
export async function getCoins() {
  try {
    // Mock data for demo purposes
    const coins = [
      {
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "BTC",
        price: 61000,
        change: 2.5,
        marketCap: 1170000000000,
        launchDate: "2009-01-03T00:00:00Z",
        votes: 1245,
      },
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        price: 3000,
        change: 1.8,
        marketCap: 360000000000,
        launchDate: "2015-07-30T00:00:00Z",
        votes: 982,
      },
      {
        id: "solana",
        name: "Solana",
        symbol: "SOL",
        price: 100,
        change: 5.2,
        marketCap: 42000000000,
        launchDate: "2020-03-16T00:00:00Z",
        votes: 756,
      },
      {
        id: "cardano",
        name: "Cardano",
        symbol: "ADA",
        price: 0.5,
        change: -1.2,
        marketCap: 17000000000,
        launchDate: "2017-09-29T00:00:00Z",
        votes: 543,
      },
      {
        id: "binancecoin",
        name: "Binance Coin",
        symbol: "BNB",
        price: 450,
        change: 0.8,
        marketCap: 69000000000,
        launchDate: "2017-07-08T00:00:00Z",
        votes: 421,
      },
    ]

    return {
      success: true,
      data: coins,
    }
  } catch (error) {
    console.error("Error fetching coins:", error)
    return { success: false, message: "Failed to fetch coins", data: [] }
  }
}

export async function getTrendingCoinsList() {
  try {
    // Get trending coins from CoinGecko
    const trending = await getTrendingCoins()

    // Get votes from cookies
    const cookieStore = cookies()
    const existingVotes = cookieStore.get("coin_votes")
    let votesMap: Record<string, number> = {}

    if (existingVotes) {
      votesMap = JSON.parse(existingVotes.value)
    }

    // Add votes to trending coin data
    const trendingWithVotes = trending.coins.map(({ item }) => ({
      id: item.id,
      name: item.name,
      symbol: item.symbol,
      image: item.small,
      market_cap_rank: item.market_cap_rank,
      price_btc: item.price_btc,
      votes: votesMap[item.id] || 0,
    }))

    return {
      success: true,
      data: trendingWithVotes,
    }
  } catch (error) {
    console.error("Error fetching trending coins:", error)
    return { success: false, message: "Failed to fetch trending coins", data: [] }
  }
}

export async function getCoinDetails(id: string) {
  try {
    // Get coin details from CoinGecko
    const coinDetails = await getCoinDetail(id)

    // Get votes from cookies
    const cookieStore = cookies()
    const existingVotes = cookieStore.get("coin_votes")
    let votesMap: Record<string, number> = {}

    if (existingVotes) {
      votesMap = JSON.parse(existingVotes.value)
    }

    // Add votes to coin details
    const coinWithVotes = {
      ...coinDetails,
      votes: votesMap[coinDetails.id] || 0,
    }

    return {
      success: true,
      data: coinWithVotes,
    }
  } catch (error) {
    console.error(`Error fetching details for coin ${id}:`, error)
    return { success: false, message: "Failed to fetch coin details", data: null }
  }
}

export async function getMarketOverview() {
  try {
    // Get global data from CoinGecko
    const globalData = await getGlobalData()

    return {
      success: true,
      data: globalData.data,
    }
  } catch (error) {
    console.error("Error fetching market overview:", error)
    return { success: false, message: "Failed to fetch market overview", data: null }
  }
}

export async function getNewlyListedCoins() {
  try {
    // Get new coins from CoinGecko
    const newCoins = await getNewCoins()

    // Get detailed data for these coins
    const coinIds = newCoins.slice(0, 20).map((coin) => coin.id)
    const detailedCoins = await getCoinGeckoCoins(1, 100, "usd")

    // Filter to only include the new coins
    const filteredCoins = detailedCoins.filter((coin) => coinIds.includes(coin.id))

    // Get votes from cookies
    const cookieStore = cookies()
    const existingVotes = cookieStore.get("coin_votes")
    let votesMap: Record<string, number> = {}

    if (existingVotes) {
      votesMap = JSON.parse(existingVotes.value)
    }

    // Add votes to coin data
    const coinsWithVotes = filteredCoins.map((coin) => ({
      ...coin,
      votes: votesMap[coin.id] || 0,
    }))

    return {
      success: true,
      data: coinsWithVotes,
    }
  } catch (error) {
    console.error("Error fetching newly listed coins:", error)
    return { success: false, message: "Failed to fetch newly listed coins", data: [] }
  }
}

export async function getTopNFTs(page = 1, perPage = 20) {
  try {
    // Get NFTs from CoinGecko
    const nfts = await getNFTs(page, perPage)

    return {
      success: true,
      data: nfts,
    }
  } catch (error) {
    console.error("Error fetching NFTs:", error)
    return { success: false, message: "Failed to fetch NFTs", data: [] }
  }
}

export async function getNFTDetails(id: string) {
  try {
    // Get NFT details from CoinGecko
    const nftDetails = await getNFTDetail(id)

    return {
      success: true,
      data: nftDetails,
    }
  } catch (error) {
    console.error(`Error fetching details for NFT ${id}:`, error)
    return { success: false, message: "Failed to fetch NFT details", data: null }
  }
}

export async function getGainersLosers() {
  try {
    // Get top gainers and losers from CoinGecko
    const gainersLosers = await getTopGainersLosers()

    return {
      success: true,
      data: gainersLosers,
    }
  } catch (error) {
    console.error("Error fetching gainers and losers:", error)
    return { success: false, message: "Failed to fetch gainers and losers", data: null }
  }
}

// Export the voteForToken function that was missing
export const voteForToken = voteCoin

