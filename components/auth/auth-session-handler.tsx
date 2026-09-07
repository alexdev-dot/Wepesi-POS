"use client"

import { useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"

export function AuthSessionHandler() {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const userId = searchParams.get("user_id")
    const userEmail = searchParams.get("user_email")
    const userName = searchParams.get("user_name")
    const userOnboarded = searchParams.get("user_onboarded")

    if (userId) {
      // Store user data in localStorage
      localStorage.setItem("user_id", userId)
      if (userEmail) localStorage.setItem("user_email", userEmail)
      if (userName) localStorage.setItem("user_name", userName)
      if (userOnboarded) localStorage.setItem("user_onboarded", userOnboarded)

      // Clean URL by removing auth params
      const url = new URL(window.location.href)
      url.searchParams.delete("user_id")
      url.searchParams.delete("user_email")
      url.searchParams.delete("user_name")
      url.searchParams.delete("user_onboarded")
      router.replace(url.pathname + url.search)
    }
  }, [searchParams, router])

  return null
}
