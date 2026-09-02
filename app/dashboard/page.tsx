"use client"

import { useState, Suspense } from "react"
import dynamic from "next/dynamic"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { useMobile } from "@/lib/hooks/use-mobile"

// Dynamic imports with code splitting and loading states
const StatsCards = dynamic(() => import("@/components/dashboard/stats-cards").then(m => ({ default: m.StatsCards })), {
  loading: () => <div className="h-32 bg-muted/30 animate-pulse rounded-xl" />
})

const SalesOverview = dynamic(() => import("@/components/dashboard/sales-overview").then(m => ({ default: m.SalesOverview })), {
  loading: () => <div className="h-64 bg-muted/30 animate-pulse rounded-xl" />
})

const PaymentMethods = dynamic(() => import("@/components/dashboard/payment-methods").then(m => ({ default: m.PaymentMethods })), {
  loading: () => <div className="h-64 bg-muted/30 animate-pulse rounded-xl" />
})

const RecentTransactions = dynamic(() => import("@/components/dashboard/recent-transactions").then(m => ({ default: m.RecentTransactions })), {
  loading: () => <div className="h-64 bg-muted/30 animate-pulse rounded-xl" />
})

const TopProducts = dynamic(() => import("@/components/dashboard/top-products").then(m => ({ default: m.TopProducts })), {
  loading: () => <div className="h-64 bg-muted/30 animate-pulse rounded-xl" />
})

const LowStockAlerts = dynamic(() => import("@/components/dashboard/low-stock-alerts").then(m => ({ default: m.LowStockAlerts })), {
  loading: () => <div className="h-64 bg-muted/30 animate-pulse rounded-xl" />
})

const BusinessStats = dynamic(() => import("@/components/dashboard/business-stats").then(m => ({ default: m.BusinessStats })), {
  loading: () => <div className="h-32 bg-muted/30 animate-pulse rounded-xl" />
})

export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const isMobile = useMobile()

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

  return (
    <div className="flex h-screen bg-background font-sans overflow-hidden">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        currentPath="/dashboard" 
        mobileOpen={mobileSidebarOpen}
        onMobileClose={closeMobileSidebar}
      />
      <div className="flex flex-1 flex-col overflow-hidden font-sans min-w-0">
        <Header onMenuClick={handleMenuClick} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 font-sans bg-muted/30">
          <div className="space-y-6 w-full max-w-7xl mx-auto font-sans">
            {/* Stats Cards */}
            <StatsCards />

            {/* Charts Row */}
            <div className="grid gap-4 sm:gap-6 md:grid-cols-1 lg:grid-cols-5 w-full min-w-0">
              <div className="lg:col-span-3">
                <SalesOverview />
              </div>
              <div className="lg:col-span-2">
                <PaymentMethods />
              </div>
            </div>

            {/* Tables Row */}
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4 w-full min-w-0">
              <div className="lg:col-span-2 h-full">
                <RecentTransactions />
              </div>
              <div className="lg:col-span-1 h-full">
                <TopProducts />
              </div>
              <div className="lg:col-span-1 h-full">
                <LowStockAlerts />
              </div>
            </div>

            {/* Business Stats */}
            <BusinessStats />
          </div>
        </main>
      </div>
    </div>
  )
}
