"use client"

import { useState, useCallback } from "react"
import { CreditCard, Plus, MoreVertical, CheckCircle, Sparkles, Zap, Crown } from "lucide-react"
import { PlanForm, PlanFormData } from "@/components/admin/forms/plan-form"

const plans = [
  {
    id: 1,
    name: "Starter",
    price: 3500,
    period: "month" as const,
    description: "Perfect for small businesses",
    features: [
      "Up to 5 users",
      "1,000 transactions/month",
      "Basic reporting",
      "Email support",
      "1 location"
    ],
    popular: false,
    color: "slate" as const,
    icon: Sparkles
  },
  {
    id: 2,
    name: "Professional",
    price: 10000,
    period: "month" as const,
    description: "For growing businesses",
    features: [
      "Up to 25 users",
      "10,000 transactions/month",
      "Advanced reporting",
      "Priority support",
      "5 locations",
      "API access"
    ],
    popular: true,
    color: "blue" as const,
    icon: Zap
  },
  {
    id: 3,
    name: "Enterprise",
    price: 25000,
    period: "month" as const,
    description: "For large organizations",
    features: [
      "Unlimited users",
      "Unlimited transactions",
      "Custom reporting",
      "24/7 dedicated support",
      "Unlimited locations",
      "Advanced API access",
      "Custom integrations",
      "White-label option"
    ],
    popular: false,
    color: "purple" as const,
    icon: Crown
  }
]

export default function PlansPage() {
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<PlanFormData | null>(null)

  const handleOpenCreateModal = useCallback(() => {
    setEditingPlan(null)
    setIsPlanModalOpen(true)
  }, [])

  const handleOpenEditModal = useCallback((plan: any) => {
    setEditingPlan({
      name: plan.name,
      price: plan.price,
      period: plan.period,
      description: plan.description,
      features: plan.features,
      popular: plan.popular,
      color: plan.color
    })
    setIsPlanModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsPlanModalOpen(false)
    setEditingPlan(null)
  }, [])

  const handleSavePlan = useCallback((data: PlanFormData) => {
    console.log("Saving plan:", data)
    // TODO: Implement actual save logic (API call)
    handleCloseModal()
  }, [handleCloseModal])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10 text-primary">
            <CreditCard className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Plans & Pricing</h1>
            <p className="text-slate-600">Manage subscription plans and pricing</p>
          </div>
        </div>
        <button onClick={handleOpenCreateModal} className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all font-medium text-xs sm:text-sm whitespace-nowrap">
          <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Create New Plan</span>
          <span className="sm:hidden">New Plan</span>
        </button>
      </div>

      {/* Plan Cards */}
      <div>
        <h2 className="text-base sm:text-lg font-semibold text-slate-800 mb-4">Available Plans</h2>
        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-xl border-2 bg-card p-6 shadow-sm transition-all hover:shadow-lg ${
                plan.popular 
                  ? 'border-green-500 ring-4 ring-green-500/10' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                    <Sparkles className="h-3 w-3" />
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${
                  plan.color === 'slate' ? 'bg-slate-100 text-slate-600' :
                  plan.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  <plan.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">{plan.name}</h3>
                  <p className="text-sm text-slate-500">{plan.description}</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-slate-800">Ksh {plan.price}</span>
                  <span className="text-slate-500">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex gap-2">
                <button onClick={() => handleOpenEditModal(plan)} className="flex-1 py-2.5 px-4 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all">
                  Edit Plan
                </button>
                <button className="p-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all">
                  <MoreVertical className="h-4 w-4 text-slate-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plan Form Modal */}
      {isPlanModalOpen && (
        <div className="fixed inset-0 bg-background/80 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card rounded-xl shadow-2xl flex flex-col">
            <PlanForm
              mode={editingPlan ? "edit" : "create"}
              initialData={editingPlan ?? undefined}
              onSave={handleSavePlan}
              onCancel={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  )
}
