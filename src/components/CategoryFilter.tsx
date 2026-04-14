'use client'

import { useState } from 'react'
import type { ProductCategory } from '@/lib/types'

const categories: { id: ProductCategory; label: string; labelUz: string; icon: string }[] = [
  { id: 'all',      label: 'Все',      labelUz: 'Hammasi', icon: '▤' },
  { id: 'clothing', label: 'Одежда',   labelUz: 'Kiyim',   icon: '◈' },
  { id: 'leather',  label: 'Кожа',     labelUz: 'Teri',    icon: '◇' },
  { id: 'eco',      label: 'Эко',      labelUz: 'Eko',     icon: '◉' },
  { id: 'giftbox',  label: 'Gift Box', labelUz: 'Sovg\'a', icon: '◫' },
]

interface Props {
  onSelect: (category: ProductCategory) => void
  selected: ProductCategory
}

export default function CategoryFilter({ onSelect, selected }: Props) {
  return (
    <div className="px-4 pt-5 pb-0">

      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[#182162] font-bold text-[15px] tracking-tight">
          Каталог
        </h2>
        <span className="text-[#00C875] text-[12px] font-semibold">
          Все товары →
        </span>
      </div>

      <div className="flex gap-2.5 overflow-x-auto scroll-hide pb-3">
        {categories.map((cat) => {
          const isActive = selected === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`
                flex-shrink-0 rounded-xl px-3.5 py-2.5 text-center transition-all duration-200
                ${isActive
                  ? 'bg-[#182162] text-white'
                  : 'bg-[#f5f5f3] text-[#182162] hover:bg-[#e8e8e5]'
                }
              `}
            >
              <div className={`
                w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-1.5 text-base
                ${isActive ? 'bg-[#00C875]' : 'bg-[#182162]'}
              `}>
                <span className="text-white text-[13px]">{cat.icon}</span>
              </div>
              <div className={`text-[10px] font-semibold leading-none ${isActive ? 'text-white' : 'text-[#182162]'}`}>
                {cat.label}
              </div>
            </button>
          )
        })}
      </div>

    </div>
  )
}
