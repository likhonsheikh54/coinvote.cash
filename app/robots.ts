import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/", 
          "/admin/", 
          "/_next/", 
          "/private/",
          "/login",
          "/signup",
          "/reset-password",
          "/app/dashboard/settings",
          "/search?*", // Block search result pages
          "*?ref=*", // Block referral links
          "*?utm_*", // Block UTM links
          "*/amp/", // Block AMP versions if they exist
        ],
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/images/", "/public/images/", "/assets/images/"],
      },
      {
        userAgent: "Mediapartners-Google",
        allow: "/",
      },
    ],
    sitemap: "https://coinvote.cash/sitemap.xml",
    host: "https://coinvote.cash",
  }
}

