"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, X, Home, BookOpen, FileText, Bell, User, LogOut, Sparkles } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface NavbarProps {
  userRole: "mahasiswa" | "admin"
}

export default function Navbar({ userRole }: NavbarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    router.push("/login")
  }

  const navItems =
    userRole === "mahasiswa"
      ? [
          { href: "/dashboard/mahasiswa", label: "Beranda", icon: <Home className="h-5 w-5" /> },
          { href: "/dashboard/beasiswa", label: "Beasiswa", icon: <BookOpen className="h-5 w-5" /> },
          { href: "/aplikasi", label: "Aplikasi Saya", icon: <FileText className="h-5 w-5" /> },
        ]
      : [
          { href: "/dashboard/admin", label: "Beranda", icon: <Home className="h-5 w-5" /> },
          { href: "/admin/beasiswa", label: "Kelola Beasiswa", icon: <BookOpen className="h-5 w-5" /> },
          { href: "/admin/aplikasi", label: "Aplikasi Masuk", icon: <FileText className="h-5 w-5" /> },
        ]

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? "glass shadow-md" : "bg-white/80"}`}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              href={userRole === "mahasiswa" ? "/dashboard/mahasiswa" : "/dashboard/admin"}
              className="flex items-center gap-2 group"
            >
              <div className="flex items-center">
                <img
                  src="/images/unismuh-logo.png"
                  alt="Logo Universitas Muhammadiyah Makassar"
                  width={40}
                  height={40}
                  className="mr-2"
                />
                <div>
                  <h1 className="text-xl font-bold gradient-text">BUMM</h1>
                  <p className="text-xs text-gray-600 hidden md:block">Beasiswa Unggulan Unismuh Makassar</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-full text-sm font-medium flex items-center transition-all duration-300 ${
                  pathname === item.href
                    ? "text-white bg-primary shadow-glow"
                    : "text-gray-700 hover:text-primary hover:bg-blue-mint/30"
                }`}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative hover:bg-blue-mint/30 rounded-full">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-secondary text-primary">
                    3
                  </Badge>
                  <span className="sr-only">Notifikasi</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 rounded-2xl p-2">
                <DropdownMenuLabel className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Notifikasi
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-[300px] overflow-auto">
                  <DropdownMenuItem className="cursor-pointer flex flex-col items-start p-3 rounded-xl hover:bg-blue-mint/30 focus:bg-blue-mint/30">
                    <div className="font-medium">Pengumuman Beasiswa</div>
                    <div className="text-sm text-gray-500">Beasiswa Hafidz Qur'an telah dibuka</div>
                    <div className="text-xs text-gray-400 mt-1">2 jam yang lalu</div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer flex flex-col items-start p-3 rounded-xl hover:bg-blue-mint/30 focus:bg-blue-mint/30">
                    <div className="font-medium">Status Aplikasi</div>
                    <div className="text-sm text-gray-500">Aplikasi Anda telah diterima</div>
                    <div className="text-xs text-gray-400 mt-1">Kemarin</div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer flex flex-col items-start p-3 rounded-xl hover:bg-blue-mint/30 focus:bg-blue-mint/30">
                    <div className="font-medium">Pengingat</div>
                    <div className="text-sm text-gray-500">Batas waktu pendaftaran 3 hari lagi</div>
                    <div className="text-xs text-gray-400 mt-1">3 hari yang lalu</div>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer justify-center text-primary rounded-xl hover:bg-blue-mint/30 focus:bg-blue-mint/30">
                  Lihat semua notifikasi
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
                  <Avatar className="h-8 w-8 border border-gray-200 ring-2 ring-primary/20">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-blue-alt text-white">
                      {userRole === "mahasiswa" ? "MS" : "AD"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-2xl p-2">
                <DropdownMenuLabel className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Akun Saya
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer rounded-xl hover:bg-blue-mint/30 focus:bg-blue-mint/30">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer rounded-xl hover:bg-blue-mint/30 focus:bg-blue-mint/30"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Keluar</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-blue-mint/30 rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6 text-primary" /> : <Menu className="h-6 w-6 text-primary" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="absolute right-0 top-16 w-4/5 max-w-sm h-[calc(100vh-4rem)] bg-white shadow-xl rounded-l-2xl p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-2 py-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-3 rounded-xl text-base font-medium flex items-center transition-all duration-300 ${
                    pathname === item.href
                      ? "text-white bg-primary"
                      : "text-gray-700 hover:text-primary hover:bg-blue-mint/30"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </Link>
              ))}

              <div className="border-t border-gray-200 my-4 pt-4">
                <div className="px-4 py-2 text-sm text-gray-500 font-medium">Akun Saya</div>
                <Link
                  href="/profile"
                  className="block px-4 py-3 rounded-xl text-base font-medium flex items-center text-gray-700 hover:text-primary hover:bg-blue-mint/30"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-5 w-5 mr-2" />
                  <span>Profil</span>
                </Link>
                <button
                  className="w-full text-left px-4 py-3 rounded-xl text-base font-medium flex items-center text-gray-700 hover:text-primary hover:bg-blue-mint/30"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    handleLogout()
                  }}
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  <span>Keluar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
