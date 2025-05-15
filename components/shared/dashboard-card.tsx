import type { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shared/ui/card"

interface DashboardCardProps {
  title: string
  description?: string
  icon?: ReactNode
  gradient?: string
  className?: string
  children: ReactNode
  action?: ReactNode
}

export function DashboardCard({
  title,
  description,
  icon,
  gradient = "from-indigo-100 to-blue-50",
  className = "",
  children,
  action,
}: DashboardCardProps) {
  return (
    <Card className={`shadow-lg rounded-3xl border-none overflow-hidden card-hover ${className}`}>
      <CardHeader className={`bg-gradient-to-r ${gradient} flex flex-row items-center justify-between`}>
        <div className="flex items-center gap-2">
          {icon && <span className="text-indigo-600">{icon}</span>}
          <div>
            <CardTitle className="text-base sm:text-lg">{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
        </div>
        {action && <div>{action}</div>}
      </CardHeader>
      <CardContent className="p-6">{children}</CardContent>
    </Card>
  )
}
