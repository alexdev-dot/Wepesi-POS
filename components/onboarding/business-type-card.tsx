import { LucideIcon } from "lucide-react"
import { Check } from "lucide-react"

interface BusinessTypeCardProps {
  id: string
  name: string
  description: string
  icon: LucideIcon
  color: string
  lightColor: string
  textColor: string
  isSelected: boolean
  onSelect: (id: string) => void
}

export function BusinessTypeCard({
  id,
  name,
  description,
  icon: Icon,
  color,
  lightColor,
  textColor,
  isSelected,
  onSelect
}: BusinessTypeCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={`
        relative group p-3 sm:p-4 md:p-5 lg:p-6 rounded-xl sm:rounded-2xl border-2 transition-all duration-300
        ${isSelected 
          ? `${color} border-transparent text-white shadow-xl scale-105` 
          : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-lg hover:-translate-y-1'
        }
      `}
    >
      {isSelected && (
        <div className="absolute -top-1.5 sm:-top-2 -right-1.5 sm:-right-2 h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 rounded-full bg-white flex items-center justify-center shadow-lg animate-in zoom-in duration-200">
          <Check className={`h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 ${textColor}`} strokeWidth={3} />
        </div>
      )}
      <div className={`
        flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center rounded-lg sm:rounded-xl mb-2 sm:mb-3 md:mb-4 transition-all duration-300
        ${isSelected ? 'bg-white/20' : lightColor}
      `}>
        <Icon className={`h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 ${isSelected ? 'text-white' : textColor}`} strokeWidth={2} />
      </div>
      <h3 className={`font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
        {name}
      </h3>
      <p className={`text-[10px] sm:text-xs md:text-sm leading-relaxed ${isSelected ? 'text-white/90' : 'text-slate-500'}`}>
        {description}
      </p>
    </button>
  )
}
