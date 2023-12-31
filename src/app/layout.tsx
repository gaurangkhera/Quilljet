import './globals.css'
import type { Metadata } from 'next'
import Providers from '@/components/Providers'
import Navbar from '@/components/Navbar'
import { Inter } from 'next/font/google'


const font = Inter({ subsets: ['latin']})
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Providers>
      <body className={font.className}>
        <Navbar />
        {children}
      </body>
      </Providers>
    </html>
  )
}
