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
    <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 shadow-sm  ">
          <Building className="h-6 w-6" strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground">Business Information</h3>
          <p className="text-sm text-muted-foreground">Update your business details</p>
        </div>
      </div>
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Business Name</label>
          <Input
            type="text"
            value={businessInfo.businessName}
            onChange={(e) => onChange({ ...businessInfo, businessName: e.target.value })}
            className="h-11 text-sm border bg-muted focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Business Type</label>
          <select
            value={businessInfo.businessType}
            onChange={(e) => onChange({ ...businessInfo, businessType: e.target.value })}
            className="h-11 w-full px-4 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          >
            <option value="retail">Retail</option>
            <option value="restaurant">Restaurant</option>
            <option value="service">Service</option>
            <option value="wholesale">Wholesale</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
            <Input
              type="text"
              value={businessInfo.phone}
              onChange={(e) => onChange({ ...businessInfo, phone: e.target.value })}
              className="h-11 text-sm border bg-muted focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
            <Input
              type="email"
              value={businessInfo.email}
              onChange={(e) => onChange({ ...businessInfo, email: e.target.value })}
              className="h-11 text-sm border bg-muted focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Address</label>
          <textarea
            value={businessInfo.address}
            onChange={(e) => onChange({ ...businessInfo, address: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Website Subdomain</label>
          <div className="relative">
            <Input
              type="text"
              value={businessInfo.subdomain}
              onChange={(e) => {
                const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')
                onChange({ ...businessInfo, subdomain: value })
              }}
              className="h-11 text-sm border bg-muted focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all pr-28"
              placeholder="mybusiness"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">.wepesi.com</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Your website will be: <span className="font-medium text-blue-600 ">{businessInfo.subdomain || 'mybusiness'}.wepesi.com</span></p>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Business Logo</label>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="h-11 text-sm border-border text-foreground hover:bg-muted">
              <Upload className="h-4 w-4 mr-2" />
              Upload Logo
            </Button>
            <span className="text-sm text-muted-foreground">PNG, JPG up to 2MB</span>
          </div>
        </div>
      </div>
    </div>
  )
}
