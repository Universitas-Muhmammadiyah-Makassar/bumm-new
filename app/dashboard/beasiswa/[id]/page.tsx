"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Navbar from "@/components/navbar"
import {
  BookOpen,
  Award,
  GraduationCap,
  Calendar,
  AlertCircle,
  Clock,
  CheckCircle2,
  FileText,
  Upload,
  ArrowLeft,
  Info,
  Sparkles,
  Users,
  CheckCircle,
  ChevronRight,
  Lightbulb,
  HelpCircle,
  Star,
  Bookmark,
  Share2,
  Download,
} from "lucide-react"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const StatusBadge = ({ status }) => {
  const statusStyles = {
    Dibuka: "bg-emerald-100 text-emerald-800 border-emerald-200",
    "Segera Dibuka": "bg-amber-100 text-amber-800 border-amber-200",
    Ditutup: "bg-red-100 text-red-800 border-red-200",
    Aktif: "bg-emerald-100 text-emerald-800 border-emerald-200",
    "Belum Dimulai": "bg-slate-100 text-slate-800 border-slate-200",
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusStyles[status] || "bg-gray-100 text-gray-800 border-gray-200"}`}
    >
      {status === "Dibuka" || status === "Aktif" ? (
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
      ) : status === "Segera Dibuka" ? (
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>
      ) : (
        <span className="w-1.5 h-1.5 rounded-full bg-gray-500 mr-1.5"></span>
      )}
      {status}
    </span>
  )
}

export default function BeasiswaDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id
  const [activeTab, setActiveTab] = useState("info")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showShareOptions, setShowShareOptions] = useState(false)

  // Mock data untuk beasiswa
  const beasiswaData = {
    id: Number(id),
    nama:
      id === "1"
        ? "Beasiswa Hafidz Qur'an"
        : id === "2"
          ? "Beasiswa Prestasi Akademik"
          : "Beasiswa Bibit Unggul Persyarikatan",
    deskripsi:
      id === "1"
        ? "Beasiswa khusus bagi mahasiswa yang memiliki kemampuan menghafal Al-Qur'an dengan baik."
        : id === "2"
          ? "Beasiswa untuk mahasiswa berprestasi dengan nilai akademik yang tinggi dan konsisten."
          : "Beasiswa khusus bagi mahasiswa yang aktif dalam kegiatan persyarikatan Muhammadiyah.",
    icon:
      id === "1" ? (
        <BookOpen className="h-5 w-5" />
      ) : id === "2" ? (
        <Award className="h-5 w-5" />
      ) : (
        <GraduationCap className="h-5 w-5" />
      ),
    deadline: id === "1" ? "30 Juni 2025" : id === "2" ? "15 Juli 2025" : "10 Agustus 2025",
    kuota: id === "1" ? 50 : id === "2" ? 100 : 75,
    status: id === "3" ? "Segera Dibuka" : "Dibuka",
    persyaratan: [
      "Mahasiswa aktif Universitas Muhammadiyah Makassar",
      id === "1"
        ? "Minimal hafal 5 juz Al-Qur'an"
        : id === "2"
          ? "IPK minimal 3.50"
          : "Aktif dalam organisasi Muhammadiyah",
      id === "1" ? "IPK minimal 3.00" : id === "2" ? "Aktif dalam kegiatan akademik" : "IPK minimal 3.25",
      id === "1"
        ? "Aktif dalam kegiatan keagamaan"
        : id === "2"
          ? "Memiliki prestasi akademik tingkat universitas/nasional"
          : "Memiliki rekomendasi dari Pimpinan Muhammadiyah",
    ],
    dokumen: [
      "Scan KTM (Kartu Tanda Mahasiswa)",
      "Scan KTP",
      "Transkrip nilai terakhir",
      id === "1"
        ? "Sertifikat hafalan Al-Qur'an"
        : id === "2"
          ? "Sertifikat prestasi akademik"
          : "Surat rekomendasi dari Pimpinan Muhammadiyah",
      "Surat pernyataan tidak sedang menerima beasiswa lain",
    ],
    benefit: [
      "Bebas biaya kuliah selama 1 semester",
      "Tunjangan bulanan Rp 500.000",
      "Akses ke program mentoring akademik",
      "Kesempatan mengikuti pelatihan pengembangan diri",
    ],
    timeline: [
      {
        tahap: "Pendaftaran",
        tanggal: id === "1" ? "1 - 30 Juni 2025" : id === "2" ? "1 - 15 Juli 2025" : "1 - 10 Agustus 2025",
        status: "Aktif",
        deskripsi: "Periode pendaftaran dan pengumpulan berkas persyaratan",
      },
      {
        tahap: "Seleksi Administrasi",
        tanggal: id === "1" ? "1 - 7 Juli 2025" : id === "2" ? "16 - 23 Juli 2025" : "11 - 18 Agustus 2025",
        status: "Belum Dimulai",
        deskripsi: "Verifikasi kelengkapan dan kesesuaian dokumen",
      },
      {
        tahap: "Wawancara",
        tanggal: id === "1" ? "10 - 15 Juli 2025" : id === "2" ? "25 - 30 Juli 2025" : "20 - 25 Agustus 2025",
        status: "Belum Dimulai",
        deskripsi: "Wawancara dengan tim seleksi beasiswa",
      },
      {
        tahap: "Pengumuman",
        tanggal: id === "1" ? "20 Juli 2025" : id === "2" ? "5 Agustus 2025" : "31 Agustus 2025",
        status: "Belum Dimulai",
        deskripsi: "Pengumuman penerima beasiswa",
      },
    ],
    faq: [
      {
        pertanyaan: "Apakah saya bisa mendaftar lebih dari satu beasiswa?",
        jawaban:
          "Ya, Anda dapat mendaftar lebih dari satu beasiswa, namun jika diterima, Anda hanya dapat menerima satu beasiswa saja.",
      },
      {
        pertanyaan: "Bagaimana cara mengetahui status aplikasi saya?",
        jawaban: "Anda dapat melihat status aplikasi di halaman 'Aplikasi Saya' setelah login ke akun Anda.",
      },
      {
        pertanyaan: "Apakah beasiswa ini dapat diperpanjang?",
        jawaban:
          "Ya, beasiswa dapat diperpanjang untuk semester berikutnya jika Anda memenuhi persyaratan yang ditentukan.",
      },
      {
        pertanyaan: "Apa yang harus dilakukan jika dokumen saya tidak lengkap?",
        jawaban:
          "Pastikan semua dokumen yang dipersyaratkan dilengkapi sebelum batas waktu pendaftaran. Jika ada kendala, silakan hubungi admin beasiswa.",
      },
      {
        pertanyaan: "Berapa lama proses seleksi berlangsung?",
        jawaban: "Proses seleksi biasanya berlangsung selama 3-4 minggu sejak tanggal penutupan pendaftaran.",
      },
      {
        pertanyaan: "Apakah ada tes tertulis dalam proses seleksi?",
        jawaban: "Tidak ada tes tertulis, namun akan ada wawancara untuk menilai kelayakan dan motivasi pendaftar.",
      },
    ],
    testimonials: [
      {
        name: "Ahmad Fauzi",
        program: "Teknik Informatika",
        angkatan: "2022",
        quote: "Beasiswa ini sangat membantu saya fokus pada studi tanpa khawatir masalah biaya kuliah.",
        avatar: "/young-male-student.png",
      },
      {
        name: "Nur Aisyah",
        program: "Kedokteran",
        angkatan: "2021",
        quote: "Program mentoring yang disediakan membuka banyak peluang pengembangan diri dan karir.",
        avatar: "/young-female-medical-student.png",
      },
    ],
    bgGradient:
      id === "1"
        ? "from-primary to-blue-alt"
        : id === "2"
          ? "from-secondary to-amber-300"
          : id === "3"
            ? "from-green-500 to-teal-400"
            : id === "4"
              ? "from-purple-500 to-purple-400"
              : id === "5"
                ? "from-pink-500 to-rose-400"
                : "from-blue-500 to-cyan-400",
    textColor:
      id === "1"
        ? "text-primary hover:text-blue-alt"
        : id === "2"
          ? "text-secondary hover:text-amber-500"
          : id === "3"
            ? "text-green-600 hover:text-teal-500"
            : id === "4"
              ? "text-purple-600 hover:text-purple-500"
              : id === "5"
                ? "text-pink-600 hover:text-rose-500"
                : "text-blue-600 hover:text-cyan-500",
    lightBgColor:
      id === "1"
        ? "bg-blue-50"
        : id === "2"
          ? "bg-amber-50"
          : id === "3"
            ? "bg-green-50"
            : id === "4"
              ? "bg-purple-50"
              : id === "5"
                ? "bg-pink-50"
                : "bg-blue-50",
    accentColor:
      id === "1"
        ? "bg-primary"
        : id === "2"
          ? "bg-secondary"
          : id === "3"
            ? "bg-green-500"
            : id === "4"
              ? "bg-purple-500"
              : id === "5"
                ? "bg-pink-500"
                : "bg-blue-500",
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulasi pengiriman data
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/dashboard/mahasiswa/mengajukan/pilih")
    }, 2000)
  }

  // Animation for tab change
  useEffect(() => {
    // Reset scroll position when tab changes
    window.scrollTo(0, 0)
  }, [activeTab])

  return (
    <div className="min-h-screen flex flex-col bg-white page-transition">
      <Navbar userRole="mahasiswa" />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Link
            href="/dashboard/beasiswa"
            className={`inline-flex items-center ${beasiswaData.textColor} transition-colors group text-sm sm:text-base`}
          >
            <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Kembali ke Daftar Beasiswa
          </Link>
        </motion.div>

        {/* Header Section */}
        <motion.section initial="hidden" animate="visible" variants={fadeIn} className="mb-8">
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className={`h-24 sm:h-32 bg-gradient-to-r ${beasiswaData.bgGradient} relative overflow-hidden`}>
              <div className="absolute inset-0 opacity-20">
                <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white opacity-10"></div>
                <div className="absolute right-20 bottom-0 w-20 h-20 rounded-full bg-white opacity-10"></div>
                <div className="absolute left-10 top-5 w-16 h-16 rounded-full bg-white opacity-10"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>
            </div>

            <div className="p-6 sm:p-8 -mt-12 sm:-mt-16 relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center">
                  <div
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${beasiswaData.bgGradient} flex items-center justify-center mr-4 sm:mr-5 shadow-lg transform transition-transform duration-300 hover:scale-105`}
                  >
                    <div className="text-white text-xl">{beasiswaData.icon}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h1 className="text-xl sm:text-3xl font-bold">{beasiswaData.nama}</h1>
                      <StatusBadge status={beasiswaData.status} />
                    </div>
                    <p className="text-sm sm:text-base text-gray-600">{beasiswaData.deskripsi}</p>
                  </div>
                </div>

                <div className="flex gap-2 ml-20 sm:ml-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                  >
                    <Bookmark className={`h-4 w-4 mr-1 ${isBookmarked ? "fill-current text-amber-500" : ""}`} />
                    {isBookmarked ? "Tersimpan" : "Simpan"}
                  </Button>

                  <div className="relative">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                      onClick={() => setShowShareOptions(!showShareOptions)}
                    >
                      <Share2 className="h-4 w-4 mr-1" />
                      Bagikan
                    </Button>

                    {showShareOptions && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg p-2 z-20 border">
                        <div className="flex flex-col gap-1">
                          <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg text-sm">
                            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            Facebook
                          </button>
                          <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg text-sm">
                            <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                            </svg>
                            Twitter
                          </button>
                          <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg text-sm">
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                            LinkedIn
                          </button>
                          <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg text-sm">
                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                            </svg>
                            WhatsApp
                          </button>
                          <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg text-sm">
                            <Download className="w-4 h-4 text-gray-600" />
                            Unduh Info
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6"
              >
                <motion.div
                  variants={fadeIn}
                  className={`${beasiswaData.lightBgColor} p-4 rounded-2xl flex items-center group hover:shadow-md transition-all duration-300`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${beasiswaData.accentColor} bg-opacity-20 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Calendar className={`h-6 w-6 ${beasiswaData.textColor}`} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Deadline Pendaftaran</p>
                    <p className="font-semibold">{beasiswaData.deadline}</p>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeIn}
                  className={`${beasiswaData.lightBgColor} p-4 rounded-2xl flex items-center group hover:shadow-md transition-all duration-300`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${beasiswaData.accentColor} bg-opacity-20 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Users className={`h-6 w-6 ${beasiswaData.textColor}`} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Kuota Penerima</p>
                    <p className="font-semibold">{beasiswaData.kuota} mahasiswa</p>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeIn}
                  className={`${beasiswaData.lightBgColor} p-4 rounded-2xl flex items-center group hover:shadow-md transition-all duration-300`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${beasiswaData.accentColor} bg-opacity-20 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Award className={`h-6 w-6 ${beasiswaData.textColor}`} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Benefit Utama</p>
                    <p className="font-semibold">Bebas biaya kuliah 1 semester</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Tabs Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="info" className="w-full" onValueChange={setActiveTab}>
            <div className="sticky top-0 z-10 bg-white pt-2 pb-4 border-b">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 p-1 bg-gray-100 rounded-full">
                <TabsTrigger
                  value="info"
                  className={`rounded-full data-[state=active]:${beasiswaData.accentColor} data-[state=active]:text-white text-sm py-2 transition-all duration-300`}
                >
                  <Info className="h-4 w-4 mr-1.5" />
                  Informasi
                </TabsTrigger>
                <TabsTrigger
                  value="timeline"
                  className={`rounded-full data-[state=active]:${beasiswaData.accentColor} data-[state=active]:text-white text-sm py-2 transition-all duration-300`}
                >
                  <Clock className="h-4 w-4 mr-1.5" />
                  Timeline
                </TabsTrigger>
                <TabsTrigger
                  value="faq"
                  className={`rounded-full data-[state=active]:${beasiswaData.accentColor} data-[state=active]:text-white text-sm py-2 transition-all duration-300`}
                >
                  <HelpCircle className="h-4 w-4 mr-1.5" />
                  FAQ
                </TabsTrigger>
                <TabsTrigger
                  value="apply"
                  disabled={beasiswaData.status !== "Dibuka"}
                  className={`rounded-full data-[state=active]:${beasiswaData.accentColor} data-[state=active]:text-white text-sm py-2 transition-all duration-300`}
                >
                  <FileText className="h-4 w-4 mr-1.5" />
                  Daftar
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="mt-6">
              <TabsContent value="info" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  <div className="md:col-span-2 space-y-6">
                    <Card className="shadow-md rounded-2xl border-none overflow-hidden">
                      <CardHeader className={`bg-gradient-to-r ${beasiswaData.bgGradient} p-5`}>
                        <CardTitle className="flex items-center text-white">
                          <Sparkles className="h-5 w-5 mr-2" />
                          Informasi Beasiswa
                        </CardTitle>
                        <CardDescription className="text-white/80">
                          Detail informasi tentang {beasiswaData.nama}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-5 space-y-6">
                        <div>
                          <h3 className="text-lg font-medium mb-3 flex items-center">
                            <span
                              className={`w-8 h-8 rounded-full ${beasiswaData.accentColor} bg-opacity-20 flex items-center justify-center mr-2`}
                            >
                              <Info className={`h-4 w-4 ${beasiswaData.textColor}`} />
                            </span>
                            Deskripsi
                          </h3>
                          <p className="text-gray-700 leading-relaxed">{beasiswaData.deskripsi}</p>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium mb-3 flex items-center">
                            <span
                              className={`w-8 h-8 rounded-full ${beasiswaData.accentColor} bg-opacity-20 flex items-center justify-center mr-2`}
                            >
                              <CheckCircle className={`h-4 w-4 ${beasiswaData.textColor}`} />
                            </span>
                            Persyaratan
                          </h3>
                          <ul className="space-y-2 text-gray-700">
                            {beasiswaData.persyaratan.map((syarat, index) => (
                              <li key={index} className="flex items-start">
                                <div
                                  className={`mt-1 mr-3 w-5 h-5 rounded-full ${beasiswaData.accentColor} bg-opacity-20 flex-shrink-0 flex items-center justify-center`}
                                >
                                  <CheckCircle2 className={`h-3 w-3 ${beasiswaData.textColor}`} />
                                </div>
                                <span>{syarat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium mb-3 flex items-center">
                            <span
                              className={`w-8 h-8 rounded-full ${beasiswaData.accentColor} bg-opacity-20 flex items-center justify-center mr-2`}
                            >
                              <FileText className={`h-4 w-4 ${beasiswaData.textColor}`} />
                            </span>
                            Dokumen yang Diperlukan
                          </h3>
                          <ul className="space-y-2 text-gray-700">
                            {beasiswaData.dokumen.map((dokumen, index) => (
                              <li key={index} className="flex items-start">
                                <div
                                  className={`mt-1 mr-3 w-5 h-5 rounded-full ${beasiswaData.accentColor} bg-opacity-20 flex-shrink-0 flex items-center justify-center`}
                                >
                                  <FileText className={`h-3 w-3 ${beasiswaData.textColor}`} />
                                </div>
                                <span>{dokumen}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-md rounded-2xl border-none overflow-hidden">
                      <CardHeader className={`bg-gradient-to-r ${beasiswaData.bgGradient} p-5`}>
                        <CardTitle className="flex items-center text-white">
                          <Star className="h-5 w-5 mr-2" />
                          Testimoni Penerima
                        </CardTitle>
                        <CardDescription className="text-white/80">
                          Pengalaman penerima beasiswa sebelumnya
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {beasiswaData.testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-xl">
                              <div className="flex items-center mb-3">
                                <div className="w-12 h-12 rounded-full overflow-hidden mr-3 border-2 border-white shadow-md">
                                  <Image
                                    src={testimonial.avatar || "/placeholder.svg"}
                                    alt={testimonial.name}
                                    width={48}
                                    height={48}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <h4 className="font-medium">{testimonial.name}</h4>
                                  <p className="text-xs text-gray-500">
                                    {testimonial.program}, {testimonial.angkatan}
                                  </p>
                                </div>
                              </div>
                              <div className="relative">
                                <svg
                                  className="absolute top-0 left-0 w-8 h-8 text-gray-200 transform -translate-x-3 -translate-y-3"
                                  fill="currentColor"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                                </svg>
                                <p className="text-sm text-gray-600 italic pl-4">"{testimonial.quote}"</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    <Card className="shadow-md rounded-2xl border-none overflow-hidden">
                      <CardHeader className={`bg-gradient-to-r ${beasiswaData.bgGradient} p-5`}>
                        <CardTitle className="flex items-center text-white">
                          <Award className="h-5 w-5 mr-2" />
                          Benefit
                        </CardTitle>
                        <CardDescription className="text-white/80">Keuntungan yang didapatkan</CardDescription>
                      </CardHeader>
                      <CardContent className="p-5">
                        <ul className="space-y-3">
                          {beasiswaData.benefit.map((benefit, index) => (
                            <li key={index} className="flex items-center p-3 bg-gray-50 rounded-xl">
                              <div
                                className={`w-8 h-8 rounded-full ${beasiswaData.accentColor} flex items-center justify-center mr-3`}
                              >
                                <CheckCircle className="h-4 w-4 text-white" />
                              </div>
                              <span className="text-gray-700">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="shadow-md rounded-2xl border-none overflow-hidden">
                      <CardHeader className={`bg-gradient-to-r ${beasiswaData.bgGradient} p-5`}>
                        <CardTitle className="flex items-center text-white">
                          <Lightbulb className="h-5 w-5 mr-2" />
                          Tips Pendaftaran
                        </CardTitle>
                        <CardDescription className="text-white/80">Saran untuk meningkatkan peluang</CardDescription>
                      </CardHeader>
                      <CardContent className="p-5">
                        <ul className="space-y-3 text-gray-700">
                          <li className="flex items-start">
                            <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-xs font-bold">1</span>
                            </div>
                            <p>Lengkapi semua dokumen yang diperlukan sebelum deadline</p>
                          </li>
                          <li className="flex items-start">
                            <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-xs font-bold">2</span>
                            </div>
                            <p>Pastikan dokumen yang diunggah jelas dan mudah dibaca</p>
                          </li>
                          <li className="flex items-start">
                            <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-xs font-bold">3</span>
                            </div>
                            <p>Tulis alasan pendaftaran dengan jelas dan meyakinkan</p>
                          </li>
                          <li className="flex items-start">
                            <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-xs font-bold">4</span>
                            </div>
                            <p>Persiapkan diri untuk wawancara dengan baik</p>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    {beasiswaData.status === "Dibuka" && (
                      <div className="bg-gradient-to-r from-gray-50 to-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-medium mb-3 flex items-center">
                          <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
                          Segera Daftar!
                        </h3>
                        <p className="text-gray-600 mb-4">Pendaftaran sedang dibuka. Jangan lewatkan kesempatan ini!</p>
                        <Button
                          className={`w-full bg-gradient-to-r ${beasiswaData.bgGradient} text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300`}
                          onClick={() => setActiveTab("apply")}
                        >
                          Daftar Sekarang
                        </Button>
                      </div>
                    )}
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="timeline">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="shadow-md rounded-2xl border-none overflow-hidden">
                    <CardHeader className={`bg-gradient-to-r ${beasiswaData.bgGradient} p-5`}>
                      <CardTitle className="flex items-center text-white">
                        <Clock className="h-5 w-5 mr-2" />
                        Timeline Proses Seleksi
                      </CardTitle>
                      <CardDescription className="text-white/80">
                        Jadwal lengkap proses seleksi {beasiswaData.nama}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-5">
                      <div className="relative">
                        {beasiswaData.timeline.map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="mb-8 last:mb-0"
                          >
                            <div className="flex items-start">
                              <div
                                className={`w-14 h-14 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0 ${
                                  item.status === "Aktif"
                                    ? `${beasiswaData.accentColor} text-white`
                                    : "bg-gray-100 text-gray-400"
                                }`}
                              >
                                {item.status === "Aktif" ? (
                                  <CheckCircle2 className="h-6 w-6" />
                                ) : (
                                  <Clock className="h-6 w-6" />
                                )}
                              </div>
                              <div className={`${beasiswaData.lightBgColor} p-4 rounded-2xl flex-1 shadow-sm`}>
                                <div className="flex justify-between items-start mb-2">
                                  <h3 className="text-lg font-medium">{item.tahap}</h3>
                                  <StatusBadge status={item.status} />
                                </div>
                                <p className="text-gray-600 mb-2">{item.tanggal}</p>
                                <p className="text-sm text-gray-500">{item.deskripsi}</p>
                              </div>
                            </div>
                            {index < beasiswaData.timeline.length - 1 && (
                              <div className="w-0.5 h-8 bg-gray-200 ml-7"></div>
                            )}
                          </motion.div>
                        ))}
                      </div>

                      <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <h3 className="text-lg font-medium mb-2 flex items-center">
                          <Info className="h-5 w-5 mr-2 text-gray-500" />
                          Catatan Penting
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 mr-1 mt-0.5 text-gray-400" />
                            <span>Jadwal dapat berubah sewaktu-waktu. Pantau terus pengumuman terbaru.</span>
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 mr-1 mt-0.5 text-gray-400" />
                            <span>Pastikan untuk mengikuti setiap tahapan seleksi sesuai jadwal yang ditentukan.</span>
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 mr-1 mt-0.5 text-gray-400" />
                            <span>
                              Keterlambatan dalam mengikuti tahapan seleksi dapat mengakibatkan diskualifikasi.
                            </span>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="faq">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="shadow-md rounded-2xl border-none overflow-hidden">
                    <CardHeader className={`bg-gradient-to-r ${beasiswaData.bgGradient} p-5`}>
                      <CardTitle className="flex items-center text-white">
                        <HelpCircle className="h-5 w-5 mr-2" />
                        Pertanyaan yang Sering Diajukan
                      </CardTitle>
                      <CardDescription className="text-white/80">
                        Jawaban untuk pertanyaan umum tentang {beasiswaData.nama}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-5">
                      <Accordion type="single" collapsible className="w-full">
                        {beasiswaData.faq.map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <AccordionItem value={`item-${index}`} className="border-b border-gray-200 last:border-0">
                              <AccordionTrigger
                                className={`text-left hover:${beasiswaData.textColor} transition-colors py-4 text-base`}
                              >
                                <div className="flex items-center">
                                  <div
                                    className={`w-8 h-8 rounded-full ${beasiswaData.accentColor} bg-opacity-20 flex items-center justify-center mr-3 flex-shrink-0`}
                                  >
                                    <span className={`text-sm font-medium ${beasiswaData.textColor}`}>Q</span>
                                  </div>
                                  {item.pertanyaan}
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="text-gray-600 py-3 px-4 bg-gray-50 rounded-xl my-2 ml-11">
                                <div className="flex items-start">
                                  <div
                                    className={`w-6 h-6 rounded-full ${beasiswaData.accentColor} flex items-center justify-center mr-3 mt-0.5 flex-shrink-0`}
                                  >
                                    <span className="text-xs font-medium text-white">A</span>
                                  </div>
                                  <p>{item.jawaban}</p>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </motion.div>
                        ))}
                      </Accordion>

                      <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <h3 className="text-base font-medium mb-2">Masih punya pertanyaan?</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          Jika pertanyaan Anda tidak terjawab di atas, silakan hubungi kami melalui:
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button variant="outline" className="text-sm">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            Facebook
                          </Button>
                          <Button variant="outline" className="text-sm">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                            Email
                          </Button>
                          <Button variant="outline" className="text-sm">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                            </svg>
                            WhatsApp
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="apply">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="shadow-md rounded-2xl border-none overflow-hidden">
                    <CardHeader className={`bg-gradient-to-r ${beasiswaData.bgGradient} p-5`}>
                      <CardTitle className="flex items-center text-white">
                        <FileText className="h-5 w-5 mr-2" />
                        Formulir Pendaftaran
                      </CardTitle>
                      <CardDescription className="text-white/80">
                        Lengkapi formulir berikut untuk mendaftar {beasiswaData.nama}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-5">
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                          <div className="flex items-start">
                            <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                            <div>
                              <h3 className="font-medium text-amber-800 mb-1">Perhatian</h3>
                              <p className="text-sm text-amber-700">
                                Pastikan semua data yang Anda masukkan sudah benar dan sesuai dengan dokumen asli. Data
                                yang tidak sesuai dapat menyebabkan aplikasi Anda ditolak.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium flex items-center">
                            <span
                              className={`w-8 h-8 rounded-full ${beasiswaData.accentColor} flex items-center justify-center mr-3 text-white`}
                            >
                              1
                            </span>
                            Data Pribadi
                          </h3>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="nama" className="text-sm font-medium">
                                Nama Lengkap
                              </Label>
                              <Input
                                id="nama"
                                placeholder="Masukkan nama lengkap"
                                className="rounded-xl border-gray-300 focus:border-primary focus:ring-primary"
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="nim" className="text-sm font-medium">
                                NIM
                              </Label>
                              <Input
                                id="nim"
                                placeholder="Masukkan NIM"
                                className="rounded-xl border-gray-300 focus:border-primary focus:ring-primary"
                                required
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="email" className="text-sm font-medium">
                                Email
                              </Label>
                              <Input
                                id="email"
                                type="email"
                                placeholder="Masukkan email"
                                className="rounded-xl border-gray-300 focus:border-primary focus:ring-primary"
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone" className="text-sm font-medium">
                                Nomor Telepon
                              </Label>
                              <Input
                                id="phone"
                                placeholder="Masukkan nomor telepon"
                                className="rounded-xl border-gray-300 focus:border-primary focus:ring-primary"
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium flex items-center">
                            <span
                              className={`w-8 h-8 rounded-full ${beasiswaData.accentColor} flex items-center justify-center mr-3 text-white`}
                            >
                              2
                            </span>
                            Data Akademik
                          </h3>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="fakultas" className="text-sm font-medium">
                                Fakultas
                              </Label>
                              <Input
                                id="fakultas"
                                placeholder="Masukkan fakultas"
                                className="rounded-xl border-gray-300 focus:border-primary focus:ring-primary"
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="prodi" className="text-sm font-medium">
                                Program Studi
                              </Label>
                              <Input
                                id="prodi"
                                placeholder="Masukkan program studi"
                                className="rounded-xl border-gray-300 focus:border-primary focus:ring-primary"
                                required
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="semester" className="text-sm font-medium">
                                Semester
                              </Label>
                              <Input
                                id="semester"
                                type="number"
                                placeholder="Masukkan semester"
                                className="rounded-xl border-gray-300 focus:border-primary focus:ring-primary"
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="ipk" className="text-sm font-medium">
                                IPK
                              </Label>
                              <Input
                                id="ipk"
                                type="number"
                                step="0.01"
                                placeholder="Masukkan IPK"
                                className="rounded-xl border-gray-300 focus:border-primary focus:ring-primary"
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium flex items-center">
                            <span
                              className={`w-8 h-8 rounded-full ${beasiswaData.accentColor} flex items-center justify-center mr-3 text-white`}
                            >
                              3
                            </span>
                            Alasan & Motivasi
                          </h3>

                          <div className="space-y-2">
                            <Label htmlFor="alasan" className="text-sm font-medium">
                              Alasan Mendaftar
                            </Label>
                            <Textarea
                              id="alasan"
                              placeholder="Jelaskan alasan Anda mendaftar beasiswa ini"
                              className="min-h-[120px] rounded-xl border-gray-300 focus:border-primary focus:ring-primary"
                              required
                            />
                            <p className="text-xs text-gray-500">Minimal 100 karakter, maksimal 500 karakter</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium flex items-center">
                            <span
                              className={`w-8 h-8 rounded-full ${beasiswaData.accentColor} flex items-center justify-center mr-3 text-white`}
                            >
                              4
                            </span>
                            Unggah Dokumen
                          </h3>

                          <p className="text-sm text-gray-500">
                            Unggah dokumen yang diperlukan dalam format PDF (maks. 2MB per file)
                          </p>

                          {beasiswaData.dokumen.map((dokumen, index) => (
                            <div key={index} className="space-y-2 bg-gray-50 p-4 rounded-xl">
                              <Label htmlFor={`dokumen-${index}`} className="text-sm font-medium flex items-center">
                                <FileText className="h-4 w-4 mr-2 text-gray-500" />
                                {dokumen}
                              </Label>
                              <div className="flex items-center gap-2">
                                <Input
                                  id={`dokumen-${index}`}
                                  type="file"
                                  accept=".pdf"
                                  className="flex-1 rounded-xl border-gray-300 bg-white text-sm"
                                  required
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  className="rounded-xl hover:bg-primary hover:text-white transition-colors"
                                >
                                  <Upload className="h-4 w-4" />
                                </Button>
                              </div>
                              <p className="text-xs text-gray-500">Format PDF, maksimal 2MB</p>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-start p-4 bg-gray-50 rounded-xl">
                            <input type="checkbox" id="agreement" className="mt-1 mr-3" required />
                            <Label htmlFor="agreement" className="text-sm text-gray-700">
                              Saya menyatakan bahwa semua informasi dan dokumen yang saya berikan adalah benar dan saya
                              bersedia menerima konsekuensi jika terdapat ketidaksesuaian dengan data asli.
                            </Label>
                          </div>
                        </div>

                        <div className="pt-4 border-t flex justify-end">
                          <Button
                            type="submit"
                            className={`bg-gradient-to-r ${beasiswaData.bgGradient} text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 px-8 py-2.5 h-auto text-base`}
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <svg
                                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                              </>
                            ) : (
                              <>
                                <FileText className="mr-2 h-5 w-5" />
                                Kirim Aplikasi
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </div>
          </Tabs>
        </motion.section>
      </main>
    </div>
  )
}
