"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Bell, Search, User } from "lucide-react"
import { useAuth } from "@/lib/context/auth-context"
import { signOutUser } from "@/lib/firebase/auth"
import { clearUserSession } from "@/lib/actions/user-actions"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import MainNavigation from "@/components/main-navigation"
import MobileNavigation from "@/components/mobile-navigation"

export default function Header() {
  const { user, loading } = useAuth()
  const [searchOpen, setSearchOpen] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    await signOutUser()
    await clearUserSession()
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-40 border-b border-gray-800 bg-moon-night">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/coinvote_logo%20%284%29-RJALIv5jzdvjly8H9RWbRcPM0lJK7t.webp"
              alt="Coinvote"
              width={32}
              height={32}
            />
            <span className="font-bold text-xl text-coin-yellow">coinvote</span>
          </Link>

          <MainNavigation />
        </div>

        <div className="flex items-center gap-4">
          {searchOpen ? (
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-[#1e1e1e] rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-coin-yellow w-64"
                autoFocus
                onBlur={() => setSearchOpen(false)}
              />
            </div>
          ) : (
            <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => setSearchOpen(true)}>
              <Search className="h-5 w-5" />
            </Button>
          )}

          {user ? (
            <>
              <Link href="/notifications" className="text-gray-400 hover:text-white">
                <Bell className="h-5 w-5" />
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/portfolio">Portfolio</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  {user.email === process.env.ADMIN_MAIL && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin">Admin Dashboard</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-coin-yellow text-coin-yellow hover:bg-coin-yellow hover:text-black"
              >
                <Link href="/login">Log In</Link>
              </Button>
              <Button size="sm" asChild className="bg-coin-green text-white hover:bg-coin-green/90">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}

          <MobileNavigation user={user} onLogout={handleLogout} />
        </div>
      </div>
    </header>
  )
}

