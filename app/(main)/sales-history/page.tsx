"use client"

import { useEffect, useMemo, useState } from "react"
import { Sidebar } from "@/components/core/layout/sidebar"
import { Header } from "@/components/core/layout/header"
import { SalesHistoryTable, Sale } from "@/components/domains/sales/sales-history-table"
import { SaleDetailsPane, SaleDetails, SaleItem } from "@/components/domains/sales/sale-details-pane"
import { X, Receipt, Download, Printer } from "lucide-react"
import { motion } from "framer-motion"
import { useMobile } from "@/lib/hooks/use-mobile"
import { getBusinessId } from "@/lib/supabase/database"

interface ApiSale {
  id: string
  receipt_number: string
  cashier: string
  customer: string
  subtotal: number
  discount: number
  tax: number
  total: number
  payment_method: string
  amount_paid: number
  change_amount: number
  status: string
  created_at: string
  sale_items: Array<{
    product_name: string
    quantity: number
    unit_price: number
    line_total: number
  }>
}

function formatPaymentMethod(method: string) {
  return method === "mpesa" ? "M-Pesa" : method.charAt(0).toUpperCase() + method.slice(1)
}

function mapSale(apiSale: ApiSale): { summary: Sale; details: SaleDetails } {
  const itemsList: SaleItem[] = (apiSale.sale_items || []).map((item) => ({
    name: item.product_name,
    qty: item.quantity,
    price: Number(item.unit_price),
    total: Number(item.line_total),
  }))
  const paymentMethod = formatPaymentMethod(apiSale.payment_method)
  const status = apiSale.status.charAt(0).toUpperCase() + apiSale.status.slice(1)
  const date = new Date(apiSale.created_at).toLocaleString("en-KE", {
    dateStyle: "medium",
    timeStyle: "short",
  })

  // Debug: log the sale data to check if UUID is present
  console.log('Mapping sale:', { id: apiSale.id, receipt_number: apiSale.receipt_number })

  return {
    summary: {
      id: apiSale.receipt_number,
      uuid: apiSale.id || '',
      date,
      customer: apiSale.customer,
      cashier: apiSale.cashier,
      items: itemsList.reduce((count, item) => count + item.qty, 0),
      total: Number(apiSale.total),
      paymentMethod,
      status,
    },
    details: {
      id: apiSale.receipt_number,
      date,
      cashier: apiSale.cashier,
      customer: apiSale.customer,
      itemsList,
      discount: Number(apiSale.discount),
      tax: Number(apiSale.tax),
      total: Number(apiSale.total),
      paymentMethod,
      amountPaid: Number(apiSale.amount_paid),
      change: Number(apiSale.change_amount),
    },
  }
}

export default function SalesHistoryPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [sales, setSales] = useState<Array<{ summary: Sale; details: SaleDetails }>>([])
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [cashier, setCashier] = useState("All Cashiers")
  const [paymentMethod, setPaymentMethod] = useState("All Payment Methods")
  const [status, setStatus] = useState("All Status")
  const [currentPage, setCurrentPage] = useState(1)
  const [mobileDetailsOpen, setMobileDetailsOpen] = useState(false)
  const [businessId, setBusinessId] = useState<string | null>(null)
  const isMobile = useMobile()
  const itemsPerPage = 10

  useEffect(() => {
    const loadTenantAndSales = async () => {
      const userId = localStorage.getItem('user_id')
      if (!userId) return

      try {
        // Fetch tenant data to get the actual business_id
        const tenantResponse = await fetch('/api/tenant', {
          headers: {
            'x-user-id': userId
          }
        })
        const tenantData = await tenantResponse.json()

        if (tenantResponse.ok && tenantData.tenant) {
          const actualBusinessId = tenantData.tenant.id
          setBusinessId(actualBusinessId)

          // Load sales for this business
          const salesResponse = await fetch(`/api/sales?businessId=${encodeURIComponent(actualBusinessId)}`)
          const salesResult = await salesResponse.json() as { sales?: ApiSale[] }
          if (salesResponse.ok && salesResult.sales) setSales(salesResult.sales.map(mapSale))
        } else {
          console.error('Failed to fetch tenant data:', tenantData.error)
        }
      } catch (err) {
        console.error('Failed to load tenant or sales:', err)
      }
    }

    void loadTenantAndSales()
  }, [])

  const cashiers = useMemo(() => ["All Cashiers", ...new Set(sales.map(({ summary }) => summary.cashier))], [sales])
  const filteredSales = useMemo(() => sales.filter(({ summary }) => {
    const query = searchQuery.toLowerCase()
    const matchesSearch = !query || [summary.id, summary.customer, summary.cashier].some((value) => value.toLowerCase().includes(query))
    const matchesCashier = cashier === "All Cashiers" || summary.cashier === cashier
    const matchesPayment = paymentMethod === "All Payment Methods" || summary.paymentMethod === paymentMethod
    const matchesStatus = status === "All Status" || summary.status === status
    return matchesSearch && matchesCashier && matchesPayment && matchesStatus
  }), [sales, searchQuery, cashier, paymentMethod, status])

  const totalPages = Math.max(1, Math.ceil(filteredSales.length / itemsPerPage))
  const visibleSales = filteredSales.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const totalRevenue = filteredSales.reduce((sum, { summary }) => sum + summary.total, 0)

  const selectSale = (sale: Sale) => {
    setSelectedSale(sale)
    setMobileDetailsOpen(true)
  }

  const handleDeleteSale = async (saleUuid: string, receiptNumber: string) => {
    if (!businessId) {
      alert('Unable to delete sale: Business ID not found. Please refresh the page and try again.')
      return
    }

    if (!saleUuid || saleUuid === 'undefined') {
      alert('Unable to delete sale: Missing sale ID. Please refresh the page and try again.')
      return
    }

    if (!confirm('Are you sure you want to delete this sale? This action cannot be undone.')) {
      return
    }

    try {
      const params = new URLSearchParams({
        businessId,
        saleId: saleUuid,
        receiptNumber
      })
      const response = await fetch(`/api/sales?${params.toString()}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        // Remove the deleted sale from the list
        setSales(prevSales => prevSales.filter(({ summary }) => summary.uuid !== saleUuid))
        // Clear selected sale if it was the deleted one
        if (selectedSale?.uuid === saleUuid) {
          setSelectedSale(null)
          setMobileDetailsOpen(false)
        }
      } else {
        const error = await response.json()
        console.error('Failed to delete sale:', error.error)
        alert(`Failed to delete sale: ${error.error}`)
      }
    } catch (err) {
      console.error('Failed to delete sale:', err)
      alert('Failed to delete sale. Please try again.')
    }
  }

  const selectedSaleDetails = sales.find(({ summary }) => summary.id === selectedSale?.id)?.details || null

  return (
    <div className="flex h-screen bg-background font-sans">
      <Sidebar collapsed={sidebarCollapsed} currentPath="/sales-history" mobileOpen={mobileSidebarOpen} onMobileClose={() => setMobileSidebarOpen(false)} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onMenuClick={() => isMobile ? setMobileSidebarOpen((open) => !open) : setSidebarCollapsed((collapsed) => !collapsed)} />
        <main className="flex-1 flex flex-col bg-muted/30 overflow-auto">
          <div className="px-4 sm:px-6 py-4 sm:py-5">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600"><Receipt className="h-5 w-5" /></div>
                <div>
                  <h1 className="text-lg sm:text-xl font-semibold text-foreground">Sales History</h1>
                  <p className="text-sm text-muted-foreground mt-0.5">View saved sales transactions</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select value={cashier} onChange={(event) => { setCashier(event.target.value); setCurrentPage(1) }} className="px-3 py-2 border border-border rounded-lg bg-card text-sm">
                  {cashiers.map((option) => <option key={option}>{option}</option>)}
                </select>
                <select value={paymentMethod} onChange={(event) => { setPaymentMethod(event.target.value); setCurrentPage(1) }} className="px-3 py-2 border border-border rounded-lg bg-card text-sm">
                  <option>All Payment Methods</option><option>Cash</option><option>M-Pesa</option><option>Card</option>
                </select>
                <select value={status} onChange={(event) => { setStatus(event.target.value); setCurrentPage(1) }} className="px-3 py-2 border border-border rounded-lg bg-card text-sm">
                  <option>All Status</option><option>Completed</option><option>Refunded</option><option>Voided</option>
                </select>
                <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{filteredSales.length} sales</span>
                  <span className="font-semibold text-foreground">KSh {totalRevenue.toFixed(2)}</span>
                  <button className="p-2 border border-border rounded-lg bg-card" title="Export sales"><Download className="h-4 w-4" /></button>
                  <button className="p-2 border border-border rounded-lg bg-card" title="Print sales"><Printer className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <SalesHistoryTable
              salesData={visibleSales.map(({ summary }) => summary)}
              selectedSale={selectedSale}
              onSaleSelect={selectSale}
              searchQuery={searchQuery}
              onSearchChange={(value) => { setSearchQuery(value); setCurrentPage(1) }}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              totalPages={totalPages}
              onDeleteSale={handleDeleteSale}
            />
          </div>
        </main>
      </div>

      {selectedSale && (
        <>
          <motion.div className="fixed inset-0 bg-black/50 z-40" onClick={() => { setSelectedSale(null); setMobileDetailsOpen(false) }} />
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} className="fixed inset-y-0 right-0 w-full sm:w-96 lg:w-112.5 bg-card z-50 overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-card border-b border-border px-4 py-3 flex items-center justify-between z-10">
              <h2 className="text-base font-semibold text-foreground">Sale Details</h2>
              <button onClick={() => { setSelectedSale(null); setMobileDetailsOpen(false) }} className="p-2 hover:bg-muted rounded-lg"><X className="h-5 w-5 text-muted-foreground" /></button>
            </div>
            <SaleDetailsPane selectedSale={selectedSaleDetails} onClose={() => { setSelectedSale(null); setMobileDetailsOpen(false) }} />
          </motion.div>
        </>
      )}
    </div>
  )
}
