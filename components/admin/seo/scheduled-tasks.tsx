"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, Calendar, Check, AlertCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function ScheduledTasks() {
  const [loading, setLoading] = useState<Record<string, boolean>>({})

  const tasks = [
    {
      id: "sitemap-generation",
      name: "Generate & Submit Sitemap",
      description: "Generate sitemap and submit to search engines",
      frequency: "Daily",
      lastRun: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
      status: "success",
      endpoint: "/api/admin/generate-sitemap",
    },
    {
      id: "broken-link-check",
      name: "Check Broken Links",
      description: "Scan site for broken internal links",
      frequency: "Weekly",
      lastRun: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
      status: "success",
      endpoint: "/api/admin/check-links",
    },
    {
      id: "broken-image-check",
      name: "Check Broken Images",
      description: "Scan site for broken images",
      frequency: "Weekly",
      lastRun: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
      status: "success",
      endpoint: "/api/admin/check-images",
    },
    {
      id: "duplicate-content",
      name: "Detect Duplicate Content",
      description: "Find pages with duplicate content",
      frequency: "Monthly",
      lastRun: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(), // 15 days ago
      status: "warning",
      endpoint: "/api/admin/check-duplicate-content",
    },
  ]

  const handleRunTask = async (taskId: string, endpoint: string) => {
    setLoading({ ...loading, [taskId]: true })

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Task failed with status: ${response.status}`)
      }

      // Update the UI to show the task completed successfully
      // In a real implementation, you would fetch the updated tasks

      // Wait a moment to show loading state
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (error) {
      console.error(`Error running task ${taskId}:`, error)
    } finally {
      setLoading({ ...loading, [taskId]: false })
    }
  }

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <Check className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-blue-500" />
          Scheduled SEO Tasks
        </CardTitle>
        <CardDescription>Automatically run SEO maintenance tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Last Run</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{task.name}</div>
                    <div className="text-xs text-gray-500">{task.description}</div>
                  </div>
                </TableCell>
                <TableCell>{task.frequency}</TableCell>
                <TableCell>{formatDate(task.lastRun)}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {getStatusIcon(task.status)}
                    <span className="ml-2 capitalize">{task.status}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRunTask(task.id, task.endpoint)}
                    disabled={loading[task.id]}
                  >
                    {loading[task.id] ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Running...
                      </>
                    ) : (
                      "Run Now"
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

