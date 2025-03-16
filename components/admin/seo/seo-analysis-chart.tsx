"use client"

import { useEffect, useRef } from "react"

interface SeoAnalysisChartProps {
  seoAnalysis: Record<string, any>
}

export function SeoAnalysisChart({ seoAnalysis }: SeoAnalysisChartProps) {
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
        ctx.fillText("SEO Analysis Chart (Placeholder)", chartRef.current.width / 2, chartRef.current.height / 2)
      }
    }
  }, [seoAnalysis])

  // For demonstration, we'll show a simplified score card
  const metrics = [
    { name: "Overall Score", score: 78 },
    { name: "Technical SEO", score: 85 },
    { name: "Content Quality", score: 72 },
    { name: "User Experience", score: 90 },
    { name: "Mobile Friendliness", score: 95 },
    { name: "Page Speed", score: 68 },
  ]

  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-500"
    if (score >= 70) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div>
      <canvas ref={chartRef} width={800} height={300} className="w-full h-60 mb-6 hidden" />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <div key={metric.name} className="bg-muted p-4 rounded-lg">
            <div className="text-sm font-medium mb-2">{metric.name}</div>
            <div className="flex items-center">
              <div className="text-2xl font-bold mr-2">{metric.score}</div>
              <div className={`h-2 flex-1 rounded-full ${getScoreColor(metric.score)}`}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

