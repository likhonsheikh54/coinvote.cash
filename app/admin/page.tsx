import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Coins, ImageIcon, Gift, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#0D1217] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,345</div>
            <p className="text-xs text-gray-400 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1 text-coin-green" />
              <span className="text-coin-green">+5.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#0D1217] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Listed Coins</CardTitle>
            <Coins className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,721</div>
            <p className="text-xs text-gray-400 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1 text-coin-green" />
              <span className="text-coin-green">+12.3%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#0D1217] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Airdrops</CardTitle>
            <Gift className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-gray-400 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1 text-coin-green" />
              <span className="text-coin-green">+3.7%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#0D1217] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Votes</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2M</div>
            <p className="text-xs text-gray-400 flex items-center mt-1">
              <ArrowDownRight className="h-3 w-3 mr-1 text-red-500" />
              <span className="text-red-500">-2.1%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-[#0D1217] border-gray-800">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 pb-4 border-b border-gray-800 last:border-0 last:pb-0"
                    >
                      <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                        {i % 3 === 0 ? (
                          <Users className="h-5 w-5 text-coin-yellow" />
                        ) : i % 3 === 1 ? (
                          <Coins className="h-5 w-5 text-coin-green" />
                        ) : (
                          <Gift className="h-5 w-5 text-blue-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">
                          {i % 3 === 0 ? "New user registered" : i % 3 === 1 ? "New coin listed" : "New airdrop added"}
                        </p>
                        <p className="text-sm text-gray-400">{30 - i * 5} minutes ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#0D1217] border-gray-800">
              <CardHeader>
                <CardTitle>Pending Approvals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between pb-4 border-b border-gray-800 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                          {i % 2 === 0 ? (
                            <Coins className="h-5 w-5 text-coin-yellow" />
                          ) : (
                            <ImageIcon className="h-5 w-5 text-purple-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{i % 2 === 0 ? "New Coin Submission" : "NFT Collection"}</p>
                          <p className="text-sm text-gray-400">Submitted {i} hours ago</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-coin-green text-white text-sm rounded-md">Approve</button>
                        <button className="px-3 py-1 bg-red-500 text-white text-sm rounded-md">Reject</button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <Card className="bg-[#0D1217] border-gray-800">
            <CardHeader>
              <CardTitle>Analytics Content</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">Analytics dashboard will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <Card className="bg-[#0D1217] border-gray-800">
            <CardHeader>
              <CardTitle>Reports Content</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">Reports dashboard will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card className="bg-[#0D1217] border-gray-800">
            <CardHeader>
              <CardTitle>Notifications Content</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">Notifications dashboard will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

