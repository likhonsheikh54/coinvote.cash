import Link from "next/link"
import Image from "next/image"
import { Github, MessageCircle } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/OIP%20%2833%29.jpg-cdAakgmE2zqO9ExCS44AOmSWe1FDJz.jpeg"
                alt="Coinvote"
                width={32}
                height={32}
              />
              <span className="font-bold text-xl text-coin-yellow">coinvote</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Coinvote.cash is a leading cryptocurrency aggregation platform, spotlighting early-stage tokens, NFTs, and
              meme coins with high potential. Beyond daily listings, it offers exclusive insights into airdrops, ICOs,
              and key crypto events.
            </p>
            <div className="flex gap-4">
              <a
                href="https://t.me/coinvotecash"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition-colors"
                aria-label="Telegram"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/coinvotecash"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-coin-yellow">Explore</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/coins-list" className="hover:text-coin-green">
                  Cryptocurrencies
                </Link>
              </li>
              <li>
                <Link href="/nft" className="hover:text-coin-green">
                  NFTs
                </Link>
              </li>
              <li>
                <Link href="/airdrops" className="hover:text-coin-green">
                  Airdrops
                </Link>
              </li>
              <li>
                <Link href="/icos" className="hover:text-coin-green">
                  ICOs
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-coin-green">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/eth-wars" className="hover:text-coin-green">
                  ETH Wars
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-coin-yellow">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/listing/free" className="hover:text-coin-green">
                  Free Listing
                </Link>
              </li>
              <li>
                <Link href="/listing/premium" className="hover:text-coin-green">
                  Premium Listing
                </Link>
              </li>
              <li>
                <Link href="/advertising" className="hover:text-coin-green">
                  Advertising
                </Link>
              </li>
              <li>
                <Link href="/partners" className="hover:text-coin-green">
                  Partners
                </Link>
              </li>
              <li>
                <Link href="/bug-bounty" className="hover:text-coin-green">
                  Bug Bounty
                </Link>
              </li>
              <li>
                <a
                  href="https://t.me/PyCommander"
                  className="hover:text-coin-green"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-coin-yellow">About</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/about" className="hover:text-coin-green">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-coin-green">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-coin-green">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-coin-green">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/ad-policy" className="hover:text-coin-green">
                  Ad Policy
                </Link>
              </li>
              <li>
                <Link href="/cookie-preferences" className="hover:text-coin-green">
                  Cookie Preferences
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="text-sm text-gray-400 mb-6">
            <p className="mb-4">
              <strong>IMPORTANT DISCLAIMER:</strong> All content provided herein our website, hyperlinked sites,
              associated applications, forums, blogs, social media accounts and other platforms ("Site") is for your
              general information only, procured from third party sources. We make no warranties of any kind in relation
              to our content, including but not limited to accuracy and updatedness. No part of the content that we
              provide constitutes financial advice, legal advice or any other form of advice meant for your specific
              reliance for any purpose. Any use or reliance on our content is solely at your own risk and discretion.
              You should conduct your own research, review, analyse and verify our content before relying on them.
              Trading is a highly risky activity that can lead to major losses, please therefore consult your financial
              advisor before making any decision. No content on our Site is meant to be a solicitation or offer.
            </p>

            <p>
              Coinvote tracks community growth, open-source code development, major events and on-chain metrics.
              Coinvote is a leading cryptocurrency aggregation platform, spotlighting early-stage tokens, NFTs, and meme
              coins with high potential. Beyond daily listings, it offers exclusive insights into airdrops, ICOs, and
              key crypto events. With advanced security analysis and portfolio management tools, users can effortlessly
              track and engage with promising projects. Standing as a community-centric platform, enabling users to
              explore, vote, and directly influence project visibility.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">© 2025 Coinvote.cash. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <a
                href="https://t.me/coinvotecash"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-coin-yellow"
                aria-label="Telegram"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/coinvotecash"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-coin-yellow"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

