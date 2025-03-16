"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ExternalLink, Copy, FileText, RefreshCw, MessageSquare, CheckCircle } from "lucide-react"
import { fixDuplicateContent } from "@/lib/actions/seo-actions"

type DuplicateContent = {
  id: string
  url: string
  content: string
  duplicateUrls: string[]
  hash: string
}

interface DuplicateContentTableProps {
  duplicateTitles: Array<{
    id: string
    url: string
    title: string
    duplicateUrls: string[]
  }>
  duplicateContent: DuplicateContent[]
  duplicateMetaDescriptions: Array<{
    id: string
    url: string
    description: string
    duplicateUrls: string[]
  }>
}

export function DuplicateContentTable({
  duplicateTitles,
  duplicateContent,
  duplicateMetaDescriptions,
}: DuplicateContentTableProps) {
  const [processing, setProcessing] = useState<Record<string, boolean>>({})
  const [newTitles, setNewTitles] = useState<Record<string, string>>({})
  const [newDescriptions, setNewDescriptions] = useState<Record<string, string>>({})
  const [filter, setFilter] = useState("")

  const filteredTitles = duplicateTitles.filter(
    (item) =>
      item.url.toLowerCase().includes(filter.toLowerCase()) || item.title.toLowerCase().includes(filter.toLowerCase()),
  )

  const filteredContent = duplicateContent.filter((item) => item.url.toLowerCase().includes(filter.toLowerCase()))

  const filteredMetaDescriptions = duplicateMetaDescriptions.filter(
    (item) =>
      item.url.toLowerCase().includes(filter.toLowerCase()) ||
      item.description.toLowerCase().includes(filter.toLowerCase()),
  )

  const handleFixTitle = async (id: string) => {
    if (!newTitles[id]) return

    setProcessing((prev) => ({ ...prev, [id]: true }))

    try {
      await fixDuplicateContent({ id, type: "title", newValue: newTitles[id] })
      // You would typically update the local state or refresh data here
    } catch (error) {
      console.error("Error fixing duplicate title:", error)
    } finally {
      setProcessing((prev) => ({ ...prev, [id]: false }))
    }
  }

  const handleFixMetaDescription = async (id: string) => {
    if (!newDescriptions[id]) return

    setProcessing((prev) => ({ ...prev, [id]: true }))

    try {
      await fixDuplicateContent({ id, type: "meta", newValue: newDescriptions[id] })
      // You would typically update the local state or refresh data here
    } catch (error) {
      console.error("Error fixing duplicate meta description:", error)
    } finally {
      setProcessing((prev) => ({ ...prev, [id]: false }))
    }
  }

  const noIssuesFound =
    duplicateTitles.length === 0 && duplicateContent.length === 0 && duplicateMetaDescriptions.length === 0

  if (noIssuesFound) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          <p className="text-green-700 dark:text-green-300">No duplicate content issues detected.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4">
        <Input
          placeholder="Filter by URL or content..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-md"
        />
      </div>

      <Tabs defaultValue="titles">
        <TabsList>
          <TabsTrigger value="titles" className="relative">
            Duplicate Titles
            {duplicateTitles.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-destructive text-xs rounded-full w-5 h-5 flex items-center justify-center text-white">
                {duplicateTitles.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="content" className="relative">
            Duplicate Content
            {duplicateContent.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-destructive text-xs rounded-full w-5 h-5 flex items-center justify-center text-white">
                {duplicateContent.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="meta" className="relative">
            Duplicate Meta Descriptions
            {duplicateMetaDescriptions.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-destructive text-xs rounded-full w-5 h-5 flex items-center justify-center text-white">
                {duplicateMetaDescriptions.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="titles">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>URL</TableHead>
                  <TableHead>Current Title</TableHead>
                  <TableHead>Duplicate URLs</TableHead>
                  <TableHead>New Title</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTitles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No duplicate titles match your filter
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTitles.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="max-w-[200px] truncate">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center hover:underline"
                        >
                          {item.url}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-yellow-500" />
                          {item.title}
                        </div>
                      </TableCell>
                      <TableCell>
                        {item.duplicateUrls.length} {item.duplicateUrls.length === 1 ? "page" : "pages"}
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="New title"
                          value={newTitles[item.id] || ""}
                          onChange={(e) => setNewTitles({ ...newTitles, [item.id]: e.target.value })}
                          className="w-full"
                          disabled={processing[item.id]}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleFixTitle(item.id)}
                          disabled={!newTitles[item.id] || processing[item.id]}
                        >
                          {processing[item.id] ? <RefreshCw className="h-4 w-4 animate-spin" /> : "Fix"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="content">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>URL</TableHead>
                  <TableHead>Duplicate URLs</TableHead>
                  <TableHead>Content Hash</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContent.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-4">
                      No duplicate content matches your filter
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredContent.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="max-w-[300px] truncate">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center hover:underline"
                        >
                          {item.url}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col space-y-1">
                          {item.duplicateUrls.map((url, i) => (
                            <a
                              key={i}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center hover:underline text-sm"
                            >
                              {url.length > 40 ? url.substring(0, 40) + "..." : url}
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Copy className="h-4 w-4 mr-2 text-yellow-500" />
                          {item.hash.substring(0, 8)}...
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="meta">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>URL</TableHead>
                  <TableHead>Current Meta Description</TableHead>
                  <TableHead>Duplicate URLs</TableHead>
                  <TableHead>New Meta Description</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMetaDescriptions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No duplicate meta descriptions match your filter
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMetaDescriptions.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="max-w-[200px] truncate">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center hover:underline"
                        >
                          {item.url}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-2 text-yellow-500" />
                          {item.description}
                        </div>
                      </TableCell>
                      <TableCell>
                        {item.duplicateUrls.length} {item.duplicateUrls.length === 1 ? "page" : "pages"}
                      </TableCell>
                      <TableCell>
                        <Textarea
                          placeholder="New meta description"
                          value={newDescriptions[item.id] || ""}
                          onChange={(e) => setNewDescriptions({ ...newDescriptions, [item.id]: e.target.value })}
                          className="w-full"
                          disabled={processing[item.id]}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleFixMetaDescription(item.id)}
                          disabled={!newDescriptions[item.id] || processing[item.id]}
                        >
                          {processing[item.id] ? <RefreshCw className="h-4 w-4 animate-spin" /> : "Fix"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

