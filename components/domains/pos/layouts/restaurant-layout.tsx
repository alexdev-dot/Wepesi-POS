import { ReactNode } from "react"
import { type POSLayoutConfig } from "@/lib/pos-layout-config"

interface RestaurantLayoutProps {
  children: ReactNode
  config: POSLayoutConfig
}

export function RestaurantLayout({ children, config }: RestaurantLayoutProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Restaurant-specific header */}
      {config.features.showTableManagement && (
        <div className="border-b border-border bg-card p-3">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold text-foreground">Table Management</h2>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                  All Tables
                </button>
                <button className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium">
                  Occupied
                </button>
                <button className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                  Available
                </button>
              </div>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((tableNum) => (
                <button
                  key={tableNum}
                  className="aspect-square rounded-lg border-2 border-green-500 bg-green-50 hover:bg-green-100 flex flex-col items-center justify-center transition-colors"
                >
                  <span className="text-lg font-bold text-green-700">T{tableNum}</span>
                  <span className="text-xs text-green-600">Available</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Kitchen display for restaurant */}
      {config.features.showKitchenDisplay && (
        <div className="border-b border-border bg-card p-3">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">Kitchen Orders</h2>
              <span className="text-xs text-orange-600 font-medium">3 orders pending</span>
            </div>
            <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
              <div className="min-w-50 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-orange-900">Order #1234</span>
                  <span className="text-xs text-orange-600">Table 2</span>
                </div>
                <div className="text-xs text-orange-700">
                  <p>2x Burger Meal</p>
                  <p>1x Caesar Salad</p>
                </div>
              </div>
              <div className="min-w-50 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-orange-900">Order #1235</span>
                  <span className="text-xs text-orange-600">Table 5</span>
                </div>
                <div className="text-xs text-orange-700">
                  <p>3x Pizza Margherita</p>
                  <p>2x Garlic Bread</p>
                </div>
              </div>
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
