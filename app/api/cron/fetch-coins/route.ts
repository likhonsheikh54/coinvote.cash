import { NextResponse } from "next/server"
import { fetchAndStoreCoins, fetchAndStoreTrendingCoins } from "@/lib/actions/fetch-coins"

export async function GET() {
  try {
    // Fetch and store regular coins
    const coinsResult = await fetchAndStoreCoins()

    // Fetch and store trending coins
    const trendingResult = await fetchAndStoreTrendingCoins()

    return NextResponse.json({
      success: true,
      coinsResult,
      trendingResult,
    })
  } catch (error) {
    console.error("Error in cron job:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Error in cron job",
        error,
      },
      { status: 500 },
    )
  }
}

