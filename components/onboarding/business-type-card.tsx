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
        relative group p-6 rounded-2xl border-2 transition-all duration-300
        ${isSelected 
          ? `${color} border-transparent text-white shadow-xl scale-105` 
          : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-lg hover:-translate-y-1'
        }
      `}
    >
      {isSelected && (
        <div className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-white flex items-center justify-center shadow-lg animate-in zoom-in duration-200">
          <Check className={`h-4 w-4 ${textColor}`} strokeWidth={3} />
        </div>
      )}
      <div className={`
        flex h-14 w-14 items-center justify-center rounded-xl mb-4 transition-all duration-300
        ${isSelected ? 'bg-white/20' : lightColor}
      `}>
        <Icon className={`h-7 w-7 ${isSelected ? 'text-white' : textColor}`} strokeWidth={2} />
      </div>
      <h3 className={`font-bold text-lg mb-2 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
        {name}
      </h3>
      <p className={`text-sm leading-relaxed ${isSelected ? 'text-white/90' : 'text-slate-500'}`}>
        {description}
      </p>
    </button>
  )
}
