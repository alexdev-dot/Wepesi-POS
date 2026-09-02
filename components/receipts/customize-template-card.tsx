"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, Copy, Check, X, Upload, Building2, FileText, Settings, Layout, Palette, Image as ImageIcon } from "lucide-react"
import { getReceiptSettings, saveReceiptSettings, ReceiptSettings } from "@/lib/receipt-settings"

interface CustomizeTemplateCardProps {
  onPreviewClick: (backReceiptData: {
    title: string
    text: string
    email: string
    website: string
  }) => void
}

export function CustomizeTemplateCard({ onPreviewClick }: CustomizeTemplateCardProps) {
  const [settings, setSettings] = useState<ReceiptSettings | null>(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [isDraggingLogo, setIsDraggingLogo] = useState(false)
  const [isDraggingBackImage, setIsDraggingBackImage] = useState(false)

  useEffect(() => {
    setSettings(getReceiptSettings())
  }, [])

  const handleSaveChanges = () => {
    if (settings) {
      saveReceiptSettings(settings)
      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 3000)
    }
  }

  const handleImageUpload = (file: File, type: 'logo' | 'backImage') => {
    const reader = new FileReader()
    reader.onloadend = () => {
      if (type === 'logo') {
        settings && setSettings({ ...settings, logo: reader.result as string })
      } else {
        settings && setSettings({ ...settings, backImage: reader.result as string })
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
              onClick={() => settings && onPreviewClick({
                title: settings.backReceiptTitle,
                text: settings.backReceiptText,
                email: settings.backContactEmail,
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
                {settings?.logo ? (
                  <img src={settings.logo} alt="Logo" className="h-12 sm:h-16 w-auto mx-auto mb-2" />
                ) : (
                  <Upload className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground mx-auto mb-2 sm:mb-3 group-hover:text-blue-500 transition-colors" />
                )}
                <p className="text-xs sm:text-sm font-medium text-foreground">{settings?.logo ? 'Change logo' : 'Click or drag to upload logo'}</p>
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
                  value={settings?.businessName || ''}
                  onChange={(e) => settings && setSettings({ ...settings, businessName: e.target.value })}
                  className="h-10 sm:h-11 pl-10 pr-4 text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-border transition-all"
                />
              </div>
            </div>

            {/* Footer Text */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Footer Text</label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  value={settings?.footerText || ''}
                  onChange={(e) => settings && setSettings({ ...settings, footerText: e.target.value })}
                  className="h-10 sm:h-11 pl-10 pr-4 text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-border transition-all"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Address</label>
              <Input
                type="text"
                value={settings?.address || ''}
                onChange={(e) => settings && setSettings({ ...settings, address: e.target.value })}
                className="h-10 sm:h-11 px-4 text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-border transition-all"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
              <Input
                type="text"
                value={settings?.phone || ''}
                onChange={(e) => settings && setSettings({ ...settings, phone: e.target.value })}
                className="h-10 sm:h-11 px-4 text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-border transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <Input
                type="text"
                value={settings?.email || ''}
                onChange={(e) => settings && setSettings({ ...settings, email: e.target.value })}
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
            {/* Show Contact Info Toggle */}
            <div className="flex items-center justify-between p-3 sm:p-4 rounded-xl border border-border bg-muted/50 hover:bg-muted transition-all">
              <div>
                <label className="block text-sm font-medium text-foreground">Contact Info</label>
                <p className="text-xs text-muted-foreground mt-0.5">Show business contact details</p>
              </div>
              <button
                onClick={() => settings && setSettings({ ...settings, showContactInfo: !settings.showContactInfo })}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  settings?.showContactInfo ? "bg-blue-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                    settings?.showContactInfo ? "translate-x-5" : "translate-x-0"
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
                onClick={() => settings && setSettings({ ...settings, showBarcode: !settings.showBarcode })}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  settings?.showBarcode ? "bg-blue-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                    settings?.showBarcode ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Font Size */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Font Size</label>
              <select 
                value={settings?.fontSize || 'medium'}
                onChange={(e) => settings && setSettings({ ...settings, fontSize: e.target.value as 'small' | 'medium' | 'large' })}
                className="w-full h-10 sm:h-11 px-4 text-sm rounded-xl bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-border transition-all cursor-pointer hover:border-border"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>

            {/* Template Type */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Receipt Template</label>
              <select 
                value={settings?.templateType || 'classic'}
                onChange={(e) => settings && setSettings({ ...settings, templateType: e.target.value as 'classic' | 'compact' | 'modern' })}
                className="w-full h-10 sm:h-11 px-4 text-sm rounded-xl bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-border transition-all cursor-pointer hover:border-border"
              >
                <option value="classic">🧾 Classic Thermal</option>
                <option value="compact">🧾 Compact</option>
                <option value="modern">🛒 Modern Retail</option>
              </select>
            </div>
          </div>
        </div>

        {/* Back of Receipt Section */}
        <div>
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <ImageIcon className="h-4 w-4 text-blue-600" strokeWidth={2} />
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">Back of Receipt</h4>
          </div>
          <div className="grid gap-4 sm:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-2">
            {/* Back Image Upload */}
            <div className="col-span-full sm:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">Back Image</label>
              <div 
                className={`border-2 border-dashed rounded-xl p-4 sm:p-6 text-center transition-all cursor-pointer group ${
                  isDraggingBackImage 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-border hover:border-border hover:bg-muted/50'
                }`}
                onClick={() => document.getElementById('back-image-upload')?.click()}
                onDragOver={(e) => {
                  e.preventDefault()
                  setIsDraggingBackImage(true)
                }}
                onDragLeave={() => setIsDraggingBackImage(false)}
                onDrop={(e) => handleDrop(e, 'backImage')}
              >
                {settings?.backImage ? (
                  <img src={settings.backImage} alt="Back Image" className="h-20 sm:h-24 w-auto mx-auto mb-2 rounded" />
                ) : (
                  <ImageIcon className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground mx-auto mb-2 sm:mb-3 group-hover:text-blue-500 transition-colors" />
                )}
                <p className="text-xs sm:text-sm font-medium text-foreground">{settings?.backImage ? 'Change back image' : 'Click or drag to upload back image'}</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB (appears on reverse side of receipt)</p>
                <input
                  id="back-image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      handleImageUpload(file, 'backImage')
                    }
                  }}
                />
              </div>
            </div>

            {/* Back Receipt Title */}
            <div className="col-span-full sm:col-span-1">
              <label className="block text-sm font-medium text-foreground mb-2">Section Title</label>
              <Input
                type="text"
                value={settings?.backReceiptTitle || ''}
                onChange={(e) => settings && setSettings({ ...settings, backReceiptTitle: e.target.value })}
                className="h-10 sm:h-11 px-4 text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-border transition-all"
              />
            </div>

            {/* Back Receipt Text */}
            <div className="col-span-full sm:col-span-1">
              <label className="block text-sm font-medium text-foreground mb-2">Policy Text</label>
              <Input
                type="text"
                value={settings?.backReceiptText || ''}
                onChange={(e) => settings && setSettings({ ...settings, backReceiptText: e.target.value })}
                className="h-10 sm:h-11 px-4 text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-border transition-all"
              />
            </div>

            {/* Contact Email */}
            <div className="col-span-full sm:col-span-1">
              <label className="block text-sm font-medium text-foreground mb-2">Contact Email</label>
              <Input
                type="text"
                value={settings?.backContactEmail || ''}
                onChange={(e) => settings && setSettings({ ...settings, backContactEmail: e.target.value })}
                className="h-10 sm:h-11 px-4 text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-border transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 sm:px-6 py-4 border-t border-border bg-muted/50">
        {showSuccessMessage && (
          <div className="mb-3 sm:mb-4 flex items-center gap-2 text-green-600 bg-green-50 border border-green-200 rounded-lg px-3 sm:px-4 py-2 sm:py-3 animate-in fade-in slide-in-from-top-2   ">
            <Check className="h-4 w-4" />
            <span className="text-xs sm:text-sm font-medium">Template saved successfully!</span>
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end">
          <Button variant="outline" className="w-full sm:w-36 h-10 sm:h-11 border-border text-foreground hover:bg-muted hover:border-border transition-all font-medium">
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button className="w-full sm:w-36 h-10 sm:h-11 bg-blue-600 hover:bg-blue-700 text-sm font-semibold shadow-sm hover:shadow-md transition-all" onClick={handleSaveChanges}>
            <Check className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
