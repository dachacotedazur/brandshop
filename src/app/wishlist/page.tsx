'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import ProductCard from '@/components/ProductCard'
import TabBar from '@/components/TabBar'
import { availableProducts } from '@/lib/products'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
}
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

export default function WishlistPage() {
  // Wishlist is empty for now — show empty state + recommendations
  const recommended = availableProducts.slice(0, 4)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ============================================================
          DESKTOP
      ============================================================ */}
      <div className="hidden lg:block">

        {/* Title bar */}
        <div className="bg-[#182162]">
          <div className="max-w-7xl mx-auto px-8 py-8">
            <p className="text-[#00C875] text-[11px] font-bold tracking-[0.2em] uppercase mb-1">
              Личный список
            </p>
            <h1 className="text-white text-[36px] font-extrabold tracking-tight">Избранное</h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 py-16">

          {/* Empty state */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center py-16 mb-20"
          >
            <div className="w-20 h-20 bg-[#f5f5f3] rounded-3xl flex items-center justify-center mb-6">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <path d="M18 31S4 22 4 12a7 7 0 0 1 14-2.4A7 7 0 0 1 32 12c0 10-14 19-14 19z"
                  stroke="#d1d5db" strokeWidth="1.8" fill="none"/>
              </svg>
            </div>
            <h2 className="text-[#182162] text-[24px] font-bold mb-3 tracking-tight">
              Список избранного пуст
            </h2>
            <p className="text-gray-400 text-[15px] leading-relaxed max-w-sm mb-8">
              Нажмите на ♡ на карточке товара, чтобы сохранить его сюда
            </p>
            <Link
              href="/catalog"
              className="bg-[#182162] text-white font-bold px-8 py-4 rounded-full text-[15px]
                         hover:bg-[#0e1540] transition-colors inline-flex items-center gap-2.5"
            >
              Перейти в каталог
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>

          {/* Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mb-10"
          >
            <p className="text-[#00C875] text-[11px] font-bold tracking-[0.2em] uppercase mb-2">
              Может понравиться
            </p>
            <h2 className="text-[#182162] text-[32px] font-extrabold tracking-tight">
              Популярные товары
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-4 gap-5"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {recommended.map(product => (
              <motion.div key={product.id} variants={fadeUp}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>

      {/* ============================================================
          MOBILE
      ============================================================ */}
      <div className="lg:hidden">
        <main className="pb-24">

          <div className="bg-[#182162]">
            <div className="max-w-md mx-auto px-5 pt-4 pb-5">
              <h1 className="text-white text-[22px] font-bold tracking-tight">Избранное</h1>
            </div>
          </div>

          <div className="py-16 text-center px-5">
            <div className="w-16 h-16 bg-[#f5f5f3] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 24S3 17 3 10a5.5 5.5 0 0 1 11-1.6A5.5 5.5 0 0 1 25 10c0 7-11 14-11 14z"
                  stroke="#d1d5db" strokeWidth="1.5" fill="none"/>
              </svg>
            </div>
            <p className="text-gray-400 text-[14px] mb-4">Здесь будут ваши избранные товары</p>
            <Link href="/catalog"
              className="inline-flex bg-[#182162] text-white text-[13px] font-bold
                         px-6 py-2.5 rounded-full hover:bg-[#0e1540] transition-colors">
              Перейти в каталог
            </Link>
          </div>

        </main>
      </div>

      <TabBar active="wishlist" />
    </div>
  )
}
