import { Store } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface BusinessNameInputProps {
  value: string
  onChange: (value: string) => void
}

export function BusinessNameInput({ value, onChange }: BusinessNameInputProps) {
  return (
    <div className="max-w-lg mx-auto">
      <Label htmlFor="businessName" className="text-lg font-bold text-slate-900 mb-3 block">
        Your Business Name
      </Label>
      <div className="relative group">
        <Store className="pointer-events-none absolute left-5 top-1/2 h-14 w-14 text-slate-400 transition-colors" />
        <Input
          id="businessName"
          type="text"
          placeholder="e.g., Alex's Supermarket"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-14 w-full rounded-xl border-2 border-slate-200 bg-card pl-28 text-base shadow-sm focus:ring-4 focus:ring-blue-500/10 transition-all"
        />
      </div>
    </div>
  )
}
