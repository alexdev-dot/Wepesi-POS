"use client"

import { useState } from "react"
import { X, CreditCard, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

interface PaymentPopupProps {
  isOpen: boolean
  onClose: () => void
  total: number
  onCompletePayment: (paymentData: { amountReceived: number; paymentMethod: string; phoneNumber: string }) => void
}

export function PaymentPopup({ isOpen, onClose, total, onCompletePayment }: PaymentPopupProps) {
  const [amountReceived, setAmountReceived] = useState(total)
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [paymentDropdownOpen, setPaymentDropdownOpen] = useState(false)

  const paymentMethods = [
    { value: 'cash', label: 'Cash', icon: '/icons/dollars.png' },
    { value: 'card', label: 'Card', icon: '/icons/atm-card.png' },
    { value: 'mpesa', label: 'M-Pesa', icon: '/icons/mpesa.png' },
  ]

  const selectedPayment = paymentMethods.find(m => m.value === paymentMethod) || paymentMethods[0]
  const change = amountReceived - total

  if (!isOpen) return null

  const handleCompletePayment = () => {
    onCompletePayment({
      amountReceived,
      paymentMethod,
      phoneNumber
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Complete Payment</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-slate-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Total Amount */}
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <div className="text-sm text-slate-600 mb-1">Total Amount</div>
            <div className="text-2xl font-bold text-slate-900">KSh {total.toFixed(2)}</div>
          </div>

          {/* Amount Received */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Amount Received</label>
            <Input
              type="number"
              value={amountReceived || ''}
              onChange={(e) => setAmountReceived(parseFloat(e.target.value) || 0)}
              className="h-11 w-full px-4 text-sm border rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
              min="0"
              step="0.01"
            />
          </div>

          {/* Change */}
          <div className="flex items-center justify-between text-sm p-3 bg-slate-50 rounded-lg">
            <span className="text-slate-600">Change</span>
            <span className={`font-semibold ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              KSh {change.toFixed(2)}
            </span>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Payment Method</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setPaymentDropdownOpen(!paymentDropdownOpen)}
                className="h-11 w-full px-4 text-sm border rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <img 
                    src={selectedPayment.icon} 
                    alt={selectedPayment.label} 
                    className={`object-contain ${selectedPayment.value === 'mpesa' ? 'h-7 w-7' : 'h-5 w-5'}`} 
                  />
                  <span>{selectedPayment.label}</span>
                </div>
                <motion.div
                  animate={{ rotate: paymentDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </motion.div>
              </button>

              {paymentDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden"
                >
                  {paymentMethods.map((method) => (
                    <button
                      key={method.value}
                      type="button"
                      onClick={() => {
                        setPaymentMethod(method.value)
                        setPaymentDropdownOpen(false)
                      }}
                      className="w-full px-4 py-2.5 text-sm text-left hover:bg-slate-50 transition-colors flex items-center gap-2"
                    >
                      <img 
                        src={method.icon} 
                        alt={method.label} 
                        className={`object-contain ${method.value === 'mpesa' ? 'h-7 w-7' : 'h-5 w-5'}`} 
                      />
                      <span className="text-slate-700">{method.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          {/* Phone Number */}
          {paymentMethod !== 'cash' && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Phone Number ({paymentMethod === 'mpesa' ? 'M-Pesa' : 'Card'})
              </label>
              <Input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="h-11 w-full px-4 text-sm border rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                placeholder="07XX XXX XXX"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-4 border-t border-slate-200">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 h-11 border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCompletePayment}
            disabled={amountReceived < total}
            className="flex-1 h-11 bg-green-600 hover:bg-green-700 text-sm font-semibold shadow-sm hover:shadow-md transition-all"
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Complete Payment
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
