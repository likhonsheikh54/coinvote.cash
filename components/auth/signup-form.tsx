"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Github, MessageCircle } from "lucide-react"
import { signUpWithEmail, signInWithGoogle } from "@/lib/firebase/auth"
import { createOrUpdateUser } from "@/lib/actions/user-actions"
import { toast } from "@/components/ui/use-toast"

export default function SignupForm() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "The passwords you entered do not match.",
        variant: "destructive",
      })
      return
    }

    if (!agreeTerms) {
      toast({
        title: "Terms agreement required",
        description: "You must agree to the terms of service to create an account.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const result = await signUpWithEmail(email, password)

      if (result.success && result.user) {
        // Update user in database with username
        await createOrUpdateUser({
          uid: result.user.uid,
          email: result.user.email || email,
          username: username,
        })

        toast({
          title: "Account created",
          description: "Your account has been created successfully.",
          variant: "default",
        })

        router.push("/")
      } else {
        toast({
          title: "Signup failed",
          description: result.error || "An error occurred during signup.",
          variant: "destructive",
        })
      }
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message || "An unexpected error occurred.",
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
          title: "Account created",
          description: "Your account has been created with Google successfully.",
          variant: "default",
        })
        router.push("/")
      } else {
        toast({
          title: "Signup failed",
          description: result.error || "Could not sign up with Google.",
          variant: "destructive",
        })
      }
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message || "An unexpected error occurred.",
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

          <h1 className="text-2xl font-bold text-center mb-6">Create an account</h1>

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
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="cryptolover"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-[#1a1f25] border-gray-700"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-[#1a1f25] border-gray-700"
                disabled={isLoading}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                required
                disabled={isLoading}
              />
              <Label htmlFor="terms" className="text-sm font-normal">
                I agree to the{" "}
                <Link href="/terms" className="text-coin-yellow hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-coin-yellow hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-coin-green text-white hover:bg-coin-green/90"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Sign up"}
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
            Already have an account?{" "}
            <Link href="/login" className="text-coin-yellow hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

