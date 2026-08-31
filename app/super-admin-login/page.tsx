"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight, ShoppingBag } from "lucide-react"
import { validateSuperAdmin, setSuperAdminSession } from "@/lib/auth"

export default function SuperAdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Validation
    if (!email || !password) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Validate credentials using auth library
    if (validateSuperAdmin(email, password)) {
      // Store super admin session
      setSuperAdminSession({
        email,
        role: "super_admin",
        loginTime: new Date().toISOString()
      })
      setIsLoading(false)
      // Use window.location for reliable redirect
      window.location.href = "/admin/dashboard"
    } else {
      setError("Invalid super admin credentials")
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 via-white to-slate-100 p-4">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-navy px-6 py-8 text-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-2 left-4 w-20 h-20 bg-white rounded-full blur-xl" />
              <div className="absolute bottom-2 right-4 w-16 h-16 bg-white rounded-full blur-xl" />
            </div>
            
            <div className="relative">
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white/20 mx-auto mb-4 ring-4 ring-white/30">
                <img 
                  src="/logo.png" 
                  alt="POS System Logo" 
                  className="h-24 w-24 object-contain"
                />
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 space-y-6">
            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
              <AlertCircle className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold text-primary">Authorized Personnel Only</span>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Email Address</label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter super admin email"
                    className="w-full h-12 rounded-xl border border-slate-300 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    suppressHydrationWarning
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter super admin password"
                    className="w-full h-12 rounded-xl border border-slate-300 bg-white pl-10 pr-12 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    suppressHydrationWarning
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full h-12 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                  isLoading
                    ? "bg-slate-400 cursor-not-allowed"
                    : "bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/25"
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    Access Portal
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Security Notice */}
            <div className="pt-4 border-t border-slate-200">
              <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                <AlertCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div className="text-xs text-slate-600 space-y-1">
                  <p className="font-semibold text-slate-700">Security Notice</p>
                  <p>This portal is restricted to authorized super administrators only. All login attempts are monitored and logged.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500 mb-2">Demo Credentials:</p>
          <div className="bg-white border border-slate-200 rounded-lg p-3 text-xs text-slate-600 space-y-1">
            <p><span className="text-slate-700">Email:</span> superadmin@pos-system.com</p>
            <p><span className="text-slate-700">Password:</span> SuperAdmin@2025</p>
          </div>
        </div>

        {/* Back to Regular Login */}
        <div className="mt-4 text-center">
          <a
            href="/login"
            className="text-xs text-slate-500 hover:text-primary transition-colors"
          >
            ← Back to regular login
          </a>
        </div>
      </div>
    </div>
  )
}
