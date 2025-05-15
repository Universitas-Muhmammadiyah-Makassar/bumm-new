import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import {
  BookOpen,
  Award,
  Clock,
  FileText,
  CheckCircle,
  AlertCircle,
  User,
  Info,
  HelpCircle,
  PenLine,
  XCircle,
  Calendar,
  BarChart3,
  Mail,
  MapPin,
  Phone,
  CalendarIcon,
  UserCircle2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MahasiswaDashboard() {
  // Mock data untuk mahasiswa dengan field tambahan
  const mahasiswa = {
    nama: "Ahmad Fauzi",
    nim: "10540001",
    fakultas: "Teknik",
    prodi: "Teknik Informatika",
    semester: 5,
    ipk: 3.75,
    status: "Aktif",
    email: "ahmad.fauzi@example.com",
    tempatLahir: "Makassar",
    tanggalLahir: "15 Mei 1999",
    jenisKelamin: "Laki-laki",
    noTelepon: "+62 812-3456-7890",
    alamat: "Jl. Perintis Kemerdekaan No. 123, Makassar",
  }

  // Mock data untuk aplikasi beasiswa mahasiswa (hanya satu aplikasi yang diperbolehkan)
  // Status: null (belum mengajukan), "pending" (dalam proses), "approved" (diterima), "rejected" (ditolak)
  const aplikasiBeasiswa = {
    id: 2,
    nama: "Beasiswa Prestasi Akademik",
    tanggalApply: "5 Mei 2025",
    status: "pending", // null, "pending", "approved", "rejected"
    tanggalUpdate: "7 Mei 2025",
    jenis: "Prestasi Akademik",
    kategori: "IPK Tinggi",
    progressPercentage: 60,
  }

  // Fungsi untuk mendapatkan informasi status aplikasi
  const getStatusInfo = (status) => {
    switch (status) {
      case "pending":
        return {
          label: "Dalam Proses",
          icon: <Clock className="h-5 w-5 text-amber-500" />,
          class: "text-amber-500 bg-amber-50",
          message: "Aplikasi Anda sedang dalam proses review oleh tim beasiswa.",
          progressColor: "bg-amber-500",
        }
      case "approved":
        return {
          label: "Diterima",
          icon: <CheckCircle className="h-5 w-5 text-emerald-500" />,
          class: "text-emerald-500 bg-emerald-50",
          message: "Selamat! Aplikasi beasiswa Anda telah disetujui.",
          progressColor: "bg-emerald-500",
        }
      case "rejected":
        return {
          label: "Ditolak",
          icon: <XCircle className="h-5 w-5 text-rose-500" />,
          class: "text-rose-500 bg-rose-50",
          message: "Maaf, aplikasi beasiswa Anda tidak disetujui. Silakan coba lagi semester depan.",
          progressColor: "bg-rose-500",
        }
      default:
        return {
          label: "Belum Mengajukan",
          icon: <AlertCircle className="h-5 w-5 text-slate-500" />,
          class: "text-slate-500 bg-slate-50",
          message: "Anda belum mengajukan beasiswa. Ajukan sekarang untuk mendapatkan bantuan biaya pendidikan.",
          progressColor: "bg-slate-300",
        }
    }
  }

  // Mendapatkan informasi status
  const statusInfo = getStatusInfo(aplikasiBeasiswa?.status)

  // Tata cara pengajuan beasiswa
  const tataCara = [
    "Pilih jenis beasiswa yang sesuai dengan kualifikasi Anda",
    "Lengkapi formulir pengajuan dengan data yang benar",
    "Unggah dokumen pendukung yang diperlukan",
    "Periksa kembali semua informasi sebelum mengirim",
    "Tunggu proses verifikasi dari tim beasiswa",
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-indigo-50">
      <Navbar userRole="mahasiswa" />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid gap-6">
          {/* Combined Student Data and Application Status Card */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow rounded-2xl border-none overflow-hidden">
            <div className="grid md:grid-cols-3 h-full">
              {/* Left Section - Enhanced Student Data */}
              <div className="md:col-span-1 bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-700 relative p-6">
                <div className="absolute inset-0 bg-[url('/abstract-geometric-flow.png')] opacity-20 mix-blend-overlay"></div>

                <div className="flex items-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mr-4 border-2 border-white/30 shadow-lg">
                    <User className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <h2 className="text-white text-xl font-bold">{mahasiswa.nama}</h2>
                    <div className="flex items-center mt-1">
                      <Badge className="bg-white/20 text-white hover:bg-white/30 border-none">{mahasiswa.nim}</Badge>
                      <Badge className="bg-emerald-400/20 text-emerald-100 hover:bg-emerald-400/30 border-none ml-2">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {mahasiswa.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="bg-white/10 text-white mb-4 w-full">
                    <TabsTrigger
                      value="personal"
                      className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
                    >
                      Data Pribadi
                    </TabsTrigger>
                    <TabsTrigger
                      value="academic"
                      className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
                    >
                      Data Akademik
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal" className="mt-0 space-y-4 text-white">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <UserCircle2 className="h-4 w-4 text-white/70 mr-3 mt-0.5" />
                          <div>
                            <p className="text-white/60 text-xs">Nama Lengkap</p>
                            <p className="font-medium">{mahasiswa.nama}</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <Mail className="h-4 w-4 text-white/70 mr-3 mt-0.5" />
                          <div>
                            <p className="text-white/60 text-xs">Email</p>
                            <p className="font-medium">{mahasiswa.email}</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <Phone className="h-4 w-4 text-white/70 mr-3 mt-0.5" />
                          <div>
                            <p className="text-white/60 text-xs">Nomor Telepon</p>
                            <p className="font-medium">{mahasiswa.noTelepon}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 text-white/70 mr-3 mt-0.5" />
                          <div>
                            <p className="text-white/60 text-xs">Tempat Lahir</p>
                            <p className="font-medium">{mahasiswa.tempatLahir}</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <CalendarIcon className="h-4 w-4 text-white/70 mr-3 mt-0.5" />
                          <div>
                            <p className="text-white/60 text-xs">Tanggal Lahir</p>
                            <p className="font-medium">{mahasiswa.tanggalLahir}</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <User className="h-4 w-4 text-white/70 mr-3 mt-0.5" />
                          <div>
                            <p className="text-white/60 text-xs">Jenis Kelamin</p>
                            <p className="font-medium">{mahasiswa.jenisKelamin}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="academic" className="mt-0 space-y-4 text-white">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <BookOpen className="h-4 w-4 text-white/70 mr-3 mt-0.5" />
                          <div>
                            <p className="text-white/60 text-xs">Program Studi</p>
                            <p className="font-medium">{mahasiswa.prodi}</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <Award className="h-4 w-4 text-white/70 mr-3 mt-0.5" />
                          <div>
                            <p className="text-white/60 text-xs">Fakultas</p>
                            <p className="font-medium">{mahasiswa.fakultas}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <Calendar className="h-4 w-4 text-white/70 mr-3 mt-0.5" />
                          <div>
                            <p className="text-white/60 text-xs">Semester</p>
                            <p className="font-medium">{mahasiswa.semester}</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <BarChart3 className="h-4 w-4 text-white/70 mr-3 mt-0.5" />
                          <div>
                            <p className="text-white/60 text-xs">IPK</p>
                            <div className="flex items-center">
                              <p className="font-medium mr-2">{mahasiswa.ipk}</p>
                              <div className="w-24 h-1.5 bg-white/20 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-emerald-400"
                                  style={{ width: `${(mahasiswa.ipk / 4) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white/60 text-xs">NIM</p>
                          <p className="font-medium">{mahasiswa.nim}</p>
                        </div>
                        <Badge className="bg-emerald-400/20 text-emerald-100 hover:bg-emerald-400/30 border-none">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {mahasiswa.status}
                        </Badge>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Right Section - Application Status */}
              <div className="md:col-span-2 p-6 bg-white">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 flex items-center">
                      <FileText className="h-5 w-5 text-violet-600 mr-2" />
                      Status Aplikasi Beasiswa
                    </h2>
                    <p className="text-slate-500 text-sm">
                      {aplikasiBeasiswa?.status
                        ? "Status pengajuan beasiswa Anda saat ini"
                        : "Anda dapat mengajukan satu beasiswa per periode"}
                    </p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 px-3 py-1">
                    <Info className="h-4 w-4 mr-1" />
                    Maksimal 1 pengajuan
                  </Badge>
                </div>

                {!aplikasiBeasiswa?.status ? (
                  <div className="bg-slate-50 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center mb-4 md:mb-0">
                      <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                        <AlertCircle className="h-7 w-7 text-amber-500" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg text-slate-800">Belum Ada Pengajuan</h3>
                        <p className="text-slate-500">Anda belum mengajukan beasiswa apapun</p>
                      </div>
                    </div>
                    <Link href="/dashboard/mahasiswa/mengajukan">
                      <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 rounded-xl shadow-md">
                        <PenLine className="h-4 w-4 mr-2" />
                        Ajukan Sekarang
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="bg-slate-50 rounded-xl p-5">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                        <div className="flex items-start">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center mr-3 ${
                              aplikasiBeasiswa.status === "pending"
                                ? "bg-amber-100"
                                : aplikasiBeasiswa.status === "approved"
                                  ? "bg-emerald-100"
                                  : "bg-rose-100"
                            }`}
                          >
                            {statusInfo.icon}
                          </div>
                          <div>
                            <h3 className="font-medium text-lg text-slate-800">{aplikasiBeasiswa.nama}</h3>
                            <p className="text-slate-500 text-sm">{aplikasiBeasiswa.kategori}</p>
                          </div>
                        </div>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.class}`}
                        >
                          {statusInfo.icon}
                          <span className="ml-1">{statusInfo.label}</span>
                        </span>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-500">Progress Pengajuan</span>
                          <span className="font-medium">{aplikasiBeasiswa.progressPercentage}%</span>
                        </div>
                        <Progress
                          value={aplikasiBeasiswa.progressPercentage}
                          className="h-2"
                          indicatorClassName={statusInfo.progressColor}
                        />
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-slate-200 mb-4">
                        <p className="text-slate-700">{statusInfo.message}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-white p-3 rounded-lg border border-slate-200">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-slate-400 mr-2" />
                            <div>
                              <p className="text-xs text-slate-500">Tanggal Pengajuan</p>
                              <p className="text-sm font-medium">{aplikasiBeasiswa.tanggalApply}</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-slate-200">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-slate-400 mr-2" />
                            <div>
                              <p className="text-xs text-slate-500">Terakhir Diperbarui</p>
                              <p className="text-sm font-medium">{aplikasiBeasiswa.tanggalUpdate}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                          href={`/dashboard/mahasiswa/mengajukan/detail?id=${aplikasiBeasiswa.id}`}
                          className="flex-1"
                        >
                          <Button
                            variant="outline"
                            className="w-full text-violet-600 border-violet-200 hover:bg-violet-50 rounded-lg"
                          >
                            <FileText className="h-4 w-4 mr-2" /> Lihat Detail
                          </Button>
                        </Link>

                        {aplikasiBeasiswa.status === "rejected" && (
                          <Link href="/dashboard/mahasiswa/mengajukan" className="flex-1">
                            <Button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 rounded-lg">
                              <PenLine className="h-4 w-4 mr-2" /> Ajukan Kembali
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>

                    {aplikasiBeasiswa.status !== "rejected" && (
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <div className="flex items-start">
                          <Info className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-blue-700">
                            Anda hanya dapat mengajukan satu beasiswa per periode. Pengajuan baru dapat dilakukan
                            setelah aplikasi saat ini selesai diproses.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Tata Cara Pengajuan Section - Now Full Width */}
          <Card className="shadow-md hover:shadow-lg transition-shadow rounded-2xl border-none overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 relative p-6">
                <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern.png')] opacity-20 mix-blend-overlay"></div>
                <CardTitle className="text-white text-xl flex items-center mb-2">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  Tata Cara Pengajuan Beasiswa
                </CardTitle>
                <CardDescription className="text-white/80 mb-4">
                  Panduan langkah-langkah pengajuan beasiswa
                </CardDescription>

                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                  <h3 className="font-medium text-white flex items-center mb-3">
                    <Info className="h-5 w-5 mr-2" />
                    Langkah-langkah Pengajuan
                  </h3>
                  <ol className="space-y-3 pl-2">
                    {tataCara.map((step, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <span className="text-white/90 text-sm">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="bg-white p-6">
                <h3 className="font-medium text-slate-800 flex items-center mb-4">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                  Penting Diperhatikan
                </h3>

                <div className="space-y-4">
                  <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                    <h4 className="font-medium text-amber-700 mb-2">Persyaratan Dokumen</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                          •
                        </div>
                        <span className="text-slate-700 text-sm">
                          Pastikan semua dokumen yang diunggah jelas dan terbaca
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                          •
                        </div>
                        <span className="text-slate-700 text-sm">
                          Format file yang diterima: PDF, JPG, atau PNG (maks. 2MB per file)
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h4 className="font-medium text-blue-700 mb-2">Ketentuan Pengajuan</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                          •
                        </div>
                        <span className="text-slate-700 text-sm">
                          Setiap mahasiswa hanya dapat mengajukan satu beasiswa per periode
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                          •
                        </div>
                        <span className="text-slate-700 text-sm">Pengajuan yang sudah disubmit tidak dapat diubah</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                          •
                        </div>
                        <span className="text-slate-700 text-sm">
                          Proses verifikasi membutuhkan waktu 7-14 hari kerja
                        </span>
                      </li>
                    </ul>
                  </div>

                  {!aplikasiBeasiswa?.status && (
                    <div className="flex justify-center mt-4">
                      <Link href="/dashboard/mahasiswa/mengajukan">
                        <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 rounded-xl shadow-md">
                          <PenLine className="h-4 w-4 mr-2" />
                          Ajukan Beasiswa Sekarang
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
