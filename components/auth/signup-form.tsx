"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ShoppingBag, Mail, Lock, Eye, EyeOff, ArrowRight, User, AlertCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { saveUser, findUserByEmail, setCurrentUser } from "@/lib/auth"

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    const form = e.target as HTMLFormElement
    const name = (form.elements.namedItem('name') as HTMLInputElement).value
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement).value
    const confirmPassword = (form.elements.namedItem('confirmPassword') as HTMLInputElement).value
    const terms = (form.elements.namedItem('terms') as HTMLInputElement).checked

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    if (!terms) {
      setError("You must agree to the terms and conditions")
      return
    }

    // Check if user already exists
    const existingUser = findUserByEmail(email)
    if (existingUser) {
      setError("An account with this email already exists")
      return
    }

    // Create user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      createdAt: new Date().toISOString()
    }

    saveUser(newUser)
    setCurrentUser(newUser)
    router.push("/onboarding")
  }

  return (
    <div className="flex h-full flex-col justify-center px-8 py-12 lg:px-12">
      {/* Back to Home */}
      <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors w-fit mb-8">
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      {/* Logo */}
      <div className="mb-8">
        <img 
          src="/logo.png" 
          alt="POS Logo" 
          className="h-20 w-20 object-contain"
        />
      </div>

      {/* Heading */}
      <h2 className="text-3xl font-bold text-slate-900 mb-2">
        Create Account
      </h2>
      <p className="text-base text-slate-600 mb-8">
        Sign up to get started with your POS dashboard
      </p>

      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600 mb-6">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Full Name */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="name" className="text-sm font-semibold text-slate-900">
            Full Name
          </Label>
          <div className="relative">
            <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              autoComplete="name"
              className="h-12 rounded-xl border-slate-200 bg-white pl-12 text-sm focus:ring-2 focus:ring-[#30B54A] shadow-sm"
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-sm font-semibold text-slate-900">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              autoComplete="email"
              className="h-12 rounded-xl border-slate-200 bg-white pl-12 text-sm focus:ring-2 focus:ring-[#30B54A] shadow-sm"
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="password" className="text-sm font-semibold text-slate-900">
            Password
          </Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              autoComplete="new-password"
              className="h-12 rounded-xl border-slate-200 bg-white px-12 text-sm focus:ring-2 focus:ring-[#30B54A] shadow-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
            >
              {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="confirmPassword" className="text-sm font-semibold text-slate-900">
            Confirm Password
          </Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              autoComplete="new-password"
              className="h-12 rounded-xl border-slate-200 bg-white px-12 text-sm focus:ring-2 focus:ring-[#30B54A] shadow-sm"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((v) => !v)}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
            >
              {showConfirmPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-center gap-2">
          <Checkbox id="terms" className="h-4 w-4 rounded border-slate-300" />
          <Label htmlFor="terms" className="text-sm font-medium text-slate-700">
            I agree to the{" "}
            <a href="#" className="font-semibold text-[#30B54A] hover:text-[#25913b] transition-colors">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="font-semibold text-[#30B54A] hover:text-[#25913b] transition-colors">
              Privacy Policy
            </a>
          </Label>
        </div>

        {/* Submit */}
        <Button type="submit" className="group h-12 rounded-full bg-[#30B54A] hover:bg-[#25913b] text-base font-semibold shadow-sm transition-all">
          Create Account
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <span className="h-px flex-1 bg-slate-200" />
          <span className="text-sm text-slate-500">or</span>
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        {/* Google */}
        <Button
          type="button"
          variant="outline"
          className="h-12 rounded-full border-slate-200 bg-white text-base font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all"
        >
          <GoogleIcon className="mr-2 h-5 w-5" />
          Sign up with Google
        </Button>
      </form>

      {/* Login Link */}
      <p className="mt-6 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <a href="/login" className="font-semibold text-[#30B54A] hover:text-[#25913b] transition-colors">
          Sign in
        </a>
      </p>

      <p className="mt-4 text-center text-xs text-slate-500">
        © 2025 POS System. All rights reserved.
      </p>
    </div>
  )
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09a6.6 6.6 0 0 1 0-4.18V7.07H2.18a11 11 0 0 0 0 9.86l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"
      />
    </svg>
  )
}
