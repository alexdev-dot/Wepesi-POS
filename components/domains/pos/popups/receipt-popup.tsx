"use client"

import { useState, useEffect } from "react"
import { X, Printer, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { getReceiptSettings, ReceiptSettings } from "@/lib/receipt-settings"
import html2canvas from "html2canvas"

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
  const [receiptSettings, setReceiptSettings] = useState<ReceiptSettings | null>(null)

  useEffect(() => {
    setReceiptSettings(getReceiptSettings())
  }, [])

  if (!isOpen) return null

  const handlePrint = () => {
    setIsPrinting(true)
    const printContent = document.getElementById('receipt-content')
    if (printContent) {
      const originalContents = document.body.innerHTML
      const printContents = printContent.innerHTML
      
      document.body.innerHTML = `
        <div style="max-width: 400px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          ${printContents}
        </div>
      `
      
      window.print()
      
      document.body.innerHTML = originalContents
      window.location.reload()
    }
    setTimeout(() => {
      setIsPrinting(false)
    }, 100)
  }

  const handleDownload = async () => {
    const receiptContent = document.getElementById('receipt-content')
    if (receiptContent) {
      try {
        const canvas = await html2canvas(receiptContent, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff'
        })
        
        const link = document.createElement('a')
        link.download = `receipt_${Date.now()}.png`
        link.href = canvas.toDataURL('image/png')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } catch (error) {
        console.error('Error generating receipt image:', error)
        // Fallback to text download if html2canvas fails
        const dataStr = receiptContent.innerText
        const dataUri = 'data:text/plain;charset=utf-8,' + encodeURIComponent(dataStr)
        const link = document.createElement('a')
        link.href = dataUri
        link.download = `receipt_${Date.now()}.txt`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    }
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

  const getFontSizeClass = () => {
    if (!receiptSettings) return 'text-sm'
    switch (receiptSettings.fontSize) {
      case 'small': return 'text-xs'
      case 'medium': return 'text-sm'
      case 'large': return 'text-base'
      default: return 'text-sm'
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="bg-card rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Receipt</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Receipt Content */}
        <div className="p-6" id="receipt-content">
          {/* Store Info */}
          <div className="text-center mb-6">
            {receiptSettings?.showLogo && receiptSettings.logo && (
              <img src={receiptSettings.logo} alt="Logo" className="h-16 w-auto mx-auto mb-2" />
            )}
            <h3 className="text-xl font-bold text-foreground mb-1">{receiptSettings?.businessName || 'POS System'}</h3>
            {receiptSettings?.showContactInfo && (
              <>
                <p className="text-sm text-muted-foreground">{receiptSettings.address}</p>
                <p className="text-xs text-muted-foreground">{receiptSettings.phone}</p>
              </>
            )}
            <p className="text-xs text-muted-foreground mt-1">{formatDate()}</p>
          </div>

          {/* Items */}
          <div className="border-t border-b border-border py-4 mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground font-medium">
                  <th className="pb-2">Item</th>
                  <th className="pb-2 text-center">Qty</th>
                  <th className="pb-2 text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-t border-border">
                    <td className="py-2 text-foreground">{item.name}</td>
                    <td className="py-2 text-center text-muted-foreground">{item.quantity}</td>
                    <td className="py-2 text-right text-foreground">
                      KSh {(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>KSh {subtotal.toFixed(2)}</span>
            </div>
            {tax > 0 && (
              <div className="flex justify-between text-muted-foreground">
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
            <div className="flex justify-between pt-2 border-t border-border font-bold text-foreground text-base">
              <span>Total</span>
              <span>KSh {total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Info */}
          <div className="border-t border-border pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Payment Method</span>
              <span className="font-medium text-foreground">{getPaymentMethodLabel(paymentMethod)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Amount Received</span>
              <span className="font-medium text-foreground">KSh {amountReceived.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Change</span>
              <span className={`font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                KSh {change.toFixed(2)}
              </span>
            </div>
            {phoneNumber && (
              <div className="flex justify-between text-muted-foreground">
                <span>Phone Number</span>
                <span className="font-medium text-foreground">{phoneNumber}</span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="text-center mt-6 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">{receiptSettings?.footerText || 'Thank you for your purchase!'}</p>
            {receiptSettings?.showContactInfo && (
              <div className="text-xs text-muted-foreground/60 mt-1">
                {receiptSettings.email && <p>{receiptSettings.email}</p>}
                {receiptSettings.website && <p>{receiptSettings.website}</p>}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 p-4 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 h-11 border-border text-foreground hover:bg-muted"
          >
            Close
          </Button>
          <Button
            variant="outline"
            onClick={handleDownload}
            className="flex-1 h-11 border-border text-foreground hover:bg-muted"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
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
