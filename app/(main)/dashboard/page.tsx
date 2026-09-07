"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowUpRight, BarChart3, PackagePlus, ShoppingCart } from "lucide-react"
import { Sidebar } from "@/components/core/layout/sidebar"
import { Header } from "@/components/core/layout/header"
import { useMobile } from "@/lib/hooks/use-mobile"
import { useRouter } from "next/navigation"
import { AuthSessionHandler } from "@/components/auth/auth-session-handler"
import { StatsCards } from "@/components/domains/dashboard/stats-cards"
import { SalesOverview } from "@/components/domains/dashboard/sales-overview"
import { PaymentMethods } from "@/components/domains/dashboard/payment-methods"
import { RecentTransactions } from "@/components/domains/dashboard/recent-transactions"
import { TopProducts } from "@/components/domains/dashboard/top-products"
import { LowStockAlerts } from "@/components/domains/dashboard/low-stock-alerts"
import { BusinessStats } from "@/components/domains/dashboard/business-stats"

export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [businessName, setBusinessName] = useState("")
  const [userName, setUserName] = useState("")
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const isMobile = useMobile()

  useEffect(() => {
    // Check if running on client side
    if (typeof window === 'undefined') return

    const userId = localStorage.getItem('user_id')
    const userOnboarded = localStorage.getItem('user_onboarded')
    const storedUserName = localStorage.getItem('user_name')

    if (!userId || userOnboarded !== 'true') {
      router.replace('/login')
      return
    }

    setUserName(storedUserName || 'User')

    // Fetch tenant data first, then dashboard data
    const fetchDashboardData = async () => {
      try {
        // Fetch tenant data to get the actual business_id
        const tenantResponse = await fetch('/api/tenant', {
          headers: {
            'x-user-id': userId
          }
        })
        const tenantData = await tenantResponse.json()

        if (tenantResponse.ok && tenantData.tenant) {
          setBusinessName(tenantData.tenant.business_name)
          const actualBusinessId = tenantData.tenant.id

          // Now fetch dashboard data using the tenant's business_id as query parameter
          const dashboardResponse = await fetch(`/api/dashboard?businessId=${encodeURIComponent(actualBusinessId)}`)
          const data = await dashboardResponse.json()

          if (dashboardResponse.ok) {
            setDashboardData(data)
          }
        } else {
          console.error('Failed to fetch tenant data:', tenantData.error)
        }
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [router])

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

  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  return (
    <div className="flex h-screen bg-background font-sans overflow-hidden">
      <AuthSessionHandler />
      <Sidebar
        collapsed={sidebarCollapsed}
        currentPath="/dashboard"
        mobileOpen={mobileSidebarOpen}
        onMobileClose={closeMobileSidebar}
      />
      <div className="flex flex-1 flex-col overflow-hidden font-sans min-w-0">
        <Header onMenuClick={handleMenuClick} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#f5f7f8] p-4 font-sans md:p-6">
          <div className="mx-auto w-full max-w-7xl space-y-6 font-sans">
            <section className="relative overflow-hidden rounded-2xl bg-[#123c2b] px-5 py-6 text-white shadow-lg sm:px-7 sm:py-7">
              <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full border-36 border-white/5" />
              <div className="pointer-events-none absolute -bottom-23 right-36 h-48 w-48 rounded-full border-26 border-[#30B54A]/20" />
              <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="mb-2 text-sm font-medium text-[#a8e3b5]">{currentDate}</p>
                  <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Good afternoon, {userName}</h1>
                  <p className="mt-2 max-w-xl text-sm text-white/70 sm:text-base">Here&apos;s what&apos;s happening across {businessName || 'your store'} today.</p>
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
              <StatsCards data={dashboardData?.stats} isLoading={isLoading} />
            </section>

            <section aria-labelledby="analytics-heading">
              <div className="mb-3"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Business intelligence</p><h2 id="analytics-heading" className="mt-1 text-xl font-bold tracking-tight text-slate-900">Understand your sales</h2></div>
              <div className="grid w-full min-w-0 gap-4 sm:gap-6 lg:grid-cols-5"><div className="lg:col-span-3"><SalesOverview data={dashboardData?.salesChart} isLoading={isLoading} /></div><div className="lg:col-span-2"><PaymentMethods data={dashboardData?.paymentMethods} isLoading={isLoading} /></div></div>
            </section>

            <section aria-labelledby="operations-heading">
              <div className="mb-3 flex items-end justify-between gap-4">
                <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Daily operations</p><h2 id="operations-heading" className="mt-1 text-xl font-bold tracking-tight text-slate-900">Keep the floor moving</h2></div>
                <Link href="/inventory" className="hidden items-center gap-1 text-sm font-semibold text-[#23883a] transition-colors hover:text-[#176a2a] sm:flex">Open inventory <ArrowUpRight className="h-4 w-4" /></Link>
              </div>
              <div className="grid w-full min-w-0 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4"><div className="h-full lg:col-span-2"><RecentTransactions data={dashboardData?.transactions} isLoading={isLoading} /></div><div className="h-full lg:col-span-1"><TopProducts data={dashboardData?.topProducts} isLoading={isLoading} /></div><div className="h-full lg:col-span-1"><LowStockAlerts data={dashboardData?.lowStock} isLoading={isLoading} /></div></div>
            </section>

            <BusinessStats data={dashboardData?.businessStats} isLoading={isLoading} />
          </div>
        </main>
      </div>
    </div>
  )
}
