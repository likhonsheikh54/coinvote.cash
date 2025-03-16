import type React from "react"
import type { Metadata } from "next"
import AdminSidebar from "@/components/admin/sidebar"
import AdminHeader from "@/components/admin/header"
import AdminAuthCheck from "@/components/admin/auth-check"

export const metadata: Metadata = {
  title: "Admin Dashboard | Coinvote.cash",
  description: "Admin dashboard for Coinvote.cash",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminAuthCheck>
      <div className="min-h-screen bg-moon-night text-white flex">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <AdminHeader />
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </AdminAuthCheck>
  )
}

