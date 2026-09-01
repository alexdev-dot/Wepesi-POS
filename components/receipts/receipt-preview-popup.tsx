"use client"

import { useState, useEffect, useRef } from "react"
import { X, RotateCw, Printer, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getReceiptSettings, ReceiptSettings } from "@/lib/receipt-settings"
import html2canvas from "html2canvas"

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
  const [receiptSettings, setReceiptSettings] = useState<ReceiptSettings | null>(null)
  const receiptRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setReceiptSettings(getReceiptSettings())
  }, [])

  const getFontSizeClass = () => {
    if (!receiptSettings) return 'text-xs'
    switch (receiptSettings.fontSize) {
      case 'small': return 'text-[10px]'
      case 'medium': return 'text-xs'
      case 'large': return 'text-sm'
      default: return 'text-xs'
    }
  }

  const formatDate = () => {
    const now = new Date()
    return now.toLocaleDateString('en-KE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const formatTime = () => {
    const now = new Date()
    return now.toLocaleTimeString('en-KE', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const generateClassicReceiptHTML = (width: string, fontSize: string) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Receipt</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Courier New', Courier, monospace;
            font-size: ${fontSize};
            color: #000;
            background: #fff;
            padding: 10px;
            width: ${width};
            margin: 0 auto;
          }
          .receipt { width: 100%; max-width: ${width}; }
          .center { text-align: center; }
          .bold { font-weight: bold; }
          .mb-1 { margin-bottom: 4px; }
          .mb-2 { margin-bottom: 8px; }
          .divider { border-top: 1px dashed #000; margin: 8px 0; }
          .row { display: flex; justify-content: space-between; margin-bottom: 2px; }
          .total {
            font-size: ${parseInt(fontSize) + 2}px;
            font-weight: bold;
            border-top: 2px solid #000;
            padding-top: 4px;
            margin-top: 8px;
          }
          .page-break {
            page-break-after: always;
            border-top: 3px solid #000;
            margin-top: 20px;
            padding-top: 20px;
          }
          @media print {
            body { margin: 0; padding: 5px; }
            @page { margin: 0; size: ${width} auto; }
          }
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="center mb-2">
            <div class="bold" style="font-size: ${parseInt(fontSize) + 4}px;">${receiptSettings?.businessName || 'WEPESI MART'}</div>
            ${receiptSettings?.showContactInfo ? `
              <div class="mb-1">${receiptSettings.address}</div>
              <div class="mb-1">Tel: ${receiptSettings.phone}</div>
            ` : ''}
          </div>
          
          <div class="divider"></div>
          
          <div class="row mb-1">
            <span>Receipt #: INV-001245</span>
            <span>Date: ${formatDate()}</span>
          </div>
          <div class="row mb-2">
            <span>${formatTime()}</span>
            <span>Cashier: Alex</span>
          </div>
          
          <div class="divider"></div>
          
          <div class="row bold mb-1">
            <span>ITEM</span>
            <span>QTY</span>
            <span>PRICE</span>
            <span>TOTAL</span>
          </div>
          <div class="row mb-1">
            <span>Coca-Cola</span>
            <span>2</span>
            <span>100</span>
            <span>200</span>
          </div>
          <div class="row mb-1">
            <span>Bread</span>
            <span>1</span>
            <span>80</span>
            <span>80</span>
          </div>
          
          <div class="divider"></div>
          
          <div class="row mb-1">
            <span>Subtotal:</span>
            <span></span>
            <span></span>
            <span>280</span>
          </div>
          <div class="row mb-1">
            <span>Discount:</span>
            <span></span>
            <span></span>
            <span>0</span>
          </div>
          <div class="row total">
            <span>TOTAL:</span>
            <span></span>
            <span></span>
            <span>280</span>
          </div>
          <div class="row mb-1">
            <span>Paid:</span>
            <span></span>
            <span></span>
            <span>300</span>
          </div>
          <div class="row mb-1">
            <span>Change:</span>
            <span></span>
            <span></span>
            <span>20</span>
          </div>
          
          <div class="divider"></div>
          
          <div class="center mb-1">
            <div>Payment: M-Pesa</div>
          </div>
          
          <div class="divider"></div>
          
          <div class="center">
            <div class="bold">${receiptSettings?.footerText || 'THANK YOU!'}</div>
            <div class="mt-1">Please come again.</div>
          </div>
        </div>
        
        <div class="page-break"></div>
        
        <div class="receipt">
          <div class="center mb-2">
            <div class="bold mb-1">${backReceiptData?.title || receiptSettings?.backReceiptTitle || "Return Policy"}</div>
            <div class="mb-2">${backReceiptData?.text || receiptSettings?.backReceiptText || "Returns accepted within 7 days with original receipt"}</div>
          </div>
          
          <div class="divider"></div>
          
          <div class="center">
            <div class="bold mb-1">Contact Us</div>
            <div>Email: ${backReceiptData?.email || receiptSettings?.backContactEmail || "support@mybusiness.com"}</div>
          </div>
        </div>
      </body>
      </html>
    `
  }

  const generateCompactReceiptHTML = (width: string, fontSize: string) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Receipt</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Courier New', Courier, monospace;
            font-size: ${fontSize};
            color: #000;
            background: #fff;
            padding: 10px;
            width: ${width};
            margin: 0 auto;
          }
          .receipt { width: 100%; max-width: ${width}; }
          .center { text-align: center; }
          .bold { font-weight: bold; }
          .mb-1 { margin-bottom: 4px; }
          .divider { border-top: 1px dashed #000; margin: 8px 0; }
          .row { display: flex; justify-content: space-between; margin-bottom: 2px; }
          @media print {
            body { margin: 0; padding: 5px; }
            @page { margin: 0; size: ${width} auto; }
          }
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="center bold mb-2">
            <div style="font-size: ${parseInt(fontSize) + 2}px;">${receiptSettings?.businessName || 'WEPESI MART'}</div>
            <div>Receipt #001245</div>
          </div>
          
          <div class="divider"></div>
          
          <div class="row mb-1">
            <span>Coca-Cola x2</span>
            <span>200</span>
          </div>
          <div class="row mb-1">
            <span>Bread x1</span>
            <span>80</span>
          </div>
          
          <div class="divider"></div>
          
          <div class="row bold mb-1">
            <span>TOTAL</span>
            <span>280</span>
          </div>
          <div class="row mb-1">
            <span>M-Pesa</span>
            <span>280</span>
          </div>
          
          <div class="divider"></div>
          
          <div class="center">
            <div>${receiptSettings?.footerText || 'Thank you!'}</div>
          </div>
        </div>
      </body>
      </html>
    `
  }

  const generateModernReceiptHTML = (width: string, fontSize: string) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Receipt</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: Arial, sans-serif;
            font-size: ${fontSize};
            color: #000;
            background: #fff;
            padding: 15px;
            width: ${width};
            margin: 0 auto;
          }
          .receipt { width: 100%; max-width: ${width}; }
          .center { text-align: center; }
          .bold { font-weight: bold; }
          .mb-1 { margin-bottom: 6px; }
          .mb-2 { margin-bottom: 12px; }
          .divider { border-top: 1px solid #000; margin: 10px 0; }
          .row { display: flex; justify-content: space-between; margin-bottom: 4px; }
          .table { width: 100%; border-collapse: collapse; }
          .table th, .table td { text-align: left; padding: 4px 0; }
          .table th { border-bottom: 1px solid #000; font-weight: bold; }
          .table td:last-child, .table th:last-child { text-align: right; }
          .total {
            font-size: ${parseInt(fontSize) + 2}px;
            font-weight: bold;
            border-top: 2px solid #000;
            padding-top: 8px;
            margin-top: 8px;
          }
          .logo { max-width: 80px; height: auto; margin: 0 auto 10px; }
          .page-break {
            page-break-after: always;
            border-top: 3px solid #000;
            margin-top: 20px;
            padding-top: 20px;
          }
          @media print {
            body { margin: 0; padding: 10px; }
            @page { margin: 0; size: ${width} auto; }
          }
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="center mb-2">
            ${receiptSettings?.showLogo && receiptSettings.logo ? `<img src="${receiptSettings.logo}" class="logo" alt="Logo">` : ''}
            <div class="bold" style="font-size: ${parseInt(fontSize) + 6}px;">${receiptSettings?.businessName || 'WEPESI MART'}</div>
            ${receiptSettings?.showContactInfo ? `
              <div class="mb-1">${receiptSettings.address}</div>
              <div class="mb-1">${receiptSettings.phone}</div>
              ${receiptSettings.email ? `<div class="mb-1">${receiptSettings.email}</div>` : ''}
            ` : ''}
          </div>
          
          <div class="divider"></div>
          
          <div class="row mb-1">
            <span>Receipt #: INV-001245</span>
            <span>${formatDate()} ${formatTime()}</span>
          </div>
          <div class="row mb-2">
            <span>Cashier: Alex</span>
            <span>Payment: M-Pesa</span>
          </div>
          
          <div class="divider"></div>
          
          <table class="table mb-2">
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Coca-Cola 500ml</td>
                <td>2</td>
                <td>100</td>
                <td>200</td>
              </tr>
              <tr>
                <td>Bread Loaf</td>
                <td>1</td>
                <td>80</td>
                <td>80</td>
              </tr>
            </tbody>
          </table>
          
          <div class="divider"></div>
          
          <div class="row mb-1">
            <span>Subtotal</span>
            <span>KSh 280</span>
          </div>
          <div class="row mb-1">
            <span>Tax (16%)</span>
            <span>KSh 44.80</span>
          </div>
          <div class="row total">
            <span>TOTAL</span>
            <span>KSh 324.80</span>
          </div>
          <div class="row mb-1">
            <span>Paid</span>
            <span>KSh 324.80</span>
          </div>
          
          <div class="divider"></div>
          
          <div class="center mb-2">
            <div class="bold">${receiptSettings?.footerText || 'Thank you for your purchase!'}</div>
          </div>
          
          <div class="divider"></div>
          
          <div class="center">
            <div class="bold mb-1">Return Policy</div>
            <div class="mb-1">Returns accepted within 7 days</div>
            <div>with original receipt</div>
          </div>
        </div>
        
        <div class="page-break"></div>
        
        <div class="receipt">
          <div class="center mb-2">
            ${receiptSettings?.backImage ? `<img src="${receiptSettings.backImage}" style="max-width: 100%; height: auto; margin: 0 auto 10px;" alt="Back of Receipt">` : ''}
            <div class="bold mb-1">${backReceiptData?.title || receiptSettings?.backReceiptTitle || "Return Policy"}</div>
            <div class="mb-2">${backReceiptData?.text || receiptSettings?.backReceiptText || "Returns accepted within 7 days with original receipt"}</div>
          </div>
          
          <div class="divider"></div>
          
          <div class="center">
            <div class="bold mb-1">Contact Us</div>
            <div>Email: ${backReceiptData?.email || receiptSettings?.backContactEmail || "support@mybusiness.com"}</div>
          </div>
        </div>
      </body>
      </html>
    `
  }

  const generateReceiptHTML = () => {
    const width = selectedTemplate === "thermal-58mm" ? "58mm" : "80mm"
    const fontSize = receiptSettings?.fontSize === 'small' ? '10px' : receiptSettings?.fontSize === 'large' ? '14px' : '12px'
    const template = receiptSettings?.templateType || 'classic'
    
    switch (template) {
      case 'compact':
        return generateCompactReceiptHTML(width, fontSize)
      case 'modern':
        return generateModernReceiptHTML(width, fontSize)
      case 'classic':
      default:
        return generateClassicReceiptHTML(width, fontSize)
    }
  }

  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=400,height=600')
    if (printWindow) {
      printWindow.document.write(generateReceiptHTML())
      printWindow.document.close()
      printWindow.print()
    }
  }

  const handleDownload = async () => {
    const printWindow = window.open('', '', 'width=400,height=600')
    if (printWindow) {
      printWindow.document.write(generateReceiptHTML())
      printWindow.document.close()
      
      // Wait for content to load, then capture
      setTimeout(async () => {
        try {
          const canvas = await html2canvas(printWindow.document.body, {
            scale: 3,
            useCORS: true,
            backgroundColor: '#ffffff',
            width: selectedTemplate === "thermal-58mm" ? 220 : 302,
            windowWidth: selectedTemplate === "thermal-58mm" ? 220 : 302
          })
          const link = document.createElement('a')
          link.download = `receipt-${Date.now()}.png`
          link.href = canvas.toDataURL('image/png')
          link.click()
          printWindow.close()
        } catch (error) {
          console.error('Error downloading receipt:', error)
          printWindow.close()
        }
      }, 500)
    }
  }

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
              ref={receiptRef}
              className={`relative transition-transform duration-500 transform-style-3d ${isFlipped ? "rotate-y-180" : ""}`}
              style={{ transformStyle: "preserve-3d", transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
            >
              {/* Front Side */}
              <div 
                className={`${selectedTemplate === "thermal-58mm" ? "w-56" : "w-80"} bg-white border border-slate-200 rounded-lg p-4 shadow-sm backface-hidden`}
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className={`text-center mb-4 ${getFontSizeClass()}`}>
                  {receiptSettings?.showLogo && receiptSettings.logo && (
                    <img src={receiptSettings.logo} alt="Logo" className="h-12 w-auto mx-auto mb-2" />
                  )}
                  <div className="font-bold text-lg mb-1">{receiptSettings?.businessName || 'MY BUSINESS'}</div>
                  {receiptSettings?.showContactInfo && (
                    <>
                      <div className="text-slate-500">{receiptSettings.address}</div>
                      <div className="text-slate-500">{receiptSettings.phone}</div>
                      {receiptSettings.email && <div className="text-slate-500">{receiptSettings.email}</div>}
                      {receiptSettings.website && <div className="text-slate-500">{receiptSettings.website}</div>}
                    </>
                  )}
                </div>
                <div className={`border-t border-b border-slate-300 py-2 mb-4 ${getFontSizeClass()}`}>
                  <div className="flex justify-between">
                    <span>Receipt #: 12345</span>
                    <span>Date: {formatDate()}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>Cashier: Alex</span>
                    <span>Time: {formatTime()}</span>
                  </div>
                </div>
                <div className={`space-y-2 mb-4 ${getFontSizeClass()}`}>
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
                <div className={`border-t border-slate-300 pt-2 text-center text-slate-500 ${getFontSizeClass()}`}>
                  <div className="mb-1">Paid: Cash</div>
                  <div>{receiptSettings?.footerText || 'Thank you for your business!'}</div>
                </div>
              </div>

              {/* Back Side */}
              <div
                className={`${selectedTemplate === "thermal-58mm" ? "w-56" : "w-80"} bg-white border border-slate-200 rounded-lg p-4 shadow-sm absolute top-0 left-0 backface-hidden`}
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <div className="text-center py-8">
                  {receiptSettings?.backImage ? (
                    <img src={receiptSettings.backImage} alt="Back of Receipt" className="w-full h-auto rounded-lg mb-4" />
                  ) : (
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 mb-4">
                      <div className="text-slate-400 text-xs mb-2">Back of Receipt</div>
                      <div className="text-slate-300 text-4xl mb-2">📄</div>
                      <div className="text-slate-400 text-xs">Custom back image or text</div>
                    </div>
                  )}
                  <div className="text-xs text-slate-500 space-y-1">
                    <div className="font-semibold text-slate-700">{backReceiptData?.title || receiptSettings?.backReceiptTitle || "Return Policy"}</div>
                    <div>{backReceiptData?.text || receiptSettings?.backReceiptText || "Returns accepted within 7 days with original receipt"}</div>
                  </div>
                  <div className="mt-4 text-xs text-slate-500">
                    <div className="font-semibold text-slate-700 mb-1">Contact Us</div>
                    <div>Email: {backReceiptData?.email || receiptSettings?.backContactEmail || "support@mybusiness.com"}</div>
                    <div>Website: {backReceiptData?.website || receiptSettings?.backContactWebsite || "www.mybusiness.com"}</div>
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
            onClick={handlePrint}
            className="h-10 border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button
            variant="outline"
            onClick={handleDownload}
            className="h-10 border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
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
