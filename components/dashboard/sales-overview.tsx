"use client"

import { TrendingUp, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"

const timeTabs = ["Today", "This Week", "This Month", "This Year"]

// Sample data for the chart
const chartData = [
  { time: "12 AM", value: 5200 },
  { time: "3 AM", value: 2800 },
  { time: "6 AM", value: 8500 },
  { time: "9 AM", value: 18500 },
  { time: "12 PM", value: 32450 },
  { time: "3 PM", value: 28900 },
  { time: "6 PM", value: 22100 },
  { time: "9 PM", value: 15600 },
]

const maxValue = Math.max(...chartData.map((d) => d.value))

export function SalesOverview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
      whileHover={{ y: -2 }}
      className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 font-sans"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          whileHover={{ rotate: 5, scale: 1.1 }}
          transition={{ duration: 0.2 }}
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600 shadow-sm"
        >
          <TrendingUp className="h-5 w-5" strokeWidth={2} />
        </motion.div>
        <div className="flex-1">
          <motion.h3 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="text-base font-semibold text-slate-900"
          >
            Sales Overview
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.55 }}
            className="text-xs text-slate-500"
          >
            Revenue over time
          </motion.p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
        >
          <span>Daily</span>
          <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
        </motion.button>
      </div>

      {/* Tabs */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        className="flex gap-4 border-b border-slate-200 overflow-x-auto"
      >
        {timeTabs.map((tab, index) => (
          <motion.button
            key={tab}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.65 + index * 0.05 }}
            whileHover={{ y: -2 }}
            className={`px-1 pb-3 text-xs font-medium transition-colors relative whitespace-nowrap ${
              tab === "Today"
                ? "text-blue-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab}
            {tab === "Today" && (
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.3, delay: 0.8 }}
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
              />
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-5 h-52"
      >
        <svg className="h-full w-full" viewBox="0 0 800 250" preserveAspectRatio="none">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((percent) => (
            <line
              key={percent}
              x1="0"
              y1={`${percent}%`}
              x2="100%"
              y2={`${percent}%`}
              stroke="currentColor"
              strokeWidth="1"
              className="text-slate-100"
              strokeDasharray="4 4"
            />
          ))}

          {/* Area fill with gradient */}
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
            d={`M 0 ${250 - (chartData[0].value / maxValue) * 230} ${chartData
              .map((d, i) => `L ${i * 114} ${250 - (d.value / maxValue) * 230}`)
              .join(" ")} L 800 250 L 0 250 Z`}
            fill="url(#chartGradient)"
          />

          {/* Line */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
            d={`M 0 ${250 - (chartData[0].value / maxValue) * 230} ${chartData
              .map((d, i) => `L ${i * 114} ${250 - (d.value / maxValue) * 230}`)
              .join(" ")}`}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {chartData.map((d, i) => (
            <motion.circle
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 1 + i * 0.1, type: "spring" }}
              whileHover={{ scale: 1.5 }}
              cx={i * 114}
              cy={250 - (d.value / maxValue) * 230}
              r="5"
              fill="white"
              stroke="#3B82F6"
              strokeWidth="2.5"
              className="hover:r-6 transition-all cursor-pointer"
            />
          ))}
        </svg>

        {/* X-axis labels */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1.2 }}
          className="mt-2 flex justify-between text-xs text-slate-500"
        >
          {chartData.map((d) => (
            <span key={d.time}>{d.time}</span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
