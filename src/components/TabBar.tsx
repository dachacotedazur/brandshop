'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  {
    id: 'home',
    label: 'Главная',
    href: '/',
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 10L10 3l7 7M5 8.5V17h4v-4h2v4h4V8.5"
          stroke={active ? '#182162' : '#ccc'}
          strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'catalog',
    label: 'Каталог',
    href: '/catalog',
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="6" height="6" rx="1.5"
          stroke={active ? '#182162' : '#ccc'} strokeWidth="1.5"/>
        <rect x="11" y="3" width="6" height="6" rx="1.5"
          stroke={active ? '#182162' : '#ccc'} strokeWidth="1.5"/>
        <rect x="3" y="11" width="6" height="6" rx="1.5"
          stroke={active ? '#182162' : '#ccc'} strokeWidth="1.5"/>
        <rect x="11" y="11" width="6" height="6" rx="1.5"
          stroke={active ? '#182162' : '#ccc'} strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    id: 'cart',
    label: 'Корзина',
    href: '/cart',
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 3h2l2.5 9h8l2-6H7"
          stroke={active ? '#182162' : '#ccc'}
          strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9.5" cy="16.5" r="1.25"
          fill={active ? '#182162' : '#ccc'}/>
        <circle cx="13.5" cy="16.5" r="1.25"
          fill={active ? '#182162' : '#ccc'}/>
      </svg>
    ),
  },
  {
    id: 'wishlist',
    label: 'Избранное',
    href: '/wishlist',
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 17s-7-5-7-9a4 4 0 0 1 7-2.65A4 4 0 0 1 17 8c0 4-7 9-7 9z"
          stroke={active ? '#182162' : '#ccc'}
          strokeWidth="1.5" fill="none"/>
      </svg>
    ),
  },
  {
    id: 'profile',
    label: 'Профиль',
    href: '/profile',
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="7" r="3.5"
          stroke={active ? '#182162' : '#ccc'} strokeWidth="1.5"/>
        <path d="M3 18c0-4 3-6 7-6s7 2 7 6"
          stroke={active ? '#182162' : '#ccc'}
          strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
]

export default function TabBar({ active }: { active?: string }) {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md
                    bg-white border-t border-gray-100 grid grid-cols-5 pb-safe-area z-40">
      {tabs.map((tab) => {
        const isActive = active === tab.id || pathname === tab.href
        return (
          <Link
            key={tab.id}
            href={tab.href}
            className="flex flex-col items-center gap-1 py-2.5 px-1"
          >
            {tab.icon(isActive)}
            <span className={`text-[9px] font-semibold leading-none
              ${isActive ? 'text-[#182162]' : 'text-gray-300'}`}
            >
              {tab.label}
            </span>
            {tab.id === 'cart' && (
              <div className="absolute top-2 left-1/2 translate-x-1.5
                              w-1.5 h-1.5 bg-[#00C875] rounded-full" />
            )}
          </Link>
        )
      })}
    </div>
  )
}
