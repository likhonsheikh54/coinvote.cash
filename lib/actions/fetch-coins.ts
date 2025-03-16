"use server"

import { neon } from "@neondatabase/serverless"
import { Redis } from "@upstash/redis"
import { createRedisClient } from '@/lib/redis-upstash'
import { getLatestListings, getTrending } from "@/lib/api/coinmarketcap"
import { revalidatePath } from "next/cache"

const dbClient = neon(process.env.DATABASE_URL!)
const redis = createRedisClient()

// Fetch and store new coins from CoinMarketCap
export async function fetchAndStoreCoins() {
  try {
    // Get latest listings from CoinMarketCap
    const result = await getLatestListings(100)

    if (!result || !result.data) {
      return { success: false, message: "Failed to fetch coins from CoinMarketCap" }
    }

    const coins = result.data

    // Process each coin
    for (const coin of coins) {
      // Check if coin already exists
      const existingCoin = await dbClient`
        SELECT id FROM coins WHERE id = ${coin.slug}
      `

      if (existingCoin.length === 0) {
        // Insert new coin
        await dbClient`
          INSERT INTO coins (
            id, name, symbol, logo, market_cap, price, change_24h, is_verified, is_promoted
          )
          VALUES (
            ${coin.slug}, 
            ${coin.name}, 
            ${coin.symbol}, 
            ${"https://s2.coinmarketcap.com/static/img/coins/64x64/" + coin.id + ".png"}, 
            ${coin.quote.USD.market_cap || 0}, 
            ${coin.quote.USD.price || 0}, 
            ${coin.quote.USD.percent_change_24h || 0}, 
            ${false}, 
            ${false}
          )
        `
      } else {
        // Update existing coin
        await dbClient`
          UPDATE coins
          SET 
            name = ${coin.name},
            symbol = ${coin.symbol},
            logo = ${"https://s2.coinmarketcap.com/static/img/coins/64x64/" + coin.id + ".png"},
            market_cap = ${coin.quote.USD.market_cap || 0},
            price = ${coin.quote.USD.price || 0},
            change_24h = ${coin.quote.USD.percent_change_24h || 0},
            updated_at = CURRENT_TIMESTAMP
          WHERE id = ${coin.slug}
        `
      }
    }

    // Clear cache
    await redis.del("top_coins_1_10")

    // Revalidate paths
    revalidatePath("/")
    revalidatePath("/coins")

    return { success: true, message: "Coins fetched and stored successfully" }
  } catch (error) {
    console.error("Error fetching and storing coins:", error)
    return { success: false, error, message: "Error fetching and storing coins" }
  }
}

// Fetch and store trending coins
export async function fetchAndStoreTrendingCoins() {
  try {
    // Get trending coins from CoinMarketCap
    const result = await getTrending(20)

    if (!result || !result.data) {
      return { success: false, message: "Failed to fetch trending coins from CoinMarketCap" }
    }

    const trendingCoins = result.data

    // Clear existing trending coins
    await dbClient`
      DELETE FROM trending_coins
    `

    // Process each trending coin
    for (const [index, coin] of trendingCoins.entries()) {
      // Check if coin exists in coins table
      const existingCoin = await dbClient`
        SELECT id FROM coins WHERE id = ${coin.slug}
      `

      if (existingCoin.length === 0) {
        // Insert new coin
        await dbClient`
          INSERT INTO coins (
            id, name, symbol, logo, market_cap, price, change_24h, is_verified, is_promoted
          )
          VALUES (
            ${coin.slug}, 
            ${coin.name}, 
            ${coin.symbol}, 
            ${"https://s2.coinmarketcap.com/static/img/coins/64x64/" + coin.id + ".png"}, 
            ${coin.quote.USD.market_cap || 0}, 
            ${coin.quote.USD.price || 0}, 
            ${coin.quote.USD.percent_change_24h || 0}, 
            ${false}, 
            ${false}
          )
        `
      }

      // Insert into trending_coins
      await dbClient`
        INSERT INTO trending_coins (coin_id, trend_score)
        VALUES (${coin.slug}, ${100 - index})
      `
    }

    // Clear cache
    await redis.del("trending_coins_5")

    // Revalidate paths
    revalidatePath("/")

    return { success: true, message: "Trending coins fetched and stored successfully" }
  } catch (error) {
    console.error("Error fetching and storing trending coins:", error)
    return { success: false, error, message: "Error fetching and storing trending coins" }
  }
}

