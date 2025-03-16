import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
      <p className="text-gray-400 mb-8 max-w-md">
        The DEX pair or token you're looking for doesn't exist or has been removed.
      </p>
      <Link href="/dex">
        <Button className="bg-[#FFDD33] text-black hover:bg-[#FFDD33]/90">Return to DEX Explorer</Button>
      </Link>
    </div>
  )
}

