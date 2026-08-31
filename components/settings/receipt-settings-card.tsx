"use client"

import { Receipt } from "lucide-react"

interface ReceiptSettings {
  showLogo: boolean
  showCustomerDetails: boolean
  footerText: string
  defaultPrinter: string
}

interface ReceiptSettingsCardProps {
  receiptSettings: ReceiptSettings
  onChange: (settings: ReceiptSettings) => void
}

export function ReceiptSettingsCard({ receiptSettings, onChange }: ReceiptSettingsCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600 shadow-sm">
          <Receipt className="h-5 w-5" strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Receipt Settings</h3>
          <p className="text-xs text-slate-500">Configure receipt printing options</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700">Show Business Logo</label>
          <button
            onClick={() => onChange({ ...receiptSettings, showLogo: !receiptSettings.showLogo })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${receiptSettings.showLogo ? 'bg-blue-600' : 'bg-slate-200'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${receiptSettings.showLogo ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700">Show Customer Details</label>
          <button
            onClick={() => onChange({ ...receiptSettings, showCustomerDetails: !receiptSettings.showCustomerDetails })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${receiptSettings.showCustomerDetails ? 'bg-blue-600' : 'bg-slate-200'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${receiptSettings.showCustomerDetails ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Receipt Footer Text</label>
          <textarea
            value={receiptSettings.footerText}
            onChange={(e) => onChange({ ...receiptSettings, footerText: e.target.value })}
            rows={2}
            className="w-full px-3 py-2 text-sm border rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Default Receipt Printer</label>
          <select
            value={receiptSettings.defaultPrinter}
            onChange={(e) => onChange({ ...receiptSettings, defaultPrinter: e.target.value })}
            className="h-10 w-full px-3 text-sm border rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          >
            <option value="thermal">Thermal Printer</option>
            <option value="inkjet">Inkjet Printer</option>
            <option value="laser">Laser Printer</option>
          </select>
        </div>
      </div>
    </div>
  )
}
