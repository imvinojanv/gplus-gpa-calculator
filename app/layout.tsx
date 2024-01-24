import type { Metadata } from 'next'
import { Red_Hat_Display } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { SpeedInsights } from "@vercel/speed-insights/next"

import './globals.css'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'

const redHatDisplay = Red_Hat_Display({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'G Plus: Academic Performance Tracker',
  description: 'The Academic Performance Tracker Application for the undergraduates in Sri Lanka',
  other: {
    'theme-color': '#ffffff',
    'color-scheme': 'light only',
    "keywords": "GPA, Academic Performance Tracker, undergraduates in Sri Lanka, GPA calculator, University",
    "twitter:image": 'https://ik.imagekit.io/vinojan/Personal/gplus-landing-page.png',
    "twitter:card": "summary_large_image",
    "og:title": "G Plus: Academic Performance Tracker",
    "og:description": "The Academic Performance Tracker Application for the undergraduates in Sri Lanka",
    "og:url": "https://gplus.gov.lk",
    "og:image": 'https://ik.imagekit.io/vinojan/Personal/gplus-launch-poster.jpg',
    "og:type": "website",
    "og:site_name": "G Plus: Academic Performance Tracker"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn("min-h-screen bg-white", redHatDisplay.className)}>
          {children}
          <Toaster/>
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  )
}
