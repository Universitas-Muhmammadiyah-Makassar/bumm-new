"use client"

import type { UserRole } from "./auth"

// Set the user role in cookies (for client-side use only)
export function setUserRole(role: UserRole): void {
  document.cookie = `user_role=${role}; path=/; max-age=86400`
}

// Get cookie value (client-side only)
export function getCookieValue(name: string): string | undefined {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
  return match ? match[2] : undefined
}

// Get the current user's role (client-side only)
export function getUserRole(): UserRole {
  const role = getCookieValue("user_role") as UserRole
  return role || null
}

// Check if user is authenticated as a student (client-side only)
export function checkStudentAuth(): boolean {
  const role = getCookieValue("user_role")
  return role === "student"
}

// Check if user is authenticated as an admin (client-side only)
export function checkAdminAuth(): boolean {
  const role = getCookieValue("user_role")
  return role === "admin"
}
