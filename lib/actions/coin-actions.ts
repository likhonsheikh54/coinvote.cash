"use server"

import { neon } from "@neondatabase/serverless"
import { revalidatePath } from "next/cache"
import { getUserSession } from "./user-actions"
import { Redis } from "@upstash/redis"
import { createRedisClient } from '@/lib/redis-upstash'

const dbClient = neon(process.env.DATABASE_URL!)
const redis = createRedisClient()

// Get top coins with pagination
export async function getTopCoins(page = 1, perPage = 10) {
  try {
    // Check if data is in Redis cache
    const cacheKey = `top_coins_${page}_${perPage}`
    const cachedData = await redis.get(cacheKey)

    if (cachedData) {
      return { success: true, data: cachedData }
    }

    // If not in cache, fetch from database
    const offset = (page - 1) * perPage

    const coins = await dbClient`
      SELECT c.*, COUNT(v.id) as votes_count
      FROM coins c
      LEFT JOIN votes v ON c.id = v.coin_id
      GROUP BY c.id
      ORDER BY votes_count DESC, c.created_at DESC
      LIMIT ${perPage} OFFSET ${offset}
    `

    // Cache the result for 5 minutes
    await redis.set(cacheKey, coins, { ex: 300 })

    return { success: true, data: coins }
  } catch (error) {
    console.error("Error fetching top coins:", error)
    return { success: false, error, data: [] }
  }
}

// Get trending coins
export async function getTrendingCoins(limit = 5) {
  try {
    // Check if data is in Redis cache
    const cacheKey = `trending_coins_${limit}`
    const cachedData = await redis.get(cacheKey)

    if (cachedData) {
      return { success: true, data: cachedData }
    }

    // If not in cache, fetch from database
    const trendingCoins = await dbClient`
      SELECT c.*, tc.trend_score, COUNT(v.id) as votes_count
      FROM trending_coins tc
      JOIN coins c ON tc.coin_id = c.id
      LEFT JOIN votes v ON c.id = v.coin_id
      GROUP BY c.id, tc.trend_score
      ORDER BY tc.trend_score DESC, votes_count DESC
      LIMIT ${limit}
    `

    // Cache the result for 5 minutes
    await redis.set(cacheKey, trendingCoins, { ex: 300 })

    return { success: true, data: trendingCoins }
  } catch (error) {
    console.error("Error fetching trending coins:", error)
    return { success: false, error, data: [] }
  }
}

// Get promoted coins
export async function getPromotedCoins(limit = 5) {
  try {
    // Check if data is in Redis cache
    const cacheKey = `promoted_coins_${limit}`
    const cachedData = await redis.get(cacheKey)

    if (cachedData) {
      return { success: true, data: cachedData }
    }

    // If not in cache, fetch from database
    const promotedCoins = await dbClient`
      SELECT c.*, COUNT(v.id) as votes_count
      FROM promoted_coins pc
      JOIN coins c ON pc.coin_id = c.id
      LEFT JOIN votes v ON c.id = v.coin_id
      WHERE pc.end_date > CURRENT_TIMESTAMP
      GROUP BY c.id, pc.position
      ORDER BY pc.position ASC, votes_count DESC
      LIMIT ${limit}
    `

    // Cache the result for 5 minutes
    await redis.set(cacheKey, promotedCoins, { ex: 300 })

    return { success: true, data: promotedCoins }
  } catch (error) {
    console.error("Error fetching promoted coins:", error)
    return { success: false, error, data: [] }
  }
}

// Vote for a coin
export async function voteCoin(coinId: string) {
  try {
    const session = await getUserSession()
    const userId = session.success ? session.session.uid : null

    // Get client IP address (simplified)
    const ipAddress = "127.0.0.1" // In production, get the actual IP

    // Check if the user or IP has already voted for this coin today
    const existingVote = await dbClient`
      SELECT * FROM votes
      WHERE coin_id = ${coinId}
      AND (user_id = ${userId} OR ip_address = ${ipAddress})
      AND DATE(created_at) = CURRENT_DATE
    `

    if (existingVote.length > 0) {
      return { success: false, error: "Already voted for this coin today" }
    }

    // Create a new vote
    await dbClient`
      INSERT INTO votes (coin_id, user_id, ip_address)
      VALUES (${coinId}, ${userId}, ${ipAddress})
    `

    // Update coin votes count
    await dbClient`
      UPDATE coins
      SET votes_count = votes_count + 1
      WHERE id = ${coinId}
    `

    // Invalidate cache
    await redis.del("top_coins_1_10")
    await redis.del("trending_coins_5")

    // Revalidate paths
    revalidatePath("/")
    revalidatePath("/coins")
    revalidatePath(`/coins/${coinId}`)

    return { success: true }
  } catch (error) {
    console.error("Error voting for coin:", error)
    return { success: false, error }
  }
}

// Get coin details by ID
export async function getCoinById(coinId: string) {
  try {
    // Check if data is in Redis cache
    const cacheKey = `coin_${coinId}`
    const cachedData = await redis.get(cacheKey)

    if (cachedData) {
      return { success: true, data: cachedData }
    }

    // If not in cache, fetch from database
    const coin = await dbClient`
      SELECT c.*, COUNT(v.id) as votes_count
      FROM coins c
      LEFT JOIN votes v ON c.id = v.coin_id
      WHERE c.id = ${coinId}
      GROUP BY c.id
    `

    if (coin.length === 0) {
      return { success: false, error: "Coin not found" }
    }

    // Cache the result for 5 minutes
    await redis.set(cacheKey, coin[0], { ex: 300 })

    return { success: true, data: coin[0] }
  } catch (error) {
    console.error("Error fetching coin details:", error)
    return { success: false, error }
  }
}

// Add a new coin (for admin or authenticated users)
export async function addCoin(coinData: any) {
  try {
    const session = await getUserSession()

    if (!session.success) {
      return { success: false, error: "Authentication required" }
    }

    const coinId = coinData.id || coinData.symbol.toLowerCase()

    // Check if coin already exists
    const existingCoin = await dbClient`
      SELECT * FROM coins WHERE id = ${coinId} OR (symbol = ${coinData.symbol} AND name = ${coinData.name})
    `

    if (existingCoin.length > 0) {
      return { success: false, error: "Coin already exists" }
    }

    // Insert the new coin
    await dbClient`
      INSERT INTO coins (
        id, name, symbol, logo, description, website, twitter, telegram, github,
        contract_address, chain, market_cap, price, change_24h, is_promoted, is_verified
      )
      VALUES (
        ${coinId}, ${coinData.name}, ${coinData.symbol}, ${coinData.logo}, ${coinData.description},
        ${coinData.website}, ${coinData.twitter}, ${coinData.telegram}, ${coinData.github},
        ${coinData.contract_address}, ${coinData.chain}, ${coinData.market_cap || 0},
        ${coinData.price || 0}, ${coinData.change_24h || 0}, ${coinData.is_promoted || false},
        ${coinData.is_verified || false}
      )
    `

    // Invalidate cache
    await redis.del("top_coins_1_10")

    // Revalidate paths
    revalidatePath("/")
    revalidatePath("/coins")

    return { success: true }
  } catch (error) {
    console.error("Error adding coin:", error)
    return { success: false, error }
  }
}

