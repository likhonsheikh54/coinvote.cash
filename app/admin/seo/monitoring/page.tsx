"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BarChart, RefreshCw, Server, Zap, AlertTriangle, CheckCircle } from "lucide-react"
import { getSitePerformance } from "@/lib/actions/seo-actions"

export default function SeoMonitoringPage() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({
    pageSpeed: {
      mobile: 0,
      desktop: 0,
      lastChecked: new Date().toISOString(),
    },
    serverResponse: {
      average: 0,
      p90: 0,
      p95: 0,
      lastChecked: new Date().toISOString(),
    },
    crawlStats: {
      pagesPerDay: 0,
      crawlErrors: 0,
      lastCrawled: new Date().toISOString(),
    },
    indexationStatus: {
      indexed: 0,
      discovered: 0,
      excluded: 0,
      lastChecked: new Date().toISOString(),
    },
    coreWebVitals: {
      lcp: 0,
      fid: 0,
      cls: 0,
      lastChecked: new Date().toISOString(),
    },
    dnsHealth: {
      status: "healthy",
      errors: [],
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const performanceData = await getSitePerformance()
        setData(performanceData)
      } catch (error) {
        console.error("Error fetching performance data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const scoreColor = (score: number) => {
    if (score >= 90) return "text-green-500"
    if (score >= 70) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <div className="container p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">SEO Monitoring Dashboard</h1>
        <Button variant="outline" onClick={() => window.location.reload()}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Data
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin text-coin-yellow" />
          <span className="ml-2">Loading monitoring data...</span>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-blue-500" />
                  Page Speed Score
                </CardTitle>
                <CardDescription>Google PageSpeed Insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Mobile</span>
                      <span className={`text-sm font-bold ${scoreColor(data.pageSpeed.mobile)}`}>
                        {data.pageSpeed.mobile}/100
                      </span>
                    </div>
                    <Progress value={data.pageSpeed.mobile} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Desktop</span>
                      <span className={`text-sm font-bold ${scoreColor(data.pageSpeed.desktop)}`}>
                        {data.pageSpeed.desktop}/100
                      </span>
                    </div>
                    <Progress value={data.pageSpeed.desktop} className="h-2" />
                  </div>
                  <div className="text-xs text-gray-500">Last checked: {formatDate(data.pageSpeed.lastChecked)}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Server className="h-5 w-5 mr-2 text-purple-500" />
                  Server Response Time
                </CardTitle>
                <CardDescription>TTFB metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Average</span>
                    <span className="font-bold">{data.serverResponse.average}ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>90th percentile</span>
                    <span className="font-bold">{data.serverResponse.p90}ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>95th percentile</span>
                    <span className="font-bold">{data.serverResponse.p95}ms</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    Last checked: {formatDate(data.serverResponse.lastChecked)}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <BarChart className="h-5 w-5 mr-2 text-green-500" />
                  Crawl Statistics
                </CardTitle>
                <CardDescription>Googlebot activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Pages crawled per day</span>
                    <span className="font-bold">{data.crawlStats.pagesPerDay}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Crawl errors</span>
                    <span
                      className={
                        data.crawlStats.crawlErrors > 0 ? "font-bold text-red-500" : "font-bold text-green-500"
                      }
                    >
                      {data.crawlStats.crawlErrors}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    Last crawled: {formatDate(data.crawlStats.lastCrawled)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="core-web-vitals">
            <TabsList>
              <TabsTrigger value="core-web-vitals">Core Web Vitals</TabsTrigger>
              <TabsTrigger value="indexation">Indexation Status</TabsTrigger>
              <TabsTrigger value="dns-health">DNS Health</TabsTrigger>
            </TabsList>

            <TabsContent value="core-web-vitals">
              <Card>
                <CardHeader>
                  <CardTitle>Core Web Vitals</CardTitle>
                  <CardDescription>Real user performance metrics from Google</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">LCP</div>
                        <div
                          className={`text-sm ${data.coreWebVitals.lcp <= 2.5 ? "text-green-500" : data.coreWebVitals.lcp <= 4 ? "text-yellow-500" : "text-red-500"}`}
                        >
                          {data.coreWebVitals.lcp}s
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">Largest Contentful Paint measures loading performance</div>
                      <div className="mt-2">
                        <Progress value={Math.max(0, 100 - data.coreWebVitals.lcp * 20)} className="h-1.5" />
                      </div>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">FID</div>
                        <div
                          className={`text-sm ${data.coreWebVitals.fid <= 100 ? "text-green-500" : data.coreWebVitals.fid <= 300 ? "text-yellow-500" : "text-red-500"}`}
                        >
                          {data.coreWebVitals.fid}ms
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">First Input Delay measures interactivity</div>
                      <div className="mt-2">
                        <Progress value={Math.max(0, 100 - data.coreWebVitals.fid / 5)} className="h-1.5" />
                      </div>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">CLS</div>
                        <div
                          className={`text-sm ${data.coreWebVitals.cls <= 0.1 ? "text-green-500" : data.coreWebVitals.cls <= 0.25 ? "text-yellow-500" : "text-red-500"}`}
                        >
                          {data.coreWebVitals.cls}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">Cumulative Layout Shift measures visual stability</div>
                      <div className="mt-2">
                        <Progress value={Math.max(0, 100 - data.coreWebVitals.cls * 250)} className="h-1.5" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-xs text-gray-500">
                    Last checked: {formatDate(data.coreWebVitals.lastChecked)}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="indexation">
              <Card>
                <CardHeader>
                  <CardTitle>Indexation Status</CardTitle>
                  <CardDescription>Current indexation status in Google</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-2xl font-bold">{data.indexationStatus.indexed}</div>
                      <div className="text-sm font-medium">Indexed Pages</div>
                      <div className="text-xs text-gray-500 mt-1">Pages in Google's index</div>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-2xl font-bold">{data.indexationStatus.discovered}</div>
                      <div className="text-sm font-medium">Discovered Pages</div>
                      <div className="text-xs text-gray-500 mt-1">Pages discovered but not indexed</div>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-2xl font-bold">{data.indexationStatus.excluded}</div>
                      <div className="text-sm font-medium">Excluded Pages</div>
                      <div className="text-xs text-gray-500 mt-1">Pages excluded from index</div>
                    </div>
                  </div>

                  <div className="mt-4 text-xs text-gray-500">
                    Last checked: {formatDate(data.indexationStatus.lastChecked)}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dns-health">
              <Card>
                <CardHeader>
                  <CardTitle>DNS Health</CardTitle>
                  <CardDescription>DNS configuration and health checks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      {data.dnsHealth.status === "healthy" ? (
                        <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                      ) : (
                        <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
                      )}
                      <span className="font-medium">
                        DNS Status:{" "}
                        <span className={data.dnsHealth.status === "healthy" ? "text-green-500" : "text-red-500"}>
                          {data.dnsHealth.status.charAt(0).toUpperCase() + data.dnsHealth.status.slice(1)}
                        </span>
                      </span>
                    </div>

                    {data.dnsHealth.errors.length > 0 ? (
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                        <h4 className="font-medium text-red-800 dark:text-red-300 mb-2">DNS Issues Detected</h4>
                        <ul className="list-disc pl-5 text-sm text-red-700 dark:text-red-400">
                          {data.dnsHealth.errors.map((error, index) => (
                            <li key={index}>{error}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <p className="text-green-700 dark:text-green-300">All DNS records are properly configured.</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">DNS Records</h4>
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 text-sm">
                          <span className="text-gray-500">A Record</span>
                          <span>coinvote.cash</span>
                        </div>
                        <div className="grid grid-cols-2 text-sm">
                          <span className="text-gray-500">CNAME Record</span>
                          <span>www.coinvote.cash</span>
                        </div>
                        <div className="grid grid-cols-2 text-sm">
                          <span className="text-gray-500">MX Record</span>
                          <span>mail.coinvote.cash</span>
                        </div>
                        <div className="grid grid-cols-2 text-sm">
                          <span className="text-gray-500">TXT Record</span>
                          <span>v=spf1 include:_spf.google.com ~all</span>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">SSL Certificate</h4>
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 text-sm">
                          <span className="text-gray-500">Issuer</span>
                          <span>Let's Encrypt</span>
                        </div>
                        <div className="grid grid-cols-2 text-sm">
                          <span className="text-gray-500">Valid Until</span>
                          <span>Nov 30, 2024</span>
                        </div>
                        <div className="grid grid-cols-2 text-sm">
                          <span className="text-gray-500">Status</span>
                          <span className="text-green-500">Valid</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}

