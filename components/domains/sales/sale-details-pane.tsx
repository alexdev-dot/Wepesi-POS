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
        className="w-full h-full flex flex-col items-center justify-center text-muted-foreground p-8"
      >
        <Receipt className="h-16 w-16 mb-4 text-muted-foreground/50" />
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
      className="w-full h-full flex flex-col bg-card"
    >
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Receipt Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="px-6 py-5 border-b border-border bg-linear-to-r from-blue-50 to-white"
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
                <h3 className="text-base font-semibold text-foreground">{selectedSale.id}</h3>
                <p className="text-xs text-muted-foreground">Receipt Number</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <motion.div whileHover={{ x: 2 }} className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Date & Time</p>
                <p className="text-sm font-medium text-foreground">{selectedSale.date}</p>
              </div>
            </motion.div>
            <motion.div whileHover={{ x: 2 }} className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Cashier</p>
                <p className="text-sm font-medium text-foreground">{selectedSale.cashier}</p>
              </div>
            </motion.div>
            <motion.div whileHover={{ x: 2 }} className="flex items-center gap-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Items</p>
                <p className="text-sm font-medium text-foreground">{selectedSale.itemsList.length} items</p>
              </div>
            </motion.div>
            <motion.div whileHover={{ x: 2 }} className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Customer</p>
                <p className="text-sm font-medium text-foreground">{selectedSale.customer}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Items List */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="px-6 py-5 border-b border-border"
        >
          <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
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
                whileHover={{ x: 2, backgroundColor: "var(--muted)" }}
                className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border cursor-pointer"
              >
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.qty} × KSh {item.price.toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">KSh {item.total.toFixed(2)}</p>
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
          className="px-6 py-5 border-b border-border"
        >
          <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Payment Summary
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium text-foreground">KSh {subtotal.toFixed(2)}</span>
            </div>
            {selectedSale.discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Discount</span>
                <span className="font-medium text-green-600 ">-KSh {selectedSale.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax (16%)</span>
              <span className="font-medium text-foreground">KSh {selectedSale.tax.toFixed(2)}</span>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="flex justify-between text-lg font-bold text-foreground pt-3 border-t border-border"
            >
              <span>Total</span>
              <span className="text-blue-600 ">KSh {selectedSale.total.toFixed(2)}</span>
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
          <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Payment Details
          </h4>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-linear-to-br from-muted to-muted/50 rounded-xl p-4 border border-border"
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-card shadow-sm"
              >
                {(() => {
                  const Icon = getPaymentIcon(selectedSale.paymentMethod)
                  return <Icon className="h-5 w-5 text-foreground" strokeWidth={2} />
                })()}
              </motion.div>
              <span className="text-sm font-semibold text-foreground">{selectedSale.paymentMethod}</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Amount Paid</span>
                <span className="font-semibold text-foreground">KSh {selectedSale.amountPaid.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Change</span>
                <span className={cn(
                  "font-semibold",
                  selectedSale.change > 0 ? "text-green-600 " : "text-foreground"
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
        className="px-6 py-4 border-t border-border bg-muted space-y-2"
      >
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-sm font-semibold shadow-sm hover:shadow-md">
            <Printer className="h-4 w-4" />
            Print Receipt
          </button>
        </motion.div>
        <div className="grid grid-cols-2 gap-2">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-card border border-border text-foreground rounded-xl hover:bg-muted transition-all text-sm font-medium shadow-sm">
              <Eye className="h-4 w-4" />
              View
            </button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-card border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-all text-sm font-medium shadow-sm">
              <Trash2 className="h-4 w-4" />
              Refund
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
