import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'
import DesktopNav from '@/components/DesktopNav'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Click Brandshop',
  description: 'Носимое искусство Ташкента. Click × Kuznetsovs Gallery × Yashil Meros.',
  openGraph: {
    title: 'Click Brandshop',
    description: 'Носимое искусство Ташкента.',
    siteName: 'Click Brandshop',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={`${manrope.variable} font-sans bg-white antialiased`}>
        <DesktopNav />
        {children}
      </body>
    </html>
  )
}
