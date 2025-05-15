"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Sparkles,
  GraduationCap,
  Award,
  BookOpen,
  Users,
  CheckCircle,
  Menu,
  X,
  AlertTriangle,
  ClipboardCheck,
  FileText,
  Upload,
  UserCheck,
  Building,
  MessageSquare,
  Bell,
  ArrowUpRight,
} from "lucide-react"
// Add the import for Tabs component at the top of the file with the other imports
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navbar */}
      <header
        className={`sticky top-0 z-50 bg-white ${scrollY > 10 ? "shadow-sm" : ""} transition-shadow duration-300`}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center"
              >
                <img
                  src="/images/unismuh-logo.png"
                  alt="Logo Universitas Muhammadiyah Makassar"
                  width={40}
                  height={40}
                  className="mr-2"
                />
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-teal-500 bg-clip-text text-transparent">
                    BUMM
                  </h1>
                  <p className="text-xs text-gray-600 hidden md:block">Beasiswa Unggulan Unismuh Makassar</p>
                </div>
              </motion.div>
            </div>

            <nav className="hidden md:flex items-center space-x-1">
              {["Tentang", "Beasiswa", "FAQ", "Kontak"].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-primary hover:bg-blue-50 transition-all"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {item}
                </motion.a>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="rounded-full border-primary text-primary hover:bg-blue-50"
                    whileHover={{ scale: 1.05 }}
                  >
                    Masuk
                  </Button>
                </Link>
              </motion.div>

              <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white py-4 px-4 shadow-lg rounded-b-3xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex flex-col space-y-3">
              {["Tentang", "Beasiswa", "FAQ", "Kontak"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="px-4 py-3 rounded-xl text-gray-700 hover:text-primary hover:bg-blue-50 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="pt-2 border-t border-gray-100">
                <Link href="/login" className="block">
                  <Button
                    className="w-full bg-gradient-to-r from-primary via-blue-alt to-blue-medium text-white rounded-xl"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Masuk
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-primary via-blue-alt to-blue-medium bg-clip-text text-transparent">
                  Beasiswa Unggulan
                </span>
                <br />
                <span className="bg-gradient-to-r from-secondary via-amber-500 to-orange-400 bg-clip-text text-transparent">
                  untuk Masa Depan Cerah
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
                Wujudkan impian akademismu dengan beasiswa berkualitas untuk mahasiswa berprestasi ✨
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/login">
                    <Button className="bg-gradient-to-r from-primary to-blue-alt text-white rounded-full shadow-lg hover:shadow-xl transition-all px-6 py-6 h-auto text-base w-full sm:w-auto">
                      Daftar Sekarang <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a href="#beasiswa">
                    <Button
                      variant="outline"
                      className="bg-transparent border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full px-6 py-6 h-auto text-base w-full sm:w-auto"
                    >
                      Lihat Beasiswa
                    </Button>
                  </a>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative z-10">
                <img
                  src="/graduation-celebration.png"
                  alt="Students celebrating graduation"
                  className="rounded-3xl shadow-xl"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-secondary rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute bottom-0 left-0 -ml-4 -mb-4 w-36 h-36 bg-blue-alt rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </motion.div>
          </div>
        </div>

        {/* Decorative shapes */}
        <div className="absolute top-20 left-0 w-64 h-64 bg-blue-light rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-10 right-0 w-64 h-64 bg-blue-mint rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </section>
      {/* Beasiswa Section */}
      <section id="beasiswa" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Program{" "}
              <span className="bg-gradient-to-r from-primary via-blue-alt to-blue-medium bg-clip-text text-transparent">
                Beasiswa Unggulan
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Universitas Muhammadiyah Makassar menawarkan berbagai program beasiswa untuk mendukung mahasiswa
              berprestasi dalam menempuh pendidikan tinggi.
            </p>
          </motion.div>

          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Tabs defaultValue="hafidz" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8 h-auto p-1 bg-gray-100 rounded-xl">
                <TabsTrigger
                  value="hafidz"
                  className="py-3 data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg flex flex-col sm:flex-row items-center gap-2"
                >
                  <BookOpen className="h-5 w-5" />
                  <span>Hafidz Qur'an</span>
                </TabsTrigger>
                <TabsTrigger
                  value="akademik"
                  className="py-3 data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg flex flex-col sm:flex-row items-center gap-2"
                >
                  <Award className="h-5 w-5" />
                  <span>Prestasi Akademik</span>
                </TabsTrigger>
                <TabsTrigger
                  value="persyarikatan"
                  className="py-3 data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg flex flex-col sm:flex-row items-center gap-2"
                >
                  <Users className="h-5 w-5" />
                  <span>Bibit Unggul</span>
                </TabsTrigger>
              </TabsList>

              {/* Hafidz Qur'an Tab */}
              <TabsContent value="hafidz" className="focus-visible:outline-none focus-visible:ring-0">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-6 shadow-lg">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-primary to-blue-alt flex items-center justify-center text-white shadow-md">
                      <BookOpen className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">Beasiswa Hafidz Qur'an</h3>
                      <p className="text-gray-600">
                        Beasiswa khusus bagi mahasiswa yang memiliki hafalan Al-Qur'an dengan baik
                      </p>
                    </div>
                    <span className="ml-auto badge-pill inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      Dibuka
                    </span>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
                      <Award className="h-5 w-5 text-primary mr-2" />
                      Kategori & Besaran Beasiswa
                      <span className="text-sm font-normal text-gray-500 ml-2">(selama 8 semester)</span>
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          category: "Kategori 1",
                          quota: "50 Orang",
                          amount: "Beasiswa 100% Uang Kuliah",
                          requirement: "Bagi penghafal 30 Juz Mutqin",
                          color: "from-primary to-blue-alt",
                          bgColor: "bg-blue-50",
                        },
                        {
                          category: "Kategori 2",
                          quota: "50 Orang",
                          amount: "Beasiswa 75% Uang Kuliah",
                          requirement: "Bagi penghafal minimal 20 Juz Mutqin",
                          color: "from-blue-alt to-blue-medium",
                          bgColor: "bg-blue-50",
                        },
                        {
                          category: "Kategori 3",
                          quota: "50 Orang",
                          amount: "Beasiswa 50% Uang Kuliah",
                          requirement: "Bagi penghafal minimal 15 Juz Mutqin",
                          color: "from-blue-medium to-blue-light",
                          bgColor: "bg-blue-50",
                        },
                        {
                          category: "Kategori 4",
                          quota: "150 Orang",
                          amount: "Beasiswa 25% Uang Kuliah",
                          requirement: "Bagi penghafal minimal 5 Juz Mutqin",
                          color: "from-blue-light to-blue-mint",
                          bgColor: "bg-blue-50",
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-xl ${item.bgColor} border border-blue-100 hover:shadow-md transition-all`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="font-semibold text-gray-800">{item.category}</h5>
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                              {item.quota}
                            </span>
                          </div>
                          <div className={`h-1 w-full bg-gradient-to-r ${item.color} rounded-full mb-3`}></div>
                          <p className="font-medium text-gray-800">{item.amount}</p>
                          <p className="text-sm text-gray-600">{item.requirement}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
                      <ClipboardCheck className="h-5 w-5 text-primary mr-2" />
                      Persyaratan Khusus
                    </h4>

                    <ul className="space-y-2 mb-6">
                      {[
                        "Bukti hafalan Al-Qur'an (Sertifikat, Syahadah, Ijazah, atau Surat Keterangan dari Pesantren/Madrasah/Lembaga Tahfiz asli).",
                        "KTP/KK, Ijazah SMA/SMK/MA atau Surat Keterangan Lulus (SKL).",
                        "Mengikuti Seleksi Hafalan Qur'an oleh panitia.",
                        "Khusus pendaftar Program Studi Pendidikan Dokter, wajib melampirkan bukti kelulusan seleksi UPT-PMB Unismuh Makassar.",
                        "Menandatangani Surat Perjanjian mempertahankan IP Semester minimal 3,0, surat pernyataan siap mengikuti pembinaan, dan surat pernyataan tidak menerima beasiswa lain (bermaterai 10.000).",
                        "Melampirkan Sertifikat Prestasi (jika ada).",
                        "Mengikuti Tes Wawancara.",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="min-w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-semibold text-sm mt-0.5">
                            {index + 1}
                          </div>
                          <p className="text-gray-700">{item}</p>
                        </li>
                      ))}
                    </ul>

                    <div className="flex justify-center mt-6">
                      <Link href="/login">
                        <Button className="bg-gradient-to-r from-primary to-blue-alt text-white rounded-xl shadow-md hover:shadow-lg transition-all">
                          Daftar Sekarang <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Prestasi Akademik Tab */}
              <TabsContent value="akademik" className="focus-visible:outline-none focus-visible:ring-0">
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-3xl p-6 shadow-lg">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-secondary to-amber-500 flex items-center justify-center text-white shadow-md">
                      <Award className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">Beasiswa Prestasi Akademik</h3>
                      <p className="text-gray-600">
                        Beasiswa untuk mahasiswa berprestasi dengan nilai akademik yang tinggi dan konsisten
                      </p>
                    </div>
                    <span className="ml-auto badge-pill inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      Dibuka
                    </span>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
                      <Award className="h-5 w-5 text-secondary mr-2" />
                      Kategori & Besaran Beasiswa
                      <span className="text-sm font-normal text-gray-500 ml-2">(selama 8 semester)</span>
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          category: "Kategori 1",
                          quota: "33 Orang",
                          amount: "Beasiswa 100% Uang Kuliah",
                          requirement: "Rata-Rata Nilai Rapor Pengetahuan Semester 1-5 minimal 95",
                          color: "from-secondary to-amber-500",
                          bgColor: "bg-amber-50",
                        },
                        {
                          category: "Kategori 2",
                          quota: "347 Orang",
                          amount: "Beasiswa 75% Uang Kuliah",
                          requirement: "Rata-Rata Nilai Rapor Pengetahuan Semester 1-5 minimal 90",
                          color: "from-amber-500 to-amber-400",
                          bgColor: "bg-amber-50",
                        },
                        {
                          category: "Kategori 3",
                          quota: "292 Orang",
                          amount: "Beasiswa 50% Uang Kuliah",
                          requirement: "Rata-Rata Nilai Rapor Pengetahuan Semester 1-5 minimal 85",
                          color: "from-amber-400 to-orange-300",
                          bgColor: "bg-amber-50",
                        },
                        {
                          category: "Kategori 4",
                          quota: "194 Orang",
                          amount: "Beasiswa 25% Uang Kuliah",
                          requirement: "Rata-Rata Nilai Rapor Pengetahuan Semester 1-5 minimal 80",
                          color: "from-orange-300 to-orange-200",
                          bgColor: "bg-amber-50",
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-xl ${item.bgColor} border border-amber-100 hover:shadow-md transition-all`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="font-semibold text-gray-800">{item.category}</h5>
                            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                              {item.quota}
                            </span>
                          </div>
                          <div className={`h-1 w-full bg-gradient-to-r ${item.color} rounded-full mb-3`}></div>
                          <p className="font-medium text-gray-800">{item.amount}</p>
                          <p className="text-sm text-gray-600">{item.requirement}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
                      <ClipboardCheck className="h-5 w-5 text-secondary mr-2" />
                      Persyaratan Khusus
                    </h4>

                    <ul className="space-y-2 mb-6">
                      {[
                        "Berlaku untuk Program Studi non-Kedokteran.",
                        "KTP/KK, Ijazah SMA/SMK/MA atau Surat Keterangan Lulus (SKL).",
                        "Rapor Semester 1 sampai dengan 5.",
                        "Menandatangani Surat Perjanjian mempertahankan IP Semester minimal 3,0, surat pernyataan siap mengikuti pembinaan, dan surat pernyataan tidak menerima beasiswa lain (bermaterai 10.000).",
                        "Melampirkan Sertifikat Prestasi (jika ada).",
                        "Merupakan lulusan sekolah tahun 2024.",
                        "Mengikuti Tes Wawancara.",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="min-w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-semibold text-sm mt-0.5">
                            {index + 1}
                          </div>
                          <p className="text-gray-700">{item}</p>
                        </li>
                      ))}
                    </ul>

                    <div className="flex justify-center mt-6">
                      <Link href="/login">
                        <Button className="bg-gradient-to-r from-secondary to-amber-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all">
                          Daftar Sekarang <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Bibit Unggul Persyarikatan Tab */}
              <TabsContent value="persyarikatan" className="focus-visible:outline-none focus-visible:ring-0">
                <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-3xl p-6 shadow-lg">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-teal-500 to-green-400 flex items-center justify-center text-white shadow-md">
                      <Users className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">Beasiswa Bibit Unggul Persyarikatan</h3>
                      <p className="text-gray-600">Beasiswa khusus bagi kader Ikatan Pelajar Muhammadiyah (IPM)</p>
                    </div>
                    <span className="ml-auto badge-pill inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      Segera Dibuka
                    </span>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
                      <Award className="h-5 w-5 text-teal-500 mr-2" />
                      Kategori & Besaran Beasiswa
                      <span className="text-sm font-normal text-gray-500 ml-2">(selama 8 semester)</span>
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        {
                          category: "Kategori 1",
                          quota: "111 Orang",
                          amount: "Beasiswa 100% Uang Kuliah",
                          requirement: "Bagi Mantan dan atau Ketua, Sekretaris, dan Bendahara PD atau PC IPM",
                          color: "from-teal-500 to-green-400",
                          bgColor: "bg-teal-50",
                        },
                        {
                          category: "Kategori 2",
                          quota: "111 Orang",
                          amount: "Beasiswa 75% Uang Kuliah",
                          requirement: "Bagi mantan dan atau Ketua Bidang dan Sekretaris Bidang PD atau PC IPM",
                          color: "from-teal-400 to-teal-300",
                          bgColor: "bg-teal-50",
                        },
                        {
                          category: "Kategori 3",
                          quota: "213 Orang",
                          amount: "Beasiswa 50% Uang Kuliah",
                          requirement: "Bagi mantan dan atau Anggota Bidang PD atau PC IPM",
                          color: "from-teal-300 to-green-300",
                          bgColor: "bg-teal-50",
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-xl ${item.bgColor} border border-teal-100 hover:shadow-md transition-all`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="font-semibold text-gray-800">{item.category}</h5>
                            <span className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded-full">
                              {item.quota}
                            </span>
                          </div>
                          <div className={`h-1 w-full bg-gradient-to-r ${item.color} rounded-full mb-3`}></div>
                          <p className="font-medium text-gray-800">{item.amount}</p>
                          <p className="text-sm text-gray-600">{item.requirement}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
                      <ClipboardCheck className="h-5 w-5 text-teal-500 mr-2" />
                      Persyaratan Khusus
                    </h4>

                    <ul className="space-y-2 mb-6">
                      {[
                        "Memiliki SK Pengurus Pimpinan Cabang atau Pimpinan Daerah Ikatan Pelajar Muhammadiyah.",
                        "KTP/KK, Ijazah SMA/SMK/MA atau Surat Keterangan Lulus (SKL).",
                        "Berlaku untuk Program Studi non-Kedokteran.",
                        "Menandatangani Surat Perjanjian mempertahankan IP Semester minimal 3,0, surat pernyataan siap mengikuti pembinaan, dan surat pernyataan tidak menerima beasiswa lain (bermaterai 10.000).",
                        "Melampirkan Sertifikat Prestasi (jika ada).",
                        "Mengikuti Tes Wawancara.",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="min-w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center text-teal-800 font-semibold text-sm mt-0.5">
                            {index + 1}
                          </div>
                          <p className="text-gray-700">{item}</p>
                        </li>
                      ))}
                    </ul>

                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                      <div className="flex items-start gap-3">
                        <div className="min-w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                          <AlertTriangle className="h-4 w-4 text-amber-600" />
                        </div>
                        <p className="text-amber-800">
                          <span className="font-semibold">Pengingat:</span> Pendaftaran jalur ini melalui PW IPM
                          Sulawesi Selatan.
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-center mt-6">
                      <Link href="/login">
                        <Button className="bg-gradient-to-r from-teal-500 to-green-400 text-white rounded-xl shadow-md hover:shadow-lg transition-all">
                          Lihat Detail <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>

          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/login">
              <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-blue-50">
                Lihat Semua Beasiswa <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Process Section - Revamped */}
      <section id="tentang" className="py-20 bg-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-full text-amber-600 text-sm font-medium mb-3">
              Langkah Mudah
            </span>
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              Proses{" "}
              <span className="bg-gradient-to-r from-secondary via-amber-500 to-orange-400 bg-clip-text text-transparent">
                Pendaftaran Beasiswa
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ikuti langkah-langkah sederhana berikut untuk mendaftar program beasiswa di Universitas Muhammadiyah
              Makassar.
            </p>
          </motion.div>

          {/* Timeline Process */}
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-secondary to-teal-500 rounded-full"></div>

              {/* Process Steps */}
              {[
                {
                  step: "01",
                  title: "Buat Akun",
                  description: "Daftar dan buat akun di portal beasiswa BUMM untuk memulai proses pendaftaran.",
                  icon: <UserCheck className="h-6 w-6 text-white" />,
                  color: "from-primary to-blue-alt",
                  bgColor: "bg-blue-50",
                  alignment: "right",
                },
                {
                  step: "02",
                  title: "Pilih Beasiswa",
                  description: "Pilih program beasiswa yang sesuai dengan kriteria dan prestasi Anda.",
                  icon: <Award className="h-6 w-6 text-white" />,
                  color: "from-blue-alt to-blue-medium",
                  bgColor: "bg-blue-50",
                  alignment: "left",
                },
                {
                  step: "03",
                  title: "Lengkapi Dokumen",
                  description: "Unggah dokumen yang diperlukan sesuai persyaratan beasiswa yang dipilih.",
                  icon: <FileText className="h-6 w-6 text-white" />,
                  color: "from-secondary to-amber-500",
                  bgColor: "bg-amber-50",
                  alignment: "right",
                },
                {
                  step: "04",
                  title: "Tunggu Hasil",
                  description: "Pantau status aplikasi Anda melalui dashboard dan tunggu pengumuman hasil seleksi.",
                  icon: <Bell className="h-6 w-6 text-white" />,
                  color: "from-teal-500 to-green-400",
                  bgColor: "bg-teal-50",
                  alignment: "left",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center mb-12 ${
                    step.alignment === "left" ? "md:flex-row-reverse" : "md:flex-row"
                  } flex-col`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Content */}
                  <div
                    className={`md:w-5/12 w-full ${step.alignment === "left" ? "md:text-right" : "md:text-left"} text-center`}
                  >
                    <motion.div
                      className={`${step.bgColor} p-6 rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-100`}
                      whileHover={{ y: -5 }}
                    >
                      <div
                        className={`flex items-center gap-3 mb-3 ${step.alignment === "left" ? "md:justify-end" : "md:justify-start"} justify-center`}
                      >
                        <div
                          className={`w-10 h-10 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-lg shadow-sm`}
                        >
                          {step.step}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
                      </div>
                      <p className="text-gray-600">{step.description}</p>

                      {/* Additional info based on step */}
                      {step.step === "01" && (
                        <div className="mt-4 bg-blue-100/50 p-3 rounded-xl text-sm text-blue-700">
                          <span className="font-medium">Tip:</span> Pastikan email yang Anda gunakan aktif untuk
                          menerima notifikasi penting.
                        </div>
                      )}

                      {step.step === "03" && (
                        <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                          <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">KTP/KK</span>
                          <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">Ijazah</span>
                          <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">Rapor</span>
                          <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">Sertifikat</span>
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Center Icon for Desktop */}
                  <div className="md:w-2/12 hidden md:flex justify-center items-center">
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center z-10 shadow-lg`}
                    >
                      {step.icon}
                    </div>
                  </div>

                  {/* Empty space for alignment */}
                  <div className="md:w-5/12 hidden md:block"></div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link href="/login">
                <Button className="bg-gradient-to-r from-primary to-blue-alt text-white rounded-full shadow-lg hover:shadow-xl transition-all px-8 py-3">
                  Mulai Pendaftaran <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Proses pendaftaran cepat dan mudah</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ketentuan Umum Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Ketentuan{" "}
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Umum
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Syarat dan ketentuan yang berlaku untuk seluruh program beasiswa di Universitas Muhammadiyah Makassar.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              className="bg-amber-50 border border-amber-200 rounded-3xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">KETENTUAN UMUM</h3>
              </div>

              <ul className="space-y-4">
                {[
                  "Telah terdaftar di sistem penerimaan Mahasiswa Baru Universitas Muhammadiyah Makassar dan dinyatakan telah Lulus pada Program Studi yang memiliki kuota beasiswa;",
                  "Tiap kategori beasiswa hanya dipersiapkan bagi kategori yang telah ditetapkan dan tidak dapat dialihkan ke kategori lain;",
                  "Kuota beasiswa harus diisi sesuai dengan Prodi yang telah ditentukan dan tidak dapat dialihkan ke Prodi lain;",
                  "Penerima BUMM tidak sedang menerima atau akan menerima Beasiswa dari tempat atau pihak lain.",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="min-w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-semibold text-sm mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{item}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Proses Seleksi Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Proses{" "}
              <span className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
                Seleksi
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tahapan seleksi untuk mendapatkan Beasiswa Universitas Muhammadiyah Makassar (BUMM) Tahun Akademik
              2025/2026.
            </p>
          </motion.div>

          {/* Redesigned Proses Seleksi Section */}
          <div className="max-w-5xl mx-auto">
            {/* Proses Seleksi Card */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center text-white shadow-md">
                  <ClipboardCheck className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">PROSES SELEKSI</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Building className="h-5 w-5 text-indigo-600" />,
                    title: "Pendaftaran Mahasiswa Baru",
                    description:
                      "Calon pendaftar BUMM terlebih dahulu melakukan pendaftaran Mahasiswa Baru melalui situs e-pmb.unismuh.ac.id",
                    color: "bg-indigo-50 border-indigo-200",
                    iconBg: "bg-indigo-100",
                  },
                  {
                    icon: <UserCheck className="h-5 w-5 text-blue-600" />,
                    title: "Pendaftaran Beasiswa",
                    description:
                      "Setelah dinyatakan lulus dan memiliki NIM, pendaftar melakukan pendaftaran Beasiswa melalui situs beasiswa.unismuh.ac.id",
                    color: "bg-blue-50 border-blue-200",
                    iconBg: "bg-blue-100",
                  },
                  {
                    icon: <FileText className="h-5 w-5 text-purple-600" />,
                    title: "Pengisian Data",
                    description: "Mengisi data secara lengkap sesuai isian yang ada pada formulir pendaftaran",
                    color: "bg-purple-50 border-purple-200",
                    iconBg: "bg-purple-100",
                  },
                  {
                    icon: <Upload className="h-5 w-5 text-teal-600" />,
                    title: "Upload Dokumen",
                    description: "Mengupload dokumen persyaratan sesuai dengan beasiswa yang akan didaftari",
                    color: "bg-teal-50 border-teal-200",
                    iconBg: "bg-teal-100",
                  },
                  {
                    icon: <AlertTriangle className="h-5 w-5 text-amber-600" />,
                    title: "Batasan Pendaftaran",
                    description: "Satu pendaftar hanya dapat mengisi formulir 1 kali",
                    color: "bg-amber-50 border-amber-200",
                    iconBg: "bg-amber-100",
                  },
                  {
                    icon: <Building className="h-5 w-5 text-orange-600" />,
                    title: "Jalur Khusus",
                    description:
                      "Khusus Jalur Bibit Unggul Persyarikatan, pendaftaran dilakukan melalui PW IPM Sulawesi Selatan",
                    color: "bg-orange-50 border-orange-200",
                    iconBg: "bg-orange-100",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className={`p-5 rounded-2xl border ${item.color} hover:shadow-md transition-all`}
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center shrink-0`}>
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Validasi, Seleksi, Pengumuman Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Validasi Card */}
              <motion.div
                className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-6 shadow-md relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-100 rounded-full -mr-12 -mt-12 opacity-50 group-hover:scale-110 transition-transform duration-500"></div>

                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white shadow-md">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">VALIDASI</h3>
                </div>

                <div className="space-y-4 relative z-10">
                  <div className="flex items-start gap-3 group/item">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                      <ClipboardCheck className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Verifikasi Dokumen</h4>
                      <p className="text-sm text-gray-600">Validasi akan dilakukan oleh Panitia</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 group/item">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
                      <Bell className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Pengumuman Hasil</h4>
                      <p className="text-sm text-gray-600">
                        Pendaftar yang memenuhi persyaratan akan diumumkan melalui website, sosial media, dan secara
                        personal oleh Panitia
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Seleksi Card */}
              <motion.div
                className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-3xl p-6 shadow-md relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-full -mr-12 -mt-12 opacity-50 group-hover:scale-110 transition-transform duration-500"></div>

                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center text-white shadow-md">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">SELEKSI</h3>
                </div>

                <div className="space-y-4 relative z-10">
                  <div className="flex items-start gap-3 group/item">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Tes Hafalan Al-Qur'an</h4>
                      <p className="text-sm text-gray-600">Khusus bagi pendaftar Beasiswa Hafidz Qur'an</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 group/item">
                    <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center shrink-0">
                      <MessageSquare className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Tes Wawancara</h4>
                      <p className="text-sm text-gray-600">Mengikuti Tes Wawancara dengan tim penguji</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Pengumuman Card */}
              <motion.div
                className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 shadow-md relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-100 rounded-full -mr-12 -mt-12 opacity-50 group-hover:scale-110 transition-transform duration-500"></div>

                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-md">
                    <Award className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">PENGUMUMAN</h3>
                </div>

                <div className="space-y-4 relative z-10">
                  <div className="flex items-start gap-3 group/item">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                      <Bell className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Notifikasi Penerima</h4>
                      <p className="text-sm text-gray-600">
                        Pendaftar yang dinyatakan Lulus akan dihubungi oleh Panitia
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 group/item">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                      <ArrowUpRight className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Publikasi Hasil</h4>
                      <p className="text-sm text-gray-600">
                        Hasil seleksi diumumkan melalui website serta sosial media resmi
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href="/login">
                <Button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all px-6 py-3">
                  Mulai Pendaftaran <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Apa Kata{" "}
              <span className="bg-gradient-to-r from-blue-medium via-blue-light to-blue-mint bg-clip-text text-transparent">
                Penerima Beasiswa
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dengarkan pengalaman dari mahasiswa yang telah menerima beasiswa di Universitas Muhammadiyah Makassar.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Ahmad Fauzi",
                role: "Mahasiswa Teknik Informatika",
                quote:
                  "Beasiswa ini sangat membantu saya fokus pada studi tanpa khawatir masalah biaya kuliah. Terima kasih BUMM!",
                image: "/young-male-student.png",
                gradient: "from-primary to-blue-alt",
              },
              {
                name: "Siti Aisyah",
                role: "Mahasiswa Kedokteran",
                quote:
                  "Program beasiswa yang sangat terstruktur dan transparan. Proses seleksinya adil dan profesional.",
                image: "/young-female-medical-student.png",
                gradient: "from-secondary to-amber-500",
              },
              {
                name: "Muhammad Rizki",
                role: "Mahasiswa Ekonomi",
                quote:
                  "Selain bantuan finansial, program mentoring yang diberikan sangat bermanfaat untuk pengembangan diri saya.",
                image: "/placeholder.svg?key=ywgno",
                gradient: "from-teal-500 to-green-400",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-3xl shadow-md hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <div className={`w-1 h-16 bg-gradient-to-b ${testimonial.gradient} rounded-full mr-4`}></div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Pertanyaan yang Sering{" "}
              <span className="bg-gradient-to-r from-blue-medium via-blue-light to-blue-mint bg-clip-text text-transparent">
                Diajukan (FAQ)
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Temukan jawaban atas pertanyaan umum seputar program beasiswa di Universitas Muhammadiyah Makassar.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              className="bg-blue-50 border border-blue-200 rounded-3xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">FAQ</h3>
              </div>

              <ul className="space-y-4">
                {[
                  "Apa saja syarat untuk mendaftar beasiswa?",
                  "Bagaimana cara mengajukan beasiswa?",
                  "Kapan batas waktu pendaftaran beasiswa?",
                  "Bagaimana proses seleksi beasiswa?",
                  "Apa saja jenis beasiswa yang tersedia?",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="min-w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 font-semibold text-sm mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{item}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontak" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Hubungi{" "}
              <span className="bg-gradient-to-r from-blue-medium via-blue-light to-blue-mint bg-clip-text text-transparent">
                Kami
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Jika Anda memiliki pertanyaan lebih lanjut, jangan ragu untuk menghubungi kami.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              className="bg-blue-50 border border-blue-200 rounded-3xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Kontak Kami</h3>
              </div>

              <ul className="space-y-4">
                {[
                  "Email: beasiswa@unismuh.ac.id",
                  "Telepon: (0411) 1234567",
                  "Alamat: Jl. Sultan Alauddin No.259, Makassar",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="min-w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 font-semibold text-sm mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{item}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-100 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} Universitas Muhammadiyah Makassar. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
