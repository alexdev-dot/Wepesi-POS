"use client"

import { useState } from "react"
import { X, RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ReceiptPreviewPopupProps {
  isOpen: boolean
  onClose: () => void
  selectedTemplate: string
  backReceiptData?: {
    title: string
    text: string
    email: string
    website: string
  }
}

export function ReceiptPreviewPopup({ isOpen, onClose, selectedTemplate, backReceiptData }: ReceiptPreviewPopupProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Receipt Preview</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFlipped(!isFlipped)}
              className="h-8 px-3 border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              <RotateCw className="h-4 w-4 mr-2" />
              {isFlipped ? "Front" : "Back"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-slate-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex justify-center perspective-1000">
            <div 
              className={`relative transition-transform duration-500 transform-style-3d ${isFlipped ? "rotate-y-180" : ""}`}
              style={{ transformStyle: "preserve-3d", transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
            >
              {/* Front Side */}
              <div 
                className={`${selectedTemplate === "thermal-58mm" ? "w-56" : "w-80"} bg-white border border-slate-200 rounded-lg p-4 shadow-sm backface-hidden`}
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="text-center mb-4">
                  <div className="font-bold text-lg mb-1">MY BUSINESS</div>
                  <div className="text-xs text-slate-500">123 Main Street, Nairobi</div>
                  <div className="text-xs text-slate-500">Tel: +254 700 000 000</div>
                </div>
                <div className="border-t border-b border-slate-300 py-2 mb-4 text-xs">
                  <div className="flex justify-between">
                    <span>Receipt #: 12345</span>
                    <span>Date: 30/05/2025</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>Cashier: Alex</span>
                    <span>Time: 11:30 PM</span>
                  </div>
                </div>
                <div className="space-y-2 text-xs mb-4">
                  <div className="flex justify-between">
                    <span>Coca Cola 500ml x2</span>
                    <span>KSh 240</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bread Loaf x1</span>
                    <span>KSh 80</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Milk 1L x1</span>
                    <span>KSh 120</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal</span>
                    <span>KSh 440</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Tax (16%)</span>
                    <span>KSh 70.40</span>
                  </div>
                  <div className="flex justify-between font-bold text-base border-t border-slate-300 pt-2">
                    <span>TOTAL</span>
                    <span>KSh 510.40</span>
                  </div>
                </div>
                <div className="border-t border-slate-300 pt-2 text-center text-xs text-slate-500">
                  <div className="mb-1">Paid: Cash</div>
                  <div>Thank you for your business!</div>
                </div>
              </div>

              {/* Back Side */}
              <div
                className={`${selectedTemplate === "thermal-58mm" ? "w-56" : "w-80"} bg-white border border-slate-200 rounded-lg p-4 shadow-sm absolute top-0 left-0 backface-hidden`}
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <div className="text-center py-8">
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 mb-4">
                    <div className="text-slate-400 text-xs mb-2">Back of Receipt</div>
                    <div className="text-slate-300 text-4xl mb-2">📄</div>
                    <div className="text-slate-400 text-xs">Custom back image or text</div>
                  </div>
                  <div className="text-xs text-slate-500 space-y-1">
                    <div className="font-semibold text-slate-700">{backReceiptData?.title || "Return Policy"}</div>
                    <div>{backReceiptData?.text || "Returns accepted within 7 days with original receipt"}</div>
                  </div>
                  <div className="mt-4 text-xs text-slate-500">
                    <div className="font-semibold text-slate-700 mb-1">Contact Us</div>
                    <div>Email: {backReceiptData?.email || "support@mybusiness.com"}</div>
                    <div>Website: {backReceiptData?.website || "www.mybusiness.com"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 border-t border-slate-200">
          <Button
            variant="outline"
            onClick={onClose}
            className="h-10 border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
