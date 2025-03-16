"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Users,
  Coins,
  ImageIcon,
  Gift,
  Rocket,
  FileText,
  Settings,
  Home,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { useState } from "react"
import Image from "next/image"

interface SidebarItem {
  title: string
  href: string
  icon: React.ReactNode
  submenu?: SidebarItem[]
}

const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Coins",
    href: "/admin/coins",
    icon: <Coins className="h-5 w-5" />,
    submenu: [
      {
        title: "All Coins",
        href: "/admin/coins",
        icon: <ChevronRight className="h-4 w-4" />,
      },
      {
        title: "Add New",
        href: "/admin/coins/new",
        icon: <ChevronRight className="h-4 w-4" />,
      },
      {
        title: "Pending",
        href: "/admin/coins/pending",
        icon: <ChevronRight className="h-4 w-4" />,
      },
    ],
  },
  {
    title: "NFTs",
    href: "/admin/nfts",
    icon: <ImageIcon className="h-5 w-5" />,
    submenu: [
      {
        title: "All NFTs",
        href: "/admin/nfts",
        icon: <ChevronRight className="h-4 w-4" />,
      },
      {
        title: "Add New",
        href: "/admin/nfts/new",
        icon: <ChevronRight className="h-4 w-4" />,
      },
      {
        title: "Pending",
        href: "/admin/nfts/pending",
        icon: <ChevronRight className="h-4 w-4" />,
      },
    ],
  },
  {
    title: "Airdrops",
    href: "/admin/airdrops",
    icon: <Gift className="h-5 w-5" />,
  },
  {
    title: "ICOs",
    href: "/admin/icos",
    icon: <Rocket className="h-5 w-5" />,
  },
  {
    title: "Articles",
    href: "/admin/articles",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: <Settings className="h-5 w-5" />,
  },
  {
    title: "SEO Tools",
    href: "/admin/seo",
    icon: <BarChart3 className="h-5 w-5" />,
    submenu: [
      {
        title: "SEO Dashboard",
        href: "/admin/seo",
        icon: <ChevronRight className="h-4 w-4" />,
      },
      {
        title: "Fix Links",
        href: "/admin/fix-links",
        icon: <ChevronRight className="h-4 w-4" />,
      },
      {
        title: "Monitoring",
        href: "/admin/seo/monitoring",
        icon: <ChevronRight className="h-4 w-4" />,
      },
      {
        title: "Recommendations",
        href: "/admin/seo/recommendations",
        icon: <ChevronRight className="h-4 w-4" />,
      },
      {
        title: "Competitor Analysis",
        href: "/admin/seo/competitors",
        icon: <ChevronRight className="h-4 w-4" />,
      },
    ],
  },
  {
    title: "View Site",
    href: "/",
    icon: <Home className="h-5 w-5" />,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})

  const toggleItem = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  return (
    <aside className="w-64 bg-[#0D1217] border-r border-gray-800 h-screen overflow-y-auto">
      <div className="p-4 border-b border-gray-800">
        <Link href="/admin" className="flex items-center gap-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/OIP%20%2833%29.jpg-cdAakgmE2zqO9ExCS44AOmSWe1FDJz.jpeg"
            alt="Coinvote"
            width={32}
            height={32}
          />
          <span className="font-bold text-xl text-coin-yellow">coinvote</span>
          <span className="text-xs bg-coin-green px-2 py-0.5 rounded text-white">Admin</span>
        </Link>
      </div>

      <nav className="p-4">
        <ul className="space-y-1">
          {sidebarItems.map((item) => (
            <li key={item.title}>
              {item.submenu ? (
                <div>
                  <button
                    onClick={() => toggleItem(item.title)}
                    className={cn(
                      "flex items-center justify-between w-full p-2 rounded-md",
                      pathname.startsWith(item.href) ? "bg-gray-800 text-coin-yellow" : "hover:bg-gray-800/50",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                    {expandedItems[item.title] ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>

                  {expandedItems[item.title] && (
                    <ul className="mt-1 ml-6 space-y-1">
                      {item.submenu.map((subitem) => (
                        <li key={subitem.title}>
                          <Link
                            href={subitem.href}
                            className={cn(
                              "flex items-center gap-3 p-2 rounded-md",
                              pathname === subitem.href ? "bg-gray-800 text-coin-yellow" : "hover:bg-gray-800/50",
                            )}
                          >
                            {subitem.icon}
                            <span>{subitem.title}</span>
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
                    "flex items-center gap-3 p-2 rounded-md",
                    pathname === item.href ? "bg-gray-800 text-coin-yellow" : "hover:bg-gray-800/50",
                  )}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

