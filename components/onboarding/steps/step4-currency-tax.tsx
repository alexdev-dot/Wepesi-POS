import { useState } from "react"
import { DollarSign, Percent } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { motion } from "framer-motion"

const currencies = [
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh" },
  { code: "TZS", name: "Tanzanian Shilling", symbol: "TSh" },
  { code: "UGX", name: "Ugandan Shilling", symbol: "USh" },
  { code: "ZAR", name: "South African Rand", symbol: "R" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
]

interface CurrencyTaxDetails {
  currency: string
  taxEnabled: boolean
  taxName: string
  taxRate: string
  taxInclusive: boolean
}

interface Step4CurrencyTaxProps {
  data: CurrencyTaxDetails
  onChange: (data: CurrencyTaxDetails) => void
  onNext: () => void
  onBack: () => void
}

export function Step4CurrencyTax({ data, onChange, onNext, onBack }: Step4CurrencyTaxProps) {
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
        Currency & Tax
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="text-xs sm:text-sm text-slate-600 mb-4 sm:mb-6"
      >
        Configure your currency and tax settings
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
        {/* Currency Selection */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        >
          <Label htmlFor="currency" className="text-xs sm:text-sm font-semibold text-slate-900 mb-2 block">
            Currency
          </Label>
          <div className="relative">
            <select
              id="currency"
              value={data.currency}
              onChange={(e) => onChange({ ...data, currency: e.target.value })}
              className="h-10 sm:h-11 w-full rounded-lg border border-slate-200 bg-white pl-3 pr-10 text-xs sm:text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-primary/10 transition-all appearance-none"
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.symbol} {currency.code} - {currency.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Tax Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="bg-slate-50 rounded-lg p-3 sm:p-4"
        >
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <Checkbox
              id="taxEnabled"
              checked={data.taxEnabled}
              onCheckedChange={(checked) => onChange({ ...data, taxEnabled: checked as boolean })}
              className="h-4 w-4"
            />
            <Label htmlFor="taxEnabled" className="text-xs sm:text-sm font-semibold text-slate-900 cursor-pointer">
              Enable Tax
            </Label>
          </div>

          {data.taxEnabled && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="space-y-3 sm:space-y-4"
            >
              {/* Tax Name */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Label htmlFor="taxName" className="text-xs sm:text-sm font-semibold text-slate-900 mb-2 block">
                  Tax Name
                </Label>
                <Input
                  id="taxName"
                  type="text"
                  placeholder="e.g., VAT"
                  value={data.taxName}
                  onChange={(e) => onChange({ ...data, taxName: e.target.value })}
                  className="h-10 sm:h-11 rounded-lg border border-slate-200 bg-white text-xs sm:text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-primary/10 transition-all"
                />
              </motion.div>

              {/* Tax Rate */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Label htmlFor="taxRate" className="text-xs sm:text-sm font-semibold text-slate-900 mb-2 block">
                  Tax Rate (%)
                </Label>
                <div className="relative">
                  <Percent className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="taxRate"
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    placeholder="e.g., 16"
                    value={data.taxRate}
                    onChange={(e) => onChange({ ...data, taxRate: e.target.value })}
                    className="h-10 sm:h-11 rounded-lg border border-slate-200 bg-white pl-10 text-xs sm:text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-primary/10 transition-all"
                  />
                </div>
              </motion.div>

              {/* Tax Inclusive */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Label className="text-xs sm:text-sm font-semibold text-slate-900 mb-2 block">
                  Are prices tax inclusive?
                </Label>
                <div className="flex gap-2">
                  <motion.button
                    type="button"
                    onClick={() => onChange({ ...data, taxInclusive: true })}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      flex-1 p-2.5 sm:p-3 rounded-lg border transition-all duration-200
                      ${data.taxInclusive
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                      }
                    `}
                  >
                    <div className="text-xs sm:text-sm font-semibold">Yes</div>
                    <div className="text-[10px] sm:text-xs text-slate-600 mt-1">Tax included</div>
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => onChange({ ...data, taxInclusive: false })}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      flex-1 p-2.5 sm:p-3 rounded-lg border transition-all duration-200
                      ${!data.taxInclusive
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                      }
                    `}
                  >
                    <div className="text-xs sm:text-sm font-semibold">No</div>
                    <div className="text-[10px] sm:text-xs text-slate-600 mt-1">Tax added</div>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
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
