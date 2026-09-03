"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, ShoppingCart, Plus, Trash2 } from "lucide-react"

interface PurchaseFormItem {
  id: string
  name: string
  quantity: number
  costPrice: number
  total: number
}

interface PurchaseFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

export function PurchaseForm({ isOpen, onClose, onSubmit }: PurchaseFormProps) {
  const [formData, setFormData] = useState({
    supplier: "",
    date: new Date().toISOString().split('T')[0],
    status: "Pending",
    paymentStatus: "Unpaid",
    notes: "",
  })

  const [items, setItems] = useState<PurchaseFormItem[]>([])
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: 1,
    costPrice: 0,
  })

  const handleAddItem = () => {
    if (!newItem.name || newItem.quantity <= 0 || newItem.costPrice <= 0) return

    const total = newItem.quantity * newItem.costPrice
    const item: PurchaseFormItem = {
      id: Date.now().toString(),
      name: newItem.name,
      quantity: newItem.quantity,
      costPrice: newItem.costPrice,
      total,
    }

    setItems([...items, item])
    setNewItem({ name: "", quantity: 1, costPrice: 0 })
  }

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const getTotalAmount = () => {
    return items.reduce((sum, item) => sum + item.total, 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      items,
      total: getTotalAmount(),
    })
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
        <div className="bg-card rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-border flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600 shadow-sm  ">
                <ShoppingCart className="h-5 w-5" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">New Purchase Order</h3>
                <p className="text-xs text-muted-foreground">Create a new purchase order</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* Supplier */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Supplier <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.supplier}
                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                className="w-full px-3 py-2.5 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                required
              >
                <option value="">Select Supplier</option>
                <option>Brookside Dairy</option>
                <option>Coca Cola Ltd</option>
                <option>BakeHouse</option>
                <option>Double A Paper</option>
                <option>Colgate Palmolive</option>
                <option>Dettol Ltd</option>
                <option>Samsung Electronics</option>
                <option>Lays Snacks</option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Order Date <span className="text-red-500">*</span>
              </label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="h-10 px-3 text-sm border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                required
              />
            </div>

            {/* Add Item Section */}
            <div className="rounded-xl border border-border bg-muted p-4">
              <h4 className="text-sm font-semibold text-foreground mb-3">Add Items</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-medium text-foreground mb-1">Item Name</label>
                  <Input
                    type="text"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    className="h-10 px-3 text-sm border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                    placeholder="Item name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Quantity</label>
                  <Input
                    type="number"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 0 })}
                    className="h-10 px-3 text-sm border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                    placeholder="Qty"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Cost Price</label>
                  <Input
                    type="number"
                    value={newItem.costPrice}
                    onChange={(e) => setNewItem({ ...newItem, costPrice: parseFloat(e.target.value) || 0 })}
                    className="h-10 px-3 text-sm border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                    placeholder="Price"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              <Button
                type="button"
                onClick={handleAddItem}
                className="mt-3 h-9 w-full bg-green-600 hover:bg-green-700 text-sm font-semibold shadow-sm hover:shadow-md transition-all"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>

            {/* Items List */}
            {items.length > 0 && (
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted border-b border-border">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-muted-foreground uppercase">Item</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-muted-foreground uppercase">Qty</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-muted-foreground uppercase">Cost</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-muted-foreground uppercase">Total</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-muted-foreground uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-3 text-sm text-foreground">{item.name}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{item.quantity}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">KSh {item.costPrice.toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-foreground">KSh {item.total.toFixed(2)}</td>
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="p-1.5  hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-muted border-t border-border">
                    <tr>
                      <td colSpan={3} className="px-4 py-3 text-sm font-semibold text-foreground text-right">Total Amount</td>
                      <td className="px-4 py-3 text-sm font-bold text-green-600 ">KSh {getTotalAmount().toFixed(2)}</td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}

            {/* Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Order Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Payment Status
                </label>
                <select
                  value={formData.paymentStatus}
                  onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                >
                  <option value="Unpaid">Unpaid</option>
                  <option value="Partial">Partial</option>
                  <option value="Paid">Paid</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2.5 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all resize-none"
                rows={3}
                placeholder="Add any additional notes..."
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 shrink-0">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 h-10 border-border text-foreground hover:bg-muted transition-all"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10 bg-green-600 hover:bg-green-700 text-sm font-semibold shadow-sm hover:shadow-md transition-all"
                disabled={items.length === 0}
              >
                Create Purchase Order
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
