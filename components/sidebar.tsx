"use client"

import { useState, useEffect } from "react"
import { ShoppingBag, LayoutDashboard, ShoppingCart, History, Package, Warehouse, ShoppingCart as PurchasesIcon, Users, Truck, Receipt, BarChart3, Users as EmployeesIcon, Landmark, Settings, ChevronRight, ChevronDown, LogOut, X, FolderTree, Bell, Sliders, CreditCard, Barcode, Sparkles, FileText, DollarSign, Layers, UserCircle, TrendingUp, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { logout } from "@/lib/auth"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: ShoppingCart, label: "Point of Sale", href: "/pos" },
  { icon: History, label: "Sales History", href: "/sales-history" },
  {
    icon: Package,
    label: "Inventory",
    href: "/inventory",
    children: [
      { icon: Package, label: "Products", href: "/products" },
      { icon: Warehouse, label: "Inventory", href: "/inventory" },
      { icon: PurchasesIcon, label: "Purchases", href: "/purchases" },
      { icon: FolderTree, label: "Categories & Brands", href: "/categories" },
    ]
  },
  {
    icon: UserCircle,
    label: "People",
    href: "/people",
    children: [
      { icon: Users, label: "Customers", href: "/customers" },
      { icon: Truck, label: "Suppliers", href: "/suppliers" },
      { icon: EmployeesIcon, label: "Employees", href: "/employees" },
    ]
  },
  {
    icon: DollarSign,
    label: "Financial",
    href: "/financial",
    children: [
      { icon: Receipt, label: "Expenses", href: "/expenses" },
      { icon: Landmark, label: "Cash Register", href: "/cash-register" },
      { icon: BarChart3, label: "Reports", href: "/reports" },
    ]
  },
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: Barcode, label: "Barcode Generator", href: "/settings/barcodes" },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
    children: [
      { icon: Sliders, label: "General Settings", href: "/settings/general" },
      { icon: Shield, label: "Roles & Permissions", href: "/settings/roles" },
      { icon: CreditCard, label: "Payment Methods", href: "/settings/payments" },
      { icon: FileText, label: "Receipt Templates", href: "/settings/receipts" },
      { icon: Sparkles, label: "Upgrade Subscription", href: "/settings/upgrade" }
    ]
  },
]

export function Sidebar({ collapsed = false, currentPath = "", mobileOpen = false, onMobileClose = () => {}, hideByDefault = false }: { collapsed?: boolean; currentPath?: string; mobileOpen?: boolean; onMobileClose?: () => void; hideByDefault?: boolean }) {
  const router = useRouter()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  // Auto-open dropdown based on current path
  useEffect(() => {
    const parentItem = navItems.find(item =>
      item.children?.some(child => child.href === currentPath)
    )
    if (parentItem) {
      setOpenDropdown(parentItem.label)
    }
  }, [currentPath])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label)
  }

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "z-50 flex h-screen flex-col bg-slate-100 text-slate-800 transition-all duration-300 ease-in-out font-sans shadow-xl border-r border-slate-200",
        hideByDefault ? (mobileOpen ? "lg:relative" : "fixed") : "lg:relative",
        collapsed ? "w-20" : "w-52",
        hideByDefault ? (mobileOpen ? "translate-x-0" : "-translate-x-full") : (mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"),
        !hideByDefault && "lg:translate-x-0"
      )}>
        {/* Logo */}
        <div className={cn(
          "flex items-center border-b border-slate-200 bg-white/50 backdrop-blur-sm",
          collapsed ? "justify-center py-5" : "gap-3 px-6 py-5"
        )}>
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full"></div>
            <ShoppingBag className="h-8 w-8 shrink-0 text-green-600 relative z-10" strokeWidth={2} />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-wide text-slate-900">POS System</span>
              <span className="text-xs text-slate-500 font-medium">v2.0</span>
            </div>
          )}
          {/* Mobile Close Button */}
          <button
            onClick={onMobileClose}
            className="lg:hidden ml-auto p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-all"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const hasChildren = item.children && item.children.length > 0
              const isActive = currentPath === item.href
              const isDropdownOpen = openDropdown === item.label
              const isChildActive = item.children?.some(child => currentPath === child.href)

              return (
                <li key={item.label}>
                  {hasChildren ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.label)}
                        className={cn(
                          "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 w-full group",
                          (isActive || isChildActive)
                            ? "bg-green-100 text-green-700 shadow-sm"
                            : "text-slate-600 hover:bg-slate-200 hover:text-slate-800",
                          collapsed ? "justify-center" : "gap-3"
                        )}
                        title={collapsed ? item.label : undefined}
                      >
                        <item.icon className={cn(
                          "h-5 w-5 shrink-0",
                          (isActive || isChildActive) ? "text-green-600" : "text-slate-400 group-hover:text-slate-600 transition-colors"
                        )} strokeWidth={2} />
                        {!collapsed && (
                          <>
                            <span className="flex-1 text-left">{item.label}</span>
                            <ChevronDown className={cn(
                              "h-4 w-4 shrink-0 transition-transform text-slate-400 group-hover:text-slate-600",
                              isDropdownOpen ? "rotate-180" : ""
                            )} strokeWidth={2} />
                          </>
                        )}
                      </button>
                      {!collapsed && isDropdownOpen && (
                        <ul className="ml-4 mt-1 space-y-0.5">
                          {item.children?.map((child) => {
                            const childIsActive = currentPath === child.href
                            return (
                              <li key={child.label}>
                                <a
                                  href={child.href}
                                  onClick={onMobileClose}
                                  className={cn(
                                    "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 group",
                                    childIsActive
                                      ? "bg-green-50 text-green-600"
                                      : "text-slate-500 hover:bg-slate-200 hover:text-slate-700",
                                    "gap-3"
                                  )}
                                >
                                  <child.icon className={cn(
                                    "h-3.5 w-3.5 shrink-0",
                                    childIsActive ? "text-green-500" : "text-slate-400 group-hover:text-slate-500 transition-colors"
                                  )} strokeWidth={2} />
                                  <span>{child.label}</span>
                                </a>
                              </li>
                            )
                          })}
                        </ul>
                      )}
                    </>
                  ) : (
                    <a
                      href={item.href}
                      onClick={onMobileClose}
                      className={cn(
                        "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 w-full group",
                        isActive
                          ? "bg-green-100 text-green-700 shadow-sm"
                          : "text-slate-600 hover:bg-slate-200 hover:text-slate-800",
                        collapsed ? "justify-center" : "gap-3"
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <item.icon className={cn(
                        "h-5 w-5 shrink-0",
                        isActive ? "text-green-600" : "text-slate-400 group-hover:text-slate-600 transition-colors"
                      )} strokeWidth={2} />
                      {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
                    </a>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>
    </>
  )
}
