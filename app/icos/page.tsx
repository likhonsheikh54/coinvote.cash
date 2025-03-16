import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Clock, DollarSign, Users } from "lucide-react"
import { viewport } from "../viewport"

export const metadata: Metadata = {
  title: "Initial Coin Offerings (ICOs) | Coinvote.xyz",
  description:
    "Discover upcoming and active ICOs. Get exclusive insights into new token sales and investment opportunities.",
  keywords: [
    "ICO",
    "initial coin offering",
    "token sale",
    "crypto presale",
    "cryptocurrency investment",
    "token launch",
  ],
}

// Mock ICO data
const icos = [
  {
    id: 1,
    name: "DefiChain",
    symbol: "DFC",
    logo: "/placeholder.svg?height=64&width=64",
    description: "DeFi platform for decentralized lending and borrowing",
    startDate: "2023-12-01T00:00:00Z",
    endDate: "2023-12-31T00:00:00Z",
    hardCap: 5000000,
    raised: 3250000,
    price: 0.05,
    status: "active",
    category: "DeFi",
  },
  {
    id: 2,
    name: "MetaWorld",
    symbol: "META",
    logo: "/placeholder.svg?height=64&width=64",
    description: "Metaverse platform with virtual real estate and gaming",
    startDate: "2023-12-15T00:00:00Z",
    endDate: "2024-01-15T00:00:00Z",
    hardCap: 10000000,
    raised: 2500000,
    price: 0.1,
    status: "active",
    category: "Metaverse",
  },
  {
    id: 3,
    name: "GreenChain",
    symbol: "GREEN",
    logo: "/placeholder.svg?height=64&width=64",
    description: "Sustainable blockchain with carbon-neutral transactions",
    startDate: "2024-01-01T00:00:00Z",
    endDate: "2024-02-01T00:00:00Z",
    hardCap: 8000000,
    raised: 0,
    price: 0.08,
    status: "upcoming",
    category: "Infrastructure",
  },
  {
    id: 4,
    name: "ArtBlock",
    symbol: "ART",
    logo: "/placeholder.svg?height=64&width=64",
    description: "NFT marketplace for digital artists and collectors",
    startDate: "2023-11-15T00:00:00Z",
    endDate: "2023-12-15T00:00:00Z",
    hardCap: 3000000,
    raised: 2900000,
    price: 0.03,
    status: "active",
    category: "NFT",
  },
  {
    id: 5,
    name: "SecureWallet",
    symbol: "SECURE",
    logo: "/placeholder.svg?height=64&width=64",
    description: "Multi-chain wallet with enhanced security features",
    startDate: "2024-01-10T00:00:00Z",
    endDate: "2024-02-10T00:00:00Z",
    hardCap: 4000000,
    raised: 0,
    price: 0.04,
    status: "upcoming",
    category: "Wallet",
  },
  {
    id: 6,
    name: "GameFi",
    symbol: "GAFI",
    logo: "/placeholder.svg?height=64&width=64",
    description: "Play-to-earn gaming platform with multiple titles",
    startDate: "2023-12-05T00:00:00Z",
    endDate: "2024-01-05T00:00:00Z",
    hardCap: 7000000,
    raised: 4200000,
    price: 0.07,
    status: "active",
    category: "Gaming",
  },
]

export default function ICOsPage() {
  // Helper function to format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  // Calculate progress percentage
  const getProgress = (raised: number, hardCap: number) => {
    return Math.min(Math.round((raised / hardCap) * 100), 100)
  }

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-[#4BCC00]"
      case "upcoming":
        return "bg-blue-500"
      case "ended":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Initial Coin Offerings (ICOs)</h1>
      <p className="text-gray-400 mb-8">
        Discover upcoming and active ICOs. Get exclusive insights into new token sales and investment opportunities.
      </p>

      <div className="flex gap-4 mb-8">
        <Button className="bg-[#FFDD33] text-black hover:bg-[#FFDD33]/90">All ICOs</Button>
        <Button variant="outline">Active</Button>
        <Button variant="outline">Upcoming</Button>
        <Button variant="outline">Ended</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {icos.map((ico) => (
          <div
            key={ico.id}
            className="bg-[#0D1217] rounded-lg border border-gray-800 overflow-hidden hover:border-[#FFDD33] transition-colors"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={ico.logo || "/placeholder.svg"}
                    alt={ico.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="text-xl font-bold">{ico.name}</h3>
                    <div className="text-sm text-gray-400">{ico.symbol}</div>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full text-white ${getStatusColor(ico.status)}`}>
                  {ico.status.charAt(0).toUpperCase() + ico.status.slice(1)}
                </span>
              </div>

              <p className="text-gray-300 mb-4 line-clamp-2">{ico.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-gray-400" />
                  <div>
                    <div className="text-xs text-gray-400">Start Date</div>
                    <div className="text-sm">{formatDate(ico.startDate)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <div>
                    <div className="text-xs text-gray-400">End Date</div>
                    <div className="text-sm">{formatDate(ico.endDate)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <div>
                    <div className="text-xs text-gray-400">Token Price</div>
                    <div className="text-sm">${ico.price}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <div>
                    <div className="text-xs text-gray-400">Category</div>
                    <div className="text-sm">{ico.category}</div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{getProgress(ico.raised, ico.hardCap)}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2.5">
                  <div
                    className="bg-[#FFDD33] h-2.5 rounded-full"
                    style={{ width: `${getProgress(ico.raised, ico.hardCap)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>${ico.raised.toLocaleString()} raised</span>
                  <span>Hard cap: ${ico.hardCap.toLocaleString()}</span>
                </div>
              </div>

              <Link href={`/icos/${ico.id}`}>
                <Button className="w-full bg-[#FFDD33] text-black hover:bg-[#FFDD33]/90">View Details</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export { viewport }

