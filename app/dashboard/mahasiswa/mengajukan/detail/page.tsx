import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  FileText,
  CheckCircle,
  Calendar,
  Clock,
  ArrowLeft,
  Download,
  User,
  BookOpen,
  GraduationCap,
  School,
  Award,
} from "lucide-react"

export default function AplikasiDetailPage() {
  // Mock data untuk detail aplikasi
  const aplikasi = {
    id: 1,
    nama: "Beasiswa Hafidz Qur'an",
    tanggalApply: "10 Mei 2025",
    status: "Diterima",
    statusIcon: <CheckCircle className="h-5 w-5 text-emerald-500" />,
    statusClass: "text-emerald-500 bg-emerald-50",
    lastUpdated: "15 Mei 2025",
    dokumen: [
      {
        nama: "Formulir Pendaftaran",
        status: "Terverifikasi",
        icon: <CheckCircle className="h-4 w-4 text-emerald-500" />,
      },
      { nama: "Transkrip Nilai", status: "Terverifikasi", icon: <CheckCircle className="h-4 w-4 text-emerald-500" /> },
      {
        nama: "Sertifikat Hafidz",
        status: "Terverifikasi",
        icon: <CheckCircle className="h-4 w-4 text-emerald-500" />,
      },
      {
        nama: "Surat Rekomendasi",
        status: "Terverifikasi",
        icon: <CheckCircle className="h-4 w-4 text-emerald-500" />,
      },
    ],
    timeline: [
      { tanggal: "10 Mei 2025", status: "Pendaftaran Dikirim", deskripsi: "Aplikasi berhasil dikirim" },
      { tanggal: "12 Mei 2025", status: "Verifikasi Dokumen", deskripsi: "Dokumen telah diverifikasi" },
      { tanggal: "14 Mei 2025", status: "Wawancara", deskripsi: "Wawancara telah dilaksanakan" },
      { tanggal: "15 Mei 2025", status: "Diterima", deskripsi: "Selamat! Anda diterima sebagai penerima beasiswa" },
    ],
  }

  // Mock data untuk mahasiswa
  const mahasiswa = {
    nama: "Ahmad Fauzi",
    nim: "10540001",
    fakultas: "Teknik",
    prodi: "Teknik Informatika",
    semester: 5,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8">
        {/* Header Section */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center">
              <Link href="/dashboard/mahasiswa/mengajukan">
                <Button
                  variant="outline"
                  size="icon"
                  className="mr-4 bg-white border-slate-200 text-slate-700 hover:bg-slate-100 rounded-xl h-10 w-10"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span className="sr-only">Kembali</span>
                </Button>
              </Link>
              <h1 className="text-2xl font-bold flex items-center text-slate-800">Detail Pengajuan Beasiswa</h1>
            </div>
            <Button
              variant="outline"
              className="bg-white border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 rounded-xl group flex items-center"
            >
              <Download className="mr-2 h-4 w-4" />
              Unduh Bukti Pendaftaran
            </Button>
          </div>
        </section>

        {/* Status Card */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="shadow-lg rounded-3xl border-none overflow-hidden bg-white">
              <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 relative">
                <div className="absolute inset-0 bg-[url('/abstract-geometric-flow.png')] opacity-20 mix-blend-overlay"></div>
                <CardTitle className="flex items-center text-white text-xl">
                  <FileText className="h-5 w-5 mr-2" />
                  {aplikasi.nama}
                </CardTitle>
                <CardDescription className="text-white/80">Detail aplikasi beasiswa Anda</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div className="flex items-center">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${aplikasi.statusClass}`}
                    >
                      {aplikasi.statusIcon}
                      <span className="ml-1">{aplikasi.status}</span>
                    </span>
                  </div>
                  <div className="flex items-center text-slate-500 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    Terakhir diperbarui: {aplikasi.lastUpdated}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-slate-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-500">Tanggal Pendaftaran</p>
                      <p className="font-medium">{aplikasi.tanggalApply}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <User className="h-5 w-5 text-slate-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-500">Nama Pendaftar</p>
                      <p className="font-medium">{mahasiswa.nama}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <BookOpen className="h-5 w-5 text-slate-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-500">NIM</p>
                      <p className="font-medium">{mahasiswa.nim}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <School className="h-5 w-5 text-slate-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-500">Fakultas</p>
                      <p className="font-medium">{mahasiswa.fakultas}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <GraduationCap className="h-5 w-5 text-slate-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-500">Program Studi</p>
                      <p className="font-medium">{mahasiswa.prodi}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Award className="h-5 w-5 text-slate-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-500">Semester</p>
                      <p className="font-medium">{mahasiswa.semester}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Dokumen Pendaftaran</h3>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {aplikasi.dokumen.map((dok, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100"
                        >
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 text-slate-400 mr-2" />
                            <span>{dok.nama}</span>
                          </div>
                          <div className="flex items-center">
                            {dok.icon}
                            <span className="ml-1 text-sm text-emerald-500">{dok.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="shadow-lg rounded-3xl border-none overflow-hidden bg-white">
              <CardHeader className="bg-gradient-to-r from-amber-400 to-orange-500 relative">
                <div className="absolute inset-0 bg-[url('/abstract-wave-pattern.png')] opacity-20 mix-blend-overlay"></div>
                <CardTitle className="flex items-center text-white text-xl">
                  <Clock className="h-5 w-5 mr-2" />
                  Timeline Aplikasi
                </CardTitle>
                <CardDescription className="text-white/80">Riwayat proses aplikasi beasiswa</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="relative pl-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {aplikasi.timeline.map((item, index) => (
                    <div key={index} className="mb-6 last:mb-0">
                      <div className="absolute left-0 rounded-full w-6 h-6 bg-indigo-100 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                      </div>
                      <div className="text-sm text-slate-500">{item.tanggal}</div>
                      <div className="font-medium">{item.status}</div>
                      <div className="text-sm text-slate-600 mt-1">{item.deskripsi}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
