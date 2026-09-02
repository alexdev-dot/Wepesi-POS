"use client"

import { Package, Users, Truck, UsersRound, DollarSign, ArrowUp } from "lucide-react"
import { motion } from "framer-motion"

const stats = [
  {
    title: "Total Products",
    subtitle: "In inventory",
    value: "1,248",
    change: "+12",
    changeLabel: "new this week",
    icon: Package,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    trend: "up",
  },
  {
    title: "Total Customers",
    subtitle: "Registered users",
    value: "3,456",
    change: "+48",
    changeLabel: "new this week",
    icon: Users,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    trend: "up",
  },
  {
    title: "Total Suppliers",
    subtitle: "Active partners",
    value: "89",
    change: "+3",
    changeLabel: "new this week",
    icon: Truck,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    trend: "up",
  },
  {
    title: "Total Employees",
    subtitle: "Staff members",
    value: "24",
    change: "+2",
    changeLabel: "new this month",
    icon: UsersRound,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    trend: "up",
  },
  {
    title: "Stock Value",
    subtitle: "Total inventory worth",
    value: "KSh 2.4M",
    change: "+8.5%",
    changeLabel: "vs last month",
    icon: DollarSign,
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
    trend: "up",
  },
]

export function BusinessStatsSkeleton() {
  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 w-full font-sans">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm">
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div className="h-11 w-11 rounded-xl bg-muted/70 animate-pulse" />
            <div className="h-6 w-16 rounded-full bg-muted/70 animate-pulse" />
          </div>
          <div className="h-4 bg-muted/70 rounded w-1/2 mb-2 animate-pulse" />
          <div className="h-3 bg-muted/70 rounded w-1/3 mb-2 animate-pulse" />
          <div className="h-7 bg-muted/70 rounded w-2/3 mb-2 animate-pulse" />
          <div className="h-3 bg-muted/70 rounded w-1/4 animate-pulse" />
        </div>
      ))}
    </div>
  )
}

export function BusinessStats() {
  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 w-full font-sans">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 + index * 0.1, ease: "easeOut" }}
          whileHover={{ scale: 1.02, y: -4 }}
          className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 font-sans"
        >
          {/* Header with Icon */}
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ duration: 0.2 }}
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconBg} ${stat.iconColor} shadow-sm`}
            >
              <stat.icon className="h-5 w-5" strokeWidth={2} />
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 1.2 + index * 0.1, type: "spring" }}
              className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600 border border-green-200"
            >
              <ArrowUp className="h-3 w-3" />
              <span>{stat.change}</span>
            </motion.div>
          </div>
          
          {/* Content */}
          <div>
            <motion.h4 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.3 + index * 0.1 }}
              className="text-sm font-semibold text-foreground"
            >
              {stat.title}
            </motion.h4>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.35 + index * 0.1 }}
              className="text-xs text-muted-foreground mt-0.5"
            >
              {stat.subtitle}
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 1.4 + index * 0.1 }}
              className="mt-2 text-xl sm:text-2xl font-bold text-foreground"
            >
              {stat.value}
            </motion.p>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.45 + index * 0.1 }}
              className="mt-1 text-xs text-muted-foreground"
            >
              {stat.changeLabel}
            </motion.p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
