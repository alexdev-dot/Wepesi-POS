"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { FileText, Printer, Download } from "lucide-react"
import { ReceiptPreviewPopup } from "@/components/receipts/receipt-preview-popup"
import { CustomizeTemplateCard } from "@/components/receipts/customize-template-card"

export default function ReceiptTemplatesPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("thermal")
  const [selectedTemplate, setSelectedTemplate] = useState("thermal-80mm")
  const [showPreviewPopup, setShowPreviewPopup] = useState(false)
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
        <main className="flex-1 flex flex-col bg-muted/30 overflow-auto">
          {/* Page Header */}
          <div className="px-4 sm:px-6 py-4 sm:py-5">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600 shadow-sm shrink-0  ">
                  <FileText className="h-5 w-5" strokeWidth={2} />
                </div>
                <div className="flex-1 w-full">
                  <h1 className="text-lg sm:text-xl font-semibold text-foreground">Receipt Templates</h1>
                  <p className="text-sm text-muted-foreground mt-0.5">Customize and manage receipt formats</p>
                </div>
                <select
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="w-full sm:w-auto px-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                >
                  {thermalTemplates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Template Type Tabs */}
              <div className="flex flex-wrap gap-2">
                {templateTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => {
                      setActiveTab(type.id)
                      setSelectedTemplate("")
                    }}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTab === type.id
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-card text-foreground border border-border hover:bg-muted shadow-sm"
                    }`}
                  >
                    <type.icon className="h-4 w-4" />
                    <span>{type.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto px-4 sm:px-6 pb-6">
            <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
              {/* Template Customization */}
              {selectedTemplate && (
                <CustomizeTemplateCard onPreviewClick={(data) => {
                  setBackReceiptData(data)
                  setShowPreviewPopup(true)
                }} />
              )}
            </div>
          </div>
        </main>
      </div>

      <ReceiptPreviewPopup
        isOpen={showPreviewPopup}
        onClose={() => setShowPreviewPopup(false)}
        selectedTemplate={selectedTemplate}
        backReceiptData={backReceiptData}
      />
    </div>
  )
}
