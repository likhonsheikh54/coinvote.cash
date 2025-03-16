import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { getTokenPoolsData } from "@/lib/actions-dexscreener"
import DexPairsTable from "@/components/dex-pairs-table"
import { getChainName, getChainLogo, formatLiquidity } from "@/lib/dexscreener-api"
import { getCanonicalUrl } from "@/lib/utils/canonical"

interface TokenPageProps {
  params: {
    chainId: string
    tokenAddress: string
  }
}

// Update the generateMetadata function to include canonical URL
export async function generateMetadata({ params }: TokenPageProps): Promise<Metadata> {
  const { chainId, tokenAddress } = params

  // Get token data
  const result = await getTokenPoolsData(chainId, tokenAddress)

  if (!result.success || result.data.length === 0) {
    return {
      title: "Token Not Found | Coinvote.xyz",
      description: "The requested token could not be found.",
      alternates: {
        canonical: getCanonicalUrl(`/dex/token/${chainId}/${tokenAddress}`),
      },
    }
  }

  const token =
    result.data[0].baseToken.address === tokenAddress.toLowerCase()
      ? result.data[0].baseToken
      : result.data[0].quoteToken

  return {
    title: `${token.name} (${token.symbol}) DEX Pairs | Coinvote.xyz`,
    description: `Explore all DEX pairs and liquidity pools for ${token.name} (${token.symbol}) on ${getChainName(chainId)}.`,
    alternates: {
      canonical: getCanonicalUrl(`/dex/token/${chainId}/${tokenAddress}`),
    },
  }
}

export default async function TokenDexPage({ params }: TokenPageProps) {
  const { chainId, tokenAddress } = params

  // Get token data
  const result = await getTokenPoolsData(chainId, tokenAddress)

  if (!result.success || result.data.length === 0) {
    notFound()
  }

  const pairs = result.data

  // Determine if the token is the base or quote token in the first pair
  const isBase = pairs[0].baseToken.address === tokenAddress.toLowerCase()
  const token = isBase ? pairs[0].baseToken : pairs[0].quoteToken

  // Calculate total liquidity across all pairs
  const totalLiquidity = pairs.reduce((sum, pair) => sum + (pair.liquidity?.usd || 0), 0)

  // Calculate total 24h volume across all pairs
  const total24hVolume = pairs.reduce((sum, pair) => sum + (pair.volume?.h24 || 0), 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/dex" className="inline-flex items-center text-gray-400 hover:text-white">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to DEX Explorer
        </Link>
      </div>

      <div className="bg-[#0D1217] rounded-lg border border-gray-800 p-6 mb-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-xl font-bold">
              {token.symbol.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{token.name}</h1>
              <div className="flex items-center gap-2 text-gray-400">
                <span className="text-lg">{token.symbol}</span>
                <div className="flex items-center text-xs">
                  <Image
                    src={getChainLogo(chainId) || "/placeholder.svg?height=16&width=16"}
                    alt={getChainName(chainId)}
                    width={16}
                    height={16}
                    className="mr-1 rounded-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.onerror = null // Prevent infinite loop
                      target.src = "/placeholder.svg?height=16&width=16"
                    }}
                  />
                  {getChainName(chainId)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-[#121212] rounded-lg p-4">
            <div className="text-gray-400 text-xs mb-1">Total Liquidity</div>
            <div className="font-bold">{formatLiquidity(totalLiquidity)}</div>
          </div>
          <div className="bg-[#121212] rounded-lg p-4">
            <div className="text-gray-400 text-xs mb-1">24h Volume</div>
            <div className="font-bold">{formatLiquidity(total24hVolume)}</div>
          </div>
          <div className="bg-[#121212] rounded-lg p-4">
            <div className="text-gray-400 text-xs mb-1">Pairs</div>
            <div className="font-bold">{pairs.length}</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <a
            href={`https://dexscreener.com/${chainId}/${tokenAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-[#FFDD33] hover:underline"
          >
            View on DexScreener <ExternalLink className="h-3 w-3" />
          </a>
          <a
            href={`https://${chainId === "ethereum" ? "etherscan.io" : chainId + ".etherscan.io"}/token/${tokenAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-[#FFDD33] hover:underline"
          >
            View on Explorer <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      <DexPairsTable
        initialPairs={pairs}
        title={`${token.symbol} DEX Pairs`}
        description={`All liquidity pools for ${token.name} on ${getChainName(chainId)}`}
      />
    </div>
  )
}

