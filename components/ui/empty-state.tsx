import { Package, Users, ShoppingCart, FileText, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  icon?: "package" | "users" | "shopping" | "file" | "alert"
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

const icons = {
  package: Package,
  users: Users,
  shopping: ShoppingCart,
  file: FileText,
  alert: AlertCircle,
}

export function EmptyState({ 
  icon = "alert", 
  title, 
  description, 
  actionLabel, 
  onAction,
  className 
}: EmptyStateProps) {
  const Icon = icons[icon]

  return (
    <div className={cn("flex flex-col items-center justify-center py-12 px-4 text-center", className)}>
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 mb-4">
        <Icon className="h-8 w-8 text-slate-400" strokeWidth={1.5} />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-6">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
