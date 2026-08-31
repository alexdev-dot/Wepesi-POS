"use client"

import { useState } from "react"
import { X, CreditCard, Smartphone, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const paymentMethods = [
  { id: "mpesa", name: "M-Pesa", icon: Smartphone, description: "Pay via M-Pesa mobile money" },
  { id: "card", name: "Credit/Debit Card", icon: CreditCard, description: "Visa, Mastercard, or other cards" },
]

interface SubscriptionPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  planName: string
  planPrice: string
  planPeriod: string
  onPaymentComplete: () => void
}

export function SubscriptionPaymentModal({
  isOpen,
  onClose,
  planName,
  planPrice,
  planPeriod,
  onPaymentComplete,
}: SubscriptionPaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState("mpesa")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  if (!isOpen) return null

  function handlePayment(e: React.FormEvent) {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setPaymentSuccess(true)
      
      // Auto-close after success
      setTimeout(() => {
        onPaymentComplete()
        setPaymentSuccess(false)
        onClose()
      }, 2000)
    }, 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-4 sm:p-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">Complete Payment</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {planName} - {planPrice} {planPeriod}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            disabled={isProcessing || paymentSuccess}
          >
            <X className="h-5 w-5 text-slate-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {paymentSuccess ? (
            <div className="text-center py-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Payment Successful!</h3>
              <p className="text-sm text-slate-600">Your subscription has been activated.</p>
            </div>
          ) : (
            <form onSubmit={handlePayment} className="space-y-4 sm:space-y-5">
              {/* Payment Method Selection */}
              <div>
                <Label className="text-xs sm:text-sm font-semibold text-slate-900 mb-2 sm:mb-3 block">
                  Payment Method
                </Label>
                <div className="space-y-2">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setSelectedMethod(method.id)}
                        className={`
                          w-full p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 text-left
                          ${selectedMethod === method.id
                            ? 'border-primary bg-primary/5'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                          }
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`
                            flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl
                            ${selectedMethod === method.id ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'}
                          `}>
                            <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-sm sm:text-base font-semibold text-slate-900">{method.name}</h3>
                            <p className="text-xs sm:text-sm text-slate-600">{method.description}</p>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Payment Details */}
              {selectedMethod === "mpesa" && (
                <div>
                  <Label className="text-xs sm:text-sm font-semibold text-slate-900 mb-2 block">
                    M-Pesa Phone Number
                  </Label>
                  <Input
                    type="tel"
                    placeholder="07XX XXX XXX"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="h-10 sm:h-11 rounded-lg border text-sm font-medium"
                    required
                  />
                  <p className="text-[10px] sm:text-xs text-slate-500 mt-2">
                    You will receive an STK prompt on your phone to confirm payment
                  </p>
                </div>
              )}

              {selectedMethod === "card" && (
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <Label className="text-xs sm:text-sm font-semibold text-slate-900 mb-2 block">
                      Card Number
                    </Label>
                    <Input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="h-10 sm:h-11 rounded-lg border text-sm font-medium"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs sm:text-sm font-semibold text-slate-900 mb-2 block">
                        Expiry Date
                      </Label>
                      <Input
                        type="text"
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        className="h-10 sm:h-11 rounded-lg border text-sm font-medium"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-xs sm:text-sm font-semibold text-slate-900 mb-2 block">
                        CVV
                      </Label>
                      <Input
                        type="text"
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="h-10 sm:h-11 rounded-lg border text-sm font-medium"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Order Summary */}
              <div className="bg-slate-50 rounded-lg p-3 sm:p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs sm:text-sm text-slate-600">Plan</span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-900">{planName}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs sm:text-sm text-slate-600">Billing</span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-900">{planPeriod}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                  <span className="text-xs sm:text-sm font-semibold text-slate-900">Total</span>
                  <span className="text-sm sm:text-base font-bold text-primary">{planPrice}</span>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full h-10 sm:h-11 rounded-lg text-xs sm:text-sm font-semibold bg-primary hover:bg-primary/90 transition-all"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Pay ${planPrice}`
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
