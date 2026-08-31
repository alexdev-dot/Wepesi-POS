"use client"

import { useState } from "react"
import { X, Printer, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  total: number
  image: string | null
}

interface ReceiptPopupProps {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  subtotal: number
  discount: number
  tax: number
  total: number
  amountReceived: number
  change: number
  paymentMethod: string
  phoneNumber: string
}

export function ReceiptPopup({
  isOpen,
  onClose,
  cartItems,
  subtotal,
  discount,
  tax,
  total,
  amountReceived,
  change,
  paymentMethod,
  phoneNumber
}: ReceiptPopupProps) {
  const [isPrinting, setIsPrinting] = useState(false)

  if (!isOpen) return null

  const handlePrint = () => {
    setIsPrinting(true)
    setTimeout(() => {
      window.print()
      setIsPrinting(false)
    }, 100)
  }

  const formatDate = () => {
    const now = new Date()
    return now.toLocaleString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getPaymentMethodLabel = (method: string) => {
    const labels: { [key: string]: string } = {
      'cash': 'Cash',
      'card': 'Card',
      'mpesa': 'M-Pesa'
    }
    return labels[method] || method
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Receipt</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-slate-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Receipt Content */}
        <div className="p-6" id="receipt-content">
          {/* Store Info */}
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-slate-900 mb-1">POS System</h3>
            <p className="text-sm text-slate-600">Your One-Stop Shop</p>
            <p className="text-xs text-slate-500 mt-1">{formatDate()}</p>
          </div>

          {/* Items */}
          <div className="border-t border-b border-slate-200 py-4 mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-600 font-medium">
                  <th className="pb-2">Item</th>
                  <th className="pb-2 text-center">Qty</th>
                  <th className="pb-2 text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-t border-slate-100">
                    <td className="py-2 text-slate-900">{item.name}</td>
                    <td className="py-2 text-center text-slate-600">{item.quantity}</td>
                    <td className="py-2 text-right text-slate-900">
                      KSh {(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>KSh {subtotal.toFixed(2)}</span>
            </div>
            {tax > 0 && (
              <div className="flex justify-between text-slate-600">
                <span>Tax (16%)</span>
                <span>KSh {tax.toFixed(2)}</span>
              </div>
            )}
            {discount > 0 && (
              <div className="flex justify-between text-orange-600">
                <span>Discount</span>
                <span>-KSh {discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t border-slate-200 font-bold text-slate-900 text-base">
              <span>Total</span>
              <span>KSh {total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Info */}
          <div className="border-t border-slate-200 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Payment Method</span>
              <span className="font-medium text-slate-900">{getPaymentMethodLabel(paymentMethod)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Amount Received</span>
              <span className="font-medium text-slate-900">KSh {amountReceived.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Change</span>
              <span className={`font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                KSh {change.toFixed(2)}
              </span>
            </div>
            {phoneNumber && (
              <div className="flex justify-between text-slate-600">
                <span>Phone Number</span>
                <span className="font-medium text-slate-900">{phoneNumber}</span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="text-center mt-6 pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-500">Thank you for your purchase!</p>
            <p className="text-xs text-slate-400 mt-1">Powered by POS System v2.0</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 p-4 border-t border-slate-200">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 h-11 border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            Close
          </Button>
          <Button
            onClick={handlePrint}
            disabled={isPrinting}
            className="flex-1 h-11 bg-green-600 hover:bg-green-700 text-sm font-semibold shadow-sm hover:shadow-md transition-all"
          >
            <Printer className="h-4 w-4 mr-2" />
            {isPrinting ? 'Printing...' : 'Print Receipt'}
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
