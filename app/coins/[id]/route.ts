import { redirect } from "next/navigation"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  // Redirect to the new URL structure while maintaining the same parameter
  redirect(`/coin-by-id/${params.id}`)
}

