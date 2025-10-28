import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ce Spa - Reserva tu experiencia',
  description: 'Sistema integral de reservas y gestión para Ce Spa',
  keywords: ['spa', 'masajes', 'belleza', 'bienestar', 'relajación'],
  authors: [{ name: 'Ce Spa' }],
  openGraph: {
    title: 'Ce Spa',
    description: 'Reserva tu experiencia de relajación',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
