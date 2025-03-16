"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { useState } from "react"

export default function FixLinksPage() {
  const [url, setUrl] = useState("")
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleFixLinks = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/admin/fix-links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      })

      const data = await response.json()

      if (response.ok) {
        setResult({ success: true, message: data.message })
      } else {
        setResult({ success: false, message: data.error || "Failed to fix links" })
      }
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : "An unknown error occurred",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Add a new function to fix all links and images
  const handleFixAll = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/admin/fix-all", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (response.ok) {
        setResult({ success: true, message: data.message })
      } else {
        setResult({ success: false, message: data.error || "Failed to fix all links and images" })
      }
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : "An unknown error occurred",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Fix Links</h1>

      <div className="mb-4">
        <Label htmlFor="url">URL</Label>
        <Input
          id="url"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to fix"
          disabled={isLoading}
        />
      </div>

      {/* Add a new button for fixing all links and images */}
      <div className="flex gap-4">
        <Button onClick={handleFixLinks} disabled={isLoading} className="mb-4">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Fixing Links...
            </>
          ) : (
            "Fix Broken Links"
          )}
        </Button>

        <Button onClick={handleFixAll} disabled={isLoading} variant="outline" className="mb-4">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Fixing All...
            </>
          ) : (
            "Fix All Links & Images"
          )}
        </Button>
      </div>

      {result && <div className={result.success ? "text-green-500" : "text-red-500"}>{result.message}</div>}
    </div>
  )
}

