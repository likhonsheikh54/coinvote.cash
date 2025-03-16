// Types for Coinpaprika API responses
export interface CoinpaprikaCoin {
  id: string
  name: string
  symbol: string
  rank: number
  is_new: boolean
  is_active: boolean
  type: string
}

export interface CoinpaprikaPrice {
  id: string
  name: string
  symbol: string
  rank: number
  circulating_supply: number
  total_supply: number
  max_supply: number
  beta_value: number
  first_data_at: string
  last_updated: string
  quotes: {
    USD: {
      price: number
      volume_24h: number
      volume_24h_change_24h: number
      market_cap: number
      market_cap_change_24h: number
      percent_change_15m: number
      percent_change_30m: number
      percent_change_1h: number
      percent_change_6h: number
      percent_change_12h: number
      percent_change_24h: number
      percent_change_7d: number
      percent_change_30d: number
      percent_change_1y: number
      ath_price: number
      ath_date: string
      percent_from_price_ath: number
    }
  }
}

// Function to get all coins
export async function getAllCoins(): Promise<CoinpaprikaCoin[]> {
  try {
    const response = await fetch("https://api.coinpaprika.com/v1/coins")
    if (!response.ok) {
      throw new Error("Failed to fetch coins")
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching all coins:", error)
    return []
  }
}

// Function to get active coins
export async function getActiveCoins(): Promise<CoinpaprikaCoin[]> {
  try {
    const allCoins = await getAllCoins()
    return allCoins.filter((coin) => coin.is_active && !coin.is_new).slice(0, 100)
  } catch (error) {
    console.error("Error fetching active coins:", error)
    return []
  }
}

// Function to get coin details
export async function getCoinDetails(coinId: string): Promise<any> {
  try {
    const response = await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
    if (!response.ok) {
      throw new Error("Failed to fetch coin details")
    }
    return await response.json()
  } catch (error) {
    console.error(`Error fetching details for coin ${coinId}:`, error)
    return null
  }
}

// Function to get coin price data
export async function getCoinPrices(coinIds: string[]): Promise<Record<string, CoinpaprikaPrice>> {
  try {
    const response = await fetch(`https://api.coinpaprika.com/v1/tickers?ids=${coinIds.join(",")}`)
    if (!response.ok) {
      throw new Error("Failed to fetch coin prices")
    }
    const data: CoinpaprikaPrice[] = await response.json()

    // Convert array to object with coin IDs as keys
    const pricesMap: Record<string, CoinpaprikaPrice> = {}
    data.forEach((coin) => {
      pricesMap[coin.id] = coin
    })

    return pricesMap
  } catch (error) {
    console.error("Error fetching coin prices:", error)
    return {}
  }
}

// Function to get logo URL from cryptologos.cc
export function getLogoUrl(symbol: string): string {
  // Convert symbol to lowercase
  const symbolLower = symbol.toLowerCase()

  // Return the URL for the logo
  return `https://cryptologos.cc/logos/${symbolLower}-${symbolLower}-logo.png`
}

// Function to format large numbers
export function formatNumber(num: number): string {
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

// Function to calculate time since launch
export function timeSinceLaunch(dateString: string): string {
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

