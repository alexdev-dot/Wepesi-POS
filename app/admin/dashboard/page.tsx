"use client"

import { LayoutDashboard, Building2, Users, CreditCard, Receipt, TrendingUp, AlertCircle, CheckCircle, Clock, Activity } from "@/components/admin/icons"

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Tenants",
      value: "1,247",
      change: "+12.5%",
      trend: "up",
      icon: Building2,
      color: "blue"
    },
    {
      title: "Active Subscriptions",
      value: "892",
      change: "+8.2%",
      trend: "up",
      icon: CreditCard,
      color: "green"
    },
    {
      title: "Total Revenue",
      value: "$284,520",
      change: "+15.3%",
      trend: "up",
      icon: Receipt,
      color: "amber"
    },
    {
      title: "Super Admin Users",
      value: "24",
      change: "+2",
      trend: "up",
      icon: Users,
      color: "purple"
    }
  ]

  const recentActivity = [
    {
      id: 1,
      action: "New tenant registered",
      tenant: "Tech Solutions Ltd",
      time: "2 minutes ago",
      status: "completed"
    },
    {
      id: 2,
      action: "Subscription upgraded",
      tenant: "Retail Store ABC",
      time: "15 minutes ago",
      status: "completed"
    },
    {
      id: 3,
      action: "Support ticket created",
      tenant: "Restaurant XYZ",
      time: "32 minutes ago",
      status: "pending"
    },
    {
      id: 4,
      action: "Payment processed",
      tenant: "Grocery Store 123",
      time: "1 hour ago",
      status: "completed"
    },
    {
      id: 5,
      action: "System health check",
      tenant: "System",
      time: "2 hours ago",
      status: "completed"
    }
  ]

  const systemHealth = [
    { name: "API Server", status: "operational", uptime: "99.9%" },
    { name: "Database", status: "operational", uptime: "99.8%" },
    { name: "Payment Gateway", status: "operational", uptime: "99.7%" },
    { name: "Email Service", status: "degraded", uptime: "98.5%" },
    { name: "CDN", status: "operational", uptime: "99.9%" }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Super Admin Dashboard</h1>
        <p className="text-sm sm:text-base text-slate-600">Welcome back! Here's an overview of your system.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm sm:text-base font-medium text-slate-500 mb-1">{stat.title}</p>
                <p className="text-2xl sm:text-3xl font-bold text-slate-800">{stat.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className={`h-4 w-4 sm:h-5 sm:w-5 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                  <span className={`text-sm sm:text-base font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`p-3 sm:p-4 rounded-lg ${
                stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                stat.color === 'green' ? 'bg-green-100 text-green-600' :
                stat.color === 'amber' ? 'bg-amber-100 text-amber-600' :
                'bg-purple-100 text-purple-600'
              }`}>
                <stat.icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-base sm:text-lg font-semibold text-slate-800">Recent Activity</h2>
            <button className="text-sm sm:text-base text-primary hover:text-primary/80 transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 border border-slate-200"
              >
                <div className={`p-2 sm:p-2.5 rounded-full ${
                  activity.status === 'completed' ? 'bg-green-100 text-green-600' :
                  activity.status === 'pending' ? 'bg-amber-100 text-amber-600' :
                  'bg-red-100 text-red-600'
                }`}>
                  {activity.status === 'completed' && <CheckCircle className="h-4 w-4" />}
                  {activity.status === 'pending' && <Clock className="h-4 w-4" />}
                  {activity.status === 'error' && <AlertCircle className="h-4 w-4" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm sm:text-base font-medium text-slate-800">{activity.action}</p>
                  <p className="text-xs sm:text-sm text-slate-500">{activity.tenant}</p>
                </div>
                <span className="text-xs sm:text-sm text-slate-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-base sm:text-lg font-semibold text-slate-800">System Health</h2>
            <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
          </div>
          <div className="space-y-4">
            {systemHealth.map((service) => (
              <div key={service.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base font-medium text-slate-800">{service.name}</span>
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full ${
                      service.status === 'operational' ? 'bg-green-500' :
                      service.status === 'degraded' ? 'bg-amber-500' :
                      'bg-red-500'
                    }`} />
                    <span className={`text-xs sm:text-sm font-medium ${
                      service.status === 'operational' ? 'text-green-600' :
                      service.status === 'degraded' ? 'text-amber-600' :
                      'text-red-600'
                    }`}>
                      {service.status}
                    </span>
                  </div>
                </div>
                <div className="h-2 sm:h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      service.status === 'operational' ? 'bg-green-500' :
                      service.status === 'degraded' ? 'bg-amber-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: service.uptime }}
                  />
                </div>
                <span className="text-xs sm:text-sm text-slate-500">{service.uptime} uptime</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
        <h2 className="text-base sm:text-lg font-semibold text-slate-800 mb-4">Quick Actions</h2>
        <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          <button className="flex items-center gap-3 p-4 sm:p-5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 transition-all">
            <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            <span className="text-sm sm:text-base font-medium text-slate-800">Add Tenant</span>
          </button>
          <button className="flex items-center gap-3 p-4 sm:p-5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 transition-all">
            <Users className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
            <span className="text-sm sm:text-base font-medium text-slate-800">Add Admin User</span>
          </button>
          <button className="flex items-center gap-3 p-4 sm:p-5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 transition-all">
            <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            <span className="text-sm sm:text-base font-medium text-slate-800">Manage Plans</span>
          </button>
          <button className="flex items-center gap-3 p-4 sm:p-5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 transition-all">
            <Receipt className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
            <span className="text-sm sm:text-base font-medium text-slate-800">View Invoices</span>
          </button>
        </div>
      </div>
    </div>
  )
}
