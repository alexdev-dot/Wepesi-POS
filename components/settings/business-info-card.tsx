"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Building, Upload } from "lucide-react"

interface BusinessInfo {
  businessName: string
  businessType: string
  phone: string
  email: string
  address: string
  subdomain: string
}

interface BusinessInfoCardProps {
  businessInfo: BusinessInfo
  onChange: (info: BusinessInfo) => void
}

export function BusinessInfoCard({ businessInfo, onChange }: BusinessInfoCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600 shadow-sm">
          <Building className="h-5 w-5" strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Business Information</h3>
          <p className="text-xs text-slate-500">Update your business details</p>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Business Name</label>
          <Input
            type="text"
            value={businessInfo.businessName}
            onChange={(e) => onChange({ ...businessInfo, businessName: e.target.value })}
            className="h-10 text-sm border bg-slate-50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Business Type</label>
          <select
            value={businessInfo.businessType}
            onChange={(e) => onChange({ ...businessInfo, businessType: e.target.value })}
            className="h-10 w-full px-3 text-sm border rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          >
            <option value="retail">Retail</option>
            <option value="restaurant">Restaurant</option>
            <option value="service">Service</option>
            <option value="wholesale">Wholesale</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
          <Input
            type="text"
            value={businessInfo.phone}
            onChange={(e) => onChange({ ...businessInfo, phone: e.target.value })}
            className="h-10 text-sm border bg-slate-50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
          <Input
            type="email"
            value={businessInfo.email}
            onChange={(e) => onChange({ ...businessInfo, email: e.target.value })}
            className="h-10 text-sm border bg-slate-50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Address</label>
          <textarea
            value={businessInfo.address}
            onChange={(e) => onChange({ ...businessInfo, address: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 text-sm border rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Website Subdomain</label>
          <div className="relative">
            <Input
              type="text"
              value={businessInfo.subdomain}
              onChange={(e) => {
                const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')
                onChange({ ...businessInfo, subdomain: value })
              }}
              className="h-10 text-sm border bg-slate-50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all pr-24"
              placeholder="mybusiness"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 font-medium">.wepesi.com</span>
          </div>
          <p className="mt-1.5 text-xs text-slate-500">Your website will be: <span className="font-medium text-blue-600">{businessInfo.subdomain || 'mybusiness'}.wepesi.com</span></p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Business Logo</label>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="h-10 text-sm border-slate-200 text-slate-700 hover:bg-slate-50">
              <Upload className="h-4 w-4 mr-2" />
              Upload Logo
            </Button>
            <span className="text-xs text-slate-500">PNG, JPG up to 2MB</span>
          </div>
        </div>
      </div>
    </div>
  )
}
