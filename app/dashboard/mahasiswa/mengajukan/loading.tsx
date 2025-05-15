import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function LoadingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8">
        {/* Header Section */}
        <section>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6">
            <div className="flex items-center">
              <Skeleton className="w-8 h-8 rounded-lg mr-3" />
              <Skeleton className="h-8 w-48" />
            </div>
            <Skeleton className="h-10 w-40" />
          </div>
        </section>

        {/* Progress Steps */}
        <section>
          <Skeleton className="w-full h-20 rounded-2xl" />
        </section>

        {/* Form Section */}
        <Card className="shadow-lg rounded-3xl border-none overflow-hidden bg-white">
          <CardHeader className="bg-gradient-to-r from-gray-200 to-gray-300">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-72" />
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="h-20 rounded-xl" />
                <Skeleton className="h-20 rounded-xl" />
                <Skeleton className="h-20 rounded-xl" />
                <Skeleton className="h-20 rounded-xl" />
              </div>
              <Skeleton className="h-40 rounded-xl" />
              <div className="flex justify-between mt-8">
                <Skeleton className="h-10 w-32 rounded-xl" />
                <Skeleton className="h-10 w-32 rounded-xl" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
