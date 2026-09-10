"use client"

import { useState } from "react"
import { Settings, Upload, X, Save, Image, Palette, Type, Globe, Mail, Phone, MapPin, CheckCircle, Eye, EyeOff, Lock, User, LayoutDashboard, Shield, Bell } from "lucide-react"

type TabType = "branding" | "contact" | "preferences" | "security"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("branding")
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

  const [credentials, setCredentials] = useState({
    currentEmail: "",
    newEmail: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })
  const [credentialMessage, setCredentialMessage] = useState({ type: "", text: "" })

  const tabs = [
    { id: "branding" as TabType, label: "Branding & Appearance", icon: Palette },
    { id: "contact" as TabType, label: "Contact Information", icon: Globe },
    { id: "preferences" as TabType, label: "System Preferences", icon: Bell },
    { id: "security" as TabType, label: "Account Security", icon: Shield },
  ]

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

  const handleEmailChange = async () => {
    if (!credentials.currentEmail || !credentials.newEmail) {
      setCredentialMessage({ type: "error", text: "Please fill in all email fields" })
      return
    }

    try {
      const response = await fetch('/api/admin/update-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentEmail: credentials.currentEmail,
          newEmail: credentials.newEmail
        })
      })

      const data = await response.json()

      if (response.ok) {
        setCredentialMessage({ type: "success", text: "Email updated successfully" })
        setCredentials({ ...credentials, currentEmail: "", newEmail: "" })
      } else {
        setCredentialMessage({ type: "error", text: data.error || "Failed to update email" })
      }
    } catch (error) {
      setCredentialMessage({ type: "error", text: "Network error occurred" })
    }
  }

  const handlePasswordChange = async () => {
    if (!credentials.currentPassword || !credentials.newPassword || !credentials.confirmPassword) {
      setCredentialMessage({ type: "error", text: "Please fill in all password fields" })
      return
    }

    if (credentials.newPassword !== credentials.confirmPassword) {
      setCredentialMessage({ type: "error", text: "New passwords do not match" })
      return
    }

    if (credentials.newPassword.length < 8) {
      setCredentialMessage({ type: "error", text: "Password must be at least 8 characters" })
      return
    }

    try {
      const response = await fetch('/api/admin/update-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: credentials.currentPassword,
          newPassword: credentials.newPassword
        })
      })

      const data = await response.json()

      if (response.ok) {
        setCredentialMessage({ type: "success", text: "Password updated successfully" })
        setCredentials({ ...credentials, currentPassword: "", newPassword: "", confirmPassword: "" })
      } else {
        setCredentialMessage({ type: "error", text: data.error || "Failed to update password" })
      }
    } catch (error) {
      setCredentialMessage({ type: "error", text: "Network error occurred" })
    }
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

      {/* Tab Navigation */}
      <div className="border-b border-slate-200">
        <nav className="flex gap-1 overflow-x-auto" aria-label="Settings tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-slate-600 hover:text-slate-800 hover:border-slate-300"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-100">
        {activeTab === "branding" && (
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
                    suppressHydrationWarning
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
                    suppressHydrationWarning
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
                      suppressHydrationWarning
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
                      suppressHydrationWarning
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
                      suppressHydrationWarning
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
                      suppressHydrationWarning
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
          </div>
        )}

        {activeTab === "contact" && (
          <div className="max-w-2xl">
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
                      suppressHydrationWarning
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
                      suppressHydrationWarning
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
                      suppressHydrationWarning
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
          </div>
        )}

        {activeTab === "preferences" && (
          <div className="max-w-2xl">
            <div className="rounded-xl border border-slate-200 bg-card shadow-sm">
              <div className="px-4 sm:px-6 py-4 border-b border-slate-200">
                <h2 className="text-base sm:text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <Bell className="h-5 w-5 sm:h-6 sm:w-6 text-slate-400" />
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
        )}

        {activeTab === "security" && (
          <div className="max-w-2xl">
            <div className="rounded-xl border border-slate-200 bg-card shadow-sm">
              <div className="px-4 sm:px-6 py-4 border-b border-slate-200">
                <h2 className="text-base sm:text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-slate-400" />
                  Account Security
                </h2>
              </div>
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {/* Email Change Section */}
                <div className="space-y-3">
                  <h3 className="text-sm sm:text-base font-medium text-slate-800 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Change Email
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Current Email</label>
                      <input
                        type="email"
                        value={credentials.currentEmail}
                        onChange={(e) => setCredentials({ ...credentials, currentEmail: e.target.value })}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                        placeholder="Enter current email"
                        suppressHydrationWarning
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">New Email</label>
                      <input
                        type="email"
                        value={credentials.newEmail}
                        onChange={(e) => setCredentials({ ...credentials, newEmail: e.target.value })}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                        placeholder="Enter new email"
                        suppressHydrationWarning
                      />
                    </div>
                    <button
                      onClick={handleEmailChange}
                      className="w-full sm:w-auto px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                    >
                      Update Email
                    </button>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-4 sm:pt-6" />

                {/* Password Change Section */}
                <div className="space-y-3">
                  <h3 className="text-sm sm:text-base font-medium text-slate-800 flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Change Password
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Current Password</label>
                      <div className="relative">
                        <input
                          type={showPasswords.current ? "text" : "password"}
                          value={credentials.currentPassword}
                          onChange={(e) => setCredentials({ ...credentials, currentPassword: e.target.value })}
                          className="w-full px-4 py-2.5 pr-10 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                          placeholder="Enter current password"
                          suppressHydrationWarning
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">New Password</label>
                      <div className="relative">
                        <input
                          type={showPasswords.new ? "text" : "password"}
                          value={credentials.newPassword}
                          onChange={(e) => setCredentials({ ...credentials, newPassword: e.target.value })}
                          className="w-full px-4 py-2.5 pr-10 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                          placeholder="Enter new password (min 8 characters)"
                          suppressHydrationWarning
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm New Password</label>
                      <div className="relative">
                        <input
                          type={showPasswords.confirm ? "text" : "password"}
                          value={credentials.confirmPassword}
                          onChange={(e) => setCredentials({ ...credentials, confirmPassword: e.target.value })}
                          className="w-full px-4 py-2.5 pr-10 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                          placeholder="Confirm new password"
                          suppressHydrationWarning
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={handlePasswordChange}
                      className="w-full sm:w-auto px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                    >
                      Update Password
                    </button>
                  </div>
                </div>

                {/* Feedback Message */}
                {credentialMessage.text && (
                  <div className={`p-3 rounded-lg text-sm ${credentialMessage.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                    {credentialMessage.text}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
