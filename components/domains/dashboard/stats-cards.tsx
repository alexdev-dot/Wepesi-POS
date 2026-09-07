"use client"

import { ShoppingCart, TrendingUp, FileText, Coins, ArrowUp, ArrowDown } from "lucide-react"
import { motion } from "framer-motion"

interface StatsData {
  totalSales: { value: number; change: number }
  totalProfit: { value: number; change: number }
  transactions: { value: number; change: number }
  avgOrderValue: { value: number; change: number }
}

interface StatsCardsProps {
  data?: StatsData | null
  isLoading?: boolean
}

export function StatsCards({ data, isLoading = true }: StatsCardsProps) {
  const stats = data

  const formatCurrency = (value: number) => {
    return `KSh ${value.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : ''
    return `${sign}${change.toFixed(1)}%`
  }

  const statsConfig = [
    {
      title: "Total Sales",
      subtitle: "Today's revenue",
      value: stats ? formatCurrency(stats.totalSales.value) : "KSh 0.00",
      change: stats ? formatChange(stats.totalSales.change ?? 0) : "+0%",
      changeLabel: "vs yesterday",
      icon: ShoppingCart,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      trend: (stats?.totalSales.change ?? 0) >= 0 ? "up" : "down",
    },
    {
      title: "Total Profit",
      subtitle: "Today's profit",
      value: stats ? formatCurrency(stats.totalProfit.value) : "KSh 0.00",
      change: stats ? formatChange(stats.totalProfit.change ?? 0) : "+0%",
      changeLabel: "vs yesterday",
      icon: TrendingUp,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      trend: (stats?.totalProfit.change ?? 0) >= 0 ? "up" : "down",
    },
    {
      title: "Transactions",
      subtitle: "Today's orders",
      value: stats?.transactions.value.toString() || "0",
      change: stats ? formatChange(stats.transactions.change ?? 0) : "+0%",
      changeLabel: "vs yesterday",
      icon: FileText,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      trend: (stats?.transactions.change ?? 0) >= 0 ? "up" : "down",
    },
    {
      title: "Avg. Order Value",
      subtitle: "Average per order",
      value: stats ? formatCurrency(stats.avgOrderValue.value) : "KSh 0.00",
      change: stats ? formatChange(stats.avgOrderValue.change ?? 0) : "+0%",
      changeLabel: "vs yesterday",
      icon: Coins,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      trend: (stats?.avgOrderValue.change ?? 0) >= 0 ? "up" : "down",
    },
  ]

  if (isLoading) {
    return <StatsCardsSkeleton />
  }

  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full font-sans">
      {statsConfig.map((stat, index: number) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
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
              transition={{ duration: 0.3, delay: 0.2 + index * 0.1, type: "spring" }}
              className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold border ${
                stat.trend === 'up' 
                  ? 'bg-green-50 text-green-600 border-green-200' 
                  : 'bg-red-50 text-red-600 border-red-200'
              }`}
            >
              {stat.trend === 'up' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
              <span>{stat.change}</span>
            </motion.div>
          </div>

          {/* Content */}
          <div>
            <motion.h4 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              className="text-sm font-semibold text-foreground"
            >
              {stat.title}
            </motion.h4>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.35 + index * 0.1 }}
              className="text-xs text-muted-foreground mt-0.5"
            >
              {stat.subtitle}
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              className="mt-2 text-xl sm:text-2xl font-bold text-foreground"
            >
              {stat.value}
            </motion.p>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.45 + index * 0.1 }}
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

export function StatsCardsSkeleton() {
  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full font-sans">
      {Array.from({ length: 4 }).map((_, index) => (
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
