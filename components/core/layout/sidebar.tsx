"use client"

import { useState, useEffect } from "react"
import { ShoppingBag, LayoutDashboard, ShoppingCart, History, Package, Warehouse, ShoppingCart as PurchasesIcon, Users, Truck, Receipt, BarChart3, Users as EmployeesIcon, Landmark, Settings, ChevronRight, ChevronDown, LogOut, X, FolderTree, Bell, Sliders, CreditCard, Barcode, Sparkles, FileText, DollarSign, Layers, UserCircle, TrendingUp, Shield, CircleHelp } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { logout } from "@/lib/auth"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: ShoppingCart, label: "Point of Sale", href: "/pos" },
  { icon: History, label: "Sales History", href: "/sales-history" },
  {
    icon: Package,
    label: "Stock & Products",
    href: "/inventory",
    children: [
      { icon: Package, label: "Products", href: "/products" },
      { icon: Warehouse, label: "Inventory", href: "/inventory" },
      { icon: PurchasesIcon, label: "Purchases", href: "/purchases" },
      { icon: FolderTree, label: "Categories", href: "/categories" },
    ]
  },
  {
    icon: UserCircle,
    label: "People",
    href: "/customers",
    children: [
      { icon: Users, label: "Customers", href: "/customers" },
      { icon: Truck, label: "Suppliers", href: "/suppliers" },
      { icon: EmployeesIcon, label: "Employees", href: "/employees" },
    ]
  },
  {
    icon: DollarSign,
    label: "Financial",
    href: "/expenses",
    children: [
      { icon: Receipt, label: "Expenses", href: "/expenses" },
      { icon: Landmark, label: "Cash Register", href: "/cash-register" },
      { icon: BarChart3, label: "Reports", href: "/reports" },
    ]
  },
  { icon: Bell, label: "Notifications", href: "/notifications" },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings/general",
    children: [
      { icon: Sliders, label: "General Settings", href: "/settings/general" },
      { icon: Shield, label: "Roles & Permissions", href: "/settings/roles" },
      { icon: Barcode, label: "Barcode Generator", href: "/settings/barcodes" },
      { icon: FileText, label: "Receipt Templates", href: "/settings/receipts" },
      { icon: CreditCard, label: "Payment Methods", href: "/settings/payments" },
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

  // Close dropdown when navigating to a different page
  useEffect(() => {
    closeCollapsedDropdown()
  }, [currentPath])

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
          "z-50 flex h-screen flex-col bg-white text-slate-800 transition-all duration-300 ease-in-out font-sans shadow-xl border-r border-slate-200",
        hideByDefault ? (mobileOpen ? "lg:relative" : "fixed") : "lg:relative",
        collapsed ? "lg:w-20 w-72 sm:w-80" : "lg:w-52 w-72 sm:w-80",
        !mobileOpen && "hidden lg:flex",
        mobileOpen && "fixed lg:flex",
          "-translate-x-full lg:translate-x-0",
        mobileOpen && "translate-x-0"
      )}>
        {/* Logo */}
        <div className={cn(
          "flex items-center justify-center border-b border-slate-200 bg-slate-50",
          collapsed ? "lg:justify-center justify-between px-4 sm:px-6 py-4" : "justify-between px-6 py-4"
        )}>
          <div className="relative flex items-center justify-center flex-1">
            <img 
              src="/logo.png" 
              alt="Wepesi POS Logo" 
              className="h-16 w-16 shrink-0 sm:h-20 sm:w-20 object-contain"
            />
          </div>
          {/* Mobile Close Button */}
          <button
            onClick={onMobileClose}
            className={cn(
              "rounded-lg p-2 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-600 sm:p-2.5",
              "lg:hidden"
            )}
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-5 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
          <p className={cn("mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400", collapsed && "lg:text-center lg:px-0")}>Workspace</p>
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
                      <div className={cn(
                        "flex items-center rounded-lg text-sm sm:text-base font-medium transition-all duration-200 w-full group cursor-pointer",
                        (isActive || isChildActive)
                          ? "bg-[#30B54A]/10 text-[#30B54A] border border-[#30B54A]/20"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                      )}
                      onClick={(event) => {
                        if (collapsed) {
                          handleCollapsedClick(item.label, event)
                        } else {
                          toggleDropdown(item.label)
                        }
                      }}
                      >
                        <div className={cn("flex min-w-0 flex-1 items-center px-3 py-2.5 sm:py-3", collapsed ? "justify-center" : "gap-3")}
                          title={collapsed ? item.label : undefined}
                        >
                          <item.icon className={cn(
                            "h-5 w-5 shrink-0 sm:h-6 sm:w-6",
                            (isActive || isChildActive) ? "text-[#30B54A]" : "text-slate-400 group-hover:text-slate-600 transition-colors"
                          )} strokeWidth={2} />
                          {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
                        </div>
                        {!collapsed && (
                          <button
                            aria-label={`${isDropdownOpen ? "Collapse" : "Expand"} ${item.label}`}
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleDropdown(item.label)
                            }}
                            className="rounded-r-lg px-3 py-3 text-slate-400 hover:text-slate-600"
                          >
                            <ChevronDown className={cn("h-4 w-4 transition-transform sm:h-5 sm:w-5", isDropdownOpen ? "rotate-180" : "")} strokeWidth={2} />
                          </button>
                        )}
                      </div>
                      {!collapsed && isDropdownOpen && (
                        <ul className="ml-4 mt-1 space-y-0.5">
                          {item.children?.map((child) => {
                            const childIsActive = currentPath === child.href
                            return (
                              <li key={child.label}>
                                <Link
                                  href={child.href}
                                  onClick={onMobileClose}
                                  className={cn(
                                    "flex items-center rounded-md px-3 py-2 sm:py-2.5 text-sm sm:text-base font-medium transition-all duration-200 group",
                                    childIsActive
                                      ? "bg-[#30B54A]/10 text-[#30B54A]"
                                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-700",
                                    "gap-3"
                                  )}
                                >
                                  <child.icon className={cn(
                                    "h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0",
                                    childIsActive ? "text-[#30B54A]" : "text-slate-400 group-hover:text-slate-600 transition-colors"
                                  )} strokeWidth={2} />
                                  <span>{child.label}</span>
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      )}
                      {/* Collapsed Dropdown Popup */}
                      {collapsed && collapsedDropdown?.label === item.label && (
                        <div
                          className="sidebar-dropdown fixed z-100 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 py-2"
                          style={{ 
                            left: `${collapsedDropdown.x}px`,
                            top: `${collapsedDropdown.y}px`
                          }}
                        >
                          <div className="px-4 py-2 border-b border-slate-200 bg-slate-50">
                            <span className="text-sm font-semibold text-slate-800">{item.label}</span>
                          </div>
                          <ul className="py-1">
                            {item.children?.map((child) => {
                              const childIsActive = currentPath === child.href
                              return (
                                <li key={child.label}>
                                  <Link
                                    href={child.href}
                                    onClick={() => {
                                      closeCollapsedDropdown()
                                      onMobileClose()
                                    }}
                                    className={cn(
                                      "flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors",
                                      childIsActive
                                        ? "bg-[#30B54A]/10 text-[#30B54A]"
                                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                                    )}
                                  >
                                    <child.icon className={cn(
                                      "h-4 w-4 shrink-0",
                                        childIsActive ? "text-[#30B54A]" : "text-slate-400"
                                    )} strokeWidth={2} />
                                    <span>{child.label}</span>
                                  </Link>
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onMobileClose}
                      className={cn(
                        "flex items-center rounded-lg px-3 py-2.5 sm:py-3 text-sm sm:text-base font-medium transition-all duration-200 w-full group",
                          isActive
                          ? "bg-[#30B54A]/10 text-[#30B54A] border border-[#30B54A]/20"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-800",
                        collapsed ? "justify-center" : "gap-3"
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <item.icon className={cn(
                        "h-5 w-5 shrink-0 sm:h-6 sm:w-6",
                        isActive ? "text-[#30B54A]" : "text-slate-400 group-hover:text-slate-600 transition-colors"
                      )} strokeWidth={2} />
                      {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        <div className={cn("border-t border-slate-200 p-3", collapsed && "lg:px-2")}>
          <button
            onClick={() => router.push("/help")}
            className={cn(
              "flex w-full items-center rounded-xl px-3 py-3 text-left transition-colors hover:bg-slate-100",
              collapsed ? "lg:justify-center" : "gap-3"
            )}
            title={collapsed ? "Help & Support" : undefined}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[#30B54A]">
              <CircleHelp className="h-4 w-4" />
            </span>
            {!collapsed && (
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-slate-800">Need help?</span>
                <span className="block truncate text-xs text-slate-500">Visit support centre</span>
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  )
}
