"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Bell, ChevronDown, Menu, Mail, LogOut } from "lucide-react"
import { logout } from "@/lib/auth"
import { useRouter } from "next/navigation"

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const router = useRouter()
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
      localStorage.setItem('fullscreenIntent', 'true')
    } else {
      document.exitFullscreen()
      localStorage.setItem('fullscreenIntent', 'false')
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement
      setIsFullscreen(isCurrentlyFullscreen)
      localStorage.setItem('fullscreenIntent', isCurrentlyFullscreen ? 'true' : 'false')
    }

    // Set initial state based on current fullscreen status
    setIsFullscreen(!!document.fullscreenElement)

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4 font-sans">
      {/* Left Side - Hamburger */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2.5 text-muted-foreground hover:bg-muted hover:text-card-foreground transition-all shrink-0"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Right Side - Icons */}
      <div className="flex items-center gap-2">
        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          className="rounded-lg p-2.5 text-muted-foreground hover:bg-muted hover:text-card-foreground transition-all shrink-0"
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          <Image
            src="/icons/fullscreen.png"
            alt={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            width={20}
            height={20}
            className={`h-5 w-5 object-contain transition-transform ${isFullscreen ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-border shrink-0 mx-1" />

        {/* Notifications */}
        <button className="relative rounded-lg p-2.5 text-muted-foreground hover:bg-muted hover:text-card-foreground transition-all group shrink-0" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-border shrink-0 mx-1" />

        {/* Mail */}
        <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors" aria-label="Messages">
          <Mail className="h-5 w-5" />
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-border shrink-0 mx-1" />

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 rounded-lg bg-muted/50 px-3 py-2 hover:bg-muted transition-all cursor-pointer">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-white shadow-sm overflow-hidden">
              <img 
                src="/Profile-pos.jpg" 
                alt="Profile" 
                className="h-full w-full object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-card-foreground">Alex Kariuki</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
          </div>

          {/* Logout Button */}
          <button
            onClick={() => {
              logout()
              router.push("/login")
            }}
            className="rounded-lg p-2.5 text-muted-foreground hover:bg-red-50 hover:text-red-600 transition-all shrink-0"
            aria-label="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
