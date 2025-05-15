import Link from "next/link"
import { Button } from "@/components/shared/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shared/ui/card"
import {
  Users,
  Award,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  BarChart3,
  PieChart,
  TrendingUp,
  ArrowRight,
  Search,
  Sparkles,
  Plus,
} from "lucide-react"
import { Input } from "@/components/shared/ui/input"

export default function AdminDashboard() {
  // Mock data untuk statistik
  const stats = [
    {
      title: "Total Mahasiswa",
      value: "1,234",
      icon: <Users className="h-5 w-5 text-white" />,
      change: "+5.2%",
      trend: "up",
      bgClass: "from-blue-600 to-blue-400",
    },
    {
      title: "Beasiswa Aktif",
      value: "8",
      icon: <Award className="h-5 w-5 text-white" />,
      change: "+2",
      trend: "up",
      bgClass: "from-amber-500 to-amber-300",
    },
    {
      title: "Aplikasi Masuk",
      value: "356",
      icon: <FileText className="h-5 w-5 text-white" />,
      change: "+12.3%",
      trend: "up",
      bgClass: "from-green-500 to-teal-400",
    },
    {
      title: "Tingkat Penerimaan",
      value: "68%",
      icon: <CheckCircle className="h-5 w-5 text-white" />,
      change: "+3.7%",
      trend: "up",
      bgClass: "from-purple-500 to-purple-400",
    },
  ]

  // Mock data untuk aplikasi terbaru
  const aplikasiTerbaru = [
    {
      id: 1,
      nama: "Ahmad Fauzi",
      nim: "10540001",
      beasiswa: "Hafidz Qur'an",
      tanggal: "15 Mei 2025",
      status: "Menunggu Review",
      statusIcon: <Clock className="h-5 w-5 text-amber-500" />,
    },
    {
      id: 2,
      nama: "Siti Aisyah",
      nim: "10540015",
      beasiswa: "Prestasi Akademik",
      tanggal: "14 Mei 2025",
      status: "Diterima",
      statusIcon: <CheckCircle className="h-5 w-5 text-green-500" />,
    },
    {
      id: 3,
      nama: "Muhammad Rizki",
      nim: "10540023",
      beasiswa: "Bibit Unggul Persyarikatan",
      tanggal: "13 Mei 2025",
      status: "Ditolak",
      statusIcon: <XCircle className="h-5 w-5 text-red-500" />,
    },
    {
      id: 4,
      nama: "Nur Fadilah",
      nim: "10540042",
      beasiswa: "Hafidz Qur'an",
      tanggal: "12 Mei 2025",
      status: "Menunggu Review",
      statusIcon: <Clock className="h-5 w-5 text-amber-500" />,
    },
    {
      id: 5,
      nama: "Arif Rahman",
      nim: "10540056",
      beasiswa: "Prestasi Akademik",
      tanggal: "11 Mei 2025",
      status: "Diterima",
      statusIcon: <CheckCircle className="h-5 w-5 text-green-500" />,
    },
  ]

  return (
    <div className="grid gap-8">
      {/* Header Section */}
      <section>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center">
              <Sparkles className="h-5 w-5 text-blue-600 mr-2" />
              Dashboard Admin
            </h1>
            <p className="text-gray-500">Kelola beasiswa dan aplikasi mahasiswa</p>
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Cari..." className="pl-10 w-full md:w-64 rounded-full border-gray-200" />
            </div>
            <Link href="/admin/beasiswa/tambah">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full shadow-md hover:shadow-lg transition-shadow">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Beasiswa
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-none shadow-lg rounded-3xl overflow-hidden card-hover">
              <CardContent className="p-0">
                <div className={`bg-gradient-to-r ${stat.bgClass} p-6 text-white`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-white/80">{stat.title}</p>
                      <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      {stat.icon}
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <div className="flex items-center text-sm">
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingUp className="h-4 w-4 text-red-500 mr-1 transform rotate-180" />
                    )}
                    <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                    <span className="text-gray-500 ml-1">dari bulan lalu</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Charts Section */}
      <section className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-lg rounded-3xl border-none overflow-hidden card-hover">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-50">
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
              Aplikasi Beasiswa per Bulan
            </CardTitle>
            <CardDescription>Jumlah aplikasi beasiswa yang masuk per bulan</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[300px] flex items-center justify-center bg-blue-50/50 rounded-2xl">
              <div className="text-center p-4">
                <BarChart3 className="h-16 w-16 mx-auto text-blue-300 mb-4 animate-bounce-slow" />
                <p className="text-gray-500">Grafik aplikasi beasiswa per bulan</p>
                <p className="text-sm text-gray-400">Data visualisasi akan muncul di sini</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-3xl border-none overflow-hidden card-hover">
          <CardHeader className="bg-gradient-to-r from-amber-100 to-amber-50">
            <CardTitle className="flex items-center">
              <PieChart className="h-5 w-5 mr-2 text-amber-500" />
              Distribusi Beasiswa
            </CardTitle>
            <CardDescription>Persentase distribusi beasiswa berdasarkan jenis</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[300px] flex items-center justify-center bg-amber-50/50 rounded-2xl">
              <div className="text-center p-4">
                <PieChart className="h-16 w-16 mx-auto text-amber-300 mb-4 animate-bounce-slow" />
                <p className="text-gray-500">Grafik distribusi beasiswa</p>
                <p className="text-sm text-gray-400">Data visualisasi akan muncul di sini</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Aplikasi Terbaru Section */}
      <section>
        <Card className="shadow-lg rounded-3xl border-none overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-green-100 to-teal-50">
            <div>
              <CardTitle className="flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-green-600" />
                Aplikasi Terbaru
              </CardTitle>
              <CardDescription>Daftar aplikasi beasiswa terbaru yang masuk</CardDescription>
            </div>
            <Link href="/admin/aplikasi">
              <Button
                variant="ghost"
                className="text-green-600 hover:text-teal-500 hover:bg-white/50 rounded-full group"
              >
                Lihat Semua{" "}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Nama</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">NIM</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Beasiswa</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Tanggal</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-500">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {aplikasiTerbaru.map((aplikasi) => (
                    <tr key={aplikasi.id} className="border-b last:border-0 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4">{aplikasi.nama}</td>
                      <td className="py-4 px-4">{aplikasi.nim}</td>
                      <td className="py-4 px-4">{aplikasi.beasiswa}</td>
                      <td className="py-4 px-4">{aplikasi.tanggal}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          {aplikasi.statusIcon}
                          <span className="ml-2">{aplikasi.status}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <Link href={`/admin/aplikasi/${aplikasi.id}`}>
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50 rounded-full">
                            <FileText className="h-4 w-4 mr-1" /> Detail
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
