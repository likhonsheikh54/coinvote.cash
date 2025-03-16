"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { RefreshCw, TrendingUp, Award, Link2, Zap } from "lucide-react"
import { getCompetitorSeoComparison } from "@/lib/actions/seo-monitoring"

export default function SeoCompetitorsPage() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({
    domains: [],
    metrics: {
      pageSpeed: {},
      domainAuthority: {},
      organicKeywords: {},
      backlinks: {},
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const comparisonData = await getCompetitorSeoComparison()
        setData(comparisonData)
      } catch (error) {
        console.error("Error fetching competitor data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getValueClass = (domain, metric, higherIsBetter = true) => {
    const values = Object.values(data.metrics[metric])
    const max = Math.max(...(values as number[]))
    const min = Math.min(...(values as number[]))
    const value = data.metrics[metric][domain]

    if ((higherIsBetter && value === max) || (!higherIsBetter && value === min)) {
      return "font-bold text-green-500"
    }
    if ((higherIsBetter && value === min) || (!higherIsBetter && value === max)) {
      return "text-red-500"
    }
    return ""
  }

  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num)
  }

  return (
    <div className="container p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Competitor SEO Analysis</h1>
        <Button variant="outline" onClick={() => window.location.reload()}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin text-coin-yellow" />
          <span className="ml-2">Loading competitor data...</span>
        </div>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO Metrics Comparison</CardTitle>
              <CardDescription>How Coinvote.cash compares to competitors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Domain</TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          <Zap className="h-4 w-4 mr-1 text-yellow-500" />
                          Page Speed
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          <Award className="h-4 w-4 mr-1 text-blue-500" />
                          Domain Authority
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                          Organic Keywords
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          <Link2 className="h-4 w-4 mr-1 text-purple-500" />
                          Backlinks
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.domains.map((domain) => (
                      <TableRow key={domain} className={domain === "coinvote.cash" ? "bg-blue-50/10" : ""}>
                        <TableCell className="font-medium">
                          {domain === "coinvote.cash" ? <strong>{domain}</strong> : domain}
                        </TableCell>
                        <TableCell className={getValueClass(domain, "pageSpeed")}>
                          {data.metrics.pageSpeed[domain]}/100
                        </TableCell>
                        <TableCell className={getValueClass(domain, "domainAuthority")}>
                          {data.metrics.domainAuthority[domain]}
                        </TableCell>
                        <TableCell className={getValueClass(domain, "organicKeywords")}>
                          {formatNumber(data.metrics.organicKeywords[domain])}
                        </TableCell>
                        <TableCell className={getValueClass(domain, "backlinks")}>
                          {formatNumber(data.metrics.backlinks[domain])}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Strengths vs. Competitors</CardTitle>
                <CardDescription>Areas where we're doing well</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-3 mt-0.5">
                      <Zap className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium">Strong page speed performance</p>
                      <p className="text-sm text-gray-500">Better than 2 of 3 competitors</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-3 mt-0.5">
                      <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium">Growing organic keyword visibility</p>
                      <p className="text-sm text-gray-500">+24% in the last 30 days</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-3 mt-0.5">
                      <Award className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium">Better than competitor3.xyz across all metrics</p>
                      <p className="text-sm text-gray-500">Continue to widen the gap</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Improvement Opportunities</CardTitle>
                <CardDescription>Areas where we need to catch up</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="bg-red-100 dark:bg-red-900/30 p-1 rounded-full mr-3 mt-0.5">
                      <Award className="h-4 w-4 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <p className="font-medium">Domain authority lags behind</p>
                      <p className="text-sm text-gray-500">14 points below leading competitor</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-red-100 dark:bg-red-900/30 p-1 rounded-full mr-3 mt-0.5">
                      <Link2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <p className="font-medium">Fewer backlinks than top competitors</p>
                      <p className="text-sm text-gray-500">Need to improve link building strategy</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-red-100 dark:bg-red-900/30 p-1 rounded-full mr-3 mt-0.5">
                      <TrendingUp className="h-4 w-4 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <p className="font-medium">Organic keyword gap</p>
                      <p className="text-sm text-gray-500">403 keywords competitor1.com ranks for that we don't</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Action Plan</CardTitle>
              <CardDescription>Recommended steps to improve competitive position</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4 list-decimal pl-5">
                <li>
                  <p className="font-medium">Improve backlink profile</p>
                  <p className="text-sm text-gray-500">
                    Target high-quality cryptocurrency and finance websites for link building. Focus on content that
                    naturally attracts backlinks.
                  </p>
                </li>
                <li>
                  <p className="font-medium">Target keyword gaps</p>
                  <p className="text-sm text-gray-500">
                    Create content for the 403 keywords competitor1.com ranks for that we don't. Prioritize high-volume,
                    low-competition terms.
                  </p>
                </li>
                <li>
                  <p className="font-medium">Enhance user engagement metrics</p>
                  <p className="text-sm text-gray-500">
                    Improve time on site and reduce bounce rate to signal quality to search engines and increase domain
                    authority.
                  </p>
                </li>
                <li>
                  <p className="font-medium">Create link-worthy resources</p>
                  <p className="text-sm text-gray-500">
                    Develop comprehensive guides, tools, and educational content that naturally attracts links from
                    industry websites.
                  </p>
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

