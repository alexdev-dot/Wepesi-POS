import { ReactNode } from "react"
import { type POSLayoutConfig } from "@/lib/pos-layout-config"

interface RetailLayoutProps {
  children: ReactNode
  config: POSLayoutConfig
}

export function RetailLayout({ children, config }: RetailLayoutProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Retail-specific header */}
      {config.features.showCategories && (
        <div className="border-b border-border bg-card p-3">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-sm font-semibold text-foreground mb-2">Quick Categories</h2>
            <div className="flex gap-2 overflow-x-auto pb-1">
              <button className="px-3 py-1.5 bg-[#30B54A] text-white rounded-lg text-sm font-medium whitespace-nowrap">
                All Products
              </button>
              <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium whitespace-nowrap">
                Beverages
              </button>
              <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium whitespace-nowrap">
                Snacks
              </button>
              <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium whitespace-nowrap">
                Electronics
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Barcode scanner for retail */}
      {config.features.showBarcodeScanner && (
        <div className="border-b border-border bg-card p-3">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Scan barcode or type SKU..."
                className="flex-1 h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#30B54A]"
              />
              <button className="px-4 py-2 bg-[#30B54A] text-white rounded-lg text-sm font-medium hover:bg-[#25913b]">
                Scan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Weight scale indicator for supermarket */}
      {config.features.showWeightScale && (
        <div className="border-b border-border bg-card p-3">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center text-sm text-slate-600">
                Scale: Ready (0.00 kg)
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                Tare
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  )
}
