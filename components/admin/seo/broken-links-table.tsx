"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ExternalLink, Trash, RefreshCw, CheckCircle } from "lucide-react"
import { fixBrokenLink, deleteBrokenLink } from "@/lib/actions/seo-actions"

type BrokenLink = {
  id: string
  sourceUrl: string
  targetUrl: string
  occurrences: number
  status: number
  lastChecked: string
}

interface BrokenLinksTableProps {
  brokenLinks: BrokenLink[]
}

export function BrokenLinksTable({ brokenLinks }: BrokenLinksTableProps) {
  const [links, setLinks] = useState(brokenLinks)
  const [processing, setProcessing] = useState<Record<string, boolean>>({})
  const [newUrls, setNewUrls] = useState<Record<string, string>>({})
  const [filter, setFilter] = useState("")

  const handleFix = async (id: string) => {
    if (!newUrls[id]) return

    setProcessing((prev) => ({ ...prev, [id]: true }))

    try {
      await fixBrokenLink(id, newUrls[id])
      setLinks(links.filter((link) => link.id !== id))
    } catch (error) {
      console.error("Error fixing broken link:", error)
    } finally {
      setProcessing((prev) => ({ ...prev, [id]: false }))
    }
  }

  const handleDelete = async (id: string) => {
    setProcessing((prev) => ({ ...prev, [id]: true }))

    try {
      await deleteBrokenLink(id)
      setLinks(links.filter((link) => link.id !== id))
    } catch (error) {
      console.error("Error deleting broken link:", error)
    } finally {
      setProcessing((prev) => ({ ...prev, [id]: false }))
    }
  }

  const filteredLinks = links.filter(
    (link) =>
      link.sourceUrl.toLowerCase().includes(filter.toLowerCase()) ||
      link.targetUrl.toLowerCase().includes(filter.toLowerCase()),
  )

  if (links.length === 0) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          <p className="text-green-700 dark:text-green-300">No broken links detected.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4">
        <Input
          placeholder="Filter by URL..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Source URL</TableHead>
              <TableHead>Target URL</TableHead>
              <TableHead>Occurrences</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Replacement URL</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLinks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No broken links match your filter
                </TableCell>
              </TableRow>
            ) : (
              filteredLinks.map((link) => (
                <TableRow key={link.id}>
                  <TableCell className="max-w-[200px] truncate">
                    <a
                      href={link.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center hover:underline"
                    >
                      {link.sourceUrl}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate text-destructive">{link.targetUrl}</TableCell>
                  <TableCell>{link.occurrences}</TableCell>
                  <TableCell>{link.status}</TableCell>
                  <TableCell>
                    <Input
                      placeholder="New URL"
                      value={newUrls[link.id] || ""}
                      onChange={(e) => setNewUrls({ ...newUrls, [link.id]: e.target.value })}
                      className="w-full"
                      disabled={processing[link.id]}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleFix(link.id)}
                        disabled={!newUrls[link.id] || processing[link.id]}
                      >
                        {processing[link.id] ? <RefreshCw className="h-4 w-4 animate-spin" /> : "Fix"}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(link.id)}
                        disabled={processing[link.id]}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
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

