"use client"

import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/empty-state"
import { MoreHorizontal, Edit, Trash } from "lucide-react"
import Image from "next/image"

export interface InventoryItem {
  id: number
  image: string
  name: string
  sku: string
  category: string
  currentStock: number
  reorderLevel: number
  unitCost: number
  totalValue: number
  lastRestock: string
}

interface InventoryTableProps {
  inventoryItems: InventoryItem[]
  onEdit?: (item: InventoryItem) => void
  onDelete?: (item: InventoryItem) => void
}

export function InventoryTable({ inventoryItems, onEdit, onDelete }: InventoryTableProps) {
  const getStockStatus = (current: number, reorder: number) => {
    if (current === 0) return { label: "Out of Stock", color: "bg-red-100 text-red-700" }
    if (current <= reorder) return { label: "Low Stock", color: "bg-orange-100 text-orange-700" }
    return { label: "In Stock", color: "bg-green-100 text-green-700" }
  }

  const getStockProgress = (current: number, reorder: number) => {
    if (current === 0) return 0
    const percentage = Math.min((current / (reorder * 2)) * 100, 100)
    return percentage
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {inventoryItems.length === 0 ? (
        <EmptyState 
          icon="package"
          title="No inventory items found"
          description="Get started by adding items to your inventory."
          actionLabel="Add Item"
          onAction={() => onEdit?.({} as InventoryItem)}
        />
      ) : (
        <>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
        <table className="w-full min-w-225">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">Product</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">SKU</th>
              <th className="hidden lg:table-cell px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">Category</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">Current Stock</th>
              <th className="hidden md:table-cell px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">Reorder Level</th>
              <th className="hidden sm:table-cell px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">Unit Cost</th>
              <th className="hidden md:table-cell px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">Total Value</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">Status</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {inventoryItems.map((item) => {
              const stockStatus = getStockStatus(item.currentStock, item.reorderLevel)
              const stockProgress = getStockProgress(item.currentStock, item.reorderLevel)
              return (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-slate-100 overflow-hidden shrink-0 ring-2 ring-transparent group-hover:ring-slate-200 transition-all">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={48}
                            height={48}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-slate-400 text-xs">No img</div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate">{item.name}</p>
                        <p className="text-xs text-slate-500 truncate">Last restock: {item.lastRestock}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm text-slate-700 font-mono font-medium">{item.sku}</td>
                  <td className="hidden lg:table-cell px-4 sm:px-6 py-4 text-sm text-slate-700">{item.category}</td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 min-w-30">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-slate-900">{item.currentStock}</span>
                          <span className="text-xs text-slate-500">/{item.reorderLevel}</span>
                        </div>
                        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all ${
                              stockProgress <= 25 ? 'bg-red-500' : 
                              stockProgress <= 50 ? 'bg-orange-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${stockProgress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden md:table-cell px-4 sm:px-6 py-4 text-sm text-slate-700">{item.reorderLevel}</td>
                  <td className="hidden sm:table-cell px-4 sm:px-6 py-4 text-sm text-slate-700 font-medium">KSh {item.unitCost.toFixed(2)}</td>
                  <td className="hidden md:table-cell px-4 sm:px-6 py-4 text-sm text-slate-900 font-semibold">KSh {item.totalValue.toLocaleString()}</td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}>
                      {stockStatus.label}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center gap-1">
                      <button 
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors" 
                        title="Edit"
                        onClick={() => onEdit?.(item)}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        className="p-1.5 rounded-lg hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors" 
                        title="Delete"
                        onClick={() => onDelete?.(item)}
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors" title="More">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden px-4 sm:px-6 py-4 space-y-3">
        {inventoryItems.map((item) => {
          const stockStatus = getStockStatus(item.currentStock, item.reorderLevel)
          const stockProgress = getStockProgress(item.currentStock, item.reorderLevel)
          return (
            <div key={item.id} className="bg-white border rounded-xl p-4 shadow-sm">
              <div className="flex items-start gap-3 mb-3">
                <div className="h-14 w-14 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={56}
                      height={56}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-slate-400 text-xs">No img</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">{item.name}</p>
                  <p className="text-xs text-slate-500 font-mono mt-1">{item.sku}</p>
                  <p className="text-xs text-slate-500 mt-1">Last restock: {item.lastRestock}</p>
                </div>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border shrink-0 ${stockStatus.color}`}>
                  {stockStatus.label}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <p className="text-xs text-slate-500">Category</p>
                  <p className="text-sm font-medium text-slate-900">{item.category}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Unit Cost</p>
                  <p className="text-sm font-medium text-slate-900">KSh {item.unitCost.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-500">Current Stock</span>
                  <span className="text-sm font-medium text-slate-900">{item.currentStock} / {item.reorderLevel}</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all ${
                      stockProgress <= 25 ? 'bg-red-500' : 
                      stockProgress <= 50 ? 'bg-orange-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${stockProgress}%` }}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div>
                  <p className="text-xs text-slate-500">Total Value</p>
                  <p className="text-sm font-bold text-slate-900">KSh {item.totalValue.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors" 
                    aria-label="Edit item"
                    onClick={() => onEdit?.(item)}
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    className="p-2 rounded-lg hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors" 
                    aria-label="Delete item"
                    onClick={() => onDelete?.(item)}
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Pagination */}
      <div className="px-4 sm:px-6 py-4 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs sm:text-sm text-slate-600">Showing 1 to {inventoryItems.length} of 1,248 entries</p>
        <div className="flex items-center gap-1 flex-wrap">
          <Button variant="outline" size="sm" className="h-9 text-sm border-slate-200 text-slate-700 hover:bg-slate-50" disabled>
            Previous
          </Button>
          {[1, 2, 3, "...", 125].map((page, index) => (
            <Button
              key={index}
              variant={page === 1 ? "default" : "outline"}
              size="sm"
              className={`h-9 text-sm ${page === 1 ? "bg-blue-600 text-white hover:bg-blue-700" : "border-slate-200 text-slate-700 hover:bg-slate-50"}`}
            >
              {page}
            </Button>
          ))}
          <Button variant="outline" size="sm" className="h-9 text-sm border-slate-200 text-slate-700 hover:bg-slate-50">
            Next
          </Button>
        </div>
      </div>
        </>
      )}
    </div>
  )
}
