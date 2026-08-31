"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { BusinessStats } from "@/components/dashboard/business-stats"
import { SalesOverview } from "@/components/dashboard/sales-overview"
import { PaymentMethods } from "@/components/dashboard/payment-methods"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { TopProducts } from "@/components/dashboard/top-products"
import { LowStockAlerts } from "@/components/dashboard/low-stock-alerts"

export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
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
    <div className="flex h-screen bg-background font-sans">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        currentPath="/dashboard" 
        mobileOpen={mobileSidebarOpen}
        onMobileClose={closeMobileSidebar}
      />
      <div className="flex flex-1 flex-col overflow-hidden font-sans">
        <Header onMenuClick={handleMenuClick} />
        <main className="flex-1 overflow-y-auto p-6 font-sans bg-muted/30">
          <div className="space-y-6 max-w-7xl mx-auto font-sans">
            {/* Stats Cards */}
            <StatsCards />

            {/* Charts Row */}
            <div className="grid gap-4 sm:gap-6 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <SalesOverview />
              </div>
              <div className="lg:col-span-2">
                <PaymentMethods />
              </div>
            </div>

            {/* Tables Row */}
            <div className="grid gap-4 sm:gap-6 lg:grid-cols-4">
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
