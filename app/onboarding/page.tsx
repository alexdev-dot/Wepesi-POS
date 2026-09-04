"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Building2, Check, MapPin, Receipt, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getCurrentUser, completeUserOnboarding } from "@/lib/auth"

const steps = [
  { title: "Your business", icon: Building2 },
  { title: "Your location", icon: MapPin },
  { title: "Tax and currency", icon: Receipt },
  { title: "Choose a plan", icon: Store },
]

const initialForm = {
  businessName: "",
  businessType: "retail",
  branchName: "Main branch",
  country: "",
  city: "",
  branchAddress: "",
  currency: "USD",
  taxEnabled: false,
  taxName: "VAT",
  taxRate: "",
  subscriptionPlan: "free",
  subscriptionPeriod: "monthly",
}

type OnboardingForm = typeof initialForm

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<OnboardingForm>(initialForm)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const user = getCurrentUser()
    if (!user) {
      router.replace("/login")
      return
    }

    if (user.onboarded) {
      router.replace("/dashboard")
      return
    }

    setForm((current) => ({
      ...current,
      businessName: user.businessName || "",
      businessType: user.businessType || "retail",
    }))
    setIsLoading(false)
  }, [router])

  function updateForm(field: keyof OnboardingForm, value: string | boolean) {
    setForm((current) => ({ ...current, [field]: value }))
    setError("")
  }

  function validateStep() {
    if (step === 0 && !form.businessName.trim()) return "Enter your business name to continue."
    if (step === 1 && (!form.branchName.trim() || !form.country.trim() || !form.city.trim())) {
      return "Complete the branch name, country, and city."
    }
    if (step === 2 && form.taxEnabled && (!form.taxName.trim() || !form.taxRate)) {
      return "Add a tax name and rate, or turn tax collection off."
    }
    return ""
  }

  function goNext() {
    const validationError = validateStep()
    if (validationError) {
      setError(validationError)
      return
    }
    setError("")
    setStep((current) => Math.min(current + 1, steps.length - 1))
  }

  function finishOnboarding() {
    const user = getCurrentUser()
    if (!user) {
      router.replace("/login")
      return
    }

    completeUserOnboarding(user.id, {
      ...form,
      taxRate: form.taxEnabled ? Number(form.taxRate) : undefined,
    })
    router.push("/dashboard")
  }

  if (isLoading) return null

  const StepIcon = steps[step].icon

  return (
    <main className="min-h-svh bg-[#f5f7f4] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#30B54A] text-white">
              <Store className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">Wepesi POS</span>
          </div>
          <span className="text-sm font-medium text-slate-500">Setup {step + 1} of {steps.length}</span>
        </header>

        <div className="grid overflow-hidden rounded-2xl bg-white shadow-xl lg:grid-cols-[260px_1fr]">
          <aside className="bg-[#173d2a] p-6 text-white sm:p-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#9fe0ae]">Welcome aboard</p>
            <h1 className="mb-8 text-2xl font-bold leading-tight">Let&apos;s set up your store.</h1>
            <nav aria-label="Onboarding progress" className="space-y-2">
              {steps.map((item, index) => {
                const Icon = item.icon
                const completed = index < step
                const active = index === step
                return (
                  <div key={item.title} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm ${active ? "bg-white/15 font-semibold" : "text-white/60"}`}>
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${completed ? "bg-[#30B54A]" : active ? "border border-[#9fe0ae]" : "border border-white/30"}`}>
                      {completed ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                    </span>
                    {item.title}
                  </div>
                )
              })}
            </nav>
          </aside>

          <section className="p-6 sm:p-10 lg:p-14">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e7f7eb] text-[#23883a]"><StepIcon className="h-5 w-5" /></div>
              <div>
                <p className="text-sm font-medium text-[#23883a]">Step {step + 1}</p>
                <h2 className="text-2xl font-bold text-slate-900">{steps[step].title}</h2>
              </div>
            </div>

            {step === 0 && <BusinessStep form={form} updateForm={updateForm} />}
            {step === 1 && <LocationStep form={form} updateForm={updateForm} />}
            {step === 2 && <TaxStep form={form} updateForm={updateForm} />}
            {step === 3 && <PlanStep form={form} updateForm={updateForm} />}

            {error && <p className="mt-6 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

            <div className="mt-10 flex items-center justify-between border-t border-slate-100 pt-6">
              <Button type="button" variant="ghost" onClick={() => setStep((current) => Math.max(current - 1, 0))} disabled={step === 0} className="gap-2 text-slate-600">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              {step < steps.length - 1 ? (
                <Button type="button" onClick={goNext} className="gap-2 rounded-full bg-[#30B54A] px-6 hover:bg-[#25913b]">Continue <ArrowRight className="h-4 w-4" /></Button>
              ) : (
                <Button type="button" onClick={finishOnboarding} className="gap-2 rounded-full bg-[#30B54A] px-6 hover:bg-[#25913b]">Finish setup <Check className="h-4 w-4" /></Button>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

function BusinessStep({ form, updateForm }: { form: OnboardingForm; updateForm: (field: keyof OnboardingForm, value: string | boolean) => void }) {
  return <div className="space-y-6">
    <Field label="Business name" id="businessName"><Input id="businessName" value={form.businessName} onChange={(event) => updateForm("businessName", event.target.value)} placeholder="e.g. Wepesi Market" /></Field>
    <Field label="Business type" id="businessType"><select id="businessType" value={form.businessType} onChange={(event) => updateForm("businessType", event.target.value)} className="flex h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-[#30B54A]">
      <option value="retail">Retail store</option><option value="grocery">Grocery store</option><option value="restaurant">Restaurant</option><option value="wholesale">Wholesale</option><option value="other">Other</option>
    </select></Field>
  </div>
}

function LocationStep({ form, updateForm }: { form: OnboardingForm; updateForm: (field: keyof OnboardingForm, value: string | boolean) => void }) {
  return <div className="grid gap-6 sm:grid-cols-2">
    <Field label="Branch name" id="branchName"><Input id="branchName" value={form.branchName} onChange={(event) => updateForm("branchName", event.target.value)} /></Field>
    <Field label="Country" id="country"><Input id="country" value={form.country} onChange={(event) => updateForm("country", event.target.value)} placeholder="e.g. Kenya" /></Field>
    <Field label="City" id="city"><Input id="city" value={form.city} onChange={(event) => updateForm("city", event.target.value)} placeholder="e.g. Nairobi" /></Field>
    <Field label="Branch address" id="branchAddress"><Input id="branchAddress" value={form.branchAddress} onChange={(event) => updateForm("branchAddress", event.target.value)} placeholder="Street or area" /></Field>
  </div>
}

function TaxStep({ form, updateForm }: { form: OnboardingForm; updateForm: (field: keyof OnboardingForm, value: string | boolean) => void }) {
  return <div className="space-y-6">
    <Field label="Currency" id="currency"><select id="currency" value={form.currency} onChange={(event) => updateForm("currency", event.target.value)} className="flex h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-[#30B54A]"><option value="USD">USD - US Dollar</option><option value="KES">KES - Kenyan Shilling</option><option value="NGN">NGN - Nigerian Naira</option><option value="GBP">GBP - Pound Sterling</option><option value="EUR">EUR - Euro</option></select></Field>
    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-4"><span><span className="block font-semibold text-slate-900">Collect tax</span><span className="text-sm text-slate-500">Apply tax to sales and receipts.</span></span><input type="checkbox" checked={form.taxEnabled} onChange={(event) => updateForm("taxEnabled", event.target.checked)} className="h-5 w-5 accent-[#30B54A]" /></label>
    {form.taxEnabled && <div className="grid gap-6 sm:grid-cols-2"><Field label="Tax name" id="taxName"><Input id="taxName" value={form.taxName} onChange={(event) => updateForm("taxName", event.target.value)} /></Field><Field label="Tax rate (%)" id="taxRate"><Input id="taxRate" type="number" min="0" max="100" step="0.01" value={form.taxRate} onChange={(event) => updateForm("taxRate", event.target.value)} /></Field></div>}
  </div>
}

function PlanStep({ form, updateForm }: { form: OnboardingForm; updateForm: (field: keyof OnboardingForm, value: string | boolean) => void }) {
  return <div className="grid gap-4 sm:grid-cols-3">
    {[{ value: "free", title: "Starter", detail: "For getting started" }, { value: "pro", title: "Professional", detail: "For growing stores" }, { value: "business", title: "Business", detail: "For larger teams" }].map((plan) => <label key={plan.value} className={`cursor-pointer rounded-xl border-2 p-5 transition-colors ${form.subscriptionPlan === plan.value ? "border-[#30B54A] bg-[#f1fbf3]" : "border-slate-200"}`}><input type="radio" name="plan" value={plan.value} checked={form.subscriptionPlan === plan.value} onChange={(event) => updateForm("subscriptionPlan", event.target.value)} className="sr-only" /><span className="block font-bold text-slate-900">{plan.title}</span><span className="mt-1 block text-sm text-slate-500">{plan.detail}</span></label>)}
  </div>
}

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return <div className="space-y-2"><Label htmlFor={id} className="font-semibold text-slate-900">{label}</Label>{children}</div>
}
