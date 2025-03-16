"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ExternalLink, RefreshCw, CheckCircle } from "lucide-react"
import { createRedirect } from "@/lib/actions/seo-actions"

interface StatusCodeTableProps {
  statusCodes: Record<string, number>
}

export function StatusCodeTable({ statusCodes }: StatusCodeTableProps) {
  const [redirectSource, setRedirectSource] = useState("")
  const [redirectTarget, setRedirectTarget] = useState("")
  const [processing, setProcessing] = useState(false)
  const [filter, setFilter] = useState("")

  const pages = Object.entries(statusCodes).map(([url, code]) => ({
    url,
    statusCode: code,
  }))

  const filteredPages = pages.filter(
    (page) => page.url.toLowerCase().includes(filter.toLowerCase()) || page.statusCode.toString().includes(filter),
  )

  const error4xxPages = filteredPages.filter((page) => page.statusCode >= 400 && page.statusCode < 500)

  const handleCreateRedirect = async () => {
    if (!redirectSource || !redirectTarget) return

    setProcessing(true)

    try {
      await createRedirect(redirectSource, redirectTarget)
      // Reset form
      setRedirectSource("")
      setRedirectTarget("")
      // You would typically refresh the status codes here
    } catch (error) {
      console.error("Error creating redirect:", error)
    } finally {
      setProcessing(false)
    }
  }

  const getStatusColor = (code: number) => {
    if (code >= 200 && code < 300) return "bg-green-500"
    if (code >= 300 && code < 400) return "bg-yellow-500"
    if (code >= 400 && code < 500) return "bg-red-500"
    return "bg-gray-500"
  }

  if (error4xxPages.length === 0) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          <p className="text-green-700 dark:text-green-300">No 4XX status errors detected.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 p-4 border rounded-lg bg-muted">
        <h3 className="text-lg font-medium mb-2">Create Redirect</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Input
              placeholder="From URL (e.g., /old-page)"
              value={redirectSource}
              onChange={(e) => setRedirectSource(e.target.value)}
              disabled={processing}
            />
          </div>
          <div>
            <Input
              placeholder="To URL (e.g., /new-page)"
              value={redirectTarget}
              onChange={(e) => setRedirectTarget(e.target.value)}
              disabled={processing}
            />
          </div>
          <div>
            <Button
              onClick={handleCreateRedirect}
              disabled={!redirectSource || !redirectTarget || processing}
              className="w-full"
            >
              {processing ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Redirect"
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Filter by URL or status code..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>URL</TableHead>
              <TableHead>Status Code</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {error4xxPages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2} className="text-center py-4">
                  No pages match your filter
                </TableCell>
              </TableRow>
            ) : (
              error4xxPages.map((page) => (
                <TableRow key={page.url}>
                  <TableCell className="max-w-[600px] truncate">
                    <a
                      href={page.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center hover:underline"
                    >
                      {page.url}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(page.statusCode)}>{page.statusCode}</Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

