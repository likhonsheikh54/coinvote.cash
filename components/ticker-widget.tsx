"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { getTopCoins } from "@/lib/actions"
import { getColorForChange } from "@/lib/coingecko-api"

interface Coin {
  id: string
  name: string
  symbol: string
  image: string
  current_price: number
  price_change_percentage_24h: number
}

export default function TickerWidget() {
  const [coins, setCoins] = useState<Coin[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchCoins() {
      try {
        setLoading(true)
        setError(null)
        const result = await getTopCoins(20)
        if (result.success) {
          // Filter out any coins with missing data to prevent rendering errors
          const validCoins = result.data.filter(
            (coin) =>
              coin &&
              coin.id &&
              coin.name &&
              coin.symbol &&
              typeof coin.current_price !== "undefined" &&
              typeof coin.price_change_percentage_24h !== "undefined",
          )
          setCoins(validCoins)
        } else {
          setError("Failed to fetch coins")
          console.error("Failed to fetch coins:", result.message)
        }
      } catch (err) {
        setError("An error occurred while fetching data")
        console.error("Error in fetchCoins:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchCoins()

    // Refresh every 60 seconds
    const interval = setInterval(fetchCoins, 60000)
    return () => clearInterval(interval)
  }, [])

  // Ticker animation
  useEffect(() => {
    if (!scrollRef.current || coins.length === 0) return

    const scrollWidth = scrollRef.current.scrollWidth
    const clientWidth = scrollRef.current.clientWidth

    if (scrollWidth <= clientWidth) return

    let position = 0
    const speed = 0.5 // pixels per frame

    const animate = () => {
      if (!scrollRef.current) return

      position -= speed

      // Reset position when all items have scrolled
      if (position < -scrollWidth / 2) {
        position = 0
      }

      scrollRef.current.style.transform = `translateX(${position}px)`
      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [coins])

  if (loading) {
    return (
      <div className="bg-[#0D1217] h-12 border-b border-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-[#FFDD33]"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-[#0D1217] h-12 border-b border-gray-800 flex items-center justify-center text-red-400 text-sm">
        {error}
      </div>
    )
  }

  if (coins.length === 0) {
    return (
      <div className="bg-[#0D1217] h-12 border-b border-gray-800 flex items-center justify-center text-gray-400 text-sm">
        No coin data available
      </div>
    )
  }

  return (
    <div className="bg-[#0D1217] h-12 border-b border-gray-800 overflow-hidden">
      <div className="h-full flex items-center" ref={scrollRef}>
        {/* Duplicate items for seamless scrolling */}
        {[...coins, ...coins].map((coin, index) => (
          <Link
            key={`${coin.id}-${index}`}
            href={`/coins/${coin.id}`}
            className="flex items-center px-4 whitespace-nowrap hover:bg-gray-800/30"
          >
            <Image
              src={coin.image || "/placeholder.svg"}
              alt={coin.name}
              width={20}
              height={20}
              className="rounded-full mr-2"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=20&width=20"
              }}
            />
            <span className="font-medium mr-1">{coin.symbol.toUpperCase()}</span>
            <span className="text-gray-400 mr-2">
              $
              {(coin.current_price || 0).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: (coin.current_price || 0) < 1 ? 6 : 2,
              })}
            </span>
            <span className={`${getColorForChange(coin.price_change_percentage_24h || 0)}`}>
              {(coin.price_change_percentage_24h || 0) >= 0 ? "+" : ""}
              {(coin.price_change_percentage_24h || 0).toFixed(2)}%
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

