export interface ReceiptSettings {
  // Branding
  businessName: string
  logo: string | null
  footerText: string
  
  // Layout
  showLogo: boolean
  showContactInfo: boolean
  showBarcode: boolean
  fontSize: 'small' | 'medium' | 'large'
  templateType: 'classic' | 'compact' | 'modern'
  
  // Contact Info
  address: string
  phone: string
  email: string
  website: string
  
  // Back of Receipt
  backReceiptTitle: string
  backReceiptText: string
  backContactEmail: string
  backContactWebsite: string
  backImage: string | null
  
  // Printer
  defaultPrinter: 'thermal' | 'inkjet' | 'laser'
  paperSize: '80mm' | '58mm'
}

export const defaultReceiptSettings: ReceiptSettings = {
  businessName: 'WEPESI MART',
  logo: null,
  footerText: 'Thank you! Please come again.',
  showLogo: true,
  showContactInfo: true,
  showBarcode: true,
  fontSize: 'medium',
  templateType: 'classic',
  address: 'Nairobi, Kenya',
  phone: '0712 345 678',
  email: 'support@wepesimart.com',
  website: 'www.wepesimart.com',
  backReceiptTitle: 'Return Policy',
  backReceiptText: 'Returns accepted within 7 days with original receipt',
  backContactEmail: 'support@wepesimart.com',
  backContactWebsite: 'www.wepesimart.com',
  backImage: null,
  defaultPrinter: 'thermal',
  paperSize: '80mm',
}

const STORAGE_KEY = 'receipt_settings'

export const getReceiptSettings = (): ReceiptSettings => {
  if (typeof window === 'undefined') return defaultReceiptSettings
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return { ...defaultReceiptSettings, ...JSON.parse(stored) }
    }
  } catch (error) {
    console.error('Error loading receipt settings:', error)
  }
  
  return defaultReceiptSettings
}

export const saveReceiptSettings = (settings: ReceiptSettings): void => {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  } catch (error) {
    console.error('Error saving receipt settings:', error)
  }
}
