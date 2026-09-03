import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SubmitButtonProps {
  isSubmitting: boolean
}

export function SubmitButton({ isSubmitting }: SubmitButtonProps) {
  return (
    <div className="flex justify-center pt-4 sm:pt-5 md:pt-6">
      <Button
        type="submit"
        disabled={isSubmitting}
        className="group h-12 sm:h-14 md:h-16 px-6 sm:px-8 md:px-10 rounded-xl sm:rounded-2xl text-sm sm:text-base md:text-lg font-bold bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xl shadow-blue-500/30 transition-all duration-300 hover:scale-105"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2 sm:gap-3">
            <div className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            <span className="text-xs sm:text-sm md:text-base">Setting up your dashboard...</span>
          </span>
        ) : (
          <span className="flex items-center gap-2 sm:gap-3">
            <span className="text-xs sm:text-sm md:text-base">Complete Setup</span>
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 transition-transform group-hover:translate-x-1" />
          </span>
        )}
      </Button>
    </div>
  )
}
