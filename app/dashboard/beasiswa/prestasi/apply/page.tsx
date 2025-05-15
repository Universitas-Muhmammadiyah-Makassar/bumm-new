"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"
import {
  Award,
  ArrowLeft,
  FileText,
  Upload,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Save,
  Send,
  Plus,
  Trash2,
} from "lucide-react"

// Define the subject type
interface Subject {
  id: string
  name: string
  grade: string
}

// Define the semester type
interface Semester {
  id: string
  name: string
  subjects: Subject[]
}

export default function BeasiswaPrestasiApply() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("personal")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // State for academic data
  const [school, setSchool] = useState("")
  const [schoolAddress, setSchoolAddress] = useState("")
  const [graduationYear, setGraduationYear] = useState("")
  const [majorStudy, setMajorStudy] = useState("")

  // State for semesters and subjects
  const [semesters, setSemesters] = useState<Semester[]>([
    {
      id: "1",
      name: "Semester 1",
      subjects: [
        { id: "1-1", name: "Matematika", grade: "" },
        { id: "1-2", name: "Bahasa Indonesia", grade: "" },
        { id: "1-3", name: "Bahasa Inggris", grade: "" },
      ],
    },
    {
      id: "2",
      name: "Semester 2",
      subjects: [
        { id: "2-1", name: "Matematika", grade: "" },
        { id: "2-2", name: "Bahasa Indonesia", grade: "" },
        { id: "2-3", name: "Bahasa Inggris", grade: "" },
      ],
    },
  ])

  // Calculate average grade
  const calculateAverage = () => {
    let totalGrade = 0
    let totalSubjects = 0

    semesters.forEach((semester) => {
      semester.subjects.forEach((subject) => {
        if (subject.grade) {
          totalGrade += Number.parseFloat(subject.grade)
          totalSubjects++
        }
      })
    })

    if (totalSubjects === 0) return 0
    return (totalGrade / totalSubjects).toFixed(2)
  }

  // Add new semester
  const addSemester = () => {
    const newId = (semesters.length + 1).toString()
    setSemesters([
      ...semesters,
      {
        id: newId,
        name: `Semester ${newId}`,
        subjects: [
          { id: `${newId}-1`, name: "Matematika", grade: "" },
          { id: `${newId}-2`, name: "Bahasa Indonesia", grade: "" },
          { id: `${newId}-3`, name: "Bahasa Inggris", grade: "" },
        ],
      },
    ])
  }

  // Remove semester
  const removeSemester = (semesterId: string) => {
    setSemesters(semesters.filter((semester) => semester.id !== semesterId))
  }

  // Add subject to semester
  const addSubject = (semesterId: string) => {
    setSemesters(
      semesters.map((semester) => {
        if (semester.id === semesterId) {
          const newSubjectId = `${semesterId}-${semester.subjects.length + 1}`
          return {
            ...semester,
            subjects: [...semester.subjects, { id: newSubjectId, name: "", grade: "" }],
          }
        }
        return semester
      }),
    )
  }

  // Remove subject from semester
  const removeSubject = (semesterId: string, subjectId: string) => {
    setSemesters(
      semesters.map((semester) => {
        if (semester.id === semesterId) {
          return {
            ...semester,
            subjects: semester.subjects.filter((subject) => subject.id !== subjectId),
          }
        }
        return semester
      }),
    )
  }

  // Update subject name
  const updateSubjectName = (semesterId: string, subjectId: string, name: string) => {
    setSemesters(
      semesters.map((semester) => {
        if (semester.id === semesterId) {
          return {
            ...semester,
            subjects: semester.subjects.map((subject) => {
              if (subject.id === subjectId) {
                return { ...subject, name }
              }
              return subject
            }),
          }
        }
        return semester
      }),
    )
  }

  // Update subject grade
  const updateSubjectGrade = (semesterId: string, subjectId: string, grade: string) => {
    // Only allow numbers between 0-100
    if (grade && (isNaN(Number(grade)) || Number(grade) < 0 || Number(grade) > 100)) {
      return
    }

    setSemesters(
      semesters.map((semester) => {
        if (semester.id === semesterId) {
          return {
            ...semester,
            subjects: semester.subjects.map((subject) => {
              if (subject.id === subjectId) {
                return { ...subject, grade }
              }
              return subject
            }),
          }
        }
        return semester
      }),
    )
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/dashboard/mahasiswa/aplikasi/detail")
    }, 2000)
  }

  // Navigate to next tab
  const nextTab = () => {
    if (activeTab === "personal") setActiveTab("academic")
    else if (activeTab === "academic") setActiveTab("grades")
    else if (activeTab === "grades") setActiveTab("documents")
  }

  // Navigate to previous tab
  const prevTab = () => {
    if (activeTab === "documents") setActiveTab("grades")
    else if (activeTab === "grades") setActiveTab("academic")
    else if (activeTab === "academic") setActiveTab("personal")
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-amber-50/30 page-transition">
      <Navbar userRole="mahasiswa" />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid gap-8">
          {/* Back Button */}
          <div className="mb-2">
            <Link
              href="/dashboard/beasiswa/prestasi"
              className="inline-flex items-center text-amber-600 hover:text-amber-700 transition-colors group text-sm sm:text-base"
            >
              <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Kembali ke Beasiswa Prestasi
            </Link>
          </div>

          {/* Header Section */}
          <section>
            <div className="bg-white rounded-3xl shadow-soft overflow-hidden card-hover">
              <div className="h-16 bg-gradient-to-r from-secondary to-amber-300 relative">
                <div className="absolute inset-0 bg-[url('/abstract-wave-pattern.png')] opacity-20 mix-blend-overlay"></div>
              </div>
              <div className="p-6 sm:p-8 -mt-6 relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-secondary to-amber-300 flex items-center justify-center mr-4 shadow-lg">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-xl sm:text-2xl font-bold">Pendaftaran Beasiswa Prestasi Akademik</h1>
                      <p className="text-sm text-gray-600">
                        Lengkapi formulir berikut untuk mendaftar beasiswa prestasi
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Application Form */}
          <section>
            <Card className="shadow-soft rounded-3xl border-none overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-secondary to-amber-300 p-5 relative">
                <div className="absolute inset-0 bg-[url('/abstract-wave-pattern.png')] opacity-20 mix-blend-overlay"></div>
                <CardTitle className="flex items-center text-white">
                  <FileText className="h-5 w-5 mr-2" />
                  Formulir Pendaftaran
                </CardTitle>
                <CardDescription className="text-white/80">
                  Lengkapi semua informasi yang diperlukan dengan benar
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit}>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-amber-800 mb-1">Perhatian</h3>
                        <p className="text-sm text-amber-700">
                          Pastikan semua data yang Anda masukkan sudah benar dan sesuai dengan dokumen asli. Data nilai
                          akademik akan diverifikasi dengan pihak sekolah.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-4 p-1 bg-gray-100 rounded-xl mb-6">
                      <TabsTrigger
                        value="personal"
                        className="rounded-lg data-[state=active]:bg-amber-500 data-[state=active]:text-white text-sm py-2 transition-all duration-300"
                      >
                        Data Pribadi
                      </TabsTrigger>
                      <TabsTrigger
                        value="academic"
                        className="rounded-lg data-[state=active]:bg-amber-500 data-[state=active]:text-white text-sm py-2 transition-all duration-300"
                      >
                        Data Akademik
                      </TabsTrigger>
                      <TabsTrigger
                        value="grades"
                        className="rounded-lg data-[state=active]:bg-amber-500 data-[state=active]:text-white text-sm py-2 transition-all duration-300"
                      >
                        Nilai Rapor
                      </TabsTrigger>
                      <TabsTrigger
                        value="documents"
                        className="rounded-lg data-[state=active]:bg-amber-500 data-[state=active]:text-white text-sm py-2 transition-all duration-300"
                      >
                        Dokumen
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="personal" className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium flex items-center">
                          <span className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center mr-3 text-white">
                            1
                          </span>
                          Data Pribadi
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="nama" className="text-sm font-medium">
                              Nama Lengkap
                            </Label>
                            <Input
                              id="nama"
                              placeholder="Masukkan nama lengkap"
                              className="rounded-xl border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="nim" className="text-sm font-medium">
                              NIM
                            </Label>
                            <Input
                              id="nim"
                              placeholder="Masukkan NIM"
                              className="rounded-xl border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">
                              Email
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="Masukkan email"
                              className="rounded-xl border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone" className="text-sm font-medium">
                              Nomor Telepon
                            </Label>
                            <Input
                              id="phone"
                              placeholder="Masukkan nomor telepon"
                              className="rounded-xl border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="fakultas" className="text-sm font-medium">
                              Fakultas
                            </Label>
                            <Select required>
                              <SelectTrigger id="fakultas" className="rounded-xl border-gray-300">
                                <SelectValue placeholder="Pilih fakultas" />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl">
                                <SelectItem value="teknik">Teknik</SelectItem>
                                <SelectItem value="ekonomi">Ekonomi</SelectItem>
                                <SelectItem value="kedokteran">Kedokteran</SelectItem>
                                <SelectItem value="hukum">Hukum</SelectItem>
                                <SelectItem value="fisip">FISIP</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="prodi" className="text-sm font-medium">
                              Program Studi
                            </Label>
                            <Select required>
                              <SelectTrigger id="prodi" className="rounded-xl border-gray-300">
                                <SelectValue placeholder="Pilih program studi" />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl">
                                <SelectItem value="informatika">Teknik Informatika</SelectItem>
                                <SelectItem value="sipil">Teknik Sipil</SelectItem>
                                <SelectItem value="elektro">Teknik Elektro</SelectItem>
                                <SelectItem value="mesin">Teknik Mesin</SelectItem>
                                <SelectItem value="industri">Teknik Industri</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="semester" className="text-sm font-medium">
                              Semester
                            </Label>
                            <Select required>
                              <SelectTrigger id="semester" className="rounded-xl border-gray-300">
                                <SelectValue placeholder="Pilih semester" />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl">
                                <SelectItem value="1">Semester 1</SelectItem>
                                <SelectItem value="2">Semester 2</SelectItem>
                                <SelectItem value="3">Semester 3</SelectItem>
                                <SelectItem value="4">Semester 4</SelectItem>
                                <SelectItem value="5">Semester 5</SelectItem>
                                <SelectItem value="6">Semester 6</SelectItem>
                                <SelectItem value="7">Semester 7</SelectItem>
                                <SelectItem value="8">Semester 8</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="ipk" className="text-sm font-medium">
                              IPK
                            </Label>
                            <Input
                              id="ipk"
                              type="number"
                              step="0.01"
                              min="0"
                              max="4"
                              placeholder="Masukkan IPK"
                              className="rounded-xl border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end pt-4">
                        <Button
                          type="button"
                          onClick={nextTab}
                          className="bg-gradient-to-r from-secondary to-amber-300 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 px-6 py-2 h-auto text-base"
                        >
                          Selanjutnya
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="academic" className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium flex items-center">
                          <span className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center mr-3 text-white">
                            2
                          </span>
                          Data Akademik Sekolah
                        </h3>

                        <div className="space-y-2">
                          <Label htmlFor="school" className="text-sm font-medium">
                            Nama Sekolah Asal
                          </Label>
                          <Input
                            id="school"
                            value={school}
                            onChange={(e) => setSchool(e.target.value)}
                            placeholder="Masukkan nama sekolah asal"
                            className="rounded-xl border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="schoolAddress" className="text-sm font-medium">
                            Alamat Sekolah
                          </Label>
                          <Textarea
                            id="schoolAddress"
                            value={schoolAddress}
                            onChange={(e) => setSchoolAddress(e.target.value)}
                            placeholder="Masukkan alamat sekolah"
                            className="rounded-xl border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="graduationYear" className="text-sm font-medium">
                              Tahun Kelulusan
                            </Label>
                            <Select value={graduationYear} onValueChange={setGraduationYear} required>
                              <SelectTrigger id="graduationYear" className="rounded-xl border-gray-300">
                                <SelectValue placeholder="Pilih tahun kelulusan" />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl">
                                <SelectItem value="2025">2025</SelectItem>
                                <SelectItem value="2024">2024</SelectItem>
                                <SelectItem value="2023">2023</SelectItem>
                                <SelectItem value="2022">2022</SelectItem>
                                <SelectItem value="2021">2021</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="majorStudy" className="text-sm font-medium">
                              Jurusan
                            </Label>
                            <Select value={majorStudy} onValueChange={setMajorStudy} required>
                              <SelectTrigger id="majorStudy" className="rounded-xl border-gray-300">
                                <SelectValue placeholder="Pilih jurusan" />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl">
                                <SelectItem value="ipa">IPA</SelectItem>
                                <SelectItem value="ips">IPS</SelectItem>
                                <SelectItem value="bahasa">Bahasa</SelectItem>
                                <SelectItem value="agama">Agama</SelectItem>
                                <SelectItem value="teknik">Teknik</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between pt-4">
                        <Button
                          type="button"
                          onClick={prevTab}
                          variant="outline"
                          className="border-amber-300 text-amber-600 rounded-xl hover:bg-amber-50 transition-all duration-300 px-6 py-2 h-auto text-base"
                        >
                          <ChevronLeft className="mr-2 h-4 w-4" />
                          Sebelumnya
                        </Button>
                        <Button
                          type="button"
                          onClick={nextTab}
                          className="bg-gradient-to-r from-secondary to-amber-300 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 px-6 py-2 h-auto text-base"
                        >
                          Selanjutnya
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="grades" className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium flex items-center">
                          <span className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center mr-3 text-white">
                            3
                          </span>
                          Data Nilai Rapor
                        </h3>

                        <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 mb-6">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-amber-800">Nilai Rata-Rata: {calculateAverage()}</h4>
                            <Button
                              type="button"
                              onClick={addSemester}
                              variant="outline"
                              size="sm"
                              className="text-amber-600 border-amber-300 hover:bg-amber-100 rounded-lg"
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Tambah Semester
                            </Button>
                          </div>
                          <p className="text-sm text-amber-700">
                            Masukkan nilai rapor untuk setiap mata pelajaran. Nilai harus dalam skala 0-100.
                          </p>
                        </div>

                        {semesters.map((semester) => (
                          <div key={semester.id} className="border border-gray-200 rounded-xl p-4 mb-4">
                            <div className="flex justify-between items-center mb-4">
                              <h4 className="font-medium text-lg">{semester.name}</h4>
                              {semesters.length > 1 && (
                                <Button
                                  type="button"
                                  onClick={() => removeSemester(semester.id)}
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600 border-red-200 hover:bg-red-50 rounded-lg"
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Hapus
                                </Button>
                              )}
                            </div>

                            <div className="space-y-3">
                              {semester.subjects.map((subject) => (
                                <div key={subject.id} className="grid grid-cols-12 gap-2 items-center">
                                  <div className="col-span-6 sm:col-span-7">
                                    <Input
                                      value={subject.name}
                                      onChange={(e) => updateSubjectName(semester.id, subject.id, e.target.value)}
                                      placeholder="Nama Mata Pelajaran"
                                      className="rounded-xl border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                                      required
                                    />
                                  </div>
                                  <div className="col-span-4 sm:col-span-3">
                                    <Input
                                      value={subject.grade}
                                      onChange={(e) => updateSubjectGrade(semester.id, subject.id, e.target.value)}
                                      placeholder="Nilai"
                                      className="rounded-xl border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                                      required
                                    />
                                  </div>
                                  <div className="col-span-2">
                                    <Button
                                      type="button"
                                      onClick={() => removeSubject(semester.id, subject.id)}
                                      variant="outline"
                                      size="icon"
                                      className="h-10 w-10 rounded-xl border-red-200 text-red-500 hover:bg-red-50"
                                      disabled={semester.subjects.length <= 1}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <Button
                              type="button"
                              onClick={() => addSubject(semester.id)}
                              variant="outline"
                              size="sm"
                              className="mt-3 text-amber-600 border-amber-300 hover:bg-amber-50 rounded-lg"
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Tambah Mata Pelajaran
                            </Button>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between pt-4">
                        <Button
                          type="button"
                          onClick={prevTab}
                          variant="outline"
                          className="border-amber-300 text-amber-600 rounded-xl hover:bg-amber-50 transition-all duration-300 px-6 py-2 h-auto text-base"
                        >
                          <ChevronLeft className="mr-2 h-4 w-4" />
                          Sebelumnya
                        </Button>
                        <Button
                          type="button"
                          onClick={nextTab}
                          className="bg-gradient-to-r from-secondary to-amber-300 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 px-6 py-2 h-auto text-base"
                        >
                          Selanjutnya
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="documents" className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium flex items-center">
                          <span className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center mr-3 text-white">
                            4
                          </span>
                          Unggah Dokumen
                        </h3>

                        <p className="text-sm text-gray-500">
                          Unggah dokumen yang diperlukan dalam format PDF (maks. 2MB per file)
                        </p>

                        <div className="space-y-4">
                          <div className="space-y-2 bg-gray-50 p-4 rounded-xl">
                            <Label htmlFor="dokumen-rapor" className="text-sm font-medium flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-gray-500" />
                              Scan Rapor Sekolah
                            </Label>
                            <div className="flex items-center gap-2">
                              <Input
                                id="dokumen-rapor"
                                type="file"
                                accept=".pdf"
                                className="flex-1 rounded-xl border-gray-300 bg-white text-sm"
                                required
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="rounded-xl hover:bg-amber-500 hover:text-white transition-colors"
                              >
                                <Upload className="h-4 w-4" />
                              </Button>
                            </div>
                            <p className="text-xs text-gray-500">Format PDF, maksimal 2MB</p>
                          </div>

                          <div className="space-y-2 bg-gray-50 p-4 rounded-xl">
                            <Label htmlFor="dokumen-ijazah" className="text-sm font-medium flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-gray-500" />
                              Scan Ijazah/Surat Keterangan Lulus
                            </Label>
                            <div className="flex items-center gap-2">
                              <Input
                                id="dokumen-ijazah"
                                type="file"
                                accept=".pdf"
                                className="flex-1 rounded-xl border-gray-300 bg-white text-sm"
                                required
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="rounded-xl hover:bg-amber-500 hover:text-white transition-colors"
                              >
                                <Upload className="h-4 w-4" />
                              </Button>
                            </div>
                            <p className="text-xs text-gray-500">Format PDF, maksimal 2MB</p>
                          </div>

                          <div className="space-y-2 bg-gray-50 p-4 rounded-xl">
                            <Label htmlFor="dokumen-prestasi" className="text-sm font-medium flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-gray-500" />
                              Scan Sertifikat Prestasi Akademik
                            </Label>
                            <div className="flex items-center gap-2">
                              <Input
                                id="dokumen-prestasi"
                                type="file"
                                accept=".pdf"
                                className="flex-1 rounded-xl border-gray-300 bg-white text-sm"
                                required
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="rounded-xl hover:bg-amber-500 hover:text-white transition-colors"
                              >
                                <Upload className="h-4 w-4" />
                              </Button>
                            </div>
                            <p className="text-xs text-gray-500">Format PDF, maksimal 2MB</p>
                          </div>

                          <div className="space-y-2 bg-gray-50 p-4 rounded-xl">
                            <Label htmlFor="dokumen-ktm" className="text-sm font-medium flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-gray-500" />
                              Scan KTM (Kartu Tanda Mahasiswa)
                            </Label>
                            <div className="flex items-center gap-2">
                              <Input
                                id="dokumen-ktm"
                                type="file"
                                accept=".pdf"
                                className="flex-1 rounded-xl border-gray-300 bg-white text-sm"
                                required
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="rounded-xl hover:bg-amber-500 hover:text-white transition-colors"
                              >
                                <Upload className="h-4 w-4" />
                              </Button>
                            </div>
                            <p className="text-xs text-gray-500">Format PDF, maksimal 2MB</p>
                          </div>
                        </div>

                        <div className="space-y-4 pt-4">
                          <div className="flex items-start p-4 bg-gray-50 rounded-xl">
                            <input type="checkbox" id="agreement" className="mt-1 mr-3" required />
                            <Label htmlFor="agreement" className="text-sm text-gray-700">
                              Saya menyatakan bahwa semua informasi dan dokumen yang saya berikan adalah benar dan saya
                              bersedia menerima konsekuensi jika terdapat ketidaksesuaian dengan data asli.
                            </Label>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between pt-4">
                        <Button
                          type="button"
                          onClick={prevTab}
                          variant="outline"
                          className="border-amber-300 text-amber-600 rounded-xl hover:bg-amber-50 transition-all duration-300 px-6 py-2 h-auto text-base"
                        >
                          <ChevronLeft className="mr-2 h-4 w-4" />
                          Sebelumnya
                        </Button>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            className="border-amber-300 text-amber-600 rounded-xl hover:bg-amber-50 transition-all duration-300 px-6 py-2 h-auto text-base"
                          >
                            <Save className="mr-2 h-5 w-5" />
                            Simpan Draft
                          </Button>
                          <Button
                            type="submit"
                            className="bg-gradient-to-r from-secondary to-amber-300 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 px-8 py-2.5 h-auto text-base"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <svg
                                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Memproses...
                              </>
                            ) : (
                              <>
                                <Send className="mr-2 h-5 w-5" />
                                Kirim Aplikasi
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </form>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  )
}
