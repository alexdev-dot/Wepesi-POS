"use client"

import { useState, useEffect, createContext, useContext } from "react"
import { usePathname, useRouter } from "next/navigation"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { isSuperAdminLoggedIn } from "@/lib/auth"
import { cn } from "@/lib/utils"

interface FullscreenContextType {
  isAppFullscreen: boolean
  toggleAppFullscreen: () => void
}

const FullscreenContext = createContext<FullscreenContextType | undefined>(undefined)

export function useFullscreen() {
  const context = useContext(FullscreenContext)
  if (!context) {
    throw new Error('useFullscreen must be used within AdminLayout')
  }
  return context
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isAppFullscreen, setIsAppFullscreen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setIsMounted(true)
    // Check if user is authenticated as super admin
    const authenticated = isSuperAdminLoggedIn()
    setIsAuthenticated(authenticated)
    
    // Load app fullscreen state from localStorage
    const savedFullscreen = localStorage.getItem('appFullscreenMode')
    if (savedFullscreen === 'true') {
      setIsAppFullscreen(true)
    }
    
    if (!authenticated) {
      router.push("/super-admin-login")
    }
  }, [router])

  // Toggle app fullscreen mode
  const toggleAppFullscreen = () => {
    const newState = !isAppFullscreen
    setIsAppFullscreen(newState)
    localStorage.setItem('appFullscreenMode', newState.toString())
  }

  // Don't render until mounted to avoid hydration mismatch
  if (!isMounted) {
    return null
  }

  // Don't render if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null
  }

  const handleMenuClick = () => {
    // On mobile, toggle mobile sidebar
    // On desktop, toggle collapse
    if (window.innerWidth < 1024) {
      setMobileSidebarOpen(!mobileSidebarOpen)
    } else {
      setSidebarCollapsed(!sidebarCollapsed)
    }
  }

  return (
    <FullscreenContext.Provider value={{ isAppFullscreen, toggleAppFullscreen }}>
      <div className="flex h-screen bg-background font-sans">
        {!isAppFullscreen && (
          <AdminSidebar
            collapsed={sidebarCollapsed}
            currentPath={pathname}
            mobileOpen={mobileSidebarOpen}
            onMobileClose={() => setMobileSidebarOpen(false)}
          />
        )}
        
        <div className="flex flex-1 flex-col overflow-hidden">
          {!isAppFullscreen && <AdminHeader onMenuClick={handleMenuClick} />}
          
          <main className={cn("flex-1 overflow-y-auto bg-slate-50", isAppFullscreen ? "p-0" : "p-6")}>
            {children}
          </main>
        </div>
      </div>
    </FullscreenContext.Provider>
  )
}
