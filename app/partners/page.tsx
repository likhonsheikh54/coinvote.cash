import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Our Partners | Coinvote.cash",
  description: "Discover Coinvote.cash's strategic partners and collaborations in the cryptocurrency industry.",
}

const partners = [
  {
    name: "CryptoAnalytics Inc.",
    logo: "/placeholder.svg",
    description: "Leading provider of cryptocurrency market data and analytics.",
    website: "#",
  },
  {
    name: "BlockchainDev Labs",
    logo: "/placeholder.svg",
    description: "Innovative blockchain development and research firm.",
    website: "#",
  },
  {
    name: "CoinTracker Pro",
    logo: "/placeholder.svg",
    description: "Advanced cryptocurrency portfolio tracking solution.",
    website: "#",
  },
  {
    name: "CryptoNews Network",
    logo: "/placeholder.svg",
    description: "24/7 cryptocurrency news and market updates.",
    website: "#",
  },
  {
    name: "TokenLaunch Platform",
    logo: "/placeholder.svg",
    description: "Secure and compliant platform for token launches and ICOs.",
    website: "#",
  },
  {
    name: "MetaVerse Ventures",
    logo: "/placeholder.svg",
    description: "Investment firm focused on blockchain and metaverse projects.",
    website: "#",
  },
]

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-moon-night text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Our Partners</h1>
        <p className="text-gray-400 mb-8">
          Coinvote.cash collaborates with industry leaders to provide the best cryptocurrency experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {partners.map((partner) => (
            <Card key={partner.name} className="bg-[#0D1217] border-gray-800 text-white">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={48}
                    height={48}
                    className="rounded-md"
                  />
                  <CardTitle className="text-xl">{partner.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{partner.description}</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full border-gray-700 hover:border-coin-yellow">
                  <Link href={partner.website}>Visit Website</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="bg-[#0D1217] rounded-lg border border-gray-800 p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Become a Partner</h2>
          <p className="text-gray-300 mb-6">
            Are you interested in partnering with Coinvote.cash? We're always looking for strategic collaborations
            that benefit the cryptocurrency community.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-coin-yellow">Partnership Benefits</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-coin-yellow">•</span>
                  <span>Exposure to our growing user base</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-coin-yellow">•</span>
                  <span>Co-marketing opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-coin-yellow">•</span>
                  <span>Integration with our platform</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-coin-yellow">•</span>
                  <span>Shared data insights</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-coin-yellow">•</span>
                  <span>Featured content opportunities</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-coin-yellow">Types of Partnerships</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-coin-yellow">•</span>
                  <span>Data providers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-coin-yellow">•</span>
                  <span>Cryptocurrency projects</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-coin-yellow">•</span>
                  <span>Exchanges and wallets</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-coin-yellow">•</span>
                  <span>Educational platforms</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-coin-yellow">•</span>
                  <span>Media and content creators</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6">
            <Button asChild className="bg-coin-yellow text-black hover:bg-coin-yellow/90">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 