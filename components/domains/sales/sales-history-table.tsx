"use client"

import { Search, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export interface Sale {
  id: string
  date: string
  customer: string
  cashier: string
  items: number
  total: number
  paymentMethod: string
  status: string
}

interface SalesHistoryTableProps {
  salesData: Sale[]
  selectedSale: Sale | null
  onSaleSelect: (sale: Sale) => void
  searchQuery: string
  onSearchChange: (value: string) => void
  currentPage: number
  onPageChange: (page: number) => void
  totalPages: number
  loading?: boolean
}

export function SalesHistoryTable({
  salesData,
  selectedSale,
  onSaleSelect,
  searchQuery,
  onSearchChange,
  currentPage,
  onPageChange,
  totalPages,
  loading = false
}: SalesHistoryTableProps) {
  const getPaymentMethodColor = (method: string) => {
    switch (method) {
      case "Cash": return "bg-green-100 text-green-700  "
      case "M-Pesa": return "bg-blue-100 text-blue-700  "
      case "Card": return "bg-indigo-100 text-indigo-700  "
      default: return "bg-gray-100 text-gray-700  "
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-700  "
      case "Refunded": return "bg-red-100 text-red-700  "
      case "Voided": return "bg-orange-100 text-orange-700  "
      default: return "bg-gray-100 text-gray-700  "
    }
  }

  // Skeleton row component for desktop table
  const TableSkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="px-4 sm:px-6 py-4"><div className="h-4 w-4 bg-muted/70 rounded" /></td>
      <td className="px-4 sm:px-6 py-4"><div className="h-4 w-20 bg-muted/70 rounded" /></td>
      <td className="px-4 sm:px-6 py-4"><div className="h-4 w-24 bg-muted/70 rounded" /></td>
      <td className="px-4 sm:px-6 py-4"><div className="h-4 w-20 bg-muted/70 rounded" /></td>
      <td className="px-4 sm:px-6 py-4"><div className="h-4 w-20 bg-muted/70 rounded" /></td>
      <td className="px-4 sm:px-6 py-4"><div className="h-4 w-8 bg-muted/70 rounded" /></td>
      <td className="px-4 sm:px-6 py-4"><div className="h-4 w-16 bg-muted/70 rounded" /></td>
      <td className="px-4 sm:px-6 py-4"><div className="h-6 w-16 bg-muted/70 rounded-full" /></td>
      <td className="px-4 sm:px-6 py-4"><div className="h-6 w-16 bg-muted/70 rounded-full" /></td>
      <td className="px-4 sm:px-6 py-4"><div className="h-4 w-4 bg-muted/70 rounded" /></td>
    </tr>
  )

  // Skeleton card component for mobile view
  const MobileSkeletonCard = () => (
    <div className="bg-card border border-border rounded-xl p-4 animate-pulse">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="h-4 w-4 bg-muted/70 rounded" />
          <div>
            <div className="h-4 w-20 bg-muted/70 rounded mb-1" />
            <div className="h-3 w-24 bg-muted/70 rounded" />
          </div>
        </div>
        <div className="h-4 w-4 bg-muted/70 rounded" />
      </div>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <div className="h-3 w-12 bg-muted/70 rounded mb-1" />
          <div className="h-4 w-16 bg-muted/70 rounded" />
        </div>
        <div>
          <div className="h-3 w-12 bg-muted/70 rounded mb-1" />
          <div className="h-4 w-16 bg-muted/70 rounded" />
        </div>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="h-6 w-12 bg-muted/70 rounded-full" />
          <div className="h-6 w-12 bg-muted/70 rounded-full" />
        </div>
        <div className="h-4 w-16 bg-muted/70 rounded" />
      </div>
    </div>
  )

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="px-4 sm:px-6 py-4 border-b border-border bg-muted"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <motion.input
            whileFocus={{ scale: 1.01 }}
            type="text"
            placeholder="Search by receipt no., customer or cashier..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all bg-card shadow-sm"
          />
        </div>
      </motion.div>

      {/* Sales Table */}
      <div className="flex-1 overflow-y-auto bg-card">
        {/* Desktop Table */}
        <div className="hidden md:block">
          <table className="w-full">
            <thead className="bg-muted border-b border-border sticky top-0">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <input type="checkbox" className="rounded border-border" />
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Receipt No.</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date & Time</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Customer</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Cashier</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Items</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Amount</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Payment Method</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                Array.from({ length: 10 }).map((_, index) => (
                  <TableSkeletonRow key={index} />
                ))
              ) : (
                salesData.map((sale, index) => (
                <motion.tr
                  key={sale.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                  whileHover={{ x: 2, backgroundColor: "var(--muted)" }}
                  className={cn("cursor-pointer transition-colors", selectedSale?.id === sale.id ? "bg-blue-50" : "")}
                  onClick={() => onSaleSelect(sale)}
                >
                  <td className="px-4 sm:px-6 py-4">
                    <input type="checkbox" className="rounded border-border" onClick={(e) => e.stopPropagation()} />
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <motion.span whileHover={{ scale: 1.05 }} className="text-sm font-medium text-blue-600 hover:text-blue-700  hover:">{sale.id}</motion.span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm text-muted-foreground">{sale.date}</td>
                  <td className="px-4 sm:px-6 py-4 text-sm text-muted-foreground">{sale.customer}</td>
                  <td className="px-4 sm:px-6 py-4 text-sm text-muted-foreground">{sale.cashier}</td>
                  <td className="px-4 sm:px-6 py-4 text-sm text-muted-foreground">{sale.items}</td>
                  <td className="px-4 sm:px-6 py-4 text-sm font-semibold text-foreground">KSh {sale.total.toFixed(2)}</td>
                  <td className="px-4 sm:px-6 py-4">
                    <motion.span whileHover={{ scale: 1.05 }} className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border", getPaymentMethodColor(sale.paymentMethod))}>
                      {sale.paymentMethod}
                    </motion.span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <motion.span whileHover={{ scale: 1.05 }} className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border", getStatusColor(sale.status))}>
                      {sale.status}
                    </motion.span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <motion.button whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} className="text-muted-foreground hover:text-foreground p-1 hover:bg-muted rounded transition-colors" onClick={(e) => e.stopPropagation()}>
                      <MoreVertical className="h-4 w-4" />
                    </motion.button>
                  </td>
                </motion.tr>
              ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden px-4 sm:px-6 py-4 space-y-3">
          {loading ? (
            Array.from({ length: 10 }).map((_, index) => (
              <MobileSkeletonCard key={index} />
            ))
          ) : (
            salesData.map((sale, index) => (
            <motion.div
              key={sale.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              whileHover={{ y: -2 }}
              onClick={() => onSaleSelect(sale)}
              className={cn(
                "bg-card border rounded-xl p-4 cursor-pointer transition-all shadow-sm",
                selectedSale?.id === sale.id ? "border-blue-500 ring-2 ring-blue-100" : "border-border"
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="rounded border-border" onClick={(e) => e.stopPropagation()} />
                  <div>
                    <p className="text-sm font-semibold text-blue-600 ">{sale.id}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{sale.date}</p>
                  </div>
                </div>
                <motion.button whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} className="text-muted-foreground hover:text-foreground p-1" onClick={(e) => e.stopPropagation()}>
                  <MoreVertical className="h-4 w-4" />
                </motion.button>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <p className="text-xs text-muted-foreground">Customer</p>
                  <p className="text-sm font-medium text-foreground">{sale.customer}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Cashier</p>
                  <p className="text-sm font-medium text-foreground">{sale.cashier}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-2">
                  <motion.span whileHover={{ scale: 1.05 }} className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border", getPaymentMethodColor(sale.paymentMethod))}>
                    {sale.paymentMethod}
                  </motion.span>
                  <motion.span whileHover={{ scale: 1.05 }} className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border", getStatusColor(sale.status))}>
                    {sale.status}
                  </motion.span>
                </div>
                <p className="text-sm font-bold text-foreground">KSh {sale.total.toFixed(2)}</p>
              </div>
            </motion.div>
          ))
          )}
        </div>
      </div>

      {/* Pagination */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="px-4 sm:px-6 py-4 border-t border-border bg-card flex flex-col sm:flex-row items-center justify-between gap-3"
      >
        <p className="text-sm text-muted-foreground">Showing 1 to 10 of {salesData.length} entries</p>
        <div className="flex items-center gap-1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </motion.button>
          {[1, 2, 3, "...", 25].map((page, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => typeof page === "number" && onPageChange(page)}
              className={cn(
                "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "border border-border hover:bg-muted text-foreground"
              )}
            >
              {page}
            </motion.button>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
