'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/Header'
import ProductCard from '@/components/ProductCard'
import TabBar from '@/components/TabBar'
import { availableProducts, getProductsByCategory } from '@/lib/products'
import type { ProductCategory } from '@/lib/types'

const categories: { id: ProductCategory; label: string; icon: string }[] = [
  { id: 'all',      label: 'Все',      icon: '✦' },
  { id: 'clothing', label: 'Одежда',   icon: '👕' },
  { id: 'leather',  label: 'Кожа',     icon: '🤎' },
  { id: 'eco',      label: 'Эко',      icon: '🌿' },
  { id: 'giftbox',  label: 'Gift Box', icon: '🎁' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all')
  const filtered = getProductsByCategory(activeCategory)

  return (
    <div className="min-h-screen bg-white">

      {/* Mobile header */}
      <Header />

      {/* ============================================================
          DESKTOP LAYOUT
      ============================================================ */}
      <div className="hidden lg:block">

        {/* Page title bar */}
        <div className="bg-[#182162]">
          <div className="max-w-7xl mx-auto px-8 py-8">
            <p className="text-[#00C875] text-[11px] font-bold tracking-[0.2em] uppercase mb-1">
              Click × Kuznetsovs Gallery
            </p>
            <h1 className="text-white text-[36px] font-extrabold tracking-tight">
              Каталог
              <span className="text-white/30 text-[20px] font-medium ml-4">
                {availableProducts.length} товаров
              </span>
            </h1>
          </div>
        </div>

        {/* Main area: sidebar + grid */}
        <div className="max-w-7xl mx-auto px-8 py-10 flex gap-10">

          {/* Sidebar */}
          <aside className="w-56 flex-shrink-0">
            <div className="sticky top-24">

              <p className="text-[#182162] text-[11px] font-bold tracking-[0.15em] uppercase mb-4">
                Категории
              </p>

              <div className="space-y-0.5">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-[14px] font-medium
                                transition-all relative group ${
                      activeCategory === cat.id
                        ? 'text-white'
                        : 'text-gray-500 hover:text-[#182162]'
                    }`}
                  >
                    {activeCategory === cat.id && (
                      <motion.div
                        layoutId="cat-bg"
                        className="absolute inset-0 bg-[#182162] rounded-xl"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center justify-between">
                      {cat.label}
                      {activeCategory === cat.id && (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor"
                            strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="bg-[#0a1f0f] rounded-2xl p-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00C875]" />
                    <span className="text-[#00C875] text-[10px] font-bold tracking-wider uppercase">
                      Yashil Meros
                    </span>
                  </div>
                  <p className="text-white/70 text-[11px] leading-relaxed">
                    Товары с этим знаком участвуют в программе посадки деревьев
                  </p>
                </div>
              </div>

            </div>
          </aside>

          {/* Products grid */}
          <main className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-400 text-[14px]">
                <span className="text-[#182162] font-bold">{filtered.length}</span> товаров
              </p>
              <button className="flex items-center gap-2 text-gray-400 text-[13px] font-medium
                                  hover:text-[#182162] transition-colors">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 4h10M4 7h6M6 10h2" stroke="currentColor" strokeWidth="1.4"
                    strokeLinecap="round"/>
                </svg>
                Сортировка
              </button>
            </div>

            <AnimatePresence mode="wait">
              {filtered.length > 0 ? (
                <motion.div
                  key={activeCategory}
                  className="grid grid-cols-3 gap-5"
                  variants={stagger}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                >
                  {filtered.map(product => (
                    <motion.div key={product.id} variants={fadeUp}>
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-24 text-center"
                >
                  <div className="w-16 h-16 bg-[#f5f5f3] rounded-2xl flex items-center
                                  justify-center mx-auto mb-4">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <rect x="5" y="8" width="18" height="16" rx="2"
                        stroke="#d1d5db" strokeWidth="1.5"/>
                      <path d="M10 8V7a4 4 0 0 1 8 0v1"
                        stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <p className="text-gray-400 text-[14px]">В этой категории пока нет товаров</p>
                </motion.div>
              )}
            </AnimatePresence>
          </main>

        </div>
      </div>

      {/* ============================================================
          MOBILE LAYOUT
      ============================================================ */}
      <div className="lg:hidden max-w-md mx-auto">
        <main className="pb-24">

          {/* Page header */}
          <div className="bg-[#182162] px-5 pt-4 pb-5">
            <h1 className="text-white text-[22px] font-bold tracking-tight mb-1">Каталог</h1>
            <p className="text-white/40 text-[13px]">
              {availableProducts.length} товаров · Click × Kuznetsovs Gallery
            </p>

            {/* Category tabs */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1 scrollbar-none">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-[12px] font-semibold transition-all ${
                    activeCategory === cat.id
                      ? 'bg-[#00C875] text-[#063a1f]'
                      : 'bg-white/10 text-white/60 hover:bg-white/20'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort row */}
          <div className="px-5 py-3 flex items-center justify-between border-b border-gray-100">
            <span className="text-[#182162] text-[13px] font-semibold">
              {filtered.length} товаров
            </span>
            <button className="flex items-center gap-1.5 text-gray-400 text-[12px] font-medium">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 4h10M4 7h6M6 10h2" stroke="#9ca3af" strokeWidth="1.5"
                  strokeLinecap="round"/>
              </svg>
              Фильтр
            </button>
          </div>

          {/* Products grid */}
          <div className="px-5 pt-4 grid grid-cols-2 gap-3">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-20 text-center px-5">
              <div className="w-16 h-16 bg-[#f5f5f3] rounded-2xl flex items-center
                              justify-center mx-auto mb-4">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="5" y="8" width="18" height="16" rx="2"
                    stroke="#d1d5db" strokeWidth="1.5"/>
                  <path d="M10 8V7a4 4 0 0 1 8 0v1"
                    stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <p className="text-gray-400 text-[14px]">В этой категории пока нет товаров</p>
            </div>
          )}

        </main>
      </div>

      <TabBar active="catalog" />
    </div>
  )
}
