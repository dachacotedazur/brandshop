'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import ProductCard from '@/components/ProductCard'
import TabBar from '@/components/TabBar'
import { availableProducts } from '@/lib/products'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

function formatPrice(n: number) {
  return new Intl.NumberFormat('ru-RU').format(n)
}

export default function HomePage() {
  const featured = availableProducts.slice(0, 4)
  const yashilProducts = availableProducts.filter(p => p.yashilMeros).slice(0, 3)

  return (
    <div className="min-h-screen bg-white">

      {/* Mobile header */}
      <Header />

      <main>

        {/* ============================================================
            DESKTOP HERO
        ============================================================ */}
        <section className="hidden lg:flex min-h-[calc(100vh-64px)] bg-[#182162] relative overflow-hidden items-center">

          {/* Ambient blobs */}
          <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-[#00C875]/5
                          blur-[140px] -translate-y-1/3 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-white/3
                          blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

          {/* Dot grid */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }} />

          <div className="max-w-7xl mx-auto px-8 w-full grid grid-cols-2 gap-16 items-center relative z-10">

            {/* Left: headline */}
            <motion.div variants={stagger} initial="hidden" animate="show">

              <motion.div variants={fadeUp} className="flex items-center gap-2.5 mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00C875]" />
                <span className="text-[#00C875] text-[11px] font-bold tracking-[0.2em] uppercase">
                  Click × Kuznetsovs Gallery × Yashil Meros
                </span>
              </motion.div>

              {/* Slide-up lines */}
              {['Носимое', 'искусство', 'Ташкента'].map((word, i) => (
                <div key={word} className="overflow-hidden">
                  <motion.h1
                    initial={{ y: 90 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.75, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                    className={`text-[76px] xl:text-[88px] font-extrabold leading-[0.95] tracking-tight mb-1 ${
                      i === 2 ? 'text-[#00C875]' : 'text-white'
                    }`}
                  >
                    {word}
                  </motion.h1>
                </div>
              ))}

              <motion.p
                variants={fadeUp}
                className="text-white/50 text-[17px] leading-relaxed mt-8 mb-10 max-w-[400px]"
              >
                Арт-коллаборации, кожа ручной работы и эко-инициатива Yashil Meros.
                Каждая покупка — дерево в городе.
              </motion.p>

              <motion.div variants={fadeUp} className="flex gap-4">
                <Link
                  href="/catalog"
                  className="bg-[#00C875] text-[#063a1f] font-bold px-8 py-4 rounded-full text-[15px]
                             hover:bg-[#00b368] active:scale-[0.98] transition-all inline-flex items-center gap-2.5"
                >
                  Смотреть каталог
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6"
                      strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <Link
                  href="/yashil-meros"
                  className="bg-white/10 text-white font-semibold px-8 py-4 rounded-full text-[15px]
                             hover:bg-white/20 transition-all border border-white/10"
                >
                  Yashil Meros
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: product mosaic */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              variants={stagger}
              initial="hidden"
              animate="show"
            >
              {featured.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -2 : 2 }}
                  animate={{
                    opacity: 1,
                    y: [0, 40, -20, 20][i] ?? 0,
                    rotate: i % 2 === 0 ? -1 : 1,
                  }}
                  transition={{ duration: 0.8, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.05, rotate: 0, zIndex: 20, transition: { duration: 0.22 } }}
                  className="rounded-2xl overflow-hidden cursor-pointer shadow-xl shadow-black/20"
                >
                  <Link href={`/product/${product.slug}`} className="block">
                    <div className="h-[180px] xl:h-[210px] relative overflow-hidden"
                      style={{ backgroundColor: product.imageBg }}>
                      {product.image && (
                        <img src={product.image} alt={product.name}
                          className="w-full h-full object-cover object-top" />
                      )}
                      {product.tag && (
                        <span className="absolute top-2.5 left-2.5 text-[9px] font-bold px-2.5 py-1
                                         rounded-full bg-white/20 text-white backdrop-blur-sm">
                          {product.tag === 'art' ? 'Арт' : product.tag === 'eco' ? 'Eco' :
                           product.tag === 'limited' ? 'Лимит' : 'Новое'}
                        </span>
                      )}
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm px-3 py-2.5">
                      <p className="text-white text-[12px] font-semibold leading-tight line-clamp-1">
                        {product.name}
                      </p>
                      <p className="text-[#00C875] text-[11px] font-bold mt-0.5">
                        {formatPrice(product.price)} сум
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-white/30 text-[10px] font-medium tracking-[0.15em] uppercase">Прокрути</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 4v12M5 11l5 5 5-5" stroke="white" strokeOpacity="0.3"
                strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </section>

        {/* ============================================================
            MARQUEE
        ============================================================ */}
        <div className="hidden lg:block bg-[#00C875] py-3.5 overflow-hidden select-none">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(2)].map((_, idx) => (
              <span key={idx} className="inline-flex items-center gap-8 px-8
                                         text-[#063a1f] font-bold text-[12px] tracking-[0.14em] uppercase">
                {[
                  'Носимое Искусство', 'Ташкент', 'Click', 'Kuznetsovs Gallery',
                  'Yashil Meros', 'Кэшбэк до 5%', 'Ручная работа', 'Носимое Искусство',
                  'Ташкент', 'Click', 'Kuznetsovs Gallery', 'Yashil Meros',
                ].map((item, j) => (
                  <span key={j} className="inline-flex items-center gap-8">
                    {item}
                    <span className="text-[#063a1f]/40">✦</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* ============================================================
            DESKTOP: PRODUCTS GRID
        ============================================================ */}
        <section className="hidden lg:block py-24">
          <div className="max-w-7xl mx-auto px-8">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55 }}
              className="flex items-end justify-between mb-12"
            >
              <div>
                <p className="text-[#00C875] text-[11px] font-bold tracking-[0.2em] uppercase mb-2">
                  Актуальное
                </p>
                <h2 className="text-[#182162] text-[40px] font-extrabold tracking-tight leading-none">
                  Популярные товары
                </h2>
              </div>
              <Link
                href="/catalog"
                className="flex items-center gap-2 text-[#182162] font-semibold text-[14px]
                           hover:text-[#00C875] transition-colors group"
              >
                Весь каталог
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                  className="group-hover:translate-x-1 transition-transform">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </motion.div>

            <motion.div
              className="grid grid-cols-4 gap-5"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-100px' }}
            >
              {availableProducts.map(product => (
                <motion.div key={product.id} variants={fadeUp}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ============================================================
            DESKTOP: CASHBACK STRIP
        ============================================================ */}
        <div className="hidden lg:block bg-[#182162]">
          <div className="max-w-7xl mx-auto px-8 py-8 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-[#00C875] rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="1.8"/>
                  <path d="M8 11.5L10 13L14 8.5" stroke="white" strokeWidth="1.8"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-[16px]">Кэшбэк до 5% с Click Pay</p>
                <p className="text-white/40 text-[13px] mt-0.5">
                  Платите через Click — получайте бонусы на следующие покупки
                </p>
              </div>
            </div>
            <div className="bg-[#00C875]/15 border border-[#00C875]/30 rounded-2xl px-8 py-4 text-center">
              <p className="text-[#00C875] text-[32px] font-extrabold leading-none">5%</p>
              <p className="text-[#00C875]/70 text-[11px] font-medium mt-1 uppercase tracking-wider">кэшбэк</p>
            </div>
          </div>
        </div>

        {/* ============================================================
            DESKTOP: YASHIL MEROS
        ============================================================ */}
        <section className="hidden lg:block bg-[#0a1f0f] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#00C875]/5
                          blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#00C875]/3
                          blur-[80px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-8 py-24 grid grid-cols-2 gap-20 items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
            >
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00C875]" />
                <span className="text-[#00C875] text-[11px] font-bold tracking-[0.2em] uppercase">
                  Yashil Meros
                </span>
              </div>
              <h2 className="text-white text-[48px] font-extrabold leading-tight tracking-tight mb-6">
                Каждая покупка —<br />дерево в Ташкенте
              </h2>
              <p className="text-white/50 text-[16px] leading-relaxed mb-10 max-w-[400px]">
                Eco-баллы с каждого заказа идут на посадку деревьев через Click.
                Мы уже изменили облик города.
              </p>
              <Link
                href="/yashil-meros"
                className="inline-flex items-center gap-3 bg-[#00C875] text-[#063a1f] font-bold
                           px-8 py-4 rounded-full text-[15px] hover:bg-[#00b368]
                           active:scale-[0.98] transition-all"
              >
                Узнать больше
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </motion.div>

            <motion.div
              className="grid grid-cols-3 gap-4"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {yashilProducts.map(product => (
                <motion.div
                  key={product.id}
                  variants={fadeUp}
                  whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
                >
                  <Link href={`/product/${product.slug}`} className="block rounded-2xl overflow-hidden group">
                    <div className="aspect-[2/3] relative" style={{ backgroundColor: product.imageBg }}>
                      {product.image && (
                        <img src={product.image} alt={product.name}
                          className="w-full h-full object-cover object-top
                                     group-hover:scale-105 transition-transform duration-500" />
                      )}
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <p className="text-white text-[11px] font-semibold leading-tight">{product.name}</p>
                        <p className="text-[#00C875] text-[10px] font-bold mt-0.5">
                          {formatPrice(product.price)} сум
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ============================================================
            MOBILE LAYOUT
        ============================================================ */}
        <div className="lg:hidden">

          {/* Hero */}
          <div className="bg-[#182162] relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
            <div className="absolute top-10 -right-4 w-28 h-28 rounded-full bg-[#00C875]/10" />
            <div className="max-w-md mx-auto px-5 pt-5 pb-8 relative z-10">
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
                <Link href="/catalog" className="bg-[#00C875] text-[#063a1f] text-[13px] font-bold
                                                  px-5 py-2.5 rounded-full hover:bg-[#00b368]
                                                  active:scale-[0.98] transition-all">
                  Смотреть каталог
                </Link>
                <Link href="/yashil-meros" className="bg-white/10 text-white text-[13px] font-semibold
                                                        px-5 py-2.5 rounded-full hover:bg-white/20
                                                        active:scale-[0.98] transition-all">
                  Yashil Meros
                </Link>
              </div>
            </div>
          </div>

          {/* Cashback banner */}
          <div className="mx-5 mt-4 bg-[#f9f8f6] rounded-2xl px-4 py-3.5 flex items-center gap-3">
            <div className="w-9 h-9 bg-[#00C875] rounded-xl flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="6" stroke="white" strokeWidth="1.5"/>
                <path d="M6.5 9.5L8 11L11.5 7" stroke="white" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"/>
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
              <h2 className="text-[#182162] text-[16px] font-bold tracking-tight">Популярное</h2>
              <Link href="/catalog" className="text-[#00C875] text-[12px] font-semibold">
                Все товары →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {featured.map(product => (
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
              <Link href="/yashil-meros"
                className="inline-flex items-center gap-1.5 bg-[#00C875] text-[#063a1f]
                           text-[12px] font-bold px-4 py-2 rounded-full
                           hover:bg-[#00b368] active:scale-[0.98] transition-all">
                Узнать больше
              </Link>
            </div>
          </div>

          {/* Collections */}
          <div className="px-5 mt-6 pb-6">
            <h2 className="text-[#182162] text-[16px] font-bold tracking-tight mb-3">Коллекции</h2>
            <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
              {[
                { label: 'Задыхаюсь', sub: 'Vozduh', color: '#1a1a2e', href: '/catalog' },
                { label: 'Кожа', sub: 'Мастера Ташкента', color: '#101820', href: '/catalog' },
                { label: 'Эко', sub: 'Yashil Meros', color: '#0d2010', href: '/yashil-meros' },
              ].map(col => (
                <Link key={col.label} href={col.href}
                  className="flex-shrink-0 w-28 h-20 rounded-2xl relative overflow-hidden"
                  style={{ backgroundColor: col.color }}>
                  <div className="absolute inset-0 p-3 flex flex-col justify-end">
                    <p className="text-white text-[11px] font-bold leading-tight">{col.label}</p>
                    <p className="text-white/50 text-[9px] mt-0.5">{col.sub}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

      </main>

      <TabBar active="home" />
    </div>
  )
}
