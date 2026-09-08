import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'My app',
  description: 'Built with t-kit',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
