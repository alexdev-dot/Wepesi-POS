"use client"

import { useState } from "react"
import { X, Plus, Trash2, CheckCircle, Sparkles, Zap, Crown, Save } from "lucide-react"

interface PlanFormProps {
  mode?: "create" | "edit"
  initialData?: {
    name?: string
    price?: number
    period?: "month" | "year"
    description?: string
    features?: string[]
    popular?: boolean
    color?: "slate" | "blue" | "purple"
  }
  onSave?: (data: PlanFormData) => void
  onCancel?: () => void
}

export interface PlanFormData {
  name: string
  price: number
  period: "month" | "year"
  description: string
  features: string[]
  popular: boolean
  color: "slate" | "blue" | "purple"
}

const colorOptions = [
  { value: "slate" as const, label: "Slate", icon: Sparkles, bgColor: "bg-slate-100", textColor: "text-slate-600" },
  { value: "blue" as const, label: "Blue", icon: Zap, bgColor: "bg-blue-100", textColor: "text-blue-600" },
  { value: "purple" as const, label: "Purple", icon: Crown, bgColor: "bg-purple-100", textColor: "text-purple-600" }
]

export function PlanForm({ mode = "create", initialData, onSave, onCancel }: PlanFormProps) {
  const [formData, setFormData] = useState<PlanFormData>({
    name: initialData?.name || "",
    price: initialData?.price || 0,
    period: initialData?.period || "month",
    description: initialData?.description || "",
    features: initialData?.features || [""],
    popular: initialData?.popular || false,
    color: initialData?.color || "slate"
  })

  const [errors, setErrors] = useState<Partial<Record<keyof PlanFormData, string>>>({})

  const validateForm = () => {
    const newErrors: Partial<Record<keyof PlanFormData, string>> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Plan name is required"
    }

    if (formData.price <= 0) {
      newErrors.price = "Price must be greater than 0"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    const validFeatures = formData.features.filter(f => f.trim())
    if (validFeatures.length === 0) {
      newErrors.features = "At least one feature is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      const cleanData = {
        ...formData,
        features: formData.features.filter(f => f.trim())
      }
      onSave?.(cleanData)
    }
  }

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, ""]
    }))
  }

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((f, i) => i === index ? value : f)
    }))
  }

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200">
        <div className="flex-1 min-w-0">
          <h2 className="text-base sm:text-lg font-semibold text-slate-800">
            {mode === "create" ? "Create New Plan" : "Edit Plan"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {mode === "create" ? "Add a new subscription plan" : "Update plan details"}
          </p>
        </div>
        <button
          onClick={onCancel}
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all shrink-0"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Plan Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Plan Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="e.g., Professional, Enterprise"
            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all text-sm ${
              errors.name ? "border-red-300 focus:ring-red-500/20" : "border-slate-200"
            }`}
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>

        {/* Price and Period */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Price <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                placeholder="0.00"
                step="0.01"
                min="0"
                className={`w-full pl-8 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all text-sm ${
                  errors.price ? "border-red-300 focus:ring-red-500/20" : "border-slate-200"
                }`}
              />
            </div>
            {errors.price && <p className="mt-1 text-xs text-red-600">{errors.price}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Billing Period <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.period}
              onChange={(e) => setFormData(prev => ({ ...prev, period: e.target.value as "month" | "year" }))}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all text-sm bg-white"
            >
              <option value="month">Monthly</option>
              <option value="year">Yearly</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Brief description of this plan..."
            rows={3}
            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all text-sm resize-none ${
              errors.description ? "border-red-300 focus:ring-red-500/20" : "border-slate-200"
            }`}
          />
          {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
        </div>

        {/* Features */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mb-2">
            <label className="block text-sm font-medium text-slate-700">
              Features <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              onClick={addFeature}
              className="flex items-center gap-1 text-xs font-medium text-green-600 hover:text-green-700 transition-colors self-start sm:self-auto"
            >
              <Plus className="h-3 w-3" />
              Add Feature
            </button>
          </div>
          <div className="space-y-2">
            {formData.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  placeholder="e.g., Up to 25 users"
                  className="flex-1 min-w-0 px-3 sm:px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all text-sm"
                />
                {formData.features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          {errors.features && <p className="mt-1 text-xs text-red-600">{errors.features}</p>}
        </div>

        {/* Color Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Plan Color
          </label>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {colorOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, color: option.value }))}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border-2 transition-all flex-1 sm:flex-none ${
                  formData.color === option.value
                    ? "border-green-500 bg-green-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className={`p-1.5 rounded ${option.bgColor} ${option.textColor}`}>
                  <option.icon className="h-4 w-4" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-700">{option.label}</span>
                {formData.color === option.value && (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Popular Toggle */}
        <div className="flex items-center justify-between p-3 sm:p-4 bg-slate-50 rounded-lg border border-slate-200">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-slate-800">Mark as Popular</h3>
            <p className="text-xs text-slate-500">Highlight this plan as the most popular choice</p>
          </div>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, popular: !prev.popular }))}
            className={`relative w-12 h-6 rounded-full transition-colors shrink-0 ${
              formData.popular ? "bg-green-500" : "bg-slate-300"
            }`}
          >
            <div
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                formData.popular ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-4 py-2.5 text-sm font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-linear-to-r from-green-500 to-emerald-600 text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-green-500/30 transition-all"
          >
            <Save className="h-4 w-4" />
            {mode === "create" ? "Create Plan" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  )
}
