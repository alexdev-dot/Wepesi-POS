"use client"

import { useState } from "react"
import { Settings, Upload, X, Save, Image, Palette, Type, Globe, Mail, Phone, MapPin, CheckCircle, Eye } from "lucide-react"

export default function SettingsPage() {
  const [logoPreview, setLogoPreview] = useState("")
  const [faviconPreview, setFaviconPreview] = useState("")
  const [logoError, setLogoError] = useState(false)
  const [faviconError, setFaviconError] = useState(false)
  const [headerBgColor, setHeaderBgColor] = useState("#ffffff")
  const [headerTextColor, setHeaderTextColor] = useState("#1e293b")
  const [primaryColor, setPrimaryColor] = useState("#22c55e")
  const [secondaryColor, setSecondaryColor] = useState("#10b981")
  const [settings, setSettings] = useState({
    companyName: "POS System",
    tagline: "Point of Sale Solution",
    website: "https://pos-system.com",
    supportEmail: "support@pos-system.com",
    supportPhone: "+1 (555) 123-4567",
    address: "123 Business Ave, Suite 100, San Francisco, CA 94102"
  })

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFaviconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFaviconPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    console.log("Saving settings:", { logoPreview, faviconPreview, headerBgColor, headerTextColor, primaryColor, secondaryColor, settings })
    // TODO: Implement actual save logic (API call)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 sm:p-4 rounded-lg bg-slate-100 text-slate-600">
            <Settings className="h-6 w-6 sm:h-7 sm:w-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Global Settings</h1>
            <p className="text-sm sm:text-base text-slate-600">Configure global system settings and preferences</p>
          </div>
        </div>
        <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-primary text-white rounded-lg hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all font-medium text-sm sm:text-base">
          <Save className="h-4 w-4 sm:h-5 sm:w-5" />
          Save Changes
        </button>
      </div>

      {/* Settings Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Logo & Branding */}
        <div className="rounded-xl border border-slate-200 bg-card shadow-sm">
          <div className="px-4 sm:px-6 py-4 border-b border-slate-200">
            <h2 className="text-base sm:text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Image className="h-5 w-5 sm:h-6 sm:w-6 text-slate-400" />
              Logo & Branding
            </h2>
          </div>
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Logo Upload */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-slate-700 mb-3">
                Company Logo
              </label>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="relative">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Logo Preview"
                      className="h-24 w-24 object-contain rounded-lg border border-slate-200 bg-card"
                      onError={() => setLogoError(true)}
                    />
                  ) : (
                    <div className="h-24 w-24 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center">
                      <Image className="h-8 w-8 text-slate-300" />
                    </div>
                  )}
                  {logoPreview && (
                    <button
                      onClick={() => { setLogoPreview(""); setLogoError(false) }}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm sm:text-base text-slate-600 mb-2">
                    Upload your company logo. Recommended size: 200x200px. Supported formats: PNG, JPG, SVG.
                  </p>
                  <label className="inline-flex items-center gap-2 px-4 py-2 sm:py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer text-sm sm:text-base font-medium">
                    <Upload className="h-4 w-4" />
                    Upload Logo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Favicon Upload */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-slate-700 mb-3">
                Favicon
              </label>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="relative">
                  {faviconPreview ? (
                    <img
                      src={faviconPreview}
                      alt="Favicon Preview"
                      className="h-16 w-16 object-contain rounded-lg border border-slate-200 bg-card"
                      onError={() => setFaviconError(true)}
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center">
                      <Image className="h-6 w-6 text-slate-300" />
                    </div>
                  )}
                  {faviconPreview && (
                    <button
                      onClick={() => { setFaviconPreview(""); setFaviconError(false) }}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm sm:text-base text-slate-600 mb-2">
                    Upload your favicon. Recommended size: 32x32px or 16x16px. Supported formats: ICO, PNG.
                  </p>
                  <label className="inline-flex items-center gap-2 px-4 py-2 sm:py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer text-sm sm:text-base font-medium">
                    <Upload className="h-4 w-4" />
                    Upload Favicon
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFaviconUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-slate-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => setSettings(prev => ({ ...prev, companyName: e.target.value }))}
                className="w-full px-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm sm:text-base"
                placeholder="Enter company name"
              />
            </div>

            {/* Tagline */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-slate-700 mb-2">
                Tagline
              </label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings(prev => ({ ...prev, tagline: e.target.value }))}
                className="w-full px-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm sm:text-base"
                placeholder="Enter tagline"
              />
            </div>
          </div>
        </div>

        {/* Colors & Theme */}
        <div className="rounded-xl border border-slate-200 bg-card shadow-sm">
          <div className="px-4 sm:px-6 py-4 border-b border-slate-200">
            <h2 className="text-base sm:text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Palette className="h-5 w-5 sm:h-6 sm:w-6 text-slate-400" />
              Colors & Theme
            </h2>
          </div>
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Header Background Color */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-slate-700 mb-2">
                Header Background Color
              </label>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="color"
                    value={headerBgColor}
                    onChange={(e) => setHeaderBgColor(e.target.value)}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg border border-slate-200 cursor-pointer"
                  />
                </div>
                <input
                  type="text"
                  value={headerBgColor}
                  onChange={(e) => setHeaderBgColor(e.target.value)}
                  className="flex-1 px-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all text-sm sm:text-base uppercase"
                />
              </div>
            </div>

            {/* Header Text Color */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-slate-700 mb-2">
                Header Text Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={headerTextColor}
                  onChange={(e) => setHeaderTextColor(e.target.value)}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg border border-slate-200 cursor-pointer"
                />
                <input
                  type="text"
                  value={headerTextColor}
                  onChange={(e) => setHeaderTextColor(e.target.value)}
                  className="flex-1 px-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all text-sm sm:text-base uppercase"
                />
              </div>
            </div>

            {/* Primary Color */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-slate-700 mb-2">
                Primary Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg border border-slate-200 cursor-pointer"
                />
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="flex-1 px-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all text-sm sm:text-base uppercase"
                />
              </div>
            </div>

            {/* Secondary Color */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-slate-700 mb-2">
                Secondary Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg border border-slate-200 cursor-pointer"
                />
                <input
                  type="text"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="flex-1 px-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all text-sm sm:text-base uppercase"
                />
              </div>
            </div>

            {/* Preview */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-slate-700 mb-2">
                Preview
              </label>
              <div
                className="rounded-lg p-4 border border-slate-200"
                style={{ backgroundColor: headerBgColor }}
              >
                <div className="flex items-center gap-3">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo" className="h-10 w-10 object-contain" />
                  ) : (
                    <div className="h-10 w-10 rounded-lg bg-slate-200 flex items-center justify-center">
                      <Image className="h-5 w-5 text-slate-400" />
                    </div>
                  )}
                  <div>
                    <p style={{ color: headerTextColor }} className="font-semibold text-sm sm:text-base">{settings.companyName}</p>
                    <p style={{ color: headerTextColor }} className="text-xs sm:text-sm opacity-70">{settings.tagline}</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    className="px-3 py-1.5 sm:px-4 sm:py-2 text-white text-sm sm:text-base rounded"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Primary
                  </button>
                  <button
                    className="px-3 py-1.5 sm:px-4 sm:py-2 text-white text-sm sm:text-base rounded"
                    style={{ backgroundColor: secondaryColor }}
                  >
                    Secondary
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="rounded-xl border border-slate-200 bg-card shadow-sm">
          <div className="px-4 sm:px-6 py-4 border-b border-slate-200">
            <h2 className="text-base sm:text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-slate-400" />
              Contact Information
            </h2>
          </div>
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Website */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-slate-700 mb-2">
                Website URL
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="url"
                  value={settings.website}
                  onChange={(e) => setSettings(prev => ({ ...prev, website: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all text-sm sm:text-base"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            {/* Support Email */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-slate-700 mb-2">
                Support Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => setSettings(prev => ({ ...prev, supportEmail: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all text-sm sm:text-base"
                  placeholder="support@example.com"
                />
              </div>
            </div>

            {/* Support Phone */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-slate-700 mb-2">
                Support Phone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="tel"
                  value={settings.supportPhone}
                  onChange={(e) => setSettings(prev => ({ ...prev, supportPhone: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all text-sm sm:text-base"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-slate-700 mb-2">
                Business Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <textarea
                  value={settings.address}
                  onChange={(e) => setSettings(prev => ({ ...prev, address: e.target.value }))}
                  rows={3}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all text-sm sm:text-base resize-none"
                  placeholder="Enter full business address"
                />
              </div>
            </div>
          </div>
        </div>

        {/* System Preferences */}
        <div className="rounded-xl border border-slate-200 bg-card shadow-sm">
          <div className="px-4 sm:px-6 py-4 border-b border-slate-200">
            <h2 className="text-base sm:text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-slate-400" />
              System Preferences
            </h2>
          </div>
          <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
            {/* Toggle Options */}
            {[
              { label: "Enable email notifications", key: "emailNotifications" },
              { label: "Enable SMS notifications", key: "smsNotifications" },
              { label: "Auto-generate invoices", key: "autoInvoices" },
              { label: "Enable maintenance mode", key: "maintenanceMode" }
            ].map((option) => (
              <div key={option.key} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 gap-3">
                <div>
                  <h3 className="text-sm sm:text-base font-medium text-slate-800">{option.label}</h3>
                  <p className="text-xs sm:text-sm text-slate-500">Configure this setting for your system</p>
                </div>
                <button className="relative w-12 h-6 sm:w-14 sm:h-7 rounded-full bg-primary transition-colors shrink-0">
                  <div className="absolute top-1 left-1 w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full transition-transform translate-x-6 sm:translate-x-7" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
