"use client"

export const dynamic = 'force-dynamic'

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { getCurrentUser, completeUserOnboarding } from "@/lib/auth"
import { StepNavigation } from "@/components/onboarding/step-navigation"
import { Step1Welcome } from "@/components/onboarding/steps/step1-welcome"
import { Step2BusinessDetails } from "@/components/onboarding/steps/step2-business-details"
import { Step3Location } from "@/components/onboarding/steps/step3-location"
import { Step4CurrencyTax } from "@/components/onboarding/steps/step4-currency-tax"
import { Step5Subscription } from "@/components/onboarding/steps/step5-subscription"
import { Step6Completion } from "@/components/onboarding/steps/step6-completion"
import { OnboardingBrandPanel } from "@/components/onboarding/onboarding-brand-panel"

const stepNames = ["Welcome", "Business", "Location", "Currency", "Subscription", "Complete"]

interface OnboardingData {
  businessName: string
  businessType: string
  phoneNumber: string
  businessEmail: string
  businessAddress: string
  branchName: string
  country: string
  city: string
  branchAddress: string
  currency: string
  taxEnabled: boolean
  taxName: string
  taxRate: string
  taxInclusive: boolean
  subscriptionPlan: string
  subscriptionPeriod: string
}

function OnboardingContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    businessName: "",
    businessType: "",
    phoneNumber: "",
    businessEmail: "",
    businessAddress: "",
    branchName: "Main Branch",
    country: "",
    city: "",
    branchAddress: "",
    currency: "KES",
    taxEnabled: true,
    taxName: "VAT",
    taxRate: "16",
    taxInclusive: false,
    subscriptionPlan: "starter",
    subscriptionPeriod: "monthly"
  })

  // Update URL when step changes
  useEffect(() => {
    const stepParam = searchParams.get('step')
    if (stepParam) {
      const stepNum = parseInt(stepParam)
      if (stepNum >= 1 && stepNum <= 6) {
        setCurrentStep(stepNum)
      }
    }
  }, [searchParams])

  function updateUrlStep(step: number) {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      url.searchParams.set('step', step.toString())
      window.history.replaceState({}, '', url)
    }
  }

  function handleNext() {
    if (currentStep < 6) {
      const nextStep = currentStep + 1
      setCurrentStep(nextStep)
      updateUrlStep(nextStep)
    }
  }

  function handleBack() {
    if (currentStep > 1) {
      const prevStep = currentStep - 1
      setCurrentStep(prevStep)
      updateUrlStep(prevStep)
    }
  }

  function handleComplete() {
    const user = getCurrentUser()
    if (!user) {
      router.push("/signup")
      return
    }

    setIsSubmitting(true)
    
    const dataToSave = {
      ...onboardingData,
      taxRate: parseFloat(onboardingData.taxRate)
    }

    completeUserOnboarding(user.id, dataToSave)
    
    setTimeout(() => {
      router.push("/dashboard")
    }, 1000)
  }

  function handleGoToDashboard() {
    handleComplete()
  }

  function handleAddProducts() {
    handleComplete()
  }

  return (
    <main className="flex min-h-svh items-stretch justify-center bg-[#F8FAFC] p-2 sm:p-3 md:p-4 lg:p-6">
      <div className="grid w-full max-w-352 overflow-hidden rounded-2xl md:rounded-3xl bg-white shadow-lg lg:grid-cols-2">
        <div className="hidden lg:block bg-slate-50">
          <OnboardingBrandPanel currentStep={currentStep} />
        </div>
        
        <div className="flex flex-col p-3 sm:p-4 md:p-6 lg:p-10 overflow-y-auto">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 sm:gap-2.5 mb-3 sm:mb-4 md:mb-6">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <span className="text-base sm:text-lg md:text-xl">🛒</span>
            </div>
            <span className="font-heading text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.15em]">POS SYSTEM</span>
          </div>

          {/* Step Navigation */}
          {currentStep < 6 && (
            <StepNavigation 
              currentStep={currentStep} 
              totalSteps={6} 
              stepNames={stepNames} 
            />
          )}

          {/* Step Content */}
          <div className="flex-1">
            {currentStep === 1 && (
              <Step1Welcome onNext={handleNext} />
            )}

            {currentStep === 2 && (
              <Step2BusinessDetails
                data={{
                  businessName: onboardingData.businessName,
                  businessType: onboardingData.businessType,
                  phoneNumber: onboardingData.phoneNumber,
                  businessEmail: onboardingData.businessEmail,
                  businessAddress: onboardingData.businessAddress
                }}
                onChange={(data) => setOnboardingData({ ...onboardingData, ...data })}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}

            {currentStep === 3 && (
              <Step3Location
                data={{
                  branchName: onboardingData.branchName,
                  country: onboardingData.country,
                  city: onboardingData.city,
                  branchAddress: onboardingData.branchAddress
                }}
                onChange={(data) => setOnboardingData({ ...onboardingData, ...data })}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}

            {currentStep === 4 && (
              <Step4CurrencyTax
                data={{
                  currency: onboardingData.currency,
                  taxEnabled: onboardingData.taxEnabled,
                  taxName: onboardingData.taxName,
                  taxRate: onboardingData.taxRate,
                  taxInclusive: onboardingData.taxInclusive
                }}
                onChange={(data) => setOnboardingData({ ...onboardingData, ...data })}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}

            {currentStep === 5 && (
              <Step5Subscription
                data={{
                  subscriptionPlan: onboardingData.subscriptionPlan,
                  subscriptionPeriod: onboardingData.subscriptionPeriod
                }}
                onChange={(data) => setOnboardingData({ ...onboardingData, ...data })}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}

            {currentStep === 6 && (
              <Step6Completion
                onGoToDashboard={handleGoToDashboard}
                onAddProducts={handleAddProducts}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="flex min-h-svh items-center justify-center">Loading...</div>}>
      <OnboardingContent />
    </Suspense>
  )
}
