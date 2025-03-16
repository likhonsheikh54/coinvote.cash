"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, AlertTriangle, AlertCircle, Lightbulb, ArrowRight } from "lucide-react"
import Link from "next/link"
import { getSeoRecommendations } from "@/lib/actions/seo-monitoring"

export default function SeoRecommendationsPage() {
  const [loading, setLoading] = useState(true)
  const [recommendations, setRecommendations] = useState({
    critical: [],
    important: [],
    opportunities: [],
  })

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const data = await getSeoRecommendations()
        setRecommendations(data)
      } catch (error) {
        console.error("Error fetching recommendations:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getImpactBadge = (impact) => {
    switch (impact) {
      case "high":
        return <Badge className="bg-red-500">High Impact</Badge>
      case "medium":
        return <Badge className="bg-yellow-500">Medium Impact</Badge>
      case "low":
        return <Badge className="bg-blue-500">Low Impact</Badge>
      default:
        return null
    }
  }

  const getEffortBadge = (effort) => {
    switch (effort) {
      case "high":
        return (
          <Badge variant="outline" className="border-red-200 text-red-700 dark:text-red-300">
            High Effort
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="border-yellow-200 text-yellow-700 dark:text-yellow-300">
            Medium Effort
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="border-green-200 text-green-700 dark:text-green-300">
            Low Effort
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="container p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">SEO Recommendations</h1>
        <Button variant="outline" onClick={() => window.location.reload()}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin text-coin-yellow" />
          <span className="ml-2">Loading recommendations...</span>
        </div>
      ) : (
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
              Critical Issues
            </h2>
            {recommendations.critical.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-gray-500">No critical issues found.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {recommendations.critical.map((rec) => (
                  <Card key={rec.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{rec.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-gray-500">{rec.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {getImpactBadge(rec.impact)}
                          {getEffortBadge(rec.effort)}
                        </div>
                        <Link href={rec.url}>
                          <Button size="sm">
                            Fix Issue
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-yellow-500" />
              Important Issues
            </h2>
            {recommendations.important.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-gray-500">No important issues found.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {recommendations.important.map((rec) => (
                  <Card key={rec.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{rec.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-gray-500">{rec.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {getImpactBadge(rec.impact)}
                          {getEffortBadge(rec.effort)}
                        </div>
                        <Link href={rec.url}>
                          <Button size="sm" variant="outline">
                            View Issue
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Lightbulb className="h-5 w-5 mr-2 text-blue-500" />
              Opportunities
            </h2>
            {recommendations.opportunities.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-gray-500">No opportunities found.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {recommendations.opportunities.map((rec) => (
                  <Card key={rec.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{rec.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-gray-500">{rec.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {getImpactBadge(rec.impact)}
                          {getEffortBadge(rec.effort)}
                        </div>
                        <Link href={rec.url}>
                          <Button size="sm" variant="outline">
                            Learn More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  )
}

