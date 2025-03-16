"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export function CoinVotingSection({ coinId, symbol }: { coinId: string; symbol: string }) {
  const [votes, setVotes] = useState(0)
  const [hasVoted, setHasVoted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Check if user has already voted
    const hasVotedBefore = localStorage.getItem(`voted_${coinId}`) === "true"
    setHasVoted(hasVotedBefore)

    // Fetch current vote count
    async function fetchVotes() {
      try {
        const response = await fetch(`/api/coins/${symbol.toLowerCase()}/votes`)
        if (response.ok) {
          const data = await response.json()
          setVotes(data.votes)
        }
      } catch (error) {
        console.error("Error fetching votes:", error)
      }
    }

    fetchVotes()
  }, [coinId, symbol])

  const handleVote = async () => {
    if (hasVoted) return

    setIsLoading(true)

    try {
      const response = await fetch(`/api/coins/${symbol.toLowerCase()}/votes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coinId }),
      })

      if (!response.ok) {
        throw new Error("Failed to vote")
      }

      const data = await response.json()
      setVotes(data.votes)
      setHasVoted(true)

      // Store in localStorage to remember the vote
      localStorage.setItem(`voted_${coinId}`, "true")

      toast({
        title: "Vote Successful",
        description: `You have successfully voted for ${symbol}`,
      })
    } catch (error) {
      console.error("Error voting:", error)
      toast({
        title: "Vote Failed",
        description: "There was a problem submitting your vote. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vote for {symbol}</CardTitle>
        <CardDescription>Show your support by voting for this coin</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="text-4xl font-bold mb-4">{votes.toLocaleString()}</div>
          <Button onClick={handleVote} disabled={hasVoted || isLoading} className="w-full">
            {isLoading ? "Processing..." : hasVoted ? "Already Voted" : "Vote Now"}
          </Button>
          <p className="text-xs text-gray-500 mt-2">You can vote once every 24 hours</p>
        </div>
      </CardContent>
    </Card>
  )
}

