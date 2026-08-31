"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { SalesHistoryTable, Sale } from "@/components/sales-history/sales-history-table"
import { SaleDetailsPane, SaleDetails } from "@/components/sales-history/sale-details-pane"
import { X, Receipt, Calendar, Filter, Download, Printer } from "lucide-react"
import { motion } from "framer-motion"

// Mock data for sales
const salesData: Sale[] = [
  {
    id: "INV-000129",
    date: "2025-05-15 14:32",
    customer: "John Doe",
    cashier: "Alex Kariuki",
    items: 5,
    total: 1250.00,
    paymentMethod: "Cash",
    status: "Completed"
  },
  {
    id: "INV-000128",
    date: "2025-05-15 13:45",
    customer: "Jane Smith",
    cashier: "Alex Kariuki",
    items: 3,
    total: 850.00,
    paymentMethod: "M-Pesa",
    status: "Completed"
  },
  {
    id: "INV-000127",
    date: "2025-05-15 12:20",
    customer: "Mike Johnson",
    cashier: "Alex Kariuki",
    items: 2,
    total: 450.00,
    paymentMethod: "Card",
    status: "Refunded"
  },
  {
    id: "INV-000126",
    date: "2025-05-15 11:15",
    customer: "Sarah Williams",
    cashier: "Alex Kariuki",
    items: 4,
    total: 1800.00,
    paymentMethod: "Cash",
    status: "Completed"
  },
  {
    id: "INV-000125",
    date: "2025-05-15 10:30",
    customer: "David Brown",
    cashier: "Alex Kariuki",
    items: 1,
    total: 100.00,
    paymentMethod: "M-Pesa",
    status: "Voided"
  },
  {
    id: "INV-000124",
    date: "2025-05-14 16:45",
    customer: "Emily Davis",
    cashier: "Alex Kariuki",
    items: 6,
    total: 2100.00,
    paymentMethod: "Card",
    status: "Completed"
  },
  {
    id: "INV-000123",
    date: "2025-05-14 15:20",
    customer: "Robert Wilson",
    cashier: "Alex Kariuki",
    items: 2,
    total: 700.00,
    paymentMethod: "Cash",
    status: "Completed"
  },
  {
    id: "INV-000122",
    date: "2025-05-14 14:10",
    customer: "Lisa Anderson",
    cashier: "Alex Kariuki",
    items: 3,
    total: 950.00,
    paymentMethod: "M-Pesa",
    status: "Completed"
  },
  {
    id: "INV-000121",
    date: "2025-05-14 13:00",
    customer: "James Taylor",
    cashier: "Alex Kariuki",
    items: 4,
    total: 1600.00,
    paymentMethod: "Card",
    status: "Completed"
  },
  {
    id: "INV-000120",
    date: "2025-05-14 11:45",
    customer: "Patricia Moore",
    cashier: "Alex Kariuki",
    items: 2,
    total: 450.00,
    paymentMethod: "Cash",
    status: "Completed"
  }
]

// Mock data for sale details
const saleDetailsData: Record<string, SaleDetails> = {
  "INV-000129": {
    id: "INV-000129",
    date: "2025-05-15 14:32",
    cashier: "Alex Kariuki",
    customer: "John Doe",
    itemsList: [
      { name: "Coca cola 500ml", qty: 2, price: 100, total: 200 },
      { name: "AA battery 2 pcs", qty: 1, price: 350, total: 350 },
      { name: "A4 copy paper", qty: 2, price: 350, total: 700 }
    ],
    discount: 0,
    tax: 100,
    total: 1250.00,
    paymentMethod: "Cash",
    amountPaid: 1500,
    change: 250
  },
  "INV-000128": {
    id: "INV-000128",
    date: "2025-05-15 13:45",
    cashier: "Alex Kariuki",
    customer: "Jane Smith",
    itemsList: [
      { name: "AA battery 2 pcs", qty: 1, price: 350, total: 350 },
      { name: "A4 copy paper", qty: 1, price: 500, total: 500 }
    ],
    discount: 0,
    tax: 50,
    total: 850.00,
    paymentMethod: "M-Pesa",
    amountPaid: 850,
    change: 0
  },
  "INV-000127": {
    id: "INV-000127",
    date: "2025-05-15 12:20",
    cashier: "Alex Kariuki",
    customer: "Mike Johnson",
    itemsList: [
      { name: "Coca cola 500ml", qty: 3, price: 100, total: 300 },
      { name: "AA battery 2 pcs", qty: 1, price: 150, total: 150 }
    ],
    discount: 0,
    tax: 30,
    total: 450.00,
    paymentMethod: "Card",
    amountPaid: 450,
    change: 0
  },
  "INV-000126": {
    id: "INV-000126",
    date: "2025-05-15 11:15",
    cashier: "Alex Kariuki",
    customer: "Sarah Williams",
    itemsList: [
      { name: "A4 copy paper", qty: 3, price: 500, total: 1500 },
      { name: "AA battery 2 pcs", qty: 2, price: 150, total: 300 }
    ],
    discount: 50,
    tax: 120,
    total: 1800.00,
    paymentMethod: "Cash",
    amountPaid: 2000,
    change: 200
  },
  "INV-000125": {
    id: "INV-000125",
    date: "2025-05-15 10:30",
    cashier: "Alex Kariuki",
    customer: "David Brown",
    itemsList: [
      { name: "Coca cola 500ml", qty: 1, price: 100, total: 100 }
    ],
    discount: 0,
    tax: 10,
    total: 100.00,
    paymentMethod: "M-Pesa",
    amountPaid: 100,
    change: 0
  },
  "INV-000124": {
    id: "INV-000124",
    date: "2025-05-14 16:45",
    cashier: "Alex Kariuki",
    customer: "Emily Davis",
    itemsList: [
      { name: "A4 copy paper", qty: 4, price: 500, total: 2000 },
      { name: "Coca cola 500ml", qty: 1, price: 100, total: 100 }
    ],
    discount: 100,
    tax: 150,
    total: 2100.00,
    paymentMethod: "Card",
    amountPaid: 2100,
    change: 0
  },
  "INV-000123": {
    id: "INV-000123",
    date: "2025-05-14 15:20",
    cashier: "Alex Kariuki",
    customer: "Robert Wilson",
    itemsList: [
      { name: "AA battery 2 pcs", qty: 2, price: 350, total: 700 }
    ],
    discount: 0,
    tax: 50,
    total: 700.00,
    paymentMethod: "Cash",
    amountPaid: 700,
    change: 0
  },
  "INV-000122": {
    id: "INV-000122",
    date: "2025-05-14 14:10",
    cashier: "Alex Kariuki",
    customer: "Lisa Anderson",
    itemsList: [
      { name: "A4 copy paper", qty: 1, price: 500, total: 500 },
      { name: "Coca cola 500ml", qty: 4, price: 100, total: 400 },
      { name: "AA battery 2 pcs", qty: 1, price: 50, total: 50 }
    ],
    discount: 25,
    tax: 70,
    total: 950.00,
    paymentMethod: "M-Pesa",
    amountPaid: 950,
    change: 0
  },
  "INV-000121": {
    id: "INV-000121",
    date: "2025-05-14 13:00",
    cashier: "Alex Kariuki",
    customer: "James Taylor",
    itemsList: [
      { name: "A4 copy paper", qty: 3, price: 500, total: 1500 },
      { name: "Coca cola 500ml", qty: 1, price: 100, total: 100 }
    ],
    discount: 0,
    tax: 110,
    total: 1600.00,
    paymentMethod: "Card",
    amountPaid: 1600,
    change: 0
  },
  "INV-000120": {
    id: "INV-000120",
    date: "2025-05-14 11:45",
    cashier: "Alex Kariuki",
    customer: "Patricia Moore",
    itemsList: [
      { name: "AA battery 2 pcs", qty: 1, price: 350, total: 350 },
      { name: "Coca cola 500ml", qty: 1, price: 100, total: 100 }
    ],
    discount: 0,
    tax: 30,
    total: 450.00,
    paymentMethod: "Cash",
    amountPaid: 500,
    change: 50
  }
}

export default function SalesHistoryPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null)
  const [dateRange, setDateRange] = useState("01 May 2025 - 31 May 2025")
  const [cashier, setCashier] = useState("All Cashiers")
  const [paymentMethod, setPaymentMethod] = useState("All Payment Methods")
  const [status, setStatus] = useState("All Status")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [mobileDetailsOpen, setMobileDetailsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const itemsPerPage = 10

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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
    if (isMobile) {
      toggleMobileSidebar()
    } else {
      toggleSidebar()
    }
  }

  const handleSaleSelect = (sale: Sale) => {
    setSelectedSale(sale)
    setMobileDetailsOpen(true)
  }

  const handleCloseDetails = () => {
    setSelectedSale(null)
    setMobileDetailsOpen(false)
  }

  const selectedSaleDetails = selectedSale ? saleDetailsData[selectedSale.id] : null

  const totalPages = Math.ceil(salesData.length / itemsPerPage)

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <Sidebar
        collapsed={sidebarCollapsed}
        currentPath="/sales-history"
        mobileOpen={mobileSidebarOpen}
        onMobileClose={closeMobileSidebar}
      />
      <div className="flex flex-1 flex-col overflow-hidden font-sans">
        <Header onMenuClick={handleMenuClick} />
        <main className="flex-1 flex flex-col bg-muted/30 overflow-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="px-4 sm:px-6 py-4 sm:py-5"
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600 shadow-sm"
                >
                  <Receipt className="h-5 w-5" strokeWidth={2} />
                </motion.div>
                <div>
                  <motion.h1 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="text-lg sm:text-xl font-semibold text-slate-900"
                  >
                    Sales History
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                    className="text-sm text-slate-500 mt-0.5"
                  >
                    View and manage all sales transactions
                  </motion.p>
                </div>
              </div>

              {/* Filters Section */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                {/* Date Range */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg bg-white shadow-sm"
                >
                  <Calendar className="h-4 w-4 text-slate-500" />
                  <span className="text-sm text-slate-700">{dateRange}</span>
                </motion.div>

                {/* Filter Dropdowns Row */}
                <div className="flex flex-wrap gap-2">
                  {/* Cashier Dropdown */}
                  <motion.select
                    whileHover={{ scale: 1.01 }}
                    value={cashier}
                    onChange={(e) => setCashier(e.target.value)}
                    className="px-3 py-2 border border-slate-200 rounded-lg bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
                  >
                    <option>All Cashiers</option>
                    <option>Alex Kariuki</option>
                    <option>John Doe</option>
                  </motion.select>

                  {/* Payment Method Dropdown */}
                  <motion.select
                    whileHover={{ scale: 1.01 }}
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="px-3 py-2 border border-slate-200 rounded-lg bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
                  >
                    <option>All Payment Methods</option>
                    <option>Cash</option>
                    <option>M-Pesa</option>
                    <option>Card</option>
                  </motion.select>

                  {/* Status Dropdown */}
                  <motion.select
                    whileHover={{ scale: 1.01 }}
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="px-3 py-2 border border-slate-200 rounded-lg bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
                  >
                    <option>All Status</option>
                    <option>Completed</option>
                    <option>Refunded</option>
                    <option>Voided</option>
                  </motion.select>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 ml-auto">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg bg-white text-sm text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
                  >
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline">More Filters</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg bg-white text-sm text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
                  >
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">Export</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg bg-white text-sm text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
                  >
                    <Printer className="h-4 w-4" />
                    <span className="hidden sm:inline">Print</span>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            <SalesHistoryTable
              salesData={salesData}
              selectedSale={selectedSale}
              onSaleSelect={handleSaleSelect}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              totalPages={totalPages}
            />
          </div>
        </main>
      </div>

      {/* Floating Details Overlay */}
      {selectedSale && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={handleCloseDetails}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-y-0 right-0 w-full sm:w-96 lg:w-112.5 bg-white z-50 overflow-y-auto shadow-2xl"
          >
            <div className="sticky top-0 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between z-10">
              <h2 className="text-base font-semibold text-slate-900">Sale Details</h2>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCloseDetails}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-slate-500" />
              </motion.button>
            </div>
            <SaleDetailsPane
              selectedSale={selectedSaleDetails}
              onClose={handleCloseDetails}
            />
          </motion.div>
        </>
      )}
    </div>
  )
}
