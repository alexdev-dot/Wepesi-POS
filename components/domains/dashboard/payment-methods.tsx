"use client"

import { CreditCard } from "lucide-react"
import { motion } from "framer-motion"

const paymentMethods = [
  { name: "Cash", amount: "KSh 22,450.00", percentage: 49, color: "#3B82F6" },
  { name: "M-Pesa", amount: "KSh 15,850.00", percentage: 35, color: "#10B981" },
  { name: "Card", amount: "KSh 4,750.00", percentage: 10, color: "#F59E0B" },
  { name: "Other", amount: "KSh 2,628.00", percentage: 6, color: "#6B7280" },
]

const totalAmount = "KSh 45,678"

export function PaymentMethodsSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm font-sans">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-11 w-11 rounded-xl bg-muted/70 animate-pulse" />
        <div>
          <div className="h-5 bg-muted/70 rounded w-1/2 mb-1 animate-pulse" />
          <div className="h-3 bg-muted/70 rounded w-1/3 animate-pulse" />
        </div>
      </div>
      <div className="mt-5 flex items-center gap-6">
        <div className="h-36 w-36 sm:h-44 sm:w-44 rounded-full bg-muted/30 animate-pulse shrink-0" />
        <div className="flex-1 space-y-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-center justify-between rounded-lg px-3 py-2">
              <div className="flex items-center gap-3">
                <div className="h-3.5 w-3.5 rounded-full bg-muted/70 animate-pulse shrink-0" />
                <div className="h-3 bg-muted/70 rounded w-12 animate-pulse" />
              </div>
              <div className="text-right ml-4">
                <div className="h-3 bg-muted/70 rounded w-16 mb-1 animate-pulse" />
                <div className="h-3 bg-muted/70 rounded w-8 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function PaymentMethods() {
  let cumulativePercentage = 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
      whileHover={{ y: -2 }}
      className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 font-sans"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          whileHover={{ rotate: 5, scale: 1.1 }}
          transition={{ duration: 0.2 }}
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600 shadow-sm"
        >
          <CreditCard className="h-5 w-5" strokeWidth={2} />
        </motion.div>
        <div>
          <motion.h3 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.55 }}
            className="text-base font-semibold text-foreground"
          >
            Sales by Payment Method
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            className="text-xs text-muted-foreground"
          >
            Payment distribution
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.65 }}
        className="mt-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
      >
        {/* Donut Chart */}
        <div className="relative h-32 w-32 sm:h-36 sm:w-36 md:h-44 md:w-44 shrink-0">
          <svg className="h-full w-full" viewBox="0 0 100 100">
            {paymentMethods.map((method, index) => {
              const startAngle = cumulativePercentage * 3.6
              cumulativePercentage += method.percentage
              const endAngle = cumulativePercentage * 3.6

              const startAngleRad = (startAngle - 90) * (Math.PI / 180)
              const endAngleRad = (endAngle - 90) * (Math.PI / 180)

              const x1 = 50 + 40 * Math.cos(startAngleRad)
              const y1 = 50 + 40 * Math.sin(startAngleRad)
              const x2 = 50 + 40 * Math.cos(endAngleRad)
              const y2 = 50 + 40 * Math.sin(endAngleRad)

              const largeArcFlag = method.percentage > 50 ? 1 : 0

              return (
                <motion.path
                  key={method.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1, ease: "easeOut" }}
                  whileHover={{ scale: 1.05 }}
                  d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                  fill={method.color}
                  stroke="card"
                  strokeWidth="2"
                  className="hover:opacity-90 transition-opacity cursor-pointer"
                />
              )
            })}
            {/* Inner circle for donut effect */}
            <motion.circle
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1.1, type: "spring" }}
              cx="50"
              cy="50"
              r="25"
              fill="card"
              className="shadow-inner"
            />
          </svg>

          {/* Center text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2, type: "spring" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center">
              <p className="text-xs text-white/80">Total</p>
              <p className="text-sm font-bold text-white">{totalAmount}</p>
            </div>
          </motion.div>
        </div>

        {/* Legend */}
        <div className="flex-1 w-full space-y-2">
          {paymentMethods.map((method, index) => (
            <motion.div
              key={method.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.75 + index * 0.1 }}
              whileHover={{ x: 4, backgroundColor: "var(--muted)" }}
              className="flex items-center justify-between rounded-lg px-3 py-2 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="h-3.5 w-3.5 rounded-full shadow-sm shrink-0"
                  style={{ backgroundColor: method.color }}
                />
                <span className="text-xs font-medium text-foreground">{method.name}</span>
              </div>
              <div className="text-right ml-4">
                <p className="text-xs font-semibold text-foreground">{method.amount}</p>
                <p className="text-xs text-muted-foreground">{method.percentage}%</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
