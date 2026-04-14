'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import ProductCard from '@/components/ProductCard'
import TabBar from '@/components/TabBar'
import { availableProducts } from '@/lib/products'

export default function HomePage() {
  const featured = availableProducts.slice(0, 4)

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto">
      <Header />

      <main className="pb-24">

        {/* Hero */}
        <div className="bg-[#182162] px-5 pt-5 pb-8 relative overflow-hidden">
          {/* Декоративные круги */}
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
          <div className="absolute top-10 -right-4 w-28 h-28 rounded-full bg-[#00C875]/10" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00C875]" />
              <span className="text-[#00C875] text-[11px] font-bold tracking-widest uppercase">
                Click × Kuznetsovs Gallery
              </span>
            </div>

            <h1 className="text-white text-[28px] font-bold leading-tight tracking-tight mb-2">
              Носимое<br />искусство<br />Ташкента
            </h1>

            <p className="text-white/50 text-[13px] leading-relaxed mb-6 max-w-[240px]">
              Арт-коллаборации, кожа ручной работы и эко-инициатива Yashil Meros
            </p>

            <div className="flex gap-3">
              <Link
                href="/catalog"
                className="bg-[#00C875] text-[#063a1f] text-[13px] font-bold px-5 py-2.5
                           rounded-full hover:bg-[#00b368] active:scale-[0.98] transition-all"
              >
                Смотреть каталог
              </Link>
              <Link
                href="/yashil-meros"
                className="bg-white/10 text-white text-[13px] font-semibold px-5 py-2.5
                           rounded-full hover:bg-white/20 active:scale-[0.98] transition-all"
              >
                Yashil Meros
              </Link>
            </div>
          </div>
        </div>

        {/* Click Pay Cashback banner */}
        <div className="mx-5 mt-4 bg-[#f9f8f6] rounded-2xl px-4 py-3.5 flex items-center gap-3">
          <div className="w-9 h-9 bg-[#00C875] rounded-xl flex items-center justify-center flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="6" stroke="white" strokeWidth="1.5"/>
              <path d="M6.5 9.5L8 11L11.5 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[#182162] text-[12px] font-bold leading-tight">
              Кэшбэк до 5% с Click Pay
            </p>
            <p className="text-gray-400 text-[11px] mt-0.5 leading-tight">
              Платите через Click — получайте бонусы
            </p>
          </div>
          <span className="text-[#00C875] text-[11px] font-bold flex-shrink-0">5%</span>
        </div>

        {/* Featured products */}
        <div className="px-5 mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[#182162] text-[16px] font-bold tracking-tight">
              Популярное
            </h2>
            <Link href="/catalog" className="text-[#00C875] text-[12px] font-semibold">
              Все товары →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Yashil Meros banner */}
        <div className="mx-5 mt-6 bg-[#0d2010] rounded-2xl px-5 py-5 relative overflow-hidden">
          <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-[#00C875]/10" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-[#00C875]" />
              <span className="text-[#00C875] text-[10px] font-bold tracking-widest uppercase">
                Yashil Meros
              </span>
            </div>
            <p className="text-white text-[14px] font-bold leading-tight mb-1">
              Каждая покупка —<br />дерево в Ташкенте
            </p>
            <p className="text-white/50 text-[12px] leading-relaxed mb-4">
              Eco-баллы с каждого заказа идут на посадку деревьев через Click
            </p>
            <Link
              href="/yashil-meros"
              className="inline-flex items-center gap-1.5 bg-[#00C875] text-[#063a1f]
                         text-[12px] font-bold px-4 py-2 rounded-full
                         hover:bg-[#00b368] active:scale-[0.98] transition-all"
            >
              Узнать больше
            </Link>
          </div>
        </div>

        {/* Collections row */}
        <div className="px-5 mt-6">
          <h2 className="text-[#182162] text-[16px] font-bold tracking-tight mb-3">
            Коллекции
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
            {[
              { label: 'Задыхаюсь', sub: 'Vozduh', color: '#1a1a2e', href: '/catalog?collection=vozduh' },
              { label: 'Кожа', sub: 'Мастера Ташкента', color: '#101820', href: '/catalog' },
              { label: 'Эко', sub: 'Yashil Meros', color: '#0d2010', href: '/yashil-meros' },
            ].map((col) => (
              <Link
                key={col.label}
                href={col.href}
                className="flex-shrink-0 w-28 h-20 rounded-2xl relative overflow-hidden"
                style={{ backgroundColor: col.color }}
              >
                <div className="absolute inset-0 p-3 flex flex-col justify-end">
                  <p className="text-white text-[11px] font-bold leading-tight">{col.label}</p>
                  <p className="text-white/50 text-[9px] mt-0.5">{col.sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </main>

      <TabBar active="home" />
    </div>
  )
}
