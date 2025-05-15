import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/shared/ui/card"
import { TrendingUp } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  icon: ReactNode
  change?: string
  trend?: "up" | "down" | "neutral"
  gradient?: string
}

export function StatCard({
  title,
  value,
  icon,
  change,
  trend = "neutral",
  gradient = "from-indigo-500 to-blue-500",
}: StatCardProps) {
  return (
    <Card className="border-none shadow-lg rounded-3xl overflow-hidden card-hover">
      <CardContent className="p-0">
        <div className={`bg-gradient-to-r ${gradient} p-6 text-white`}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-white/80">{title}</p>
              <h3 className="text-3xl font-bold mt-1">{value}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">{icon}</div>
          </div>
        </div>
        {change && (
          <div className="p-4 bg-white">
            <div className="flex items-center text-sm">
              {trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              ) : trend === "down" ? (
                <TrendingUp className="h-4 w-4 text-red-500 mr-1 transform rotate-180" />
              ) : null}
              <span className={trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-gray-500"}>
                {change}
              </span>
              <span className="text-gray-500 ml-1">dari periode sebelumnya</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
