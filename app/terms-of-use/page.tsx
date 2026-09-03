"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  Menu,
  X,
  ArrowRight,
  FileText,
  CheckCircle,
  AlertCircle,
  Users,
  Shield,
  Gavel
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function TermsOfUse() {
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
              <Link href="/privacy-policy" className="text-sm sm:text-base font-medium text-white/80 hover:text-white transition-colors">
                Privacy Policy
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
                  href="/privacy-policy"
                  className="block text-lg font-medium text-white/80 hover:text-white transition-colors py-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Privacy Policy
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
                <FileText className="h-8 w-8" />
              </div>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-slate-900">
              Terms of Use
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
                  Agreement to Terms
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  By accessing or using Wepesi POS ("the Service"), you agree to be bound by these Terms of Use ("Terms"). These Terms constitute a legally binding agreement between you and Wepesi POS.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  If you do not agree to these Terms, please do not use our Service. We reserve the right to modify these Terms at any time, and your continued use of the Service constitutes acceptance of any changes.
                </p>
              </div>

              {/* Acceptance of Terms */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
                    Acceptance of Terms
                  </h2>
                </div>
                
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <p className="text-slate-600 leading-relaxed mb-4">
                    By using our Service, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you are using the Service on behalf of a business or entity, you represent that you have the authority to bind that entity to these Terms.
                  </p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>You must be at least 18 years old to use this Service</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>You must provide accurate and complete information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>You are responsible for maintaining account security</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* User Responsibilities */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Users className="h-6 w-6" />
                  </div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
                    User Responsibilities
                  </h2>
                </div>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <h4 className="font-semibold text-slate-900">Account Security</h4>
                    <p className="text-sm text-slate-600">You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <h4 className="font-semibold text-slate-900">Accurate Information</h4>
                    <p className="text-sm text-slate-600">You agree to provide accurate, current, and complete information during registration</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <h4 className="font-semibold text-slate-900">Compliance with Laws</h4>
                    <p className="text-sm text-slate-600">You must comply with all applicable laws and regulations when using our Service</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <h4 className="font-semibold text-slate-900">Prohibited Activities</h4>
                    <p className="text-sm text-slate-600">You may not use the Service for illegal purposes, fraud, or any activity that violates these Terms</p>
                  </div>
                </div>
              </div>

              {/* Prohibited Uses */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
                    Prohibited Uses
                  </h2>
                </div>
                
                <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                  <p className="text-slate-700 leading-relaxed mb-4">
                    You may not use the Service for any of the following purposes:
                  </p>
                  <ul className="space-y-3 text-slate-600">
                    <li className="flex items-start gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shrink-0 mt-0.5">
                        <span className="text-xs">✗</span>
                      </div>
                      <span>Violating any local, state, national, or international law</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shrink-0 mt-0.5">
                        <span className="text-xs">✗</span>
                      </div>
                      <span>Infringing on intellectual property rights of others</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shrink-0 mt-0.5">
                        <span className="text-xs">✗</span>
                      </div>
                      <span>Engaging in fraud, money laundering, or other illegal financial activities</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shrink-0 mt-0.5">
                        <span className="text-xs">✗</span>
                      </div>
                      <span>Transmitting viruses, malware, or harmful code</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shrink-0 mt-0.5">
                        <span className="text-xs">✗</span>
                      </div>
                      <span>Interfering with or disrupting the Service or servers</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shrink-0 mt-0.5">
                        <span className="text-xs">✗</span>
                      </div>
                      <span>Attempting to gain unauthorized access to the Service</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Intellectual Property */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
                    Intellectual Property
                  </h2>
                </div>
                
                <div className="bg-linear-to-r from-primary/5 to-blue-50 rounded-xl p-6 border border-primary/20">
                  <p className="text-slate-700 leading-relaxed mb-4">
                    The Service and its original content, features, and functionality are owned by Wepesi POS and are protected by international copyright, trademark, and other intellectual property laws.
                  </p>
                  <ul className="space-y-3 text-slate-600">
                    <li className="flex items-start gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white shrink-0 mt-0.5">
                        <span className="text-xs">✓</span>
                      </div>
                      <span>You may not copy, modify, or distribute our content without permission</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white shrink-0 mt-0.5">
                        <span className="text-xs">✓</span>
                      </div>
                      <span>Wepesi POS retains all rights to the Service and its content</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white shrink-0 mt-0.5">
                        <span className="text-xs">✓</span>
                      </div>
                      <span>Your business data remains your property</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Payment Terms */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Gavel className="h-6 w-6" />
                  </div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
                    Payment & Subscription Terms
                  </h2>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <h4 className="font-semibold text-slate-900 mb-2">Subscription Plans</h4>
                    <p className="text-sm text-slate-600">We offer various subscription plans with different features and pricing. You agree to pay the fees for your selected plan.</p>
                  </div>
                  
                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <h4 className="font-semibold text-slate-900 mb-2">Payment Methods</h4>
                    <p className="text-sm text-slate-600">We accept various payment methods including M-PESA, credit cards, and bank transfers. All payments are processed securely.</p>
                  </div>
                  
                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <h4 className="font-semibold text-slate-900 mb-2">Refund Policy</h4>
                    <p className="text-sm text-slate-600">Refunds are handled on a case-by-case basis. Please contact our support team for refund requests.</p>
                  </div>
                  
                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <h4 className="font-semibold text-slate-900 mb-2">Cancellation</h4>
                    <p className="text-sm text-slate-600">You may cancel your subscription at any time. Cancellation will take effect at the end of the current billing period.</p>
                  </div>
                </div>
              </div>

              {/* Limitation of Liability */}
              <div className="mb-12">
                <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4 text-slate-900">
                  Limitation of Liability
                </h2>
                
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <p className="text-slate-600 leading-relaxed mb-4">
                    To the maximum extent permitted by law, Wepesi POS shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or other intangible losses, resulting from:
                  </p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Your access to or use of or inability to access or use the Service</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Any conduct or content of any third party on the Service</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Any content obtained from the Service</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Unauthorized access, use, or alteration of your transmissions or content</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Termination */}
              <div className="mb-12">
                <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4 text-slate-900">
                  Termination
                </h2>
                
                <p className="text-slate-600 leading-relaxed mb-4">
                  We reserve the right to terminate or suspend your account and access to the Service at our sole discretion, without prior notice, for any reason, including but not limited to:
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                    <h4 className="font-semibold text-slate-900 mb-2">Violation of Terms</h4>
                    <p className="text-sm text-slate-600">Breach of these Terms of Use</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                    <h4 className="font-semibold text-slate-900 mb-2">Fraudulent Activity</h4>
                    <p className="text-sm text-slate-600">Engagement in fraudulent or illegal activities</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                    <h4 className="font-semibold text-slate-900 mb-2">Non-Payment</h4>
                    <p className="text-sm text-slate-600">Failure to pay subscription fees</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                    <h4 className="font-semibold text-slate-900 mb-2">Service Changes</h4>
                    <p className="text-sm text-slate-600">Discontinuation or modification of the Service</p>
                  </div>
                </div>
              </div>

              {/* Governing Law */}
              <div className="mb-12">
                <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4 text-slate-900">
                  Governing Law
                </h2>
                
                <div className="bg-linear-to-r from-primary/10 to-blue-50 rounded-xl p-6 border border-primary/20">
                  <p className="text-slate-700 leading-relaxed mb-4">
                    These Terms shall be governed by and construed in accordance with the laws of Kenya, without regard to its conflict of law provisions.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    Any disputes arising from these Terms or your use of the Service shall be resolved through arbitration in Nairobi, Kenya, in accordance with the rules of the Kenya Arbitration Centre.
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-12">
                <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-6 text-slate-900">
                  Contact Us
                </h2>
                
                <div className="bg-linear-to-r from-primary/10 to-blue-50 rounded-xl p-6 border border-primary/20">
                  <p className="text-slate-700 leading-relaxed mb-4">
                    If you have any questions about these Terms of Use, please contact us:
                  </p>
                  <div className="space-y-2 text-slate-600">
                    <p><strong>Email:</strong> wepesipos@gmail.com</p>
                    <p><strong>Phone:</strong> +254 712345678</p>
                    <p><strong>Address:</strong> Nairobi, Kenya</p>
                  </div>
                </div>
              </div>

              {/* Changes to Terms */}
              <div className="mb-12">
                <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4 text-slate-900">
                  Changes to These Terms
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  We may update these Terms of Use from time to time. We will notify you of any changes by posting the new Terms on this page and updating the "Last updated" date. Your continued use of the Service after such changes constitutes your acceptance of the new Terms.
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
