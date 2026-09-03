"use client"

import { useState } from "react"
import { X, CreditCard, Check } from "lucide-react"
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
  const [cardNumber, setCardNumber] = useState("")

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="bg-card rounded-xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Complete Payment</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Total Amount */}
          <div className="bg-muted rounded-lg p-4 border border-border">
            <div className="text-sm text-muted-foreground mb-1">Total Amount</div>
            <div className="text-2xl font-bold text-foreground">KSh {total.toFixed(2)}</div>
          </div>

          {/* Amount Received */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Amount Received</label>
            <Input
              type="number"
              value={amountReceived || ''}
              onChange={(e) => setAmountReceived(parseFloat(e.target.value) || 0)}
              className="h-11 w-full px-4 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
              min="0"
              step="0.01"
            />
          </div>

          {/* Change */}
          <div className="flex items-center justify-between text-sm p-3 bg-muted rounded-lg">
            <span className="text-muted-foreground">Change</span>
            <span className={`font-semibold ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              KSh {change.toFixed(2)}
            </span>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Payment Method</label>
            <div className="grid grid-cols-3 gap-3">
              {paymentMethods.map((method) => (
                <motion.button
                  key={method.value}
                  type="button"
                  onClick={() => setPaymentMethod(method.value)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    relative p-2 rounded-xl border-2 transition-all duration-200
                    ${paymentMethod === method.value
                      ? 'border-green-500 bg-green-50'
                      : 'border-border bg-card hover:border-green-300'
                    }
                  `}
                >
                  <div className="flex flex-col items-center gap-1">
                    <img
                      src={method.icon}
                      alt={method.label}
                      className={`object-contain ${method.value === 'mpesa' ? 'h-16 w-16' : 'h-6 w-6'}`}
                    />
                    <span className={`text-xs font-medium ${paymentMethod === method.value ? 'text-green-700' : 'text-foreground'}`}>
                      {method.label}
                    </span>
                  </div>
                  {paymentMethod === method.value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 h-5 w-5 bg-green-500 rounded-full flex items-center justify-center"
                    >
                      <Check className="h-3 w-3 text-white" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Card Number */}
          {paymentMethod === 'card' && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Card Number</label>
              <Input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="h-11 w-full px-4 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                placeholder="XXXX XXXX XXXX XXXX"
                maxLength={19}
              />
            </div>
          )}

          {/* M-Pesa Phone Number */}
          {paymentMethod === 'mpesa' && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">M-Pesa Phone Number</label>
              <Input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="h-11 w-full px-4 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                placeholder="07XX XXX XXX"
                maxLength={10}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-4 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 h-11 border-border text-foreground hover:bg-muted"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCompletePayment}
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
