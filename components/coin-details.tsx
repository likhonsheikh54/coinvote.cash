"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink } from "lucide-react"

export function CoinDetails({ coin }: { coin: any }) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="bg-[#0a0a0a] rounded-lg border border-gray-800 p-6">
      <Tabs defaultValue="overview" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="markets">Markets</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">About {coin.name}</h2>
            <p className="text-gray-400">
              {coin.description ||
                `${coin.name} (${coin.symbol}) is a cryptocurrency with a current price of $${Number.parseFloat(coin.price).toFixed(6)}.
                It has a market capitalization of $${Number.parseFloat(coin.marketCap || "0").toLocaleString()} and a 24-hour trading
                volume of $${Number.parseFloat(coin.volume24h || "0").toLocaleString()}.`}
            </p>

            <h3 className="text-lg font-semibold mt-6">Key Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Price per Token</p>
                <p className="font-mono">${Number.parseFloat(coin.pricePerToken || "0").toFixed(8)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Listed</p>
                <p>{new Date(coin.createdAt).toLocaleDateString()}</p>
              </div>
              {coin.website && (
                <div>
                  <p className="text-sm text-gray-500">Website</p>
                  <a
                    href={coin.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    {new URL(coin.website).hostname} <ExternalLink size={14} />
                  </a>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="markets">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">{coin.name} Markets</h2>
            <p className="text-gray-400">View the exchanges where {coin.symbol} is available for trading.</p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-3 px-4">Exchange</th>
                    <th className="text-right py-3 px-4">Pair</th>
                    <th className="text-right py-3 px-4">Price</th>
                    <th className="text-right py-3 px-4">Volume (24h)</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Real data would be fetched from an API */}
                  <tr className="border-b border-gray-800 hover:bg-gray-900">
                    <td className="py-3 px-4">Binance</td>
                    <td className="text-right py-3 px-4">{coin.symbol}/USDT</td>
                    <td className="text-right py-3 px-4">${Number.parseFloat(coin.price).toFixed(6)}</td>
                    <td className="text-right py-3 px-4">$10,234,567</td>
                  </tr>
                  <tr className="border-b border-gray-800 hover:bg-gray-900">
                    <td className="py-3 px-4">Coinbase</td>
                    <td className="text-right py-3 px-4">{coin.symbol}/USD</td>
                    <td className="text-right py-3 px-4">${Number.parseFloat(coin.price).toFixed(6)}</td>
                    <td className="text-right py-3 px-4">$8,765,432</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="community">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">{coin.name} Community</h2>
            <p className="text-gray-400">
              Join the {coin.name} community and stay updated with the latest news and developments.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <a
                href={coin.twitter || `https://twitter.com/search?q=%24${coin.symbol}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-400"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
                <span>Twitter</span>
              </a>

              <a
                href={coin.telegram || `https://t.me/search?q=${coin.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-400"
                >
                  <path d="M21.5 2h-19C1.67 2 1 2.67 1 3.5v17c0 .83.67 1.5 1.5 1.5h19c.83 0 1.5-.67 1.5-1.5v-17c0-.83-.67-1.5-1.5-1.5zM8 19H5v-9h3v9zm-1.5-10.75c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM19 19h-3v-4.74c0-.97-.02-2.22-1.35-2.22-1.35 0-1.56 1.06-1.56 2.15V19h-3v-9h2.88v1.32h.04c.35-.66 1.2-1.35 2.47-1.35 2.64 0 3.14 1.74 3.14 4v5.03z"></path>
                </svg>
                <span>Telegram</span>
              </a>

              <a
                href={`https://www.reddit.com/search/?q=${coin.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-orange-400"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path>
                </svg>
                <span>Reddit</span>
              </a>

              <a
                href={coin.github || `https://github.com/search?q=${coin.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

