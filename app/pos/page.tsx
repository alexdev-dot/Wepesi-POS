"use client"

import { useState, useEffect } from "react"
import { ShoppingCart, X } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { CategoryDropdown } from "@/components/pos/category"
import { ProductGrid, KeyboardShortcuts } from "@/components/pos/products"
import { CartSidebar } from "@/components/pos/cart"
import { PaymentPopup } from "@/components/pos/payment-popup"
import { ReceiptPopup } from "@/components/pos/receipt-popup"
import { cn } from "@/lib/utils"

const categories = [
  { name: "All Products", count: 136 },
  { name: "Beverages", count: 18 },
  { name: "Snacks", count: 24 },
  { name: "Dairy", count: 16 },
  { name: "Bakery", count: 12 },
  { name: "Personal Care", count: 20 },
  { name: "Household", count: 18 },
  { name: "Electronics", count: 12 },
  { name: "Stationery", count: 8 },
  { name: "Maize Flour", count: 5},
  { name: "Others", count: 8 },
]

const products = [
  { id: 1, name: "Coca Cola 500ml", stock: 120, price: 120.00, image: "/products/Coca cola 500ml.jpg", category: "Beverages" },
  { id: 2, name: "Bread Loaf", stock: 85, price: 80.00, image: "/products/bread loaf.avif", category: "Bakery" },
  { id: 3, name: "Milk 1L", stock: 64, price: 120.00, image: "/products/Milk 1l.avif", category: "Dairy" },
  { id: 4, name: "Lays Chips 150g", stock: 95, price: 150.00, image: "/products/Lays crips.jpg", category: "Snacks" },
  { id: 5, name: "Dasani Water 500ml", stock: 200, price: 60.00, image: "/products/Dasani-water-500ML.jpg", category: "Beverages" },
  { id: 6, name: "Indomie Noodles", stock: 140, price: 70.00, image: "/products/indomie chicken noodles.avif", category: "Snacks" },
  { id: 7, name: "Colgate Toothpaste", stock: 48, price: 180.00, image: "/products/colgate toothpaste.avif", category: "Personal Care" },
  { id: 8, name: "Dettol Soap 175g", stock: 60, price: 90.00, image: "/products/dettol soap 170g.jpg", category: "Personal Care" },
  { id: 9, name: "A4 Copy Paper", stock: 40, price: 550.00, image: "/products/A4 copy paper.jpg", category: "Stationery" },
  { id: 10, name: "Blue Band 500g", stock: 30, price: 250.00, image: "/products/blue band 500g.jpg", category: "Dairy" },
  { id: 11, name: "White Sugar 1kg", stock: 111, price: 130.00, image: "/products/white sugar 1kg.avif", category: "Household" },
  { id: 12, name: "AA Battery 2 pcs", stock: 150, price: 100.00, image: "/products/AA battery 2 pcs.jpg", category: "Electronics" },
  { id: 13, name: "Zesta Red Plum Jam Eot 500g", stock:100, price: 186.75, image: "https://cfn.quickmart.co.ke/resized/230_230/product_images_450045.png?t=1788055275", category: "Dairy" },
  { id: 14, name: "Brava Orange 1.25l", stock: 40, price: 50.00, image: "https://cfn.quickmart.co.ke/resized/230_230/product_images_422038.png?t=1788128350", category: "Beverages" },
  { id: 15, name: "Ajab Maize Meal Flour", stock: 140, price: 160.00, image: "https://cdn.mafrservices.com/pim-content/KEN/media/product/134158/1742281203/134158_main.jpg?im=Resize=(300,300)", category: "Maize Flour" },
]

const keyboardShortcuts = [
  { key: "F1", action: "Search Product" },
  { key: "F2", action: "Customer" },
  { key: "F3", action: "Hold Sale" },
  { key: "F4", action: "Suspend Sale" },
  { key: "F5", action: "Discount" },
  { key: "F6", action: "Toggle Cart" },
  { key: "F9", action: "Pay" },
  { key: "Esc", action: "Clear Cart" },
]

export default function POSPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Products")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [cartCollapsed, setCartCollapsed] = useState(true)
  const [cartItems, setCartItems] = useState<any[]>([])
  const [discount, setDiscount] = useState(0)
  const [amountReceived, setAmountReceived] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  const [showPaymentPopup, setShowPaymentPopup] = useState(false)
  const [showReceiptPopup, setShowReceiptPopup] = useState(false)

  // Filter products based on selected category
  const filteredProducts = selectedCategory === "All Products"
    ? products
    : products.filter(product => product.category === selectedCategory)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen)
  }

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false)
  }

  const handleMenuClick = () => {
    if (isMobile) {
      toggleMobileSidebar()
    } else {
      setSidebarVisible(!sidebarVisible)
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.16
  const total = subtotal - discount + tax
  const change = amountReceived - total

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
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        currentPath="/pos"
        mobileOpen={mobileSidebarOpen || sidebarVisible}
        onMobileClose={() => {
          closeMobileSidebar()
          setSidebarVisible(false)
        }}
        hideByDefault={true}
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
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Point of Sale</h1>
                    <p className="text-sm text-slate-500 mt-1">Process sales and manage transactions</p>
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
                <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
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
            <div className="hidden lg:flex w-96 border-l border-slate-200 bg-white shrink-0 overflow-y-auto">
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
          <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setCartCollapsed(true)} />
        )}

        {/* Mobile Cart Sidebar */}
        <div className={`lg:hidden fixed right-0 top-0 h-full w-96 bg-white z-50 transition-transform duration-300 ${cartCollapsed === false ? 'translate-x-0' : 'translate-x-full'}`}>
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
