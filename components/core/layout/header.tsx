"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Bell, ChevronDown, Menu, Mail, LogOut, User, Building, HelpCircle } from "lucide-react"
import { logout } from "@/lib/auth"
import { useRouter } from "next/navigation"

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const router = useRouter()
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState<Date | null>(null)

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

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const dropdown = document.getElementById('profile-dropdown')
      const profileButton = document.getElementById('profile-button')
      
      if (isProfileDropdownOpen && dropdown && !dropdown.contains(target) && profileButton && !profileButton.contains(target)) {
        setIsProfileDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isProfileDropdownOpen])

  useEffect(() => {
    setCurrentTime(new Date())
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatDateTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }
    return date.toLocaleDateString('en-US', options)
  }
  return (
    <header className="flex h-16 sm:h-18 items-center justify-between border-b border-border bg-card px-4 font-sans">
      {/* Left Side - Hamburger */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2.5 sm:p-3 text-muted-foreground hover:bg-muted hover:text-foreground transition-all shrink-0"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </div>

      {/* Center - Time Display */}
      <div className="hidden md:flex flex-col items-center">
        {currentTime && (
          <p className="text-sm sm:text-base font-semibold text-foreground">{formatDateTime(currentTime)}</p>
        )}
      </div>

      {/* Right Side - Icons */}
      <div className="flex items-center gap-2">
        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          className="rounded-lg p-2.5 sm:p-3 text-muted-foreground hover:bg-muted hover:text-foreground transition-all shrink-0"
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          <Image
            src="/icons/fullscreen.png"
            alt={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            width={20}
            height={20}
            className={`h-5 w-5 sm:h-6 sm:w-6 object-contain transition-transform ${isFullscreen ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-border shrink-0 mx-1" />

        {/* Notifications */}
        <button className="relative rounded-lg p-2.5 sm:p-3 text-muted-foreground hover:bg-muted hover:text-foreground transition-all group shrink-0" aria-label="Notifications">
          <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-border shrink-0 mx-1" />

        {/* Mail */}
        <button className="p-2 sm:p-2.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" aria-label="Messages">
          <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-border shrink-0 mx-1" />

        {/* User Profile */}
        <div className="relative">
          <div
            id="profile-button"
            className="flex items-center gap-3 rounded-lg bg-muted/50 px-3 py-2 hover:bg-muted transition-all cursor-pointer"
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
          >
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-blue-500 text-white shadow-sm overflow-hidden">
              <img
                src="/Profile-pos.jpg"
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm sm:text-base font-medium text-foreground">Alex Kariuki</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Administrator</p>
            </div>
            <ChevronDown className={`h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground hidden sm:block transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
          </div>

          {/* Profile Dropdown Menu */}
          {isProfileDropdownOpen && (
            <div id="profile-dropdown" className="absolute right-0 top-full mt-2 w-56 sm:w-60 rounded-lg border border-border bg-card shadow-lg z-50">
              <div className="p-1">
                <button
                  onClick={() => {
                    setIsProfileDropdownOpen(false)
                    router.push("/settings/profile")
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 sm:py-3 rounded-md text-sm sm:text-base text-foreground hover:bg-muted transition-colors"
                >
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  Profile Settings
                </button>
                <button
                  onClick={() => {
                    setIsProfileDropdownOpen(false)
                    router.push("/settings/business")
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 sm:py-3 rounded-md text-sm sm:text-base text-foreground hover:bg-muted transition-colors"
                >
                  <Building className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  Business Settings
                </button>
                <button
                  onClick={() => {
                    setIsProfileDropdownOpen(false)
                    router.push("/help")
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 sm:py-3 rounded-md text-sm sm:text-base text-foreground hover:bg-muted transition-colors"
                >
                  <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  Help & Support
                </button>
                <div className="my-1 border-t border-border" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 sm:py-3 rounded-md text-sm sm:text-base text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
