// Types for pump.fun API responses
export interface PumpFunToken {
  id: string
  name: string
  symbol: string
  price: number
  marketCap: number
  volume24h: number
  change24h: number
  createdAt: string
  creator: string
  holders: number
  transactions: number
}

export interface PumpFunTrendingResponse {
  tokens: PumpFunToken[]
}

export interface PumpFunTokenResponse {
  token: PumpFunToken
  transactions: {
    hash: string
    type: "buy" | "sell"
    amount: number
    price: number
    timestamp: string
    from: string
  }[]
}

// Since pump.fun doesn't have a public API, we'll mock the data
// In a real implementation, you would use web scraping or an API if available
export const getTrendingTokens = async (): Promise<PumpFunTrendingResponse> => {
  // Mock data based on the screenshot
  return {
    tokens: [
      {
        id: "wizards-of-doge",
        name: "WIZARDS OF DOGE",
        symbol: "WOD",
        price: 0.00012,
        marketCap: 172500,
        volume24h: 45000,
        change24h: 15.2,
        createdAt: new Date().toISOString(),
        creator: "0x123...abc",
        holders: 245,
        transactions: 1200,
      },
      {
        id: "flow",
        name: "flow",
        symbol: "FLOW",
        price: 0.00008,
        marketCap: 2700,
        volume24h: 1200,
        change24h: 5.8,
        createdAt: new Date().toISOString(),
        creator: "0x456...def",
        holders: 89,
        transactions: 350,
      },
      {
        id: "doge-artist",
        name: "Doge Artist",
        symbol: "DART",
        price: 0.00015,
        marketCap: 3500,
        volume24h: 980,
        change24h: -2.3,
        createdAt: new Date().toISOString(),
        creator: "0x789...ghi",
        holders: 120,
        transactions: 450,
      },
      {
        id: "pwease",
        name: "PWEASE",
        symbol: "PWS",
        price: 0.00022,
        marketCap: 4700,
        volume24h: 1500,
        change24h: 8.7,
        createdAt: new Date().toISOString(),
        creator: "0xabc...123",
        holders: 180,
        transactions: 620,
      },
      {
        id: "fat-nigga-season",
        name: "FAT NIGGA SEASON",
        symbol: "FAT",
        price: 0.00018,
        marketCap: 5100,
        volume24h: 2200,
        change24h: 12.4,
        createdAt: new Date().toISOString(),
        creator: "0xdef...456",
        holders: 210,
        transactions: 780,
      },
    ],
  }
}

export const getTokenDetails = async (id: string): Promise<PumpFunTokenResponse> => {
  // Mock data
  const tokens = (await getTrendingTokens()).tokens
  const token = tokens.find((t) => t.id === id) || tokens[0]

  return {
    token,
    transactions: Array(20)
      .fill(0)
      .map((_, i) => ({
        hash: `0x${Math.random().toString(16).substring(2, 10)}...`,
        type: Math.random() > 0.5 ? "buy" : "sell",
        amount: Math.random() * 1000,
        price: token.price * (1 + (Math.random() * 0.1 - 0.05)),
        timestamp: new Date(Date.now() - i * 1000 * 60 * 5).toISOString(),
        from: `0x${Math.random().toString(16).substring(2, 10)}...`,
      })),
  }
}

