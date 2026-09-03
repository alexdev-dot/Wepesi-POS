import { useState } from "react"
import { MapPin, Globe, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

interface LocationDetails {
  branchName: string
  country: string
  city: string
  branchAddress: string
}

interface Step3LocationProps {
  data: LocationDetails
  onChange: (data: LocationDetails) => void
  onNext: () => void
  onBack: () => void
}

export function Step3Location({ data, onChange, onNext, onBack }: Step3LocationProps) {
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
        Location / Branch
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="text-xs sm:text-sm text-slate-600 mb-4 sm:mb-6"
      >
        Where is your business located?
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
        {/* Branch Name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        >
          <Label htmlFor="branchName" className="text-xs sm:text-sm font-semibold text-slate-900 mb-2 block">
            Branch Name
          </Label>
          <div className="relative">
            <Building className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              id="branchName"
              type="text"
              placeholder="e.g., Main Branch"
              value={data.branchName}
              onChange={(e) => onChange({ ...data, branchName: e.target.value })}
              className="h-10 sm:h-11 rounded-lg border border-slate-200 bg-white pl-10 text-xs sm:text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-primary/10 transition-all"
            />
          </div>
        </motion.div>

        {/* Country */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        >
          <Label htmlFor="country" className="text-xs sm:text-sm font-semibold text-slate-900 mb-2 block">
            Country
          </Label>
          <div className="relative">
            <Globe className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              id="country"
              type="text"
              placeholder="e.g., Kenya"
              value={data.country}
              onChange={(e) => onChange({ ...data, country: e.target.value })}
              className="h-10 sm:h-11 rounded-lg border border-slate-200 bg-white pl-10 text-xs sm:text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-primary/10 transition-all"
            />
          </div>
        </motion.div>

        {/* City */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
        >
          <Label htmlFor="city" className="text-xs sm:text-sm font-semibold text-slate-900 mb-2 block">
            City / Town
          </Label>
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              id="city"
              type="text"
              placeholder="e.g., Nairobi"
              value={data.city}
              onChange={(e) => onChange({ ...data, city: e.target.value })}
              className="h-10 sm:h-11 rounded-lg border border-slate-200 bg-white pl-10 text-xs sm:text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-primary/10 transition-all"
            />
          </div>
        </motion.div>

        {/* Branch Address */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
        >
          <Label htmlFor="branchAddress" className="text-xs sm:text-sm font-semibold text-slate-900 mb-2 block">
            Branch Address
          </Label>
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <textarea
              id="branchAddress"
              placeholder="e.g., 123 Main Street, Westlands"
              value={data.branchAddress}
              onChange={(e) => onChange({ ...data, branchAddress: e.target.value })}
              className="h-20 sm:h-24 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 pt-2.5 text-xs sm:text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-primary/10 transition-all resize-none"
            />
          </div>
        </motion.div>

        {/* Info Note */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
          className="bg-slate-50 rounded-lg p-3"
        >
          <p className="text-[10px] sm:text-xs text-slate-600">
            💡 You can add more branches later from <span className="font-semibold text-primary">Settings → Branches</span>
          </p>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
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
