import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface Category {
  name: string
  count: number
}

interface CategoryDropdownProps {
  categories: Category[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

export function CategoryDropdown({ categories, selectedCategory, onSelectCategory }: CategoryDropdownProps) {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
      <div className="relative">
        <select
          value={selectedCategory}
          onChange={(e) => onSelectCategory(e.target.value)}
          className="w-full h-11 px-4 pr-10 text-sm rounded-xl bg-white text-slate-700 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all cursor-pointer hover:border-slate-300 appearance-none"
        >
          {categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name} ({category.count})
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
      </div>
    </div>
  )
}
