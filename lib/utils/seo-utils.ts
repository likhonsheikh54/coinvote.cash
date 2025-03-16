export function generateCanonicalUrl(path: string, baseUrl = "https://coinvote.cash") {
  // Ensure path starts with a slash
  if (!path.startsWith("/")) {
    path = "/" + path
  }

  // Remove trailing slash if present (unless it's the homepage)
  if (path !== "/" && path.endsWith("/")) {
    path = path.slice(0, -1)
  }

  return `${baseUrl}${path}`
}

export function generateRobotsTxt(baseUrl = "https://coinvote.cash") {
  return `User-agent: *
Allow: /

# Disallow admin and API routes
Disallow: /admin/
Disallow: /api/

# Disallow redundant pages
Disallow: /404
Disallow: /500
Disallow: */[id]
Disallow: */undefined

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml
`
}

export function generateSitemapEntry(
  url: string,
  options: {
    lastmod?: string | Date
    changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
    priority?: number
  } = {},
) {
  const { lastmod, changefreq = "weekly", priority = 0.5 } = options

  let lastmodString = ""
  if (lastmod) {
    if (typeof lastmod === "string") {
      lastmodString = lastmod
    } else {
      lastmodString = lastmod.toISOString()
    }
  }

  return `
  <url>
    <loc>${url}</loc>
    ${lastmodString ? `<lastmod>${lastmodString}</lastmod>` : ""}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

