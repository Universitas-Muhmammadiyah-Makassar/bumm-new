"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, BookOpen, Award, Bookmark, Users } from "lucide-react"
import Link from "next/link"

export default function BeasiswaMahasiswaPage() {
  const [activeTab, setActiveTab] = useState("prestasi")

  const scholarshipCategories = [
    {
      id: "prestasi",
      name: "Prestasi Akademik",
      icon: <BookOpen className="h-5 w-5" />,
      color: "bg-blue-100 text-blue-800",
      description: "Beasiswa untuk siswa dengan prestasi akademik tinggi",
      subcategories: [
        {
          name: "KATEGORI 1 (33 Orang)",
          description:
            "Beasiswa Uang Kuliah 100% selama 8 semester bagi siswa yang memiliki Nilai Rapor (Pengetahuan) Semester 1-5 dengan Rata-Rata minimal 95",
          color: "bg-blue-600",
        },
        {
          name: "KATEGORI 2 (347 Orang)",
          description:
            "Beasiswa Uang Kuliah 75% selama 8 semester bagi siswa yang memiliki Nilai Rapor (Pengetahuan) Semester 1-5 dengan Rata-Rata minimal 90",
          color: "bg-blue-500",
        },
        {
          name: "KATEGORI 3 (292 Orang)",
          description:
            "Beasiswa Uang Kuliah 50% selama 8 semester bagi siswa yang memiliki Nilai Rapor (Pengetahuan) Semester 1-5 dengan Rata-Rata minimal 85",
          color: "bg-blue-400",
        },
        {
          name: "KATEGORI 4 (194 Orang)",
          description:
            "Beasiswa Uang Kuliah 25% selama 8 semester bagi siswa yang memiliki Nilai Rapor (Pengetahuan) Semester 1-5 dengan Rata-Rata minimal 80",
          color: "bg-blue-300",
        },
      ],
    },
    {
      id: "hafidz",
      name: "Hafidz Qur'an",
      icon: <BookOpen className="h-5 w-5" />,
      color: "bg-green-100 text-green-800",
      description: "Beasiswa untuk siswa dengan hafalan Al-Qur'an",
      subcategories: [
        {
          name: "KATEGORI 1 (50 Orang)",
          description: "Beasiswa 100% Uang Kuliah selama 8 semester bagi siswa Hafidz Qur'an 30 Juz Mutqin",
          color: "bg-green-600",
        },
        {
          name: "KATEGORI 2 (50 Orang)",
          description: "Beasiswa Uang Kuliah 75% selama 8 semester bagi siswa Hafidz Qur'an minimal 20 Juz Mutqin",
          color: "bg-green-500",
        },
        {
          name: "KATEGORI 3 (50 Orang)",
          description: "Beasiswa Uang Kuliah 50% selama 8 semester bagi siswa Hafidz Qur'an minimal 15 Juz Mutqin",
          color: "bg-green-400",
        },
        {
          name: "KATEGORI 4 (150 Orang)",
          description: "Beasiswa Uang Kuliah 25% selama 8 semester bagi siswa Hafidz Qur'an minimal 5 Juz Mutqin",
          color: "bg-green-300",
        },
      ],
    },
    {
      id: "prestasi-non",
      name: "Prestasi Non-Akademik",
      icon: <Award className="h-5 w-5" />,
      color: "bg-purple-100 text-purple-800",
      description: "Beasiswa untuk siswa dengan prestasi non-akademik",
      subcategories: [
        {
          name: "Tingkat Internasional",
          description: "Beasiswa 100% untuk pemenang kompetisi tingkat internasional",
          color: "bg-purple-600",
        },
        {
          name: "Tingkat Nasional",
          description: "Beasiswa 75% untuk pemenang kompetisi tingkat nasional",
          color: "bg-purple-500",
        },
        {
          name: "Tingkat Provinsi",
          description: "Beasiswa 50% untuk pemenang kompetisi tingkat provinsi",
          color: "bg-purple-400",
        },
      ],
    },
    {
      id: "kerjasama",
      name: "Kerjasama",
      icon: <Users className="h-5 w-5" />,
      color: "bg-amber-100 text-amber-800",
      description: "Beasiswa kerjasama dengan institusi mitra",
      subcategories: [
        {
          name: "Kerjasama Pemerintah",
          description: "Beasiswa kerjasama dengan instansi pemerintah",
          color: "bg-amber-600",
        },
        {
          name: "Kerjasama Swasta",
          description: "Beasiswa kerjasama dengan perusahaan swasta",
          color: "bg-amber-500",
        },
      ],
    },
    {
      id: "khusus",
      name: "Program Khusus",
      icon: <Bookmark className="h-5 w-5" />,
      color: "bg-rose-100 text-rose-800",
      description: "Beasiswa untuk program studi khusus",
      subcategories: [
        {
          name: "Kedokteran",
          description: "Beasiswa khusus untuk program studi kedokteran",
          color: "bg-rose-600",
        },
        {
          name: "Teknik",
          description: "Beasiswa khusus untuk program studi teknik",
          color: "bg-rose-500",
        },
      ],
    },
  ]

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Beasiswa</h1>
        <p className="text-muted-foreground">Pilih dan ajukan beasiswa sesuai dengan kriteria yang kamu miliki</p>
      </div>

      <Tabs defaultValue="prestasi" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-8">
          {scholarshipCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="text-sm">
              <div className="flex items-center space-x-2">
                {category.icon}
                <span>{category.name}</span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {scholarshipCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {category.subcategories.map((subcategory, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className={`${subcategory.color} text-white`}>
                    <CardTitle>{subcategory.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="mb-4">{subcategory.description}</p>
                    <div className="flex justify-end">
                      <Link href="/dashboard/mahasiswa/mengajukan/pilih">
                        <Button>Ajukan Beasiswa</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {activeTab === "prestasi" && (
              <Card className="bg-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Persyaratan Khusus
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Berlaku bagi Program Studi non-Kedokteran;</li>
                    <li>KTP/KK, Ijazah SMA/SMK/MA atau Surat Keterangan Lulus (SKL);</li>
                    <li>Rapor Semester 1 sampai dengan 5;</li>
                    <li>
                      Menandatangani Surat Perjanjian untuk mempertahankan Indeks Prestasi Semester (IPS 3,0) dan surat
                      pernyataan siap untuk mengikuti pembinaan selama masa studi serta Surat Pernyataan tidak sedang
                      menerima beasiswa/bantuan biaya pendidikan lain dari sumber APBD/Beasiswa lainnya (bermaterai
                      10.000);
                    </li>
                    <li>Melampirkan Sertifikat Prestasi (jika ada);</li>
                    <li>Merupakan lulusan sekolah tahun 2025;</li>
                    <li>Mengikuti Tes Wawancara.</li>
                  </ol>
                </CardContent>
              </Card>
            )}

            {activeTab === "hafidz" && (
              <Card className="bg-green-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Persyaratan Khusus
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>
                      Memiliki Hafalan Al-Qur'an 30, 20, 15, atau 5 Juz, dibuktikan dengan Scan Sertifikat, Syahadah,
                      Ijazah atau Surat Keterangan dari Pesantren, Madrasah atau Lembaga Tahfiz Al-Qur'an yang asli;
                    </li>
                    <li>KTP/KK, Ijazah SMA/SMK/MA atau Surat Keterangan Lulus (SKL);</li>
                    <li>
                      Mengikuti Seleksi Hafalan Qur'an pada Panitia Seleksi Beasiswa Hafidz Qur'an Universitas
                      Muhammadiyah Makassar;
                    </li>
                    <li>
                      Khusus Program Studi Pendidikan Dokter Wajib melampirkan bukti kelulusan hasil seleksi UPT-PMB
                      Universitas Muhammadiyah Makassar;
                    </li>
                    <li>
                      Menandatangani Surat Perjanjian untuk mempertahankan Indeks Prestasi Semester (IPS 3,0) dan surat
                      Pernyataan siap untuk mengikuti pembinaan selama masa studi serta Surat Pernyataan tidak sedang
                      menerima beasiswa/bantuan biaya pendidikan lain dari sumber APBD/Beasiswa lainnya (bermaterai
                      10.000);
                    </li>
                    <li>Melampirkan Sertifikat Prestasi (jika ada);</li>
                    <li>Mengikuti Tes Wawancara.</li>
                  </ol>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
