import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SubmitButtonProps {
  isSubmitting: boolean
}

export function SubmitButton({ isSubmitting }: SubmitButtonProps) {
  return (
    <div className="flex justify-center pt-6">
      <Button
        type="submit"
        disabled={isSubmitting}
        className="group h-16 px-10 rounded-2xl text-lg font-bold bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xl shadow-blue-500/30 transition-all duration-300 hover:scale-105"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-3">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Setting up your dashboard...
          </span>
        ) : (
          <span className="flex items-center gap-3">
            Complete Setup
            <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
          </span>
        )}
      </Button>
    </div>
  )
}
