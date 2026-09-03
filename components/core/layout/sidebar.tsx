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
  const [collapsedDropdown, setCollapsedDropdown] = useState<{ label: string; x: number; y: number } | null>(null)

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

  const handleCollapsedClick = (label: string, event: React.MouseEvent) => {
    if (collapsed) {
      const rect = event.currentTarget.getBoundingClientRect()
      setCollapsedDropdown({
        label,
        x: rect.right + 8,
        y: rect.top
      })
    }
  }

  const closeCollapsedDropdown = () => {
    setCollapsedDropdown(null)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (collapsedDropdown && !(event.target as Element).closest('.sidebar-dropdown')) {
        closeCollapsedDropdown()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [collapsedDropdown])

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 z-40 lg:hidden backdrop-blur-sm"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "z-50 flex h-screen flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out font-sans shadow-xl border-r border-sidebar-border",
        hideByDefault ? (mobileOpen ? "lg:relative" : "fixed") : "lg:relative",
        collapsed ? "lg:w-20 w-72 sm:w-80" : "lg:w-52 w-72 sm:w-80",
        !mobileOpen && "hidden lg:flex",
        mobileOpen && "fixed lg:flex",
        "-translate-x-full lg:translate-x-0",
        mobileOpen && "translate-x-0"
      )}>
        {/* Logo */}
        <div className={cn(
          "flex items-center border-b border-sidebar-border bg-sidebar-accent/50 backdrop-blur-sm",
          collapsed ? "lg:justify-center justify-between px-4 sm:px-6 py-5" : "gap-3 px-6 py-5"
        )}>
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full"></div>
            <ShoppingBag className="h-8 w-8 sm:h-9 sm:w-9 shrink-0 text-green-600 relative z-10" strokeWidth={2} />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-wide text-sidebar-foreground">POS System</span>
              <span className="text-xs sm:text-sm text-muted-foreground font-medium">v2.0</span>
            </div>
          )}
          {/* Mobile Close Button */}
          <button
            onClick={onMobileClose}
            className={cn(
              "p-2 sm:p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all",
              collapsed ? "lg:hidden" : "lg:hidden ml-auto"
            )}
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
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
                        onClick={(e) => {
                          if (collapsed) {
                            handleCollapsedClick(item.label, e)
                          } else {
                            toggleDropdown(item.label)
                          }
                        }}
                        className={cn(
                          "flex items-center rounded-lg px-3 py-2.5 sm:py-3 text-sm sm:text-base font-medium transition-all duration-200 w-full group",
                          (isActive || isChildActive)
                            ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                          collapsed ? "justify-center" : "gap-3"
                        )}
                        title={collapsed ? item.label : undefined}
                      >
                        <item.icon className={cn(
                          "h-5 w-5 sm:h-6 sm:w-6 shrink-0",
                          (isActive || isChildActive) ? "text-sidebar-primary-foreground" : "text-muted-foreground group-hover:text-foreground transition-colors"
                        )} strokeWidth={2} />
                        {!collapsed && (
                          <>
                            <span className="flex-1 text-left">{item.label}</span>
                            <ChevronDown className={cn(
                              "h-4 w-4 sm:h-5 sm:w-5 shrink-0 transition-transform text-muted-foreground group-hover:text-foreground",
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
                                    "flex items-center rounded-md px-3 py-2 sm:py-2.5 text-sm sm:text-base font-medium transition-all duration-200 group",
                                    childIsActive
                                      ? "bg-sidebar-accent text-sidebar-primary"
                                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                    "gap-3"
                                  )}
                                >
                                  <child.icon className={cn(
                                    "h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0",
                                    childIsActive ? "text-sidebar-primary" : "text-muted-foreground group-hover:text-foreground transition-colors"
                                  )} strokeWidth={2} />
                                  <span>{child.label}</span>
                                </a>
                              </li>
                            )
                          })}
                        </ul>
                      )}
                      {/* Collapsed Dropdown Popup */}
                      {collapsed && collapsedDropdown?.label === item.label && (
                        <div
                          className="sidebar-dropdown fixed left-20 top-0 z-50 w-64 bg-card rounded-xl shadow-2xl border border-border py-2"
                          style={{ top: collapsedDropdown.y }}
                        >
                          <div className="px-4 py-2 border-b border-border bg-muted">
                            <span className="text-sm font-semibold text-foreground">{item.label}</span>
                          </div>
                          <ul className="py-1">
                            {item.children?.map((child) => {
                              const childIsActive = currentPath === child.href
                              return (
                                <li key={child.label}>
                                  <a
                                    href={child.href}
                                    onClick={() => {
                                      closeCollapsedDropdown()
                                      onMobileClose()
                                    }}
                                    className={cn(
                                      "flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors",
                                      childIsActive
                                        ? "bg-sidebar-accent text-sidebar-primary"
                                        : "text-foreground hover:bg-muted"
                                    )}
                                  >
                                    <child.icon className={cn(
                                      "h-4 w-4 shrink-0",
                                      childIsActive ? "text-sidebar-primary" : "text-muted-foreground"
                                    )} strokeWidth={2} />
                                    <span>{child.label}</span>
                                  </a>
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      )}
                    </>
                  ) : (
                    <a
                      href={item.href}
                      onClick={onMobileClose}
                      className={cn(
                        "flex items-center rounded-lg px-3 py-2.5 sm:py-3 text-sm sm:text-base font-medium transition-all duration-200 w-full group",
                        isActive
                          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        collapsed ? "justify-center" : "gap-3"
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <item.icon className={cn(
                        "h-5 w-5 sm:h-6 sm:w-6 shrink-0",
                        isActive ? "text-sidebar-primary-foreground" : "text-muted-foreground group-hover:text-foreground transition-colors"
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
