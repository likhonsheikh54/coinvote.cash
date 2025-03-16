import type React from "react"
import Link from "next/link"
import Image from "next/image"

interface Coin {
  id: string
  name: string
  symbol: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  price_change_percentage_24h: number
}

interface CoinCardProps {
  coin: Coin
}

const CoinCard: React.FC<CoinCardProps> = ({ coin }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col">
      <div className="flex items-center space-x-4 mb-4">
        <Image src={coin.image || "/placeholder.svg"} alt={coin.name} width={32} height={32} className="rounded-full" />
        <div>
          <h3 className="text-lg font-semibold">{coin.name}</h3>
          <p className="text-gray-500 text-sm">{coin.symbol.toUpperCase()}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-700">Price: ${coin.current_price.toLocaleString()}</p>
        <p className="text-gray-700">Market Cap: ${coin.market_cap.toLocaleString()}</p>
        <p className="text-gray-700">Market Cap Rank: {coin.market_cap_rank}</p>
        <p className={`text-${coin.price_change_percentage_24h >= 0 ? "green" : "red"}-500`}>
          24h Change: {coin.price_change_percentage_24h?.toFixed(2)}%
        </p>
      </div>

      <Link href={`/coins/${coin.symbol.toLowerCase()}`} className="text-blue-500 hover:text-blue-700">
        View Details
      </Link>
    </div>
  )
}

export default CoinCard

