"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  ArrowLeft,
  Award,
  CheckCircle,
  FileText,
  Plus,
  Trash2,
  Upload,
  Download,
  User,
  Sparkles,
  BookMarked,
  Users,
  Info,
  ChevronRight,
  ChevronLeft,
  BarChart3,
  Save,
  AlertTriangle,
  Clock,
} from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { type SchoolData, calculateAverageGrade } from "@/lib/models/grade"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { saveToStorage, loadFromStorage, clearStorage } from "@/lib/storage"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "@/components/ui/use-toast"

// Storage keys
const FORM_STORAGE_KEY = "scholarship-form-data"
const SCHOOL_DATA_STORAGE_KEY = "scholarship-school-data"
const ACTIVE_STEP_STORAGE_KEY = "scholarship-active-step"

// Mock user data (in a real app, this would come from an API or auth context)
const mockUserData = {
  fullName: "Ahmad Fauzi",
  nim: "20220123456",
  faculty: "Fakultas Teknik",
  major: "Teknik Informatika",
  semester: "4",
  email: "ahmad.fauzi@student.unismuh.ac.id",
  phone: "081234567890",
  address: "Jl. Sultan Alauddin No. 259, Makassar, Sulawesi Selatan",
}

// Define common subjects by high school major
const commonSubjects = {
  IPA: [
    "Matematika",
    "Fisika",
    "Kimia",
    "Biologi",
    "Bahasa Indonesia",
    "Bahasa Inggris",
    "Pendidikan Agama",
    "Pendidikan Kewarganegaraan",
  ],
  IPS: [
    "Matematika",
    "Ekonomi",
    "Sosiologi",
    "Geografi",
    "Sejarah",
    "Bahasa Indonesia",
    "Bahasa Inggris",
    "Pendidikan Agama",
  ],
  Bahasa: [
    "Bahasa Indonesia",
    "Bahasa Inggris",
    "Bahasa Asing Lainnya",
    "Sastra Indonesia",
    "Antropologi",
    "Matematika",
    "Pendidikan Agama",
    "Pendidikan Kewarganegaraan",
  ],
  default: [
    "Matematika",
    "Fisika",
    "Kimia",
    "Biologi",
    "Bahasa Indonesia",
    "Bahasa Inggris",
    "Pendidikan Agama",
    "Pendidikan Kewarganegaraan",
  ],
}

// Define scholarship types
const scholarshipTypes = [
  {
    id: "prestasi-akademik",
    name: "Beasiswa Prestasi Akademik",
    icon: <Sparkles className="h-5 w-5" />,
    description: "Beasiswa untuk mahasiswa dengan prestasi akademik yang tinggi",
    deadline: "15 Juli 2025",
    gradientClass: "from-blue-500 to-cyan-400",
    bgClass: "bg-blue-50",
    minGrade: 85,
    selectable: true,
  },
  {
    id: "hafidz-quran",
    name: "Beasiswa Hafidz Qur'an",
    icon: <BookMarked className="h-5 w-5" />,
    description: "Beasiswa untuk mahasiswa yang memiliki kemampuan menghafal Al-Qur'an",
    deadline: "30 Juni 2025",
    gradientClass: "from-indigo-500 to-purple-500",
    bgClass: "bg-indigo-50",
    minJuz: 5,
    selectable: true,
  },
  {
    id: "bibit-unggul",
    name: "Beasiswa Bibit Unggul Persyarikatan",
    icon: <Users className="h-5 w-5" />,
    description: "Beasiswa untuk mahasiswa yang aktif dalam kegiatan persyarikatan",
    deadline: "10 Agustus 2025",
    gradientClass: "from-emerald-400 to-teal-500",
    bgClass: "bg-emerald-50",
    minYearsActive: 2,
    selectable: false,
    contactMessage:
      "Untuk pendaftaran Beasiswa Bibit Unggul Persyarikatan, Hubungi IPM yang berada di sekitar wilayah Anda.",
  },
]

// Define form schema
const formSchema = z.object({
  scholarshipType: z.string({
    required_error: "Silakan pilih jenis beasiswa",
  }),
  academicInfo: z.object({}),
  hafidzInfo: z.object({
    juzCount: z.string().optional(),
    certificationLevel: z.string().optional(),
    teacherName: z.string().optional(),
    institutionName: z.string().optional(),
  }),
  organizationInfo: z.object({
    organizationName: z.string().optional(),
    position: z.string().optional(),
    yearsActive: z.string().optional(),
    contributionDescription: z.string().optional(),
  }),
  documents: z.object({
    transcriptFile: z.string().optional(),
    idCardFile: z.string().optional(),
    photoFile: z.string().optional(),
    certificateFile: z.string().optional(),
    recommendationFile: z.string().optional(),
  }),
  statement: z.object({
    motivation: z.string().min(100, { message: "Motivasi minimal 100 karakter" }),
    agreement: z.boolean().refine((val) => val === true, {
      message: "Anda harus menyetujui pernyataan ini",
    }),
  }),
})

type FormValues = z.infer<typeof formSchema>

// Define save status type
type SaveStatus = "idle" | "saving" | "saved" | "error"

export default function ScholarshipApplicationForm() {
  const router = useRouter()

  const searchParams = useSearchParams()
  const preselectedType = searchParams.get("type")
  const preselectedSubtype = searchParams.get("subtype")

  const [activeStep, setActiveStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle")
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [schoolData, setSchoolData] = useState<SchoolData>({
    schoolName: "",
    schoolAddress: "",
    graduationYear: "",
    majorStudy: "",
    semesters: [
      {
        id: "1",
        name: "Kelas 12",
        subjects: [],
      },
    ],
  })

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      scholarshipType: "",
      academicInfo: {},
      hafidzInfo: {
        juzCount: "",
        certificationLevel: "",
        teacherName: "",
        institutionName: "",
      },
      organizationInfo: {
        organizationName: "",
        position: "",
        yearsActive: "",
        contributionDescription: "",
      },
      documents: {
        transcriptFile: "",
        idCardFile: "",
        photoFile: "",
        certificateFile: "",
        recommendationFile: "",
      },
      statement: {
        motivation: "",
        agreement: false,
      },
    },
  })

  const { watch, setValue, getValues } = form
  const scholarshipType = watch("scholarshipType")
  const formValues = watch()

  // Load saved data on initial render
  useEffect(() => {
    const loadSavedData = () => {
      try {
        // Load active step
        const savedActiveStep = loadFromStorage<number>(ACTIVE_STEP_STORAGE_KEY)
        if (savedActiveStep !== null) {
          setActiveStep(savedActiveStep)
        }

        // Load form data
        const savedFormData = loadFromStorage<FormValues>(FORM_STORAGE_KEY)
        if (savedFormData) {
          Object.keys(savedFormData).forEach((key) => {
            setValue(key as any, savedFormData[key as keyof FormValues])
          })
        }

        // Load school data
        const savedSchoolData = loadFromStorage<SchoolData>(SCHOOL_DATA_STORAGE_KEY)
        if (savedSchoolData) {
          setSchoolData(savedSchoolData)
        }

        // Show toast if data was loaded
        if (savedFormData || savedSchoolData) {
          toast({
            title: "Data berhasil dimuat",
            description: "Formulir Anda telah dipulihkan dari penyimpanan terakhir.",
            duration: 3000,
          })
        }
      } catch (error) {
        console.error("Error loading saved data:", error)
        toast({
          title: "Gagal memuat data",
          description: "Terjadi kesalahan saat memuat data tersimpan.",
          variant: "destructive",
          duration: 3000,
        })
      }
    }

    loadSavedData()
  }, [setValue])

  // If there's a preselected type, set it in the form
  useEffect(() => {
    if (preselectedType) {
      setValue("scholarshipType", preselectedType)
    }
  }, [preselectedType, setValue])

  // Initialize subjects with default subjects
  useEffect(() => {
    if (schoolData.semesters[0].subjects.length === 0) {
      setSchoolData((prev) => ({
        ...prev,
        semesters: prev.semesters.map((semester) => ({
          ...semester,
          name: `Kelas 12`,
          subjects: commonSubjects.default.map((name, idx) => ({
            id: `${semester.id}-${idx + 1}`,
            name,
            grade: "",
          })),
        })),
      }))
    }
  }, [])

  // Save form data automatically
  const saveFormData = useCallback(() => {
    try {
      setSaveStatus("saving")

      // Save form values
      const currentFormValues = getValues()
      const saveFormSuccess = saveToStorage(FORM_STORAGE_KEY, currentFormValues)

      // Save school data
      const saveSchoolSuccess = saveToStorage(SCHOOL_DATA_STORAGE_KEY, schoolData)

      // Save active step
      const saveStepSuccess = saveToStorage(ACTIVE_STEP_STORAGE_KEY, activeStep)

      if (saveFormSuccess && saveSchoolSuccess && saveStepSuccess) {
        setSaveStatus("saved")
        setLastSaved(new Date())
      } else {
        setSaveStatus("error")
      }
    } catch (error) {
      console.error("Error saving form data:", error)
      setSaveStatus("error")
    }
  }, [getValues, schoolData, activeStep])

  // Auto-save on form changes
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (formValues.scholarshipType) {
        saveFormData()
      }
    }, 30000) // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval)
  }, [formValues, schoolData, saveFormData])

  // Save on form field changes
  useEffect(() => {
    const subscription = form.watch(() => {
      setSaveStatus("idle")
    })
    return () => subscription.unsubscribe()
  }, [form])

  // Define steps
  const steps = [
    { id: 0, name: "Jenis Beasiswa" },
    { id: 1, name: "Data Khusus", dynamic: true },
    { id: 2, name: "Dokumen" },
    { id: 3, name: "Pernyataan" },
    { id: 4, name: "Konfirmasi" },
  ]

  // Get dynamic step name based on scholarship type
  const getDynamicStepName = () => {
    switch (scholarshipType) {
      case "prestasi-akademik":
        return "Data Akademik"
      case "hafidz-quran":
        return "Data Hafalan"
      case "bibit-unggul":
        return "Data Organisasi"
      default:
        return "Data Khusus"
    }
  }

  // Update step name
  steps[1].name = getDynamicStepName()

  // Handle next step
  const handleNextStep = async () => {
    const fields = getFieldsForStep(activeStep)

    // If we're on the first step and the selected scholarship is not selectable
    if (activeStep === 0 && scholarshipType) {
      const selectedScholarship = scholarshipTypes.find((s) => s.id === scholarshipType)
      if (selectedScholarship && !selectedScholarship.selectable) {
        // Show toast notification
        toast({
          title: "Informasi Pendaftaran",
          description: selectedScholarship.contactMessage,
          duration: 5000,
        })
        // Reset the selection
        setValue("scholarshipType", "")
        return
      }
    }

    const stepValid = await form.trigger(fields as any)
    if (!stepValid) return

    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1)
      window.scrollTo(0, 0)
      saveFormData() // Save when moving to next step
    }
  }

  // Handle previous step
  const handlePrevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1)
      window.scrollTo(0, 0)
      saveFormData() // Save when moving to previous step
    }
  }

  // Get fields for validation based on current step
  const getFieldsForStep = (step: number) => {
    switch (step) {
      case 0:
        return ["scholarshipType"]
      case 1:
        if (scholarshipType === "prestasi-akademik") return ["academicInfo"]
        if (scholarshipType === "hafidz-quran") return ["hafidzInfo"]
        if (scholarshipType === "bibit-unggul") return ["organizationInfo"]
        return []
      case 2:
        return ["documents"]
      case 3:
        return ["statement"]
      default:
        return []
    }
  }

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Log form data
      console.log("Form submitted:", data)
      console.log("School data:", schoolData)
      console.log("User data:", mockUserData)

      // Clear saved data after successful submission
      clearStorage(FORM_STORAGE_KEY)
      clearStorage(SCHOOL_DATA_STORAGE_KEY)
      clearStorage(ACTIVE_STEP_STORAGE_KEY)

      // Redirect to success page
      router.push("/dashboard/mahasiswa/mengajukan/success")
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Gagal mengirim formulir",
        description: "Terjadi kesalahan saat mengirim formulir. Silakan coba lagi.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const addSubject = (semesterId: string) => {
    setSchoolData({
      ...schoolData,
      semesters: schoolData.semesters.map((semester) => {
        if (semester.id === semesterId) {
          const newSubjectId = `${semesterId}-${semester.subjects.length + 1}`
          return {
            ...semester,
            subjects: [...semester.subjects, { id: newSubjectId, name: "", grade: "" }],
          }
        }
        return semester
      }),
    })
    setSaveStatus("idle")
  }

  const removeSubject = (semesterId: string, subjectId: string) => {
    setSchoolData({
      ...schoolData,
      semesters: schoolData.semesters.map((semester) => {
        if (semester.id === semesterId) {
          if (semester.subjects.length <= 1) return semester
          return {
            ...semester,
            subjects: semester.subjects.filter((subject) => subject.id !== subjectId),
          }
        }
        return semester
      }),
    })
    setSaveStatus("idle")
  }

  const updateSubjectName = (semesterId: string, subjectId: string, name: string) => {
    setSchoolData({
      ...schoolData,
      semesters: schoolData.semesters.map((semester) => {
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
    })
    setSaveStatus("idle")
  }

  const updateSubjectGrade = (semesterId: string, subjectId: string, grade: string) => {
    // Only allow numbers between 0-100
    if (grade && (isNaN(Number(grade)) || Number(grade) < 0 || Number(grade) > 100)) {
      return
    }

    setSchoolData({
      ...schoolData,
      semesters: schoolData.semesters.map((semester) => {
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
    })
    setSaveStatus("idle")
  }

  // Calculate average grade
  const averageGrade = calculateAverageGrade(schoolData.semesters)

  // Check if average grade meets minimum requirement
  const meetsGradeRequirement =
    Number(averageGrade) >= (scholarshipTypes.find((s) => s.id === "prestasi-akademik")?.minGrade || 0)

  // Calculate progress percentage
  const calculateProgress = () => {
    const totalSteps = steps.length
    return ((activeStep + 1) / totalSteps) * 100
  }

  // Format last saved time
  const formatLastSaved = () => {
    if (!lastSaved) return ""

    const now = new Date()
    const diffMs = now.getTime() - lastSaved.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) return "Baru saja"
    if (diffMins === 1) return "1 menit yang lalu"
    if (diffMins < 60) return `${diffMins} menit yang lalu`

    const hours = Math.floor(diffMins / 60)
    if (hours === 1) return "1 jam yang lalu"
    return `${hours} jam yang lalu`
  }

  // Get save status icon and text
  const getSaveStatusInfo = () => {
    switch (saveStatus) {
      case "saving":
        return { icon: <Clock className="h-4 w-4 animate-pulse" />, text: "Menyimpan..." }
      case "saved":
        return { icon: <Save className="h-4 w-4" />, text: `Tersimpan ${formatLastSaved()}` }
      case "error":
        return { icon: <AlertTriangle className="h-4 w-4" />, text: "Gagal menyimpan" }
      default:
        return { icon: <Clock className="h-4 w-4" />, text: lastSaved ? `Tersimpan ${formatLastSaved()}` : "" }
    }
  }

  const saveStatusInfo = getSaveStatusInfo()

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="grid gap-6">
        {/* Header Section */}
        <section>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
            <h1 className="text-2xl font-bold flex items-center text-slate-800">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mr-3 shadow-md">
                <FileText className="h-5 w-5 text-white" />
              </div>
              Formulir Pengajuan Beasiswa
            </h1>
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
              <div
                className={cn(
                  "text-xs flex items-center gap-1 px-2 py-1 rounded-md",
                  saveStatus === "error"
                    ? "bg-red-50 text-red-600"
                    : saveStatus === "saving"
                      ? "bg-yellow-50 text-yellow-600"
                      : "bg-blue-50 text-blue-600",
                )}
              >
                {saveStatusInfo.icon}
                <span>{saveStatusInfo.text}</span>
              </div>
              <Link href="/dashboard/mahasiswa">
                <Button
                  variant="outline"
                  className="bg-white border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-xl group w-full sm:w-auto justify-center sm:justify-start"
                >
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                  Kembali ke Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Progress Bar */}
        <section>
          <div className="w-full bg-gray-100 rounded-full h-2.5 mb-1">
            <div
              className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300 ease-in-out"
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>
              Langkah {activeStep + 1} dari {steps.length}
            </span>
            <span>{Math.round(calculateProgress())}% selesai</span>
          </div>
        </section>

        {/* User Info Card - Simplified */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-grow">
              <h3 className="font-medium text-gray-900">{mockUserData.fullName}</h3>
              <p className="text-sm text-gray-500">
                {mockUserData.nim} • {mockUserData.major}
              </p>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 ml-2">
              Semester {mockUserData.semester}
            </Badge>
          </div>
        </section>

        {/* Form Section */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="shadow-md hover:shadow-lg transition-all duration-300 rounded-3xl border border-gray-100 overflow-hidden bg-white">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-400 relative py-6">
                <div className="absolute inset-0 bg-[url('/abstract-geometric-flow.png')] opacity-20 mix-blend-overlay"></div>
                <CardTitle className="flex items-center text-white text-xl">
                  {activeStep === 0 && <Award className="h-5 w-5 mr-2" />}
                  {activeStep === 1 && scholarshipType === "prestasi-akademik" && (
                    <BarChart3 className="h-5 w-5 mr-2" />
                  )}
                  {activeStep === 1 && scholarshipType === "hafidz-quran" && <BookMarked className="h-5 w-5 mr-2" />}
                  {activeStep === 1 && scholarshipType === "bibit-unggul" && <Users className="h-5 w-5 mr-2" />}
                  {activeStep === 2 && <Upload className="h-5 w-5 mr-2" />}
                  {activeStep === 3 && <FileText className="h-5 w-5 mr-2" />}
                  {activeStep === 4 && <CheckCircle className="h-5 w-5 mr-2" />}
                  {steps[activeStep].dynamic ? getDynamicStepName() : steps[activeStep].name}
                </CardTitle>
                <CardDescription className="text-white/80">
                  {activeStep === 0 && "Pilih jenis beasiswa yang ingin Anda ajukan"}
                  {activeStep === 1 && scholarshipType === "prestasi-akademik" && "Masukkan data nilai akademik Anda"}
                  {activeStep === 1 && scholarshipType === "hafidz-quran" && "Masukkan data hafalan Qur'an Anda"}
                  {activeStep === 1 && scholarshipType === "bibit-unggul" && "Masukkan data organisasi Anda"}
                  {activeStep === 2 && "Unggah dokumen pendukung"}
                  {activeStep === 3 && "Isi pernyataan dan motivasi Anda"}
                  {activeStep === 4 && "Periksa kembali data Anda sebelum mengirim"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {activeStep === 0 && (
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="scholarshipType"
                      render={({ field }) => (
                        <FormItem className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {scholarshipTypes.map((scholarship) => (
                              <div
                                key={scholarship.id}
                                className={cn(
                                  "rounded-2xl border p-5 cursor-pointer transition-all duration-300",
                                  field.value === scholarship.id
                                    ? "ring-2 ring-offset-2 ring-blue-500 shadow-lg transform scale-[1.02] border-transparent"
                                    : "hover:shadow-md border-gray-200 hover:border-blue-200",
                                )}
                                onClick={() => {
                                  // If scholarship is not selectable, show toast and don't select it
                                  if (!scholarship.selectable) {
                                    toast({
                                      title: "Informasi Pendaftaran",
                                      description: scholarship.contactMessage,
                                      duration: 5000,
                                    })
                                    return
                                  }

                                  field.onChange(scholarship.id)
                                  setSaveStatus("idle")
                                  setTimeout(() => saveFormData(), 500)
                                }}
                              >
                                <div className="flex justify-between items-start mb-4">
                                  <div
                                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${scholarship.gradientClass} flex items-center justify-center shadow-md`}
                                  >
                                    <div className="text-white">{scholarship.icon}</div>
                                  </div>
                                  {field.value === scholarship.id && (
                                    <div className="bg-blue-100 rounded-full p-1">
                                      <CheckCircle className="h-5 w-5 text-blue-600" />
                                    </div>
                                  )}
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{scholarship.name}</h3>
                                <p className="text-sm text-gray-600">{scholarship.description}</p>
                                {!scholarship.selectable && (
                                  <div className="mt-3 flex items-center text-xs text-amber-600 bg-amber-50 p-2 rounded-lg">
                                    <Info className="h-4 w-4 mr-1 flex-shrink-0" />
                                    <span>Hubungi IPM di wilayah Anda</span>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Step 2: Dynamic Content based on Scholarship Type */}
                {activeStep === 1 && (
                  <>
                    {scholarshipType === "prestasi-akademik" && (
                      <div className="space-y-6">
                        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                          <h3 className="text-lg font-semibold mb-4 flex items-center">
                            <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                            Data Nilai Akhir SMA
                          </h3>

                          <Alert className="mb-6 bg-cyan-50 border-cyan-200">
                            <Info className="h-4 w-4 text-cyan-600" />
                            <AlertTitle className="text-cyan-800">Informasi Nilai</AlertTitle>
                            <AlertDescription className="text-cyan-700">
                              Masukkan nilai akhir untuk setiap mata pelajaran dalam skala 0-100. Nilai rata-rata
                              minimal untuk beasiswa ini adalah{" "}
                              {scholarshipTypes.find((s) => s.id === "prestasi-akademik")?.minGrade}.
                            </AlertDescription>
                          </Alert>

                          <div className="bg-white p-4 rounded-xl border border-blue-100 mb-6">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-blue-800 flex items-center">
                                Nilai Rata-Rata:
                                <span
                                  className={`text-lg ml-2 ${meetsGradeRequirement ? "text-green-600" : "text-red-600"}`}
                                >
                                  {averageGrade}
                                </span>
                                {meetsGradeRequirement ? (
                                  <CheckCircle className="h-4 w-4 text-green-600 ml-2" />
                                ) : (
                                  <span className="text-xs text-red-600 ml-2">
                                    (Minimal {scholarshipTypes.find((s) => s.id === "prestasi-akademik")?.minGrade})
                                  </span>
                                )}
                              </h4>
                              <div className="flex gap-2">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="text-cyan-600 border-cyan-300 hover:bg-cyan-50 rounded-lg"
                                        onClick={saveFormData}
                                      >
                                        <Save className="h-4 w-4 mr-1" />
                                        Simpan
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Simpan progres formulir secara manual</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  className="text-cyan-600 border-cyan-300 hover:bg-cyan-50 rounded-lg"
                                >
                                  <Download className="h-4 w-4 mr-1" />
                                  Import Nilai
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            {schoolData.semesters.map((semester) => (
                              <div key={semester.id} className="space-y-4">
                                <div className="flex justify-between items-center mb-2">
                                  <h4 className="font-medium">{semester.name}</h4>
                                  <div className="flex gap-2">
                                    <Button
                                      type="button"
                                      onClick={() => addSubject(semester.id)}
                                      variant="outline"
                                      size="sm"
                                      className="text-blue-600 border-blue-300 hover:bg-blue-50 rounded-lg"
                                    >
                                      <Plus className="h-4 w-4 mr-1" />
                                      Tambah Mata Pelajaran
                                    </Button>
                                  </div>
                                </div>
                                <div className="space-y-3">
                                  {semester.subjects.map((subject) => (
                                    <div key={subject.id} className="grid grid-cols-12 gap-2 items-center">
                                      <div className="col-span-7 sm:col-span-8">
                                        <Input
                                          value={subject.name}
                                          onChange={(e) => updateSubjectName(semester.id, subject.id, e.target.value)}
                                          placeholder="Nama Mata Pelajaran"
                                          className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                          required
                                        />
                                      </div>
                                      <div className="col-span-3 sm:col-span-2">
                                        <Input
                                          value={subject.grade}
                                          onChange={(e) => updateSubjectGrade(semester.id, subject.id, e.target.value)}
                                          placeholder="Nilai"
                                          className={`rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
                                            subject.grade &&
                                            Number(subject.grade) <
                                              (scholarshipTypes.find((s) => s.id === "prestasi-akademik")?.minGrade ||
                                                0)
                                              ? "border-red-300 bg-red-50"
                                              : subject.grade
                                                ? "border-green-300 bg-green-50"
                                                : ""
                                          }`}
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
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Hafidz Qur'an Scholarship */}
                    {scholarshipType === "hafidz-quran" && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="hafidzInfo.juzCount"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Jumlah Juz yang Dihafal</FormLabel>
                                <Select
                                  onValueChange={(value) => {
                                    field.onChange(value)
                                    setSaveStatus("idle")
                                    setTimeout(() => saveFormData(), 500)
                                  }}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="rounded-xl">
                                      <SelectValue placeholder="Pilih jumlah juz" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {[1, 2, 3, 5, 10, 15, 20, 25, 30].map((juz) => (
                                      <SelectItem key={juz} value={juz.toString()}>
                                        {juz} Juz
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  Minimal {scholarshipTypes.find((s) => s.id === "hafidz-quran")?.minJuz} juz untuk
                                  memenuhi syarat beasiswa
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="hafidzInfo.certificationLevel"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Tingkat Sertifikasi</FormLabel>
                                <Select
                                  onValueChange={(value) => {
                                    field.onChange(value)
                                    setSaveStatus("idle")
                                    setTimeout(() => saveFormData(), 500)
                                  }}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="rounded-xl">
                                      <SelectValue placeholder="Pilih tingkat sertifikasi" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="dasar">Dasar</SelectItem>
                                    <SelectItem value="menengah">Menengah</SelectItem>
                                    <SelectItem value="lanjut">Lanjut</SelectItem>
                                    <SelectItem value="mahir">Mahir</SelectItem>
                                    <SelectItem value="belum-ada">Belum Ada Sertifikasi</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="hafidzInfo.teacherName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nama Guru/Ustadz</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Masukkan nama guru/ustadz"
                                    {...field}
                                    className="rounded-xl"
                                    onChange={(e) => {
                                      field.onChange(e)
                                      setSaveStatus("idle")
                                    }}
                                    onBlur={() => saveFormData()}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="hafidzInfo.institutionName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nama Lembaga/Pondok</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Masukkan nama lembaga/pondok"
                                    {...field}
                                    className="rounded-xl"
                                    onChange={(e) => {
                                      field.onChange(e)
                                      setSaveStatus("idle")
                                    }}
                                    onBlur={() => saveFormData()}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex justify-end">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="text-cyan-600 border-cyan-300 hover:bg-cyan-50 rounded-lg"
                            onClick={saveFormData}
                          >
                            <Save className="h-4 w-4 mr-1" />
                            Simpan Progres
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Organization Scholarship */}
                    {scholarshipType === "bibit-unggul" && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="organizationInfo.organizationName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nama Organisasi</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Masukkan nama organisasi"
                                    {...field}
                                    className="rounded-xl"
                                    onChange={(e) => {
                                      field.onChange(e)
                                      setSaveStatus("idle")
                                    }}
                                    onBlur={() => saveFormData()}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="organizationInfo.position"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Jabatan</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Masukkan jabatan"
                                    {...field}
                                    className="rounded-xl"
                                    onChange={(e) => {
                                      field.onChange(e)
                                      setSaveStatus("idle")
                                    }}
                                    onBlur={() => saveFormData()}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="organizationInfo.yearsActive"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Lama Aktif</FormLabel>
                                <Select
                                  onValueChange={(value) => {
                                    field.onChange(value)
                                    setSaveStatus("idle")
                                    setTimeout(() => saveFormData(), 500)
                                  }}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="rounded-xl">
                                      <SelectValue placeholder="Pilih lama aktif" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="1">1 Tahun</SelectItem>
                                    <SelectItem value="2">2 Tahun</SelectItem>
                                    <SelectItem value="3">3 Tahun</SelectItem>
                                    <SelectItem value="4">4 Tahun</SelectItem>
                                    <SelectItem value="5+">Lebih dari 5 Tahun</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  Minimal {scholarshipTypes.find((s) => s.id === "bibit-unggul")?.minYearsActive} tahun
                                  untuk memenuhi syarat beasiswa
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="organizationInfo.contributionDescription"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Deskripsi Kontribusi</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Jelaskan kontribusi Anda dalam organisasi"
                                  {...field}
                                  className="rounded-xl min-h-[150px]"
                                  onChange={(e) => {
                                    field.onChange(e)
                                    setSaveStatus("idle")
                                  }}
                                  onBlur={() => saveFormData()}
                                />
                              </FormControl>
                              <FormDescription>
                                Jelaskan kontribusi dan pencapaian Anda dalam organisasi
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex justify-end">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="text-cyan-600 border-cyan-300 hover:bg-cyan-50 rounded-lg"
                            onClick={saveFormData}
                          >
                            <Save className="h-4 w-4 mr-1" />
                            Simpan Progres
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Step 3: Documents */}
                {activeStep === 2 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="documents.transcriptFile"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Transkrip Nilai</FormLabel>
                            <FormControl>
                              <div className="flex items-center gap-2">
                                <Input
                                  type="file"
                                  className="rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    if (file) {
                                      field.onChange(file.name)
                                      setSaveStatus("idle")
                                      setTimeout(() => saveFormData(), 500)
                                    }
                                  }}
                                />
                              </div>
                            </FormControl>
                            <FormDescription>Format: PDF, maksimal 2MB</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="documents.photoFile"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pas Foto</FormLabel>
                            <FormControl>
                              <div className="flex items-center gap-2">
                                <Input
                                  type="file"
                                  className="rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    if (file) {
                                      field.onChange(file.name)
                                      setSaveStatus("idle")
                                      setTimeout(() => saveFormData(), 500)
                                    }
                                  }}
                                />
                              </div>
                            </FormControl>
                            <FormDescription>Format: JPG/PNG, maksimal 1MB</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Conditional document fields based on scholarship type */}
                      {scholarshipType === "prestasi-akademik" && (
                        <FormField
                          control={form.control}
                          name="documents.certificateFile"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Sertifikat Prestasi</FormLabel>
                              <FormControl>
                                <div className="flex items-center gap-2">
                                  <Input
                                    type="file"
                                    className="rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0]
                                      if (file) {
                                        field.onChange(file.name)
                                        setSaveStatus("idle")
                                        setTimeout(() => saveFormData(), 500)
                                      }
                                    }}
                                  />
                                </div>
                              </FormControl>
                              <FormDescription>Format: PDF, maksimal 2MB</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      {scholarshipType === "hafidz-quran" && (
                        <FormField
                          control={form.control}
                          name="documents.certificateFile"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Sertifikat Hafalan</FormLabel>
                              <FormControl>
                                <div className="flex items-center gap-2">
                                  <Input
                                    type="file"
                                    className="rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0]
                                      if (file) {
                                        field.onChange(file.name)
                                        setSaveStatus("idle")
                                        setTimeout(() => saveFormData(), 500)
                                      }
                                    }}
                                  />
                                </div>
                              </FormControl>
                              <FormDescription>Format: PDF, maksimal 2MB</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      {scholarshipType === "bibit-unggul" && (
                        <FormField
                          control={form.control}
                          name="documents.recommendationFile"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Surat Rekomendasi</FormLabel>
                              <FormControl>
                                <div className="flex items-center gap-2">
                                  <Input
                                    type="file"
                                    className="rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0]
                                      if (file) {
                                        field.onChange(file.name)
                                        setSaveStatus("idle")
                                        setTimeout(() => saveFormData(), 500)
                                      }
                                    }}
                                  />
                                </div>
                              </FormControl>
                              <FormDescription>Format: PDF, maksimal 2MB</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="text-cyan-600 border-cyan-300 hover:bg-cyan-50 rounded-lg"
                        onClick={saveFormData}
                      >
                        <Save className="h-4 w-4 mr-1" />
                        Simpan Progres
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 4: Statement */}
                {activeStep === 3 && (
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="statement.motivation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Motivasi</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Jelaskan motivasi Anda mengajukan beasiswa ini"
                              {...field}
                              className="rounded-xl min-h-[200px]"
                              onChange={(e) => {
                                field.onChange(e)
                                setSaveStatus("idle")
                              }}
                              onBlur={() => saveFormData()}
                            />
                          </FormControl>
                          <FormDescription>
                            Minimal 100 karakter. Jelaskan mengapa Anda layak menerima beasiswa ini dan bagaimana
                            beasiswa ini akan membantu Anda mencapai tujuan akademik dan karir.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="statement.agreement"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <RadioGroup
                              onValueChange={(value) => {
                                field.onChange(value === "true")
                                setSaveStatus("idle")
                                setTimeout(() => saveFormData(), 500)
                              }}
                              defaultValue={field.value ? "true" : "false"}
                              className="flex flex-col space-y-1"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="true" id="agreement-yes" />
                                <Label htmlFor="agreement-yes" className="font-normal">
                                  Saya menyatakan bahwa semua informasi yang saya berikan adalah benar dan dapat
                                  dipertanggungjawabkan. Saya bersedia menerima sanksi apabila terbukti memberikan
                                  informasi yang tidak benar.
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="false" id="agreement-no" />
                                <Label htmlFor="agreement-no" className="font-normal">
                                  Saya tidak menyetujui pernyataan di atas.
                                </Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="text-cyan-600 border-cyan-300 hover:bg-cyan-50 rounded-lg"
                        onClick={saveFormData}
                      >
                        <Save className="h-4 w-4 mr-1" />
                        Simpan Progres
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 5: Confirmation */}
                {activeStep === 4 && (
                  <div className="space-y-6">
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                      <h3 className="text-lg font-semibold mb-4">Konfirmasi Data</h3>
                      <p className="text-sm text-blue-700 mb-4">
                        Silakan periksa kembali data yang telah Anda masukkan sebelum mengirim aplikasi beasiswa.
                        Pastikan semua informasi sudah benar dan lengkap.
                      </p>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-blue-800">Jenis Beasiswa</h4>
                          <p className="text-gray-700">
                            {scholarshipTypes.find((s) => s.id === scholarshipType)?.name || "-"}
                          </p>
                        </div>

                        <Separator />

                        <div>
                          <h4 className="font-medium text-blue-800">Data Diri</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mt-2">
                            <div>
                              <span className="text-sm text-gray-500">Nama Lengkap:</span>
                              <p className="text-gray-700">{mockUserData.fullName}</p>
                            </div>
                            <div>
                              <span className="text-sm text-gray-500">NIM:</span>
                              <p className="text-gray-700">{mockUserData.nim}</p>
                            </div>
                            <div>
                              <span className="text-sm text-gray-500">Fakultas:</span>
                              <p className="text-gray-700">{mockUserData.faculty}</p>
                            </div>
                            <div>
                              <span className="text-sm text-gray-500">Program Studi:</span>
                              <p className="text-gray-700">{mockUserData.major}</p>
                            </div>
                            <div>
                              <span className="text-sm text-gray-500">Semester:</span>
                              <p className="text-gray-700">{mockUserData.semester}</p>
                            </div>
                            <div>
                              <span className="text-sm text-gray-500">Email:</span>
                              <p className="text-gray-700">{mockUserData.email}</p>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        {scholarshipType === "prestasi-akademik" && (
                          <div>
                            <h4 className="font-medium text-blue-800">Data Akademik SMA</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mt-2">
                              <div>
                                <span className="text-sm text-gray-500">Nilai Rata-Rata:</span>
                                <p
                                  className={`text-gray-700 font-medium ${meetsGradeRequirement ? "text-green-600" : "text-red-600"}`}
                                >
                                  {averageGrade}
                                  {!meetsGradeRequirement && (
                                    <span className="text-xs ml-2">(Di bawah nilai minimum)</span>
                                  )}
                                </p>
                              </div>
                              <div className="col-span-2">
                                <span className="text-sm text-gray-500">Detail Nilai:</span>
                                <div className="mt-2 max-h-60 overflow-y-auto border rounded-lg p-3">
                                  {schoolData.semesters.map((semester) => (
                                    <div key={semester.id} className="mb-3">
                                      <h5 className="font-medium text-sm border-b pb-1 mb-2">{semester.name}</h5>
                                      <div className="grid grid-cols-2 gap-2">
                                        {semester.subjects.map((subject) => (
                                          <div key={subject.id} className="text-sm">
                                            <span>{subject.name}: </span>
                                            <span
                                              className={`font-medium ${
                                                subject.grade &&
                                                Number(subject.grade) <
                                                  (scholarshipTypes.find((s) => s.id === "prestasi-akademik")
                                                    ?.minGrade || 0)
                                                  ? "text-red-600"
                                                  : "text-green-600"
                                              }`}
                                            >
                                              {subject.grade || "-"}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {scholarshipType === "hafidz-quran" && (
                          <div>
                            <h4 className="font-medium text-blue-800">Data Hafalan</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mt-2">
                              <div>
                                <span className="text-sm text-gray-500">Jumlah Juz yang Dihafal:</span>
                                <p className="text-gray-700">{form.getValues("hafidzInfo.juzCount") || "-"} Juz</p>
                              </div>
                              <div>
                                <span className="text-sm text-gray-500">Tingkat Sertifikasi:</span>
                                <p className="text-gray-700">
                                  {form.getValues("hafidzInfo.certificationLevel") || "-"}
                                </p>
                              </div>
                              <div>
                                <span className="text-sm text-gray-500">Nama Guru/Ustadz:</span>
                                <p className="text-gray-700">{form.getValues("hafidzInfo.teacherName") || "-"}</p>
                              </div>
                              <div>
                                <span className="text-sm text-gray-500">Nama Lembaga/Pondok:</span>
                                <p className="text-gray-700">{form.getValues("hafidzInfo.institutionName") || "-"}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {scholarshipType === "bibit-unggul" && (
                          <div>
                            <h4 className="font-medium text-blue-800">Data Organisasi</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mt-2">
                              <div>
                                <span className="text-sm text-gray-500">Nama Organisasi:</span>
                                <p className="text-gray-700">
                                  {form.getValues("organizationInfo.organizationName") || "-"}
                                </p>
                              </div>
                              <div>
                                <span className="text-sm text-gray-500">Jabatan:</span>
                                <p className="text-gray-700">{form.getValues("organizationInfo.position") || "-"}</p>
                              </div>
                              <div>
                                <span className="text-sm text-gray-500">Lama Aktif:</span>
                                <p className="text-gray-700">
                                  {form.getValues("organizationInfo.yearsActive") || "-"} Tahun
                                </p>
                              </div>
                              <div className="col-span-1 md:col-span-2">
                                <span className="text-sm text-gray-500">Deskripsi Kontribusi:</span>
                                <p className="text-gray-700">
                                  {form.getValues("organizationInfo.contributionDescription") || "-"}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        <Separator />

                        <div>
                          <h4 className="font-medium text-blue-800">Dokumen</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mt-2">
                            <div>
                              <span className="text-sm text-gray-500">Transkrip Nilai:</span>
                              <p className="text-gray-700">{form.getValues("documents.transcriptFile") || "-"}</p>
                            </div>
                            <div>
                              <span className="text-sm text-gray-500">Pas Foto:</span>
                              <p className="text-gray-700">{form.getValues("documents.photoFile") || "-"}</p>
                            </div>
                            {scholarshipType === "prestasi-akademik" && (
                              <div>
                                <span className="text-sm text-gray-500">Sertifikat Prestasi:</span>
                                <p className="text-gray-700">{form.getValues("documents.certificateFile") || "-"}</p>
                              </div>
                            )}
                            {scholarshipType === "hafidz-quran" && (
                              <div>
                                <span className="text-sm text-gray-500">Sertifikat Hafalan:</span>
                                <p className="text-gray-700">{form.getValues("documents.certificateFile") || "-"}</p>
                              </div>
                            )}
                            {scholarshipType === "bibit-unggul" && (
                              <div>
                                <span className="text-sm text-gray-500">Surat Rekomendasi:</span>
                                <p className="text-gray-700">{form.getValues("documents.recommendationFile") || "-"}</p>
                              </div>
                            )}
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h4 className="font-medium text-blue-800">Pernyataan</h4>
                          <div className="mt-2">
                            <span className="text-sm text-gray-500">Motivasi:</span>
                            <p className="text-gray-700">{form.getValues("statement.motivation") || "-"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevStep}
                    disabled={activeStep === 0}
                    className="bg-white border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-xl"
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Sebelumnya
                  </Button>

                  {activeStep < steps.length - 1 ? (
                    <Button
                      type="button"
                      onClick={handleNextStep}
                      className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-xl hover:shadow-lg transition-all duration-300"
                    >
                      Selanjutnya
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-xl hover:shadow-lg transition-all duration-300"
                    >
                      {isSubmitting ? "Mengirim..." : "Kirim Aplikasi"}
                      {!isSubmitting && <CheckCircle className="ml-2 h-4 w-4" />}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  )
}
