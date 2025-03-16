type CryptocurrencyStructuredData = {
  name: string
  symbol: string
  description: string
  image: string
  price: number
  priceCurrency: string
  url: string
}

export function generateCryptoCurrencyStructuredData(data: CryptocurrencyStructuredData): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${data.name} (${data.symbol})`,
    description: data.description,
    image: data.image,
    url: data.url,
    category: "Cryptocurrency",
    brand: {
      "@type": "Brand",
      name: data.name,
      logo: data.image
    },
    offers: {
      "@type": "Offer",
      priceCurrency: data.priceCurrency,
      price: data.price,
      availability: "https://schema.org/InStock",
      priceValidUntil: new Date(Date.now() + 86400000).toISOString().split('T')[0], // 24 hours from now
      url: data.url,
      seller: {
        "@type": "Organization",
        name: "Coinvote.cash"
      }
    },
  }
}

type FAQStructuredData = {
  questions: Array<{
    question: string
    answer: string
  }>
}

export function generateFAQStructuredData(data: FAQStructuredData): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  }
}

type BreadcrumbStructuredData = {
  items: Array<{
    name: string
    url: string
  }>
}

export function generateBreadcrumbStructuredData(data: BreadcrumbStructuredData): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: data.items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

type OrganizationStructuredData = {
  name: string
  url: string
  logo: string
  description?: string
  sameAs?: string[]
}

export function generateOrganizationStructuredData(data: OrganizationStructuredData): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: data.name,
    url: data.url,
    logo: {
      "@type": "ImageObject",
      url: data.logo
    },
    description: data.description,
    sameAs: data.sameAs || []
  }
}

type ArticleStructuredData = {
  headline: string
  description: string
  image: string
  datePublished: string
  dateModified: string
  author: {
    name: string
    url?: string
  }
  publisher: {
    name: string
    logo: string
  }
  url: string
}

export function generateArticleStructuredData(data: ArticleStructuredData): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.headline,
    description: data.description,
    image: data.image,
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    author: {
      "@type": "Person",
      name: data.author.name,
      url: data.author.url
    },
    publisher: {
      "@type": "Organization",
      name: data.publisher.name,
      logo: {
        "@type": "ImageObject",
        url: data.publisher.logo
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": data.url
    }
  }
}

export function StructuredData({ data }: { data: Record<string, any> }) {
  return (
    <script 
      type="application/ld+json" 
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} 
    />
  );
} 