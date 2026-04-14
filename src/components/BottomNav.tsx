'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  {
    href: '/',
    label: 'Главная',
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 10L10 3L17 10M5 8.5V17H8.5V13H11.5V17H15V8.5"
          stroke={active ? '#182162' : '#ccc'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    href: '/catalog',
    label: 'Каталог',
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="6" height="6" rx="1.5" stroke={active ? '#182162' : '#ccc'} strokeWidth="1.5"/>
        <rect x="11" y="3" width="6" height="6" rx="1.5" stroke={active ? '#182162' : '#ccc'} strokeWidth="1.5"/>
        <rect x="3" y="11" width="6" height="6" rx="1.5" stroke={active ? '#182162' : '#ccc'} strokeWidth="1.5"/>
        <rect x="11" y="11" width="6" height="6" rx="1.5" stroke={active ? '#182162' : '#ccc'} strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    href: '/cart',
    label: 'Корзина',
    badge: 0,
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 3h2l2.5 9h8.5l1.5-5H7" stroke={active ? '#182162' : '#ccc'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="16.5" r="1.25" fill={active ? '#182162' : '#ccc'}/>
        <circle cx="13" cy="16.5" r="1.25" fill={active ? '#182162' : '#ccc'}/>
      </svg>
    ),
  },
  {
    href: '/wishlist',
    label: 'Избранное',
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 17s-7-5-7-9.5A4.5 4.5 0 0 1 10 5.3a4.5 4.5 0 0 1 7 2.2C17 12 10 17 10 17z"
          stroke={active ? '#182162' : '#ccc'} strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    href: '/profile',
    label: 'Профиль',
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="7" r="3.5" stroke={active ? '#182162' : '#ccc'} strokeWidth="1.5"/>
        <path d="M3 18c0-4 3-6.5 7-6.5s7 2.5 7 6.5" stroke={active ? '#182162' : '#ccc'} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="bg-white border-t border-gray-100 pb-safe sticky bottom-0 z-40">
      <div className="max-w-md mx-auto grid grid-cols-5">
        {tabs.map((tab) => {
          const active = pathname === tab.href
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center gap-1 py-2.5 relative"
            >
              <div className="relative">
                {tab.icon(active)}
                {tab.badge && tab.badge > 0 ? (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F26B43] rounded-full text-white text-[9px] font-bold flex items-center justify-center">
                    {tab.badge}
                  </span>
                ) : null}
              </div>
              <span className={`text-[9px] font-semibold ${active ? 'text-[#182162]' : 'text-gray-300'}`}>
                {tab.label}
              </span>
              {active && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-[#182162] rounded-full" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
