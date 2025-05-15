import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import {
  Award,
  ArrowLeft,
  BookOpen,
  GraduationCap,
  Calendar,
  AlertCircle,
  Sparkles,
  ChevronRight,
  FileText,
} from "lucide-react"

export default function BeasiswaPrestasi() {
  // Mock data untuk beasiswa prestasi
  const beasiswaPrestasi = {
    id: 2,
    nama: "Beasiswa Prestasi Akademik",
    deskripsi: "Beasiswa untuk mahasiswa berprestasi dengan nilai akademik yang tinggi dan konsisten.",
    icon: <Award className="h-5 w-5 text-white" />,
    deadline: "15 Juli 2025",
    kuota: 100,
    status: "Dibuka",
    persyaratan: [
      "Mahasiswa aktif Universitas Muhammadiyah Makassar",
      "IPK minimal 3.50",
      "Aktif dalam kegiatan akademik",
      "Memiliki prestasi akademik tingkat universitas/nasional",
      "Nilai rata-rata rapor minimal 85",
    ],
    benefit: "Bebas biaya kuliah selama 1 semester",
    bgGradient: "from-secondary to-amber-300",
    textColor: "text-secondary hover:text-amber-500",
  }

  // Kriteria penilaian untuk beasiswa prestasi
  const kriteriaPenilaian = [
    {
      nama: "Nilai Akademik",
      bobot: "40%",
      deskripsi: "Penilaian berdasarkan nilai rapor dan prestasi akademik",
    },
    {
      nama: "Prestasi Non-Akademik",
      bobot: "30%",
      deskripsi: "Penilaian berdasarkan prestasi di luar akademik seperti lomba, organisasi, dll",
    },
    {
      nama: "Motivasi dan Potensi",
      bobot: "20%",
      deskripsi: "Penilaian berdasarkan motivasi dan potensi pengembangan diri",
    },
    {
      nama: "Kondisi Ekonomi",
      bobot: "10%",
      deskripsi: "Penilaian berdasarkan kondisi ekonomi keluarga",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-amber-50/30 page-transition">
      <Navbar userRole="mahasiswa" />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid gap-8">
          {/* Back Button */}
          <div className="mb-2">
            <Link
              href="/dashboard/beasiswa"
              className="inline-flex items-center text-amber-600 hover:text-amber-700 transition-colors group text-sm sm:text-base"
            >
              <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Kembali ke Daftar Beasiswa
            </Link>
          </div>

          {/* Header Section */}
          <section>
            <div className="bg-white rounded-3xl shadow-soft overflow-hidden card-hover">
              <div className="h-24 bg-gradient-to-r from-secondary to-amber-300 relative">
                <div className="absolute inset-0 bg-[url('/abstract-wave-pattern.png')] opacity-20 mix-blend-overlay"></div>
              </div>
              <div className="p-6 sm:p-8 -mt-10 relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-secondary to-amber-300 flex items-center justify-center mr-4 sm:mr-5 shadow-lg transform transition-transform duration-300 hover:scale-105">
                      <Award className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-xl sm:text-3xl font-bold">{beasiswaPrestasi.nama}</h1>
                        <span className="badge-pill inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                          {beasiswaPrestasi.status}
                        </span>
                      </div>
                      <p className="text-sm sm:text-base text-gray-600">{beasiswaPrestasi.deskripsi}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                  <div className="bg-amber-50 p-4 rounded-2xl flex items-center group hover:shadow-md transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-amber-500 bg-opacity-20 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                      <Calendar className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Deadline Pendaftaran</p>
                      <p className="font-semibold">{beasiswaPrestasi.deadline}</p>
                    </div>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-2xl flex items-center group hover:shadow-md transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-amber-500 bg-opacity-20 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                      <GraduationCap className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Kuota Penerima</p>
                      <p className="font-semibold">{beasiswaPrestasi.kuota} mahasiswa</p>
                    </div>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-2xl flex items-center group hover:shadow-md transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-amber-500 bg-opacity-20 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                      <Award className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Benefit Utama</p>
                      <p className="font-semibold">{beasiswaPrestasi.benefit}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Persyaratan Section */}
          <section>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6">
              <h2 className="text-2xl font-bold flex items-center text-slate-800">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center mr-3">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                </div>
                Persyaratan Beasiswa
              </h2>
            </div>

            <Card className="shadow-soft rounded-3xl border-none overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-secondary to-amber-300 p-5 relative">
                <div className="absolute inset-0 bg-[url('/abstract-wave-pattern.png')] opacity-20 mix-blend-overlay"></div>
                <CardTitle className="flex items-center text-white">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Persyaratan Beasiswa Prestasi Akademik
                </CardTitle>
                <CardDescription className="text-white/80">
                  Pastikan Anda memenuhi semua persyaratan berikut
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3 text-gray-700">
                  {beasiswaPrestasi.persyaratan.map((syarat, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mt-1 mr-3 w-5 h-5 rounded-full bg-amber-500 bg-opacity-20 flex-shrink-0 flex items-center justify-center">
                        <ChevronRight className="h-3 w-3 text-amber-600" />
                      </div>
                      <span>{syarat}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-100">
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <Sparkles className="h-5 w-5 mr-2 text-amber-500" />
                    Kriteria Penilaian
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {kriteriaPenilaian.map((kriteria, index) => (
                      <div key={index} className="bg-white p-3 rounded-lg border border-amber-100 shadow-sm">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-medium text-amber-700">{kriteria.nama}</h4>
                          <span className="text-sm font-bold text-amber-600">{kriteria.bobot}</span>
                        </div>
                        <p className="text-sm text-gray-600">{kriteria.deskripsi}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <Link href="/dashboard/beasiswa/prestasi/apply">
                    <Button className="bg-gradient-to-r from-secondary to-amber-300 text-white rounded-xl shadow-glow btn-press text-base py-2.5 h-auto px-8">
                      <FileText className="h-5 w-5 mr-2" />
                      Daftar Beasiswa Prestasi
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  )
}
