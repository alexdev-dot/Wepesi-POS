"use client"

import { useState, Suspense } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { ArrowUpRight, BarChart3, PackagePlus, ShoppingCart } from "lucide-react"
import { Sidebar } from "@/components/core/layout/sidebar"
import { Header } from "@/components/core/layout/header"
import { useMobile } from "@/lib/hooks/use-mobile"

// Dynamic imports with code splitting and loading states
const StatsCards = dynamic(() => import("@/components/domains/dashboard/stats-cards").then(m => ({ default: m.StatsCards })), {
  loading: () => <div className="h-32 bg-muted/30 animate-pulse rounded-xl" />
})

const SalesOverview = dynamic(() => import("@/components/domains/dashboard/sales-overview").then(m => ({ default: m.SalesOverview })), {
  loading: () => <div className="h-64 bg-muted/30 animate-pulse rounded-xl" />
})

const PaymentMethods = dynamic(() => import("@/components/domains/dashboard/payment-methods").then(m => ({ default: m.PaymentMethods })), {
  loading: () => <div className="h-64 bg-muted/30 animate-pulse rounded-xl" />
})

const RecentTransactions = dynamic(() => import("@/components/domains/dashboard/recent-transactions").then(m => ({ default: m.RecentTransactions })), {
  loading: () => <div className="h-64 bg-muted/30 animate-pulse rounded-xl" />
})

const TopProducts = dynamic(() => import("@/components/domains/dashboard/top-products").then(m => ({ default: m.TopProducts })), {
  loading: () => <div className="h-64 bg-muted/30 animate-pulse rounded-xl" />
})

const LowStockAlerts = dynamic(() => import("@/components/domains/dashboard/low-stock-alerts").then(m => ({ default: m.LowStockAlerts })), {
  loading: () => <div className="h-64 bg-muted/30 animate-pulse rounded-xl" />
})

const BusinessStats = dynamic(() => import("@/components/domains/dashboard/business-stats").then(m => ({ default: m.BusinessStats })), {
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
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#f5f7f8] p-4 font-sans md:p-6">
          <div className="mx-auto w-full max-w-[1500px] space-y-6 font-sans">
            <section className="relative overflow-hidden rounded-2xl bg-[#123c2b] px-5 py-6 text-white shadow-lg sm:px-7 sm:py-7">
              <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full border-[36px] border-white/5" />
              <div className="pointer-events-none absolute bottom-[-92px] right-36 h-48 w-48 rounded-full border-[26px] border-[#30B54A]/20" />
              <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="mb-2 text-sm font-medium text-[#a8e3b5]">Friday, September 4, 2026</p>
                  <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Good afternoon, Alex</h1>
                  <p className="mt-2 max-w-xl text-sm text-white/70 sm:text-base">Here&apos;s what&apos;s happening across your store today.</p>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <Link href="/pos" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#30B54A] px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#3bc957]"><ShoppingCart className="h-4 w-4" /> New sale</Link>
                  <Link href="/products" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition-colors hover:bg-white/15"><PackagePlus className="h-4 w-4" /> Add product</Link>
                  <Link href="/reports" aria-label="Open reports" className="inline-flex min-h-11 w-11 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/15"><BarChart3 className="h-4 w-4" /></Link>
                </div>
              </div>
            </section>

            <section aria-labelledby="performance-heading">
              <div className="mb-3 flex items-end justify-between gap-4">
                <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#23883a]">Today at a glance</p><h2 id="performance-heading" className="mt-1 text-xl font-bold tracking-tight text-slate-900">Store performance</h2></div>
                <Link href="/reports" className="hidden items-center gap-1 text-sm font-semibold text-[#23883a] transition-colors hover:text-[#176a2a] sm:flex">Full report <ArrowUpRight className="h-4 w-4" /></Link>
              </div>
              <StatsCards />
            </section>

            <section aria-labelledby="analytics-heading">
              <div className="mb-3"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Business intelligence</p><h2 id="analytics-heading" className="mt-1 text-xl font-bold tracking-tight text-slate-900">Understand your sales</h2></div>
              <div className="grid w-full min-w-0 gap-4 sm:gap-6 lg:grid-cols-5"><div className="lg:col-span-3"><SalesOverview /></div><div className="lg:col-span-2"><PaymentMethods /></div></div>
            </section>

            <section aria-labelledby="operations-heading">
              <div className="mb-3 flex items-end justify-between gap-4">
                <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Daily operations</p><h2 id="operations-heading" className="mt-1 text-xl font-bold tracking-tight text-slate-900">Keep the floor moving</h2></div>
                <Link href="/inventory" className="hidden items-center gap-1 text-sm font-semibold text-[#23883a] transition-colors hover:text-[#176a2a] sm:flex">Open inventory <ArrowUpRight className="h-4 w-4" /></Link>
              </div>
              <div className="grid w-full min-w-0 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4"><div className="h-full lg:col-span-2"><RecentTransactions /></div><div className="h-full lg:col-span-1"><TopProducts /></div><div className="h-full lg:col-span-1"><LowStockAlerts /></div></div>
            </section>

            <BusinessStats />
          </div>
        </main>
      </div>
    </div>
  )
}
