export interface User {
  id: string
  name: string
  role: "student" | "admin"
  nim?: string
  fakultas?: string
  prodi?: string
  semester?: number
}

export interface Beasiswa {
  id: number
  nama: string
  deskripsi: string
  deadline: string
  kuota: number
  status: "Dibuka" | "Segera Dibuka" | "Ditutup"
  persyaratan: string[]
  benefit: string
  bgGradient: string
  textColor: string
}

export interface Aplikasi {
  id: number
  beasiswaId: number
  namaBeasiswa: string
  tanggalApply: string
  status: "Diterima" | "Dalam Proses" | "Ditolak"
  dokumen: string[]
}
