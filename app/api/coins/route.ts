import { NextResponse } from "next/server"

// Mock data for the API
const coins = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    logo: "/placeholder.svg?height=24&width=24",
    chain: "BTC",
    price: 61000,
    change: 2.5,
    marketCap: 1170000000000,
    age: "70 days",
    votes: 1245,
  },
  {
    id: 2,
    name: "Ethereum",
    symbol: "ETH",
    logo: "/placeholder.svg?height=24&width=24",
    chain: "ETH",
    price: 3000,
    change: 1.8,
    marketCap: 360000000000,
    age: "90 days",
    votes: 982,
  },
  // More coins would be here in a real application
]

export async function GET() {
  // In a real application, this would fetch from a database
  return NextResponse.json(coins)
}

export async function POST(request: Request) {
  try {
    const { coinId } = await request.json()

    // In a real application, this would update a database
    // For now, we'll just return a success message
    return NextResponse.json({
      success: true,
      message: `Vote for coin ${coinId} recorded successfully`,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to process vote" }, { status: 400 })
  }
}

