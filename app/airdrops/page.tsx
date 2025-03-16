import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Clock, DollarSign, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Cryptocurrency Airdrops | Coinvote.xyz",
  description:
    "Discover upcoming and active cryptocurrency airdrops. Claim free tokens and participate in community rewards.",
  keywords: [
    "crypto airdrop",
    "free tokens",
    "token giveaway",
    "cryptocurrency airdrop",
    "claim tokens",
    "crypto rewards",
  ],
}

// Mock airdrop data
const airdrops = [
  {
    id: 1,
    name: "Arbitrum",
    symbol: "ARB",
    logo: "/placeholder.svg?height=64&width=64",
    description: "Layer 2 scaling solution for Ethereum with low fees",
    startDate: "2023-12-01T00:00:00Z",
    endDate: "2023-12-31T00:00:00Z",
    value: 500000,
    participants: 25000,
    reward: "50-500 ARB",
    status: "active",
    category: "Layer 2",
    requirements: ["Connect wallet", "Bridge assets to Arbitrum", "Complete 5 transactions"],
  },
  {
    id: 2,
    name: "Optimism",
    symbol: "OP",
    logo: "/placeholder.svg?height=64&width=64",
    description: "Optimistic rollup scaling solution for Ethereum",
    startDate: "2023-12-15T00:00:00Z",
    endDate: "2024-01-15T00:00:00Z",
    value: 750000,
    participants: 18000,
    reward: "100-1000 OP",
    status: "active",
    category: "Layer 2",
    requirements: ["Connect wallet", "Use Optimism Bridge", "Interact with 3 dApps"],
  },
  {
    id: 3,
    name: "ZKSync",
    symbol: "ZKS",
    logo: "/placeholder.svg?height=64&width=64",
    description: "ZK rollup scaling solution with fast finality",
    startDate: "2024-01-01T00:00:00Z",
    endDate: "2024-02-01T00:00:00Z",
    value: 1000000,
    participants: 0,
    reward: "200-2000 ZKS",
    status: "upcoming",
    category: "Layer 2",
    requirements: ["Connect wallet", "Bridge to ZKSync", "Trade on ZKSync DEX"],
  },
  {
    id: 4,
    name: "Lens Protocol",
    symbol: "LENS",
    logo: "/placeholder.svg?height=64&width=64",
    description: "Decentralized social graph for Web3 applications",
    startDate: "2023-11-15T00:00:00Z",
    endDate: "2023-12-15T00:00:00Z",
    value: 300000,
    participants: 42000,
    reward: "25-250 LENS",
    status: "active",
    category: "Social",
    requirements: ["Create Lens profile", "Make 3 posts", "Follow 5 accounts"],
  },
  {
    id: 5,
    name: "Starknet",
    symbol: "STRK",
    logo: "/placeholder.svg?height=64&width=64",
    description: "ZK rollup with Cairo programming language",
    startDate: "2024-01-10T00:00:00Z",
    endDate: "2024-02-10T00:00:00Z",
    value: 850000,
    participants: 0,
    reward: "100-1000 STRK",
    status: "upcoming",
    category: "Layer 2",
    requirements: ["Connect wallet", "Deploy a contract", "Use Starknet Bridge"],
  },
  {
    id: 6,
    name: "Sui",
    symbol: "SUI",
    logo: "/placeholder.svg?height=64&width=64",
    description: "Layer 1 blockchain with Move programming language",
    startDate: "2023-12-05T00:00:00Z",
    endDate: "2024-01-05T00:00:00Z",
    value: 600000,
    participants: 31000,
    reward: "50-500 SUI",
    status: "active",
    category: "Layer 1",
    requirements: ["Create Sui wallet", "Mint an NFT", "Stake SUI tokens"],
  },
]

export default function AirdropsPage() {
  // Helper function to format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
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
      <h1 className="text-3xl font-bold mb-2">Cryptocurrency Airdrops</h1>
      <p className="text-gray-400 mb-8">
        Discover upcoming and active cryptocurrency airdrops. Claim free tokens and participate in community rewards.
      </p>

      <div className="flex gap-4 mb-8">
        <Button className="bg-[#FFDD33] text-black hover:bg-[#FFDD33]/90">All Airdrops</Button>
        <Button variant="outline">Active</Button>
        <Button variant="outline">Upcoming</Button>
        <Button variant="outline">Ended</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {airdrops.map((airdrop) => (
          <div
            key={airdrop.id}
            className="bg-[#0D1217] rounded-lg border border-gray-800 overflow-hidden hover:border-[#FFDD33] transition-colors"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={airdrop.logo || "/placeholder.svg"}
                    alt={airdrop.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="text-xl font-bold">{airdrop.name}</h3>
                    <div className="text-sm text-gray-400">{airdrop.symbol}</div>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full text-white ${getStatusColor(airdrop.status)}`}>
                  {airdrop.status.charAt(0).toUpperCase() + airdrop.status.slice(1)}
                </span>
              </div>

              <p className="text-gray-300 mb-4 line-clamp-2">{airdrop.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-gray-400" />
                  <div>
                    <div className="text-xs text-gray-400">Start Date</div>
                    <div className="text-sm">{formatDate(airdrop.startDate)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <div>
                    <div className="text-xs text-gray-400">End Date</div>
                    <div className="text-sm">{formatDate(airdrop.endDate)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <div>
                    <div className="text-xs text-gray-400">Reward</div>
                    <div className="text-sm">{airdrop.reward}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <div>
                    <div className="text-xs text-gray-400">Participants</div>
                    <div className="text-sm">{airdrop.participants.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm font-medium mb-2">Requirements:</div>
                <ul className="text-sm text-gray-300 space-y-1 pl-5 list-disc">
                  {airdrop.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              <Link href={`/airdrops/${airdrop.id}`}>
                <Button className="w-full bg-[#FFDD33] text-black hover:bg-[#FFDD33]/90">View Details</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

