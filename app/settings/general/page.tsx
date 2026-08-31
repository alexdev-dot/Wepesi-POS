"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Save, RotateCcw } from "lucide-react"
import { BusinessInfoCard } from "@/components/settings/business-info-card"
import { SystemPrefsCard } from "@/components/settings/system-prefs-card"
import { DisplaySettingsCard } from "@/components/settings/display-settings-card"
import { ReceiptSettingsCard } from "@/components/settings/receipt-settings-card"
import { NotificationSettingsCard } from "@/components/settings/notification-settings-card"
import { SecuritySettingsCard } from "@/components/settings/security-settings-card"

export default function GeneralSettingsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Business Information State
  const [businessInfo, setBusinessInfo] = useState({
    businessName: "My Business",
    businessType: "retail",
    phone: "+254 700 000 000",
    email: "contact@mybusiness.com",
    address: "123 Main Street, Nairobi, Kenya",
    subdomain: "mybusiness",
  })

  // System Preferences State
  const [systemPrefs, setSystemPrefs] = useState({
    currency: "KSh",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "24h",
    language: "en",
    timezone: "Africa/Nairobi",
  })

  // Display Settings State
  const [displaySettings, setDisplaySettings] = useState({
    theme: "light",
    sidebarDefault: "expanded",
    itemsPerPage: "25",
  })

  // Receipt Settings State
  const [receiptSettings, setReceiptSettings] = useState({
    showLogo: true,
    showCustomerDetails: true,
    footerText: "Thank you for your business!",
    defaultPrinter: "thermal",
  })

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    lowStockAlerts: true,
    emailNotifications: true,
    pushNotifications: false,
    dailySalesReport: true,
  })

  // Security Settings State
  const [securitySettings, setSecuritySettings] = useState({
    sessionTimeout: "30",
    requirePassword: true,
    twoFactorAuth: false,
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
    if (isMobile) {
      toggleMobileSidebar()
    } else {
      toggleSidebar()
    }
  }

  const handleSave = () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    }, 1500)
  }

  const handleReset = () => {
    // Reset to defaults
    setBusinessInfo({
      businessName: "My Business",
      businessType: "retail",
      phone: "+254 700 000 000",
      email: "contact@mybusiness.com",
      address: "123 Main Street, Nairobi, Kenya",
      subdomain: "mybusiness",
    })
    setSystemPrefs({
      currency: "KSh",
      dateFormat: "DD/MM/YYYY",
      timeFormat: "24h",
      language: "en",
      timezone: "Africa/Nairobi",
    })
    setDisplaySettings({
      theme: "light",
      sidebarDefault: "expanded",
      itemsPerPage: "25",
    })
    setReceiptSettings({
      showLogo: true,
      showCustomerDetails: true,
      footerText: "Thank you for your business!",
      defaultPrinter: "thermal",
    })
    setNotificationSettings({
      lowStockAlerts: true,
      emailNotifications: true,
      pushNotifications: false,
      dailySalesReport: true,
    })
    setSecuritySettings({
      sessionTimeout: "30",
      requirePassword: true,
      twoFactorAuth: false,
    })
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        currentPath="/settings/general" 
        mobileOpen={mobileSidebarOpen}
        onMobileClose={closeMobileSidebar}
      />
      <div className="flex flex-1 flex-col overflow-hidden font-sans">
        <Header onMenuClick={handleMenuClick} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 font-sans">
          <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto font-sans">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">General Settings</h1>
                <p className="text-sm text-slate-500 mt-1">Configure your POS system preferences and business information</p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button 
                  className="h-10 sm:h-11 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold shadow-sm hover:shadow transition-all flex-1 sm:flex-none"
                  variant="outline"
                  onClick={handleReset}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset to Defaults
                </Button>
                <Button 
                  className="h-10 sm:h-11 bg-blue-600 hover:bg-blue-700 text-sm font-semibold shadow-sm hover:shadow transition-all flex-1 sm:flex-none"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>

            {/* Success Message */}
            {saveSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Save className="h-4 w-4 text-green-600" />
                </div>
                <p className="text-sm font-medium text-green-800">Settings saved successfully!</p>
              </div>
            )}

            {/* Settings Grid */}
            <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
              <BusinessInfoCard businessInfo={businessInfo} onChange={setBusinessInfo} />
              <SystemPrefsCard systemPrefs={systemPrefs} onChange={setSystemPrefs} />
              <DisplaySettingsCard displaySettings={displaySettings} onChange={setDisplaySettings} />
              <ReceiptSettingsCard receiptSettings={receiptSettings} onChange={setReceiptSettings} />
              <NotificationSettingsCard notificationSettings={notificationSettings} onChange={setNotificationSettings} />
              <SecuritySettingsCard securitySettings={securitySettings} onChange={setSecuritySettings} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
