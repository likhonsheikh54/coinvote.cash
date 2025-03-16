import { getIndexNowKeyFileContent } from "@/lib/actions-indexnow"

export async function GET() {
  return new Response(getIndexNowKeyFileContent(), {
    headers: {
      "Content-Type": "text/plain",
    },
  })
}

