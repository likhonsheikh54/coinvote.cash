import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Free Listing - Coinvote.cash",
  description: "List your cryptocurrency project on Coinvote.cash for free and get exposure to our active community.",
}

export default function ListingPage() {
  return (
    <div className="min-h-screen bg-moon-night text-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          List Your Coin on <span className="text-coin-yellow">Coinvote.cash</span>
        </h1>

        <div className="max-w-3xl mx-auto">
          <Card className="bg-[#0a0a0a] border-gray-800 mb-8">
            <CardHeader>
              <CardTitle>Free Listing</CardTitle>
              <CardDescription>Get your project listed on Coinvote.cash at no cost</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>We offer free listings for cryptocurrency projects. Follow these steps to get your coin listed:</p>

                <ol className="list-decimal list-inside space-y-2 pl-4">
                  <li>Fill out the listing form with accurate project details</li>
                  <li>Provide links to your website, social media, and contract address</li>
                  <li>Upload a high-quality logo (at least 200x200px)</li>
                  <li>Submit your application for review</li>
                </ol>

                <p className="text-sm text-gray-400 mt-4">
                  Our team will review your submission within 24-48 hours. We reserve the right to reject listings that
                  don't meet our quality standards.
                </p>

                <div className="mt-6">
                  <Link href="/listing/form">
                    <Button className="w-full bg-coin-green hover:bg-coin-green/90">Start Free Listing</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0a0a0a] border-gray-800">
            <CardHeader>
              <CardTitle>Premium Listing</CardTitle>
              <CardDescription>Get additional exposure with our premium options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>Upgrade to a premium listing to get more visibility for your project:</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Promoted Listing</h3>
                    <p className="text-sm text-gray-400 mb-2">
                      Your coin will appear in the "Promoted Coins" section for 7 days.
                    </p>
                    <p className="font-bold">0.1 ETH</p>
                  </div>

                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Featured Listing</h3>
                    <p className="text-sm text-gray-400 mb-2">
                      Your coin will be featured on the homepage banner for 3 days.
                    </p>
                    <p className="font-bold">0.25 ETH</p>
                  </div>
                </div>

                <p className="text-sm text-gray-400 mt-4">
                  Contact us at{" "}
                  <a href="mailto:admin@coinvote.cash" className="text-blue-400 hover:underline">
                    admin@coinvote.cash
                  </a>{" "}
                  for premium listing options.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

