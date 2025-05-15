import Link from "next/link"
import { Button } from "@/components/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/ui/card"
import { Calendar, AlertCircle } from "lucide-react"
import type { ReactNode } from "react"

interface BeasiswaCardProps {
  id: number
  nama: string
  icon: ReactNode
  deadline: string
  kuota: number
  status: "Dibuka" | "Segera Dibuka" | "Ditutup"
  gradientClass: string
  textColorClass: string
  bgClass: string
  hasApplied?: boolean
  userRole: "student" | "admin"
}

export function BeasiswaCard({
  id,
  nama,
  icon,
  deadline,
  kuota,
  status,
  gradientClass,
  textColorClass,
  bgClass,
  hasApplied = false,
  userRole,
}: BeasiswaCardProps) {
  const basePath = userRole === "student" ? "/student" : "/admin"

  return (
    <Card
      className={`overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl border-none ${bgClass} group`}
    >
      <div className={`h-3 bg-gradient-to-r ${gradientClass}`}></div>
      <CardHeader className="pb-2 pt-6 px-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div
              className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradientClass} flex items-center justify-center mr-3 shadow-md group-hover:scale-110 transition-transform duration-300`}
            >
              <div className="text-white">{icon}</div>
            </div>
            <CardTitle className="text-lg">{nama}</CardTitle>
          </div>
          <div>
            <span
              className={`badge-pill inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                status === "Dibuka"
                  ? "bg-emerald-100 text-emerald-800"
                  : status === "Segera Dibuka"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-red-100 text-red-800"
              }`}
            >
              {status}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-2 text-sm mb-5">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-slate-500 mr-2 flex-shrink-0" />
            <span className="text-slate-600 truncate">Deadline: {deadline}</span>
          </div>
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 text-slate-500 mr-2 flex-shrink-0" />
            <span className="text-slate-600 truncate">Kuota: {kuota}</span>
          </div>
        </div>

        {userRole === "student" ? (
          status === "Dibuka" ? (
            hasApplied ? (
              <Button
                className="w-full bg-slate-200 text-slate-600 rounded-xl cursor-not-allowed text-sm sm:text-base py-2 h-auto"
                disabled
              >
                Sudah Terdaftar
              </Button>
            ) : (
              <Link href={`${basePath}/beasiswa/${id}`} className="block w-full">
                <Button
                  className={`w-full bg-gradient-to-r ${gradientClass} text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow text-sm sm:text-base py-2 h-auto`}
                >
                  Daftar Sekarang
                </Button>
              </Link>
            )
          ) : (
            <Link href={`${basePath}/beasiswa/${id}`} className="block w-full">
              <Button
                className={`w-full bg-gradient-to-r ${gradientClass} text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow text-sm sm:text-base py-2 h-auto`}
              >
                Lihat Detail
              </Button>
            </Link>
          )
        ) : (
          <div className="flex gap-2">
            <Link href={`${basePath}/beasiswa/${id}`} className="block flex-1">
              <Button
                className={`w-full bg-gradient-to-r ${gradientClass} text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow text-sm sm:text-base py-2 h-auto`}
              >
                Detail
              </Button>
            </Link>
            <Link href={`${basePath}/beasiswa/${id}/edit`} className="block">
              <Button
                variant="outline"
                className={`${textColorClass} border-current rounded-xl text-sm sm:text-base py-2 h-auto`}
              >
                Edit
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
