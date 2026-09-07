import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServiceRoleClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const businessId = searchParams.get('businessId')
    const userId = request.headers.get('x-user-id')

    const supabase = getSupabaseServiceRoleClient()
    if (!supabase) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 })
    }

    // If businessId is provided, use it directly
    // Otherwise, fetch tenant data to find business_id
    let actualBusinessId = businessId
    if (!actualBusinessId) {
      if (!userId) {
        return NextResponse.json({ error: 'User ID is required when businessId is not provided' }, { status: 401 })
      }

      const { data: tenant } = await supabase
        .from('tenants')
        .select('id')
        .eq('user_id', userId)
        .single()

      if (!tenant) {
        return NextResponse.json({ error: 'Tenant not found' }, { status: 404 })
      }

      actualBusinessId = tenant.id
    }

    // If no type specified, fetch all data
    if (!type) {
      if (!actualBusinessId) {
        return NextResponse.json({ error: 'Business ID is required' }, { status: 400 })
      }

      const [stats, salesChart, paymentMethods, topProducts, transactions, lowStock, businessStats] = await Promise.all([
        getStatsData(supabase, actualBusinessId),
        getSalesChartData(supabase, actualBusinessId),
        getPaymentMethodsData(supabase, actualBusinessId),
        getTopProductsData(supabase, actualBusinessId),
        getTransactionsData(supabase, actualBusinessId),
        getLowStockData(supabase, actualBusinessId),
        getBusinessStatsData(supabase, actualBusinessId)
      ])

      return NextResponse.json({
        stats,
        salesChart,
        paymentMethods,
        topProducts,
        transactions,
        lowStock,
        businessStats
      })
    }

    // Route to appropriate handler based on type
    if (!actualBusinessId) {
      return NextResponse.json({ error: 'Business ID is required' }, { status: 400 })
    }

    switch (type) {
      case 'stats':
        return getStats(supabase, actualBusinessId)
      case 'sales-chart':
        return getSalesChart(supabase, actualBusinessId)
      case 'payment-methods':
        return getPaymentMethods(supabase, actualBusinessId)
      case 'top-products':
        return getTopProducts(supabase, actualBusinessId)
      case 'transactions':
        return getTransactions(supabase, actualBusinessId)
      case 'low-stock':
        return getLowStock(supabase, actualBusinessId)
      case 'business-stats':
        return getBusinessStats(supabase, actualBusinessId)
      default:
        return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 })
    }
  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function getStatsData(supabase: any, businessId: string) {
  // Get today's date range
  const today = new Date()
  const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString()
  const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString()

  // Get yesterday's date range for comparison
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  const startOfYesterday = new Date(yesterday.setHours(0, 0, 0, 0)).toISOString()
  const endOfYesterday = new Date(yesterday.setHours(23, 59, 59, 999)).toISOString()

  // Fetch today's sales
  const { data: todaySales } = await supabase
    .from('sales')
    .select('total, subtotal, created_at')
    .eq('business_id', businessId)
    .gte('created_at', startOfDay)
    .lte('created_at', endOfDay)

  // Fetch yesterday's sales for comparison
  const { data: yesterdaySales } = await supabase
    .from('sales')
    .select('total, subtotal, created_at')
    .eq('business_id', businessId)
    .gte('created_at', startOfYesterday)
    .lte('created_at', endOfYesterday)

  // Calculate stats
  const todayTotalSales = todaySales?.reduce((sum: number, sale: any) => sum + Number(sale.total), 0) || 0
  const todayTotalProfit = todaySales?.reduce((sum: number, sale: any) => sum + (Number(sale.total) - Number(sale.subtotal)), 0) || 0
  const todayTransactions = todaySales?.length || 0
  const todayAvgOrderValue = todayTransactions > 0 ? todayTotalSales / todayTransactions : 0

  const yesterdayTotalSales = yesterdaySales?.reduce((sum: number, sale: any) => sum + Number(sale.total), 0) || 0
  const yesterdayTransactions = yesterdaySales?.length || 0
  const yesterdayAvgOrderValue = yesterdayTransactions > 0 ? yesterdayTotalSales / yesterdayTransactions : 0

  // Calculate percentage changes
  const salesChange = yesterdayTotalSales > 0 
    ? ((todayTotalSales - yesterdayTotalSales) / yesterdayTotalSales) * 100 
    : 0
  const profitChange = yesterdayTotalSales > 0 
    ? ((todayTotalProfit - (yesterdaySales?.reduce((sum: number, sale: any) => sum + (Number(sale.total) - Number(sale.subtotal)), 0) || 0)) / (yesterdaySales?.reduce((sum: number, sale: any) => sum + (Number(sale.total) - Number(sale.subtotal)), 0) || 1)) * 100 
    : 0
  const transactionsChange = yesterdayTransactions > 0 
    ? ((todayTransactions - yesterdayTransactions) / yesterdayTransactions) * 100 
    : 0
  const avgOrderChange = yesterdayAvgOrderValue > 0 
    ? ((todayAvgOrderValue - yesterdayAvgOrderValue) / yesterdayAvgOrderValue) * 100 
    : 0

  return {
    totalSales: { value: todayTotalSales, change: salesChange },
    totalProfit: { value: todayTotalProfit, change: profitChange },
    transactions: { value: todayTransactions, change: transactionsChange },
    avgOrderValue: { value: todayAvgOrderValue, change: avgOrderChange }
  }
}

async function getStats(supabase: any, businessId: string) {
  // Get today's date range
  const today = new Date()
  const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString()
  const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString()

  // Get yesterday's date range for comparison
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  const startOfYesterday = new Date(yesterday.setHours(0, 0, 0, 0)).toISOString()
  const endOfYesterday = new Date(yesterday.setHours(23, 59, 59, 999)).toISOString()

  // Fetch today's sales
  const { data: todaySales } = await supabase
    .from('sales')
    .select('total, subtotal, created_at')
    .eq('business_id', businessId)
    .gte('created_at', startOfDay)
    .lte('created_at', endOfDay)

  // Fetch yesterday's sales for comparison
  const { data: yesterdaySales } = await supabase
    .from('sales')
    .select('total, subtotal, created_at')
    .eq('business_id', businessId)
    .gte('created_at', startOfYesterday)
    .lte('created_at', endOfYesterday)

  // Calculate stats
  const todayTotalSales = todaySales?.reduce((sum: number, sale: any) => sum + Number(sale.total), 0) || 0
  const todayTotalProfit = todaySales?.reduce((sum: number, sale: any) => sum + (Number(sale.total) - Number(sale.subtotal)), 0) || 0
  const todayTransactions = todaySales?.length || 0
  const todayAvgOrderValue = todayTransactions > 0 ? todayTotalSales / todayTransactions : 0

  const yesterdayTotalSales = yesterdaySales?.reduce((sum: number, sale: any) => sum + Number(sale.total), 0) || 0
  const yesterdayTransactions = yesterdaySales?.length || 0
  const yesterdayAvgOrderValue = yesterdayTransactions > 0 ? yesterdayTotalSales / yesterdayTransactions : 0

  // Calculate percentage changes
  const salesChange = yesterdayTotalSales > 0 
    ? ((todayTotalSales - yesterdayTotalSales) / yesterdayTotalSales) * 100 
    : 0
  const profitChange = yesterdayTotalSales > 0 
    ? ((todayTotalProfit - (yesterdaySales?.reduce((sum: number, sale: any) => sum + (Number(sale.total) - Number(sale.subtotal)), 0) || 0)) / (yesterdaySales?.reduce((sum: number, sale: any) => sum + (Number(sale.total) - Number(sale.subtotal)), 0) || 1)) * 100 
    : 0
  const transactionsChange = yesterdayTransactions > 0 
    ? ((todayTransactions - yesterdayTransactions) / yesterdayTransactions) * 100 
    : 0
  const avgOrderChange = yesterdayAvgOrderValue > 0 
    ? ((todayAvgOrderValue - yesterdayAvgOrderValue) / yesterdayAvgOrderValue) * 100 
    : 0

  return NextResponse.json({
    totalSales: { value: todayTotalSales, change: salesChange },
    totalProfit: { value: todayTotalProfit, change: profitChange },
    transactions: { value: todayTransactions, change: transactionsChange },
    avgOrderValue: { value: todayAvgOrderValue, change: avgOrderChange }
  })
}

async function getSalesChartData(supabase: any, businessId: string) {
  // Get today's date range
  const today = new Date()
  const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString()
  const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString()

  // Fetch today's sales
  const { data: sales } = await supabase
    .from('sales')
    .select('total, created_at')
    .eq('business_id', businessId)
    .gte('created_at', startOfDay)
    .lte('created_at', endOfDay)
    .order('created_at', { ascending: true })

  if (!sales || sales.length === 0) {
    return []
  }

  // Group sales by 3-hour intervals
  const intervals = [
    { time: '12 AM', start: 0, end: 3 },
    { time: '3 AM', start: 3, end: 6 },
    { time: '6 AM', start: 6, end: 9 },
    { time: '9 AM', start: 9, end: 12 },
    { time: '12 PM', start: 12, end: 15 },
    { time: '3 PM', start: 15, end: 18 },
    { time: '6 PM', start: 18, end: 21 },
    { time: '9 PM', start: 21, end: 24 },
  ]

  const chartData = intervals.map(interval => {
    const intervalSales = sales.filter((sale: any) => {
      const hour = new Date(sale.created_at).getHours()
      return hour >= interval.start && hour < interval.end
    })

    const value = intervalSales.reduce((sum: number, sale: any) => sum + Number(sale.total), 0)

    return { time: interval.time, value }
  })

  return chartData
}

async function getSalesChart(supabase: any, businessId: string) {
  // Get today's date range
  const today = new Date()
  const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString()
  const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString()

  // Fetch today's sales
  const { data: sales } = await supabase
    .from('sales')
    .select('total, created_at')
    .eq('business_id', businessId)
    .gte('created_at', startOfDay)
    .lte('created_at', endOfDay)
    .order('created_at', { ascending: true })

  if (!sales || sales.length === 0) {
    return NextResponse.json({ chartData: [] })
  }

  // Group sales by 3-hour intervals
  const intervals = [
    { time: '12 AM', start: 0, end: 3 },
    { time: '3 AM', start: 3, end: 6 },
    { time: '6 AM', start: 6, end: 9 },
    { time: '9 AM', start: 9, end: 12 },
    { time: '12 PM', start: 12, end: 15 },
    { time: '3 PM', start: 15, end: 18 },
    { time: '6 PM', start: 18, end: 21 },
    { time: '9 PM', start: 21, end: 24 },
  ]

  const chartData = intervals.map(interval => {
    const intervalSales = sales.filter((sale: any) => {
      const hour = new Date(sale.created_at).getHours()
      return hour >= interval.start && hour < interval.end
    })

    const value = intervalSales.reduce((sum: number, sale: any) => sum + Number(sale.total), 0)

    return { time: interval.time, value }
  })

  return NextResponse.json({ chartData })
}

async function getPaymentMethodsData(supabase: any, businessId: string) {
  // Get today's date range
  const today = new Date()
  const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString()
  const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString()

  // Fetch today's sales grouped by payment method
  const { data: sales } = await supabase
    .from('sales')
    .select('total, payment_method')
    .eq('business_id', businessId)
    .gte('created_at', startOfDay)
    .lte('created_at', endOfDay)

  if (!sales || sales.length === 0) {
    return { paymentMethods: [], totalAmount: 0 }
  }

  // Aggregate by payment method
  const paymentMap = new Map()
  let totalAmount = 0

  sales.forEach((sale: any) => {
    const method = sale.payment_method
    const amount = Number(sale.total)
    totalAmount += amount

    if (paymentMap.has(method)) {
      paymentMap.set(method, paymentMap.get(method) + amount)
    } else {
      paymentMap.set(method, amount)
    }
  })

  // Convert to array with percentages
  const paymentMethods = Array.from(paymentMap.entries()).map(([name, amount], index: number) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    amount,
    percentage: (amount / totalAmount) * 100,
    color: ['#3B82F6', '#10B981', '#F59E0B', '#6B7280', '#8B5CF6', '#EC4899'][index % 6]
  }))

  // Sort by amount descending
  paymentMethods.sort((a: any, b: any) => b.amount - a.amount)

  return { paymentMethods, totalAmount }
}

async function getPaymentMethods(supabase: any, businessId: string) {
  // Get today's date range
  const today = new Date()
  const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString()
  const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString()

  // Fetch today's sales grouped by payment method
  const { data: sales } = await supabase
    .from('sales')
    .select('total, payment_method')
    .eq('business_id', businessId)
    .gte('created_at', startOfDay)
    .lte('created_at', endOfDay)

  if (!sales || sales.length === 0) {
    return NextResponse.json({ paymentMethods: [], totalAmount: 0 })
  }

  // Aggregate by payment method
  const paymentMap = new Map()
  let totalAmount = 0

  sales.forEach((sale: any) => {
    const method = sale.payment_method
    const amount = Number(sale.total)
    totalAmount += amount

    if (paymentMap.has(method)) {
      paymentMap.set(method, paymentMap.get(method) + amount)
    } else {
      paymentMap.set(method, amount)
    }
  })

  // Convert to array with percentages
  const paymentMethods = Array.from(paymentMap.entries()).map(([name, amount], index: number) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    amount,
    percentage: (amount / totalAmount) * 100,
    color: ['#3B82F6', '#10B981', '#F59E0B', '#6B7280', '#8B5CF6', '#EC4899'][index % 6]
  }))

  // Sort by amount descending
  paymentMethods.sort((a: any, b: any) => b.amount - a.amount)

  return NextResponse.json({ paymentMethods, totalAmount })
}

async function getTopProductsData(supabase: any, businessId: string) {
  // Get today's date range
  const today = new Date()
  const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString()
  const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString()

  // Fetch top products by sales today using sale_items
  const { data: saleItems } = await supabase
    .from('sale_items')
    .select(`
      product_id,
      product_name,
      quantity,
      unit_price,
      sales!inner (
        business_id,
        created_at
      )
    `)
    .eq('sales.business_id', businessId)
    .gte('sales.created_at', startOfDay)
    .lte('sales.created_at', endOfDay)

  if (!saleItems || saleItems.length === 0) {
    return { products: [] }
  }

  // Aggregate sales by product
  const productSales = new Map()
  
  saleItems.forEach((item: any) => {
    const productId = item.product_id
    const productName = item.product_name
    const quantity = item.quantity
    const unitPrice = item.unit_price
    const revenue = quantity * unitPrice

    if (productSales.has(productId)) {
      const existing = productSales.get(productId)
      existing.sold += quantity
      existing.revenue += revenue
    } else {
      productSales.set(productId, {
        id: productId,
        name: productName,
        sold: quantity,
        revenue: revenue
      })
    }
  })

  // Convert to array and sort by quantity sold
  const sortedProducts = Array.from(productSales.values())
    .sort((a: any, b: any) => b.sold - a.sold)
    .slice(0, 10)

  // Fetch product images
  const productIds = sortedProducts.map((p: any) => p.id)
  const { data: products } = await supabase
    .from('products')
    .select('id, image_url')
    .in('id', productIds)

  // Create a map of product images
  const productImages = new Map()
  products?.forEach((product: any) => {
    productImages.set(product.id, product.image_url)
  })

  // Format the response with images
  const formattedProducts = sortedProducts.map((product: any) => ({
    name: product.name,
    sold: product.sold,
    revenue: product.revenue,
    image: productImages.get(product.id) || null
  }))

  return { products: formattedProducts }
}

async function getTopProducts(supabase: any, businessId: string) {
  // Get today's date range
  const today = new Date()
  const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString()
  const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString()

  // Fetch top products by sales today using sale_items
  const { data: saleItems } = await supabase
    .from('sale_items')
    .select(`
      product_id,
      product_name,
      quantity,
      unit_price,
      sales!inner (
        business_id,
        created_at
      )
    `)
    .eq('sales.business_id', businessId)
    .gte('sales.created_at', startOfDay)
    .lte('sales.created_at', endOfDay)

  if (!saleItems || saleItems.length === 0) {
    return NextResponse.json({ products: [] })
  }

  // Aggregate sales by product
  const productSales = new Map()
  
  saleItems.forEach((item: any) => {
    const productId = item.product_id
    const productName = item.product_name
    const quantity = item.quantity
    const unitPrice = item.unit_price
    const revenue = quantity * unitPrice

    if (productSales.has(productId)) {
      const existing = productSales.get(productId)
      existing.sold += quantity
      existing.revenue += revenue
    } else {
      productSales.set(productId, {
        id: productId,
        name: productName,
        sold: quantity,
        revenue: revenue
      })
    }
  })

  // Convert to array and sort by quantity sold
  const sortedProducts = Array.from(productSales.values())
    .sort((a: any, b: any) => b.sold - a.sold)
    .slice(0, 10)

  // Fetch product images
  const productIds = sortedProducts.map((p: any) => p.id)
  const { data: products } = await supabase
    .from('products')
    .select('id, image_url')
    .in('id', productIds)

  // Create a map of product images
  const productImages = new Map()
  products?.forEach((product: any) => {
    productImages.set(product.id, product.image_url)
  })

  // Format the response with images
  const formattedProducts = sortedProducts.map((product: any) => ({
    name: product.name,
    sold: product.sold,
    revenue: product.revenue,
    image: productImages.get(product.id) || null
  }))

  return NextResponse.json({ products: formattedProducts })
}

async function getTransactionsData(supabase: any, businessId: string) {
  // Fetch recent transactions with item count
  const { data: sales } = await supabase
    .from('sales')
    .select(`
      id,
      receipt_number,
      customer,
      total,
      created_at,
      status,
      sale_items (
        id
      )
    `)
    .eq('business_id', businessId)
    .order('created_at', { ascending: false })
    .limit(10)

  if (!sales) {
    return { transactions: [] }
  }

  // Format the transactions
  const transactions = sales.map((sale: any) => ({
    id: sale.receipt_number,
    customer: sale.customer,
    items: sale.sale_items?.length || 0,
    total: sale.total,
    time: new Date(sale.created_at).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    status: sale.status.charAt(0).toUpperCase() + sale.status.slice(1)
  }))

  return { transactions }
}

async function getTransactions(supabase: any, businessId: string) {
  // Fetch recent transactions with item count
  const { data: sales } = await supabase
    .from('sales')
    .select(`
      id,
      receipt_number,
      customer,
      total,
      created_at,
      status,
      sale_items (
        id
      )
    `)
    .eq('business_id', businessId)
    .order('created_at', { ascending: false })
    .limit(10)

  if (!sales) {
    return NextResponse.json({ transactions: [] })
  }

  // Format the transactions
  const transactions = sales.map((sale: any) => ({
    id: sale.receipt_number,
    customer: sale.customer,
    items: sale.sale_items?.length || 0,
    total: sale.total,
    time: new Date(sale.created_at).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    status: sale.status.charAt(0).toUpperCase() + sale.status.slice(1)
  }))

  return NextResponse.json({ transactions })
}

async function getLowStockData(supabase: any, businessId: string) {
  // Fetch products with low stock (current_stock < min_stock)
  const { data: products } = await supabase
    .from('products')
    .select('id, name, sku, current_stock, min_stock, image_url')
    .eq('business_id', businessId)
    .lt('current_stock', 'min_stock')
    .order('current_stock', { ascending: true })
    .limit(10)

  if (!products || products.length === 0) {
    return { lowStockItems: [] }
  }

  // Format the response
  const lowStockItems = products.map((product: any) => ({
    name: product.name,
    sku: product.sku || 'N/A',
    stock: product.current_stock,
    minStock: product.min_stock,
    image: product.image_url
  }))

  return { lowStockItems }
}

async function getLowStock(supabase: any, businessId: string) {
  // Fetch products with low stock (current_stock < min_stock)
  const { data: products } = await supabase
    .from('products')
    .select('id, name, sku, current_stock, min_stock, image_url')
    .eq('business_id', businessId)
    .lt('current_stock', 'min_stock')
    .order('current_stock', { ascending: true })
    .limit(10)

  if (!products || products.length === 0) {
    return NextResponse.json({ lowStockItems: [] })
  }

  // Format the response
  const lowStockItems = products.map((product: any) => ({
    name: product.name,
    sku: product.sku || 'N/A',
    stock: product.current_stock,
    minStock: product.min_stock,
    image: product.image_url
  }))

  return NextResponse.json({ lowStockItems })
}

async function getBusinessStatsData(supabase: any, businessId: string) {
  // Fetch total products count
  const { count: totalProducts } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('business_id', businessId)

  // Fetch total inventory value
  const { data: products } = await supabase
    .from('products')
    .select('current_stock, cost_price')
    .eq('business_id', businessId)

  let stockValue = 0
  if (products) {
    stockValue = products.reduce((sum: number, p: any) => sum + (p.current_stock * p.cost_price), 0)
  }

  // Note: Customers, suppliers, and employees would need separate tables
  // For now, returning 0 for these as they're not in the current schema

  return {
    totalProducts: totalProducts || 0,
    totalCustomers: 0,
    totalSuppliers: 0,
    totalEmployees: 0,
    stockValue
  }
}

async function getBusinessStats(supabase: any, businessId: string) {
  // Fetch total products count
  const { count: totalProducts } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('business_id', businessId)

  // Fetch total inventory value
  const { data: products } = await supabase
    .from('products')
    .select('current_stock, cost_price')
    .eq('business_id', businessId)

  let stockValue = 0
  if (products) {
    stockValue = products.reduce((sum: number, p: any) => sum + (p.current_stock * p.cost_price), 0)
  }

  // Note: Customers, suppliers, and employees would need separate tables
  // For now, returning 0 for these as they're not in the current schema

  return NextResponse.json({
    totalProducts: totalProducts || 0,
    totalCustomers: 0,
    totalSuppliers: 0,
    totalEmployees: 0,
    stockValue
  })
}
