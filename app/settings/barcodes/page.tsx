"use client"

import { useState, useEffect, useRef } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Barcode, Printer, Download, RefreshCw, QrCode, Scan } from "lucide-react"
import QRCode from "qrcode"

export default function BarcodeGeneratorPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [barcodeData, setBarcodeData] = useState("123456789012")
  const [barcodeType, setBarcodeType] = useState("code128")
  const [showText, setShowText] = useState(true)
  const [barcodeWidth, setBarcodeWidth] = useState(2)
  const [barcodeHeight, setBarcodeHeight] = useState(100)
  const [fontSize, setFontSize] = useState(12)
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen)
  }

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false)
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
        width: 200,
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

  const barcodeTypes = [
    { id: "code128", name: "Code 128", description: "Standard alphanumeric barcode" },
    { id: "ean13", name: "EAN-13", description: "13-digit retail product code" },
    { id: "upc", name: "UPC-A", description: "12-digit retail product code" },
    { id: "code39", name: "Code 39", description: "Alphanumeric barcode" },
    { id: "qr", name: "QR Code", description: "2D matrix barcode" },
  ]

  const renderBarcodePreview = () => {
    if (barcodeType === "qr") {
      return (
        <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg border border-slate-200">
          {qrCodeDataUrl ? (
            <img 
              src={qrCodeDataUrl} 
              alt="QR Code" 
              className="border-2 border-slate-900 rounded-lg"
              style={{ width: 200, height: 200 }}
            />
          ) : (
            <div className="w-48 h-48 bg-slate-100 rounded-lg flex items-center justify-center">
              <span className="text-sm text-slate-500">Generating QR Code...</span>
            </div>
          )}
          {showText && (
            <div className="text-sm font-mono text-slate-700 mt-4">{barcodeData}</div>
          )}
        </div>
      )
    }

    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg border border-slate-200">
        <div className="flex items-end gap-0.5 mb-2">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="bg-slate-900"
              style={{
                width: `${barcodeWidth}px`,
                height: `${barcodeHeight}px`,
                opacity: (i % 3 === 0) || (i % 5 === 0) ? 1 : 0.3,
              }}
            />
          ))}
        </div>
        {showText && (
          <div className="text-sm font-mono text-slate-700" style={{ fontSize: `${fontSize}px` }}>
            {barcodeData}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
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
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 shadow-sm">
                  <Barcode className="h-5 w-5" strokeWidth={2} />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-semibold text-slate-900">Barcode Generator</h1>
                  <p className="text-sm text-slate-500 mt-0.5">Generate barcodes and QR codes for your products</p>
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
                  <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
                    <h3 className="text-base font-semibold text-slate-900 mb-4">Barcode Data</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          Enter Data <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="text"
                          value={barcodeData}
                          onChange={(e) => setBarcodeData(e.target.value)}
                          className="h-10 px-3 text-sm border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                          placeholder="Enter barcode data..."
                        />
                      </div>
                      <Button
                        variant="outline"
                        className="w-full h-10 border-slate-200 text-slate-700 hover:bg-slate-50"
                        onClick={() => setBarcodeData(Math.random().toString(36).substring(2, 12).toUpperCase())}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Generate Random
                      </Button>
                    </div>
                  </div>

                  {/* Barcode Type Selection */}
                  <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
                    <h3 className="text-base font-semibold text-slate-900 mb-4">Barcode Type</h3>
                    <div className="space-y-3">
                      {barcodeTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setBarcodeType(type.id)}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                            barcodeType === type.id
                              ? "border-indigo-500 bg-indigo-50"
                              : "border-slate-200 bg-white hover:border-slate-300"
                          }`}
                        >
                          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                            barcodeType === type.id ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-600"
                          }`}>
                            {type.id === "qr" ? <QrCode className="h-5 w-5" /> : <Scan className="h-5 w-5" />}
                          </div>
                          <div className="text-left">
                            <div className={`text-sm font-semibold ${
                              barcodeType === type.id ? "text-indigo-900" : "text-slate-900"
                            }`}>
                              {type.name}
                            </div>
                            <div className="text-xs text-slate-500">{type.description}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Barcode Settings */}
                  <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
                    <h3 className="text-base font-semibold text-slate-900 mb-4">Barcode Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          Bar Width: {barcodeWidth}px
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="5"
                          value={barcodeWidth}
                          onChange={(e) => setBarcodeWidth(parseInt(e.target.value))}
                          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          Bar Height: {barcodeHeight}px
                        </label>
                        <input
                          type="range"
                          min="50"
                          max="200"
                          value={barcodeHeight}
                          onChange={(e) => setBarcodeHeight(parseInt(e.target.value))}
                          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          Font Size: {fontSize}px
                        </label>
                        <input
                          type="range"
                          min="8"
                          max="20"
                          value={fontSize}
                          onChange={(e) => setFontSize(parseInt(e.target.value))}
                          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-slate-700">Show Text</label>
                        <button
                          onClick={() => setShowText(!showText)}
                          className={`relative h-6 w-11 rounded-full transition-colors ${
                            showText ? "bg-indigo-600" : "bg-slate-200"
                          }`}
                        >
                          <span
                            className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform ${
                              showText ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Preview */}
                <div className="space-y-6">
                  {/* Barcode Preview */}
                  <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-semibold text-slate-900">Preview</h3>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-9 border-slate-200 text-slate-700 hover:bg-slate-50">
                          <Printer className="h-4 w-4 mr-2" />
                          Print
                        </Button>
                        <Button variant="outline" size="sm" className="h-9 border-slate-200 text-slate-700 hover:bg-slate-50">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-6 flex items-center justify-center min-h-64">
                      {renderBarcodePreview()}
                    </div>
                  </div>

                  {/* Batch Generation */}
                  <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
                    <h3 className="text-base font-semibold text-slate-900 mb-4">Batch Generation</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          Number of Barcodes
                        </label>
                        <Input
                          type="number"
                          defaultValue="10"
                          min="1"
                          max="100"
                          className="h-10 px-3 text-sm border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          Prefix (Optional)
                        </label>
                        <Input
                          type="text"
                          placeholder="e.g., PRD-"
                          className="h-10 px-3 text-sm border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        />
                      </div>
                      <Button className="w-full h-10 bg-indigo-600 hover:bg-indigo-700 text-sm font-semibold shadow-sm hover:shadow-md transition-all">
                        <Barcode className="h-4 w-4 mr-2" />
                        Generate Batch
                      </Button>
                    </div>
                  </div>

                  {/* Recent Barcodes */}
                  <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
                    <h3 className="text-base font-semibold text-slate-900 mb-4">Recent Barcodes</h3>
                    <div className="space-y-3">
                      {[
                        { data: "123456789012", type: "Code 128", date: "2 hours ago" },
                        { data: "987654321098", type: "EAN-13", date: "5 hours ago" },
                        { data: "555123456789", type: "UPC-A", date: "1 day ago" },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
                              <Scan className="h-4 w-4 text-slate-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-slate-900">{item.data}</div>
                              <div className="text-xs text-slate-500">{item.type}</div>
                            </div>
                          </div>
                          <div className="text-xs text-slate-500">{item.date}</div>
                        </div>
                      ))}
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
