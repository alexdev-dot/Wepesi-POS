import { BrandPanel } from "@/components/auth/brand-panel"
import { SignupForm } from "@/components/auth/signup-form"

export default function SignupPage() {
  return (
    <main className="flex min-h-svh items-stretch justify-center bg-[#F8FAFC] p-4 sm:p-6 lg:p-8">
      <div className="grid w-full max-w-7xl overflow-hidden rounded-2xl md:rounded-3xl bg-white shadow-xl lg:grid-cols-2">
        <div className="hidden md:block">
          <BrandPanel />
        </div>
        <div className="flex items-center justify-center bg-white">
          <SignupForm />
        </div>
      </div>
    </main>
  )
}
