'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import ProductCard from '@/components/ProductCard'
import TabBar from '@/components/TabBar'
import { availableProducts, getProductsByCategory } from '@/lib/products'
import type { ProductCategory } from '@/lib/types'

const categories: { id: ProductCategory; label: string }[] = [
  { id: 'all',      label: 'Все' },
  { id: 'clothing', label: 'Одежда' },
  { id: 'leather',  label: 'Кожа' },
  { id: 'eco',      label: 'Эко' },
  { id: 'giftbox',  label: 'Gift Box' },
]

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all')
  const filtered = getProductsByCategory(activeCategory)

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto">
      <Header />

      <main className="pb-24">

        {/* Page header */}
        <div className="bg-[#182162] px-5 pt-4 pb-5">
          <h1 className="text-white text-[22px] font-bold tracking-tight mb-1">
            Каталог
          </h1>
          <p className="text-white/40 text-[13px]">
            {availableProducts.length} товаров · Click × Kuznetsovs Gallery
          </p>

          {/* Category tabs */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-[12px] font-semibold
                  transition-all ${
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
              <path d="M2 4h10M4 7h6M6 10h2"
                stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Фильтр
          </button>
        </div>

        {/* Products grid */}
        <div className="px-5 pt-4 grid grid-cols-2 gap-3">
          {filtered.map((product) => (
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
            <p className="text-gray-400 text-[14px]">
              В этой категории пока нет товаров
            </p>
          </div>
        )}

      </main>

      <TabBar active="catalog" />
    </div>
  )
}
