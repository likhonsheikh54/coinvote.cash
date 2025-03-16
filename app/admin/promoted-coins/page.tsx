import { redirect } from "next/navigation"
import { sql } from "@/lib/db/neon"
import { cookies } from "next/headers"
import { getAuth } from "firebase-admin/auth"
import { initAdmin } from "@/lib/firebase-admin"
import PromotedCoinForm from "./promoted-coin-form"

export const metadata = {
  title: "Manage Promoted Coins - Admin Panel",
  description: "Add or remove promoted coins from the Coinvote platform",
}

interface Coin {
  id: string
  name: string
  symbol: string
}

interface PromotedCoin {
  id: string
  name: string
  symbol: string
  createdAt: Date
  txHash: string
  active: boolean
}

async function getAdminStatus() {
  try {
    initAdmin()
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get("session")?.value

    if (!sessionCookie) {
      return false
    }

    const decodedClaims = await getAuth().verifySessionCookie(sessionCookie)
    const uid = decodedClaims.uid

    const result = await sql`
      SELECT is_admin FROM users WHERE uid = ${uid}
    `

    return result.rows.length > 0 ? result.rows[0].is_admin : false
  } catch (error) {
    console.error("Error checking admin status:", error)
    return false
  }
}

export default async function ManagePromotedCoinsPage() {
  const isAdmin = await getAdminStatus()

  if (!isAdmin) {
    redirect("/login?callbackUrl=/admin/promoted-coins")
  }

  // Get all coins for the select dropdown
  const coinsResult = await sql`
    SELECT id, name, symbol FROM coins ORDER BY name ASC
  `
  const coins: Coin[] = coinsResult.rows

  // Get current promoted coins
  const promotedCoinsResult = await sql`
    SELECT 
      pc.id, 
      c.name, 
      c.symbol, 
      pc.created_at as "createdAt", 
      pc.tx_hash as "txHash",
      pc.active
    FROM promoted_coins pc
    JOIN coins c ON pc.coin_id = c.id
    ORDER BY pc.created_at DESC
  `

  const promotedCoins: PromotedCoin[] = promotedCoinsResult.rows

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Manage Promoted Coins</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Add New Promoted Coin</h2>
          <PromotedCoinForm coins={coins} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Current Promoted Coins</h2>
          <div className="bg-[#0a0a0a] rounded-lg border border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-800">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Coin
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Added On
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {promotedCoins.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-3 text-center text-sm text-gray-400">
                        No promoted coins found
                      </td>
                    </tr>
                  ) : (
                    promotedCoins.map((coin) => (
                      <tr key={coin.id}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          {coin.name} ({coin.symbol})
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                          {new Date(coin.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              coin.active ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"
                            }`}
                          >
                            {coin.active ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <form
                            action={
                              coin.active
                                ? "/api/admin/promoted-coins/deactivate"
                                : "/api/admin/promoted-coins/activate"
                            }
                            method="POST"
                          >
                            <input type="hidden" name="id" value={coin.id} />
                            <button
                              type="submit"
                              className={`text-xs ${
                                coin.active ? "text-red-400 hover:text-red-300" : "text-green-400 hover:text-green-300"
                              } transition`}
                            >
                              {coin.active ? "Deactivate" : "Activate"}
                            </button>
                          </form>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

