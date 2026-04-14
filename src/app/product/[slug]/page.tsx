'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { products } from '@/lib/products'
import TabBar from '@/components/TabBar'

function formatPrice(n: number) {
  return new Intl.NumberFormat('ru-RU').format(n)
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find(p => p.slug === params.slug)
  if (!product) notFound()

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto">

      {/* Top nav */}
      <div className="bg-[#182162] px-5 py-3.5 flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 3L5 7l4 4" stroke="white" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <span className="text-white text-[14px] font-semibold">Товар</span>
        <button className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 12s-5-3.5-5-6.5A3 3 0 0 1 7 4.2 3 3 0 0 1 12 5.5C12 8.5 7 12 7 12z"
              stroke="white" strokeWidth="1.4"/>
          </svg>
        </button>
      </div>

      <main className="pb-32">

        {/* Product image */}
        <div className="relative h-72 flex items-center justify-center"
          style={{ backgroundColor: product.imageBg }}>

          {/* Tag */}
          {product.tag && (
            <div className="absolute top-4 left-4 bg-[#F26B43] text-white
                            text-[10px] font-bold px-2.5 py-1 rounded-full">
              {product.tag === 'art' ? 'Арт' :
               product.tag === 'eco' ? 'Eco' :
               product.tag === 'limited' ? 'Лимит' :
               product.tag === 'new' ? 'Новое' : product.tag}
            </div>
          )}

          {/* Placeholder image */}
          <div className="opacity-30">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <rect x="12" y="20" width="56" height="46" rx="4" stroke="white" strokeWidth="2"/>
              <path d="M26 20 Q40 6 54 20" stroke="white" strokeWidth="2" fill="none"/>
            </svg>
          </div>

          {/* Yashil badge */}
          {product.yashilMeros && (
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5
                            bg-[#00C875]/20 backdrop-blur-sm rounded-full px-3 py-1">
              <div className="w-2 h-2 rounded-full bg-[#00C875]"/>
              <span className="text-[#00C875] text-[10px] font-bold">Yashil Meros</span>
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="px-5 pt-5">

          {product.collab && (
            <p className="text-gray-400 text-[12px] font-semibold mb-1 uppercase tracking-wider">
              {product.collab}
            </p>
          )}

          <h1 className="text-[#182162] text-[22px] font-bold leading-tight tracking-tight mb-3">
            {product.name}
          </h1>

          {/* Price row */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <span className="text-[#182162] text-[26px] font-bold tracking-tight">
                {formatPrice(product.price)}
              </span>
              <span className="text-gray-400 text-[14px] ml-1.5">сум</span>
            </div>
            {product.cashbackPercent && (
              <div className="flex items-center gap-1.5 bg-[#00C875]/10 rounded-xl px-3 py-1.5">
                <div className="w-2 h-2 rounded-full bg-[#00C875]"/>
                <span className="text-[#00a060] text-[12px] font-bold">
                  +{product.cashbackPercent}% кешбэк
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="bg-[#f9f8f6] rounded-2xl p-4 mb-5">
            <p className="text-[#182162] text-[13px] font-semibold mb-1.5">О товаре</p>
            <p className="text-gray-600 text-[13px] leading-relaxed">
              {product.description}
            </p>

            {/* Specs */}
            <div className="mt-3 pt-3 border-t border-gray-100 space-y-1.5">
              {product.collab && (
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#182162]"/>
                  <span className="text-[12px] text-gray-500">
                    Принт: <span className="text-[#182162] font-medium">{product.collab}</span>
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#182162]"/>
                <span className="text-[12px] text-gray-500">
                  Фасон: <span className="text-[#182162] font-medium">Унисекс</span>
                </span>
              </div>
              {product.yashilMeros && (
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00C875]"/>
                  <span className="text-[12px] text-gray-500">
                    QR на изделии → <span className="text-[#00a060] font-medium">Yashil Meros</span>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Cashback note */}
          <div className="flex items-center gap-3 bg-[#00C875]/8 rounded-xl px-4 py-3 mb-5
                          border border-[#00C875]/20">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L11 7h5l-4 3 1.5 5L9 12.5 4.5 15 6 10 2 7h5L9 2z"
                fill="#00C875"/>
            </svg>
            <p className="text-[#00a060] text-[12px] font-medium">
              Оплати через <span className="font-bold">Click Pay</span> — получи кешбэк на следующую покупку
            </p>
          </div>

        </div>
      </main>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md
                      bg-white border-t border-gray-100 px-5 py-4 pb-safe-area z-40">
        <button className="w-full bg-[#182162] text-white text-[15px] font-bold
                           py-4 rounded-2xl flex items-center justify-center gap-2
                           hover:bg-[#0e1540] active:scale-[0.98] transition-all">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 3h2l2.5 8.5h8l2-5.5H7"
              stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="9.5" cy="16" r="1.5" fill="white"/>
            <circle cx="13.5" cy="16" r="1.5" fill="white"/>
          </svg>
          Купить через Click Pay
        </button>
      </div>

    </div>
  )
}
