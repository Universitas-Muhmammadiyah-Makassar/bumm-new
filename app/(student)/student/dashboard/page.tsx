import Link from "next/link"
import { Button } from "@/components/shared/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shared/ui/card"
import {
  BookOpen,
  Award,
  GraduationCap,
  Clock,
  ArrowRight,
  FileText,
  CheckCircle,
  AlertCircle,
  XCircle,
  Sparkles,
  TrendingUp,
  Calendar,
  User,
  BookMarked,
  Layers,
} from "lucide-react"

export default function StudentDashboard() {
  // Mock data untuk mahasiswa
  const mahasiswa = {
    nama: "Ahmad Fauzi",
    nim: "10540001",
    fakultas: "Teknik",
    prodi: "Teknik Informatika",
    semester: 5,
  }

  // Mock data untuk beasiswa yang tersedia
  const beasiswaTersedia = [
    {
      id: 1,
      nama: "Beasiswa Hafidz Qur'an",
      icon: <BookOpen className="h-5 w-5" />,
      deadline: "30 Juni 2025",
      kuota: 50,
      status: "Dibuka",
      gradientClass: "from-indigo-500 to-purple-600",
      textColorClass: "text-indigo-600 hover:text-purple-600",
      bgClass: "bg-indigo-50",
      route: "/dashboard/beasiswa/1",
    },
    {
      id: 2,
      nama: "Beasiswa Prestasi Akademik",
      icon: <Award className="h-5 w-5" />,
      deadline: "15 Juli 2025",
      kuota: 100,
      status: "Dibuka",
      gradientClass: "from-amber-400 to-orange-500",
      textColorClass: "text-amber-500 hover:text-orange-500",
      bgClass: "bg-amber-50",
      route: "/dashboard/beasiswa/prestasi",
    },
    {
      id: 3,
      nama: "Beasiswa Bibit Unggul Persyarikatan",
      icon: <GraduationCap className="h-5 w-5" />,
      deadline: "10 Agustus 2025",
      kuota: 75,
      status: "Segera Dibuka",
      gradientClass: "from-emerald-400 to-teal-500",
      textColorClass: "text-emerald-600 hover:text-teal-500",
      bgClass: "bg-emerald-50",
      route: "/dashboard/beasiswa/3",
    },
  ]

  // Mock data untuk aplikasi beasiswa mahasiswa
  const aplikasiBeasiswa = [
    {
      id: 1,
      nama: "Beasiswa Hafidz Qur'an",
      tanggalApply: "10 Mei 2025",
      status: "Diterima",
      statusIcon: <CheckCircle className="h-5 w-5 text-emerald-500" />,
      statusClass: "text-emerald-500 bg-emerald-50",
    },
    {
      id: 2,
      nama: "Beasiswa Prestasi Akademik",
      tanggalApply: "5 Mei 2025",
      status: "Dalam Proses",
      statusIcon: <Clock className="h-5 w-5 text-amber-500" />,
      statusClass: "text-amber-500 bg-amber-50",
    },
    {
      id: 3,
      nama: "Beasiswa Bibit Unggul Persyarikatan",
      tanggalApply: "1 Mei 2025",
      status: "Ditolak",
      statusIcon: <XCircle className="h-5 w-5 text-rose-500" />,
      statusClass: "text-rose-500 bg-rose-50",
    },
  ]

  // Check if user has already applied for a beasiswa
  const hasAppliedForBeasiswa = (beasiswaId: number) => {
    return aplikasiBeasiswa.some((app) => app.id === beasiswaId)
  }

  return (
    <div className="grid gap-8">
      {/* Header Section */}
      <section>
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden card-hover border border-indigo-100/50">
          <div className="h-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 relative">
            <div className="absolute inset-0 bg-[url('/abstract-geometric-flow.png')] opacity-20 mix-blend-overlay"></div>
            <div className="absolute -bottom-6 left-8 w-16 h-16 rounded-full bg-white p-1 shadow-lg">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
          <div className="p-4 sm:p-8 pt-8 sm:pt-10">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <div className="sm:ml-10">
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Selamat Datang, {mahasiswa.nama}
                </h1>
                <p className="text-slate-500 mt-1">Kelola beasiswa dan aplikasi Anda di sini</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-2xl border border-indigo-100/50 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                    <Layers className="h-4 w-4 text-indigo-600" />
                  </div>
                  <span className="text-slate-500 text-sm">NIM:</span>
                </div>
                <p className="font-medium text-lg pl-11">{mahasiswa.nim}</p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-2xl border border-amber-100/50 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                    <BookMarked className="h-4 w-4 text-amber-600" />
                  </div>
                  <span className="text-slate-500 text-sm">Fakultas:</span>
                </div>
                <p className="font-medium text-lg pl-11">{mahasiswa.fakultas}</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-2xl border border-emerald-100/50 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                    <GraduationCap className="h-4 w-4 text-emerald-600" />
                  </div>
                  <span className="text-slate-500 text-sm">Program Studi:</span>
                </div>
                <p className="font-medium text-lg pl-11">{mahasiswa.prodi}</p>
              </div>
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-4 rounded-2xl border border-rose-100/50 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center group-hover:bg-rose-200 transition-colors">
                    <BookOpen className="h-4 w-4 text-rose-600" />
                  </div>
                  <span className="text-slate-500 text-sm">Semester:</span>
                </div>
                <p className="font-medium text-lg pl-11">{mahasiswa.semester}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white rounded-3xl p-4 sm:p-6 flex items-center border border-indigo-100/50 shadow-md hover:shadow-lg transition-shadow">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mr-4 shadow-md">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Beasiswa Aktif</p>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              8
            </h3>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-4 sm:p-6 flex items-center border border-amber-100/50 shadow-md hover:shadow-lg transition-shadow">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mr-4 shadow-md">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Aplikasi Diajukan</p>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              3
            </h3>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-4 sm:p-6 flex items-center border border-emerald-100/50 shadow-md hover:shadow-lg transition-shadow">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mr-4 shadow-md">
            <CheckCircle className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Beasiswa Diterima</p>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              1
            </h3>
          </div>
        </div>
      </section>

      {/* Beasiswa Tersedia Section */}
      <section>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6">
          <h2 className="text-2xl font-bold flex items-center text-slate-800">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center mr-3">
              <Sparkles className="h-5 w-5 text-indigo-600" />
            </div>
            Beasiswa Tersedia
          </h2>
          <Link href="/student/beasiswa">
            <Button
              variant="outline"
              className="bg-white border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 rounded-xl group w-full sm:w-auto justify-center sm:justify-start"
            >
              Lihat Semua{" "}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {beasiswaTersedia.map((beasiswa) => (
            <Card
              key={beasiswa.id}
              className={`overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl border-none ${beasiswa.bgClass} group`}
            >
              <div className={`h-3 bg-gradient-to-r ${beasiswa.gradientClass}`}></div>
              <CardHeader className="pb-2 pt-6 px-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${beasiswa.gradientClass} flex items-center justify-center mr-3 shadow-md group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div className="text-white">{beasiswa.icon}</div>
                    </div>
                    <CardTitle className="text-lg">{beasiswa.nama}</CardTitle>
                  </div>
                  <div>
                    <span
                      className={`badge-pill inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        beasiswa.status === "Dibuka" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {beasiswa.status}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-2 text-sm mb-5">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-slate-500 mr-2 flex-shrink-0" />
                    <span className="text-slate-600 truncate">Deadline: {beasiswa.deadline}</span>
                  </div>
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 text-slate-500 mr-2 flex-shrink-0" />
                    <span className="text-slate-600 truncate">Kuota: {beasiswa.kuota}</span>
                  </div>
                </div>
                {beasiswa.status === "Dibuka" ? (
                  hasAppliedForBeasiswa(beasiswa.id) ? (
                    <Button
                      className="w-full bg-slate-200 text-slate-600 rounded-xl cursor-not-allowed text-sm sm:text-base py-2 h-auto"
                      disabled
                    >
                      Sudah Terdaftar
                    </Button>
                  ) : (
                    <Link href={beasiswa.route} className="block w-full">
                      <Button
                        className={`w-full bg-gradient-to-r ${beasiswa.gradientClass} text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow text-sm sm:text-base py-2 h-auto`}
                      >
                        Daftar Sekarang
                      </Button>
                    </Link>
                  )
                ) : (
                  <Link href={beasiswa.route} className="block w-full">
                    <Button
                      className={`w-full bg-gradient-to-r ${beasiswa.gradientClass} text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow text-sm sm:text-base py-2 h-auto`}
                    >
                      Lihat Detail
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Aplikasi Beasiswa Section */}
      <section>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6">
          <h2 className="text-2xl font-bold flex items-center text-slate-800">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center mr-3">
              <FileText className="h-5 w-5 text-amber-600" />
            </div>
            Status Aplikasi Beasiswa
          </h2>
          <Link href="/student/aplikasi">
            <Button
              variant="outline"
              className="bg-white border-amber-200 text-amber-600 hover:bg-amber-50 hover:text-amber-700 rounded-xl group w-full sm:w-auto justify-center sm:justify-start"
            >
              Lihat Semua{" "}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl border-none overflow-hidden bg-white">
          <CardHeader className="bg-gradient-to-r from-amber-400 to-orange-500 relative">
            <div className="absolute inset-0 bg-[url('/abstract-wave-pattern.png')] opacity-20 mix-blend-overlay"></div>
            <CardTitle className="flex items-center text-white text-xl">
              <FileText className="h-5 w-5 mr-2" />
              Riwayat Aplikasi
            </CardTitle>
            <CardDescription className="text-white/80">Status aplikasi beasiswa yang telah Anda ajukan</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {aplikasiBeasiswa.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-10 w-10 text-amber-500" />
                </div>
                <p className="text-slate-500 mb-4">Anda belum mengajukan aplikasi beasiswa.</p>
                <Link href="/student/beasiswa" className="inline-block">
                  <Button className="bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:from-amber-500 hover:to-orange-600 rounded-xl shadow-md">
                    Lihat Beasiswa Tersedia
                  </Button>
                </Link>
              </div>
            ) : (
              <div>
                {/* Desktop view - table */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 font-medium text-slate-500">Nama Beasiswa</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-500">Tanggal Apply</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-500">Status</th>
                        <th className="text-right py-3 px-4 font-medium text-slate-500">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {aplikasiBeasiswa.map((aplikasi) => (
                        <tr
                          key={aplikasi.id}
                          className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors"
                        >
                          <td className="py-4 px-4 font-medium">{aplikasi.nama}</td>
                          <td className="py-4 px-4 text-slate-600">{aplikasi.tanggalApply}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${aplikasi.statusClass}`}
                              >
                                {aplikasi.statusIcon}
                                <span className="ml-1">{aplikasi.status}</span>
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <Link href={`/student/aplikasi/${aplikasi.id}`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-amber-600 border-amber-200 hover:bg-amber-50 hover:text-amber-700 rounded-xl"
                              >
                                <FileText className="h-4 w-4 mr-1" /> Detail
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile view - accordion */}
                <div className="sm:hidden">
                  {aplikasiBeasiswa.map((aplikasi) => (
                    <div key={aplikasi.id} className="mb-4 border border-slate-200 rounded-2xl overflow-hidden">
                      <details className="group">
                        <summary className="flex items-center justify-between p-4 bg-white cursor-pointer list-none">
                          <span className="font-medium">{aplikasi.nama}</span>
                          <span className="transition-transform transform group-open:rotate-180">
                            <svg
                              fill="none"
                              height="24"
                              shapeRendering="geometricPrecision"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              viewBox="0 0 24 24"
                              width="24"
                            >
                              <path d="M6 9l6 6 6-6" />
                            </svg>
                          </span>
                        </summary>
                        <div className="p-4">
                          <p className="text-slate-600 text-sm mb-2">Tanggal Apply: {aplikasi.tanggalApply}</p>
                          <div className="flex items-center mb-2">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${aplikasi.statusClass}`}
                            >
                              {aplikasi.statusIcon}
                              <span className="ml-1">{aplikasi.status}</span>
                            </span>
                          </div>
                          <Link href={`/student/aplikasi/${aplikasi.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-amber-600 border-amber-200 hover:bg-amber-50 hover:text-amber-700 rounded-xl"
                            >
                              <FileText className="h-4 w-4 mr-1" /> Detail
                            </Button>
                          </Link>
                        </div>
                      </details>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
