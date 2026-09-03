"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Tag } from "lucide-react"

interface BrandFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  initialData?: any
}

export function BrandForm({ isOpen, onClose, onSubmit, initialData }: BrandFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    logo: initialData?.logo || "",
    status: initialData?.status || "Active",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-background/80 z-40"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-card rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600 shadow-sm">
                <Tag className="h-5 w-5" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  {initialData ? "Edit Brand" : "Add Brand"}
                </h3>
                <p className="text-xs text-slate-500">Fill in the brand details</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-slate-400" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Brand Name <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-10 px-3 text-sm border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                placeholder="e.g., Coca Cola"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                rows={3}
                placeholder="Describe this brand..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Logo Text
              </label>
              <Input
                type="text"
                value={formData.logo}
                onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                className="h-10 px-3 text-sm border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                placeholder="e.g., Coca Cola"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 h-10 border-slate-200 text-slate-700 hover:bg-slate-50 transition-all"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10 bg-purple-600 hover:bg-purple-700 text-sm font-semibold shadow-sm hover:shadow-md transition-all"
              >
                {initialData ? "Update Brand" : "Add Brand"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
