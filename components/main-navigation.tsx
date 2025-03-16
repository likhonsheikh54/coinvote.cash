"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  title: string
  href: string
  children?: NavItem[]
  highlight?: boolean
}

// Update the navItems array to include our new pages
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

export default function MainNavigation() {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  return (
    <nav className="hidden md:block">
      <ul className="flex items-center gap-6">
        {navItems.map((item) => (
          <li key={item.title} className="relative group">
            {item.children ? (
              <>
                <button
                  onClick={() => toggleMenu(item.title)}
                  className={`flex items-center gap-1 hover:text-coin-yellow transition ${
                    item.highlight ? "text-coin-green font-semibold" : ""
                  }`}
                >
                  {item.title}
                  <ChevronDown
                    className={cn("h-4 w-4 transition-transform", openMenus[item.title] ? "rotate-180" : "")}
                  />
                </button>
                {openMenus[item.title] && (
                  <div className="absolute left-0 top-full mt-2 w-48 bg-moon-night border border-gray-800 rounded-md shadow-lg z-50">
                    <ul className="py-2">
                      {item.children.map((child) => (
                        <li key={child.title}>
                          <Link href={child.href} className="block px-4 py-2 hover:bg-gray-800 hover:text-coin-yellow">
                            {child.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link
                href={item.href}
                className={`hover:text-coin-yellow transition ${item.highlight ? "text-coin-green font-semibold" : ""}`}
              >
                {item.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

