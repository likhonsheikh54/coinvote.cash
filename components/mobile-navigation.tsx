"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown, ChevronRight, Search, User, LogOut, Settings, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { User as FirebaseUser } from "firebase/auth"

interface NavItem {
  title: string
  href: string
  children?: NavItem[]
  highlight?: boolean
}

interface MobileNavigationProps {
  user: FirebaseUser | null
  onLogout: () => void
}

const navItems: NavItem[] = [
  {
    title: "Listing",
    href: "/listing",
    highlight: true,
    children: [
      { title: "Free", href: "/listing/free" },
      { title: "Premium", href: "/listing/premium" },
      { title: "Promoted", href: "/listing/promoted" },
    ],
  },
  {
    title: "Coin",
    href: "/coins",
    children: [
      { title: "All Coins", href: "/coins" },
      { title: "Recently Listed", href: "/coins/recently-listed" },
      { title: "Trending", href: "/coins/trending" },
      { title: "Most Voted", href: "/coins/most-voted" },
      { title: "Presales", href: "/coins/presales" },
    ],
  },
  {
    title: "NFT",
    href: "/nft",
    children: [
      { title: "All NFTs", href: "/nft" },
      { title: "Collections", href: "/nft/collections" },
      { title: "Trending", href: "/nft/trending" },
    ],
  },
  {
    title: "Airdrop",
    href: "/airdrops",
    children: [
      { title: "All Airdrops", href: "/airdrops" },
      { title: "Active", href: "/airdrops/active" },
      { title: "Upcoming", href: "/airdrops/upcoming" },
      { title: "Ended", href: "/airdrops/ended" },
    ],
  },
  {
    title: "ICO",
    href: "/icos",
    children: [
      { title: "All ICOs", href: "/icos" },
      { title: "Active", href: "/icos/active" },
      { title: "Upcoming", href: "/icos/upcoming" },
      { title: "Ended", href: "/icos/ended" },
    ],
  },
  {
    title: "Article",
    href: "/articles",
  },
  {
    title: "Other",
    href: "#",
    children: [
      { title: "Tools", href: "/tools" },
      { title: "Events", href: "/events" },
      { title: "DEX Explorer", href: "/dex" },
      { title: "Meme Explorer", href: "/meme-explorer" },
      { title: "Top Traders", href: "/top-traders" },
    ],
  },
  { title: "Advertising", href: "/advertising" },
  { title: "Partners", href: "/partners" },
]

export default function MobileNavigation({ user, onLogout }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const toggleItem = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  return (
    <div className="md:hidden">
      <button onClick={toggleMenu} className="p-2 text-white focus:outline-none" aria-label="Toggle menu">
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-moon-night overflow-y-auto">
          <div className="flex justify-between items-center p-4 border-b border-gray-800">
            <Link href="/" className="flex items-center gap-2" onClick={toggleMenu}>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/OIP%20%2833%29.jpg-FzLn4UDBNmGuzbLEPBNPdJVbdQ1f5y.jpeg"
                alt="Coinvote"
                width={32}
                height={32}
              />
              <span className="font-bold text-xl text-coin-yellow">coinvote</span>
            </Link>
            <button onClick={toggleMenu} className="p-2 text-white focus:outline-none" aria-label="Close menu">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-4 border-b border-gray-800">
            {user ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">{user.displayName || user.email}</div>
                    <div className="text-xs text-gray-400">{user.email}</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-2" asChild>
                    <Link href="/portfolio" onClick={toggleMenu}>
                      <CreditCard className="h-4 w-4" /> Portfolio
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-2" asChild>
                    <Link href="/settings" onClick={toggleMenu}>
                      <Settings className="h-4 w-4" /> Settings
                    </Link>
                  </Button>
                </div>

                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full flex items-center gap-2 bg-red-900 hover:bg-red-800"
                  onClick={() => {
                    onLogout()
                    toggleMenu()
                  }}
                >
                  <LogOut className="h-4 w-4" /> Log Out
                </Button>
              </div>
            ) : (
              <div className="flex gap-2 mb-4">
                <Button
                  variant="outline"
                  className="flex-1 border-coin-yellow text-coin-yellow hover:bg-coin-yellow hover:text-black"
                  asChild
                >
                  <Link href="/login" onClick={toggleMenu}>
                    Log In
                  </Link>
                </Button>
                <Button className="flex-1 bg-coin-green text-white hover:bg-coin-green/90" asChild>
                  <Link href="/signup" onClick={toggleMenu}>
                    Sign Up
                  </Link>
                </Button>
              </div>
            )}

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-[#1e1e1e] rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-coin-yellow"
              />
            </div>
          </div>

          <nav className="p-4">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.title} className="border-b border-gray-800 pb-2">
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => toggleItem(item.title)}
                        className={cn(
                          "flex items-center justify-between w-full py-2",
                          item.highlight ? "text-coin-green font-semibold" : "text-white",
                        )}
                      >
                        <span>{item.title}</span>
                        {expandedItems[item.title] ? (
                          <ChevronDown className="h-5 w-5" />
                        ) : (
                          <ChevronRight className="h-5 w-5" />
                        )}
                      </button>

                      {expandedItems[item.title] && (
                        <ul className="pl-4 mt-2 space-y-2">
                          {item.children.map((child) => (
                            <li key={child.title}>
                              <Link
                                href={child.href}
                                className="flex items-center py-2 text-gray-300 hover:text-coin-yellow"
                                onClick={toggleMenu}
                              >
                                <ChevronRight className="h-4 w-4 mr-2" />
                                {child.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "block py-2 hover:text-coin-yellow",
                        item.highlight ? "text-coin-green font-semibold" : "text-white",
                      )}
                      onClick={toggleMenu}
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  )
}

