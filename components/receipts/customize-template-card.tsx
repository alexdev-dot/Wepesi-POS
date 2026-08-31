"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, Copy, Check, X, Upload, Building2, FileText, Settings, Layout, Palette, Image as ImageIcon } from "lucide-react"

interface CustomizeTemplateCardProps {
  onPreviewClick: (backReceiptData: {
    title: string
    text: string
    email: string
    website: string
  }) => void
}

export function CustomizeTemplateCard({ onPreviewClick }: CustomizeTemplateCardProps) {
  const [showContactInfo, setShowContactInfo] = useState(true)
  const [showBarcode, setShowBarcode] = useState(true)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [fontSize, setFontSize] = useState("Medium")
  const [backReceiptTitle, setBackReceiptTitle] = useState("Return Policy")
  const [backReceiptText, setBackReceiptText] = useState("Returns accepted within 7 days with original receipt")
  const [backContactEmail, setBackContactEmail] = useState("support@mybusiness.com")
  const [backContactWebsite, setBackContactWebsite] = useState("www.mybusiness.com")

  const handleSaveChanges = () => {
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 3000)
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-100 bg-linear-to-r from-slate-50 to-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Settings className="h-5 w-5" strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">Customize Template</h3>
              <p className="text-sm text-slate-500 mt-0.5">Personalize your receipt design</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-9 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all"
              onClick={() => onPreviewClick({
                title: backReceiptTitle,
                text: backReceiptText,
                email: backContactEmail,
                website: backContactWebsite
              })}
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline" size="sm" className="h-9 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all">
              <Copy className="h-4 w-4 mr-2" />
              Duplicate
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Branding Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Palette className="h-4 w-4 text-blue-600" strokeWidth={2} />
            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Branding</h4>
          </div>
          <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {/* Logo Upload */}
            <div className="col-span-full sm:col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">Logo</label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-blue-300 hover:bg-blue-50/50 transition-all cursor-pointer group">
                <Upload className="h-10 w-10 text-slate-400 mx-auto mb-3 group-hover:text-blue-500 transition-colors" />
                <p className="text-sm font-medium text-slate-600">Click to upload logo</p>
                <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 2MB</p>
              </div>
            </div>

            {/* Business Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Business Name</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  defaultValue="My Business"
                  className="h-11 pl-10 pr-4 text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all"
                />
              </div>
            </div>

            {/* Footer Text */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Footer Text</label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  defaultValue="Thank you for your business!"
                  className="h-11 pl-10 pr-4 text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Layout Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Layout className="h-4 w-4 text-blue-600" strokeWidth={2} />
            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Layout & Display</h4>
          </div>
          <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {/* Show Contact Info Toggle */}
            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all">
              <div>
                <label className="block text-sm font-medium text-slate-700">Contact Info</label>
                <p className="text-xs text-slate-500 mt-0.5">Show business contact details</p>
              </div>
              <button
                onClick={() => setShowContactInfo(!showContactInfo)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  showContactInfo ? "bg-blue-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                    showContactInfo ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Show Barcode Toggle */}
            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all">
              <div>
                <label className="block text-sm font-medium text-slate-700">Barcode</label>
                <p className="text-xs text-slate-500 mt-0.5">Include transaction barcode</p>
              </div>
              <button
                onClick={() => setShowBarcode(!showBarcode)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  showBarcode ? "bg-blue-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                    showBarcode ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Font Size */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Font Size</label>
              <select 
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="w-full h-11 px-4 text-sm rounded-xl bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all cursor-pointer hover:border-slate-300"
              >
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
          </div>
        </div>

        {/* Back of Receipt Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <ImageIcon className="h-4 w-4 text-blue-600" strokeWidth={2} />
            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Back of Receipt</h4>
          </div>
          <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2">
            {/* Back Image Upload */}
            <div className="col-span-full sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Back Image</label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-blue-300 hover:bg-blue-50/50 transition-all cursor-pointer group">
                <ImageIcon className="h-10 w-10 text-slate-400 mx-auto mb-3 group-hover:text-blue-500 transition-colors" />
                <p className="text-sm font-medium text-slate-600">Upload back of receipt image</p>
                <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB (appears on reverse side of receipt)</p>
              </div>
            </div>

            {/* Back Receipt Title */}
            <div className="col-span-full sm:col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">Section Title</label>
              <Input
                type="text"
                value={backReceiptTitle}
                onChange={(e) => setBackReceiptTitle(e.target.value)}
                className="h-11 px-4 text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all"
              />
            </div>

            {/* Back Receipt Text */}
            <div className="col-span-full sm:col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">Policy Text</label>
              <Input
                type="text"
                value={backReceiptText}
                onChange={(e) => setBackReceiptText(e.target.value)}
                className="h-11 px-4 text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all"
              />
            </div>

            {/* Contact Email */}
            <div className="col-span-full sm:col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">Contact Email</label>
              <Input
                type="text"
                value={backContactEmail}
                onChange={(e) => setBackContactEmail(e.target.value)}
                className="h-11 px-4 text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all"
              />
            </div>

            {/* Contact Website */}
            <div className="col-span-full sm:col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">Website</label>
              <Input
                type="text"
                value={backContactWebsite}
                onChange={(e) => setBackContactWebsite(e.target.value)}
                className="h-11 px-4 text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50">
        {showSuccessMessage && (
          <div className="mb-4 flex items-center gap-2 text-green-600 bg-green-50 border border-green-200 rounded-lg px-4 py-3 animate-in fade-in slide-in-from-top-2">
            <Check className="h-4 w-4" />
            <span className="text-sm font-medium">Template saved successfully!</span>
          </div>
        )}
        <div className="flex gap-3 justify-end">
          <Button variant="outline" className="w-36 h-11 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-all font-medium">
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button className="w-36 h-11 bg-blue-600 hover:bg-blue-700 text-sm font-semibold shadow-sm hover:shadow-md transition-all" onClick={handleSaveChanges}>
            <Check className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
