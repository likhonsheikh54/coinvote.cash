"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { addCoin } from "@/lib/actions/coin-actions"

export default function NewCoinPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    logo: "",
    description: "",
    website: "",
    twitter: "",
    telegram: "",
    github: "",
    contract_address: "",
    chain: "",
    market_cap: "",
    price: "",
    change_24h: "",
    is_verified: false,
    is_promoted: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Convert numeric strings to numbers
      const coinData = {
        ...formData,
        market_cap: formData.market_cap ? Number.parseFloat(formData.market_cap) : 0,
        price: formData.price ? Number.parseFloat(formData.price) : 0,
        change_24h: formData.change_24h ? Number.parseFloat(formData.change_24h) : 0,
      }

      const result = await addCoin(coinData)

      if (result.success) {
        toast({
          title: "Coin added successfully",
          description: "The new coin has been added to the database",
        })
        router.push("/admin/coins")
      } else {
        toast({
          title: "Error adding coin",
          description: result.error || "There was a problem adding the coin",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error adding coin:", error)
      toast({
        title: "Error adding coin",
        description: "There was a problem adding the coin",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Add New Coin</h1>
      </div>

      <div className="bg-[#0D1217] rounded-lg border border-gray-800 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Coin Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="bg-[#1a1f25] border-gray-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="symbol">Symbol *</Label>
              <Input
                id="symbol"
                name="symbol"
                value={formData.symbol}
                onChange={handleInputChange}
                required
                className="bg-[#1a1f25] border-gray-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo">Logo URL</Label>
              <Input
                id="logo"
                name="logo"
                value={formData.logo}
                onChange={handleInputChange}
                className="bg-[#1a1f25] border-gray-700"
                placeholder="https://example.com/logo.png"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="chain">Blockchain</Label>
              <Input
                id="chain"
                name="chain"
                value={formData.chain}
                onChange={handleInputChange}
                className="bg-[#1a1f25] border-gray-700"
                placeholder="e.g. Ethereum, Binance Smart Chain, Solana"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contract_address">Contract Address</Label>
              <Input
                id="contract_address"
                name="contract_address"
                value={formData.contract_address}
                onChange={handleInputChange}
                className="bg-[#1a1f25] border-gray-700"
                placeholder="0x..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (USD)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.000000000001"
                value={formData.price}
                onChange={handleInputChange}
                className="bg-[#1a1f25] border-gray-700"
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="market_cap">Market Cap (USD)</Label>
              <Input
                id="market_cap"
                name="market_cap"
                type="number"
                value={formData.market_cap}
                onChange={handleInputChange}
                className="bg-[#1a1f25] border-gray-700"
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="change_24h">24h Change (%)</Label>
              <Input
                id="change_24h"
                name="change_24h"
                type="number"
                step="0.01"
                value={formData.change_24h}
                onChange={handleInputChange}
                className="bg-[#1a1f25] border-gray-700"
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="bg-[#1a1f25] border-gray-700 min-h-[120px]"
                placeholder="Enter a detailed description of the coin..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website URL</Label>
              <Input
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="bg-[#1a1f25] border-gray-700"
                placeholder="https://example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter URL</Label>
              <Input
                id="twitter"
                name="twitter"
                value={formData.twitter}
                onChange={handleInputChange}
                className="bg-[#1a1f25] border-gray-700"
                placeholder="https://twitter.com/example"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telegram">Telegram URL</Label>
              <Input
                id="telegram"
                name="telegram"
                value={formData.telegram}
                onChange={handleInputChange}
                className="bg-[#1a1f25] border-gray-700"
                placeholder="https://t.me/example"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="github">GitHub URL</Label>
              <Input
                id="github"
                name="github"
                value={formData.github}
                onChange={handleInputChange}
                className="bg-[#1a1f25] border-gray-700"
                placeholder="https://github.com/example"
              />
            </div>

            <div className="flex flex-col gap-4 justify-end">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_verified"
                  checked={formData.is_verified}
                  onCheckedChange={(checked) => handleCheckboxChange("is_verified", checked as boolean)}
                />
                <Label htmlFor="is_verified" className="font-normal">
                  Verified Coin
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_promoted"
                  checked={formData.is_promoted}
                  onCheckedChange={(checked) => handleCheckboxChange("is_promoted", checked as boolean)}
                />
                <Label htmlFor="is_promoted" className="font-normal">
                  Promoted Coin
                </Label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" className="bg-coin-green hover:bg-coin-green/90" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Coin"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

