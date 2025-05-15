import type React from "react"
import { StudentNavbar } from "@/components/student/student-navbar"
import { checkStudentAuth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // In a real app, this would check the session and redirect if not authenticated as student
  const isAuthenticated = await checkStudentAuth()

  if (!isAuthenticated) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-indigo-50 page-transition">
      <StudentNavbar />
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
