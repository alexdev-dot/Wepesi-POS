import { ReactNode } from "react"
import { type POSLayoutConfig } from "@/lib/pos-layout-config"
import { UtensilsCrossed, Pizza, CupSoda, Candy, Croissant, Coffee } from "lucide-react"

interface KioskLayoutProps {
  children: ReactNode
  config: POSLayoutConfig
}

export function KioskLayout({ children, config }: KioskLayoutProps) {
  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Kiosk-specific header - simplified and touch-optimized */}
      <div className="bg-[#30B54A] text-white p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Welcome!</h1>
              <p className="text-sm opacity-90">Please select your items</p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">Order #</p>
              <p className="text-xl font-bold">K{Math.floor(Math.random() * 1000) + 1}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Touch-optimized categories */}
      {config.features.showCategories && (
        <div className="bg-white border-b border-slate-200 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              <button className="aspect-square rounded-xl bg-[#30B54A] text-white flex flex-col items-center justify-center p-3 hover:bg-[#25913b] transition-colors">
                <UtensilsCrossed className="h-8 w-8 mb-1" />
                <span className="text-sm font-medium">All</span>
              </button>
              <button className="aspect-square rounded-xl bg-slate-100 text-slate-700 flex flex-col items-center justify-center p-3 hover:bg-slate-200 transition-colors">
                <Pizza className="h-8 w-8 mb-1" />
                <span className="text-sm font-medium">Pizza</span>
              </button>
              <button className="aspect-square rounded-xl bg-slate-100 text-slate-700 flex flex-col items-center justify-center p-3 hover:bg-slate-200 transition-colors">
                <CupSoda className="h-8 w-8 mb-1" />
                <span className="text-sm font-medium">Drinks</span>
              </button>
              <button className="aspect-square rounded-xl bg-slate-100 text-slate-700 flex flex-col items-center justify-center p-3 hover:bg-slate-200 transition-colors">
                <Candy className="h-8 w-8 mb-1" />
                <span className="text-sm font-medium">Sides</span>
              </button>
              <button className="aspect-square rounded-xl bg-slate-100 text-slate-700 flex flex-col items-center justify-center p-3 hover:bg-slate-200 transition-colors">
                <Croissant className="h-8 w-8 mb-1" />
                <span className="text-sm font-medium">Desserts</span>
              </button>
              <button className="aspect-square rounded-xl bg-slate-100 text-slate-700 flex flex-col items-center justify-center p-3 hover:bg-slate-200 transition-colors">
                <Coffee className="h-8 w-8 mb-1" />
                <span className="text-sm font-medium">Coffee</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main content - touch-optimized */}
      <div className="flex-1 overflow-hidden p-4">
        <div className="max-w-7xl mx-auto h-full">
          {children}
        </div>
      </div>

      {/* Kiosk-specific footer - simplified cart summary */}
      <div className="bg-white border-t border-slate-200 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold text-slate-900">KSh 0.00</div>
              <div className="text-sm text-slate-500">0 items</div>
            </div>
            <button className="px-8 py-4 bg-[#30B54A] text-white rounded-xl text-lg font-bold hover:bg-[#25913b] transition-colors">
              View Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
