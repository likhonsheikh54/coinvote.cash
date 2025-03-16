import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: "About Us | Coinvote.cash",
  description: "Learn about Coinvote.cash, our mission, and our team",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About Coinvote.cash</h1>

        <div className="bg-[#0D1217] rounded-lg border border-gray-800 p-8 space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4 text-coin-yellow">Our Mission</h2>
            <p className="text-gray-300 mb-4">
              Coinvote.cash is a leading cryptocurrency aggregation platform, dedicated to spotlighting early-stage
              tokens, NFTs, and meme coins with high potential. Our mission is to provide a community-driven platform
              where users can discover, vote for, and track promising cryptocurrency projects.
            </p>
            <p className="text-gray-300 mb-4">
              We believe in the power of community wisdom and aim to create a transparent ecosystem where quality
              projects can gain visibility based on merit rather than marketing budgets. By enabling users to vote and
              engage with projects, we help surface the most promising opportunities in the crypto space.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-coin-yellow">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#121212] p-6 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Comprehensive Listings</h3>
                <p className="text-gray-300">
                  We track thousands of cryptocurrencies, NFT collections, airdrops, and ICOs, providing detailed
                  information and real-time data.
                </p>
              </div>
              <div className="bg-[#121212] p-6 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Community Voting</h3>
                <p className="text-gray-300">
                  Our platform allows users to vote for their favorite projects, helping to surface the most promising
                  opportunities.
                </p>
              </div>
              <div className="bg-[#121212] p-6 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Security Analysis</h3>
                <p className="text-gray-300">
                  We provide security insights and risk assessments to help users make informed decisions about
                  potential investments.
                </p>
              </div>
              <div className="bg-[#121212] p-6 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Market Insights</h3>
                <p className="text-gray-300">
                  Stay updated with the latest trends, market movements, and emerging opportunities in the crypto space.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-coin-yellow">Our Story</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/OIP%20%2833%29.jpg-cdAakgmE2zqO9ExCS44AOmSWe1FDJz.jpeg"
                  alt="Coinvote Logo"
                  width={200}
                  height={200}
                  className="mx-auto"
                />
              </div>
              <div className="md:w-2/3">
                <p className="text-gray-300 mb-4">
                  Coinvote.cash was founded in 2023 by a team of cryptocurrency enthusiasts and blockchain developers
                  who saw the need for a more community-driven approach to discovering promising crypto projects.
                </p>
                <p className="text-gray-300 mb-4">
                  In a space often dominated by marketing hype and paid promotions, we wanted to create a platform where
                  quality projects could be discovered based on community sentiment and objective metrics rather than
                  advertising budgets.
                </p>
                <p className="text-gray-300">
                  Since our launch, we've grown to become one of the most trusted platforms for cryptocurrency
                  discovery, with a vibrant community of over 870,000 active users and more than 15,000 listed projects.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-coin-yellow">Join Our Community</h2>
            <p className="text-gray-300 mb-6">
              Become part of our growing community and stay updated with the latest developments in the cryptocurrency
              space. Follow us on social media and join our Telegram channel for real-time updates and discussions.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://t.me/coinvotecash"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0088cc] hover:bg-[#0088cc]/90 text-white px-4 py-2 rounded-md flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z" />
                </svg>
                Telegram
              </a>
              <a
                href="https://github.com/coinvotecash"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#333] hover:bg-[#333]/90 text-white px-4 py-2 rounded-md flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
                GitHub
              </a>
              <Link href="/contact" className="bg-coin-green hover:bg-coin-green/90 text-white px-4 py-2 rounded-md">
                Contact Us
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

