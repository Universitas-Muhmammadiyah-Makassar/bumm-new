import type React from "react"
import { AdminNavbar } from "@/components/admin/admin-navbar"
import { checkAdminAuth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // In a real app, this would check the session and redirect if not authenticated as admin
  const isAuthenticated = await checkAdminAuth()

  if (!isAuthenticated) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50 page-transition">
      <AdminNavbar />
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
