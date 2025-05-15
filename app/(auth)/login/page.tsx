"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/shared/ui/button"
import { Input } from "@/components/shared/ui/input"
import { Label } from "@/components/shared/ui/label"
import { User, Lock, ArrowLeft, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/shared/ui/card"
import { Alert, AlertDescription } from "@/components/shared/ui/alert"
import { setUserRole } from "@/lib/auth"

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showError, setShowError] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setShowError(false)

    // Simulate login with the specified credentials
    setTimeout(() => {
      // Student login
      if (username === "105841101818" && password === "samaKemarin00_") {
        setUserRole("student")
        router.push("/dashboard/mahasiswa")
      }
      // Admin login
      else if (username === "105841101818" && password === "samSemua00_") {
        setUserRole("admin")
        router.push("/admin/dashboard")
      }
      // Invalid credentials
      else {
        setError("Username atau password salah. Silakan coba lagi.")
        setShowError(true)
        setLoading(false)
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-4">
        <Link
          href="/"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 transition-colors text-sm"
        >
          <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          Kembali ke Beranda
        </Link>
      </div>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md relative">
          <div className="absolute -z-10 top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute -z-10 bottom-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-blue-500 rounded-full blur-3xl opacity-20"></div>

          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center mb-3 sm:mb-4 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full blur opacity-30 animate-pulse"></div>
              <img
                src="/images/unismuh-logo.png"
                alt="Logo Universitas Muhammadiyah Makassar"
                width={50}
                height={50}
                className="mr-2"
              />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  Beasiswa Unggulan
                </h1>
                <p className="text-xs sm:text-sm text-gray-600">Universitas Muhammadiyah Makassar</p>
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Selamat Datang</h2>
            <p className="text-sm text-gray-600">Masuk ke akun Anda untuk melanjutkan</p>
          </div>

          <Card className="border-none shadow-lg rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-blue-600 pb-6 sm:pb-8 p-4 sm:p-6 relative">
              <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern.png')] opacity-10 mix-blend-overlay"></div>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg text-white">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                Masuk ke Akun Anda
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-white/80">
                Gunakan username dan password Anda untuk mengakses portal beasiswa
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 sm:pt-8 p-4 sm:p-6">
              {showError && (
                <Alert
                  variant="destructive"
                  className="mb-4 sm:mb-6 bg-red-50 text-red-800 border-red-200 rounded-xl text-sm"
                >
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="username" className="text-xs sm:text-sm font-medium">
                    Username
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400">
                      <User className="h-full w-full" />
                    </div>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Masukkan username Anda"
                      className="pl-9 sm:pl-10 rounded-xl h-10 sm:h-12 border-gray-200 text-sm"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="password" className="text-xs sm:text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400">
                      <Lock className="h-full w-full" />
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Masukkan password Anda"
                      className="pl-9 sm:pl-10 rounded-xl h-10 sm:h-12 border-gray-200 text-sm"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl h-10 sm:h-12 mt-4 sm:mt-6 shadow-md hover:shadow-lg transition-shadow text-sm sm:text-base"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Memproses...
                    </div>
                  ) : (
                    "Masuk"
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center pb-6 sm:pb-8 px-4 sm:px-6">
              <p className="text-xs sm:text-sm text-gray-500">
                Lupa password?{" "}
                <Link href="#" className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
                  Reset password
                </Link>
              </p>
            </CardFooter>
          </Card>

          <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-500 bg-white/50 p-3 sm:p-4 rounded-2xl">
            <p>
              Untuk demo, gunakan:
              <br />
              <strong>Mahasiswa:</strong> username "105841101818", password "samaKemarin00_"
              <br />
              <strong>Admin:</strong> username "105841101818", password "samSemua00_"
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
