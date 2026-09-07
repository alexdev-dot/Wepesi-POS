"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"

interface AddStockFormProps {
  isOpen: boolean
  onClose: () => void
  products: Array<{ id: string | number; name: string; sku: string }>
  onSubmit: (stockData: {
    productId: string
    productName: string
    quantity: number
    unitCost: number
    supplier: string
    notes: string
  }) => Promise<void> | void
}

export function AddStockForm({ isOpen, onClose, products, onSubmit }: AddStockFormProps) {
  const [formData, setFormData] = useState({
    productId: "",
    productName: "",
    quantity: "",
    unitCost: "",
    supplier: "",
    notes: ""
  })
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const quantity = parseInt(formData.quantity, 10)
    const unitCost = parseFloat(formData.unitCost)
    if (!formData.productId || !Number.isInteger(quantity) || quantity <= 0 || !Number.isFinite(unitCost) || unitCost < 0) {
      setError("Select a product and enter a valid quantity and unit cost.")
      return
    }

    setError(null)
    setIsSubmitting(true)
    try {
      await onSubmit({
        productId: formData.productId,
        productName: formData.productName,
        quantity,
        unitCost,
        supplier: formData.supplier.trim(),
        notes: formData.notes.trim(),
      })
      setFormData({ productId: "", productName: "", quantity: "", unitCost: "", supplier: "", notes: "" })
      onClose()
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to add stock.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-background/80 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">Add Stock</h2>
            <p className="text-sm text-muted-foreground">Record new stock entry</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}
          {/* Product Selection */}
          <div>
            <Label htmlFor="productName" className="text-sm font-semibold text-foreground mb-1.5 block">Product *</Label>
            <select
              id="productId"
              name="productId"
              value={formData.productId}
              onChange={(event) => {
                const selectedProduct = products.find((product) => String(product.id) === event.target.value)
                setFormData(prev => ({
                  ...prev,
                  productId: event.target.value,
                  productName: selectedProduct?.name || "",
                }))
              }}
              className="h-10 w-full px-3 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              required
            >
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>{product.name} ({product.sku})</option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div>
            <Label htmlFor="quantity" className="text-sm font-semibold text-foreground mb-1.5 block">Quantity *</Label>
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
            <Label htmlFor="unitCost" className="text-sm font-semibold text-foreground mb-1.5 block">Unit Cost (KSh) *</Label>
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
            <Label htmlFor="supplier" className="text-sm font-semibold text-foreground mb-1.5 block">Supplier</Label>
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
            <Label htmlFor="notes" className="text-sm font-semibold text-foreground mb-1.5 block">Notes</Label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Additional notes..."
              rows={3}
              className="w-full px-3 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-border sticky bottom-0 bg-card">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 h-10 border-border text-foreground hover:bg-muted"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || products.length === 0}
              className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isSubmitting ? "Saving..." : "Add Stock"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
