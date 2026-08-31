import Image from "next/image"
import { CheckCircle, Building2, MapPin, DollarSign, Sparkles, Crown } from "lucide-react"

interface OnboardingBrandPanelProps {
  currentStep: number
}

const steps = [
  { step: 1, icon: Sparkles, title: "Welcome", description: "Get started with your POS" },
  { step: 2, icon: Building2, title: "Business", description: "Tell us about your business" },
  { step: 3, icon: MapPin, title: "Location", description: "Where is your business?" },
  { step: 4, icon: DollarSign, title: "Currency", description: "Configure your settings" },
  { step: 5, icon: Crown, title: "Subscription", description: "Choose your plan" },
  { step: 6, icon: CheckCircle, title: "Complete", description: "You're all set!" }
]

export function OnboardingBrandPanel({ currentStep }: OnboardingBrandPanelProps) {
  const currentStepData = steps.find(s => s.step === currentStep) || steps[0]

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-navy p-8 text-navy-foreground lg:p-10">
      {/* Full hardware photo anchored to the bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0">
        <Image
          src="/pos-hardware.png"
          alt="Point of sale hardware"
          width={1401}
          height={1131}
          className="h-auto w-full object-contain"
          priority
        />
        {/* Blend the top edge of the photo into the navy panel */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-2/5 bg-[linear-gradient(to_bottom,var(--navy)_0%,color-mix(in_oklab,var(--navy)_70%,transparent)_45%,transparent_100%)]"
        />
      </div>
      
      {/* Base navy wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_bottom,var(--navy)_0%,var(--navy)_18%,color-mix(in_oklab,var(--navy)_55%,transparent)_40%,transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(120%_80%_at_80%_15%,rgba(59,91,219,0.22),transparent_55%)]"
      />
      
      <div className="relative z-10 flex h-full flex-col">
        {/* Logo */}
        <div className="flex items-center justify-center pt-2">
          <Image
            src="/logo.png"
            alt="POS System Logo"
            width={600}
            height={240}
            className="h-56 w-auto object-contain"
            priority
          />
        </div>

        {/* Heading */}
        <div className="mt-4">
          <h1 className="font-heading text-4xl font-extrabold leading-[1.1] tracking-tight text-balance lg:text-[2.75rem]">
            Setup Your
            <br />
            <span className="text-primary">Business.</span>
          </h1>
          <p className="mt-5 max-w-88 text-sm leading-relaxed text-navy-foreground/70">
            Complete your business setup in just a few simple steps. We'll guide you through the process.
          </p>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Current Step Indicator */}
        <div className="mt-6 rounded-2xl bg-white/10 p-6 ring-1 ring-white/15 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary">
              <currentStepData.icon className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-primary mb-1">Step {currentStep} of 6</div>
              <div className="text-lg font-bold">{currentStepData.title}</div>
              <div className="text-xs text-navy-foreground/70 mt-1">{currentStepData.description}</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 h-2 w-full rounded-full bg-white/20">
            <div 
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${(currentStep / 6) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
