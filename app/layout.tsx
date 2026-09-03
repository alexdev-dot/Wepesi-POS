import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Poppins, Inter } from 'next/font/google'
import { ScrollToTop } from '@/components/core/layout/scroll-to-top'
import PWAInstallPrompt from '@/components/core/shared/pwa-install-prompt'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'POS System — Sign In',
  description: 'Smart POS. Simplify Sales. Sign in to continue to your POS dashboard.',
  generator: 'v0.app',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
      },
      {
        url: '/favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'POS System',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: 'white',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`} data-scroll-behavior="smooth">
      <body className="font-sans antialiased">
        <ScrollToTop />
        {children}
        <PWAInstallPrompt />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
