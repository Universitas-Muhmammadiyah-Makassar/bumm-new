import Link from "next/link"
import { Button } from "@/components/shared/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shared/ui/card"
import { CheckCircle, ArrowLeft, FileText } from "lucide-react"

export default function SuccessPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8">
        {/* Header Section */}
        <section>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6">
            <h1 className="text-2xl font-bold flex items-center text-slate-800">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center mr-3">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              </div>
              Pengajuan Berhasil
            </h1>
            <Link href="/dashboard/mahasiswa">
              <Button
                variant="outline"
                className="bg-white border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 rounded-xl group w-full sm:w-auto justify-center sm:justify-start"
              >
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                Kembali ke Dashboard
              </Button>
            </Link>
          </div>
        </section>

        {/* Success Card */}
        <section>
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl border-none overflow-hidden bg-white">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 relative">
              <div className="absolute inset-0 bg-[url('/abstract-geometric-flow.png')] opacity-20 mix-blend-overlay"></div>
              <CardTitle className="flex items-center text-white text-xl">
                <CheckCircle className="h-5 w-5 mr-2" />
                Aplikasi Beasiswa Berhasil Dikirim
              </CardTitle>
              <CardDescription className="text-white/80">
                Terima kasih telah mengajukan aplikasi beasiswa
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
                  <CheckCircle className="h-12 w-12 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Pengajuan Beasiswa Berhasil!</h2>
                <p className="text-gray-600 mb-6 max-w-md">
                  Aplikasi beasiswa Anda telah berhasil dikirim. Tim kami akan meninjau aplikasi Anda dan akan
                  menghubungi Anda melalui email atau nomor telepon yang telah Anda berikan.
                </p>
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 mb-6 w-full max-w-md">
                  <div className="flex items-start">
                    <FileText className="h-5 w-5 text-emerald-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-emerald-800 mb-1">Informasi Penting</h3>
                      <p className="text-sm text-emerald-700">
                        Proses seleksi akan memakan waktu sekitar 2-3 minggu. Anda dapat memeriksa status aplikasi Anda
                        di halaman "Aplikasi Saya".
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/dashboard/mahasiswa/mengajukan">
                    <Button
                      variant="outline"
                      className="bg-white border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl w-full"
                    >
                      Lihat Status Aplikasi
                    </Button>
                  </Link>
                  <Link href="/dashboard/beasiswa">
                    <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 w-full">
                      Jelajahi Beasiswa Lainnya
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
