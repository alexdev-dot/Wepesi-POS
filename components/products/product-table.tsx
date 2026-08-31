"use client"

import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/empty-state"
import { MoreHorizontal, Edit, Trash } from "lucide-react"
import Image from "next/image"

export interface Product {
  id: number
  image: string
  name: string
  description: string
  sku: string
  barcode: string
  category: string
  brand: string
  costPrice: number
  sellingPrice: number
  stockQty: number
  status: string
}

interface ProductTableProps {
  products: Product[]
  onEdit?: (product: Product) => void
  onDelete?: (product: Product) => void
}

export function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock": return "bg-green-100 text-green-700"
      case "Low Stock": return "bg-orange-100 text-orange-700"
      case "Out of Stock": return "bg-red-100 text-red-700"
      default: return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {products.length === 0 ? (
        <EmptyState 
          icon="package"
          title="No products found"
          description="Get started by adding your first product to the inventory."
          actionLabel="Add Product"
          onAction={() => onEdit?.({} as Product)}
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
              <th className="hidden md:table-cell px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">Barcode</th>
              <th className="hidden lg:table-cell px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">Category</th>
              <th className="hidden lg:table-cell px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">Brand</th>
              <th className="hidden sm:table-cell px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">Cost Price</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">Selling Price</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">Stock Qty</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">Status</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-4 sm:px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-slate-100 overflow-hidden shrink-0 ring-2 ring-transparent group-hover:ring-slate-200 transition-all">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={48}
                          height={48}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-slate-400 text-xs">No img</div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">{product.name}</p>
                      <p className="text-xs text-slate-500 truncate">{product.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-4 text-sm text-slate-700 font-mono font-medium">{product.sku}</td>
                <td className="hidden md:table-cell px-4 sm:px-6 py-4 text-sm text-slate-700 font-mono">{product.barcode}</td>
                <td className="hidden lg:table-cell px-4 sm:px-6 py-4 text-sm text-slate-700">{product.category}</td>
                <td className="hidden lg:table-cell px-4 sm:px-6 py-4 text-sm text-slate-700">{product.brand}</td>
                <td className="hidden sm:table-cell px-4 sm:px-6 py-4 text-sm text-slate-700 font-medium">KSh {product.costPrice.toFixed(2)}</td>
                <td className="px-4 sm:px-6 py-4 text-sm text-slate-900 font-semibold">KSh {product.sellingPrice.toFixed(2)}</td>
                <td className="px-4 sm:px-6 py-4 text-sm text-slate-700 font-medium">{product.stockQty}</td>
                <td className="px-4 sm:px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-4">
                  <div className="flex items-center gap-1">
                    <button 
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors" 
                      title="Edit"
                      onClick={() => onEdit?.(product)}
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      className="p-1.5 rounded-lg hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors" 
                      title="Delete"
                      onClick={() => onDelete?.(product)}
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors" title="More">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden px-4 sm:px-6 py-4 space-y-3">
        {products.map((product) => (
          <div key={product.id} className="bg-white border rounded-xl p-4 shadow-sm">
            <div className="flex items-start gap-3 mb-3">
              <div className="h-14 w-14 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={56}
                    height={56}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-slate-400 text-xs">No img</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">{product.name}</p>
                <p className="text-xs text-slate-500 truncate">{product.description}</p>
                <p className="text-xs text-slate-500 font-mono mt-1">{product.sku}</p>
              </div>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(product.status)}`}>
                {product.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <p className="text-xs text-slate-500">Category</p>
                <p className="text-sm font-medium text-slate-900">{product.category}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Brand</p>
                <p className="text-sm font-medium text-slate-900">{product.brand}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div>
                <p className="text-xs text-slate-500">Selling Price</p>
                <p className="text-sm font-bold text-slate-900">KSh {product.sellingPrice.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors" 
                  aria-label="Edit product"
                  onClick={() => onEdit?.(product)}
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button 
                  className="p-2 rounded-lg hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors" 
                  aria-label="Delete product"
                  onClick={() => onDelete?.(product)}
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="px-4 sm:px-6 py-4 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs sm:text-sm text-slate-600">Showing 1 to {products.length} of 1,248 entries</p>
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
