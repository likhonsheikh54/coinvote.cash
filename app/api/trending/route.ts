import { NextResponse } from "next/server"

// Mock data for trending coins
const trendingCoins = [
  {
    id: 1,
    name: "PEPE",
    symbol: "PEPE",
    logo: "/placeholder.svg?height=24&width=24",
    change: 4.5,
    votes: 3421,
  },
  {
    id: 2,
    name: "Shiba Inu",
    symbol: "SHIB",
    logo: "/placeholder.svg?height=24&width=24",
    change: 2.8,
    votes: 2876,
  },
  {
    id: 3,
    name: "Dogecoin",
    symbol: "DOGE",
    logo: "/placeholder.svg?height=24&width=24",
    change: -1.2,
    votes: 2145,
  },
  // More trending coins would be here in a real application
]

export async function GET() {
  // In a real application, this would fetch from a database
  // and sort by recent vote count or other trending metrics
  return NextResponse.json(trendingCoins)
}

