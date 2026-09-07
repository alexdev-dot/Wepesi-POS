"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, Copy, Check, X, Upload, Building2, FileText, Settings, Layout, Palette, Image as ImageIcon } from "lucide-react"

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

interface CustomizeTemplateCardProps {
  templateSettings: TemplateSettings
  onSettingsChange: (settings: TemplateSettings) => void
  onPreviewClick: (backReceiptData: {
    title: string
    text: string
    email: string
    website: string
  }) => void
}

export function CustomizeTemplateCard({ templateSettings, onSettingsChange, onPreviewClick }: CustomizeTemplateCardProps) {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [isDraggingLogo, setIsDraggingLogo] = useState(false)
  const [isDraggingBackImage, setIsDraggingBackImage] = useState(false)

  const handleImageUpload = (file: File, type: 'logo' | 'backImage') => {
    const reader = new FileReader()
    reader.onloadend = () => {
      if (type === 'logo') {
        onSettingsChange({ ...templateSettings, header: { ...templateSettings.header, logo: reader.result as string } })
      }
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent, type: 'logo' | 'backImage') => {
    e.preventDefault()
    if (type === 'logo') {
      setIsDraggingLogo(false)
    } else {
      setIsDraggingBackImage(false)
    }
    
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file, type)
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-border bg-muted/30">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 shrink-0  ">
              <Settings className="h-5 w-5" strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">Customize Template</h3>
              <p className="text-sm text-muted-foreground mt-0.5">Personalize your receipt design</p>
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              className="h-9 flex-1 sm:flex-none border-border text-foreground hover:bg-muted hover:border-border transition-all"
              onClick={() => onPreviewClick({
                title: templateSettings.footer.returnPolicy,
                text: templateSettings.footer.thankYouMessage,
                email: templateSettings.header.email,
                website: ''
              })}
            >
              <Eye className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Preview</span>
              <span className="sm:hidden">View</span>
            </Button>
            <Button variant="outline" size="sm" className="h-9 flex-1 sm:flex-none border-border text-foreground hover:bg-muted hover:border-border transition-all">
              <Copy className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Duplicate</span>
              <span className="sm:hidden">Copy</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
        {/* Branding Section */}
        <div>
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Palette className="h-4 w-4 text-blue-600" strokeWidth={2} />
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">Branding</h4>
          </div>
          <div className="grid gap-4 sm:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {/* Logo Upload */}
            <div className="col-span-full sm:col-span-1">
              <label className="block text-sm font-medium text-foreground mb-2">Logo</label>
              <div 
                className={`border-2 border-dashed rounded-xl p-4 sm:p-6 text-center transition-all cursor-pointer group ${
                  isDraggingLogo 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-border hover:border-border hover:bg-muted/50'
                }`}
                onClick={() => document.getElementById('logo-upload')?.click()}
                onDragOver={(e) => {
                  e.preventDefault()
                  setIsDraggingLogo(true)
                }}
                onDragLeave={() => setIsDraggingLogo(false)}
                onDrop={(e) => handleDrop(e, 'logo')}
              >
                {templateSettings.header.logo ? (
                  <img src={templateSettings.header.logo} alt="Logo" className="h-12 sm:h-16 w-auto mx-auto mb-2" />
                ) : (
                  <Upload className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground mx-auto mb-2 sm:mb-3 group-hover:text-blue-500 transition-colors" />
                )}
                <p className="text-xs sm:text-sm font-medium text-foreground">{templateSettings.header.logo ? 'Change logo' : 'Click or drag to upload logo'}</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 2MB</p>
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      handleImageUpload(file, 'logo')
                    }
                  }}
                />
              </div>
            </div>

            {/* Business Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Business Name</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  value={templateSettings.header.businessName}
                  onChange={(e) => onSettingsChange({ ...templateSettings, header: { ...templateSettings.header, businessName: e.target.value } })}
                  className="h-10 sm:h-11 pl-10 pr-4 text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-border transition-all"
                />
              </div>
            </div>

            {/* Thank You Message */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Thank You Message</label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  value={templateSettings.footer.thankYouMessage}
                  onChange={(e) => onSettingsChange({ ...templateSettings, footer: { ...templateSettings.footer, thankYouMessage: e.target.value } })}
                  className="h-10 sm:h-11 pl-10 pr-4 text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-border transition-all"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Address</label>
              <Input
                type="text"
                value={templateSettings.header.address}
                onChange={(e) => onSettingsChange({ ...templateSettings, header: { ...templateSettings.header, address: e.target.value } })}
                className="h-10 sm:h-11 px-4 text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-border transition-all"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
              <Input
                type="text"
                value={templateSettings.header.phone}
                onChange={(e) => onSettingsChange({ ...templateSettings, header: { ...templateSettings.header, phone: e.target.value } })}
                className="h-10 sm:h-11 px-4 text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-border transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <Input
                type="text"
                value={templateSettings.header.email}
                onChange={(e) => onSettingsChange({ ...templateSettings, header: { ...templateSettings.header, email: e.target.value } })}
                className="h-10 sm:h-11 px-4 text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-border transition-all"
              />
            </div>
          </div>
        </div>

        {/* Layout Section */}
        <div>
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Layout className="h-4 w-4 text-blue-600" strokeWidth={2} />
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">Layout & Display</h4>
          </div>
          <div className="grid gap-4 sm:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {/* Show Tax Toggle */}
            <div className="flex items-center justify-between p-3 sm:p-4 rounded-xl border border-border bg-muted/50 hover:bg-muted transition-all">
              <div>
                <label className="block text-sm font-medium text-foreground">Show Tax</label>
                <p className="text-xs text-muted-foreground mt-0.5">Display tax on receipt</p>
              </div>
              <button
                onClick={() => onSettingsChange({ ...templateSettings, body: { ...templateSettings.body, showTax: !templateSettings.body.showTax } })}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  templateSettings.body.showTax ? "bg-blue-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                    templateSettings.body.showTax ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Show Discount Toggle */}
            <div className="flex items-center justify-between p-3 sm:p-4 rounded-xl border border-border bg-muted/50 hover:bg-muted transition-all">
              <div>
                <label className="block text-sm font-medium text-foreground">Show Discount</label>
                <p className="text-xs text-muted-foreground mt-0.5">Display discounts on receipt</p>
              </div>
              <button
                onClick={() => onSettingsChange({ ...templateSettings, body: { ...templateSettings.body, showDiscount: !templateSettings.body.showDiscount } })}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  templateSettings.body.showDiscount ? "bg-blue-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                    templateSettings.body.showDiscount ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Show Barcode Toggle */}
            <div className="flex items-center justify-between p-3 sm:p-4 rounded-xl border border-border bg-muted/50 hover:bg-muted transition-all">
              <div>
                <label className="block text-sm font-medium text-foreground">Barcode</label>
                <p className="text-xs text-muted-foreground mt-0.5">Include transaction barcode</p>
              </div>
              <button
                onClick={() => onSettingsChange({ ...templateSettings, body: { ...templateSettings.body, showBarcode: !templateSettings.body.showBarcode } })}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  templateSettings.body.showBarcode ? "bg-blue-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                    templateSettings.body.showBarcode ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Font Size */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Font Size</label>
              <select 
                value={templateSettings.body.fontSize}
                onChange={(e) => onSettingsChange({ ...templateSettings, body: { ...templateSettings.body, fontSize: e.target.value } })}
                className="w-full h-10 sm:h-11 px-4 text-sm rounded-xl bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-border transition-all cursor-pointer hover:border-border"
              >
                <option value="10">10px</option>
                <option value="12">12px</option>
                <option value="14">14px</option>
              </select>
            </div>
          </div>
        </div>

        {/* Back of Receipt Section */}
        <div>
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <ImageIcon className="h-4 w-4 text-blue-600" strokeWidth={2} />
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">Footer Settings</h4>
          </div>
          <div className="grid gap-4 sm:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-2">
            {/* Return Policy */}
            <div className="col-span-full">
              <label className="block text-sm font-medium text-foreground mb-2">Return Policy</label>
              <Input
                type="text"
                value={templateSettings.footer.returnPolicy}
                onChange={(e) => onSettingsChange({ ...templateSettings, footer: { ...templateSettings.footer, returnPolicy: e.target.value } })}
                className="h-10 sm:h-11 px-4 text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-border transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
