"use client"

import { useState } from "react"
import { X, Plus, Trash2, Save, FileText, Calendar, DollarSign, User, Building2, CheckCircle } from "lucide-react"

interface InvoiceFormProps {
  mode?: "create" | "edit"
  initialData?: {
    invoiceId?: string
    tenantId?: string
    tenantName?: string
    tenantEmail?: string
    plan?: string
    amount?: number
    dueDate?: string
    description?: string
    items?: InvoiceItem[]
  }
  onSave?: (data: InvoiceFormData) => void
  onCancel?: () => void
}

export interface InvoiceItem {
  id: string
  description: string
  quantity: number
  price: number
  total: number
}

export interface InvoiceFormData {
  invoiceId?: string
  tenantId: string
  tenantName: string
  tenantEmail: string
  plan: string
  amount: number
  dueDate: string
  description: string
  items: InvoiceItem[]
}

const tenants = [
  { id: "1", name: "Tech Solutions Ltd", email: "contact@techsolutions.com" },
  { id: "2", name: "Retail Store ABC", email: "info@retailabc.com" },
  { id: "3", name: "Restaurant XYZ", email: "manager@restaurantxyz.com" },
  { id: "4", name: "Grocery Store 123", email: "admin@grocery123.com" },
  { id: "5", name: "Fashion Boutique", email: "sales@fashionboutique.com" },
  { id: "6", name: "Coffee Shop Chain", email: "ops@coffeeshop.com" }
]

const plans = [
  { value: "Starter", price: 29 },
  { value: "Professional", price: 79 },
  { value: "Enterprise", price: 199 }
]

export function InvoiceForm({ mode = "create", initialData, onSave, onCancel }: InvoiceFormProps) {
  const [formData, setFormData] = useState<InvoiceFormData>({
    invoiceId: initialData?.invoiceId || `INV-${Date.now().toString().slice(-6)}`,
    tenantId: initialData?.tenantId || "",
    tenantName: initialData?.tenantName || "",
    tenantEmail: initialData?.tenantEmail || "",
    plan: initialData?.plan || "Professional",
    amount: initialData?.amount || 79,
    dueDate: initialData?.dueDate || "",
    description: initialData?.description || "",
    items: initialData?.items || [
      { id: "1", description: "Monthly Subscription", quantity: 1, price: 79, total: 79 }
    ]
  })

  const [errors, setErrors] = useState<Partial<Record<keyof InvoiceFormData, string>>>({})

  const handleTenantChange = (tenantId: string) => {
    const tenant = tenants.find(t => t.id === tenantId)
    if (tenant) {
      setFormData(prev => ({
        ...prev,
        tenantId,
        tenantName: tenant.name,
        tenantEmail: tenant.email
      }))
    }
  }

  const handlePlanChange = (plan: string) => {
    const selectedPlan = plans.find(p => p.value === plan)
    if (selectedPlan) {
      setFormData(prev => ({
        ...prev,
        plan,
        amount: selectedPlan.price,
        items: [
          { id: "1", description: `${plan} Monthly Subscription`, quantity: 1, price: selectedPlan.price, total: selectedPlan.price }
        ]
      }))
    }
  }

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      price: 0,
      total: 0
    }
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }))
  }

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === id) {
          const updated = { ...item, [field]: value }
          if (field === "quantity" || field === "price") {
            updated.total = (updated.quantity || 0) * (updated.price || 0)
          }
          return updated
        }
        return item
      })
    }))
  }

  const removeItem = (id: string) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }))
  }

  const calculateTotal = () => {
    return formData.items.reduce((sum, item) => sum + item.total, 0)
  }

  const validateForm = () => {
    const newErrors: Partial<Record<keyof InvoiceFormData, string>> = {}

    if (!formData.tenantId) {
      newErrors.tenantId = "Please select a tenant"
    }

    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required"
    }

    const validItems = formData.items.filter(item => item.description.trim())
    if (validItems.length === 0) {
      newErrors.items = "At least one item is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      const cleanData = {
        ...formData,
        amount: calculateTotal(),
        items: formData.items.filter(item => item.description.trim())
      }
      onSave?.(cleanData)
    }
  }

  return (
    <div className="bg-card rounded-xl border border-slate-200 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200">
        <div className="flex-1 min-w-0">
          <h2 className="text-base sm:text-lg font-semibold text-slate-800">
            {mode === "create" ? "Generate Invoice" : "Edit Invoice"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {mode === "create" ? "Create a new invoice for a tenant" : "Update invoice details"}
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
        {/* Invoice ID */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Invoice ID
          </label>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={formData.invoiceId}
              readOnly
              className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-600 text-sm"
            />
          </div>
        </div>

        {/* Tenant Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Tenant <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <select
              value={formData.tenantId}
              onChange={(e) => handleTenantChange(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all text-sm bg-card ${
                errors.tenantId ? "border-red-300 focus:ring-red-500/20" : "border-slate-200"
              }`}
            >
              <option value="">Select a tenant</option>
              {tenants.map(tenant => (
                <option key={tenant.id} value={tenant.id}>
                  {tenant.name} ({tenant.email})
                </option>
              ))}
            </select>
          </div>
          {errors.tenantId && <p className="mt-1 text-xs text-red-600">{errors.tenantId}</p>}
        </div>

        {/* Plan Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Subscription Plan
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {plans.map(plan => (
              <button
                key={plan.value}
                type="button"
                onClick={() => handlePlanChange(plan.value)}
                className={`p-3 sm:p-4 rounded-lg border-2 transition-all ${
                  formData.plan === plan.value
                    ? "border-green-500 bg-green-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="text-center">
                  <p className="text-sm sm:text-base font-medium text-slate-800">{plan.value}</p>
                  <p className="text-xs sm:text-sm text-slate-600">${plan.price}/mo</p>
                  {formData.plan === plan.value && (
                    <CheckCircle className="h-4 w-4 text-green-600 mx-auto mt-2" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Due Date <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
              className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all text-sm ${
                errors.dueDate ? "border-red-300 focus:ring-red-500/20" : "border-slate-200"
              }`}
            />
          </div>
          {errors.dueDate && <p className="mt-1 text-xs text-red-600">{errors.dueDate}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Description / Notes
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Add any notes or description for this invoice..."
            rows={3}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all text-sm resize-none"
          />
        </div>

        {/* Invoice Items */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mb-2">
            <label className="block text-sm font-medium text-slate-700">
              Invoice Items <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              onClick={addItem}
              className="flex items-center gap-1 text-xs font-medium text-green-600 hover:text-green-700 transition-colors self-start sm:self-auto"
            >
              <Plus className="h-3 w-3" />
              Add Item
            </button>
          </div>
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-125">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-3 sm:px-4 py-2 text-left text-xs font-semibold text-slate-600">Description</th>
                    <th className="px-3 sm:px-4 py-2 text-left text-xs font-semibold text-slate-600 w-20 sm:w-24">Qty</th>
                    <th className="px-3 sm:px-4 py-2 text-left text-xs font-semibold text-slate-600 w-24 sm:w-28">Price</th>
                    <th className="px-3 sm:px-4 py-2 text-left text-xs font-semibold text-slate-600 w-24 sm:w-28">Total</th>
                    <th className="px-3 sm:px-4 py-2 text-right text-xs font-semibold text-slate-600 w-10 sm:w-12"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {formData.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-3 sm:px-4 py-2">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateItem(item.id, "description", e.target.value)}
                          placeholder="Item description"
                          className="w-full min-w-37.5 px-2 sm:px-3 py-1.5 border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-green-500/20 text-sm"
                        />
                      </td>
                      <td className="px-3 sm:px-4 py-2">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, "quantity", parseFloat(e.target.value) || 0)}
                          min="1"
                          className="w-full px-2 sm:px-3 py-1.5 border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-green-500/20 text-sm"
                        />
                      </td>
                      <td className="px-3 sm:px-4 py-2">
                        <div className="relative">
                          <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs sm:text-sm">$</span>
                          <input
                            type="number"
                            value={item.price}
                            onChange={(e) => updateItem(item.id, "price", parseFloat(e.target.value) || 0)}
                            min="0"
                            step="0.01"
                            className="w-full pl-5 sm:pl-6 pr-2 sm:pr-3 py-1.5 border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-green-500/20 text-sm"
                          />
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-2">
                        <span className="text-xs sm:text-sm font-medium text-slate-800">${item.total.toFixed(2)}</span>
                      </td>
                      <td className="px-3 sm:px-4 py-2 text-right">
                        {formData.items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-all shrink-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {errors.items && <p className="mt-1 text-xs text-red-600">{errors.items}</p>}
        </div>

        {/* Total */}
        <div className="bg-slate-50 rounded-lg p-3 sm:p-4 border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">Total Amount</span>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
              <span className="text-xl sm:text-2xl font-bold text-slate-800">${calculateTotal().toFixed(2)}</span>
            </div>
          </div>
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
            {mode === "create" ? "Generate Invoice" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  )
}
