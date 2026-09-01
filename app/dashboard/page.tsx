"use client"

import { useState, useEffect, Suspense } from "react"
import { debounce } from "@/lib/utils-debounce"
import dynamic from "next/dynamic"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"

// Dynamic imports with code splitting
const StatsCards = dynamic(() => import("@/components/dashboard/stats-cards").then(m => ({ default: m.StatsCards })), {
  loading: () => <div className="h-32 bg-muted/30 animate-pulse rounded-xl" />
})
const StatsCardsSkeleton = dynamic(() => import("@/components/dashboard/stats-cards").then(m => ({ default: m.StatsCardsSkeleton })))

const SalesOverview = dynamic(() => import("@/components/dashboard/sales-overview").then(m => ({ default: m.SalesOverview })), {
  loading: () => <div className="h-64 bg-muted/30 animate-pulse rounded-xl" />
})
const SalesOverviewSkeleton = dynamic(() => import("@/components/dashboard/sales-overview").then(m => ({ default: m.SalesOverviewSkeleton })))

const PaymentMethods = dynamic(() => import("@/components/dashboard/payment-methods").then(m => ({ default: m.PaymentMethods })), {
  loading: () => <div className="h-64 bg-muted/30 animate-pulse rounded-xl" />
})
const PaymentMethodsSkeleton = dynamic(() => import("@/components/dashboard/payment-methods").then(m => ({ default: m.PaymentMethodsSkeleton })))

const RecentTransactions = dynamic(() => import("@/components/dashboard/recent-transactions").then(m => ({ default: m.RecentTransactions })), {
  loading: () => <div className="h-64 bg-muted/30 animate-pulse rounded-xl" />
})
const RecentTransactionsSkeleton = dynamic(() => import("@/components/dashboard/recent-transactions").then(m => ({ default: m.RecentTransactionsSkeleton })))

const TopProducts = dynamic(() => import("@/components/dashboard/top-products").then(m => ({ default: m.TopProducts })), {
  loading: () => <div className="h-64 bg-muted/30 animate-pulse rounded-xl" />
})
const TopProductsSkeleton = dynamic(() => import("@/components/dashboard/top-products").then(m => ({ default: m.TopProductsSkeleton })))

const LowStockAlerts = dynamic(() => import("@/components/dashboard/low-stock-alerts").then(m => ({ default: m.LowStockAlerts })), {
  loading: () => <div className="h-64 bg-muted/30 animate-pulse rounded-xl" />
})
const LowStockAlertsSkeleton = dynamic(() => import("@/components/dashboard/low-stock-alerts").then(m => ({ default: m.LowStockAlertsSkeleton })))

const BusinessStats = dynamic(() => import("@/components/dashboard/business-stats").then(m => ({ default: m.BusinessStats })), {
  loading: () => <div className="h-32 bg-muted/30 animate-pulse rounded-xl" />
})
const BusinessStatsSkeleton = dynamic(() => import("@/components/dashboard/business-stats").then(m => ({ default: m.BusinessStatsSkeleton })))

export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    const debouncedCheckMobile = debounce(checkMobile, 200)
    checkMobile()
    window.addEventListener('resize', debouncedCheckMobile)
    return () => window.removeEventListener('resize', debouncedCheckMobile)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 200)
    return () => clearTimeout(timer)
  }, [])

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
            {loading ? <StatsCardsSkeleton /> : <StatsCards />}

            {/* Charts Row */}
            <div className="grid gap-4 sm:gap-6 md:grid-cols-1 lg:grid-cols-5 w-full min-w-0">
              <div className="lg:col-span-3">
                {loading ? <SalesOverviewSkeleton /> : <SalesOverview />}
              </div>
              <div className="lg:col-span-2">
                {loading ? <PaymentMethodsSkeleton /> : <PaymentMethods />}
              </div>
            </div>

            {/* Tables Row */}
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4 w-full min-w-0">
              <div className="lg:col-span-2 h-full">
                {loading ? <RecentTransactionsSkeleton /> : <RecentTransactions />}
              </div>
              <div className="lg:col-span-1 h-full">
                {loading ? <TopProductsSkeleton /> : <TopProducts />}
              </div>
              <div className="lg:col-span-1 h-full">
                {loading ? <LowStockAlertsSkeleton /> : <LowStockAlerts />}
              </div>
            </div>

            {/* Business Stats */}
            {loading ? <BusinessStatsSkeleton /> : <BusinessStats />}
          </div>
        </main>
      </div>
    </div>
  )
}
