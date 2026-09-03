import { Check } from "lucide-react"

interface StepNavigationProps {
  currentStep: number
  totalSteps: number
  stepNames: string[]
}

export function StepNavigation({ currentStep, totalSteps, stepNames }: StepNavigationProps) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center gap-1 sm:gap-2">
        {stepNames.map((name, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep
          const isPending = stepNumber > currentStep

          return (
            <div key={index} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`
                    h-7 w-7 sm:h-8 sm:w-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300
                    ${isCompleted 
                      ? 'bg-primary text-white' 
                      : isCurrent 
                        ? 'bg-primary text-white ring-2 ring-primary/20' 
                        : 'bg-slate-200 text-slate-400'
                    }
                  `}
                >
                  {isCompleted ? <Check className="h-3 w-3 sm:h-4 sm:w-4" /> : stepNumber}
                </div>
                <span
                  className={`
                    mt-1 sm:mt-1.5 text-[10px] sm:text-xs font-medium transition-colors
                    ${isCurrent ? 'text-primary' : isCompleted ? 'text-primary' : 'text-slate-400'}
                  `}
                >
                  {name}
                </span>
              </div>
              {index < stepNames.length - 1 && (
                <div
                  className={`
                    flex-1 h-0.5 mx-1 sm:mx-2 rounded-full transition-all duration-300
                    ${isCompleted ? 'bg-primary' : 'bg-slate-200'}
                  `}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
