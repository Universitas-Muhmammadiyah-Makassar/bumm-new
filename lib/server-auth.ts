// Server-side only auth utilities for App Router
import { cookies } from "next/headers"
import type { UserRole } from "./auth"

// Check if user is authenticated as a student
export async function checkStudentAuth(): Promise<boolean> {
  const cookieStore = cookies()
  const role = cookieStore.get("user_role")?.value

  // For demo purposes, we'll just check the cookie
  // In a real app, you would verify the session token with your backend
  return role === "student"
}

// Check if user is authenticated as an admin
export async function checkAdminAuth(): Promise<boolean> {
  const cookieStore = cookies()
  const role = cookieStore.get("user_role")?.value

  // For demo purposes, we'll just check the cookie
  // In a real app, you would verify the session token with your backend
  return role === "admin"
}

// Get the current user's role
export async function getUserRole(): Promise<UserRole> {
  const cookieStore = cookies()
  const role = cookieStore.get("user_role")?.value as UserRole

  return role || null
}
