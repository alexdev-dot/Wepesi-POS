"use client"

import { DollarSign, TrendingUp, CreditCard, Calendar, BarChart3, Users, ArrowUpRight, ArrowDownRight } from "lucide-react"

const revenueMetrics = [
  {
    title: "Total Revenue",
    value: "Ksh 45,800,000",
    change: "+15.2%",
    trend: "up",
    icon: DollarSign,
    color: "blue"
  },
  {
    title: "Subscription Revenue",
    value: "Ksh 38,500,000",
    change: "+12.8%",
    trend: "up",
    icon: CreditCard,
    color: "green"
  },
  {
    title: "Lifetime Revenue",
    value: "Ksh 156,200,000",
    change: "+18.5%",
    trend: "up",
    icon: TrendingUp,
    color: "emerald"
  },
  {
    title: "Monthly Recurring Revenue",
    value: "Ksh 15,800,000",
    change: "+12.3%",
    trend: "up",
    icon: Calendar,
    color: "purple"
  },
  {
    title: "Revenue This Month",
    value: "Ksh 4,250,000",
    change: "+8.7%",
    trend: "up",
    icon: DollarSign,
    color: "blue"
  },
  {
    title: "Revenue This Year",
    value: "Ksh 32,400,000",
    change: "+14.2%",
    trend: "up",
    icon: Calendar,
    color: "green"
  },
  {
    title: "Avg Revenue per Business",
    value: "Ksh 125,000",
    change: "+5.4%",
    trend: "up",
    icon: Users,
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

const revenueByPlan = [
  {
    plan: "Enterprise",
    revenue: "Ksh 18,500,000",
    percentage: 40.4,
    color: "purple",
    businesses: 45
  },
  {
    plan: "Professional",
    revenue: "Ksh 15,200,000",
    percentage: 33.2,
    color: "blue",
    businesses: 120
  },
  {
    plan: "Starter",
    revenue: "Ksh 12,100,000",
    percentage: 26.4,
    color: "slate",
    businesses: 200
  }
]

const monthlyRevenue = [
  { month: "Jan", revenue: 3200000, bars: 4, newSubs: 12, churned: 2 },
  { month: "Feb", revenue: 3800000, bars: 5, newSubs: 15, churned: 3 },
  { month: "Mar", revenue: 4200000, bars: 6, newSubs: 18, churned: 2 },
  { month: "Apr", revenue: 4250000, bars: 6, newSubs: 14, churned: 4 },
  { month: "May", revenue: 4500000, bars: 6, newSubs: 20, churned: 3 },
  { month: "Jun", revenue: 4800000, bars: 7, newSubs: 22, churned: 2 },
  { month: "Jul", revenue: 5100000, bars: 7, newSubs: 19, churned: 3 },
  { month: "Aug", revenue: 4900000, bars: 7, newSubs: 16, churned: 4 },
  { month: "Sep", revenue: 5200000, bars: 7, newSubs: 21, churned: 2 },
  { month: "Oct", revenue: 5500000, bars: 8, newSubs: 24, churned: 3 },
  { month: "Nov", revenue: 5800000, bars: 8, newSubs: 23, churned: 2 },
  { month: "Dec", revenue: 6200000, bars: 8, newSubs: 25, churned: 3 }
]

export default function RevenuePage() {
  const formatCurrency = (value: number) => {
    return `Ksh ${value.toLocaleString('en-US')}`
  }

  const maxBars = 8

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-lg bg-primary/10 text-primary">
          <DollarSign className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Revenue</h1>
          <p className="text-slate-600">Business intelligence and revenue analytics</p>
        </div>
      </div>

      {/* Revenue Metrics Grid */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        {revenueMetrics.map((metric) => (
          <div
            key={metric.title}
            className="rounded-xl border border-slate-200 bg-card p-4 sm:p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-slate-500 mb-1">{metric.title}</p>
                <p className="text-lg sm:text-2xl font-bold text-slate-800">{metric.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  {metric.trend === 'up' ? (
                    <ArrowUpRight className={`h-4 w-4 ${metric.title === 'Churn Rate' ? 'text-red-600' : 'text-green-600'}`} />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-green-600" />
                  )}
                  <span className={`text-sm font-medium ${
                    metric.title === 'Churn Rate' 
                      ? (metric.trend === 'up' ? 'text-red-600' : 'text-green-600')
                      : (metric.trend === 'up' ? 'text-green-600' : 'text-red-600')
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${
                metric.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                metric.color === 'green' ? 'bg-green-100 text-green-600' :
                metric.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' :
                metric.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                'bg-red-100 text-red-600'
              }`}>
                <metric.icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue by Plan */}
      <div className="rounded-xl border border-slate-200 bg-card shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-slate-800">Revenue by Plan</h2>
          <BarChart3 className="h-5 w-5 text-slate-400" />
        </div>
        <div className="space-y-4">
          {revenueByPlan.map((item) => (
            <div key={item.plan} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    item.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                    item.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    <DollarSign className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{item.plan}</p>
                    <p className="text-xs text-slate-500">{item.businesses} businesses</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-800">{item.revenue}</p>
                  <p className="text-xs text-slate-500">{item.percentage}% of total</p>
                </div>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    item.color === 'purple' ? 'bg-purple-500' :
                    item.color === 'blue' ? 'bg-blue-500' :
                    'bg-slate-500'
                  }`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue by Month Chart */}
      <div className="rounded-xl border border-slate-200 bg-card shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-slate-800">Revenue by Month</h2>
          <BarChart3 className="h-5 w-5 text-slate-400" />
        </div>
        
        {/* Simple Bar Chart */}
        <div className="space-y-4">
          <div className="flex items-end justify-between gap-2 h-48 px-2">
            {monthlyRevenue.map((item) => (
              <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col justify-end items-center gap-1 h-full">
                  <div className="w-full bg-primary/10 rounded-t-md transition-all hover:bg-primary/20 relative group" style={{ height: `${(item.bars / maxBars) * 100}%` }}>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {formatCurrency(item.revenue)}
                    </div>
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-600">{item.month}</span>
              </div>
            ))}
          </div>
          
          {/* Chart Legend */}
          <div className="flex items-center justify-center gap-6 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-sm" />
              <span className="text-sm text-slate-600">Monthly Revenue</span>
            </div>
            <div className="text-sm text-slate-500">
              Total YTD: <span className="font-semibold text-slate-800">{formatCurrency(monthlyRevenue.reduce((sum, item) => sum + item.revenue, 0))}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Summary Table */}
      <div className="rounded-xl border border-slate-200 bg-card shadow-sm">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800">Monthly Revenue Breakdown</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Month</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Growth</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">New Subscriptions</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Churned</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {monthlyRevenue.slice(0, 6).map((item, index) => {
                const prevRevenue = index > 0 ? monthlyRevenue[index - 1].revenue : monthlyRevenue[0].revenue
                const growth = index === 0 ? "0" : ((item.revenue - prevRevenue) / prevRevenue * 100).toFixed(1)
                const isPositive = parseFloat(growth) >= 0
                
                return (
                  <tr key={item.month} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-slate-800">{item.month}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-slate-800">{formatCurrency(item.revenue)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        {index === 0 ? (
                          <span className="text-sm text-slate-400">-</span>
                        ) : (
                          <>
                            {isPositive ? (
                              <ArrowUpRight className="h-4 w-4 text-green-600" />
                            ) : (
                              <ArrowDownRight className="h-4 w-4 text-red-600" />
                            )}
                            <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                              {isPositive ? '+' : ''}{growth}%
                            </span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">{item.newSubs}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">{item.churned}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
