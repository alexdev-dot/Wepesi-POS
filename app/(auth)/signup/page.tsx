"use client"

import { BrandPanel } from "@/components/domains/auth/brand-panel"
import { SignupForm } from "@/components/domains/auth/signup-form"

export default function SignupPage() {
  return (
    <main className="flex min-h-svh items-stretch justify-center bg-[#F8FAFC] p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="grid w-full max-w-7xl overflow-hidden rounded-2xl md:rounded-3xl bg-white shadow-xl lg:grid-cols-2">
        <div className="hidden lg:block">
          <BrandPanel />
        </div>
        <div className="flex items-center justify-center bg-white p-4 sm:p-6 md:p-8">
          <SignupForm />
        </div>
      </div>
    </main>
  )
}
