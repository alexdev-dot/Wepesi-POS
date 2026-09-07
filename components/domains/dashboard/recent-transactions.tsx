"use client"

import { Receipt } from "lucide-react"
import { motion } from "framer-motion"

interface Transaction {
  id: string
  customer: string
  items: number
  total: string
  time: string
  status: string
}

interface RecentTransactionsProps {
  data?: { transactions: Transaction[] } | null
  isLoading?: boolean
}

export function RecentTransactions({ data, isLoading = true }: RecentTransactionsProps) {
  const transactions = data?.transactions || []

  const formatCurrency = (value: string) => {
    const num = parseFloat(value)
    return `KSh ${num.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  if (isLoading) {
    return <RecentTransactionsSkeleton />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
      whileHover={{ y: -2 }}
      className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 h-full flex flex-col font-sans"
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
            className="text-base font-semibold text-foreground"
          >
            Recent Transactions
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.65 }}
            className="text-xs text-muted-foreground"
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
              <tr className="border-b border-border">
                <th className="pb-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Receipt No.</th>
                <th className="pb-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Customer</th>
                <th className="pb-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Items</th>
                <th className="pb-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total</th>
                <th className="pb-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Time</th>
                <th className="pb-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? transactions.map((transaction, index) => (
                <motion.tr
                  key={transaction.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
                  whileHover={{ x: 4, backgroundColor: "var(--muted)" }}
                  className="border-b border-border transition-colors cursor-pointer"
                >
                  <td className="py-3 text-xs font-medium text-foreground">{transaction.id}</td>
                  <td className="py-3 text-xs text-muted-foreground">{transaction.customer}</td>
                  <td className="py-3 text-xs text-muted-foreground">{transaction.items}</td>
                  <td className="py-3 text-xs font-semibold text-foreground">{formatCurrency(transaction.total)}</td>
                  <td className="py-3 text-xs text-muted-foreground">{transaction.time}</td>
                  <td className="py-3">
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex rounded-full bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700 border border-green-200"
                    >
                      {transaction.status}
                    </motion.span>
                  </td>
                </motion.tr>
              )) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-sm text-muted-foreground">
                    No transactions yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3">
          {transactions.length > 0 ? transactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
              whileHover={{ y: -2 }}
              className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted cursor-pointer"
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground">{transaction.id}</p>
                <p className="text-xs text-muted-foreground truncate">{transaction.customer}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-foreground">{formatCurrency(transaction.total)}</p>
                <p className="text-xs text-muted-foreground">{transaction.time}</p>
              </div>
            </motion.div>
          )) : (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No transactions yet
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export function RecentTransactionsSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm h-full flex flex-col font-sans">
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
          <div key={index} className="flex items-center gap-3 py-3 border-b border-border">
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
