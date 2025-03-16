import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import { viewport } from "../../viewport"

export const metadata: Metadata = {
  title: "Listing Submitted - Coinvote.cash",
  description: "Your cryptocurrency listing has been submitted successfully and is pending review.",
}

export default function ListingSuccessPage() {
  return (
    <div className="min-h-screen bg-moon-night text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-[#0a0a0a] rounded-lg border border-gray-800 p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>

          <h1 className="text-2xl font-bold mb-4">Listing Submitted Successfully!</h1>

          <p className="text-gray-400 mb-6">
            Thank you for submitting your cryptocurrency for listing on Coinvote.cash. Our team will review your
            submission within 24-48 hours.
          </p>

          <p className="text-gray-400 mb-8">
            You will receive an email notification at the address you provided once your listing has been approved.
          </p>

          <div className="space-y-4">
            <Link href="/">
              <Button className="w-full">Return to Homepage</Button>
            </Link>

            <Link href="/coins">
              <Button variant="outline" className="w-full">
                Browse Coins
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export { viewport }

