"use client"

import { Printer, Eye, Trash2, DollarSign, CreditCard, Smartphone, Receipt, Package, Calendar, User, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export interface SaleItem {
  name: string
  qty: number
  price: number
  total: number
}

export interface SaleDetails {
  id: string
  date: string
  cashier: string
  customer: string
  itemsList: SaleItem[]
  discount: number
  tax: number
  total: number
  paymentMethod: string
  amountPaid: number
  change: number
}

interface SaleDetailsPaneProps {
  selectedSale: SaleDetails | null
  onClose: () => void
}

export function SaleDetailsPane({ selectedSale, onClose }: SaleDetailsPaneProps) {
  const getPaymentIcon = (method: string) => {
    switch (method) {
      case "Cash": return DollarSign
      case "M-Pesa": return Smartphone
      case "Card": return CreditCard
      default: return Receipt
    }
  }

  if (!selectedSale) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-8"
      >
        <Receipt className="h-16 w-16 mb-4 text-slate-300" />
        <p className="text-sm font-medium">Select a sale to view details</p>
      </motion.div>
    )
  }

  const subtotal = selectedSale.total - selectedSale.tax + selectedSale.discount

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex flex-col bg-white"
    >
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Receipt Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="px-6 py-5 border-b border-slate-100 bg-linear-to-r from-blue-50 to-white"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600 shadow-sm"
              >
                <Receipt className="h-5 w-5" strokeWidth={2} />
              </motion.div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">{selectedSale.id}</h3>
                <p className="text-xs text-slate-500">Receipt Number</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <motion.div whileHover={{ x: 2 }} className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-slate-400" />
              <div>
                <p className="text-xs text-slate-500">Date & Time</p>
                <p className="text-sm font-medium text-slate-900">{selectedSale.date}</p>
              </div>
            </motion.div>
            <motion.div whileHover={{ x: 2 }} className="flex items-center gap-2">
              <User className="h-4 w-4 text-slate-400" />
              <div>
                <p className="text-xs text-slate-500">Cashier</p>
                <p className="text-sm font-medium text-slate-900">{selectedSale.cashier}</p>
              </div>
            </motion.div>
            <motion.div whileHover={{ x: 2 }} className="flex items-center gap-2">
              <Package className="h-4 w-4 text-slate-400" />
              <div>
                <p className="text-xs text-slate-500">Items</p>
                <p className="text-sm font-medium text-slate-900">{selectedSale.itemsList.length} items</p>
              </div>
            </motion.div>
            <motion.div whileHover={{ x: 2 }} className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-slate-400" />
              <div>
                <p className="text-xs text-slate-500">Customer</p>
                <p className="text-sm font-medium text-slate-900">{selectedSale.customer}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Items List */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="px-6 py-5 border-b border-slate-100"
        >
          <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Package className="h-4 w-4" />
            Items Purchased
          </h4>
          <div className="space-y-3">
            {selectedSale.itemsList.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.25 + index * 0.05 }}
                whileHover={{ x: 2, backgroundColor: "#f8fafc" }}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 cursor-pointer"
              >
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {item.qty} × KSh {item.price.toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">KSh {item.total.toFixed(2)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Payment Summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.35 }}
          className="px-6 py-5 border-b border-slate-100"
        >
          <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Payment Summary
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-medium text-slate-900">KSh {subtotal.toFixed(2)}</span>
            </div>
            {selectedSale.discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Discount</span>
                <span className="font-medium text-green-600">-KSh {selectedSale.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Tax (16%)</span>
              <span className="font-medium text-slate-900">KSh {selectedSale.tax.toFixed(2)}</span>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="flex justify-between text-lg font-bold text-slate-900 pt-3 border-t border-slate-200"
            >
              <span>Total</span>
              <span className="text-blue-600">KSh {selectedSale.total.toFixed(2)}</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Payment Method Details */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.45 }}
          className="px-6 py-5"
        >
          <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Payment Details
          </h4>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-linear-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm"
              >
                {(() => {
                  const Icon = getPaymentIcon(selectedSale.paymentMethod)
                  return <Icon className="h-5 w-5 text-slate-700" strokeWidth={2} />
                })()}
              </motion.div>
              <span className="text-sm font-semibold text-slate-900">{selectedSale.paymentMethod}</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Amount Paid</span>
                <span className="font-semibold text-slate-900">KSh {selectedSale.amountPaid.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Change</span>
                <span className={cn(
                  "font-semibold",
                  selectedSale.change > 0 ? "text-green-600" : "text-slate-900"
                )}>
                  KSh {selectedSale.change.toFixed(2)}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.55 }}
        className="px-6 py-4 border-t border-slate-200 bg-slate-50 space-y-2"
      >
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-sm font-semibold shadow-sm hover:shadow-md">
            <Printer className="h-4 w-4" />
            Print Receipt
          </button>
        </motion.div>
        <div className="grid grid-cols-2 gap-2">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-all text-sm font-medium shadow-sm">
              <Eye className="h-4 w-4" />
              View
            </button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-all text-sm font-medium shadow-sm">
              <Trash2 className="h-4 w-4" />
              Refund
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
