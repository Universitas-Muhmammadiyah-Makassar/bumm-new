import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function AplikasiDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8">
        {/* Header Section */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center">
              <Skeleton className="h-10 w-10 rounded-xl mr-4" />
              <Skeleton className="h-8 w-64" />
            </div>
            <Skeleton className="h-10 w-48" />
          </div>
        </section>

        {/* Status Card */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="shadow-lg rounded-3xl border-none overflow-hidden bg-white">
              <CardHeader className="h-24 bg-gradient-to-r from-slate-200 to-slate-300" />
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <Skeleton className="h-8 w-32 rounded-full" />
                  <Skeleton className="h-5 w-48" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex items-start">
                      <Skeleton className="h-5 w-5 mr-3 mt-0.5" />
                      <div className="w-full">
                        <Skeleton className="h-4 w-24 mb-2" />
                        <Skeleton className="h-5 w-32" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-8">
                  <Skeleton className="h-6 w-48 mb-4" />
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-14 w-full rounded-lg" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="shadow-lg rounded-3xl border-none overflow-hidden bg-white">
              <CardHeader className="h-24 bg-gradient-to-r from-slate-200 to-slate-300" />
              <CardContent className="p-6">
                <div className="space-y-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="pl-8 relative">
                      <Skeleton className="absolute left-0 w-6 h-6 rounded-full" />
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-5 w-32 mb-2" />
                      <Skeleton className="h-4 w-48" />
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
