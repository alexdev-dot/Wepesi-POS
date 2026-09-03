'use client'

import { useEffect, useState } from 'react'
import { Download, X } from 'lucide-react'

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if already installed
    const checkInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true)
      }
    }
    
    checkInstalled()

    // Show prompt in development mode for testing
    if (process.env.NODE_ENV === 'development') {
      setShowPrompt(true)
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowPrompt(true)
    }

    // Listen for app install
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setShowPrompt(false)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      setIsInstalled(true)
    }
    
    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    // Store dismissal in localStorage to not show again for 7 days
    localStorage.setItem('pwa-prompt-dismissed', Date.now().toString())
  }

  useEffect(() => {
    // Check if user previously dismissed
    const dismissed = localStorage.getItem('pwa-prompt-dismissed')
    if (dismissed) {
      const daysSinceDismissal = (Date.now() - parseInt(dismissed)) / (1000 * 60 * 60 * 24)
      if (daysSinceDismissal < 7) {
        setShowPrompt(false)
      }
    }
  }, [])

  if (!showPrompt || isInstalled) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-auto z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-4 md:p-3 max-w-md mx-auto md:mx-0 md:max-w-xs">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4 md:w-3 md:h-3" />
        </button>

        <div className="flex items-center gap-3 md:gap-2 pr-6 md:pr-5">
          <div className="w-10 h-10 md:w-8 md:h-8 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 border border-gray-200 overflow-hidden">
            <img src="/logo.png" alt="POS Logo" className="w-full h-full object-contain p-1" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm md:text-xs mb-1 md:mb-0.5">
              Install Wepesi POS App
            </h3>
            <p className="text-xs md:text-[10px] text-gray-600 mb-3 md:mb-2">
              Get offline access & faster performance
            </p>

            <button
              onClick={handleInstall}
              className="w-full bg-linear-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground text-sm md:text-xs font-medium py-2 md:py-1.5 px-4 md:px-3 rounded-lg transition-all duration-200"
            >
              Install Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
