"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Github, MessageCircle } from "lucide-react"
import { signInWithEmail, signInWithGoogle } from "@/lib/firebase/auth"
import { toast } from "@/components/ui/use-toast"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signInWithEmail(email, password)

      if (result.success) {
        toast({
          title: "Login successful",
          description: "You have been logged in successfully.",
          variant: "default",
        })
        router.push("/")
      } else {
        toast({
          title: "Login failed",
          description: result.error || "Please check your credentials and try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      const result = await signInWithGoogle()

      if (result.success) {
        toast({
          title: "Login successful",
          description: "You have been logged in with Google successfully.",
          variant: "default",
        })
        router.push("/")
      } else {
        toast({
          title: "Login failed",
          description: result.error || "Could not sign in with Google. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-moon-night px-4">
      <div className="w-full max-w-md">
        <div className="bg-[#0D1217] rounded-lg border border-gray-800 p-8">
          <div className="flex justify-center mb-6">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/OIP%20%2833%29.jpg-FzLn4UDBNmGuzbLEPBNPdJVbdQ1f5y.jpeg"
              alt="Coinvote"
              width={64}
              height={64}
            />
          </div>

          <h1 className="text-2xl font-bold text-center mb-6">Log in to Coinvote</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#1a1f25] border-gray-700"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-xs text-coin-yellow hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-[#1a1f25] border-gray-700"
                disabled={isLoading}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                disabled={isLoading}
              />
              <Label htmlFor="remember" className="text-sm font-normal">
                Remember me
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-coin-yellow text-black hover:bg-coin-yellow/90"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log in"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#0D1217] px-2 text-gray-400">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="border-gray-700 hover:bg-gray-800"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            <Button
              variant="outline"
              className="border-gray-700 hover:bg-gray-800"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Telegram
            </Button>
          </div>

          <p className="text-center mt-6 text-sm text-gray-400">
            Don't have an account?{" "}
            <Link href="/signup" className="text-coin-yellow hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

