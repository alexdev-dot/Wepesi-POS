"use client"

import { motion } from "framer-motion"
import { LayoutDashboard, Building2, Users, CreditCard, Receipt, TrendingUp, AlertCircle, CheckCircle, Clock, Activity } from "@/components/admin/icons"

export function AdminDashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-8 sm:h-10 w-64 bg-slate-200 rounded animate-pulse" />
        <div className="h-4 sm:h-5 w-96 bg-slate-200 rounded animate-pulse" />
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-xl border border-slate-200 bg-card p-4 sm:p-5 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="h-11 w-11 rounded-lg bg-slate-200 animate-pulse" />
              <div className="h-6 w-16 rounded-full bg-slate-200 animate-pulse" />
            </div>
            <div className="h-4 bg-slate-200 rounded w-1/2 mb-2 animate-pulse" />
            <div className="h-8 bg-slate-200 rounded w-2/3 mb-2 animate-pulse" />
            <div className="h-4 bg-slate-200 rounded w-1/3 animate-pulse" />
          </div>
        ))}
      </div>

      {/* Main Content Grid Skeleton */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Recent Activity Skeleton */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="h-6 w-32 bg-slate-200 rounded animate-pulse" />
            <div className="h-5 w-16 bg-slate-200 rounded animate-pulse" />
          </div>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
                <div className="h-10 w-10 rounded-full bg-slate-200 animate-pulse shrink-0" />
                <div className="flex-1">
                  <div className="h-4 bg-slate-200 rounded w-3/4 mb-1 animate-pulse" />
                  <div className="h-3 bg-slate-200 rounded w-1/2 animate-pulse" />
                </div>
                <div className="h-3 bg-slate-200 rounded w-16 animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* System Health Skeleton */}
        <div className="rounded-xl border border-slate-200 bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="h-6 w-32 bg-slate-200 rounded animate-pulse" />
            <div className="h-6 w-6 bg-slate-200 rounded animate-pulse" />
          </div>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="h-4 bg-slate-200 rounded w-1/3 animate-pulse" />
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-slate-200 animate-pulse" />
                    <div className="h-3 bg-slate-200 rounded w-16 animate-pulse" />
                  </div>
                </div>
                <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-300 rounded-full w-3/4 animate-pulse" />
                </div>
                <div className="h-3 bg-slate-200 rounded w-16 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions Skeleton */}
      <div className="rounded-xl border border-slate-200 bg-card p-4 sm:p-6 shadow-sm">
        <div className="h-6 w-32 bg-slate-200 rounded mb-4 animate-pulse" />
        <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-center gap-3 p-4 sm:p-5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="h-6 w-6 bg-slate-200 rounded animate-pulse shrink-0" />
              <div className="h-4 bg-slate-200 rounded w-24 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Super Admin Dashboard</h1>
        <p className="text-sm sm:text-base text-slate-600">Welcome back! Here's an overview of your system.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease: "easeOut" }}
            whileHover={{ scale: 1.02, y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            className="rounded-xl border border-slate-200 bg-card p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm sm:text-base font-medium text-slate-500 mb-1">{stat.title}</p>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  className="text-2xl sm:text-3xl font-bold text-slate-800"
                >
                  {stat.value}
                </motion.p>
                <div className="flex items-center gap-1 mt-2">
                  <motion.div
                    whileHover={{ rotate: 10 }}
                  >
                    <TrendingUp className={`h-4 w-4 sm:h-5 sm:w-5 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                  </motion.div>
                  <span className={`text-sm sm:text-base font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className={`p-3 sm:p-4 rounded-lg ${
                  stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  stat.color === 'green' ? 'bg-green-100 text-green-600' :
                  stat.color === 'amber' ? 'bg-amber-100 text-amber-600' :
                  'bg-purple-100 text-purple-600'
                } shadow-sm`}
              >
                <stat.icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
          className="lg:col-span-2 rounded-xl border border-slate-200 bg-card p-6 shadow-sm hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-base sm:text-lg font-semibold text-slate-800">Recent Activity</h2>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm sm:text-base text-primary hover:text-primary/80 transition-colors"
            >
              View All
            </motion.button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                whileHover={{ x: 4, backgroundColor: "#f8fafc" }}
                className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer transition-colors"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                  className={`p-2 sm:p-2.5 rounded-full ${
                    activity.status === 'completed' ? 'bg-green-100 text-green-600' :
                    activity.status === 'pending' ? 'bg-amber-100 text-amber-600' :
                    'bg-red-100 text-red-600'
                  } shadow-sm`}
                >
                  {activity.status === 'completed' && <CheckCircle className="h-4 w-4" />}
                  {activity.status === 'pending' && <Clock className="h-4 w-4" />}
                  {activity.status === 'error' && <AlertCircle className="h-4 w-4" />}
                </motion.div>
                <div className="flex-1">
                  <p className="text-sm sm:text-base font-medium text-slate-800">{activity.action}</p>
                  <p className="text-xs sm:text-sm text-slate-500">{activity.tenant}</p>
                </div>
                <span className="text-xs sm:text-sm text-slate-400">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* System Health */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
          whileHover={{ y: -2 }}
          className="rounded-xl border border-slate-200 bg-card p-6 shadow-sm hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-base sm:text-lg font-semibold text-slate-800">System Health</h2>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </motion.div>
          </div>
          <div className="space-y-4">
            {systemHealth.map((service, index) => (
              <motion.div 
                key={service.name} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base font-medium text-slate-800">{service.name}</span>
                  <div className="flex items-center gap-2">
                    <motion.div 
                      animate={{ 
                        scale: service.status === 'operational' ? [1, 1.2, 1] : 1,
                        opacity: service.status === 'degraded' ? [1, 0.5, 1] : 1
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full ${
                        service.status === 'operational' ? 'bg-green-500' :
                        service.status === 'degraded' ? 'bg-amber-500' :
                        'bg-red-500'
                      } shadow-sm`} 
                    />
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
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: service.uptime }}
                    transition={{ duration: 1, delay: 1 + index * 0.1, ease: "easeOut" }}
                    className={`h-full rounded-full ${
                      service.status === 'operational' ? 'bg-green-500' :
                      service.status === 'degraded' ? 'bg-amber-500' :
                      'bg-red-500'
                    }`}
                  />
                </div>
                <span className="text-xs sm:text-sm text-slate-500">{service.uptime} uptime</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0, ease: "easeOut" }}
        className="rounded-xl border border-slate-200 bg-card p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200"
      >
        <h2 className="text-base sm:text-lg font-semibold text-slate-800 mb-4">Quick Actions</h2>
        <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 p-4 sm:p-5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 transition-all group"
          >
            <motion.div
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 group-hover:text-blue-700 transition-colors" />
            </motion.div>
            <span className="text-sm sm:text-base font-medium text-slate-800">Add Tenant</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 p-4 sm:p-5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 transition-all group"
          >
            <motion.div
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <Users className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 group-hover:text-purple-700 transition-colors" />
            </motion.div>
            <span className="text-sm sm:text-base font-medium text-slate-800">Add Admin User</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 p-4 sm:p-5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 transition-all group"
          >
            <motion.div
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 group-hover:text-green-700 transition-colors" />
            </motion.div>
            <span className="text-sm sm:text-base font-medium text-slate-800">Manage Plans</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 p-4 sm:p-5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 transition-all group"
          >
            <motion.div
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <Receipt className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 group-hover:text-amber-700 transition-colors" />
            </motion.div>
            <span className="text-sm sm:text-base font-medium text-slate-800">View Invoices</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}
