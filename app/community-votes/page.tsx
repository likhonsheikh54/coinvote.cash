"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCommunityVotes, getTopCoins, getCMCLatestListings, getPumpFunTrending } from "@/lib/actions-extended"
import { getColorForChange } from "@/lib/coinmarketcap-api"
import { viewport } from "../viewport"

export default function CommunityVotesPage() {
  const [activeTab, setActiveTab] = useState("coingecko")
  const [coingeckoVotes, setCoingeckoVotes] = useState<Record<string, number>>({})
  const [cmcVotes, setCmcVotes] = useState<Record<string, number>>({})
  const [pumpfunVotes, setPumpfunVotes] = useState<Record<string, number>>({})
  const [coingeckoCoins, setCoingeckoCoins] = useState<any[]>([])
  const [cmcCoins, setCmcCoins] = useState<any[]>([])
  const [pumpfunTokens, setPumpfunTokens] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  async function voteForToken(tokenId: string, platform: string) {
    // Placeholder function for voting.  Replace with actual voting logic.
    console.log(`Voting for token ${tokenId} on ${platform}`)
    alert(`Voted for token ${tokenId} on ${platform}! (This is a demo)`)
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true)

      // Get community votes
      const cgVotesResult = await getCommunityVotes("coingecko")
      const cmcVotesResult = await getCommunityVotes("cmc")
      const pfVotesResult = await getCommunityVotes("pumpfun")

      if (cgVotesResult.success) setCoingeckoVotes(cgVotesResult.data)
      if (cmcVotesResult.success) setCmcVotes(cmcVotesResult.data)
      if (pfVotesResult.success) setPumpfunVotes(pfVotesResult.data)

      // Get coins data
      const cgCoinsResult = await getTopCoins(100)
      const cmcCoinsResult = await getCMCLatestListings(100)
      const pfTokensResult = await getPumpFunTrending()

      if (cgCoinsResult.success) {
        // Add votes to coins
        const coinsWithVotes = cgCoinsResult.data.map((coin) => ({
          ...coin,
          votes: cgVotesResult.data[coin.id] || 0,
        }))

        // Sort by votes (descending)
        coinsWithVotes.sort((a, b) => b.votes - a.votes)

        setCoingeckoCoins(coinsWithVotes)
      }

      if (cmcCoinsResult.success) {
        // Add votes to coins
        const coinsWithVotes = cmcCoinsResult.data.map((coin) => ({
          ...coin,
          votes: cmcVotesResult.data[coin.id.toString()] || 0,
        }))

        // Sort by votes (descending)
        coinsWithVotes.sort((a, b) => b.votes - a.votes)

        setCmcCoins(coinsWithVotes)
      }

      if (pfTokensResult.success) {
        // Add votes to tokens
        const tokensWithVotes = pfTokensResult.data.map((token) => ({
          ...token,
          votes: pfVotesResult.data[token.id] || 0,
        }))

        // Sort by votes (descending)
        tokensWithVotes.sort((a, b) => b.votes - a.votes)

        setPumpfunTokens(tokensWithVotes)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Community Votes</h1>
        <p className="text-gray-400 mb-8">See which cryptocurrencies are most popular among the Coinvote community.</p>

        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFDD33]"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Community Votes</h1>
      <p className="text-gray-400 mb-8">See which cryptocurrencies are most popular among the Coinvote community.</p>

      <Tabs defaultValue="coingecko" onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="coingecko">CoinGecko</TabsTrigger>
          <TabsTrigger value="cmc">CoinMarketCap</TabsTrigger>
          <TabsTrigger value="pumpfun">pump.fun</TabsTrigger>
        </TabsList>

        <TabsContent value="coingecko">
          <div className="bg-[#0D1217] rounded-lg border border-gray-800 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <h2 className="text-xl font-bold">Most Voted Coins (CoinGecko)</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs text-gray-400 border-b border-gray-800">
                    <th className="px-6 py-3 w-12">#</th>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3">24h %</th>
                    <th className="px-6 py-3">Market Cap</th>
                    <th className="px-6 py-3">Votes</th>
                    <th className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {coingeckoCoins.slice(0, 20).map((coin, index) => (
                    <tr key={coin.id} className="border-b border-gray-800 hover:bg-gray-900/50">
                      <td className="px-6 py-4 text-sm">{index + 1}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Image
                            src={coin.image || "/placeholder.svg"}
                            alt={coin.name}
                            width={24}
                            height={24}
                            className="rounded-full"
                            onError={(e) => {
                              ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=24&width=24"
                            }}
                          />
                          <div>
                            <Link href={`/coins/${coin.symbol.toLowerCase()}`} className="font-medium hover:text-[#FFDD33]">
                              {coin.name}
                            </Link>
                            <div className="text-xs text-gray-400">{coin.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium">
                        $
                        {coin.current_price.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: coin.current_price < 1 ? 6 : 2,
                        })}
                      </td>
                      <td className={`px-6 py-4 ${getColorForChange(coin.price_change_percentage_24h)}`}>
                        {coin.price_change_percentage_24h >= 0 ? "+" : ""}
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </td>
                      <td className="px-6 py-4">${coin.market_cap.toLocaleString()}</td>
                      <td className="px-6 py-4 font-bold text-[#FFDD33]">{coin.votes}</td>
                      <td className="px-6 py-4">
                        <Button
                          size="sm"
                          className="bg-[#FFDD33] text-black hover:bg-[#FFDD33]/90 w-16"
                          onClick={() => voteForToken(coin.id, "coingecko")}
                        >
                          Vote
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="cmc">
          <div className="bg-[#0D1217] rounded-lg border border-gray-800 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <h2 className="text-xl font-bold">Most Voted Coins (CoinMarketCap)</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs text-gray-400 border-b border-gray-800">
                    <th className="px-6 py-3 w-12">#</th>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3">24h %</th>
                    <th className="px-6 py-3">Market Cap</th>
                    <th className="px-6 py-3">Votes</th>
                    <th className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cmcCoins.slice(0, 20).map((coin, index) => (
                    <tr key={coin.id} className="border-b border-gray-800 hover:bg-gray-900/50">
                      <td className="px-6 py-4 text-sm">{index + 1}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Image
                            src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`}
                            alt={coin.name}
                            width={24}
                            height={24}
                            className="rounded-full"
                            onError={(e) => {
                              ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=24&width=24"
                            }}
                          />
                          <div>
                            <Link href={`/coins/${coin.symbol.toLowerCase()}`} className="font-medium hover:text-[#FFDD33]">
                              {coin.name}
                            </Link>
                            <div className="text-xs text-gray-400">{coin.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium">
                        $
                        {coin.quote.USD.price < 0.01
                          ? coin.quote.USD.price.toExponential(2)
                          : coin.quote.USD.price.toFixed(4)}
                      </td>
                      <td className={`px-6 py-4 ${getColorForChange(coin.quote.USD.percent_change_24h)}`}>
                        {coin.quote.USD.percent_change_24h >= 0 ? "+" : ""}
                        {coin.quote.USD.percent_change_24h.toFixed(2)}%
                      </td>
                      <td className="px-6 py-4">${coin.quote.USD.market_cap.toLocaleString()}</td>
                      <td className="px-6 py-4 font-bold text-[#FFDD33]">{coin.votes}</td>
                      <td className="px-6 py-4">
                        <Button
                          size="sm"
                          className="bg-[#FFDD33] text-black hover:bg-[#FFDD33]/90 w-16"
                          onClick={() => voteForToken(coin.id.toString(), "cmc")}
                        >
                          Vote
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pumpfun">
          <div className="bg-[#0D1217] rounded-lg border border-gray-800 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <h2 className="text-xl font-bold">Most Voted Tokens (pump.fun)</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs text-gray-400 border-b border-gray-800">
                    <th className="px-6 py-3 w-12">#</th>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3">24h %</th>
                    <th className="px-6 py-3">Market Cap</th>
                    <th className="px-6 py-3">Votes</th>
                    <th className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pumpfunTokens.slice(0, 20).map((token, index) => (
                    <tr key={token.id} className="border-b border-gray-800 hover:bg-gray-900/50">
                      <td className="px-6 py-4 text-sm">{index + 1}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-sm font-bold">
                            {token.symbol.charAt(0)}
                          </div>
                          <div>
                            <Link href={`/pump-fun/${token.id}`} className="font-medium hover:text-[#FFDD33]">
                              {token.name}
                            </Link>
                            <div className="text-xs text-gray-400">{token.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium">
                        ${token.price < 0.01 ? token.price.toExponential(2) : token.price.toFixed(6)}
                      </td>
                      <td className={`px-6 py-4 ${getColorForChange(token.change24h)}`}>
                        {token.change24h >= 0 ? "+" : ""}
                        {token.change24h.toFixed(2)}%
                      </td>
                      <td className="px-6 py-4">${token.marketCap.toLocaleString()}</td>
                      <td className="px-6 py-4 font-bold text-[#FFDD33]">{token.votes}</td>
                      <td className="px-6 py-4">
                        <Button
                          size="sm"
                          className="bg-[#FFDD33] text-black hover:bg-[#FFDD33]/90 w-16"
                          onClick={() => voteForToken(token.id, "pumpfun")}
                        >
                          Vote
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-[#0D1217] rounded-lg border border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4">About Community Votes</h2>
        <p className="text-gray-300 mb-4">
          Community votes represent the popularity of cryptocurrencies among Coinvote users. Each user can vote for
          their favorite coins across different platforms, and the results are displayed here.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/30 p-4 rounded-lg">
            <h3 className="font-semibold text-[#FFDD33] mb-2">CoinGecko</h3>
            <p className="text-gray-300 text-sm">
              Votes for cryptocurrencies listed on CoinGecko, one of the largest cryptocurrency data aggregators.
            </p>
          </div>

          <div className="bg-gray-800/30 p-4 rounded-lg">
            <h3 className="font-semibold text-[#FFDD33] mb-2">CoinMarketCap</h3>
            <p className="text-gray-300 text-sm">
              Votes for cryptocurrencies listed on CoinMarketCap, a popular cryptocurrency price-tracking website.
            </p>
          </div>

          <div className="bg-gray-800/30 p-4 rounded-lg">
            <h3 className="font-semibold text-[#FFDD33] mb-2">pump.fun</h3>
            <p className="text-gray-300 text-sm">
              Votes for tokens created on pump.fun, a platform for creating and trading meme tokens.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export { viewport }

