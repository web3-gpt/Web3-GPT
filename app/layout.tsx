import { Metadata, Viewport } from 'next'

import { Toaster } from 'react-hot-toast'
import { Analytics } from '@vercel/analytics/react'

import '@/app/globals.css'
import { fontMono, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { Header } from '@/components/header'
import { Providers } from '@/components/providers/ui-providers'
import { Web3Provider } from '@/components/providers/web3-provider'

export const runtime = 'edge'

export const metadata: Metadata = {
  metadataBase: new URL('https://w3gpt.ai'),
  title: {
    default: 'Web3 GPT',
    template: `Web3 GPT`
  },
  description: 'Write and deploy smart contracts with AI.',
  icons: {
    icon: '/favicon.png'
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'font-sans antialiased',
          fontSans.variable,
          fontMono.variable
        )}
      >
        <Toaster />
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            <main className="flex flex-1 flex-col bg-muted/50">
              <Web3Provider>
                <Header />
                {children}
              </Web3Provider>
            </main>
          </div>
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
