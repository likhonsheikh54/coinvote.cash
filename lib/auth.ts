"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth"
import { app } from "./firebase"

interface User {
  uid: string
  email: string | null
  isAdmin: boolean
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const auth = getAuth(app)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch user data from our database to check if admin
        try {
          const response = await fetch(`/api/users/${firebaseUser.uid}`)
          const userData = await response.json()

          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            isAdmin: userData.isAdmin || false,
          })
        } catch (error) {
          console.error("Error fetching user data:", error)
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            isAdmin: false,
          })
        }
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [auth])

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const signUp = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password)
  }

  const signOut = async () => {
    await firebaseSignOut(auth)
  }

  return <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

// Add the missing exports
export const isAdmin = async (userId: string): Promise<boolean> => {
  try {
    const response = await fetch(`/api/users/${userId}`)
    const userData = await response.json()
    return userData.isAdmin || false
  } catch (error) {
    console.error("Error checking admin status:", error)
    return false
  }
}

export const getAuthSession = async () => {
  const auth = getAuth(app)
  return new Promise<User | null>((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      unsubscribe()
      if (firebaseUser) {
        try {
          const response = await fetch(`/api/users/${firebaseUser.uid}`)
          const userData = await response.json()
          resolve({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            isAdmin: userData.isAdmin || false,
          })
        } catch (error) {
          console.error("Error fetching user data:", error)
          resolve({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            isAdmin: false,
          })
        }
      } else {
        resolve(null)
      }
    })
  })
}

