"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/core/layout/sidebar"
import { Header } from "@/components/core/layout/header"
import { Button } from "@/components/ui/button"
import { FileText, Printer, Download, Save, RotateCcw, Eye, Plus, CheckCircle2, AlertCircle } from "lucide-react"
import { ReceiptPreviewPopup } from "@/components/domains/receipts/receipt-preview-popup"
import { CustomizeTemplateCard } from "@/components/domains/receipts/customize-template-card"

interface TemplateSettings {
  header: {
    businessName: string
    logo: string
    address: string
    phone: string
    email: string
  }
  body: {
    fontSize: string
    showTax: boolean
    showDiscount: boolean
    showBarcode: boolean
  }
  footer: {
    thankYouMessage: string
    returnPolicy: string
  }
}

export default function ReceiptTemplatesPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("thermal")
  const [selectedTemplate, setSelectedTemplate] = useState("thermal-80mm")
  const [showPreviewPopup, setShowPreviewPopup] = useState(false)
  const [showLivePreview, setShowLivePreview] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  
  const [templateSettings, setTemplateSettings] = useState<TemplateSettings>({
    header: {
      businessName: "My Business",
      logo: "",
      address: "Kenya",
      phone: "+254 700 000 000",
      email: "contact@mybusiness.com"
    },
    body: {
      fontSize: "12",
      showTax: true,
      showDiscount: true,
      showBarcode: true
    },
    footer: {
      thankYouMessage: "Thank you for your purchase!",
      returnPolicy: "Returns accepted within 7 days"
    }
  })

  const [backReceiptData, setBackReceiptData] = useState({
    title: "Return Policy",
    text: "Returns accepted within 7 days with original receipt",
    email: "support@mybusiness.com",
    website: "www.mybusiness.com"
  })

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

  // Fetch template settings on mount
  useEffect(() => {
    fetchTemplateSettings()
  }, [selectedTemplate])

  const fetchTemplateSettings = async () => {
    try {
      const userId = localStorage.getItem('user_id')
      if (!userId) return

      const response = await fetch(`/api/receipt-templates/${selectedTemplate}`, {
        headers: { 'x-user-id': userId }
      })

      if (response.ok) {
        const data = await response.json()
        if (data.settings) {
          setTemplateSettings(data.settings)
        }
      }
    } catch (error) {
      console.error('Failed to fetch template settings:', error)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    setMessage(null)

    try {
      const userId = localStorage.getItem('user_id')
      if (!userId) {
        setMessage({ type: 'error', text: 'User not authenticated' })
        setIsSaving(false)
        return
      }

      const response = await fetch('/api/receipt-templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId
        },
        body: JSON.stringify({
          templateId: selectedTemplate,
          settings: templateSettings
        })
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'Template saved successfully!' })
        setTimeout(() => setMessage(null), 3000)
      } else {
        const data = await response.json()
        setMessage({ type: 'error', text: data.error || 'Failed to save template' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error occurred' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleReset = () => {
    setTemplateSettings({
      header: {
        businessName: "My Business",
        logo: "",
        address: "Kenya",
        phone: "+254 700 000 000",
        email: "contact@mybusiness.com"
      },
      body: {
        fontSize: "12",
        showTax: true,
        showDiscount: true,
        showBarcode: true
      },
      footer: {
        thankYouMessage: "Thank you for your purchase!",
        returnPolicy: "Returns accepted within 7 days"
      }
    })
    setMessage({ type: 'success', text: 'Template reset to defaults' })
    setTimeout(() => setMessage(null), 3000)
  }

  const handlePrint = () => {
    const printContent = document.getElementById('receipt-preview')
    if (!printContent) return

    const printWindow = window.open('', '', 'width=400,height=600')
    if (!printWindow) return

    printWindow.document.write(`
      <html>
        <head>
          <title>Print Receipt</title>
          <style>
            body { margin: 0; padding: 20px; font-family: monospace; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>${printContent.innerHTML}</body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  const handleDownload = () => {
    const printContent = document.getElementById('receipt-preview')
    if (!printContent) return

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Receipt Template</title>
          <style>
            body { margin: 0; padding: 20px; font-family: monospace; }
          </style>
        </head>
        <body>${printContent.innerHTML}</body>
      </html>
    `

    const blob = new Blob([htmlContent], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${selectedTemplate}-template.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const templateTypes = [
    { id: "thermal", name: "Thermal Roll", icon: Printer, description: "80mm & 58mm narrow layouts" },
  ]

  const thermalTemplates = [
    { id: "thermal-80mm", name: "80mm Thermal", width: "80mm", popular: true },
    { id: "thermal-58mm", name: "58mm Thermal", width: "58mm", popular: false },
  ]

  const renderTemplatePreview = () => {
    return (
      <div className="space-y-4">
        <div className="flex gap-4 flex-wrap">
          {thermalTemplates.map((template) => (
            <div
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={`cursor-pointer rounded-xl border-2 p-4 transition-all ${
                selectedTemplate === template.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-border bg-card hover:border-border"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-foreground">{template.name}</span>
                {template.popular && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full  ">Popular</span>
                )}
              </div>
              <div className={`h-32 bg-card border border-border rounded-lg p-2 text-xs ${template.width === "58mm" ? "w-24" : "w-32"}`}>
                <div className="font-bold text-center mb-1">RECEIPT</div>
                <div className="space-y-0.5">
                  <div className="flex justify-between">
                    <span>Item 1</span>
                    <span>KSh 120</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Item 2</span>
                    <span>KSh 80</span>
                  </div>
                  <div className="border-t border-border mt-1 pt-1 flex justify-between font-bold">
                    <span>Total</span>
                    <span>KSh 200</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background font-sans">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        currentPath="/settings/receipts" 
        mobileOpen={mobileSidebarOpen}
        onMobileClose={closeMobileSidebar}
      />
      <div className="flex flex-1 flex-col overflow-hidden font-sans">
        <Header onMenuClick={handleMenuClick} />
        <main className="flex-1 overflow-auto p-4 sm:p-6 font-sans">
          <div className="max-w-7xl mx-auto space-y-6 font-sans">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 shadow-sm  ">
                  <FileText className="h-6 w-6" strokeWidth={2} />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Receipt Templates</h1>
                  <p className="text-sm text-muted-foreground mt-1">Customize and manage receipt formats</p>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-10 sm:h-11 border-border text-foreground hover:bg-muted"
                  onClick={handleReset}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                <Button 
                  size="sm"
                  className="h-10 sm:h-11 bg-blue-600 hover:bg-blue-700"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Saving..." : "Save Template"}
                </Button>
              </div>
            </div>

            {/* Success/Error Message */}
            {message && (
              <div className={`flex items-center gap-3 p-4 rounded-xl border ${
                message.type === 'success' 
                  ? 'bg-green-50 border-green-200 text-green-800' 
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}>
                {message.type === 'success' ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <AlertCircle className="h-5 w-5" />
                )}
                <span className="text-sm font-medium">{message.text}</span>
              </div>
            )}

            {/* Template Type Tabs */}
            <div className="border-b border-border">
              <nav className="flex gap-1 overflow-x-auto">
                {templateTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => {
                      setActiveTab(type.id)
                      setSelectedTemplate("thermal-80mm")
                    }}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === type.id
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                    }`}
                  >
                    <type.icon className="h-4 w-4" />
                    {type.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Two-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Template Selection */}
              <div className="lg:col-span-1 space-y-4">
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Select Template</h3>
                  <div className="space-y-3">
                    {thermalTemplates.map((template) => (
                      <div
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={`cursor-pointer rounded-xl border-2 p-4 transition-all ${
                          selectedTemplate === template.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-border bg-card hover:border-border hover:bg-muted/50"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-semibold text-foreground">{template.name}</span>
                          {template.popular && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Popular</span>
                          )}
                        </div>
                        <div className={`h-32 bg-white border border-border rounded-lg p-3 text-xs ${template.width === "58mm" ? "w-28" : "w-36 mx-auto"}`}>
                          <div className="font-bold text-center mb-2 text-foreground">RECEIPT</div>
                          <div className="space-y-1 text-muted-foreground">
                            <div className="flex justify-between">
                              <span>Item 1</span>
                              <span>KSh 120</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Item 2</span>
                              <span>KSh 80</span>
                            </div>
                            <div className="border-t border-border mt-2 pt-2 flex justify-between font-bold text-foreground">
                              <span>Total</span>
                              <span>KSh 200</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start h-10 border-border text-foreground hover:bg-muted"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Custom Template
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start h-10 border-border text-foreground hover:bg-muted"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Import Template
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right Column - Customization & Preview */}
              <div className="lg:col-span-2 space-y-4">
                {/* Live Preview Toggle */}
                <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-foreground" />
                    <span className="text-sm font-medium text-foreground">Live Preview</span>
                  </div>
                  <button
                    onClick={() => setShowLivePreview(!showLivePreview)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${showLivePreview ? 'bg-blue-600' : 'bg-muted'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-card transition-transform ${showLivePreview ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                {/* Template Customization */}
                {selectedTemplate && (
                  <CustomizeTemplateCard 
                    templateSettings={templateSettings}
                    onSettingsChange={setTemplateSettings}
                    onPreviewClick={(data) => {
                      setBackReceiptData(data)
                      setShowPreviewPopup(true)
                    }} 
                  />
                )}

                {/* Live Preview Section */}
                {showLivePreview && selectedTemplate && (
                  <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-foreground">Live Preview</h3>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="h-9 border-border text-foreground hover:bg-muted"
                          onClick={handlePrint}
                        >
                          <Printer className="h-4 w-4 mr-2" />
                          Print
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="h-9 border-border text-foreground hover:bg-muted"
                          onClick={handleDownload}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-8 flex items-center justify-center min-h-100">
                      <div id="receipt-preview" className={`bg-white border border-border rounded-lg p-4 shadow-sm ${selectedTemplate === "thermal-58mm" ? "w-48" : "w-64"}`}>
                        <div className="text-center mb-4">
                          <div className="font-bold text-sm text-foreground">{templateSettings.header.businessName}</div>
                          <div className="text-xs text-muted-foreground">{templateSettings.header.address}</div>
                          <div className="text-xs text-muted-foreground">Tel: {templateSettings.header.phone}</div>
                        </div>
                        <div className="border-t border-border border-dashed my-3"></div>
                        <div className="text-xs space-y-1 text-muted-foreground">
                          <div className="flex justify-between">
                            <span>Item 1 x2</span>
                            <span>KSh 240</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Item 2 x1</span>
                            <span>KSh 80</span>
                          </div>
                        </div>
                        <div className="border-t border-border my-3"></div>
                        <div className="flex justify-between font-bold text-sm text-foreground">
                          <span>TOTAL</span>
                          <span>KSh 320</span>
                        </div>
                        <div className="border-t border-border border-dashed my-3"></div>
                        <div className="text-center text-xs text-muted-foreground">
                          <div className="font-semibold text-foreground mb-1">{templateSettings.footer.thankYouMessage}</div>
                          <div>{templateSettings.footer.returnPolicy}</div>
                          <div className="mt-2">{templateSettings.header.email}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      {showPreviewPopup && (
        <ReceiptPreviewPopup
          isOpen={showPreviewPopup}
          onClose={() => setShowPreviewPopup(false)}
          selectedTemplate={selectedTemplate}
          templateSettings={templateSettings}
          backReceiptData={backReceiptData}
        />
      )}
    </div>
  )
}
