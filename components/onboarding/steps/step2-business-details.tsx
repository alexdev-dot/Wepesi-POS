import { useState } from "react"
import { Phone, Mail, MapPin, Building2, ShoppingBag, UtensilsCrossed, Pill, Wrench, Laptop, Shirt, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BusinessTypeCard } from "../business-type-card"
import { motion } from "framer-motion"

const businessTypes = [
  {
    id: "retail",
    name: "Retail Store",
    description: "General retail and merchandise",
    icon: Building2,
    color: "bg-blue-500",
    lightColor: "bg-blue-50",
    textColor: "text-blue-600"
  },
  {
    id: "supermarket",
    name: "Supermarket",
    description: "Grocery stores and food retail",
    icon: ShoppingBag,
    color: "bg-emerald-500",
    lightColor: "bg-emerald-50",
    textColor: "text-emerald-600"
  },
  {
    id: "restaurant",
    name: "Restaurant",
    description: "Food service and dining",
    icon: UtensilsCrossed,
    color: "bg-red-500",
    lightColor: "bg-red-50",
    textColor: "text-red-600"
  },
  {
    id: "pharmacy",
    name: "Pharmacy",
    description: "Health and medical supplies",
    icon: Pill,
    color: "bg-purple-500",
    lightColor: "bg-purple-50",
    textColor: "text-purple-600"
  },
  {
    id: "hardware",
    name: "Hardware",
    description: "Tools and home improvement",
    icon: Wrench,
    color: "bg-orange-500",
    lightColor: "bg-orange-50",
    textColor: "text-orange-600"
  },
  {
    id: "electronics",
    name: "Electronics",
    description: "Tech gadgets and appliances",
    icon: Laptop,
    color: "bg-cyan-500",
    lightColor: "bg-cyan-50",
    textColor: "text-cyan-600"
  },
  {
    id: "clothing",
    name: "Clothing",
    description: "Fashion and apparel",
    icon: Shirt,
    color: "bg-pink-500",
    lightColor: "bg-pink-50",
    textColor: "text-pink-600"
  },
  {
    id: "other",
    name: "Other",
    description: "Custom business type",
    icon: Sparkles,
    color: "bg-slate-500",
    lightColor: "bg-slate-50",
    textColor: "text-slate-600"
  }
]

interface BusinessDetails {
  businessName: string
  businessType: string
  phoneNumber: string
  businessEmail: string
  businessAddress: string
}

interface Step2BusinessDetailsProps {
  data: BusinessDetails
  onChange: (data: BusinessDetails) => void
  onNext: () => void
  onBack: () => void
}

export function Step2BusinessDetails({ data, onChange, onNext, onBack }: Step2BusinessDetailsProps) {
  const [error, setError] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onNext()
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="text-xl sm:text-2xl font-bold text-slate-900 mb-2"
      >
        Business Details
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="text-xs sm:text-sm text-slate-600 mb-4 sm:mb-6"
      >
        Tell us about your business
      </motion.p>

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 p-3 text-xs sm:text-sm text-red-600"
        >
          <span className="font-medium">{error}</span>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        {/* Business Type Selection */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        >
          <Label className="text-xs sm:text-sm font-semibold text-slate-900 mb-2 sm:mb-3 block">
            Business Type
          </Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {businessTypes.map((type, index) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.05, ease: "easeOut" }}
              >
                <BusinessTypeCard
                  {...type}
                  isSelected={data.businessType === type.id}
                  onSelect={(id) => onChange({ ...data, businessType: id })}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Business Name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
        >
          <Label htmlFor="businessName" className="text-xs sm:text-sm font-semibold text-slate-900 mb-2 block">
            Business Name
          </Label>
          <div className="relative">
            <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              id="businessName"
              type="text"
              placeholder="e.g., Alex's Supermarket"
              value={data.businessName}
              onChange={(e) => onChange({ ...data, businessName: e.target.value })}
              className="h-10 sm:h-11 rounded-lg border border-slate-200 bg-white pl-10 text-xs sm:text-sm shadow-sm focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>
        </motion.div>

        {/* Phone Number */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
        >
          <Label htmlFor="phoneNumber" className="text-xs sm:text-sm font-semibold text-slate-900 mb-2 block">
            Phone Number
          </Label>
          <div className="relative">
            <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="e.g., +254 700 000 000"
              value={data.phoneNumber}
              onChange={(e) => onChange({ ...data, phoneNumber: e.target.value })}
              className="h-10 sm:h-11 rounded-lg border border-slate-200 bg-white pl-10 text-xs sm:text-sm shadow-sm focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>
        </motion.div>

        {/* Business Email */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
        >
          <Label htmlFor="businessEmail" className="text-xs sm:text-sm font-semibold text-slate-900 mb-2 block">
            Business Email
          </Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              id="businessEmail"
              type="email"
              placeholder="e.g., info@alexsupermarket.com"
              value={data.businessEmail}
              onChange={(e) => onChange({ ...data, businessEmail: e.target.value })}
              className="h-10 sm:h-11 rounded-lg border border-slate-200 bg-white pl-10 text-xs sm:text-sm shadow-sm focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>
        </motion.div>

        {/* Business Address */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
        >
          <Label htmlFor="businessAddress" className="text-xs sm:text-sm font-semibold text-slate-900 mb-2 block">
            Business Address
          </Label>
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <textarea
              id="businessAddress"
              placeholder="e.g., 123 Main Street, Nairobi"
              value={data.businessAddress}
              onChange={(e) => onChange({ ...data, businessAddress: e.target.value })}
              className="h-20 sm:h-24 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 pt-2.5 text-xs sm:text-sm shadow-sm focus:ring-2 focus:ring-primary/10 transition-all resize-none"
            />
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9, ease: "easeOut" }}
          className="flex gap-2 sm:gap-3 pt-2"
        >
          <Button
            type="button"
            onClick={onBack}
            variant="outline"
            className="flex-1 h-10 sm:h-11 rounded-lg text-xs sm:text-sm font-semibold"
          >
            Back
          </Button>
          <Button
            type="submit"
            className="flex-1 h-10 sm:h-11 rounded-lg text-xs sm:text-sm font-semibold bg-primary hover:bg-primary/90 transition-all"
          >
            Continue
          </Button>
        </motion.div>
      </form>
    </motion.div>
  )
}
