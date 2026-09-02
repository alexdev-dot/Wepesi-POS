"use client"

import { useState, useEffect, useRef } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Barcode, Printer, Download, RefreshCw, QrCode, Scan } from "lucide-react"
import QRCode from "qrcode"
import bwipjs from "bwip-js"

export default function BarcodeGeneratorPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [barcodeData, setBarcodeData] = useState("123456789012")
  const [barcodeType, setBarcodeType] = useState("code128")
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("")
  const [barcodeDataUrl, setBarcodeDataUrl] = useState("")

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen)
  }

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false)
  }

  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      const content = barcodeType === "qr" 
        ? `<img src="${qrCodeDataUrl}" alt="QR Code" style="width: 300px; height: 300px;" />`
        : `<img src="${barcodeDataUrl}" alt="Barcode" style="width: 400px; height: auto;" />`
      
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Barcode</title>
            <style>
              body {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                margin: 0;
                padding: 20px;
                font-family: Arial, sans-serif;
              }
              .barcode-data {
                margin-top: 20px;
                font-size: 18px;
                font-weight: bold;
              }
            </style>
          </head>
          <body>
            ${content}
            <div class="barcode-data">${barcodeData}</div>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    const dataUrl = barcodeType === "qr" ? qrCodeDataUrl : barcodeDataUrl
    link.href = dataUrl
    link.download = `${barcodeType}_${barcodeData}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Calculate UPC-A check digit
  const calculateUPCACheckDigit = (data: string): string => {
    const digits = data.split('').map(Number)
    let sum = 0
    for (let i = 0; i < 11; i++) {
      sum += (i % 2 === 0) ? digits[i] * 3 : digits[i]
    }
    const checkDigit = (10 - (sum % 10)) % 10
    return checkDigit.toString()
  }

  // Calculate EAN-13 check digit
  const calculateEAN13CheckDigit = (data: string): string => {
    const digits = data.split('').map(Number)
    let sum = 0
    for (let i = 0; i < 12; i++) {
      sum += (i % 2 === 0) ? digits[i] : digits[i] * 3
    }
    const checkDigit = (10 - (sum % 10)) % 10
    return checkDigit.toString()
  }

  const handleMenuClick = () => {
    if (window.innerWidth < 1024) {
      toggleMobileSidebar()
    } else {
      toggleSidebar()
    }
  }

  // Generate QR code when data or type changes
  useEffect(() => {
    if (barcodeType === "qr" && barcodeData) {
      QRCode.toDataURL(barcodeData, {
        margin: 2,
        color: {
          dark: '#0f172a',
          light: '#ffffff',
        },
      })
        .then((url: string) => {
          setQrCodeDataUrl(url)
        })
        .catch((err: Error) => {
          console.error('Error generating QR code:', err)
        })
    }
  }, [barcodeData, barcodeType])

  // Validate and prepare barcode data
  const validateAndPrepareBarcodeData = (type: string, data: string): { valid: boolean; data: string; error?: string } => {
    const numericData = data.replace(/[^0-9]/g, '')
    
    if (type === "ean13") {
      if (numericData.length === 12) {
        // Add check digit
        return { valid: true, data: numericData + calculateEAN13CheckDigit(numericData) }
      } else if (numericData.length === 13) {
        // Assume check digit is already included
        return { valid: true, data: numericData }
      } else {
        return { valid: false, data: "", error: "EAN-13 requires 12 or 13 digits" }
      }
    } else if (type === "upca") {
      if (numericData.length === 11) {
        // Add check digit
        return { valid: true, data: numericData + calculateUPCACheckDigit(numericData) }
      } else if (numericData.length === 12) {
        // Assume check digit is already included
        return { valid: true, data: numericData }
      } else {
        return { valid: false, data: "", error: "UPC-A requires 11 or 12 digits" }
      }
    } else if (type === "code39") {
      if (data.length === 0) {
        return { valid: false, data: "", error: "Code 39 requires at least 1 character" }
      }
      return { valid: true, data: data.toUpperCase() }
    } else if (type === "code128") {
      if (data.length === 0) {
        return { valid: false, data: "", error: "Code 128 requires at least 1 character" }
      }
      return { valid: true, data }
    } else if (type === "datamatrix") {
      if (data.length === 0) {
        return { valid: false, data: "", error: "Data Matrix requires at least 1 character" }
      }
      return { valid: true, data }
    }
    
    return { valid: true, data }
  }

  // Generate barcode using bwip-js for all barcode types
  useEffect(() => {
    if (barcodeType !== "qr" && barcodeData) {
      try {
        const canvas = document.createElement('canvas')
        let bwipType = barcodeType.toUpperCase()
        
        // Validate and prepare data
        const validation = validateAndPrepareBarcodeData(barcodeType, barcodeData)
        
        if (!validation.valid) {
          console.error('Barcode validation error:', validation.error)
          setBarcodeDataUrl("")
          return
        }
        
        // Map barcode types to bwip-js format names
        const typeMap: Record<string, string> = {
          'code128': 'code128',
          'ean13': 'ean13',
          'upca': 'upca',
          'code39': 'code39',
          'datamatrix': 'datamatrix',
        }
        
        bwipType = typeMap[barcodeType] || barcodeType
        
        bwipjs.toCanvas(canvas, {
          bcid: bwipType,
          text: validation.data,
          scale: 2,
          height: 10,
          includetext: true,
          textxalign: 'center',
        })
        
        setBarcodeDataUrl(canvas.toDataURL())
      } catch (err) {
        console.error('Error generating barcode:', err)
        setBarcodeDataUrl("")
      }
    }
  }, [barcodeData, barcodeType])

  const barcodeTypes = [
    { id: "code128", name: "Code 128", description: "Standard barcode for products" },
    { id: "ean13", name: "EAN-13", description: "13-digit European barcode" },
    { id: "upca", name: "UPC-A", description: "12-digit Universal Product Code" },
    { id: "code39", name: "Code 39", description: "Alphanumeric barcode" },
    { id: "datamatrix", name: "Data Matrix", description: "2D matrix barcode" },
    { id: "qr", name: "QR Code", description: "Quick response code for scanning" },
  ]

  const renderBarcodePreview = () => {
    if (barcodeType === "qr") {
      return (
        <div className="flex flex-col items-center justify-center p-8 bg-card rounded-lg border border-border">
          {qrCodeDataUrl ? (
            <img 
              src={qrCodeDataUrl} 
              alt="QR Code" 
              className="border-2 border-foreground rounded-lg"
              style={{ width: 200, height: 200 }}
            />
          ) : (
            <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center">
              <span className="text-sm text-muted-foreground">Generating QR Code...</span>
            </div>
          )}
        </div>
      )
    }

    return (
      <div className="flex flex-col items-center justify-center p-8 bg-card rounded-lg border border-border">
        {barcodeDataUrl ? (
          <img 
            src={barcodeDataUrl} 
            alt="Barcode" 
            className="border-2 border-foreground rounded-lg"
          />
        ) : (
          <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center">
            <span className="text-sm text-muted-foreground">Generating Barcode...</span>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background font-sans">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        currentPath="/settings/barcodes" 
        mobileOpen={mobileSidebarOpen}
        onMobileClose={closeMobileSidebar}
      />
      <div className="flex flex-1 flex-col overflow-hidden font-sans">
        <Header onMenuClick={handleMenuClick} />
        <main className="flex-1 flex flex-col bg-muted/30 overflow-auto">
          {/* Page Header */}
          <div className="px-4 sm:px-6 py-4 sm:py-5">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 shadow-sm  ">
                  <Barcode className="h-5 w-5" strokeWidth={2} />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-semibold text-foreground">Barcode Generator</h1>
                  <p className="text-sm text-muted-foreground mt-0.5">Generate barcodes and QR codes for your products</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto px-4 sm:px-6 pb-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                {/* Left Column - Configuration */}
                <div className="space-y-6">
                  {/* Barcode Input */}
                  <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm">
                    <h3 className="text-base font-semibold text-foreground mb-4">Barcode Data</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Enter Data <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="text"
                          value={barcodeData}
                          onChange={(e) => setBarcodeData(e.target.value)}
                          className="h-10 px-3 text-sm border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                          placeholder="Enter barcode data..."
                        />
                      </div>
                      <Button
                        variant="outline"
                        className="w-full h-10 border-border text-foreground hover:bg-muted"
                        onClick={() => {
                          let randomData = ""
                          switch (barcodeType) {
                            case "ean13":
                              // EAN-13 needs 12 digits (check digit will be added)
                              randomData = Math.floor(Math.random() * 1000000000000).toString().padStart(12, '0')
                              break
                            case "upca":
                              // UPC-A needs 11 digits (check digit will be added)
                              randomData = Math.floor(Math.random() * 100000000000).toString().padStart(11, '0')
                              break
                            case "code39":
                              randomData = Math.random().toString(36).substring(2, 12).toUpperCase()
                              break
                            case "code128":
                              randomData = Math.random().toString(36).substring(2, 14).toUpperCase()
                              break
                            case "datamatrix":
                              randomData = Math.random().toString(36).substring(2, 20).toUpperCase()
                              break
                            case "qr":
                              randomData = Math.random().toString(36).substring(2, 20).toUpperCase()
                              break
                            default:
                              randomData = Math.random().toString(36).substring(2, 14).toUpperCase()
                          }
                          setBarcodeData(randomData)
                        }}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Generate Random
                      </Button>
                    </div>
                  </div>

                  {/* Barcode Type Selection */}
                  <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm">
                    <h3 className="text-base font-semibold text-foreground mb-4">Barcode Type</h3>
                    <div className="space-y-3">
                      {barcodeTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setBarcodeType(type.id)}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                            barcodeType === type.id
                              ? "border-indigo-500 bg-indigo-50"
                              : "border-border bg-card hover:border-border"
                          }`}
                        >
                          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                            barcodeType === type.id ? "bg-indigo-100 text-indigo-600" : "bg-muted text-muted-foreground"
                          }`}>
                            {type.id === "qr" ? <QrCode className="h-5 w-5" /> : <Scan className="h-5 w-5" />}
                          </div>
                          <div className="text-left">
                            <div className={`text-sm font-semibold ${
                              barcodeType === type.id ? "text-indigo-900" : "text-foreground"
                            }`}>
                              {type.name}
                            </div>
                            <div className="text-xs text-muted-foreground">{type.description}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Right Column - Preview */}
                <div className="space-y-6">
                  {/* Barcode Preview */}
                  <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-semibold text-foreground">Preview</h3>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-9 border-border text-foreground hover:bg-muted" onClick={handlePrint}>
                          <Printer className="h-4 w-4 mr-2" />
                          Print
                        </Button>
                        <Button variant="outline" size="sm" className="h-9 border-border text-foreground hover:bg-muted" onClick={handleDownload}>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                    <div className="bg-muted rounded-lg p-6 flex items-center justify-center min-h-64">
                      {renderBarcodePreview()}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
