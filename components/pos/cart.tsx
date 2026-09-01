"use client"

import { ShoppingCart, Trash2, Plus, Minus, CreditCard, X, Banknote, Smartphone, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, memo } from "react"
import { motion } from "framer-motion"
import { OptimizedImage } from "@/components/ui/optimized-image"

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  total: number
  image: string | null
}

interface CartSidebarProps {
  cartItems: CartItem[]
  subtotal: number
  discount: number
  tax: number
  total: number
  amountReceived: number
  change: number
  paymentMethod: string
  phoneNumber: string
  collapsed: boolean
  onToggleCollapse: () => void
  onItemDelete: (id: number) => void
  onItemIncrement: (id: number) => void
  onItemDecrement: (id: number) => void
  onClearCart: () => void
  onAmountChange: (amount: number) => void
  onPaymentMethodChange: (method: string) => void
  onPhoneNumberChange: (phone: string) => void
  onPaymentClick?: () => void
}

export const CartSidebar = memo(function CartSidebar({
  cartItems,
  subtotal,
  discount,
  tax,
  total,
  amountReceived,
  change,
  paymentMethod,
  phoneNumber,
  collapsed,
  onToggleCollapse,
  onItemDelete,
  onItemIncrement,
  onItemDecrement,
  onClearCart,
  onAmountChange,
  onPaymentMethodChange,
  onPhoneNumberChange,
  onPaymentClick
}: CartSidebarProps) {
  const [paymentDropdownOpen, setPaymentDropdownOpen] = useState(false)

  const paymentMethods = [
    { value: 'cash', label: 'Cash', icon: '/icons/dollars.png' },
    { value: 'card', label: 'Card', icon: '/icons/atm-card.png' },
    { value: 'mpesa', label: 'M-Pesa', icon: '/icons/mpesa.png' },
  ]

  const selectedPayment = paymentMethods.find(m => m.value === paymentMethod) || paymentMethods[0]

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full"
    >
      {/* Header - Always Visible */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ duration: 0.2 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600 shadow-sm"
          >
            <ShoppingCart className="h-5 w-5" strokeWidth={2} />
          </motion.div>
          <div>
            <motion.h3 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-base font-semibold text-slate-900"
            >
              Shopping Cart
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="text-xs text-slate-500"
            >
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
            </motion.p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "#f1f5f9" }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleCollapse}
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-all"
          title={collapsed ? "Expand Cart" : "Collapse Cart"}
        >
          {collapsed ? (
            <ChevronDown className="h-5 w-5" />
          ) : (
            <ChevronUp className="h-5 w-5" />
          )}
        </motion.button>
      </motion.div>

      {/* Collapsed State - Show Receipt-like Summary */}
      {collapsed && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="p-4 sm:p-5 flex-1 flex flex-col"
        >
          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <ShoppingCart className="h-12 w-12 text-slate-300 mb-3" />
              <p className="text-sm font-medium text-slate-500">Your cart is empty</p>
              <p className="text-xs text-slate-400 mt-1">Add products to get started</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="space-y-3"
            >
              {/* Receipt-style Item List */}
              <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.25 + index * 0.05 }}
                    className="flex justify-between items-start text-sm"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 truncate">{item.name}</p>
                      <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-slate-900 ml-2">KSh {(item.price * item.quantity).toFixed(2)}</p>
                  </motion.div>
                ))}
              </div>

              {/* Summary Totals */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="space-y-2 pt-3 border-t border-slate-200"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-semibold text-slate-900">KSh {subtotal.toFixed(2)}</span>
                </div>
                {tax > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Tax (16%)</span>
                    <span className="font-semibold text-slate-900">KSh {tax.toFixed(2)}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Discount</span>
                    <span className="font-semibold text-orange-600">-KSh {discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                  <span className="text-base font-semibold text-slate-900">Total</span>
                  <span className="text-xl font-bold text-slate-900">KSh {total.toFixed(2)}</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Expanded State - Show Full Cart */}
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="p-4 sm:p-5 flex flex-col flex-1"
        >
          {/* Cart Items */}
          <div className="overflow-y-auto space-y-3 mb-4 custom-scrollbar" style={{ maxHeight: cartItems.length > 5 ? '300px' : 'auto' }}>
            {cartItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <ShoppingCart className="h-12 w-12 text-slate-300 mb-3" />
                <p className="text-sm font-medium text-slate-500">Your cart is empty</p>
                <p className="text-xs text-slate-400 mt-1">Add products to get started</p>
              </motion.div>
            ) : (
              cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                  whileHover={{ x: 2, backgroundColor: "#f8fafc" }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all cursor-pointer"
                >
                  {/* Product Image */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="h-12 w-12 shrink-0 rounded-md bg-white border border-slate-200 overflow-hidden flex items-center justify-center"
                  >
                    <OptimizedImage
                      src={item.image}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </motion.div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-slate-900 truncate">{item.name}</h4>
                    <p className="text-xs text-slate-500 font-medium">KSh {item.price.toFixed(2)}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-1">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onItemDecrement(item.id)}
                      className="h-7 w-7 flex items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all"
                    >
                      <Minus className="h-3 w-3" />
                    </motion.button>
                    <span className="text-sm font-semibold text-slate-900 w-8 text-center">{item.quantity}</span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onItemIncrement(item.id)}
                      className="h-7 w-7 flex items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all"
                    >
                      <Plus className="h-3 w-3" />
                    </motion.button>
                  </div>

                  {/* Remove Button */}
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onItemDelete(item.id)}
                    className="h-7 w-7 flex items-center justify-center rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </motion.button>
                </motion.div>
              ))
            )}
          </div>

          {/* Summary Section */}
          {cartItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="pt-4"
            >
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-semibold text-slate-900">KSh {subtotal.toFixed(2)}</span>
                </div>

                {tax > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Tax (16%)</span>
                    <span className="font-semibold text-slate-900">KSh {tax.toFixed(2)}</span>
                  </div>
                )}

                {discount > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Discount</span>
                    <span className="font-semibold text-orange-600">-KSh {discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                  <span className="text-base font-semibold text-slate-900">Total</span>
                  <span className="text-xl font-bold text-slate-900">KSh {total.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          )}

        </motion.div>
      )}

      {/* Action Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        className="mt-2 pt-4 border-t border-slate-200 mb-4"
      >
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={onPaymentClick}
            className="h-11 w-full text-sm font-semibold bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md transition-all"
            disabled={cartItems.length === 0}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Checkout
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
})
