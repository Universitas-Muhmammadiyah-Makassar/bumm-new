"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/navbar"
import {
  BookOpen,
  Award,
  Search,
  ChevronRight,
  Users,
  BookMarked,
  Medal,
  Clock,
  CheckCircle,
  FileText,
  Phone,
  Info,
  User,
  Calendar,
  Bookmark,
  GraduationCap,
} from "lucide-react"

export default function BeasiswaPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Scholarship category data
  const scholarshipCategories = [
    {
      id: "academic",
      name: "Beasiswa Prestasi Akademik",
      description: "Beasiswa untuk mahasiswa berprestasi dengan nilai akademik yang tinggi dan konsisten.",
      icon: <Award className="h-6 w-6 text-white" />,
      color: "from-amber-500 to-yellow-400",
      textColor: "text-amber-600",
      bgLight: "bg-amber-50",
      image: "/images/graduation-celebration.png",
      subcategories: [
        {
          id: 1,
          name: "Beasiswa Prestasi Akademik (Kategori 1)",
          description:
            "Beasiswa Uang Kuliah 100% selama 8 semester bagi siswa yang memiliki Nilai Rapor (Pengetahuan) Semester 1-5 dengan Rata-Rata minimal 95",
          requirements: [
            "Nilai Rapor Semester 1-5 dengan rata-rata minimal 95",
            "Berlaku bagi Program Studi non-Kedokteran",
            "Lulusan sekolah tahun 2025",
            "Mempertahankan IPS minimal 3.0",
          ],
          deadline: "15 Juli 2025",
          quota: 33,
          status: "Dibuka",
          benefit: "Beasiswa Uang Kuliah 100% selama 8 semester",
        },
        {
          id: 2,
          name: "Beasiswa Prestasi Akademik (Kategori 2)",
          description:
            "Beasiswa Uang Kuliah 75% selama 8 semester bagi siswa yang memiliki Nilai Rapor (Pengetahuan) Semester 1-5 dengan Rata-Rata minimal 90",
          requirements: [
            "Nilai Rapor Semester 1-5 dengan rata-rata minimal 90",
            "Berlaku bagi Program Studi non-Kedokteran",
            "Lulusan sekolah tahun 2025",
            "Mempertahankan IPS minimal 3.0",
          ],
          deadline: "15 Juli 2025",
          quota: 347,
          status: "Dibuka",
          benefit: "Beasiswa Uang Kuliah 75% selama 8 semester",
        },
        {
          id: 3,
          name: "Beasiswa Prestasi Akademik (Kategori 3)",
          description:
            "Beasiswa Uang Kuliah 50% selama 8 semester bagi siswa yang memiliki Nilai Rapor (Pengetahuan) Semester 1-5 dengan Rata-Rata minimal 85",
          requirements: [
            "Nilai Rapor Semester 1-5 dengan rata-rata minimal 85",
            "Berlaku bagi Program Studi non-Kedokteran",
            "Lulusan sekolah tahun 2025",
            "Mempertahankan IPS minimal 3.0",
          ],
          deadline: "15 Juli 2025",
          quota: 292,
          status: "Dibuka",
          benefit: "Beasiswa Uang Kuliah 50% selama 8 semester",
        },
        {
          id: 4,
          name: "Beasiswa Prestasi Akademik (Kategori 4)",
          description:
            "Beasiswa Uang Kuliah 25% selama 8 semester bagi siswa yang memiliki Nilai Rapor (Pengetahuan) Semester 1-5 dengan Rata-Rata minimal 80",
          requirements: [
            "Nilai Rapor Semester 1-5 dengan rata-rata minimal 80",
            "Berlaku bagi Program Studi non-Kedokteran",
            "Lulusan sekolah tahun 2025",
            "Mempertahankan IPS minimal 3.0",
          ],
          deadline: "15 Juli 2025",
          quota: 194,
          status: "Dibuka",
          benefit: "Beasiswa Uang Kuliah 25% selama 8 semester",
        },
      ],
    },
    {
      id: "hafidz",
      name: "Beasiswa Hafidz Qur'an",
      description: "Beasiswa khusus bagi mahasiswa yang memiliki kemampuan menghafal Al-Qur'an dengan baik.",
      icon: <BookOpen className="h-6 w-6 text-white" />,
      color: "from-primary to-blue-500",
      textColor: "text-primary",
      bgLight: "bg-blue-50",
      image: "/images/young-male-student.png",
      subcategories: [
        {
          id: 5,
          name: "Beasiswa Hafidz 30 Juz Mutqin (Kategori 1)",
          description: "Beasiswa 100% Uang Kuliah selama 8 semester bagi siswa Hafidz Qur'an 30 Juz Mutqin",
          requirements: [
            "Hafal 30 Juz Al-Qur'an Mutqin",
            "Memiliki sertifikat/syahadah/surat keterangan hafalan",
            "Lulus ujian hafalan",
            "Mempertahankan IPS minimal 3.0",
          ],
          deadline: "30 Juni 2025",
          quota: 50,
          status: "Dibuka",
          benefit: "Beasiswa 100% Uang Kuliah selama 8 semester",
        },
        {
          id: 6,
          name: "Beasiswa Hafidz 20 Juz Mutqin (Kategori 2)",
          description: "Beasiswa Uang Kuliah 75% selama 8 semester bagi siswa Hafidz Qur'an minimal 20 Juz Mutqin",
          requirements: [
            "Hafal minimal 20 Juz Al-Qur'an Mutqin",
            "Memiliki sertifikat/syahadah/surat keterangan hafalan",
            "Lulus ujian hafalan",
            "Mempertahankan IPS minimal 3.0",
          ],
          deadline: "30 Juni 2025",
          quota: 50,
          status: "Dibuka",
          benefit: "Beasiswa Uang Kuliah 75% selama 8 semester",
        },
        {
          id: 7,
          name: "Beasiswa Hafidz 15 Juz Mutqin (Kategori 3)",
          description: "Beasiswa Uang Kuliah 50% selama 8 semester bagi siswa Hafidz Qur'an minimal 15 Juz Mutqin",
          requirements: [
            "Hafal minimal 15 Juz Al-Qur'an Mutqin",
            "Memiliki sertifikat/syahadah/surat keterangan hafalan",
            "Lulus ujian hafalan",
            "Mempertahankan IPS minimal 3.0",
          ],
          deadline: "30 Juni 2025",
          quota: 50,
          status: "Dibuka",
          benefit: "Beasiswa Uang Kuliah 50% selama 8 semester",
        },
        {
          id: 8,
          name: "Beasiswa Hafidz 5 Juz Mutqin (Kategori 4)",
          description: "Beasiswa Uang Kuliah 25% selama 8 semester bagi siswa Hafidz Qur'an minimal 5 Juz Mutqin",
          requirements: [
            "Hafal minimal 5 Juz Al-Qur'an Mutqin",
            "Memiliki sertifikat/syahadah/surat keterangan hafalan",
            "Lulus ujian hafalan",
            "Mempertahankan IPS minimal 3.0",
          ],
          deadline: "30 Juni 2025",
          quota: 150,
          status: "Dibuka",
          benefit: "Beasiswa Uang Kuliah 25% selama 8 semester",
        },
      ],
    },
    {
      id: "organization",
      name: "Beasiswa Bibit Unggul Persyarikatan",
      description: "Beasiswa khusus bagi mahasiswa yang aktif dalam kegiatan persyarikatan Muhammadiyah.",
      icon: <Users className="h-6 w-6 text-white" />,
      color: "from-emerald-500 to-green-400",
      textColor: "text-emerald-600",
      bgLight: "bg-emerald-50",
      image: "/images/young-female-medical-student.png",
      subcategories: [
        {
          id: 9,
          name: "Beasiswa Bibit Unggul Persyarikatan (Kategori 1)",
          description:
            "Beasiswa 100% Uang Kuliah selama 8 semester bagi Mantan dan atau Ketua, Sekretaris dan Bendahara PD atau PC Ikatan Pelajar Muhammadiyah (IPM)",
          requirements: [
            "Memiliki SK Pengurus Pimpinan Cabang atau Pimpinan Daerah IPM",
            "Posisi sebagai Ketua, Sekretaris, atau Bendahara",
            "Berlaku bagi Program Studi non-Kedokteran",
            "Mempertahankan IPS minimal 3.0",
          ],
          deadline: "10 Agustus 2025",
          quota: 111,
          status: "Dibuka",
          benefit: "Beasiswa 100% Uang Kuliah selama 8 semester",
          specialNote: "Hubungi IPM yang disekitar wilayah Anda",
        },
        {
          id: 10,
          name: "Beasiswa Bibit Unggul Persyarikatan (Kategori 2)",
          description:
            "Beasiswa Uang Kuliah 75% selama 8 semester bagi mantan dan atau Ketua Bidang dan Sekretaris Bidang PD atau PC Ikatan Pelajar Muhammadiyah (IPM)",
          requirements: [
            "Memiliki SK Pengurus Pimpinan Cabang atau Pimpinan Daerah IPM",
            "Posisi sebagai Ketua Bidang atau Sekretaris Bidang",
            "Berlaku bagi Program Studi non-Kedokteran",
            "Mempertahankan IPS minimal 3.0",
          ],
          deadline: "10 Agustus 2025",
          quota: 111,
          status: "Dibuka",
          benefit: "Beasiswa Uang Kuliah 75% selama 8 semester",
          specialNote: "Hubungi IPM yang disekitar wilayah Anda",
        },
        {
          id: 11,
          name: "Beasiswa Bibit Unggul Persyarikatan (Kategori 3)",
          description:
            "Beasiswa Uang Kuliah 50% selama 8 semester bagi mantan dan atau Anggota Bidang PD atau PC Ikatan Pelajar Muhammadiyah (IPM)",
          requirements: [
            "Memiliki SK Pengurus Pimpinan Cabang atau Pimpinan Daerah IPM",
            "Posisi sebagai Anggota Bidang",
            "Berlaku bagi Program Studi non-Kedokteran",
            "Mempertahankan IPS minimal 3.0",
          ],
          deadline: "10 Agustus 2025",
          quota: 213,
          status: "Dibuka",
          benefit: "Beasiswa Uang Kuliah 50% selama 8 semester",
          specialNote: "Hubungi IPM yang disekitar wilayah Anda",
        },
      ],
    },
  ]

  // Filter scholarships based on search term and active tab
  const filteredCategories = scholarshipCategories.filter(
    (category) => activeTab === "all" || category.id === activeTab,
  )

  const filteredSubcategories = filteredCategories.flatMap((category) =>
    category.subcategories.filter(
      (subcategory) =>
        subcategory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subcategory.description.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  )

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-blue-50 page-transition">
      <Navbar userRole="mahasiswa" />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid gap-8">
          {/* Header Section */}
          <section>
            <div className="bg-white rounded-3xl shadow-md overflow-hidden">
              <div className="relative h-56 bg-gradient-to-r from-primary to-blue-500 overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-pattern"></div>
                <div className="absolute bottom-0 right-0 w-48 h-48 opacity-20">
                  <Image
                    src="/abstract-geometric-pattern.png"
                    alt="Pattern"
                    width={200}
                    height={200}
                    className="object-cover"
                  />
                </div>
                <div className="relative h-full flex flex-col justify-center px-8">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Program Beasiswa</h1>
                  <p className="text-white/90 max-w-2xl text-lg">
                    Temukan berbagai program beasiswa yang sesuai dengan prestasi dan kebutuhan Anda. Universitas
                    Muhammadiyah Makassar berkomitmen untuk mendukung mahasiswa berprestasi.
                  </p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                  <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Cari beasiswa..."
                      className="pl-10 rounded-full border-gray-200"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-1">
                      <TabsTrigger value="all" className="rounded-full">
                        Semua
                      </TabsTrigger>
                      <TabsTrigger value="academic" className="rounded-full">
                        Akademik
                      </TabsTrigger>
                      <TabsTrigger value="hafidz" className="rounded-full">
                        Hafidz
                      </TabsTrigger>
                      <TabsTrigger value="organization" className="rounded-full">
                        Organisasi
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </div>
          </section>

          {/* Scholarship Categories Section */}
          {filteredCategories.map((category) => (
            <section key={category.id} className="animate-fadeIn">
              <div className="bg-white rounded-3xl shadow-md overflow-hidden">
                <div className={`bg-gradient-to-r ${category.color} p-6 relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 -mt-6 -mr-6 opacity-10">
                    <Image
                      src="/abstract-wave-pattern.png"
                      alt="Pattern"
                      width={200}
                      height={200}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center shadow-lg backdrop-blur-sm">
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl md:text-2xl font-bold text-white mb-1">{category.name}</h2>
                      <p className="text-white/90 mt-1 max-w-3xl">{category.description}</p>
                    </div>
                    <div className="hidden md:block">
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        width={150}
                        height={150}
                        className="object-contain h-24"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.subcategories
                      .filter(
                        (subcategory) =>
                          subcategory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          subcategory.description.toLowerCase().includes(searchTerm.toLowerCase()),
                      )
                      .map((subcategory) => (
                        <Card
                          key={subcategory.id}
                          className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                        >
                          <CardContent className="p-0">
                            <div className={`h-2 bg-gradient-to-r ${category.color}`}></div>
                            <div className="p-6">
                              {/* Header with status and quota */}
                              <div className="flex justify-between items-start mb-2">
                                <span
                                  className={`badge-pill inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                                    subcategory.status === "Dibuka"
                                      ? "bg-emerald-100 text-emerald-800"
                                      : subcategory.status === "Segera Dibuka"
                                        ? "bg-amber-100 text-amber-800"
                                        : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {subcategory.status}
                                </span>
                                <div className="flex items-center gap-1.5">
                                  <User className="h-3.5 w-3.5 text-gray-500" />
                                  <span className="text-xs font-medium text-gray-700">Kuota: {subcategory.quota}</span>
                                </div>
                              </div>

                              {/* Title and description */}
                              <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-primary transition-colors">
                                {subcategory.name}
                              </h3>
                              <p className="text-sm text-gray-600 mb-4">{subcategory.description}</p>

                              {/* Key info cards */}
                              <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="bg-gray-50 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                                  <GraduationCap className="h-5 w-5 text-primary mb-1" />
                                  <span className="text-xs font-medium text-gray-700">
                                    {subcategory.benefit.includes("100%")
                                      ? "Beasiswa Penuh"
                                      : subcategory.benefit.includes("75%")
                                        ? "Beasiswa 75%"
                                        : subcategory.benefit.includes("50%")
                                          ? "Beasiswa 50%"
                                          : "Beasiswa 25%"}
                                  </span>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                                  <Calendar className="h-5 w-5 text-amber-500 mb-1" />
                                  <span className="text-xs font-medium text-gray-700">8 Semester</span>
                                </div>
                              </div>

                              {/* Requirements */}
                              <div className="mb-5">
                                <h4 className="text-xs font-medium mb-2 flex items-center">
                                  <CheckCircle className="h-3.5 w-3.5 mr-1.5 text-gray-500" />
                                  Persyaratan Utama:
                                </h4>
                                <ul className="text-xs text-gray-600 space-y-1.5 pl-5 list-disc">
                                  {subcategory.requirements.map((req, index) => (
                                    <li key={index}>{req}</li>
                                  ))}
                                </ul>
                              </div>

                              {/* Deadline */}
                              <div className="flex items-center mb-5 text-xs text-gray-600 bg-gray-50 p-2 rounded-md">
                                <Clock className="h-3.5 w-3.5 mr-1.5 text-gray-500" />
                                Batas Pendaftaran: {subcategory.deadline}
                              </div>

                              {/* Action button or contact info */}
                              {category.id === "organization" ? (
                                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-center">
                                  <Phone className="h-4 w-4 text-emerald-600 mr-2 flex-shrink-0" />
                                  <p className="text-xs text-emerald-700">
                                    {subcategory.specialNote || "Hubungi IPM yang disekitar wilayah Anda"}
                                  </p>
                                </div>
                              ) : (
                                <Link
                                  href={`/dashboard/mahasiswa/mengajukan?type=${category.id}&id=${subcategory.id}`}
                                  className="block w-full"
                                >
                                  <Button
                                    className={`w-full bg-gradient-to-r ${category.color} text-white rounded-xl shadow hover:shadow-md transition-all text-sm py-2.5 h-auto`}
                                  >
                                    {subcategory.status === "Dibuka" ? "Ajukan Sekarang" : "Lihat Detail"}
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                  </Button>
                                </Link>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
              </div>
            </section>
          ))}

          {/* No Results Message */}
          {filteredSubcategories.length === 0 && (
            <div className="bg-white rounded-3xl shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Tidak ada beasiswa yang ditemukan</h3>
              <p className="text-gray-600 mb-4">
                Tidak ada beasiswa yang sesuai dengan kriteria pencarian Anda. Silakan coba kata kunci lain atau reset
                filter.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setActiveTab("all")
                }}
                className="rounded-xl"
              >
                Reset Pencarian
              </Button>
            </div>
          )}

          {/* Requirements Sections */}
          {filteredSubcategories.length > 0 && activeTab === "hafidz" && (
            <section className="animate-fadeIn">
              <div className="bg-white rounded-3xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center mr-3">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">Persyaratan Khusus Beasiswa Hafidz Qur'an</h2>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                    <ol className="list-decimal pl-5 space-y-4 text-gray-700">
                      <li className="pl-2">
                        Memiliki Hafalan Al-Qur'an 30, 20, 15, atau 5 Juz, dibuktikan dengan Scan Sertifikat, Syahadah,
                        Ijazah atau Surat Keterangan dari Pesantren, Madrasah atau Lembaga Tahfiz Al-Qur'an yang asli;
                      </li>
                      <li className="pl-2">KTP/KK, Ijazah SMA/SMK/MA atau Surat Keterangan Lulus (SKL);</li>
                      <li className="pl-2">
                        Mengikuti Seleksi Hafalan Qur'an pada Panitia Seleksi Beasiswa Hafidz Qur'an Universitas
                        Muhammadiyah Makassar;
                      </li>
                      <li className="pl-2">
                        Khusus Program Studi Pendidikan Dokter Wajib melampirkan bukti kelulusan hasil seleksi UPT-PMB
                        Universitas Muhammadiyah Makassar;
                      </li>
                      <li className="pl-2">
                        Menandatangani Surat Perjanjian untuk mempertahankan Indeks Prestasi Semester (IPS 3,0) dan
                        surat Pernyataan siap untuk mengikuti pembinaan selama masa studi serta Surat Pernyataan tidak
                        sedang menerima beasiswa/bantuan biaya pendidikan lain dari sumber APBD/Beasiswa lainnya
                        (bermaterai 10.000);
                      </li>
                      <li className="pl-2">Melampirkan Sertifikat Prestasi (jika ada);</li>
                      <li className="pl-2">Mengikuti Tes Wawancara.</li>
                    </ol>
                  </div>
                </div>
              </div>
            </section>
          )}

          {filteredSubcategories.length > 0 && activeTab === "academic" && (
            <section className="animate-fadeIn">
              <div className="bg-white rounded-3xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center mr-3">
                      <FileText className="h-5 w-5 text-amber-500" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">Persyaratan Khusus Beasiswa Prestasi Akademik</h2>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-6 border border-amber-100">
                    <ol className="list-decimal pl-5 space-y-4 text-gray-700">
                      <li className="pl-2">Berlaku bagi Program Studi non-Kedokteran;</li>
                      <li className="pl-2">KTP/KK, Ijazah SMA/SMK/MA atau Surat Keterangan Lulus (SKL);</li>
                      <li className="pl-2">Rapor Semester 1 sampai dengan 5;</li>
                      <li className="pl-2">
                        Menandatangani Surat Perjanjian untuk mempertahankan Indeks Prestasi Semester (IPS 3,0) dan
                        surat pernyataan siap untuk mengikuti pembinaan selama masa studi serta Surat Pernyataan tidak
                        sedang menerima beasiswa/bantuan biaya pendidikan lain dari sumber APBD/Beasiswa lainnya
                        (bermaterai 10.000);
                      </li>
                      <li className="pl-2">Melampirkan Sertifikat Prestasi (jika ada);</li>
                      <li className="pl-2">Merupakan lulusan sekolah tahun 2025;</li>
                      <li className="pl-2">Mengikuti Tes Wawancara.</li>
                    </ol>
                  </div>
                </div>
              </div>
            </section>
          )}

          {filteredSubcategories.length > 0 && activeTab === "organization" && (
            <section className="animate-fadeIn">
              <div className="bg-white rounded-3xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center mr-3">
                      <FileText className="h-5 w-5 text-emerald-500" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">
                      Persyaratan Khusus Beasiswa Bibit Unggul Persyarikatan
                    </h2>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
                    <div className="bg-white p-5 rounded-lg mb-5 border border-emerald-200 shadow-sm">
                      <div className="flex items-start">
                        <Info className="h-6 w-6 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium text-emerald-800 mb-2 text-lg">Informasi Penting</h3>
                          <p className="text-emerald-700">
                            Untuk mendaftar beasiswa ini, Anda perlu menghubungi IPM (Ikatan Pelajar Muhammadiyah) di
                            wilayah Anda untuk mendapatkan rekomendasi dan informasi lebih lanjut. Pendaftaran tidak
                            dapat dilakukan secara langsung melalui sistem.
                          </p>
                        </div>
                      </div>
                    </div>
                    <ol className="list-decimal pl-5 space-y-4 text-gray-700">
                      <li className="pl-2">
                        Memiliki SK Pengurus Pimpinan Cabang atau Pimpinan Daerah Ikatan Pelajar Muhammadiyah;
                      </li>
                      <li className="pl-2">KTP/KK, Ijazah SMA/SMK/MA atau Surat Keterangan Lulus (SKL);</li>
                      <li className="pl-2">Berlaku bagi Program non-Kedokteran;</li>
                      <li className="pl-2">
                        Menandatangani Surat Perjanjian untuk mempertahankan Indeks Prestasi Semester (IPS 3,0) dan
                        surat pernyataan siap untuk mengikuti pembinaan selama masa studi serta Surat Pernyataan tidak
                        sedang menerima beasiswa/bantuan biaya pendidikan lain dari sumber APBD/Beasiswa lainnya
                        (bermaterai 10.000);
                      </li>
                      <li className="pl-2">Melampirkan Sertifikat Prestasi (jika ada);</li>
                      <li className="pl-2">Mengikuti Tes Wawancara.</li>
                    </ol>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Scholarship Summary Section */}
          {filteredSubcategories.length > 0 && (
            <section className="animate-fadeIn">
              <div className="bg-white rounded-3xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-5">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mr-3">
                      <Bookmark className="h-5 w-5 text-gray-700" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">Ringkasan Kuota Beasiswa</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Academic Scholarship Summary */}
                    <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-2">
                          <Award className="h-4 w-4 text-amber-600" />
                        </div>
                        <h3 className="font-medium text-gray-800">Prestasi Akademik</h3>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center bg-white rounded-lg p-2.5 shadow-sm">
                          <span className="text-sm font-medium">Kategori 1 (100%)</span>
                          <span className="text-sm bg-amber-100 px-2.5 py-0.5 rounded-full text-amber-800">
                            33 Orang
                          </span>
                        </div>
                        <div className="flex justify-between items-center bg-white rounded-lg p-2.5 shadow-sm">
                          <span className="text-sm font-medium">Kategori 2 (75%)</span>
                          <span className="text-sm bg-amber-100 px-2.5 py-0.5 rounded-full text-amber-800">
                            347 Orang
                          </span>
                        </div>
                        <div className="flex justify-between items-center bg-white rounded-lg p-2.5 shadow-sm">
                          <span className="text-sm font-medium">Kategori 3 (50%)</span>
                          <span className="text-sm bg-amber-100 px-2.5 py-0.5 rounded-full text-amber-800">
                            292 Orang
                          </span>
                        </div>
                        <div className="flex justify-between items-center bg-white rounded-lg p-2.5 shadow-sm">
                          <span className="text-sm font-medium">Kategori 4 (25%)</span>
                          <span className="text-sm bg-amber-100 px-2.5 py-0.5 rounded-full text-amber-800">
                            194 Orang
                          </span>
                        </div>
                        <div className="flex justify-between items-center bg-amber-100 rounded-lg p-2.5 mt-2 font-medium">
                          <span className="text-sm">Total Kuota</span>
                          <span className="text-sm">866 Orang</span>
                        </div>
                      </div>
                    </div>

                    {/* Hafidz Scholarship Summary */}
                    <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                          <BookOpen className="h-4 w-4 text-primary" />
                        </div>
                        <h3 className="font-medium text-gray-800">Hafidz Qur'an</h3>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center bg-white rounded-lg p-2.5 shadow-sm">
                          <span className="text-sm font-medium">Kategori 1 (100%)</span>
                          <span className="text-sm bg-blue-100 px-2.5 py-0.5 rounded-full text-blue-800">50 Orang</span>
                        </div>
                        <div className="flex justify-between items-center bg-white rounded-lg p-2.5 shadow-sm">
                          <span className="text-sm font-medium">Kategori 2 (75%)</span>
                          <span className="text-sm bg-blue-100 px-2.5 py-0.5 rounded-full text-blue-800">50 Orang</span>
                        </div>
                        <div className="flex justify-between items-center bg-white rounded-lg p-2.5 shadow-sm">
                          <span className="text-sm font-medium">Kategori 3 (50%)</span>
                          <span className="text-sm bg-blue-100 px-2.5 py-0.5 rounded-full text-blue-800">50 Orang</span>
                        </div>
                        <div className="flex justify-between items-center bg-white rounded-lg p-2.5 shadow-sm">
                          <span className="text-sm font-medium">Kategori 4 (25%)</span>
                          <span className="text-sm bg-blue-100 px-2.5 py-0.5 rounded-full text-blue-800">
                            150 Orang
                          </span>
                        </div>
                        <div className="flex justify-between items-center bg-blue-100 rounded-lg p-2.5 mt-2 font-medium">
                          <span className="text-sm">Total Kuota</span>
                          <span className="text-sm">300 Orang</span>
                        </div>
                      </div>
                    </div>

                    {/* Organization Scholarship Summary */}
                    <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-2">
                          <Users className="h-4 w-4 text-emerald-600" />
                        </div>
                        <h3 className="font-medium text-gray-800">Bibit Unggul Persyarikatan</h3>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center bg-white rounded-lg p-2.5 shadow-sm">
                          <span className="text-sm font-medium">Kategori 1 (100%)</span>
                          <span className="text-sm bg-emerald-100 px-2.5 py-0.5 rounded-full text-emerald-800">
                            111 Orang
                          </span>
                        </div>
                        <div className="flex justify-between items-center bg-white rounded-lg p-2.5 shadow-sm">
                          <span className="text-sm font-medium">Kategori 2 (75%)</span>
                          <span className="text-sm bg-emerald-100 px-2.5 py-0.5 rounded-full text-emerald-800">
                            111 Orang
                          </span>
                        </div>
                        <div className="flex justify-between items-center bg-white rounded-lg p-2.5 shadow-sm">
                          <span className="text-sm font-medium">Kategori 3 (50%)</span>
                          <span className="text-sm bg-emerald-100 px-2.5 py-0.5 rounded-full text-emerald-800">
                            213 Orang
                          </span>
                        </div>
                        <div className="flex justify-between items-center bg-white rounded-lg p-2.5 shadow-sm opacity-0">
                          <span className="text-sm font-medium">-</span>
                          <span className="text-sm bg-emerald-100 px-2.5 py-0.5 rounded-full text-emerald-800">-</span>
                        </div>
                        <div className="flex justify-between items-center bg-emerald-100 rounded-lg p-2.5 mt-2 font-medium">
                          <span className="text-sm">Total Kuota</span>
                          <span className="text-sm">435 Orang</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Additional Information Section */}
          <section>
            <div className="bg-white rounded-3xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-5">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mr-3">
                    <FileText className="h-5 w-5 text-gray-700" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Informasi Penting</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-all">
                    <CardContent className="p-5">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-medium text-gray-800 text-lg">Timeline Beasiswa</h3>
                      </div>
                      <p className="text-gray-600">
                        Pendaftaran beasiswa dibuka setiap awal semester. Pastikan Anda mengajukan sebelum batas waktu
                        yang ditentukan untuk setiap kategori beasiswa.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-all">
                    <CardContent className="p-5">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center mr-3">
                          <Medal className="h-5 w-5 text-amber-500" />
                        </div>
                        <h3 className="font-medium text-gray-800 text-lg">Kriteria Seleksi</h3>
                      </div>
                      <p className="text-gray-600">
                        Seleksi beasiswa mempertimbangkan prestasi akademik, keaktifan organisasi, dan kondisi ekonomi
                        mahasiswa. Setiap kategori memiliki persyaratan khusus yang harus dipenuhi.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-all">
                    <CardContent className="p-5">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center mr-3">
                          <BookMarked className="h-5 w-5 text-emerald-500" />
                        </div>
                        <h3 className="font-medium text-gray-800 text-lg">Dokumen Pendukung</h3>
                      </div>
                      <p className="text-gray-600">
                        Siapkan dokumen pendukung seperti transkrip nilai, sertifikat prestasi, dan surat rekomendasi
                        sebelum mengajukan. Pastikan semua dokumen lengkap dan valid.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
