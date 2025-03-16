"use client"

import { useEffect, useRef } from "react"

interface CrawlDepthChartProps {
  crawlDepth: Record<string, any>
}

export function CrawlDepthChart({ crawlDepth }: CrawlDepthChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // This is a placeholder for an actual chart implementation
    // In a real implementation, you would use a library like Chart.js
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d")
      if (ctx) {
        // Draw a placeholder chart
        ctx.clearRect(0, 0, chartRef.current.width, chartRef.current.height)

        // Draw background
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
        ctx.fillRect(0, 0, chartRef.current.width, chartRef.current.height)

        // Draw border
        ctx.strokeStyle = "rgba(0, 0, 0, 0.1)"
        ctx.lineWidth = 2
        ctx.strokeRect(0, 0, chartRef.current.width, chartRef.current.height)

        // Draw text
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
        ctx.font = "14px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText("Crawl Depth Chart (Placeholder)", chartRef.current.width / 2, chartRef.current.height / 2)
      }
    }
  }, [crawlDepth])

  // For demonstration, we'll create a simplified depth table
  const depthData = [
    { depth: 1, pages: 15, percentage: 25 },
    { depth: 2, pages: 42, percentage: 70 },
    { depth: 3, pages: 18, percentage: 30 },
    { depth: 4, pages: 5, percentage: 8 },
    { depth: 5, pages: 2, percentage: 3 },
  ]

  return (
    <div>
      <canvas ref={chartRef} width={800} height={300} className="w-full h-60 mb-6 hidden" />

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Depth</th>
              <th className="text-right py-2">Pages</th>
              <th className="text-right py-2">%</th>
              <th className="py-2 pl-4">Distribution</th>
            </tr>
          </thead>
          <tbody>
            {depthData.map((row) => (
              <tr key={row.depth} className="border-b border-gray-100">
                <td className="py-2">{row.depth}</td>
                <td className="text-right py-2">{row.pages}</td>
                <td className="text-right py-2">{row.percentage}%</td>
                <td className="py-2 pl-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${row.percentage}%` }}></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

