"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Upload } from "lucide-react"

interface AddProductFormProps {
  isOpen: boolean
  onClose: () => void
  categories: string[]
  onSubmit: (product: {
    name: string
    barcode: string
    category: string
    costPrice: number
    sellingPrice: number
    stockQty: number
    image: File | null
  }) => Promise<void> | void
}

export function AddProductForm({ isOpen, onClose, categories, onSubmit }: AddProductFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    barcode: "",
    category: "",
    costPrice: "",
    sellingPrice: "",
    stockQty: "",
    image: null as File | null
  })

  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const selectImage = (file: File | undefined) => {
    if (!file) return
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/avif', 'image/heic', 'image/heif']
    if (!allowedTypes.includes(file.type)) {
      setError("Choose a PNG, JPG, WebP, AVIF, or HEIC image.")
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Images must be 5MB or smaller.")
      return
    }

    setError(null)
    setFormData(prev => ({ ...prev, image: file }))
    const reader = new FileReader()
    reader.onloadend = () => setImagePreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    selectImage(e.target.files?.[0])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const costPrice = parseFloat(formData.costPrice)
    const sellingPrice = parseFloat(formData.sellingPrice)
    const stockQty = parseInt(formData.stockQty, 10)

    if (!Number.isFinite(costPrice) || !Number.isFinite(sellingPrice) || !Number.isInteger(stockQty) || stockQty < 0) {
      setError("Enter valid prices and a stock quantity of zero or more.")
      return
    }

    setError(null)
    setIsSubmitting(true)

    try {
      await onSubmit({
        name: formData.name.trim(),
        barcode: formData.barcode.trim(),
        category: formData.category,
        costPrice,
        sellingPrice,
        stockQty,
        image: formData.image,
      })

      setFormData({
        name: "",
        barcode: "",
        category: "",
        costPrice: "",
        sellingPrice: "",
        stockQty: "",
        image: null
      })
      setImagePreview(null)
      onClose()
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to save the product.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-background/80 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">Add New Product</h2>
            <p className="text-sm text-muted-foreground">Fill in the product details below</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}
          {/* Product Image Upload */}
          <div>
            <Label className="text-sm font-semibold text-foreground mb-2 block">Product Image</Label>
            <div 
              className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
              onClick={() => document.getElementById('product-image')?.click()}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault()
                selectImage(event.dataTransfer.files?.[0])
              }}
            >
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Product preview"
                    className="h-32 w-32 object-cover rounded-lg mx-auto"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setImagePreview(null)
                      setFormData(prev => ({ ...prev, image: null }))
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div>
                  <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WebP, AVIF, HEIC up to 5MB</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="product-image"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="name" className="text-sm font-semibold text-foreground mb-1.5 block">Product Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Coca Cola 500ml"
              className="h-10"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="barcode" className="text-sm font-semibold text-foreground mb-1.5 block">Barcode</Label>
              <Input
                id="barcode"
                name="barcode"
                value={formData.barcode}
                onChange={handleInputChange}
                placeholder="e.g., 5449000012345"
                className="h-10"
              />
            </div>
          </div>

          {/* Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category" className="text-sm font-semibold text-foreground mb-1.5 block">Category *</Label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="h-10 w-full px-3 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => <option key={category} value={category}>{category}</option>)}
              </select>
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="costPrice" className="text-sm font-semibold text-foreground mb-1.5 block">Cost Price (KSh) *</Label>
              <Input
                id="costPrice"
                name="costPrice"
                type="number"
                step="0.01"
                value={formData.costPrice}
                onChange={handleInputChange}
                placeholder="e.g., 60.00"
                className="h-10"
                required
              />
            </div>
            <div>
              <Label htmlFor="sellingPrice" className="text-sm font-semibold text-foreground mb-1.5 block">Selling Price (KSh) *</Label>
              <Input
                id="sellingPrice"
                name="sellingPrice"
                type="number"
                step="0.01"
                value={formData.sellingPrice}
                onChange={handleInputChange}
                placeholder="e.g., 120.00"
                className="h-10"
                required
              />
            </div>
          </div>

          <div>
              <Label htmlFor="stockQty" className="text-sm font-semibold text-foreground mb-1.5 block">Quantity *</Label>
              <Input
                id="stockQty"
                name="stockQty"
                type="number"
                value={formData.stockQty}
                onChange={handleInputChange}
                placeholder="e.g., 100"
                className="h-10"
                required
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
              disabled={isSubmitting}
              className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isSubmitting ? "Saving..." : "Add Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
