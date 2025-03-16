import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "ETH Wars | Coinvote.cash",
  description:
    "Track the battle between Ethereum Layer 2 solutions and compare their performance, features, and adoption",
}

export default function EthWarsPage() {
  // Mock data for ETH Layer 2 solutions
  const layer2Solutions = [
    {
      id: "arbitrum",
      name: "Arbitrum",
      logo: "/placeholder.svg?height=64&width=64",
      tvl: 7800000000, // $7.8B
      transactions24h: 820000,
      avgFee: 0.12, // $0.12
      tps: 75,
      marketShare: 42,
      change7d: 5.2,
    },
    {
      id: "optimism",
      name: "Optimism",
      logo: "/placeholder.svg?height=64&width=64",
      tvl: 4200000000, // $4.2B
      transactions24h: 650000,
      avgFee: 0.15, // $0.15
      tps: 65,
      marketShare: 23,
      change7d: 3.8,
    },
    {
      id: "base",
      name: "Base",
      logo: "/placeholder.svg?height=64&width=64",
      tvl: 2100000000, // $2.1B
      transactions24h: 420000,
      avgFee: 0.11, // $0.11
      tps: 70,
      marketShare: 12,
      change7d: 8.5,
    },
    {
      id: "zksync",
      name: "zkSync Era",
      logo: "/placeholder.svg?height=64&width=64",
      tvl: 1800000000, // $1.8B
      transactions24h: 380000,
      avgFee: 0.08, // $0.08
      tps: 100,
      marketShare: 10,
      change7d: 12.3,
    },
    {
      id: "starknet",
      name: "Starknet",
      logo: "/placeholder.svg?height=64&width=64",
      tvl: 950000000, // $950M
      transactions24h: 210000,
      avgFee: 0.07, // $0.07
      tps: 120,
      marketShare: 5,
      change7d: 15.7,
    },
    {
      id: "polygon",
      name: "Polygon zkEVM",
      logo: "/placeholder.svg?height=64&width=64",
      tvl: 850000000, // $850M
      transactions24h: 180000,
      avgFee: 0.09, // $0.09
      tps: 90,
      marketShare: 4.5,
      change7d: 7.2,
    },
    {
      id: "linea",
      name: "Linea",
      logo: "/placeholder.svg?height=64&width=64",
      tvl: 320000000, // $320M
      transactions24h: 95000,
      avgFee: 0.1, // $0.10
      tps: 85,
      marketShare: 1.8,
      change7d: 4.3,
    },
    {
      id: "scroll",
      name: "Scroll",
      logo: "/placeholder.svg?height=64&width=64",
      tvl: 280000000, // $280M
      transactions24h: 85000,
      avgFee: 0.08, // $0.08
      tps: 95,
      marketShare: 1.5,
      change7d: 9.8,
    },
  ]

  // Format numbers
  const formatNumber = (num: number) => {
    if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(1)}B`
    } else if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(1)}M`
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    } else {
      return num.toString()
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">ETH Wars: Layer 2 Battle</h1>
      <p className="text-gray-400 mb-8">
        Track and compare the performance, features, and adoption of Ethereum Layer 2 scaling solutions.
      </p>

      <div className="bg-[#0D1217] rounded-lg border border-gray-800 p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Layer 2 Market Share</h2>
        <div className="h-64 bg-[#121212] rounded-lg flex items-center justify-center mb-4">
          <p className="text-gray-400">Market share chart would be displayed here</p>
        </div>
        <p className="text-gray-300 text-sm">
          Ethereum Layer 2 solutions have seen significant growth in 2023, with total value locked (TVL) exceeding $18
          billion. Arbitrum and Optimism continue to dominate the market, while newer solutions like Base and zkSync Era
          are rapidly gaining traction.
        </p>
      </div>

      <div className="overflow-x-auto mb-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#0D1217] border-b border-gray-800">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">TVL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Transactions (24h)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Avg. Fee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">TPS</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Market Share
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                7d Change
              </th>
            </tr>
          </thead>
          <tbody className="bg-[#0D1217] divide-y divide-gray-800">
            {layer2Solutions.map((solution, index) => (
              <tr key={solution.id} className="hover:bg-gray-900/50">
                <td className="px-6 py-4 whitespace-nowrap text-sm">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <Image
                        src={solution.logo || "/placeholder.svg"}
                        alt={solution.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium">{solution.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{formatNumber(solution.tvl)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{formatNumber(solution.transactions24h)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">${solution.avgFee}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{solution.tps}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{solution.marketShare}%</td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm ${solution.change7d >= 0 ? "text-coin-green" : "text-red-500"}`}
                >
                  {solution.change7d >= 0 ? "+" : ""}
                  {solution.change7d}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#0D1217] rounded-lg border border-gray-800 p-6">
          <h2 className="text-xl font-bold mb-4">Technology Comparison</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Optimistic Rollups</h3>
              <p className="text-gray-300 text-sm">
                Optimistic rollups like Arbitrum and Optimism assume transactions are valid by default and only run
                computation in case of fraud proofs. They offer good compatibility with existing Ethereum tools but have
                longer withdrawal periods.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">ZK Rollups</h3>
              <p className="text-gray-300 text-sm">
                ZK rollups like zkSync and Starknet use zero-knowledge proofs to validate transactions. They offer
                faster finality and potentially lower fees but may have more limited EVM compatibility.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#0D1217] rounded-lg border border-gray-800 p-6">
          <h2 className="text-xl font-bold mb-4">Recent Developments</h2>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li className="pb-3 border-b border-gray-800">
              <span className="text-coin-yellow font-medium">Base</span> - Coinbase's Layer 2 solution has seen rapid
              adoption since its launch, particularly among DeFi and NFT projects.
            </li>
            <li className="pb-3 border-b border-gray-800">
              <span className="text-coin-yellow font-medium">zkSync Era</span> - Recently launched its mainnet and has
              attracted significant TVL with its native zkEVM implementation.
            </li>
            <li className="pb-3 border-b border-gray-800">
              <span className="text-coin-yellow font-medium">Arbitrum</span> - Continues to lead in TVL and has expanded
              its ecosystem with the Arbitrum Nova chain for gaming and social applications.
            </li>
            <li>
              <span className="text-coin-yellow font-medium">Optimism</span> - Has implemented the OP Stack, allowing
              for the creation of multiple chains sharing the same security model.
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-[#0D1217] rounded-lg border border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4">ETH Layer 2 Projects</h2>
        <p className="text-gray-300 mb-6">
          Discover the most promising projects building on Ethereum Layer 2 solutions. Vote for your favorites and track
          their performance.
        </p>
        <div className="flex justify-center">
          <Link href="/eth-wars/projects">
            <Button className="bg-coin-yellow text-black hover:bg-coin-yellow/90">Explore Layer 2 Projects</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

