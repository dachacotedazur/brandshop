'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { products } from '@/lib/products'
import TabBar from '@/components/TabBar'

function formatPrice(n: number) {
  return new Intl.NumberFormat('ru-RU').format(n)
}

const tagLabels: Record<string, string> = {
  art: 'Арт', eco: 'Eco', limited: 'Лимит', new: 'Новое', leather: 'Кожа', handmade: 'Handmade',
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find(p => p.slug === params.slug)
  if (!product) notFound()

  return (
    <div className="min-h-screen bg-white">

      {/* ============================================================
          DESKTOP LAYOUT
      ============================================================ */}
      <div className="hidden lg:block">
        <div className="max-w-6xl mx-auto px-8 py-12">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[13px] text-gray-400 mb-8">
            <Link href="/" className="hover:text-[#182162] transition-colors">Главная</Link>
            <span>/</span>
            <Link href="/catalog" className="hover:text-[#182162] transition-colors">Каталог</Link>
            <span>/</span>
            <span className="text-[#182162] font-medium">{product.name}</span>
          </div>

          <div className="grid grid-cols-[1fr_1fr] gap-16 items-start">

            {/* Left: image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="sticky top-24"
            >
              <div className="rounded-3xl overflow-hidden aspect-[3/4] relative"
                style={{ backgroundColor: product.imageBg }}>
                {product.image ? (
                  <img src={product.image} alt={product.name}
                    className="w-full h-full object-cover object-top" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center opacity-30">
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                      <rect x="12" y="20" width="56" height="46" rx="4" stroke="white" strokeWidth="2"/>
                      <path d="M26 20 Q40 6 54 20" stroke="white" strokeWidth="2" fill="none"/>
                    </svg>
                  </div>
                )}
                {product.tag && (
                  <span className="absolute top-4 left-4 text-[11px] font-bold px-3 py-1 rounded-full bg-[#F26B43] text-white">
                    {tagLabels[product.tag] ?? product.tag}
                  </span>
                )}
                {product.yashilMeros && (
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5
                                  bg-[#00C875]/20 backdrop-blur-sm rounded-full px-3 py-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#00C875]"/>
                    <span className="text-[#00C875] text-[11px] font-bold">Yashil Meros</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Right: info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {product.collab && (
                <p className="text-gray-400 text-[12px] font-semibold uppercase tracking-wider mb-2">
                  {product.collab}
                </p>
              )}

              <h1 className="text-[#182162] text-[36px] font-extrabold leading-tight tracking-tight mb-4">
                {product.name}
              </h1>

              {/* Price row */}
              <div className="flex items-center gap-4 mb-8">
                <div>
                  <span className="text-[#182162] text-[40px] font-extrabold tracking-tight">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-gray-400 text-[16px] ml-2">сум</span>
                </div>
                {product.cashbackPercent && (
                  <div className="flex items-center gap-1.5 bg-[#00C875]/10 rounded-xl px-3 py-2">
                    <div className="w-2 h-2 rounded-full bg-[#00C875]"/>
                    <span className="text-[#00a060] text-[13px] font-bold">
                      +{product.cashbackPercent}% кешбэк
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="bg-[#f9f8f6] rounded-2xl p-6 mb-6">
                <p className="text-[#182162] text-[14px] font-semibold mb-2">О товаре</p>
                <p className="text-gray-600 text-[15px] leading-relaxed">{product.description}</p>

                <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                  {product.collab && (
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#182162]"/>
                      <span className="text-[13px] text-gray-500">
                        Принт: <span className="text-[#182162] font-medium">{product.collab}</span>
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#182162]"/>
                    <span className="text-[13px] text-gray-500">
                      Фасон: <span className="text-[#182162] font-medium">Унисекс</span>
                    </span>
                  </div>
                  {product.yashilMeros && (
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00C875]"/>
                      <span className="text-[13px] text-gray-500">
                        QR на изделии → <span className="text-[#00a060] font-medium">Yashil Meros</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Cashback note */}
              <div className="flex items-center gap-3 bg-[#00C875]/8 rounded-2xl px-5 py-4 mb-8 border border-[#00C875]/20">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L12.5 8h5.5l-4.5 3.5 1.7 5.5L10 14 4.8 17l1.7-5.5L2 8h5.5L10 2z"
                    fill="#00C875"/>
                </svg>
                <p className="text-[#00a060] text-[14px] font-medium">
                  Оплати через <span className="font-bold">Click Pay</span> — получи кешбэк на следующую покупку
                </p>
              </div>

              {/* CTA */}
              <button className="w-full bg-[#182162] text-white text-[16px] font-bold
                                  py-5 rounded-2xl flex items-center justify-center gap-3
                                  hover:bg-[#0e1540] active:scale-[0.99] transition-all">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 3h2l2.5 8.5h8l2-5.5H7" stroke="white" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="9.5" cy="17" r="1.5" fill="white"/>
                  <circle cx="13.5" cy="17" r="1.5" fill="white"/>
                </svg>
                Купить через Click Pay
              </button>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ============================================================
          MOBILE LAYOUT
      ============================================================ */}
      <div className="lg:hidden">

        {/* Top nav */}
        <div className="bg-[#182162] sticky top-0 z-50">
          <div className="max-w-md mx-auto px-5 py-3.5 flex items-center justify-between">
          <Link href="/catalog" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
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
        </div>

        <main className="pb-32">
          {/* Product image */}
          <div className="relative h-72 flex items-center justify-center"
            style={{ backgroundColor: product.imageBg }}>
            {product.tag && (
              <div className="absolute top-4 left-4 bg-[#F26B43] text-white
                              text-[10px] font-bold px-2.5 py-1 rounded-full">
                {tagLabels[product.tag] ?? product.tag}
              </div>
            )}
            {product.image ? (
              <img src={product.image} alt={product.name}
                className="w-full h-full object-cover object-top" />
            ) : (
              <div className="opacity-30">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <rect x="12" y="20" width="56" height="46" rx="4" stroke="white" strokeWidth="2"/>
                  <path d="M26 20 Q40 6 54 20" stroke="white" strokeWidth="2" fill="none"/>
                </svg>
              </div>
            )}
            {product.yashilMeros && (
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5
                              bg-[#00C875]/20 backdrop-blur-sm rounded-full px-3 py-1">
                <div className="w-2 h-2 rounded-full bg-[#00C875]"/>
                <span className="text-[#00C875] text-[10px] font-bold">Yashil Meros</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="px-5 pt-5">
            {product.collab && (
              <p className="text-gray-400 text-[12px] font-semibold mb-1 uppercase tracking-wider">
                {product.collab}
              </p>
            )}
            <h1 className="text-[#182162] text-[22px] font-bold leading-tight tracking-tight mb-3">
              {product.name}
            </h1>
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
            <div className="bg-[#f9f8f6] rounded-2xl p-4 mb-5">
              <p className="text-[#182162] text-[13px] font-semibold mb-1.5">О товаре</p>
              <p className="text-gray-600 text-[13px] leading-relaxed">{product.description}</p>
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
            <div className="flex items-center gap-3 bg-[#00C875]/8 rounded-xl px-4 py-3 mb-5 border border-[#00C875]/20">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2L11 7h5l-4 3 1.5 5L9 12.5 4.5 15 6 10 2 7h5L9 2z" fill="#00C875"/>
              </svg>
              <p className="text-[#00a060] text-[12px] font-medium">
                Оплати через <span className="font-bold">Click Pay</span> — получи кешбэк
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
              <path d="M3 3h2l2.5 8.5h8l2-5.5H7" stroke="white" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9.5" cy="16" r="1.5" fill="white"/>
              <circle cx="13.5" cy="16" r="1.5" fill="white"/>
            </svg>
            Купить через Click Pay
          </button>
        </div>

      </div>

      <TabBar />
    </div>
  )
}
