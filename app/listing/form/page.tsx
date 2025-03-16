"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function ListingFormPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    description: "",
    website: "",
    twitter: "",
    telegram: "",
    contractAddress: "",
    email: "",
  })
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // First, upload the logo to Vercel Blob
      let logoUrl = ""
      if (logoFile) {
        const formData = new FormData()
        formData.append("file", logoFile)

        const uploadResponse = await fetch("/api/upload-logo", {
          method: "POST",
          body: formData,
        })

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload logo")
        }

        const uploadData = await uploadResponse.json()
        logoUrl = uploadData.url
      }

      // Then submit the listing request
      const response = await fetch("/api/listing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          logo: logoUrl,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit listing")
      }

      toast({
        title: "Listing Submitted",
        description: "Your listing has been submitted for review. We'll notify you once it's approved.",
      })

      // Redirect to success page
      router.push("/listing/success")
    } catch (error) {
      console.error("Error submitting listing:", error)
      toast({
        title: "Submission Failed",
        description: "There was a problem submitting your listing. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-moon-night text-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Submit Your <span className="text-coin-yellow">Coin Listing</span>
        </h1>

        <div className="max-w-2xl mx-auto">
          <Card className="bg-[#0a0a0a] border-gray-800">
            <CardHeader>
              <CardTitle>Listing Form</CardTitle>
              <CardDescription>Fill out the details to list your cryptocurrency</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Coin Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Bitcoin"
                        required
                        className="bg-gray-900 border-gray-700"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="symbol">Symbol *</Label>
                      <Input
                        id="symbol"
                        name="symbol"
                        value={formData.symbol}
                        onChange={handleChange}
                        placeholder="e.g. BTC"
                        required
                        className="bg-gray-900 border-gray-700"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Briefly describe your project (max 500 characters)"
                      required
                      className="bg-gray-900 border-gray-700 min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website URL *</Label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://example.com"
                      required
                      className="bg-gray-900 border-gray-700"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter URL</Label>
                      <Input
                        id="twitter"
                        name="twitter"
                        type="url"
                        value={formData.twitter}
                        onChange={handleChange}
                        placeholder="https://twitter.com/youraccount"
                        className="bg-gray-900 border-gray-700"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="telegram">Telegram URL</Label>
                      <Input
                        id="telegram"
                        name="telegram"
                        type="url"
                        value={formData.telegram}
                        onChange={handleChange}
                        placeholder="https://t.me/yourchannel"
                        className="bg-gray-900 border-gray-700"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contractAddress">Contract Address *</Label>
                    <Input
                      id="contractAddress"
                      name="contractAddress"
                      value={formData.contractAddress}
                      onChange={handleChange}
                      placeholder="0x..."
                      required
                      className="bg-gray-900 border-gray-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="logo">Logo (PNG/JPG, min 200x200px) *</Label>
                    <Input
                      id="logo"
                      name="logo"
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={handleFileChange}
                      required
                      className="bg-gray-900 border-gray-700"
                    />
                    <p className="text-xs text-gray-400">
                      Please upload a square logo with transparent background if possible.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Contact Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="bg-gray-900 border-gray-700"
                    />
                    <p className="text-xs text-gray-400">We'll notify you when your listing is approved.</p>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-coin-green hover:bg-coin-green/90" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Listing"}
                </Button>

                <p className="text-xs text-gray-400 text-center">
                  By submitting, you agree to our{" "}
                  <a href="/terms" className="text-blue-400 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-blue-400 hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

