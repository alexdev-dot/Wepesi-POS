import { useState } from "react"
import { Check, Crown, Zap, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { SubscriptionPaymentModal } from "@/components/domains/onboarding/subscription-payment-modal"
import { motion } from "framer-motion"

const plans = [
  {
    id: "starter",
    name: "Starter",
    icon: Zap,
    price: "2,500",
    period: "/month",
    description: "Perfect for small businesses",
    features: ["1 Branch", "100 Products", "Basic Reports", "Email Support"],
    popular: false
  },
  {
    id: "professional",
    name: "Professional",
    icon: Crown,
    price: "KSh 7,999",
    period: "/month",
    description: "For growing businesses",
    features: ["5 Branches", "Unlimited Products", "Advanced Analytics", "Priority Support", "Multi-user Access"],
    popular: true
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: Building2,
    price: "KSh 120,000",
    period: "one time",
    description: "For large organizations",
    features: ["Unlimited Branches", "Unlimited Products", "Custom Reports", "24/7 Phone Support", "API Access", "White-label Option"],
    popular: false
  }
]

const periods = [
  { id: "monthly", label: "Monthly", multiplier: 1 },
  { id: "yearly", label: "Yearly", multiplier: 0.83, discount: "Save 17%" }
]

interface SubscriptionDetails {
  subscriptionPlan: string
  subscriptionPeriod: string
}

interface Step5SubscriptionProps {
  data: SubscriptionDetails
  onChange: (data: SubscriptionDetails) => void
  onNext: () => void
  onBack: () => void
}

export function Step5Subscription({ data, onChange, onNext, onBack }: Step5SubscriptionProps) {
  const [error, setError] = useState("")
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setShowPaymentModal(true)
  }

  function handlePaymentComplete() {
    onNext()
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="text-xl sm:text-2xl font-bold text-slate-900 mb-2"
      >
        Choose Your Plan
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="text-xs sm:text-sm text-slate-600 mb-4 sm:mb-6"
      >
        Select the subscription that fits your business needs
      </motion.p>

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 p-3 text-xs sm:text-sm text-red-600"
        >
          <span className="font-medium">{error}</span>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        {/* Billing Period */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        >
          <Label className="text-xs sm:text-sm font-semibold text-slate-900 mb-2 sm:mb-3 block">
            Billing Period
          </Label>
          <div className="flex gap-2">
            {periods.map((period, index) => (
              <motion.button
                key={period.id}
                type="button"
                onClick={() => onChange({ ...data, subscriptionPeriod: period.id })}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1, ease: "easeOut" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  flex-1 p-2.5 sm:p-3 rounded-lg border transition-all duration-200
                  ${data.subscriptionPeriod === period.id
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                  }
                `}
              >
                <div className="text-xs sm:text-sm font-semibold">{period.label}</div>
                {period.discount && (
                  <div className="text-[10px] sm:text-xs text-green-600 mt-1">{period.discount}</div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Subscription Plans */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
        >
          <Label className="text-xs sm:text-sm font-semibold text-slate-900 mb-2 sm:mb-3 block">
            Subscription Plan
          </Label>
          <div className="space-y-2 sm:space-y-3">
            {plans.map((plan, index) => {
              const Icon = plan.icon
              return (
                <motion.button
                  key={plan.id}
                  type="button"
                  onClick={() => onChange({ ...data, subscriptionPlan: plan.id })}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1, ease: "easeOut" }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`
                    w-full p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 text-left
                    ${data.subscriptionPlan === plan.id
                      ? 'border-primary bg-primary/5'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                    }
                  `}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <motion.div 
                      className={`
                        flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl
                        ${data.subscriptionPlan === plan.id ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'}
                      `}
                      whileHover={{ rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm sm:text-base font-semibold text-slate-900">{plan.name}</h3>
                        {plan.popular && (
                          <motion.span 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-semibold bg-primary text-white rounded-full"
                          >
                            Popular
                          </motion.span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 mb-1 sm:mb-2">{plan.description}</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-base sm:text-lg font-bold text-slate-900">{plan.price}</span>
                        {plan.period && <span className="text-xs sm:text-sm text-slate-600">{plan.period}</span>}
                      </div>
                    </div>
                    {data.subscriptionPlan === plan.id && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, type: "spring" }}
                        className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-primary text-white"
                      >
                        <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Info Note */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.9, ease: "easeOut" }}
          className="bg-slate-50 rounded-lg p-3"
        >
          <p className="text-[10px] sm:text-xs text-slate-600">
            💡 You can change your subscription plan anytime from your dashboard settings
          </p>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
          className="flex gap-2 sm:gap-3 pt-2"
        >
          <Button
            type="button"
            onClick={onBack}
            variant="outline"
            className="flex-1 h-10 sm:h-11 rounded-lg text-xs sm:text-sm font-semibold"
          >
            Back
          </Button>
          <Button
            type="submit"
            className="flex-1 h-10 sm:h-11 rounded-lg text-xs sm:text-sm font-semibold bg-primary hover:bg-primary/90 transition-all"
          >
            Continue to Payment
          </Button>
        </motion.div>
      </form>

      {/* Payment Modal */}
      <SubscriptionPaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        planName={plans.find(p => p.id === data.subscriptionPlan)?.name || ""}
        planPrice={plans.find(p => p.id === data.subscriptionPlan)?.price || ""}
        planPeriod={plans.find(p => p.id === data.subscriptionPlan)?.period || ""}
        onPaymentComplete={handlePaymentComplete}
      />
    </motion.div>
  )
}
