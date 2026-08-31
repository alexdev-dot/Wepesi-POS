"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Upload } from "lucide-react"

interface AddProductFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (product: any) => void
}

export function AddProductForm({ isOpen, onClose, onSubmit }: AddProductFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sku: "",
    barcode: "",
    category: "",
    brand: "",
    costPrice: "",
    sellingPrice: "",
    stockQty: "",
    status: "In Stock",
    image: null as File | null
  })

  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, image: file }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const productData = {
      ...formData,
      costPrice: parseFloat(formData.costPrice),
      sellingPrice: parseFloat(formData.sellingPrice),
      stockQty: parseInt(formData.stockQty),
      id: Date.now() // Temporary ID generation
    }
    
    onSubmit(productData)
    
    // Reset form
    setFormData({
      name: "",
      description: "",
      sku: "",
      barcode: "",
      category: "",
      brand: "",
      costPrice: "",
      sellingPrice: "",
      stockQty: "",
      status: "In Stock",
      image: null
    })
    setImagePreview(null)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Add New Product</h2>
            <p className="text-sm text-slate-500">Fill in the product details below</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Product Image Upload */}
          <div>
            <Label className="text-sm font-semibold text-slate-700 mb-2 block">Product Image</Label>
            <div 
              className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
              onClick={() => document.getElementById('product-image')?.click()}
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
                  <Upload className="h-10 w-10 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</p>
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

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-sm font-semibold text-slate-700 mb-1.5 block">Product Name *</Label>
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
            <div>
              <Label htmlFor="description" className="text-sm font-semibold text-slate-700 mb-1.5 block">Description</Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="e.g., Bottle"
                className="h-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sku" className="text-sm font-semibold text-slate-700 mb-1.5 block">SKU *</Label>
              <Input
                id="sku"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                placeholder="e.g., CC500"
                className="h-10"
                required
              />
            </div>
            <div>
              <Label htmlFor="barcode" className="text-sm font-semibold text-slate-700 mb-1.5 block">Barcode</Label>
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

          {/* Category and Brand */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category" className="text-sm font-semibold text-slate-700 mb-1.5 block">Category *</Label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="h-10 w-full px-3 text-sm border rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                required
              >
                <option value="">Select Category</option>
                <option value="Beverages">Beverages</option>
                <option value="Bakery">Bakery</option>
                <option value="Dairy">Dairy</option>
                <option value="Snacks">Snacks</option>
                <option value="Stationery">Stationery</option>
                <option value="Personal Care">Personal Care</option>
              </select>
            </div>
            <div>
              <Label htmlFor="brand" className="text-sm font-semibold text-slate-700 mb-1.5 block">Brand *</Label>
              <select
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className="h-10 w-full px-3 text-sm border rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                required
              >
                <option value="">Select Brand</option>
                <option value="Coca Cola">Coca Cola</option>
                <option value="BakeHouse">BakeHouse</option>
                <option value="Brookside">Brookside</option>
                <option value="Lays">Lays</option>
                <option value="Double A">Double A</option>
                <option value="Colgate">Colgate</option>
                <option value="Dettol">Dettol</option>
              </select>
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="costPrice" className="text-sm font-semibold text-slate-700 mb-1.5 block">Cost Price (KSh) *</Label>
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
              <Label htmlFor="sellingPrice" className="text-sm font-semibold text-slate-700 mb-1.5 block">Selling Price (KSh) *</Label>
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

          {/* Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="stockQty" className="text-sm font-semibold text-slate-700 mb-1.5 block">Stock Quantity *</Label>
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
            <div>
              <Label htmlFor="status" className="text-sm font-semibold text-slate-700 mb-1.5 block">Status</Label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="h-10 w-full px-3 text-sm border rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
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
              Add Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
