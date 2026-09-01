"use client"

import { useState, useEffect } from "react"
import { Search, ChevronDown, ChevronUp, Mail, Phone, MessageSquare, Book, Video, ExternalLink, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { debounce } from "@/lib/utils-debounce"

const faqCategories = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Book,
    faqs: [
      {
        question: "How do I add my first product?",
        answer: "Navigate to the Products section from the sidebar, click on 'Add Product', fill in the product details including name, price, category, and stock quantity, then click 'Save'."
      },
      {
        question: "How do I process a sale?",
        answer: "Go to the Cash Register, search for or select products from your inventory, adjust quantities if needed, and click 'Complete Sale' to process the transaction."
      },
      {
        question: "How do I set up my business profile?",
        answer: "Visit Settings > Business Settings to update your business name, logo, contact information, and other business details."
      }
    ]
  },
  {
    id: "billing",
    title: "Billing & Subscription",
    icon: Video,
    faqs: [
      {
        question: "How do I view my invoices?",
        answer: "Navigate to the Admin > Billing section to view all your invoices, their status, and download PDF copies."
      },
      {
        question: "How do I change my subscription plan?",
        answer: "Go to Admin > Subscriptions, select the plan you want to upgrade or downgrade to, and follow the payment process."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept M-Pesa, Credit/Debit Cards (Visa, Mastercard), and Bank Transfers for subscription payments."
      }
    ]
  },
  {
    id: "technical",
    title: "Technical Support",
    icon: MessageSquare,
    faqs: [
      {
        question: "The system is running slow, what should I do?",
        answer: "Try clearing your browser cache, ensure you have a stable internet connection, or try accessing from a different browser. If the issue persists, contact support."
      },
      {
        question: "I forgot my password, how do I reset it?",
        answer: "Click on 'Forgot Password' on the login page, enter your email address, and follow the instructions sent to your email to reset your password."
      },
      {
        question: "Can I access the system on mobile?",
        answer: "Yes! Our POS system is fully responsive and works on tablets and mobile devices. Simply log in through your mobile browser."
      }
    ]
  }
]

const supportChannels = [
  {
    icon: Mail,
    title: "Email Support",
    description: "Get help via email within 24 hours",
    contact: "support@wepesi-pos.com",
    color: "bg-blue-50 text-blue-600"
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Call us for immediate assistance",
    contact: "+254 700 000 000",
    color: "bg-green-50 text-green-600"
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Chat with our support team",
    contact: "Available 8 AM - 8 PM EAT",
    color: "bg-purple-50 text-purple-600"
  }
]

const quickLinks = [
  {
    title: "User Guide",
    description: "Complete documentation for using the POS system",
    icon: Book,
    href: "#"
  },
  {
    title: "Video Tutorials",
    description: "Step-by-step video guides",
    icon: Video,
    href: "#"
  },
  {
    title: "API Documentation",
    description: "For developers integrating with our API",
    icon: ExternalLink,
    href: "#"
  }
]

export default function HelpPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedCategory, setExpandedCategory] = useState<string | null>("getting-started")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    const debouncedCheckMobile = debounce(checkMobile, 200)
    checkMobile()
    window.addEventListener('resize', debouncedCheckMobile)
    return () => window.removeEventListener('resize', debouncedCheckMobile)
  }, [])

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen)
  }

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false)
  }

  const handleMenuClick = () => {
    if (isMobile) {
      toggleMobileSidebar()
    } else {
      toggleSidebar()
    }
  }

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId)
  }

  const toggleFaq = (faqIndex: number) => {
    setExpandedFaq(expandedFaq === faqIndex ? null : faqIndex)
  }

  return (
    <div className="flex h-screen bg-background font-sans overflow-hidden">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        currentPath="/help" 
        mobileOpen={mobileSidebarOpen}
        onMobileClose={closeMobileSidebar}
      />
      <div className="flex flex-1 flex-col overflow-hidden font-sans min-w-0">
        <Header onMenuClick={handleMenuClick} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-50">
          {/* Header */}
          <div className="bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2 sm:mb-3">
                Help & Support Center
              </h1>
              <p className="text-sm sm:text-base text-slate-600">
                Find answers to your questions or get in touch with our support team
              </p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Search Bar */}
        <div className="mb-8 sm:mb-12">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search for help articles, FAQs, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl border border-slate-200 bg-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">Quick Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="group flex items-start gap-4 p-4 sm:p-6 bg-white rounded-xl border border-slate-200 hover:border-primary hover:shadow-md transition-all"
              >
                <div className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0`}>
                  <link.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-1">{link.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600">{link.description}</p>
                </div>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400 group-hover:text-primary transition-colors shrink-0 mt-1" />
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqCategories.map((category) => {
              const Icon = category.icon
              const isExpanded = expandedCategory === category.id
              return (
                <div key={category.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm sm:text-base font-semibold text-slate-900">{category.title}</span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-slate-400" />
                    )}
                  </button>
                  {isExpanded && (
                    <div className="border-t border-slate-200 p-4 sm:p-5 space-y-3">
                      {category.faqs.map((faq, faqIndex) => (
                        <div key={faqIndex} className="border-b border-slate-100 last:border-0 pb-3">
                          <button
                            onClick={() => toggleFaq(faqIndex)}
                            className="w-full text-left flex items-center justify-between gap-2"
                          >
                            <span className="text-sm sm:text-base font-medium text-slate-900">{faq.question}</span>
                            {expandedFaq === faqIndex ? (
                              <ChevronUp className="h-4 w-4 text-slate-400 shrink-0" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
                            )}
                          </button>
                          {expandedFaq === faqIndex && (
                            <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">{faq.answer}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Support Channels */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">Contact Support</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {supportChannels.map((channel, index) => (
              <div key={index} className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${channel.color} mb-4`}>
                  <channel.icon className="h-6 w-6" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2">{channel.title}</h3>
                <p className="text-sm text-slate-600 mb-3">{channel.description}</p>
                <p className="text-sm sm:text-base font-medium text-slate-900">{channel.contact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Still Need Help */}
        <div className="bg-linear-to-r from-primary to-emerald-600 rounded-2xl p-6 sm:p-8 text-center text-white">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Still need help?</h2>
          <p className="text-sm sm:text-base mb-4 sm:mb-6 opacity-90">
            Our support team is available 24/7 to assist you with any issues
          </p>
          <button className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-primary rounded-lg font-semibold hover:bg-slate-100 transition-colors text-sm sm:text-base">
            <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
            Start a Live Chat
          </button>
        </div>
      </div>
        </main>
      </div>
    </div>
  )
}
