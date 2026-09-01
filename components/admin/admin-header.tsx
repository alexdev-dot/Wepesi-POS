"use client"

import { useState, useEffect } from "react"
import { Bell, ChevronDown, Menu, Mail, LogOut, ShieldCheck } from "@/components/admin/icons"
import { clearSuperAdminSession } from "@/lib/auth"
import { useRouter } from "next/navigation"

export function AdminHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  const router = useRouter()
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
      try {
        localStorage.setItem('fullscreenIntent', 'true')
      } catch (e) {
        // Ignore localStorage errors
      }
    } else {
      document.exitFullscreen()
      try {
        localStorage.setItem('fullscreenIntent', 'false')
      } catch (e) {
        // Ignore localStorage errors
      }
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement
      setIsFullscreen(isCurrentlyFullscreen)
      try {
        localStorage.setItem('fullscreenIntent', isCurrentlyFullscreen ? 'true' : 'false')
      } catch (e) {
        // Ignore localStorage errors
      }
    }

    setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  const handleLogout = () => {
    clearSuperAdminSession()
    router.push("/super-admin-login")
  }

  return (
    <header className="flex h-16 sm:h-18 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 font-sans shadow-sm">
      {/* Left Side - Hamburger */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2.5 sm:p-3 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all shrink-0"
        >
          <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </div>

      {/* Right Side - Icons */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <button className="relative rounded-lg p-2.5 sm:p-3 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all group shrink-0">
          <Bell className="h-5 w-5 sm:h-6 sm:w-6 group-hover:animate-swing" />
          <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] sm:text-xs font-semibold text-white shadow-sm">
            5
          </span>
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-200 shrink-0 mx-1" />
        
        {/* Mail */}
        <button className="rounded-lg p-2.5 sm:p-3 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all shrink-0">
          <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-200 shrink-0 mx-1" />

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-2 sm:px-4 sm:py-2.5 hover:bg-slate-100 transition-all cursor-pointer border border-slate-200">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-navy text-white shadow-sm">
              <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm sm:text-base font-medium text-slate-800">Super Admin</p>
              <p className="text-xs sm:text-sm text-slate-500">System Administrator</p>
            </div>
            <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400 hidden sm:block" />
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="rounded-lg p-2.5 sm:p-3 text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all shrink-0"
            title="Logout"
          >
            <LogOut className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>
      </div>
    </header>
  )
}
