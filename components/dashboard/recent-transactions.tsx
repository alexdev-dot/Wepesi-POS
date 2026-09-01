"use client"

import { Receipt } from "lucide-react"
import { motion } from "framer-motion"

const transactions = [
  { id: "INV-000129", customer: "Walk-in Customer", items: 3, total: "KSh 1,250.00", time: "10:45 AM", status: "Completed" },
  { id: "INV-000128", customer: "Peter Mwangi", items: 5, total: "KSh 3,560.00", time: "10:20 AM", status: "Completed" },
  { id: "INV-000127", customer: "Walk-in Customer", items: 2, total: "KSh 980.00", time: "09:58 AM", status: "Completed" },
  { id: "INV-000126", customer: "Grace Wanjiku", items: 4, total: "KSh 2,450.00", time: "09:32 AM", status: "Completed" },
  { id: "INV-000125", customer: "Walk-in Customer", items: 1, total: "KSh 450.00", time: "09:15 AM", status: "Completed" },
]

export function RecentTransactionsSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm h-full flex flex-col font-sans">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-11 w-11 rounded-xl bg-muted/70 animate-pulse" />
        <div className="flex-1">
          <div className="h-5 bg-muted/70 rounded w-1/2 mb-1 animate-pulse" />
          <div className="h-3 bg-muted/70 rounded w-1/3 animate-pulse" />
        </div>
        <div className="h-4 bg-muted/70 rounded w-12 animate-pulse" />
      </div>
      <div className="flex-1 space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center gap-3 py-3 border-b border-slate-100">
            <div className="h-3 bg-muted/70 rounded w-16 animate-pulse" />
            <div className="h-3 bg-muted/70 rounded w-24 animate-pulse" />
            <div className="h-3 bg-muted/70 rounded w-8 animate-pulse" />
            <div className="h-3 bg-muted/70 rounded w-16 animate-pulse" />
            <div className="h-3 bg-muted/70 rounded w-12 animate-pulse" />
            <div className="h-5 bg-muted/70 rounded w-16 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function RecentTransactions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
      whileHover={{ y: -2 }}
      className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 h-full flex flex-col font-sans"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          whileHover={{ rotate: 5, scale: 1.1 }}
          transition={{ duration: 0.2 }}
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600 shadow-sm"
        >
          <Receipt className="h-5 w-5" strokeWidth={2} />
        </motion.div>
        <div className="flex-1">
          <motion.h3 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            className="text-base font-semibold text-slate-900"
          >
            Recent Transactions
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.65 }}
            className="text-xs text-slate-500"
          >
            Latest sales
          </motion.p>
        </div>
        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.7 }}
          whileHover={{ scale: 1.05 }}
          href="#"
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
        >
          View All
        </motion.a>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.75 }}
        className="flex-1"
      >
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="pb-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Receipt No.</th>
                <th className="pb-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                <th className="pb-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Items</th>
                <th className="pb-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Total</th>
                <th className="pb-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Time</th>
                <th className="pb-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <motion.tr
                  key={transaction.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
                  whileHover={{ x: 4, backgroundColor: "#f8fafc" }}
                  className="border-b border-slate-100 transition-colors cursor-pointer"
                >
                  <td className="py-3 text-xs font-medium text-slate-900">{transaction.id}</td>
                  <td className="py-3 text-xs text-slate-700">{transaction.customer}</td>
                  <td className="py-3 text-xs text-slate-700">{transaction.items}</td>
                  <td className="py-3 text-xs font-semibold text-slate-900">{transaction.total}</td>
                  <td className="py-3 text-xs text-slate-500">{transaction.time}</td>
                  <td className="py-3">
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex rounded-full bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700 border border-green-200"
                    >
                      {transaction.status}
                    </motion.span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3">
          {transactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
              whileHover={{ y: -2 }}
              className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer"
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-900">{transaction.id}</p>
                <p className="text-xs text-slate-500 truncate">{transaction.customer}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-slate-900">{transaction.total}</p>
                <p className="text-xs text-slate-500">{transaction.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
