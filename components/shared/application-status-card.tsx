import Link from "next/link"
import { Button } from "@/components/shared/ui/button"
import type { ReactNode } from "react"

interface ApplicationStatusCardProps {
  id: number
  nama: string
  tanggalApply: string
  status: "Diterima" | "Dalam Proses" | "Ditolak"
  statusIcon: ReactNode
  statusClass: string
  userRole: "student" | "admin"
}

export function ApplicationStatusCard({
  id,
  nama,
  tanggalApply,
  status,
  statusIcon,
  statusClass,
  userRole,
}: ApplicationStatusCardProps) {
  const basePath = userRole === "student" ? "/student" : "/admin"

  return (
    <div className={`p-4 rounded-xl bg-white border border-slate-100 shadow-sm`}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium">{nama}</h3>
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusClass}`}>
          {statusIcon}
          <span className="ml-1">{status}</span>
        </span>
      </div>
      <p className="text-sm text-slate-600 mb-3">Tanggal: {tanggalApply}</p>
      <div className="flex justify-end">
        <Link href={`${basePath}/aplikasi/${id}`}>
          <Button
            variant="outline"
            size="sm"
            className={
              userRole === "student"
                ? "text-amber-600 border-amber-200 hover:bg-amber-50 hover:text-amber-700 rounded-xl text-xs py-1 h-8"
                : "text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 rounded-xl text-xs py-1 h-8"
            }
          >
            Detail
          </Button>
        </Link>
      </div>
    </div>
  )
}
