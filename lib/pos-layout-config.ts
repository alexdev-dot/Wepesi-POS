import { LucideIcon, Store, ShoppingCart, Utensils, Coffee, Wrench, Smartphone, Scissors, Pill } from "lucide-react"

export interface POSLayoutConfig {
  id: string
  name: string
  description: string
  icon: LucideIcon
  features: {
    showCategories: boolean
    showTableManagement: boolean
    showKitchenDisplay: boolean
    showBarcodeScanner: boolean
    showWeightScale: boolean
    showServiceSelection: boolean
    showTimeSlots: boolean
    showModifiers: boolean
    showVariants: boolean
  }
  layout: 'grid' | 'list' | 'table' | 'service'
  defaultView: 'products' | 'tables' | 'services' | 'kiosk'
}

export const BUSINESS_TYPE_CONFIGS: Record<string, POSLayoutConfig> = {
  retail: {
    id: 'retail',
    name: 'Retail Store',
    description: 'General retail with product grid and categories',
    icon: Store,
    features: {
      showCategories: true,
      showTableManagement: false,
      showKitchenDisplay: false,
      showBarcodeScanner: true,
      showWeightScale: false,
      showServiceSelection: false,
      showTimeSlots: false,
      showModifiers: true,
      showVariants: true
    },
    layout: 'grid',
    defaultView: 'products'
  },
  supermarket: {
    id: 'supermarket',
    name: 'Supermarket',
    description: 'Large grocery with barcode scanning and weight integration',
    icon: ShoppingCart,
    features: {
      showCategories: true,
      showTableManagement: false,
      showKitchenDisplay: false,
      showBarcodeScanner: true,
      showWeightScale: true,
      showServiceSelection: false,
      showTimeSlots: false,
      showModifiers: true,
      showVariants: true
    },
    layout: 'grid',
    defaultView: 'products'
  },
  restaurant: {
    id: 'restaurant',
    name: 'Restaurant',
    description: 'Full restaurant with table management and kitchen display',
    icon: Utensils,
    features: {
      showCategories: true,
      showTableManagement: true,
      showKitchenDisplay: true,
      showBarcodeScanner: false,
      showWeightScale: false,
      showServiceSelection: false,
      showTimeSlots: false,
      showModifiers: true,
      showVariants: true
    },
    layout: 'table',
    defaultView: 'tables'
  },
  cafe: {
    id: 'cafe',
    name: 'Cafe/Coffee Shop',
    description: 'Quick service with modifiers and simple checkout',
    icon: Coffee,
    features: {
      showCategories: true,
      showTableManagement: false,
      showKitchenDisplay: true,
      showBarcodeScanner: false,
      showWeightScale: false,
      showServiceSelection: false,
      showTimeSlots: false,
      showModifiers: true,
      showVariants: true
    },
    layout: 'grid',
    defaultView: 'products'
  },
  hardware: {
    id: 'hardware',
    name: 'Hardware Store',
    description: 'Hardware store with SKU lookup and bulk items',
    icon: Wrench,
    features: {
      showCategories: true,
      showTableManagement: false,
      showKitchenDisplay: false,
      showBarcodeScanner: true,
      showWeightScale: false,
      showServiceSelection: false,
      showTimeSlots: false,
      showModifiers: false,
      showVariants: true
    },
    layout: 'list',
    defaultView: 'products'
  },
  kiosk: {
    id: 'kiosk',
    name: 'Self-Service Kiosk',
    description: 'Customer-facing kiosk with simplified interface',
    icon: Smartphone,
    features: {
      showCategories: true,
      showTableManagement: false,
      showKitchenDisplay: false,
      showBarcodeScanner: false,
      showWeightScale: false,
      showServiceSelection: false,
      showTimeSlots: false,
      showModifiers: true,
      showVariants: true
    },
    layout: 'grid',
    defaultView: 'products'
  },
  salon: {
    id: 'salon',
    name: 'Salon/Spa',
    description: 'Service-based with appointment booking',
    icon: Scissors,
    features: {
      showCategories: false,
      showTableManagement: false,
      showKitchenDisplay: false,
      showBarcodeScanner: false,
      showWeightScale: false,
      showServiceSelection: true,
      showTimeSlots: true,
      showModifiers: false,
      showVariants: false
    },
    layout: 'service',
    defaultView: 'services'
  },
  pharmacy: {
    id: 'pharmacy',
    name: 'Pharmacy',
    description: 'Pharmacy with prescription management',
    icon: Pill,
    features: {
      showCategories: true,
      showTableManagement: false,
      showKitchenDisplay: false,
      showBarcodeScanner: true,
      showWeightScale: false,
      showServiceSelection: false,
      showTimeSlots: false,
      showModifiers: true,
      showVariants: true
    },
    layout: 'grid',
    defaultView: 'products'
  }
}

export const BUSINESS_TYPE_SELECTION = [
  { value: "retail", title: "Retail Store", icon: Store, description: "General retail with product categories" },
  { value: "supermarket", title: "Supermarket", icon: ShoppingCart, description: "Large grocery with barcode scanning" },
  { value: "restaurant", title: "Restaurant", icon: Utensils, description: "Full service with table management" },
  { value: "cafe", title: "Cafe/Coffee Shop", icon: Coffee, description: "Quick service with modifiers" },
  { value: "hardware", title: "Hardware Store", icon: Wrench, description: "Hardware with SKU lookup" },
  { value: "kiosk", title: "Self-Service Kiosk", icon: Smartphone, description: "Customer-facing simplified interface" },
  { value: "salon", title: "Salon/Spa", icon: Scissors, description: "Service-based with appointments" },
  { value: "pharmacy", title: "Pharmacy", icon: Pill, description: "Pharmacy with prescription management" }
]
