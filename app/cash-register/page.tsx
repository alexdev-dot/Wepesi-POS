"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Landmark, DollarSign, ArrowUpRight, ArrowDownRight, Plus, Download, Filter, Calendar, MoreVertical, TrendingUp, Wallet, Receipt, X } from "lucide-react"

export default function CashRegisterPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [isCashInOpen, setIsCashInOpen] = useState(false)
  const [isCashOutOpen, setIsCashOutOpen] = useState(false)

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

  const balanceStats = [
    { title: "Opening Balance", value: "KSh 50,000", change: "", icon: Wallet, color: "text-slate-600", bgColor: "bg-slate-100" },
    { title: "Total Sales", value: "KSh 125,000", change: "+15%", icon: TrendingUp, color: "text-green-600", bgColor: "bg-green-100", isPositive: true },
    { title: "Cash In", value: "KSh 20,000", change: "", icon: ArrowUpRight, color: "text-blue-600", bgColor: "bg-blue-100" },
    { title: "Cash Out", value: "KSh 15,000", change: "", icon: ArrowDownRight, color: "text-red-600", bgColor: "bg-red-100" },
    { title: "Current Balance", value: "KSh 180,000", change: "", icon: DollarSign, color: "text-purple-600", bgColor: "bg-purple-100" },
  ]

  const transactions = [
    { id: 1, type: "sale", description: "Sale #ORD-1234", amount: 12500, time: "10:30 AM", cashier: "Alex Kariuki" },
    { id: 2, type: "cash-in", description: "Cash Deposit", amount: 10000, time: "09:15 AM", cashier: "John Doe" },
    { id: 3, type: "sale", description: "Sale #ORD-1233", amount: 8900, time: "08:45 AM", cashier: "Alex Kariuki" },
    { id: 4, type: "cash-out", description: "Petty Cash Withdrawal", amount: 5000, time: "08:00 AM", cashier: "Manager" },
    { id: 5, type: "sale", description: "Sale #ORD-1232", amount: 15600, time: "07:30 AM", cashier: "Jane Smith" },
    { id: 6, type: "cash-in", description: "Cash Deposit", amount: 10000, time: "07:00 AM", cashier: "John Doe" },
  ]

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "sale":
        return <Receipt className="h-4 w-4 text-green-600" />
      case "cash-in":
        return <ArrowUpRight className="h-4 w-4 text-blue-600" />
      case "cash-out":
        return <ArrowDownRight className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "sale":
        return "text-green-600"
      case "cash-in":
        return "text-blue-600"
      case "cash-out":
        return "text-red-600"
      default:
        return "text-slate-600"
    }
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        currentPath="/cash-register" 
        mobileOpen={mobileSidebarOpen}
        onMobileClose={closeMobileSidebar}
      />
      <div className="flex flex-1 flex-col overflow-hidden font-sans">
        <Header onMenuClick={handleMenuClick} />
        <main className="flex-1 flex flex-col bg-muted/30 overflow-auto">
          {/* Page Header */}
          <div className="px-4 sm:px-6 py-4 sm:py-5">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600 shadow-sm">
                  <Landmark className="h-5 w-5" strokeWidth={2} />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">Cash Register</h1>
                  <p className="text-sm sm:text-base text-slate-500 mt-0.5">Manage cash flow and transactions</p>
                </div>
              </div>

              {/* Filters Section */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Date Range */}
                <div className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg bg-white shadow-sm">
                  <Calendar className="h-4 w-4 text-slate-500" />
                  <span className="text-sm sm:text-base text-slate-700">Today, 31 May 2025</span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 ml-auto">
                  <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg bg-white text-sm sm:text-base text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline">More Filters</span>
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg bg-white text-sm sm:text-base text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">Export</span>
                  </button>
                  <Button 
                    className="h-10 sm:h-11 bg-blue-600 hover:bg-blue-700 text-sm sm:text-base font-semibold shadow-sm hover:shadow-md transition-all"
                    onClick={() => setIsCashInOpen(true)}
                  >
                    <ArrowUpRight className="h-4 w-4 mr-2" />
                    Cash In
                  </Button>
                  <Button 
                    className="h-10 sm:h-11 bg-red-600 hover:bg-red-700 text-sm sm:text-base font-semibold shadow-sm hover:shadow-md transition-all"
                    onClick={() => setIsCashOutOpen(true)}
                  >
                    <ArrowDownRight className="h-4 w-4 mr-2" />
                    Cash Out
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto px-4 sm:px-6 pb-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Balance Stats */}
              <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-5">
                {balanceStats.map((stat) => (
                  <div key={stat.title} className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.bgColor} ${stat.color} shadow-sm`}>
                        <stat.icon className="h-5 w-5" strokeWidth={2} />
                      </div>
                      {stat.change && (
                        <div className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                          stat.isPositive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                        }`}>
                          <span>{stat.change}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-semibold text-slate-900">{stat.title}</h4>
                      <p className="mt-2 text-lg sm:text-xl font-bold text-slate-900">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Transaction History */}
              <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="px-4 sm:px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900">Transaction History</h3>
                  <span className="text-sm sm:text-base text-slate-500">6 transactions today</span>
                </div>
                
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-slate-500 uppercase">Type</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-slate-500 uppercase">Description</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-slate-500 uppercase">Amount</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-slate-500 uppercase">Time</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-slate-500 uppercase">Cashier</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-slate-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-center gap-2">
                              {getTransactionIcon(transaction.type)}
                              <span className="text-sm sm:text-base font-medium capitalize text-slate-700">{transaction.type.replace('-', ' ')}</span>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-sm sm:text-base text-slate-900">{transaction.description}</td>
                          <td className={`px-4 sm:px-6 py-4 text-sm sm:text-base font-semibold ${getTransactionColor(transaction.type)}`}>
                            {transaction.type === 'cash-out' ? '-' : '+'}KSh {transaction.amount.toLocaleString()}
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-sm sm:text-base text-slate-700">{transaction.time}</td>
                          <td className="px-4 sm:px-6 py-4 text-sm sm:text-base text-slate-700">{transaction.cashier}</td>
                          <td className="px-4 sm:px-6 py-4">
                            <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden px-4 sm:px-6 py-4 space-y-3">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="bg-white border rounded-xl p-4 shadow-sm">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 shrink-0">
                          {getTransactionIcon(transaction.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm sm:text-base font-semibold text-slate-900 capitalize">{transaction.type.replace('-', ' ')}</span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{transaction.description}</p>
                        </div>
                        <span className={`text-sm sm:text-base font-bold ${getTransactionColor(transaction.type)}`}>
                          {transaction.type === 'cash-out' ? '-' : '+'}KSh {transaction.amount.toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-600">
                        <div className="flex items-center gap-4">
                          <span>{transaction.time}</span>
                          <span>{transaction.cashier}</span>
                        </div>
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                  <Button variant="outline" className="h-12 border-slate-200 text-slate-700 hover:bg-slate-50">
                    <Receipt className="h-4 w-4 mr-2" />
                    Print Report
                  </Button>
                  <Button variant="outline" className="h-12 border-slate-200 text-slate-700 hover:bg-slate-50">
                    <Wallet className="h-4 w-4 mr-2" />
                    Count Cash
                  </Button>
                  <Button variant="outline" className="h-12 border-slate-200 text-slate-700 hover:bg-slate-50">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Reconcile
                  </Button>
                  <Button variant="outline" className="h-12 border-slate-200 text-slate-700 hover:bg-slate-50">
                    <Download className="h-4 w-4 mr-2" />
                    Export Summary
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Cash In Modal */}
      {isCashInOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsCashInOpen(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 shadow-sm">
                    <ArrowUpRight className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900">Cash In</h3>
                    <p className="text-xs sm:text-sm text-slate-500">Add cash to register</p>
                  </div>
                </div>
                <button onClick={() => setIsCashInOpen(false)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <X className="h-5 w-5 text-slate-400" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm sm:text-base font-medium text-slate-700 mb-1.5">Amount</label>
                  <Input type="number" placeholder="Enter amount" className="h-10 sm:h-11 px-3 text-sm sm:text-base border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" />
                </div>
                <div>
                  <label className="block text-sm sm:text-base font-medium text-slate-700 mb-1.5">Description</label>
                  <Input type="text" placeholder="e.g., Cash deposit" className="h-10 sm:h-11 px-3 text-sm sm:text-base border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setIsCashInOpen(false)} className="flex-1 h-10 sm:h-11 border-slate-200 text-slate-700 hover:bg-slate-50">Cancel</Button>
                  <Button className="flex-1 h-10 sm:h-11 bg-blue-600 hover:bg-blue-700 text-sm sm:text-base font-semibold shadow-sm hover:shadow-md transition-all">Add Cash</Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Cash Out Modal */}
      {isCashOutOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsCashOutOpen(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600 shadow-sm">
                    <ArrowDownRight className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900">Cash Out</h3>
                    <p className="text-xs sm:text-sm text-slate-500">Remove cash from register</p>
                  </div>
                </div>
                <button onClick={() => setIsCashOutOpen(false)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <X className="h-5 w-5 text-slate-400" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm sm:text-base font-medium text-slate-700 mb-1.5">Amount</label>
                  <Input type="number" placeholder="Enter amount" className="h-10 sm:h-11 px-3 text-sm sm:text-base border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all" />
                </div>
                <div>
                  <label className="block text-sm sm:text-base font-medium text-slate-700 mb-1.5">Description</label>
                  <Input type="text" placeholder="e.g., Petty cash withdrawal" className="h-10 sm:h-11 px-3 text-sm sm:text-base border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all" />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setIsCashOutOpen(false)} className="flex-1 h-10 sm:h-11 border-slate-200 text-slate-700 hover:bg-slate-50">Cancel</Button>
                  <Button className="flex-1 h-10 sm:h-11 bg-red-600 hover:bg-red-700 text-sm sm:text-base font-semibold shadow-sm hover:shadow-md transition-all">Remove Cash</Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
