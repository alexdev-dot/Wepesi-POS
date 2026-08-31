"use client"

import { useState, useMemo, useCallback } from "react"
import { CreditCard, TrendingUp, Users, DollarSign, Search, Plus, MoreVertical, Eye, Edit, Trash2, CheckCircle, Clock, XCircle, Filter, Download, ArrowUpRight, ArrowDownRight, Zap, Crown, Sparkles } from "lucide-react"
import { PlanForm, PlanFormData } from "@/components/admin/plan-form"

// Static data moved outside component
const stats = [
    {
      title: "Total Subscriptions",
      value: "892",
      change: "+8.2%",
      trend: "up",
      icon: CreditCard,
      color: "blue"
    },
    {
      title: "Active Subscriptions",
      value: "847",
      change: "+7.5%",
      trend: "up",
      icon: CheckCircle,
      color: "green"
    },
    {
      title: "Monthly Recurring Revenue",
      value: "$124,580",
      change: "+12.3%",
      trend: "up",
      icon: DollarSign,
      color: "emerald"
    },
    {
      title: "Churn Rate",
      value: "2.4%",
      change: "-0.3%",
      trend: "down",
      icon: TrendingUp,
      color: "red"
    }
  ]

  const plans = [
    {
      id: 1,
      name: "Starter",
      price: 29,
      period: "month",
      description: "Perfect for small businesses",
      features: [
        "Up to 5 users",
        "1,000 transactions/month",
        "Basic reporting",
        "Email support",
        "1 location"
      ],
      popular: false,
      color: "slate",
      icon: Sparkles
    },
    {
      id: 2,
      name: "Professional",
      price: 79,
      period: "month",
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
      color: "blue",
      icon: Zap
    },
    {
      id: 3,
      name: "Enterprise",
      price: 199,
      period: "month",
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
      color: "purple",
      icon: Crown
    }
  ]

  const subscriptions = [
    {
      id: 1,
      tenant: "Tech Solutions Ltd",
      email: "contact@techsolutions.com",
      plan: "Enterprise",
      status: "active",
      billingCycle: "monthly",
      amount: "$199",
      nextBilling: "Apr 15, 2024",
      startDate: "Jan 15, 2024",
      autoRenew: true
    },
    {
      id: 2,
      tenant: "Retail Store ABC",
      email: "info@retailabc.com",
      plan: "Professional",
      status: "active",
      billingCycle: "monthly",
      amount: "$79",
      nextBilling: "Apr 3, 2024",
      startDate: "Feb 3, 2024",
      autoRenew: true
    },
    {
      id: 3,
      tenant: "Restaurant XYZ",
      email: "manager@restaurantxyz.com",
      plan: "Starter",
      status: "pending",
      billingCycle: "monthly",
      amount: "$29",
      nextBilling: "Apr 10, 2024",
      startDate: "Mar 10, 2024",
      autoRenew: true
    },
    {
      id: 4,
      tenant: "Grocery Store 123",
      email: "admin@grocery123.com",
      plan: "Professional",
      status: "active",
      billingCycle: "yearly",
      amount: "$948",
      nextBilling: "Dec 20, 2024",
      startDate: "Dec 20, 2023",
      autoRenew: true
    },
    {
      id: 5,
      tenant: "Fashion Boutique",
      email: "sales@fashionboutique.com",
      plan: "Enterprise",
      status: "cancelled",
      billingCycle: "monthly",
      amount: "$199",
      nextBilling: "N/A",
      startDate: "Jan 28, 2024",
      autoRenew: false
    },
    {
      id: 6,
      tenant: "Coffee Shop Chain",
      email: "ops@coffeeshop.com",
      plan: "Enterprise",
      status: "active",
      billingCycle: "yearly",
      amount: "$2,388",
      nextBilling: "Nov 15, 2024",
      startDate: "Nov 15, 2023",
      autoRenew: true
    },
    {
      id: 7,
      tenant: "Auto Parts Store",
      email: "manager@autoparts.com",
      plan: "Starter",
      status: "active",
      billingCycle: "monthly",
      amount: "$29",
      nextBilling: "Apr 18, 2024",
      startDate: "Feb 18, 2024",
      autoRenew: true
    },
    {
      id: 8,
      tenant: "Pharmacy Plus",
      email: "admin@pharmacyplus.com",
      plan: "Professional",
      status: "past_due",
      billingCycle: "monthly",
      amount: "$79",
      nextBilling: "Apr 5, 2024",
      startDate: "Mar 5, 2024",
      autoRenew: true
    }
  ]

export default function SubscriptionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [planFilter, setPlanFilter] = useState("all")
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

  // Memoize filtered subscriptions
  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter(sub => {
      const matchesSearch = sub.tenant.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           sub.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || sub.status === statusFilter
      const matchesPlan = planFilter === "all" || sub.plan === planFilter
      return matchesSearch && matchesStatus && matchesPlan
    })
  }, [searchQuery, statusFilter, planFilter])

  // Memoize event handlers
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }, [])

  const handleStatusFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value)
  }, [])

  const handlePlanFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setPlanFilter(e.target.value)
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <CheckCircle className="h-3 w-3" />
            Active
          </span>
        )
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
            <Clock className="h-3 w-3" />
            Pending
          </span>
        )
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
            <XCircle className="h-3 w-3" />
            Cancelled
          </span>
        )
      case "past_due":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <XCircle className="h-3 w-3" />
            Past Due
          </span>
        )
      default:
        return null
    }
  }

  const getPlanBadge = (plan: string) => {
    const colors = {
      "Enterprise": "bg-purple-100 text-purple-700",
      "Professional": "bg-blue-100 text-blue-700",
      "Starter": "bg-slate-100 text-slate-700"
    }
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${colors[plan as keyof typeof colors]}`}>
        {plan}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10 text-primary">
            <CreditCard className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Subscription Plans</h1>
            <p className="text-slate-600">Manage subscription plans and pricing</p>
          </div>
        </div>
        <button onClick={handleOpenCreateModal} className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all font-medium">
          <Plus className="h-4 w-4" />
          Create New Plan
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className={`h-4 w-4 ${stat.title === 'Churn Rate' ? 'text-red-600' : 'text-green-600'}`} />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-green-600" />
                  )}
                  <span className={`text-sm font-medium ${
                    stat.title === 'Churn Rate' 
                      ? (stat.trend === 'up' ? 'text-red-600' : 'text-green-600')
                      : (stat.trend === 'up' ? 'text-green-600' : 'text-red-600')
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${
                stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                stat.color === 'green' ? 'bg-green-100 text-green-600' :
                stat.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' :
                'bg-red-100 text-red-600'
              }`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Plan Cards */}
      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-xl border-2 bg-white p-6 shadow-sm transition-all hover:shadow-lg ${
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
                  <span className="text-3xl font-bold text-slate-800">${plan.price}</span>
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

      {/* Subscriptions Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Filters and Search */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search subscriptions by tenant or email..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-400" />
              <select
                value={statusFilter}
                onChange={handleStatusFilterChange}
                className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all text-sm bg-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
                <option value="past_due">Past Due</option>
              </select>
            </div>

            {/* Plan Filter */}
            <select
              value={planFilter}
              onChange={handlePlanFilterChange}
              className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all text-sm bg-white"
            >
              <option value="all">All Plans</option>
              <option value="Starter">Starter</option>
              <option value="Professional">Professional</option>
              <option value="Enterprise">Enterprise</option>
            </select>

            {/* Export Button */}
            <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all text-sm font-medium text-slate-700">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Tenant</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Plan</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Billing Cycle</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Next Billing</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Auto Renew</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredSubscriptions.map((subscription) => (
                <tr key={subscription.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-slate-800">{subscription.tenant}</p>
                      <p className="text-xs text-slate-500">{subscription.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getPlanBadge(subscription.plan)}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(subscription.status)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600 capitalize">{subscription.billingCycle}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-800">{subscription.amount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{subscription.nextBilling}</span>
                  </td>
                  <td className="px-6 py-4">
                    {subscription.autoRenew ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-slate-300" />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="View">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all" title="Edit">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Cancel">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all" title="More">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Showing <span className="font-medium text-slate-800">1</span> to <span className="font-medium text-slate-800">{filteredSubscriptions.length}</span> of <span className="font-medium text-slate-800">{subscriptions.length}</span> subscriptions
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed" disabled>
              Previous
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-all">
              1
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all">
              2
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Plan Form Modal */}
      {isPlanModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <PlanForm
              mode={editingPlan ? "edit" : "create"}
              initialData={editingPlan || undefined}
              onSave={handleSavePlan}
              onCancel={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  )
}
