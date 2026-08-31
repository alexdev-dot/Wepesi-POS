"use client"

import Image from "next/image"
import { TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

const topProducts = [
  { name: "Coca Cola 500ml", sold: 128, revenue: "KSh 4,096.00", image: "/products/Coca cola 500ml.jpg" },
  { name: "Bread Loaf", sold: 96, revenue: "KSh 2,880.00", image: "/products/bread loaf.avif" },
  { name: "Milk 1L", sold: 84, revenue: "KSh 2,520.00", image: "/products/Milk 1l.avif" },
  { name: "A4 Copy Paper", sold: 72, revenue: "KSh 2,160.00", image: "/products/A4 copy paper.jpg" },
  { name: "Indomie Noodles", sold: 64, revenue: "KSh 1,920.00", image: "/products/indomie chicken noodles.avif" },
]

export function TopProducts() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
      whileHover={{ y: -2 }}
      className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 h-full flex flex-col font-sans"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          whileHover={{ rotate: 5, scale: 1.1 }}
          transition={{ duration: 0.2 }}
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600 shadow-sm"
        >
          <TrendingUp className="h-5 w-5" strokeWidth={2} />
        </motion.div>
        <div className="flex-1">
          <motion.h3 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.7 }}
            className="text-base font-semibold text-slate-900"
          >
            Top Selling Products
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.75 }}
            className="text-xs text-slate-500"
          >
            Best performers
          </motion.p>
        </div>
        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
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
        transition={{ duration: 0.3, delay: 0.85 }}
        className="flex-1 overflow-hidden"
      >
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="pb-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Product</th>
              <th className="pb-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Sold</th>
              <th className="pb-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((product, index) => (
              <motion.tr
                key={product.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.9 + index * 0.05 }}
                whileHover={{ x: 4, backgroundColor: "#f8fafc" }}
                className="border-b border-slate-100 transition-colors cursor-pointer"
              >
                <td className="py-3 text-xs font-medium text-slate-900">
                  <div className="flex items-start gap-3">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="h-10 w-10 shrink-0 rounded-lg bg-slate-100 overflow-hidden"
                    >
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-slate-400 text-xs">No img</div>
                      )}
                    </motion.div>
                    <span className="whitespace-normal">{product.name}</span>
                  </div>
                </td>
                <td className="py-3 text-xs text-slate-700">{product.sold}</td>
                <td className="py-3 text-xs font-semibold text-slate-900">{product.revenue}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  )
}
