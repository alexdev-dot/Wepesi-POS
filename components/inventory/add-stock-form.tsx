"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"

interface AddStockFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (stockData: any) => void
}

export function AddStockForm({ isOpen, onClose, onSubmit }: AddStockFormProps) {
  const [formData, setFormData] = useState({
    productId: "",
    productName: "",
    quantity: "",
    unitCost: "",
    supplier: "",
    notes: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const stockData = {
      ...formData,
      quantity: parseInt(formData.quantity),
      unitCost: parseFloat(formData.unitCost),
      id: Date.now()
    }
    
    onSubmit(stockData)
    
    // Reset form
    setFormData({
      productId: "",
      productName: "",
      quantity: "",
      unitCost: "",
      supplier: "",
      notes: ""
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Add Stock</h2>
            <p className="text-sm text-slate-500">Record new stock entry</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Product Selection */}
          <div>
            <Label htmlFor="productName" className="text-sm font-semibold text-slate-700 mb-1.5 block">Product *</Label>
            <select
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              className="h-10 w-full px-3 text-sm border rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              required
            >
              <option value="">Select Product</option>
              <option value="Coca Cola 500ml">Coca Cola 500ml</option>
              <option value="Bread Loaf">Bread Loaf</option>
              <option value="Milk 1L">Milk 1L</option>
              <option value="Lays Chips 150g">Lays Chips 150g</option>
              <option value="A4 Copy Paper">A4 Copy Paper</option>
              <option value="Colgate Toothpaste">Colgate Toothpaste</option>
              <option value="Dettol Soap">Dettol Soap</option>
            </select>
          </div>

          {/* Quantity */}
          <div>
            <Label htmlFor="quantity" className="text-sm font-semibold text-slate-700 mb-1.5 block">Quantity *</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="e.g., 100"
              className="h-10"
              required
              min="1"
            />
          </div>

          {/* Unit Cost */}
          <div>
            <Label htmlFor="unitCost" className="text-sm font-semibold text-slate-700 mb-1.5 block">Unit Cost (KSh) *</Label>
            <Input
              id="unitCost"
              name="unitCost"
              type="number"
              step="0.01"
              value={formData.unitCost}
              onChange={handleInputChange}
              placeholder="e.g., 60.00"
              className="h-10"
              required
            />
          </div>

          {/* Supplier */}
          <div>
            <Label htmlFor="supplier" className="text-sm font-semibold text-slate-700 mb-1.5 block">Supplier</Label>
            <Input
              id="supplier"
              name="supplier"
              value={formData.supplier}
              onChange={handleInputChange}
              placeholder="e.g., Coca Cola Distributor"
              className="h-10"
            />
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes" className="text-sm font-semibold text-slate-700 mb-1.5 block">Notes</Label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Additional notes..."
              rows={3}
              className="w-full px-3 text-sm border rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-slate-200 sticky bottom-0 bg-white">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 h-10 border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Add Stock
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
