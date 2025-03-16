import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page Not Found | Coinvote.cash",
  description: "The page you are looking for doesn't exist or has been moved.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-moon-night flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold text-coin-yellow">404</h1>
        <h2 className="text-2xl font-semibold mt-4 mb-2">Page Not Found</h2>
        <p className="text-gray-400 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-coin-green hover:bg-coin-green/90">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/coins">
              <Search className="mr-2 h-4 w-4" />
              Explore Coins
            </Link>
          </Button>
        </div>

        <div className="mt-12">
          <h3 className="text-lg font-medium mb-4">Popular Pages</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/coins" className="text-coin-yellow hover:underline">
                Cryptocurrency List
              </Link>
            </li>
            <li>
              <Link href="/coins/trending" className="text-coin-yellow hover:underline">
                Trending Coins
              </Link>
            </li>
            <li>
              <Link href="/airdrops" className="text-coin-yellow hover:underline">
                Airdrops
              </Link>
            </li>
            <li>
              <Link href="/listing" className="text-coin-yellow hover:underline">
                List Your Coin
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>
            If you think this is an error, please{" "}
            <Link href="/contact" className="text-coin-yellow hover:underline">
              contact our support team
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

