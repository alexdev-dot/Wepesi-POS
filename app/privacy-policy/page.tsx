"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  Menu,
  X,
  ArrowRight,
  Shield,
  Lock,
  Eye,
  Database,
  UserCheck,
  FileText
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function PrivacyPolicy() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-navy border-b border-slate-200 backdrop-blur-sm">
        <div className="container mx-auto flex h-24 items-center justify-between px-6 lg:px-8">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="POS System Logo"
                width={600}
                height={200}
                className="h-20 md:h-24 w-auto object-contain"
                priority
              />
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <Link href="/" className="text-sm sm:text-base font-medium text-white/80 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/terms-of-use" className="text-sm sm:text-base font-medium text-white/80 hover:text-white transition-colors">
                Terms of Use
              </Link>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" className="text-sm sm:text-base font-medium text-white hover:bg-white/10 h-10 sm:h-11 px-4 sm:px-5">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="text-sm sm:text-base font-medium bg-primary hover:bg-primary/90 h-10 sm:h-11 px-4 sm:px-5 rounded-full">
                  Get Started
                </Button>
              </Link>
            </div>
            <motion.button
              className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-white/10 bg-navy overflow-hidden"
            >
              <div className="container mx-auto px-6 py-6 space-y-4">
                <Link
                  href="/"
                  className="block text-lg font-medium text-white/80 hover:text-white transition-colors py-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/terms-of-use"
                  className="block text-lg font-medium text-white/80 hover:text-white transition-colors py-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Terms of Use
                </Link>
                <div className="pt-4 space-y-3">
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full text-lg font-medium text-white hover:bg-white/10 h-12">
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full text-lg font-medium bg-primary hover:bg-primary/90 h-12 rounded-full">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Header Section */}
      <section className="bg-linear-to-br from-blue-50 via-white to-indigo-50 py-16 md:py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Shield className="h-8 w-8" />
              </div>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-slate-900">
              Privacy Policy
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Last updated: January 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="prose prose-slate max-w-none"
            >
              {/* Introduction */}
              <div className="mb-12">
                <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4 text-slate-900">
                  Introduction
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  At Wepesi POS ("we," "our," or "us"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Point of Sale (POS) software and services.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Please read this Privacy Policy carefully. By using our services, you agree to the collection and use of information in accordance with this policy.
                </p>
              </div>

              {/* Information We Collect */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Database className="h-6 w-6" />
                  </div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
                    Information We Collect
                  </h2>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <h3 className="font-semibold text-lg text-slate-900 mb-3">Personal Information</h3>
                    <ul className="space-y-2 text-slate-600">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Name, email address, phone number, and contact details</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Business information (business name, address, registration details)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Payment and billing information</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <h3 className="font-semibold text-lg text-slate-900 mb-3">Business Data</h3>
                    <ul className="space-y-2 text-slate-600">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Product inventory and sales data</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Customer information and purchase history</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Employee and staff data</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Financial transactions and reports</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <h3 className="font-semibold text-lg text-slate-900 mb-3">Technical Information</h3>
                    <ul className="space-y-2 text-slate-600">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Device information (IP address, browser type, operating system)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Usage data and log files</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Cookies and similar tracking technologies</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How We Use Your Information */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Eye className="h-6 w-6" />
                  </div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
                    How We Use Your Information
                  </h2>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                      <span className="text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Service Provision</h4>
                      <p className="text-sm text-slate-600">To provide, maintain, and improve our POS services</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                      <span className="text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Account Management</h4>
                      <p className="text-sm text-slate-600">To manage your account and provide customer support</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                      <span className="text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Security & Fraud Prevention</h4>
                      <p className="text-sm text-slate-600">To protect against fraud and ensure security</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                      <span className="text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Analytics & Improvement</h4>
                      <p className="text-sm text-slate-600">To analyze usage patterns and improve our services</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                      <span className="text-sm font-bold">5</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Legal Compliance</h4>
                      <p className="text-sm text-slate-600">To comply with legal obligations and regulations</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                      <span className="text-sm font-bold">6</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Communication</h4>
                      <p className="text-sm text-slate-600">To send important updates and service-related communications</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Security */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Lock className="h-6 w-6" />
                  </div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
                    Data Security
                  </h2>
                </div>
                
                <div className="bg-linear-to-r from-primary/5 to-blue-50 rounded-xl p-6 border border-primary/20">
                  <p className="text-slate-700 leading-relaxed mb-4">
                    We implement industry-standard security measures to protect your information:
                  </p>
                  <ul className="space-y-3 text-slate-600">
                    <li className="flex items-start gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white shrink-0 mt-0.5">
                        <span className="text-xs">✓</span>
                      </div>
                      <span>SSL/TLS encryption for data in transit</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white shrink-0 mt-0.5">
                        <span className="text-xs">✓</span>
                      </div>
                      <span>Secure data storage with encryption at rest</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white shrink-0 mt-0.5">
                        <span className="text-xs">✓</span>
                      </div>
                      <span>Regular security audits and vulnerability assessments</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white shrink-0 mt-0.5">
                        <span className="text-xs">✓</span>
                      </div>
                      <span>Access controls and authentication mechanisms</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white shrink-0 mt-0.5">
                        <span className="text-xs">✓</span>
                      </div>
                      <span>Regular data backups and disaster recovery procedures</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Data Sharing */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <UserCheck className="h-6 w-6" />
                  </div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
                    Data Sharing & Disclosure
                  </h2>
                </div>
                
                <p className="text-slate-600 leading-relaxed mb-6">
                  We do not sell your personal information. We may share your information only in the following circumstances:
                </p>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <h4 className="font-semibold text-slate-900">With Your Consent</h4>
                    <p className="text-sm text-slate-600">When you explicitly consent to the sharing</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <h4 className="font-semibold text-slate-900">Service Providers</h4>
                    <p className="text-sm text-slate-600">With trusted third-party service providers who assist in operating our services</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <h4 className="font-semibold text-slate-900">Legal Requirements</h4>
                    <p className="text-sm text-slate-600">When required by law, court order, or government authorities</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <h4 className="font-semibold text-slate-900">Business Transfers</h4>
                    <p className="text-sm text-slate-600">In connection with a merger, acquisition, or sale of assets</p>
                  </div>
                </div>
              </div>

              {/* Your Rights */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FileText className="h-6 w-6" />
                  </div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
                    Your Privacy Rights
                  </h2>
                </div>
                
                <p className="text-slate-600 leading-relaxed mb-6">
                  You have the following rights regarding your personal information:
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                    <h4 className="font-semibold text-slate-900 mb-2">Access</h4>
                    <p className="text-sm text-slate-600">Request access to your personal information</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                    <h4 className="font-semibold text-slate-900 mb-2">Correction</h4>
                    <p className="text-sm text-slate-600">Request correction of inaccurate information</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                    <h4 className="font-semibold text-slate-900 mb-2">Deletion</h4>
                    <p className="text-sm text-slate-600">Request deletion of your personal information</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                    <h4 className="font-semibold text-slate-900 mb-2">Portability</h4>
                    <p className="text-sm text-slate-600">Request transfer of your data to another service</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                    <h4 className="font-semibold text-slate-900 mb-2">Objection</h4>
                    <p className="text-sm text-slate-600">Object to processing of your information</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                    <h4 className="font-semibold text-slate-900 mb-2">Restriction</h4>
                    <p className="text-sm text-slate-600">Request restriction of processing</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-12">
                <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-6 text-slate-900">
                  Contact Us
                </h2>
                
                <div className="bg-linear-to-r from-primary/10 to-blue-50 rounded-xl p-6 border border-primary/20">
                  <p className="text-slate-700 leading-relaxed mb-4">
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="space-y-2 text-slate-600">
                    <p><strong>Email:</strong> wepesipos@gmail.com</p>
                    <p><strong>Phone:</strong> +254 712345678</p>
                    <p><strong>Address:</strong> Nairobi, Kenya</p>
                  </div>
                </div>
              </div>

              {/* Policy Updates */}
              <div className="mb-12">
                <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4 text-slate-900">
                  Changes to This Policy
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are encouraged to review this Privacy Policy periodically for any changes.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary text-white">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto mb-8"
          >
            Join thousands of businesses using Wepesi POS to streamline their operations.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/signup">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-base font-semibold h-12 px-8 w-full sm:w-auto rounded-full">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className="text-sm sm:text-base text-slate-600 mb-4">
              © 2026 Wepesi POS. All rights reserved.
            </div>
            <div className="flex justify-center gap-6">
              <Link href="/privacy-policy" className="text-sm text-slate-600 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-use" className="text-sm text-slate-600 hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  )
}
