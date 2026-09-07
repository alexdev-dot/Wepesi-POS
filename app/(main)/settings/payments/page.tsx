"use client"

import { useState } from "react"
import { Sidebar } from "@/components/core/layout/sidebar"
import { Header } from "@/components/core/layout/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CreditCard, Plus, Edit, Trash2, CheckCircle, XCircle } from "lucide-react"

export default function PaymentMethodsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false)

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

  const paymentProviders = [
    {
      id: 1,
      name: "M-Pesa",
      description: "Safaricom mobile money payments",
      enabled: true,
      isDefault: true,
    },
  ]

  return (
    <div className="flex h-screen bg-background font-sans">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        currentPath="/settings/payments" 
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
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100 text-teal-600 shadow-sm  ">
                  <CreditCard className="h-5 w-5" strokeWidth={2} />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-semibold text-foreground">Payment Methods</h1>
                  <p className="text-sm text-muted-foreground mt-0.5">Configure and manage payment options</p>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-end">
                <Button 
                  className="h-10 bg-teal-600 hover:bg-teal-700 text-sm font-semibold shadow-sm hover:shadow-md transition-all"
                  onClick={() => setIsAddPaymentOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Payment Method
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto px-4 sm:px-6 pb-6">
            <div className="max-w-7xl mx-auto">
              {/* Payment Providers Grid */}
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {paymentProviders.map((provider) => (
                  <div
                    key={provider.id}
                    className={`rounded-xl border-2 ${provider.enabled ? 'border-teal-200' : 'border-border'} bg-card p-5 shadow-sm hover:shadow-md transition-all duration-200 relative`}
                  >
                    {provider.isDefault && (
                      <div className="absolute -top-2 right-4">
                        <span className="bg-teal-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow-sm">
                          Default
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${provider.enabled ? 'bg-teal-100 text-teal-600' : 'bg-muted text-muted-foreground'} shadow-sm bg-opacity-30`}>
                        <CreditCard className="h-6 w-6" strokeWidth={2} />
                      </div>
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-1">{provider.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{provider.description}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="flex items-center gap-2">
                        {provider.enabled ? (
                          <CheckCircle className="h-4 w-4 text-green-600" strokeWidth={2} />
                        ) : (
                          <XCircle className="h-4 w-4 text-muted-foreground" strokeWidth={2} />
                        )}
                        <span className={`text-xs font-medium ${provider.enabled ? "text-green-600" : "text-muted-foreground"}`}>
                          {provider.enabled ? "Enabled" : "Disabled"}
                        </span>
                      </div>
                      {!provider.isDefault && provider.enabled && (
                        <button className="text-xs text-teal-600 hover:text-teal-700 font-medium">
                          Set Default
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Settings */}
              <div className="mt-6 rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm">
                <h3 className="text-base font-semibold text-foreground mb-4">Payment Settings</h3>
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Default Payment Provider
                    </label>
                    <select className="w-full px-3 py-2.5 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all">
                      <option>M-Pesa</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Currency
                    </label>
                    <select className="w-full px-3 py-2.5 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all">
                      <option>KSh - Kenyan Shilling</option>
                      <option>USD - US Dollar</option>
                      <option>EUR - Euro</option>
                      <option>GBP - British Pound</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Tax Rate (%)
                    </label>
                    <Input
                      type="number"
                      defaultValue="16"
                      className="h-10 px-3 text-sm border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* M-Pesa Configuration */}
              <div className="mt-6 rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-foreground">M-Pesa Configuration</h3>
                    <button className="text-xs text-teal-600 hover:text-teal-700 font-medium">
                      Test Connection
                    </button>
                  </div>
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Shortcode
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., 174379"
                      className="h-10 px-3 text-sm border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Passkey
                    </label>
                    <Input
                      type="password"
                      placeholder="Enter passkey"
                      className="h-10 px-3 text-sm border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Consumer Key
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter consumer key"
                      className="h-10 px-3 text-sm border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Consumer Secret
                    </label>
                    <Input
                      type="password"
                      placeholder="Enter consumer secret"
                      className="h-10 px-3 text-sm border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                    />
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
