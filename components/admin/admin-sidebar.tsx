"use client"

import { useState, useEffect } from "react"
import { 
  LayoutDashboard, 
  Building2, 
  CreditCard, 
  Receipt, 
  Users, 
  ShieldCheck, 
  Ticket, 
  Activity, 
  Settings,
  ChevronRight,
  ChevronDown,
  X,
  ShoppingBag,
  Star
} from "@/components/admin/icons"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { clearSuperAdminSession } from "@/lib/auth"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Building2, label: "Tenants / Businesses", href: "/admin/tenants" },
  { icon: CreditCard, label: "Subscription Plans", href: "/admin/subscriptions" },
  { icon: Receipt, label: "Billing & Invoices", href: "/admin/billing" },
  { icon: Users, label: "Super Admin Users", href: "/admin/users" },
  { icon: ShieldCheck, label: "Roles & Permissions", href: "/admin/permissions" },
  { icon: Star, label: "Features", href: "/admin/features" },
  { icon: Ticket, label: "Support Tickets", href: "/admin/support" },
  { icon: Activity, label: "System Health & Logs", href: "/admin/system-logs" },
  { icon: Settings, label: "Global Settings", href: "/admin/settings" },
]

export function AdminSidebar({ collapsed = false, currentPath = "", mobileOpen = false, onMobileClose = () => {} }: { collapsed?: boolean; currentPath?: string; mobileOpen?: boolean; onMobileClose?: () => void }) {
  const router = useRouter()

  const handleLogout = () => {
    clearSuperAdminSession()
    router.push("/super-admin-login")
  }

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onMobileClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:relative z-50 flex h-screen flex-col bg-white text-slate-800 transition-all duration-300 font-sans shadow-xl border-r border-slate-200",
        collapsed ? "lg:w-20 md:w-64 w-72" : "lg:w-64 md:w-64 w-72",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
      {/* Logo */}
      <div className={cn(
        "flex items-center border-b border-slate-200 bg-navy justify-center p-4",
        collapsed ? "lg:flex-col lg:justify-center flex-row lg:gap-0 gap-3" : "flex-col"
      )}>
        <div className="relative mb-2">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
          <img 
            src="/logo.png" 
            alt="POS System Logo" 
            className="h-16 w-16 shrink-0 relative z-10 object-contain"
          />
        </div>
        <span className="text-xs font-semibold text-white">Super Admin Portal</span>
        {/* Mobile Close Button */}
        <button
          onClick={onMobileClose}
          className={cn(
            "p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all",
            collapsed ? "lg:mt-2 mt-0 lg:ml-0 ml-auto" : "lg:mt-2 mt-0"
          )}
        >
          <X className="h-6 w-6" strokeWidth={2} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-6">
        <div className="mb-4">
          <p className={cn(
            "text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-4",
            collapsed && "hidden"
          )}>
            Main Menu
          </p>
        </div>
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = currentPath === item.href

            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={onMobileClose}
                  className={cn(
                    "flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/30"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-800",
                    collapsed ? "justify-center" : "gap-3"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  )}
                  <item.icon className={cn("h-5 w-5 shrink-0 relative z-10", isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600 transition-colors")} strokeWidth={2} />
                  {!collapsed && <span className="flex-1 text-left relative z-10">{item.label}</span>}
                  {!collapsed && isActive && (
                    <ChevronRight className="h-4 w-4 shrink-0 relative z-10 text-white/80" strokeWidth={2} />
                  )}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
    </>
  )
}
