"use client"

import type React from "react"
import { createContext, useState, useEffect, useContext } from "react"
import type { User } from "firebase/auth"
import { onAuthStateChange } from "@/lib/firebase/auth"
import { createOrUpdateUser, setUserSession, clearUserSession } from "@/lib/actions/user-actions"
import { useRouter } from "next/navigation"

type AuthContextType = {
  user: User | null
  loading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (authUser) => {
      setLoading(true)

      try {
        if (authUser) {
          // User is signed in
          setUser(authUser)

          // Update user in database
          await createOrUpdateUser({
            uid: authUser.uid,
            email: authUser.email || "",
            username: authUser.displayName || undefined,
          })

          // Set session cookie
          await setUserSession(authUser)
        } else {
          // User is signed out
          setUser(null)
          await clearUserSession()
        }
      } catch (err) {
        console.error("Auth state change error:", err)
        setError("Authentication error")
      } finally {
        setLoading(false)
      }
    })

    // Unsubscribe on cleanup
    return () => unsubscribe()
  }, [])

  return <AuthContext.Provider value={{ user, loading, error }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

