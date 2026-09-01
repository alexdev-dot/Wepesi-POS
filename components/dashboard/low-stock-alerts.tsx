"use client"

import Image from "next/image"
import { AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"

const lowStockItems = [
  { name: "Blue Band 500g", sku: "BB-500", stock: 30, minStock: 50, image: "/products/blue band 500g.jpg" },
  { name: "A4 Copy Paper", sku: "A4-PAPER", stock: 40, minStock: 60, image: "/products/A4 copy paper.jpg" },
  { name: "Colgate Toothpaste", sku: "CG-TP", stock: 48, minStock: 70, image: "/products/colgate toothpaste.avif" },
  { name: "Dettol Soap 175g", sku: "DT-175", stock: 60, minStock: 80, image: "/products/dettol soap 170g.jpg" },
]

export function LowStockAlertsSkeleton() {
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
      <div className="space-y-2 flex-1">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex items-center gap-3 rounded-lg p-2">
            <div className="h-10 w-10 rounded-lg bg-muted/70 animate-pulse shrink-0" />
            <div className="flex-1">
              <div className="h-3 bg-muted/70 rounded w-3/4 mb-1 animate-pulse" />
              <div className="h-3 bg-muted/70 rounded w-1/3 animate-pulse" />
            </div>
            <div className="text-right shrink-0">
              <div className="h-3 bg-muted/70 rounded w-8 mb-1 animate-pulse" />
              <div className="h-3 bg-muted/70 rounded w-12 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function LowStockAlerts() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.65, ease: "easeOut" }}
      whileHover={{ y: -2 }}
      className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 h-full flex flex-col font-sans"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          whileHover={{ rotate: 5, scale: 1.1 }}
          transition={{ duration: 0.2 }}
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-600 shadow-sm"
        >
          <AlertTriangle className="h-5 w-5" strokeWidth={2} />
        </motion.div>
        <div className="flex-1">
          <motion.h3 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.75 }}
            className="text-base font-semibold text-slate-900"
          >
            Low Stock Alerts
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            className="text-xs text-slate-500"
          >
            Items needing restock
          </motion.p>
        </div>
        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.85 }}
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
        transition={{ duration: 0.3, delay: 0.9 }}
        className="space-y-2 flex-1 overflow-y-auto max-h-64"
      >
        {lowStockItems.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.95 + index * 0.05 }}
            whileHover={{ x: 4, backgroundColor: "#f8fafc" }}
            className="flex items-center gap-2 sm:gap-3 rounded-lg p-2 sm:p-2.5 transition-colors cursor-pointer"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-lg bg-slate-100 overflow-hidden"
            >
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-slate-400 text-xs">No img</div>
              )}
            </motion.div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-900 truncate">{item.name}</p>
              <p className="text-xs text-slate-500 truncate">SKU: {item.sku}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs font-semibold text-slate-900">{item.stock}</p>
              <motion.p
                whileHover={{ scale: 1.05 }}
                className="text-xs text-red-600 font-medium"
              >
                Low
              </motion.p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
