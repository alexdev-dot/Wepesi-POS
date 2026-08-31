"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Sparkles, Check, X, Crown, Zap, Building2, CheckCircle2 } from "lucide-react"

export default function UpgradeSubscriptionPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState("pro")
  const [billingCycle, setBillingCycle] = useState("monthly")

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

  const plans = [
    {
      id: "basic",
      name: "Basic",
      description: "Perfect for small businesses",
      icon: Zap,
      color: "text-slate-600",
      bgColor: "bg-slate-100",
      borderColor: "border-slate-200",
      price: { monthly: 2999, yearly: 29990 },
      features: [
        "Up to 2 users",
        "100 products",
        "Basic reports",
        "Email support",
        "1 location",
      ],
      popular: false,
    },
    {
      id: "pro",
      name: "Pro",
      description: "For growing businesses",
      icon: Crown,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
      borderColor: "border-amber-500",
      price: { monthly: 5999, yearly: 59990 },
      features: [
        "Up to 10 users",
        "Unlimited products",
        "Advanced reports",
        "Priority support",
        "5 locations",
        "Inventory management",
        "Multi-currency support",
      ],
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "For large organizations",
      icon: Building2,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      borderColor: "border-purple-200",
      price: { monthly: 14999, yearly: 149990 },
      features: [
        "Unlimited users",
        "Unlimited products",
        "Custom reports",
        "24/7 dedicated support",
        "Unlimited locations",
        "Advanced inventory",
        "Multi-currency support",
        "API access",
        "Custom integrations",
        "White-label option",
      ],
      popular: false,
    },
  ]

  const features = [
    { name: "Users", basic: "2", pro: "10", enterprise: "Unlimited" },
    { name: "Products", basic: "100", pro: "Unlimited", enterprise: "Unlimited" },
    { name: "Locations", basic: "1", pro: "5", enterprise: "Unlimited" },
    { name: "Reports", basic: "Basic", pro: "Advanced", enterprise: "Custom" },
    { name: "Support", basic: "Email", pro: "Priority", enterprise: "24/7 Dedicated" },
    { name: "Inventory", basic: "Basic", pro: "Advanced", enterprise: "Advanced" },
    { name: "Multi-currency", basic: "No", pro: "Yes", enterprise: "Yes" },
    { name: "API Access", basic: "No", pro: "No", enterprise: "Yes" },
    { name: "Custom Integrations", basic: "No", pro: "No", enterprise: "Yes" },
    { name: "White-label", basic: "No", pro: "No", enterprise: "Yes" },
  ]

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        currentPath="/settings/upgrade" 
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
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600 shadow-sm">
                  <Sparkles className="h-5 w-5" strokeWidth={2} />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-semibold text-slate-900">Upgrade Subscription</h1>
                  <p className="text-sm text-slate-500 mt-0.5">Choose the perfect plan for your business</p>
                </div>
              </div>

              {/* Billing Toggle */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    billingCycle === "monthly"
                      ? "bg-amber-600 text-white shadow-sm"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-sm"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle("yearly")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    billingCycle === "yearly"
                      ? "bg-amber-600 text-white shadow-sm"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-sm"
                  }`}
                >
                  Yearly
                  <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Save 17%</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto px-4 sm:px-6 pb-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Pricing Plans */}
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative rounded-xl border-2 ${plan.borderColor} bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-200 ${
                      plan.popular ? "scale-105 z-10" : ""
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="bg-amber-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                          Most Popular
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${plan.bgColor} ${plan.color} shadow-sm`}>
                        <plan.icon className="h-6 w-6" strokeWidth={2} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
                        <p className="text-xs text-slate-500">{plan.description}</p>
                      </div>
                    </div>
                    <div className="mb-6">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl sm:text-4xl font-bold text-slate-900">
                          KSh {billingCycle === "monthly" ? plan.price.monthly.toLocaleString() : plan.price.yearly.toLocaleString()}
                        </span>
                        <span className="text-sm text-slate-500">
                          /{billingCycle === "monthly" ? "month" : "year"}
                        </span>
                      </div>
                    </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" strokeWidth={2} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full h-11 font-semibold shadow-sm hover:shadow-md transition-all ${
                    plan.id === selectedPlan
                      ? "bg-amber-600 hover:bg-amber-700 text-white"
                      : "bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.id === selectedPlan ? "Current Plan" : "Select Plan"}
                </Button>
              </div>
            ))}
          </div>

          {/* Features Comparison */}
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h3 className="text-base font-semibold text-slate-900">Feature Comparison</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">Basic</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-amber-600">Pro</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {features.map((feature, index) => (
                    <tr key={index} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-slate-700 font-medium">{feature.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 text-center">{feature.basic}</td>
                      <td className="px-6 py-4 text-sm text-slate-900 font-semibold text-center">{feature.pro}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 text-center">{feature.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900 mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-4">
                <h4 className="text-sm font-semibold text-slate-900 mb-2">Can I change my plan later?</h4>
                <p className="text-sm text-slate-600">Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated accordingly.</p>
              </div>
              <div className="border-b border-slate-100 pb-4">
                <h4 className="text-sm font-semibold text-slate-900 mb-2">What payment methods do you accept?</h4>
                <p className="text-sm text-slate-600">We accept M-Pesa, credit cards, bank transfers, and mobile money payments.</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-2">Is there a free trial?</h4>
                <p className="text-sm text-slate-600">Yes, we offer a 14-day free trial on all plans. No credit card required.</p>
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
