import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, Share2 } from "lucide-react"
// Or if it's directly importing from coingecko-api:
// import { getCoinDetail } from "@/lib/coingecko-api"

// This would be fetched from an API in a real application
const getCoinData = async (id: string) => {
  // Mock data for demonstration
  return {
    name: "Bitcoin",
    symbol: "BTC",
    logo: "/placeholder.svg?height=64&width=64",
    price: 61000,
    change: 2.5,
    marketCap: 1170000000000,
    volume: 28500000000,
    supply: 19200000,
    description:
      "Bitcoin is a decentralized digital currency, without a central bank or single administrator, that can be sent from user to user on the peer-to-peer bitcoin network without the need for intermediaries.",
    website: "https://bitcoin.org",
    explorer: "https://blockchain.com/explorer",
    twitter: "https://twitter.com/bitcoin",
    reddit: "https://reddit.com/r/bitcoin",
    github: "https://github.com/bitcoin",
    contractAddress: "0x0000000000000000000000000000000000000000",
    chain: "BTC",
    votes: 1245,
    priceHistory: [
      { date: "2023-01-01", price: 45000 },
      { date: "2023-02-01", price: 48000 },
      { date: "2023-03-01", price: 52000 },
      { date: "2023-04-01", price: 58000 },
      { date: "2023-05-01", price: 61000 },
    ],
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { id: string } }) {
  const coin = await getCoinData(params.id)

  return {
    title: `${coin.name} (${coin.symbol}) Price, Chart & Info | Coinvote.xyz`,
    description: `Get the latest ${coin.name} price, ${coin.symbol} market cap, trading volume, chart, and info. Vote for ${coin.name} on Coinvote.xyz.`,
    openGraph: {
      title: `${coin.name} (${coin.symbol}) | Coinvote.xyz`,
      description: `Get the latest ${coin.name} price, ${coin.symbol} market cap, trading volume, chart, and info.`,
      images: ["/og-image.jpg"],
    },
  }
}

export default async function CoinPage({ params }: { params: { id: string } }) {
  const coin = await getCoinData(params.id)

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-[#121212]">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.svg" alt="Coinvote" width={24} height={24} />
              <span className="font-bold text-xl">coinvote</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
            >
              Login
            </Button>
            <Button size="sm" className="bg-yellow-400 text-black hover:bg-yellow-500">
              Register
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#0a0a0a] rounded-lg border border-gray-800 p-6 mb-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Image
                    src={coin.logo || "/placeholder.svg"}
                    alt={coin.name}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                  <div>
                    <h1 className="text-2xl font-bold">{coin.name}</h1>
                    <div className="flex items-center gap-2 text-gray-400">
                      <span className="text-lg">{coin.symbol}</span>
                      <div className="flex items-center text-xs">
                        <Image
                          src={`/placeholder.svg?height=16&width=16`}
                          alt={coin.chain}
                          width={16}
                          height={16}
                          className="mr-1"
                        />
                        {coin.chain}
                      </div>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="text-gray-400 text-sm mb-1">Price</div>
                  <div className="flex items-end gap-2">
                    <div className="text-3xl font-bold">${coin.price.toLocaleString()}</div>
                    <div className={`text-sm ${coin.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {coin.change >= 0 ? "+" : ""}
                      {coin.change}%
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Button className="bg-yellow-400 text-black hover:bg-yellow-500 flex-1">Vote</Button>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{coin.votes.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">Total Votes</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-[#121212] rounded-lg p-4">
                  <div className="text-gray-400 text-xs mb-1">Market Cap</div>
                  <div className="font-bold">${(coin.marketCap / 1000000000).toFixed(2)}B</div>
                </div>
                <div className="bg-[#121212] rounded-lg p-4">
                  <div className="text-gray-400 text-xs mb-1">24h Volume</div>
                  <div className="font-bold">${(coin.volume / 1000000000).toFixed(2)}B</div>
                </div>
                <div className="bg-[#121212] rounded-lg p-4">
                  <div className="text-gray-400 text-xs mb-1">Circulating Supply</div>
                  <div className="font-bold">
                    {(coin.supply / 1000000).toFixed(2)}M {coin.symbol}
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold mb-3">About {coin.name}</h2>
                <p className="text-gray-300 mb-4">{coin.description}</p>

                <div className="flex flex-wrap gap-2">
                  <a
                    href={coin.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-yellow-400 hover:underline"
                  >
                    Website <ExternalLink className="h-3 w-3" />
                  </a>
                  <a
                    href={coin.explorer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-yellow-400 hover:underline"
                  >
                    Explorer <ExternalLink className="h-3 w-3" />
                  </a>
                  <a
                    href={coin.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-yellow-400 hover:underline"
                  >
                    Twitter <ExternalLink className="h-3 w-3" />
                  </a>
                  <a
                    href={coin.reddit}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-yellow-400 hover:underline"
                  >
                    Reddit <ExternalLink className="h-3 w-3" />
                  </a>
                  <a
                    href={coin.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-yellow-400 hover:underline"
                  >
                    GitHub <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-[#0a0a0a] rounded-lg border border-gray-800 p-6">
              <h2 className="text-lg font-bold mb-4">Price Chart</h2>
              <div className="h-64 bg-[#121212] rounded-lg flex items-center justify-center text-gray-400">
                Chart would be rendered here with a library like Chart.js or Recharts
              </div>
            </div>
          </div>

          <div>
            <div className="bg-[#0a0a0a] rounded-lg border border-gray-800 p-6 mb-6">
              <h2 className="text-lg font-bold mb-4">Contract Information</h2>
              <div className="mb-4">
                <div className="text-gray-400 text-xs mb-1">Contract Address</div>
                <div className="bg-[#121212] rounded-lg p-3 text-sm break-all">{coin.contractAddress}</div>
              </div>
              <div>
                <div className="text-gray-400 text-xs mb-1">Network</div>
                <div className="flex items-center gap-2 bg-[#121212] rounded-lg p-3">
                  <Image src={`/placeholder.svg?height=16&width=16`} alt={coin.chain} width={16} height={16} />
                  <span>{coin.chain}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#0a0a0a] rounded-lg border border-gray-800 p-6">
              <h2 className="text-lg font-bold mb-4">Similar Coins</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Image
                        src="/placeholder.svg?height=32&width=32"
                        alt="Similar Coin"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div>
                        <div className="font-medium">Similar Coin {i}</div>
                        <div className="text-xs text-gray-400">SC{i}</div>
                      </div>
                    </div>
                    <div className={`text-sm ${i % 2 === 0 ? "text-green-500" : "text-red-500"}`}>
                      {i % 2 === 0 ? "+" : "-"}
                      {i * 1.5}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-gray-800 py-6">
        <div className="container mx-auto px-4 text-center">
          <div className="text-sm text-gray-400">© 2023 Coinvote, Inc. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}

