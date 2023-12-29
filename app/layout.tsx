import type { Metadata } from 'next'
import { Red_Hat_Display } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import './globals.css'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'

const redHatDisplay = Red_Hat_Display({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'G-Plus GPA Calculator',
  description: 'The GPA Calculator Application for the University Students',
  other: {
    'theme-color': '#fff',
    'color-scheme': 'light only',
    "twitter:image": '',
    "twitter:card": "summary_large_image",
    "og:url": "",
    "og:image": '',
    "og:type": "website",
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
        </body>
      </html>
    </ClerkProvider>
  )
}
