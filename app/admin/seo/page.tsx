"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { AlertCircle, FileText, ImageIcon, Server, RefreshCw, CheckCircle } from "lucide-react"
import { getSeoIssues, fixAllIssues } from "@/lib/actions/seo-actions"
import { BrokenLinksTable } from "@/components/admin/seo/broken-links-table"
import { StatusCodeTable } from "@/components/admin/seo/status-code-table"
import { DuplicateContentTable } from "@/components/admin/seo/duplicate-content-table"
import { BrokenImagesTable } from "@/components/admin/seo/broken-images-table"
import { SeoAnalysisChart } from "@/components/admin/seo/seo-analysis-chart"
import { CrawlDepthChart } from "@/components/admin/seo/crawl-depth-chart"

export default function SeoAuditPage() {
  const [loading, setLoading] = useState(true)
  const [fixing, setFixing] = useState(false)
  const [seoData, setSeoData] = useState({
    brokenLinks: [],
    statusCodes: {},
    duplicateTitles: [],
    duplicateContent: [],
    brokenImages: [],
    duplicateMetaDescriptions: [],
    dnsIssues: [],
    crawlDepth: {},
    internalLinks: {},
    markupTypes: {},
    canonicalization: {},
    seoAnalysis: {},
  })
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const data = await getSeoIssues()
        setSeoData(data)
      } catch (error) {
        console.error("Error fetching SEO data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleFixAll = async () => {
    setFixing(true)
    setProgress(0)

    try {
      // Simulate progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval)
            return 95
          }
          return prev + 5
        })
      }, 500)

      const result = await fixAllIssues()

      clearInterval(interval)
      setProgress(100)

      // Refresh data after fixing
      setTimeout(async () => {
        const newData = await getSeoIssues()
        setSeoData(newData)
        setFixing(false)
      }, 1000)
    } catch (error) {
      console.error("Error fixing issues:", error)
      setFixing(false)
    }
  }

  const issueCount =
    seoData.brokenLinks.length +
    seoData.duplicateTitles.length +
    seoData.duplicateContent.length +
    seoData.brokenImages.length +
    seoData.duplicateMetaDescriptions.length +
    seoData.dnsIssues.length

  return (
    <div className="container p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">SEO Audit Dashboard</h1>
        <Button
          onClick={handleFixAll}
          disabled={fixing || loading || issueCount === 0}
          className="bg-coin-green hover:bg-coin-green/90"
        >
          {fixing ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Fixing Issues...
            </>
          ) : (
            "Fix All Issues"
          )}
        </Button>
      </div>

      {fixing && (
        <div className="mb-6">
          <Progress value={progress} className="h-2 mb-2" />
          <p className="text-sm text-gray-500">Fixing issues... {progress}% complete</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Broken Links</CardTitle>
            <CardDescription>Internal links returning errors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{seoData.brokenLinks.length}</div>
            <p className="text-sm text-destructive">
              {seoData.brokenLinks.length > 0 ? "Action required" : "No issues found"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>4XX Status Codes</CardTitle>
            <CardDescription>Pages returning client errors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {Object.values(seoData.statusCodes).filter((s) => s.toString().startsWith("4")).length}
            </div>
            <p className="text-sm text-destructive">
              {Object.values(seoData.statusCodes).filter((s) => s.toString().startsWith("4")).length > 0
                ? "Action required"
                : "No issues found"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Content Issues</CardTitle>
            <CardDescription>Duplicate titles, content & meta descriptions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {seoData.duplicateTitles.length +
                seoData.duplicateContent.length +
                seoData.duplicateMetaDescriptions.length}
            </div>
            <p className="text-sm text-destructive">
              {seoData.duplicateTitles.length +
                seoData.duplicateContent.length +
                seoData.duplicateMetaDescriptions.length >
              0
                ? "Action required"
                : "No issues found"}
            </p>
          </CardContent>
        </Card>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin text-coin-yellow" />
          <span className="ml-2">Loading SEO data...</span>
        </div>
      ) : (
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="broken-links">Broken Links</TabsTrigger>
            <TabsTrigger value="status-codes">Status Codes</TabsTrigger>
            <TabsTrigger value="duplicate-content">Duplicate Content</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 gap-6">
              <Alert className={issueCount > 0 ? "border-destructive" : "border-green-500"}>
                <AlertCircle className={issueCount > 0 ? "h-4 w-4 text-destructive" : "h-4 w-4 text-green-500"} />
                <AlertTitle>
                  {issueCount > 0 ? `${issueCount} SEO issues detected` : "No SEO issues detected"}
                </AlertTitle>
                <AlertDescription>
                  {issueCount > 0
                    ? "Review and fix the issues to improve your site's SEO performance"
                    : "Your site's SEO is in good health"}
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>SEO Health Score</CardTitle>
                    <CardDescription>Overall performance based on technical factors</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SeoAnalysisChart seoAnalysis={seoData.seoAnalysis} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Crawl Depth</CardTitle>
                    <CardDescription>How deep search engines need to crawl</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CrawlDepthChart crawlDepth={seoData.crawlDepth} />
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Top Issues</CardTitle>
                  <CardDescription>Most critical issues to address</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {seoData.brokenLinks.length > 0 && (
                      <li className="flex items-start">
                        <AlertCircle className="h-5 w-5 text-destructive mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">{seoData.brokenLinks.length} broken internal links detected</p>
                          <p className="text-sm text-gray-500">
                            Links that lead to non-existent pages harm user experience and SEO
                          </p>
                        </div>
                      </li>
                    )}

                    {Object.values(seoData.statusCodes).filter((s) => s.toString().startsWith("4")).length > 0 && (
                      <li className="flex items-start">
                        <AlertCircle className="h-5 w-5 text-destructive mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">
                            {Object.values(seoData.statusCodes).filter((s) => s.toString().startsWith("4")).length}{" "}
                            pages returning 4XX status codes
                          </p>
                          <p className="text-sm text-gray-500">
                            Client error responses indicate problems with requested URLs
                          </p>
                        </div>
                      </li>
                    )}

                    {seoData.duplicateTitles.length > 0 && (
                      <li className="flex items-start">
                        <FileText className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">
                            {seoData.duplicateTitles.length} pages with duplicate title tags
                          </p>
                          <p className="text-sm text-gray-500">
                            Unique title tags help search engines understand page content
                          </p>
                        </div>
                      </li>
                    )}

                    {seoData.brokenImages.length > 0 && (
                      <li className="flex items-start">
                        <ImageIcon className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">{seoData.brokenImages.length} broken internal images</p>
                          <p className="text-sm text-gray-500">
                            Missing images create a poor user experience and waste crawl budget
                          </p>
                        </div>
                      </li>
                    )}

                    {seoData.dnsIssues.length > 0 && (
                      <li className="flex items-start">
                        <Server className="h-5 w-5 text-destructive mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">{seoData.dnsIssues.length} pages with DNS resolution issues</p>
                          <p className="text-sm text-gray-500">DNS issues prevent access to your site and harm SEO</p>
                        </div>
                      </li>
                    )}

                    {issueCount === 0 && (
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">No critical SEO issues detected</p>
                          <p className="text-sm text-gray-500">Your site appears to be in good technical health</p>
                        </div>
                      </li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="broken-links">
            <BrokenLinksTable brokenLinks={seoData.brokenLinks} />
          </TabsContent>

          <TabsContent value="status-codes">
            <StatusCodeTable statusCodes={seoData.statusCodes} />
          </TabsContent>

          <TabsContent value="duplicate-content">
            <DuplicateContentTable
              duplicateTitles={seoData.duplicateTitles}
              duplicateContent={seoData.duplicateContent}
              duplicateMetaDescriptions={seoData.duplicateMetaDescriptions}
            />
          </TabsContent>

          <TabsContent value="images">
            <BrokenImagesTable brokenImages={seoData.brokenImages} />
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Markup Types</CardTitle>
                  <CardDescription>Distribution of markup types across the site</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">{/* Chart for markup types would go here */}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Canonicalization</CardTitle>
                  <CardDescription>Analysis of canonical URLs across the site</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">{/* Canonicalization data would go here */}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Competitor SEO Analysis</CardTitle>
                  <CardDescription>Comparison with top competitors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">{/* Competitor SEO analysis chart would go here */}</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

