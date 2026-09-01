import { useState, memo } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Grid, List, Plus, X, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { OptimizedImage } from "@/components/ui/optimized-image"

// KeyboardShortcuts Component
interface KeyboardShortcut {
  key: string
  action: string
}

interface KeyboardShortcutsProps {
  shortcuts: KeyboardShortcut[]
}

export function KeyboardShortcuts({ shortcuts }: KeyboardShortcutsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center gap-4 border-t border-border bg-card px-4 py-3 overflow-x-auto"
    >
      {shortcuts.map((shortcut, index) => (
        <motion.div
          key={shortcut.key}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="flex items-center gap-2 text-xs text-muted-foreground font-medium shrink-0"
        >
          <motion.kbd
            whileHover={{ scale: 1.05 }}
            className="flex h-6 select-none items-center justify-center rounded-md border border-border bg-muted px-2 font-mono text-xs font-semibold text-card-foreground"
          >
            {shortcut.key}
          </motion.kbd>
          <span className="hidden sm:inline">{shortcut.action}</span>
        </motion.div>
      ))}
    </motion.div>
  )
}

// ProductCardSkeleton Component
export function ProductCardSkeleton() {
  return (
    <div className="rounded-lg bg-card border border-border p-4">
      <div className="aspect-square rounded-md bg-muted/70 mb-3 animate-pulse" />
      <div className="h-5 bg-muted/70 rounded mb-2 w-3/4 animate-pulse" />
      <div className="h-4 bg-muted/70 rounded mb-2 w-1/2 animate-pulse" />
      <div className="h-5 bg-muted/70 rounded w-1/3 animate-pulse" />
    </div>
  )
}

// ProductListItemSkeleton Component
export function ProductListItemSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-card border border-border p-3">
      <div className="h-14 w-14 shrink-0 rounded-md bg-muted/70 animate-pulse" />
      <div className="flex-1 min-w-0">
        <div className="h-4 bg-muted/70 rounded mb-2 w-3/4 animate-pulse" />
        <div className="h-3 bg-muted/70 rounded mb-2 w-1/2 animate-pulse" />
        <div className="flex items-center justify-between">
          <div className="h-4 bg-muted/70 rounded w-1/3 animate-pulse" />
          <div className="h-8 w-8 bg-muted/70 rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}

// ProductCard Component
interface ProductCardProps {
  id: number
  name: string
  stock: number
  price: number
  image: string | null
  onAdd?: () => void
}

export const ProductCard = memo(function ProductCard({ id, name, stock, price, image, onAdd }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="group rounded-lg bg-card border border-border p-4 hover:border-primary/50 hover:shadow-md cursor-pointer transition-all duration-150 relative overflow-hidden"
      onClick={onAdd}
    >
      {/* Hover overlay with + icon */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-black/20 flex items-center justify-center z-10 transition-opacity duration-200"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          className="bg-white rounded-full p-3 shadow-lg"
        >
          <Plus className="h-6 w-6 text-slate-900" strokeWidth={2.5} />
        </motion.div>
      </motion.div>

      <div className="aspect-square rounded-md bg-muted/50 mb-3 overflow-hidden flex items-center justify-center">
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }} className="h-full w-full">
          <OptimizedImage
            src={image}
            alt={name}
            width={160}
            height={160}
            priority={id === 1}
            className="h-full w-full object-cover transition-transform duration-150"
          />
        </motion.div>
      </div>
      <h4 className="text-base font-semibold text-card-foreground mb-1 line-clamp-2 leading-tight tracking-tight">{name}</h4>
      <p className="text-sm text-muted-foreground mb-2 font-medium">Stock: {stock}</p>
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold text-card-foreground tracking-tight">KSh {price.toFixed(2)}</span>
      </div>
    </motion.div>
  )
})

// ProductListItem Component
export const ProductListItem = memo(function ProductListItem({ id, name, stock, price, image, onAdd }: ProductCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4, backgroundColor: "#f8fafc" }}
      whileTap={{ scale: 0.98 }}
      className="group flex items-center gap-3 rounded-lg bg-card border border-border p-3 hover:border-primary/50 hover:shadow-sm cursor-pointer transition-all duration-150"
      onClick={onAdd}
    >
      <motion.div whileHover={{ scale: 1.05 }} className="h-14 w-14 shrink-0 rounded-md bg-muted/50 overflow-hidden flex items-center justify-center">
        <OptimizedImage
          src={image}
          alt={name}
          width={64}
          height={64}
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-card-foreground mb-1 line-clamp-2 leading-tight tracking-tight">{name}</h4>
        <p className="text-xs text-muted-foreground mb-2 font-medium">Stock: {stock}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-card-foreground tracking-tight">KSh {price.toFixed(2)}</span>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button 
              size="sm" 
              variant="default" 
              className="h-8 w-8 p-0 text-xs font-medium" 
              onClick={(e) => {
                e.stopPropagation()
                onAdd?.()
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
})

// TopActionBar Component
interface TopActionBarProps {
  onAddCustomer?: () => void
  onSuspendSale?: () => void
  onHoldSale?: () => void
  onClearCart?: () => void
}

export function TopActionBar({ onAddCustomer, onSuspendSale, onHoldSale, onClearCart }: TopActionBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between border-b border-border bg-card px-4 py-3 sticky top-0 z-10"
    >
      <div className="flex items-center gap-3">
        <motion.div
          whileHover={{ scale: 1.02, borderColor: "rgba(59, 130, 246, 0.3)" }}
          className="hidden sm:flex items-center gap-2 rounded-md border border-border bg-muted/50 px-4 py-2.5 transition-colors cursor-pointer"
        >
          <span className="text-sm font-medium text-card-foreground tracking-tight">Walk-in Customer</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button variant="outline" size="sm" className="h-9 text-xs font-medium" onClick={onAddCustomer}>
            <Plus className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Add Customer</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </motion.div>
      </div>
      <div className="flex items-center gap-2">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button variant="outline" size="sm" className="h-9 text-xs font-medium hidden sm:block" onClick={onSuspendSale}>
            Suspend Sale
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button variant="outline" size="sm" className="h-9 text-xs font-medium hidden sm:block" onClick={onHoldSale}>
            Hold Sale
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button variant="destructive" size="sm" className="h-9 text-xs font-medium" onClick={onClearCart}>
            <X className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Clear Cart</span>
            <span className="sm:hidden">Clear</span>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}

// ProductGrid Component
interface Product {
  id: number
  name: string
  stock: number
  price: number
  image: string | null
}

interface ProductGridProps {
  products: Product[]
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
  onAddToCart?: (product: Product) => void
  onClearCart?: () => void
  loading?: boolean
  itemsPerPage?: number
  onPageChange?: (page: number) => void
  onItemsPerPageChange?: (items: number) => void
}

export function ProductGrid({ products, viewMode, onViewModeChange, onAddToCart, onClearCart, loading = false, itemsPerPage = 12, onPageChange, onItemsPerPageChange }: ProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [localItemsPerPage, setLocalItemsPerPage] = useState(itemsPerPage)

  const totalPages = Math.ceil(products.length / localItemsPerPage)
  const startIndex = (currentPage - 1) * localItemsPerPage
  const endIndex = startIndex + localItemsPerPage
  const paginatedProducts = products.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    onPageChange?.(page)
  }

  const handleItemsPerPageChange = (items: number) => {
    setLocalItemsPerPage(items)
    setCurrentPage(1)
    onItemsPerPageChange?.(items)
  }

  const itemsPerPageOptions = [6, 12, 24, 48, 96]

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Top Action Bar */}
      <TopActionBar onClearCart={onClearCart} />

      {/* Search and Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex items-center justify-between border-b border-border bg-card px-4 py-3 shrink-0"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products..."
            className="h-10 w-full rounded-md border bg-muted/50 pl-10 text-sm font-medium"
          />
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onViewModeChange("grid")}
            className={`rounded-md p-2.5 transition-all ${
              viewMode === "grid" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:bg-muted hover:text-card-foreground"
            }`}
          >
            <Grid className="h-5 w-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onViewModeChange("list")}
            className={`rounded-md p-2.5 transition-all ${
              viewMode === "list" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:bg-muted hover:text-card-foreground"
            }`}
          >
            <List className="h-5 w-5" />
          </motion.button>
          <div className="relative">
            <select
              value={localItemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="h-10 pl-3 pr-8 rounded-md border bg-muted/50 text-sm font-medium text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
            >
              {itemsPerPageOptions.map((option) => (
                <option key={option} value={option}>{option}/page</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </motion.div>

      {/* Products */}
      <div className="flex-1 p-4">
        {loading ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.from({ length: 12 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductListItemSkeleton key={index} />
              ))}
            </div>
          )
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {paginatedProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                {...product}
                onAdd={() => onAddToCart?.(product)}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {paginatedProducts.map((product, index) => (
              <ProductListItem
                key={product.id}
                {...product}
                onAdd={() => onAddToCart?.(product)}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {products.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="flex items-center justify-between mt-6 pt-4 border-t border-border shrink-0"
          >
            <p className="text-xs text-muted-foreground font-medium">
              Showing {startIndex + 1}-{Math.min(endIndex, products.length)} of {products.length} products
            </p>
            <div className="flex items-center gap-2">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-9 text-xs font-medium" 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
              </motion.div>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      className="h-9 w-9 text-xs font-medium p-0"
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  )
                })}
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-9 text-xs font-medium" 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
