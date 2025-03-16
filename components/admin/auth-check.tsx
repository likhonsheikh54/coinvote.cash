"use client"

import type React from "react"

import { useAuth } from "@/components/firebase-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

// List of admin emails
const ADMIN_EMAILS = [
  "admin@coinvote.cash",
  // Add more admin emails as needed
]

export default function AdminAuthCheck({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || !ADMIN_EMAILS.includes(user.email || ""))) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-moon-night">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-coin-yellow" />
          <p className="text-lg">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  if (!user || !ADMIN_EMAILS.includes(user.email || "")) {
    return null
  }

  return <>{children}</>
}

