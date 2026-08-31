"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CategoryForm } from "@/components/categories/category-form"
import { BrandForm } from "@/components/categories/brand-form"
import { FolderTree, Tag, Plus, Upload, Download, Filter, Search, Edit, Trash2, MoreVertical } from "lucide-react"

export default function CategoriesPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("categories")
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false)
  const [isBrandFormOpen, setIsBrandFormOpen] = useState(false)

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

  const handleAddCategory = (data: any) => {
    console.log("Add category:", data)
    // TODO: Implement add category logic
  }

  const handleAddBrand = (data: any) => {
    console.log("Add brand:", data)
    // TODO: Implement add brand logic
  }

  // Mock data for categories
  const categories = [
    { id: 1, name: "Beverages", description: "Soft drinks, juices, water", productCount: 45, status: "Active" },
    { id: 2, name: "Bakery", description: "Bread, cakes, pastries", productCount: 32, status: "Active" },
    { id: 3, name: "Dairy", description: "Milk, cheese, yogurt", productCount: 28, status: "Active" },
    { id: 4, name: "Snacks", description: "Chips, nuts, crackers", productCount: 56, status: "Active" },
    { id: 5, name: "Stationery", description: "Paper, pens, office supplies", productCount: 89, status: "Active" },
    { id: 6, name: "Personal Care", description: "Soap, toothpaste, cosmetics", productCount: 67, status: "Active" },
    { id: 7, name: "Electronics", description: "Phones, accessories", productCount: 23, status: "Inactive" },
    { id: 8, name: "Household", description: "Cleaning supplies, tools", productCount: 41, status: "Active" },
  ]

  // Mock data for brands
  const brands = [
    { id: 1, name: "Coca Cola", description: "Beverage company", productCount: 12, logo: "Coca Cola", status: "Active" },
    { id: 2, name: "BakeHouse", description: "Local bakery", productCount: 8, logo: "BakeHouse", status: "Active" },
    { id: 3, name: "Brookside", description: "Dairy products", productCount: 15, logo: "Brookside", status: "Active" },
    { id: 4, name: "Lays", description: "Snack foods", productCount: 9, logo: "Lays", status: "Active" },
    { id: 5, name: "Double A", description: "Paper products", productCount: 6, logo: "Double A", status: "Active" },
    { id: 6, name: "Colgate", description: "Personal care", productCount: 11, logo: "Colgate", status: "Active" },
    { id: 7, name: "Dettol", description: "Hygiene products", productCount: 7, logo: "Dettol", status: "Active" },
    { id: 8, name: "Samsung", description: "Electronics", productCount: 18, logo: "Samsung", status: "Inactive" },
  ]

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        currentPath="/categories" 
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
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600 shadow-sm">
                  <FolderTree className="h-5 w-5" strokeWidth={2} />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-semibold text-slate-900">Categories & Brands</h1>
                  <p className="text-sm text-slate-500 mt-0.5">Manage product categories and brands</p>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("categories")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === "categories"
                      ? "bg-purple-600 text-white shadow-sm"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-sm"
                  }`}
                >
                  <FolderTree className="h-4 w-4 inline mr-2" />
                  Categories
                </button>
                <button
                  onClick={() => setActiveTab("brands")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === "brands"
                      ? "bg-purple-600 text-white shadow-sm"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-sm"
                  }`}
                >
                  <Tag className="h-4 w-4 inline mr-2" />
                  Brands
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto px-4 sm:px-6 pb-6">
            <div className="max-w-7xl mx-auto">
              {/* Search and Filter Section */}
              <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm mb-4">
                <div className="flex flex-col gap-4">
                  {/* Search Bar */}
                  <div className="relative w-full">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      type="text"
                      placeholder={`Search ${activeTab}...`}
                      className="h-10 pl-9 sm:pl-10 text-sm border bg-slate-50 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                    />
                  </div>

                  {/* Filters and Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* Status Filter */}
                    <select className="h-10 px-3 sm:px-4 text-sm border rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all min-w-35">
                      <option>All Status</option>
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>

                    {/* Action Buttons */}
                    <div className="flex gap-2 sm:ml-auto">
                      <Button variant="outline" size="sm" className="h-10 text-sm border-slate-200 text-slate-700 hover:bg-slate-50 transition-all">
                        <Upload className="h-4 w-4 mr-2" />
                        Import
                      </Button>
                      <Button variant="outline" size="sm" className="h-10 text-sm border-slate-200 text-slate-700 hover:bg-slate-50 transition-all">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                      <Button 
                        className="h-10 bg-purple-600 hover:bg-purple-700 text-sm font-semibold shadow-sm hover:shadow-md transition-all"
                        onClick={() => activeTab === "categories" ? setIsCategoryFormOpen(true) : setIsBrandFormOpen(true)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add {activeTab === "categories" ? "Category" : "Brand"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        <input type="checkbox" className="rounded border-slate-300" />
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {activeTab === "categories" ? "Category Name" : "Brand Name"}
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Product Count
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(activeTab === "categories" ? categories : brands).map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 sm:px-6 py-4">
                          <input type="checkbox" className="rounded border-slate-300" />
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <span className="text-sm font-medium text-slate-900">{item.name}</span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-sm text-slate-600">{item.description}</td>
                        <td className="px-4 sm:px-6 py-4 text-sm text-slate-700">{item.productCount}</td>
                        <td className="px-4 sm:px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                            item.status === "Active"
                              ? "bg-green-100 text-green-700 border-green-200"
                              : "bg-slate-100 text-slate-700 border-slate-200"
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <div className="flex items-center gap-1">
                            <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                              <Trash2 className="h-4 w-4" />
                            </button>
                            <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Category Form Modal */}
      <CategoryForm
        isOpen={isCategoryFormOpen}
        onClose={() => setIsCategoryFormOpen(false)}
        onSubmit={handleAddCategory}
      />

      {/* Brand Form Modal */}
      <BrandForm
        isOpen={isBrandFormOpen}
        onClose={() => setIsBrandFormOpen(false)}
        onSubmit={handleAddBrand}
      />
    </div>
  )
}
