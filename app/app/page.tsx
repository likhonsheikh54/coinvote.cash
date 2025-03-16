import { Button } from "@/components/ui/button"
import { Apple, SmartphoneIcon as Android, Star, Download, Smartphone, Globe, Shield } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: "Coinvote Mobile App | Coinvote.xyz",
  description:
    "Download the Coinvote mobile app to track cryptocurrencies, vote for projects, and discover new opportunities on the go.",
}

export default function AppPage() {
  return (
    <div className="min-h-screen bg-moon-night text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Coinvote <span className="text-coin-yellow">Mobile App</span>
            </h1>
            <p className="text-gray-300 text-lg mb-6">
              Whether you're a seasoned investor or new to the crypto space, Coinvote provides an unparalleled
              opportunity to explore and find the next rising star in the market early.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-black hover:bg-black/90 text-white">
                <Apple className="mr-2 h-5 w-5" />
                <Link href="https://apps.apple.com/app/coinvote/id123456789">Download for iOS</Link>
              </Button>
              <Button size="lg" className="bg-[#3DDC84] hover:bg-[#3DDC84]/90 text-black">
                <Android className="mr-2 h-5 w-5" />
                <Link href="https://play.google.com/store/apps/details?id=com.coinvote.app">Download for Android</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=250"
                alt="Coinvote Mobile App"
                width={250}
                height={500}
                className="rounded-2xl shadow-lg"
              />
              <div className="absolute -right-4 -bottom-4 bg-coin-yellow text-black px-3 py-1 rounded-full text-sm font-bold">
                New!
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">App Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#0D1217] rounded-lg border border-gray-800 p-6 hover:border-coin-yellow transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-coin-yellow/20 p-3 rounded-lg">
                  <Star className="h-6 w-6 text-coin-yellow" />
                </div>
                <h3 className="text-xl font-bold">Vote on the Go</h3>
              </div>
              <p className="text-gray-300">
                Vote for your favorite cryptocurrencies anytime, anywhere. Support promising projects and help them gain
                visibility.
              </p>
            </div>

            <div className="bg-[#0D1217] rounded-lg border border-gray-800 p-6 hover:border-coin-yellow transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-coin-yellow/20 p-3 rounded-lg">
                  <Globe className="h-6 w-6 text-coin-yellow" />
                </div>
                <h3 className="text-xl font-bold">Discover New Gems</h3>
              </div>
              <p className="text-gray-300">
                Explore trending and newly listed cryptocurrencies. Find potential gems before they hit mainstream
                exchanges.
              </p>
            </div>

            <div className="bg-[#0D1217] rounded-lg border border-gray-800 p-6 hover:border-coin-yellow transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-coin-yellow/20 p-3 rounded-lg">
                  <Shield className="h-6 w-6 text-coin-yellow" />
                </div>
                <h3 className="text-xl font-bold">Security Analysis</h3>
              </div>
              <p className="text-gray-300">
                Access detailed security analysis for cryptocurrencies. Make informed decisions with our risk assessment
                tools.
              </p>
            </div>
          </div>
        </div>

        {/* App Info Section */}
        <div className="bg-[#0D1217] rounded-lg border border-gray-800 p-8 mb-16">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="md:w-1/3">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Coinvote App Icon"
                width={300}
                height={300}
                className="rounded-2xl"
              />
            </div>
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-4">App Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-sm text-gray-400">Category</h3>
                  <p>Finance</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400">Size</h3>
                  <p>8.7 MB</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400">Compatibility</h3>
                  <p>iOS 13.0 or later, Android 8.0 or later</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400">Languages</h3>
                  <p>English</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400">Age Rating</h3>
                  <p>4+</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400">Copyright</h3>
                  <p>© 2024 COINVOTE</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-coin-yellow" fill="currentColor" />
                  ))}
                </div>
                <span className="text-lg font-bold">4.8</span>
                <span className="text-gray-400">(1,234 ratings)</span>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-coin-yellow text-black hover:bg-coin-yellow/90">
                  <Download className="mr-2 h-5 w-5" />
                  Download Now
                </Button>
                <Button size="lg" variant="outline">
                  <Smartphone className="mr-2 h-5 w-5" />
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Screenshots Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">App Screenshots</h2>

          <div className="flex overflow-x-auto gap-4 pb-4">
            {[1, 2, 3, 4, 5].map((screenshot) => (
              <div key={screenshot} className="flex-shrink-0">
                <Image
                  src={`/placeholder.svg?height=500&width=230&text=Screenshot+${screenshot}`}
                  alt={`App Screenshot ${screenshot}`}
                  width={230}
                  height={500}
                  className="rounded-xl shadow-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-[#0D1217] rounded-lg border border-gray-800 p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            Download the Coinvote app today and join thousands of crypto enthusiasts discovering new opportunities on
            the go.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-black hover:bg-black/90 text-white">
              <Apple className="mr-2 h-5 w-5" />
              <Link href="https://apps.apple.com/app/coinvote/id123456789">Download for iOS</Link>
            </Button>
            <Button size="lg" className="bg-[#3DDC84] hover:bg-[#3DDC84]/90 text-black">
              <Android className="mr-2 h-5 w-5" />
              <Link href="https://play.google.com/store/apps/details?id=com.coinvote.app">Download for Android</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

