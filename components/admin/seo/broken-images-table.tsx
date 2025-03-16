"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ExternalLink, ImageIcon, RefreshCw, CheckCircle, Trash } from "lucide-react"
import { fixBrokenImage, deleteBrokenImage } from "@/lib/actions/seo-actions"

type BrokenImage = {
  id: string
  pageUrl: string
  imageUrl: string
  altText: string | null
  lastChecked: string
}

interface BrokenImagesTableProps {
  brokenImages: BrokenImage[]
}

export function BrokenImagesTable({ brokenImages }: BrokenImagesTableProps) {
  const [images, setImages] = useState(brokenImages)
  const [processing, setProcessing] = useState<Record<string, boolean>>({})
  const [newUrls, setNewUrls] = useState<Record<string, string>>({})
  const [filter, setFilter] = useState("")

  const handleFix = async (id: string) => {
    if (!newUrls[id]) return

    setProcessing((prev) => ({ ...prev, [id]: true }))

    try {
      await fixBrokenImage(id, newUrls[id])
      setImages(images.filter((image) => image.id !== id))
    } catch (error) {
      console.error("Error fixing broken image:", error)
    } finally {
      setProcessing((prev) => ({ ...prev, [id]: false }))
    }
  }

  const handleDelete = async (id: string) => {
    setProcessing((prev) => ({ ...prev, [id]: true }))

    try {
      await deleteBrokenImage(id)
      setImages(images.filter((image) => image.id !== id))
    } catch (error) {
      console.error("Error deleting broken image:", error)
    } finally {
      setProcessing((prev) => ({ ...prev, [id]: false }))
    }
  }

  const filteredImages = images.filter(
    (image) =>
      image.pageUrl.toLowerCase().includes(filter.toLowerCase()) ||
      image.imageUrl.toLowerCase().includes(filter.toLowerCase()) ||
      (image.altText && image.altText.toLowerCase().includes(filter.toLowerCase())),
  )

  if (images.length === 0) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          <p className="text-green-700 dark:text-green-300">No broken images detected.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4">
        <Input
          placeholder="Filter by URL or alt text..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Page URL</TableHead>
              <TableHead>Image URL</TableHead>
              <TableHead>Alt Text</TableHead>
              <TableHead>Replacement URL</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredImages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No broken images match your filter
                </TableCell>
              </TableRow>
            ) : (
              filteredImages.map((image) => (
                <TableRow key={image.id}>
                  <TableCell className="max-w-[200px] truncate">
                    <a
                      href={image.pageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center hover:underline"
                    >
                      {image.pageUrl}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate text-destructive">
                    <div className="flex items-center">
                      <ImageIcon className="h-4 w-4 mr-2 text-destructive" />
                      {image.imageUrl}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {image.altText || <span className="text-gray-400 italic">No alt text</span>}
                  </TableCell>
                  <TableCell>
                    <Input
                      placeholder="New image URL"
                      value={newUrls[image.id] || ""}
                      onChange={(e) => setNewUrls({ ...newUrls, [image.id]: e.target.value })}
                      className="w-full"
                      disabled={processing[image.id]}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleFix(image.id)}
                        disabled={!newUrls[image.id] || processing[image.id]}
                      >
                        {processing[image.id] ? <RefreshCw className="h-4 w-4 animate-spin" /> : "Fix"}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(image.id)}
                        disabled={processing[image.id]}
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

