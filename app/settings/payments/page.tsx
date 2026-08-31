"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CreditCard, Smartphone, DollarSign, Building2, Plus, Edit, Trash2, MoreVertical, CheckCircle, XCircle } from "lucide-react"

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

  const paymentMethods = [
    {
      id: 1,
      name: "Cash",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
      borderColor: "border-green-200",
      description: "Physical cash payments",
      enabled: true,
      isDefault: true,
    },
    {
      id: 2,
      name: "M-Pesa",
      icon: Smartphone,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      borderColor: "border-blue-200",
      description: "Mobile money payments",
      enabled: true,
      isDefault: false,
    },
    {
      id: 3,
      name: "Card",
      icon: CreditCard,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      borderColor: "border-purple-200",
      description: "Credit/Debit card payments",
      enabled: true,
      isDefault: false,
    },
    {
      id: 4,
      name: "Bank Transfer",
      icon: Building2,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      borderColor: "border-orange-200",
      description: "Direct bank transfers",
      enabled: false,
      isDefault: false,
    },
  ]

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
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
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100 text-teal-600 shadow-sm">
                  <CreditCard className="h-5 w-5" strokeWidth={2} />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-semibold text-slate-900">Payment Methods</h1>
                  <p className="text-sm text-slate-500 mt-0.5">Configure and manage payment options</p>
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
              {/* Payment Methods Grid */}
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`rounded-xl border-2 ${method.borderColor} bg-white p-5 shadow-sm hover:shadow-md transition-all duration-200 relative`}
                  >
                    {method.isDefault && (
                      <div className="absolute -top-2 right-4">
                        <span className="bg-teal-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow-sm">
                          Default
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${method.bgColor} ${method.color} shadow-sm`}>
                        <method.icon className="h-6 w-6" strokeWidth={2} />
                      </div>
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 mb-1">{method.name}</h3>
                    <p className="text-sm text-slate-500 mb-4">{method.description}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        {method.enabled ? (
                          <CheckCircle className="h-4 w-4 text-green-600" strokeWidth={2} />
                        ) : (
                          <XCircle className="h-4 w-4 text-slate-400" strokeWidth={2} />
                        )}
                        <span className={`text-xs font-medium ${method.enabled ? "text-green-600" : "text-slate-500"}`}>
                          {method.enabled ? "Enabled" : "Disabled"}
                        </span>
                      </div>
                      {!method.isDefault && method.enabled && (
                        <button className="text-xs text-teal-600 hover:text-teal-700 font-medium">
                          Set Default
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Settings */}
              <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
                <h3 className="text-base font-semibold text-slate-900 mb-4">Payment Settings</h3>
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Default Payment Method
                    </label>
                    <select className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all">
                      <option>Cash</option>
                      <option>M-Pesa</option>
                      <option>Card</option>
                      <option>Bank Transfer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Currency
                    </label>
                    <select className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all">
                      <option>KSh - Kenyan Shilling</option>
                      <option>USD - US Dollar</option>
                      <option>EUR - Euro</option>
                      <option>GBP - British Pound</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Tax Rate (%)
                    </label>
                    <Input
                      type="number"
                      defaultValue="16"
                      className="h-10 px-3 text-sm border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* M-Pesa Configuration */}
              <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-slate-900">M-Pesa Configuration</h3>
                    <button className="text-xs text-teal-600 hover:text-teal-700 font-medium">
                      Test Connection
                    </button>
                  </div>
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Shortcode
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., 174379"
                      className="h-10 px-3 text-sm border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Passkey
                    </label>
                    <Input
                      type="password"
                      placeholder="Enter passkey"
                      className="h-10 px-3 text-sm border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Consumer Key
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter consumer key"
                      className="h-10 px-3 text-sm border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Consumer Secret
                    </label>
                    <Input
                      type="password"
                      placeholder="Enter consumer secret"
                      className="h-10 px-3 text-sm border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Card Payment Configuration */}
              <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
                <h3 className="text-base font-semibold text-slate-900 mb-4">Card Payment Configuration</h3>
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Payment Gateway
                    </label>
                    <select className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all">
                      <option>Stripe</option>
                      <option>PayPal</option>
                      <option>Flutterwave</option>
                      <option>Interswitch</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      API Key
                    </label>
                    <Input
                      type="password"
                      placeholder="Enter API key"
                      className="h-10 px-3 text-sm border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
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
