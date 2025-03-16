import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getColorForChange } from "@/lib/coinmarketcap-api"

export const metadata: Metadata = {
  title: "Top Traders | Coinvote.xyz",
  description:
    "Discover the top cryptocurrency traders and their performance. Learn from the best and follow their strategies.",
  keywords: ["crypto traders", "top traders", "cryptocurrency trading", "trading performance", "crypto leaderboard"],
}

// Mock data for top traders
const topTraders = [
  {
    id: 1,
    username: "CryptoWhale",
    address: "0x1234...5678",
    avatar: "/placeholder.svg?height=64&width=64",
    profit24h: 12.5,
    profit7d: 45.2,
    profit30d: 128.7,
    totalProfit: 1250000,
    trades: 1245,
    winRate: 68.5,
    favoriteTokens: ["BTC", "ETH", "SOL"],
  },
  {
    id: 2,
    username: "MoonHunter",
    address: "0xabcd...efgh",
    avatar: "/placeholder.svg?height=64&width=64",
    profit24h: 8.3,
    profit7d: 32.1,
    profit30d: 95.4,
    totalProfit: 875000,
    trades: 987,
    winRate: 72.1,
    favoriteTokens: ["ETH", "MATIC", "AVAX"],
  },
  {
    id: 3,
    username: "DiamondHands",
    address: "0x9876...5432",
    avatar: "/placeholder.svg?height=64&width=64",
    profit24h: -2.1,
    profit7d: 18.7,
    profit30d: 65.3,
    totalProfit: 650000,
    trades: 756,
    winRate: 61.8,
    favoriteTokens: ["BTC", "ADA", "DOT"],
  },
  {
    id: 4,
    username: "AlphaCatcher",
    address: "0xijkl...mnop",
    avatar: "/placeholder.svg?height=64&width=64",
    profit24h: 5.7,
    profit7d: 28.9,
    profit30d: 82.1,
    totalProfit: 520000,
    trades: 1102,
    winRate: 65.2,
    favoriteTokens: ["ETH", "LINK", "UNI"],
  },
  {
    id: 5,
    username: "TokenNinja",
    address: "0xqrst...uvwx",
    avatar: "/placeholder.svg?height=64&width=64",
    profit24h: 3.2,
    profit7d: 15.6,
    profit30d: 58.9,
    totalProfit: 480000,
    trades: 892,
    winRate: 59.7,
    favoriteTokens: ["SOL", "AVAX", "FTM"],
  },
  {
    id: 6,
    username: "CryptoSage",
    address: "0x2468...1357",
    avatar: "/placeholder.svg?height=64&width=64",
    profit24h: 7.8,
    profit7d: 22.3,
    profit30d: 71.5,
    totalProfit: 420000,
    trades: 678,
    winRate: 63.4,
    favoriteTokens: ["BTC", "ETH", "BNB"],
  },
  {
    id: 7,
    username: "MemeKing",
    address: "0xyzab...cdef",
    avatar: "/placeholder.svg?height=64&width=64",
    profit24h: 15.2,
    profit7d: 42.8,
    profit30d: 110.6,
    totalProfit: 380000,
    trades: 543,
    winRate: 58.2,
    favoriteTokens: ["DOGE", "SHIB", "PEPE"],
  },
  {
    id: 8,
    username: "DeFiMaster",
    address: "0xghij...klmn",
    avatar: "/placeholder.svg?height=64&width=64",
    profit24h: 4.5,
    profit7d: 19.8,
    profit30d: 62.7,
    totalProfit: 350000,
    trades: 821,
    winRate: 64.9,
    favoriteTokens: ["AAVE", "MKR", "CRV"],
  },
  {
    id: 9,
    username: "NFTCollector",
    address: "0xopqr...stuv",
    avatar: "/placeholder.svg?height=64&width=64",
    profit24h: 6.3,
    profit7d: 24.5,
    profit30d: 78.2,
    totalProfit: 320000,
    trades: 456,
    winRate: 67.3,
    favoriteTokens: ["ETH", "APE", "SAND"],
  },
  {
    id: 10,
    username: "ChartWizard",
    address: "0xwxyz...abcd",
    avatar: "/placeholder.svg?height=64&width=64",
    profit24h: 9.1,
    profit7d: 31.4,
    profit30d: 89.7,
    totalProfit: 290000,
    trades: 1324,
    winRate: 70.8,
    favoriteTokens: ["BTC", "ETH", "XRP"],
  },
]

export default function TopTradersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Top Traders</h1>
      <p className="text-gray-400 mb-8">
        Discover the top cryptocurrency traders and their performance. Learn from the best and follow their strategies.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {topTraders.slice(0, 3).map((trader) => (
          <div
            key={trader.id}
            className="bg-[#0D1217] rounded-lg border border-gray-800 overflow-hidden hover:border-[#FFDD33] transition-colors"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={trader.avatar || "/placeholder.svg"}
                    alt={trader.username}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="text-xl font-bold">{trader.username}</h3>
                    <div className="text-sm text-gray-400">{trader.address}</div>
                  </div>
                </div>
                <div className={`text-sm font-medium ${getColorForChange(trader.profit24h)}`}>
                  {trader.profit24h >= 0 ? "+" : ""}
                  {trader.profit24h}% (24h)
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs text-gray-400">Total Profit</div>
                  <div className="font-medium">${trader.totalProfit.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Win Rate</div>
                  <div className="font-medium">{trader.winRate}%</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Trades</div>
                  <div className="font-medium">{trader.trades}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">30d Profit</div>
                  <div className={`font-medium ${getColorForChange(trader.profit30d)}`}>
                    {trader.profit30d >= 0 ? "+" : ""}
                    {trader.profit30d}%
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-xs text-gray-400 mb-1">Favorite Tokens</div>
                <div className="flex gap-2">
                  {trader.favoriteTokens.map((token) => (
                    <span key={token} className="bg-gray-800 text-xs px-2 py-1 rounded-full">
                      {token}
                    </span>
                  ))}
                </div>
              </div>

              <Link href={`/traders/${trader.id}`}>
                <Button className="w-full bg-[#FFDD33] text-black hover:bg-[#FFDD33]/90">View Profile</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#0D1217] rounded-lg border border-gray-800 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <h2 className="text-xl font-bold">Trader Leaderboard</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              24h
            </Button>
            <Button variant="outline" size="sm">
              7d
            </Button>
            <Button variant="outline" size="sm" className="bg-gray-800">
              30d
            </Button>
            <Button variant="outline" size="sm">
              All Time
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-400 border-b border-gray-800">
                <th className="px-6 py-3 w-12">Rank</th>
                <th className="px-6 py-3">Trader</th>
                <th className="px-6 py-3">24h Profit</th>
                <th className="px-6 py-3">7d Profit</th>
                <th className="px-6 py-3">30d Profit</th>
                <th className="px-6 py-3">Total Profit</th>
                <th className="px-6 py-3">Win Rate</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {topTraders.map((trader, index) => (
                <tr key={trader.id} className="border-b border-gray-800 hover:bg-gray-900/50">
                  <td className="px-6 py-4 text-sm">{index + 1}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={trader.avatar || "/placeholder.svg"}
                        alt={trader.username}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div>
                        <Link href={`/traders/${trader.id}`} className="font-medium hover:text-[#FFDD33]">
                          {trader.username}
                        </Link>
                        <div className="text-xs text-gray-400">{trader.address}</div>
                      </div>
                    </div>
                  </td>
                  <td className={`px-6 py-4 ${getColorForChange(trader.profit24h)}`}>
                    {trader.profit24h >= 0 ? "+" : ""}
                    {trader.profit24h}%
                  </td>
                  <td className={`px-6 py-4 ${getColorForChange(trader.profit7d)}`}>
                    {trader.profit7d >= 0 ? "+" : ""}
                    {trader.profit7d}%
                  </td>
                  <td className={`px-6 py-4 ${getColorForChange(trader.profit30d)}`}>
                    {trader.profit30d >= 0 ? "+" : ""}
                    {trader.profit30d}%
                  </td>
                  <td className="px-6 py-4 font-medium">${trader.totalProfit.toLocaleString()}</td>
                  <td className="px-6 py-4">{trader.winRate}%</td>
                  <td className="px-6 py-4">
                    <Link href={`/traders/${trader.id}`}>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

