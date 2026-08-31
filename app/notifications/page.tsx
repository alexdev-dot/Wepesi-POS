"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Check, Trash2, Filter, Search, MoreVertical, CheckCircle, XCircle, AlertTriangle, Info, Package, ShoppingCart, DollarSign, Users } from "lucide-react"

export default function NotificationsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

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

  // Mock data for notifications
  const notifications = [
    {
      id: 1,
      type: "success",
      title: "New Order Received",
      message: "Order #ORD-1234 has been placed successfully",
      time: "2 minutes ago",
      read: false,
      icon: ShoppingCart,
    },
    {
      id: 2,
      type: "warning",
      title: "Low Stock Alert",
      message: "Coca Cola 500ml is running low (5 units remaining)",
      time: "15 minutes ago",
      read: false,
      icon: Package,
    },
    {
      id: 3,
      type: "info",
      title: "Payment Received",
      message: "Payment of KSh 12,500 received from Customer John Doe",
      time: "1 hour ago",
      read: false,
      icon: DollarSign,
    },
    {
      id: 4,
      type: "error",
      title: "Payment Failed",
      message: "Transaction #TXN-5678 failed due to insufficient funds",
      time: "2 hours ago",
      read: true,
      icon: XCircle,
    },
    {
      id: 5,
      type: "success",
      title: "New Customer Registered",
      message: "Jane Smith has registered as a new customer",
      time: "3 hours ago",
      read: true,
      icon: Users,
    },
    {
      id: 6,
      type: "warning",
      title: "Purchase Order Delayed",
      message: "PO-003 from Brookside Dairy is delayed by 2 days",
      time: "5 hours ago",
      read: true,
      icon: AlertTriangle,
    },
    {
      id: 7,
      type: "info",
      title: "System Update",
      message: "POS system has been updated to version 2.1.0",
      time: "1 day ago",
      read: true,
      icon: Info,
    },
    {
      id: 8,
      type: "success",
      title: "Inventory Restocked",
      message: "Bread Loaf inventory has been restocked (50 units added)",
      time: "1 day ago",
      read: true,
      icon: Package,
    },
  ]

  const getNotificationStyles = (type: string) => {
    switch (type) {
      case "success":
        return { bg: "bg-green-100", color: "text-green-600", border: "border-green-200" }
      case "warning":
        return { bg: "bg-orange-100", color: "text-orange-600", border: "border-orange-200" }
      case "error":
        return { bg: "bg-red-100", color: "text-red-600", border: "border-red-200" }
      default:
        return { bg: "bg-blue-100", color: "text-blue-600", border: "border-blue-200" }
    }
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        currentPath="/notifications" 
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
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600 shadow-sm relative">
                  <Bell className="h-5 w-5" strokeWidth={2} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-semibold text-slate-900">Notifications</h1>
                  <p className="text-sm text-slate-500 mt-0.5">Stay updated with system alerts and updates</p>
                </div>
              </div>

              {/* Filters Section */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Filter Dropdowns */}
                <div className="flex flex-wrap gap-2">
                  <select className="px-3 py-2 border border-slate-200 rounded-lg bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all shadow-sm">
                    <option>All Types</option>
                    <option>Success</option>
                    <option>Warning</option>
                    <option>Error</option>
                    <option>Info</option>
                  </select>

                  <select className="px-3 py-2 border border-slate-200 rounded-lg bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all shadow-sm">
                    <option>All Status</option>
                    <option>Unread</option>
                    <option>Read</option>
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 ml-auto">
                  <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg bg-white text-sm text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline">More Filters</span>
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg bg-white text-sm text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
                    <Check className="h-4 w-4" />
                    <span className="hidden sm:inline">Mark All Read</span>
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg bg-white text-sm text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
                    <Trash2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Clear All</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto px-4 sm:px-6 pb-6">
            <div className="max-w-7xl mx-auto space-y-4">
              {/* Search Bar */}
              <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
                <div className="relative w-full">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Search notifications..."
                    className="h-10 pl-9 sm:pl-10 text-sm border bg-slate-50 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  />
                </div>
              </div>

              {/* Notifications List */}
              <div className="space-y-3">
                {notifications.map((notification) => {
                  const styles = getNotificationStyles(notification.type)
                  return (
                    <div
                      key={notification.id}
                      className={`rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 ${
                        !notification.read ? "border-l-4 border-l-amber-500" : ""
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${styles.bg} ${styles.color} shadow-sm shrink-0`}>
                          <notification.icon className="h-5 w-5" strokeWidth={2} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className={`text-sm font-semibold ${!notification.read ? "text-slate-900" : "text-slate-700"}`}>
                              {notification.title}
                            </h3>
                            <span className="text-xs text-slate-500 shrink-0">{notification.time}</span>
                          </div>
                          <p className="text-sm text-slate-600">{notification.message}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 shrink-0">
                          {!notification.read && (
                            <button className="p-1.5 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all" title="Mark as read">
                              <Check className="h-4 w-4" />
                            </button>
                          )}
                          <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all" title="More">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
