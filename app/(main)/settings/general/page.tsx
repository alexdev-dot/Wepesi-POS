"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/core/layout/sidebar"
import { Header } from "@/components/core/layout/header"
import { Button } from "@/components/ui/button"
import { Save, RotateCcw, Building2, Settings, Bell, Shield } from "lucide-react"
import { BusinessInfoCard } from "@/components/domains/settings/cards/business-info-card"
import { SystemPrefsCard } from "@/components/domains/settings/cards/system-prefs-card"
import { NotificationSettingsCard } from "@/components/domains/settings/cards/notification-settings-card"
import { SecuritySettingsCard } from "@/components/domains/settings/cards/security-settings-card"

type TabType = "business" | "system" | "notifications" | "security"

export default function GeneralSettingsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabType>("business")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const tabs = [
    { id: "business" as TabType, label: "Business Information", icon: Building2 },
    { id: "system" as TabType, label: "System Preferences", icon: Settings },
    { id: "notifications" as TabType, label: "Notifications", icon: Bell },
    { id: "security" as TabType, label: "Security", icon: Shield },
  ]

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const userId = localStorage.getItem('user_id')
    const userOnboarded = localStorage.getItem('user_onboarded')

    if (!userId || userOnboarded !== 'true') {
      router.replace('/login')
      return
    }

    // Fetch tenant data in background
    const fetchTenantData = async () => {
      try {
        const response = await fetch('/api/tenant', {
          headers: {
            'x-user-id': userId
          }
        })
        const data = await response.json()

        if (response.ok && data.tenant) {
          setBusinessInfo(prev => ({
            ...prev,
            businessName: data.tenant.business_name,
            businessType: data.tenant.business_type,
            address: data.tenant.branch_address || `${data.tenant.branch_name}, ${data.tenant.city}, ${data.tenant.country}`,
            subdomain: data.tenant.branch_name.toLowerCase().replace(/\s+/g, '-'),
          }))
          setSystemPrefs(prev => ({
            ...prev,
            currency: data.tenant.currency === 'USD' ? '$' : data.tenant.currency === 'KES' ? 'KSh' : data.tenant.currency,
          }))
        }
      } catch (err) {
        console.error('Failed to fetch tenant data:', err)
      }
    }

    fetchTenantData()
  }, [router])

  // Business Information State
  const [businessInfo, setBusinessInfo] = useState({
    businessName: "",
    businessType: "retail",
    phone: "",
    email: "",
    address: "",
    subdomain: "",
  })

  // System Preferences State
  const [systemPrefs, setSystemPrefs] = useState({
    currency: "KSh",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "24h",
    language: "en",
    timezone: "Africa/Nairobi",
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
      businessName: "",
      businessType: "retail",
      phone: "",
      email: "",
      address: "",
      subdomain: "",
    })
    setSystemPrefs({
      currency: "KSh",
      dateFormat: "DD/MM/YYYY",
      timeFormat: "24h",
      language: "en",
      timezone: "Africa/Nairobi",
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
    <div className="flex h-screen bg-background font-sans">
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
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">General Settings</h1>
                <p className="text-sm text-muted-foreground mt-1">Configure your POS system preferences and business information</p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button 
                  className="h-10 sm:h-11 bg-muted hover:bg-muted/80 text-foreground text-sm font-semibold shadow-sm hover:shadow transition-all flex-1 sm:flex-none"
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
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3  ">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Save className="h-4 w-4 text-green-600 " />
                </div>
                <p className="text-sm font-medium text-green-800 ">Settings saved successfully!</p>
              </div>
            )}

            {/* Tab Navigation */}
            <div className="border-b border-border">
              <nav className="flex gap-1 overflow-x-auto" aria-label="Settings tabs">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === tab.id
                          ? "border-blue-600 text-blue-600"
                          : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
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
              {activeTab === "business" && (
                <div className="w-full max-w-3xl mx-auto">
                  <BusinessInfoCard businessInfo={businessInfo} onChange={setBusinessInfo} />
                </div>
              )}

              {activeTab === "system" && (
                <div className="w-full max-w-3xl mx-auto">
                  <SystemPrefsCard systemPrefs={systemPrefs} onChange={setSystemPrefs} />
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="w-full max-w-3xl mx-auto">
                  <NotificationSettingsCard notificationSettings={notificationSettings} onChange={setNotificationSettings} />
                </div>
              )}

              {activeTab === "security" && (
                <div className="w-full max-w-3xl mx-auto">
                  <SecuritySettingsCard securitySettings={securitySettings} onChange={setSecuritySettings} />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
