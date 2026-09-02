"use client"

import { useState, useEffect } from "react"
import { debounce } from "@/lib/utils-debounce"

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    const debouncedCheckMobile = debounce(checkMobile, 200)
    checkMobile()
    window.addEventListener('resize', debouncedCheckMobile)
    return () => window.removeEventListener('resize', debouncedCheckMobile)
  }, [])

  return isMobile
}
