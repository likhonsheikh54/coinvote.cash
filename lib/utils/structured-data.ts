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
    offers: {
      "@type": "Offer",
      priceCurrency: data.priceCurrency,
      price: data.price,
      availability: "https://schema.org/InStock",
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

export function StructuredData({ data }: { data: Record<string, any> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

