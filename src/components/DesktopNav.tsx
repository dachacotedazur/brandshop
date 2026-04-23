'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useCartStore } from '@/store/cart'

const navLinks = [
  { href: '/', label: 'Главная' },
  { href: '/catalog', label: 'Каталог' },
  { href: '/yashil-meros', label: 'Yashil Meros' },
]

export default function DesktopNav() {
  const pathname = usePathname()
  const { totalItems } = useCartStore()
  const cartCount = totalItems()

  return (
    <header className="hidden lg:block sticky top-0 z-50 bg-[#182162]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-[#00C875] rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="5.5" fill="white"/>
              <path d="M6.5 9.5L8 11L11.5 7" stroke="#00C875" strokeWidth="1.6"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div className="text-white font-bold text-[16px] leading-none tracking-tight">Brandshop</div>
            <div className="text-white/40 text-[10px] font-medium mt-0.5 leading-none">by Click</div>
          </div>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-1">
          {navLinks.map(link => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-[14px] font-medium rounded-full group"
              >
                <span className={`relative z-10 transition-colors duration-150 ${
                  isActive ? 'text-white' : 'text-white/60 group-hover:text-white'
                }`}>
                  {link.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <circle cx="6.5" cy="6.5" r="4.5" stroke="white" strokeWidth="1.4"/>
              <path d="M10.5 10.5L13 13" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </button>

          <Link href="/wishlist" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M7.5 13S2 9.5 2 5.5A3.5 3.5 0 0 1 7.5 4 3.5 3.5 0 0 1 13 5.5C13 9.5 7.5 13 7.5 13z"
                stroke="white" strokeWidth="1.4"/>
            </svg>
          </Link>

          <Link href="/cart" className="relative w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M2 2h1.5l2.5 8h7l2-5.5H6" stroke="white" strokeWidth="1.4"
                strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="7.5" cy="13" r="1.2" fill="white"/>
              <circle cx="11" cy="13" r="1.2" fill="white"/>
            </svg>
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#00C875] rounded-full text-[#063a1f] text-[8px] font-bold flex items-center justify-center"
              >
                {cartCount}
              </motion.span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}
