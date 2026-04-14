'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [cartCount] = useState(0)

  return (
    <header className="bg-[#182162] sticky top-0 z-50">
      <div className="max-w-md mx-auto px-5 py-3.5 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#00C875] rounded-full flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="5" fill="white"/>
              <path d="M6 8.5L7.5 10L10 6.5" stroke="#00C875" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div className="text-white font-bold text-[15px] leading-none tracking-tight">
              Brandshop
            </div>
            <div className="text-white/40 text-[10px] font-medium mt-0.5 leading-none">
              by Click
            </div>
          </div>
        </Link>

        {/* Icons */}
        <div className="flex items-center gap-3">

          {/* Search */}
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="6" cy="6" r="4" stroke="white" strokeWidth="1.4"/>
              <path d="M9.5 9.5L12 12" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Wishlist */}
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 12s-5-3.5-5-6.5A3 3 0 0 1 7 4.2 3 3 0 0 1 12 5.5C12 8.5 7 12 7 12z" stroke="white" strokeWidth="1.4"/>
            </svg>
          </button>

          {/* Cart */}
          <button className="relative w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2h1.5l2 7h6l1.5-4.5H5.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="7" cy="12" r="1" fill="white"/>
              <circle cx="10" cy="12" r="1" fill="white"/>
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F26B43] rounded-full text-white text-[9px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

        </div>
      </div>
    </header>
  )
}
