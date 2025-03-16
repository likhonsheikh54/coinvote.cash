import { Button } from "@/components/ui/button"
import { AppleIcon, AndroidIcon } from "@/components/icons"
import Image from "next/image"

export default function MobileAppBanner() {
  return (
    <div className="bg-gradient-to-r from-[#1a1f25] to-[#0D1217] rounded-lg border border-gray-800 p-6 my-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="md:w-2/3">
          <h2 className="text-2xl font-bold mb-2">Get the Coinvote Mobile App</h2>
          <p className="text-gray-400 mb-4">
            Track prices, vote for your favorite coins, and discover new cryptocurrencies on the go.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-black hover:bg-gray-900 text-white">
              <AppleIcon className="mr-2 h-5 w-5" />
              App Store
            </Button>
            <Button className="bg-black hover:bg-gray-900 text-white">
              <AndroidIcon className="mr-2 h-5 w-5" />
              Google Play
            </Button>
          </div>
        </div>
        <div className="md:w-1/3 flex justify-center">
          <div className="relative h-64 w-32">
            <Image
              src="/placeholder.svg?height=256&width=128"
              alt="Coinvote Mobile App"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

