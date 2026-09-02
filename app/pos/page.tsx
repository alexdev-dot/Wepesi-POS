"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { ShoppingCart, X } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { CategoryDropdown } from "@/components/pos/category"
import { ProductGrid, KeyboardShortcuts } from "@/components/pos/products"
import { CartSidebar } from "@/components/pos/cart"
import { PaymentPopup } from "@/components/pos/payment-popup"
import { ReceiptPopup } from "@/components/pos/receipt-popup"
import { cn } from "@/lib/utils"
import { categories, products, keyboardShortcuts } from "@/lib/pos-data"
import { useMobile } from "@/lib/hooks/use-mobile"

export default function POSPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Products")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [cartCollapsed, setCartCollapsed] = useState(true)
  const [cartItems, setCartItems] = useState<any[]>([])
  const [discount, setDiscount] = useState(0)
  const [amountReceived, setAmountReceived] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [phoneNumber, setPhoneNumber] = useState("")
  const isMobile = useMobile()
  const [showPaymentPopup, setShowPaymentPopup] = useState(false)
  const [showReceiptPopup, setShowReceiptPopup] = useState(false)

  // Filter products based on selected category
  const filteredProducts = useMemo(() => 
    selectedCategory === "All Products"
      ? products
      : products.filter(product => product.category === selectedCategory),
    [selectedCategory]
  )

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen)
  }

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false)
  }

  const handleMenuClick = () => {
    if (window.innerWidth < 1024) {
      toggleMobileSidebar()
    } else {
      toggleSidebar()
    }
  }

  const subtotal = useMemo(() => 
    cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0), 
    [cartItems]
  )
  const tax = useMemo(() => subtotal * 0.16, [subtotal])
  const total = useMemo(() => subtotal - discount + tax, [subtotal, discount, tax])
  const change = useMemo(() => amountReceived - total, [amountReceived, total])

  const handleAddToCart = (product: any) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
            : item
        )
      }
      return [...prevItems, { ...product, quantity: 1, total: product.price }]
    })
  }

  const handleItemIncrement = (id: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
          : item
      )
    )
  }

  const handleItemDecrement = (id: number) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1, total: (item.quantity - 1) * item.price }
        }
        return item
      })
    )
  }

  const handleItemDelete = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  const handleClearCart = () => {
    setCartItems([])
    setDiscount(0)
    setAmountReceived(0)
  }

  const handleCompletePayment = (paymentData: { amountReceived: number; paymentMethod: string; phoneNumber: string }) => {
    setAmountReceived(paymentData.amountReceived)
    setPaymentMethod(paymentData.paymentMethod)
    setPhoneNumber(paymentData.phoneNumber)
    setShowPaymentPopup(false)
    setShowReceiptPopup(true)
    // Here you would typically process the payment
    console.log("Payment completed:", paymentData)
  }

  return (
    <div className="flex h-screen bg-background font-sans">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        currentPath="/pos"
        mobileOpen={mobileSidebarOpen}
        onMobileClose={closeMobileSidebar}
      />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden font-sans">
        {/* Header */}
        <Header 
          onMenuClick={handleMenuClick} 
        />

        {/* Content Area */}
        <main className="flex-1 overflow-hidden">
          <div className="h-full flex">
            {/* Center: Product Grid */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto w-full custom-scrollbar">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Point of Sale</h1>
                    <p className="text-sm text-muted-foreground mt-1">Process sales and manage transactions</p>
                  </div>
                  <div className="w-64">
                    <CategoryDropdown
                      categories={categories}
                      selectedCategory={selectedCategory}
                      onSelectCategory={setSelectedCategory}
                    />
                  </div>
                </div>

                {/* Product Grid */}
                <div className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm">
                  <ProductGrid
                    products={filteredProducts}
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                    onAddToCart={handleAddToCart}
                    onClearCart={handleClearCart}
                  />
                </div>

                {/* Keyboard Shortcuts */}
                <KeyboardShortcuts shortcuts={keyboardShortcuts} />
              </div>
            </div>

            {/* Right: Sticky Cart Sidebar */}
            <div className="hidden lg:flex w-96 border-l border-border bg-card shrink-0 overflow-y-auto">
              <div className="p-4 sm:p-5 w-full">
                <h2 className="text-lg font-semibold text-foreground mb-4">Shopping Cart</h2>
                <CartSidebar
                  cartItems={cartItems}
                  subtotal={subtotal}
                  discount={discount}
                  tax={tax}
                  total={total}
                  amountReceived={amountReceived}
                  change={change}
                  paymentMethod={paymentMethod}
                  phoneNumber={phoneNumber}
                  collapsed={cartCollapsed}
                  onToggleCollapse={() => setCartCollapsed(!cartCollapsed)}
                  onItemDelete={handleItemDelete}
                  onItemIncrement={handleItemIncrement}
                  onItemDecrement={handleItemDecrement}
                  onClearCart={handleClearCart}
                  onAmountChange={setAmountReceived}
                  onPaymentMethodChange={setPaymentMethod}
                  onPhoneNumberChange={setPhoneNumber}
                  onPaymentClick={() => setShowPaymentPopup(true)}
                />
              </div>
            </div>
          </div>
        </main>

        {/* Mobile Cart Button */}
        <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-30">
          <button
            onClick={() => setCartCollapsed(false)}
            className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-4 shadow-lg hover:shadow-xl transition-all active:scale-95"
          >
            <div className="relative">
              <ShoppingCart className="h-6 w-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow-md">
                  {cartItems.length}
                </span>
              )}
            </div>
            <div className="text-left">
              <span className="text-base font-semibold block tracking-tight">Cart</span>
              <span className="text-sm font-medium opacity-90">KSh {total.toFixed(0)}</span>
            </div>
          </button>
        </div>

        {/* Mobile Cart Overlay */}
        {cartCollapsed === false && (
          <div className="lg:hidden fixed inset-0 bg-background/80 z-40" onClick={() => setCartCollapsed(true)} />
        )}

        {/* Mobile Cart Sidebar */}
        <div className={`lg:hidden fixed right-0 top-0 h-full w-full sm:w-96 bg-card z-50 transition-transform duration-300 ${cartCollapsed === false ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-4 sm:p-5 w-full">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Shopping Cart</h2>
            <CartSidebar
              cartItems={cartItems}
              subtotal={subtotal}
              discount={discount}
              tax={tax}
              total={total}
              amountReceived={amountReceived}
              change={change}
              paymentMethod={paymentMethod}
              phoneNumber={phoneNumber}
              collapsed={false}
              onToggleCollapse={() => setCartCollapsed(true)}
              onItemDelete={handleItemDelete}
              onItemIncrement={handleItemIncrement}
              onItemDecrement={handleItemDecrement}
              onClearCart={handleClearCart}
              onAmountChange={setAmountReceived}
              onPaymentMethodChange={setPaymentMethod}
              onPhoneNumberChange={setPhoneNumber}
              onPaymentClick={() => setShowPaymentPopup(true)}
            />
          </div>
        </div>
      </div>

      {/* Payment Popup */}
      <PaymentPopup
        isOpen={showPaymentPopup}
        onClose={() => setShowPaymentPopup(false)}
        total={total}
        onCompletePayment={handleCompletePayment}
      />

      {/* Receipt Popup */}
      <ReceiptPopup
        isOpen={showReceiptPopup}
        onClose={() => {
          setShowReceiptPopup(false)
          handleClearCart()
        }}
        cartItems={cartItems}
        subtotal={subtotal}
        discount={discount}
        tax={tax}
        total={total}
        amountReceived={amountReceived}
        change={change}
        paymentMethod={paymentMethod}
        phoneNumber={phoneNumber}
      />
    </div>
  )
}
