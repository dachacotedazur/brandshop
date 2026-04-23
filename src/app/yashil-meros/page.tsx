'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import ProductCard from '@/components/ProductCard'
import TabBar from '@/components/TabBar'
import { availableProducts } from '@/lib/products'

const yashilProducts = availableProducts.filter(p => p.yashilMeros)

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
}
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const stats = [
  { value: '10 000+', label: 'деревьев посажено' },
  { value: '5×',      label: 'рост участников' },
  { value: '2022',    label: 'год запуска' },
]

const steps = [
  { step: '01', title: 'Покупаешь товар',     body: 'Любой товар коллекции Yashil Meros или любая оплата через Click' },
  { step: '02', title: 'Получаешь эко-баллы', body: 'Баллы начисляются автоматически на твой аккаунт Click' },
  { step: '03', title: 'Сажаешь дерево',      body: 'Активируй баллы — и дерево с твоим именем появится в Ташкенте' },
]

export default function YashilMerosPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ============================================================
          DESKTOP
      ============================================================ */}
      <div className="hidden lg:block">

        {/* Hero */}
        <section className="bg-[#0a1f0f] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#00C875]/8
                          blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#00C875]/5
                          blur-[100px] -translate-x-1/4 translate-y-1/4 pointer-events-none" />

          {/* Dot grid */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle, rgba(0,200,117,0.06) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />

          <div className="max-w-7xl mx-auto px-8 py-24 relative z-10">
            <motion.div
              variants={stagger} initial="hidden" animate="show"
              className="max-w-3xl"
            >
              <motion.div variants={fadeUp} className="flex items-center gap-2.5 mb-6">
                <div className="w-10 h-10 bg-[#00C875] rounded-2xl flex items-center justify-center">
                  <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
                    <path d="M14 4C10 4 6 7 6 11c0 2.5 1.5 4.5 3.5 5.8V24h9v-7.2C20.5 15.5 22 13.5 22 11c0-4-4-7-8-7z"
                      fill="white" opacity="0.9"/>
                  </svg>
                </div>
                <span className="text-[#00C875] text-[11px] font-bold tracking-[0.2em] uppercase">
                  Экологический проект Click
                </span>
              </motion.div>

              <div className="overflow-hidden mb-1">
                <motion.h1
                  initial={{ y: 80 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[72px] font-extrabold leading-none tracking-tight text-white"
                >
                  Yashil Meros
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-8">
                <motion.h2
                  initial={{ y: 60 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[72px] font-extrabold leading-none tracking-tight text-[#00C875]"
                >
                  Зелёное наследие
                </motion.h2>
              </div>

              <motion.p variants={fadeUp} className="text-white/55 text-[18px] leading-relaxed max-w-[520px]">
                Каждое действие в приложении Click приносит эко-баллы — они идут
                на посадку деревьев в Ташкенте. Покупай, получай баллы, сажай.
              </motion.p>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-6 mt-14 max-w-2xl"
              variants={stagger} initial="hidden" animate="show"
            >
              {stats.map(s => (
                <motion.div key={s.label} variants={fadeUp}
                  className="border border-[#00C875]/20 rounded-2xl p-6">
                  <p className="text-[#00C875] text-[40px] font-extrabold leading-none tracking-tight mb-1">
                    {s.value}
                  </p>
                  <p className="text-white/50 text-[13px] font-medium">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="mb-12"
            >
              <p className="text-[#00C875] text-[11px] font-bold tracking-[0.2em] uppercase mb-2">Механика</p>
              <h2 className="text-[#182162] text-[40px] font-extrabold tracking-tight">Как это работает</h2>
            </motion.div>

            <motion.div
              className="grid grid-cols-3 gap-8"
              variants={stagger} initial="hidden"
              whileInView="show" viewport={{ once: true }}
            >
              {steps.map((item, i) => (
                <motion.div key={item.step} variants={fadeUp}
                  className="relative">
                  {/* Connector line */}
                  {i < steps.length - 1 && (
                    <div className="absolute top-8 left-[calc(100%_-_16px)] w-full h-px
                                    bg-gradient-to-r from-[#182162]/20 to-transparent z-10" />
                  )}
                  <div className="bg-[#f9f8f6] rounded-3xl p-8 h-full">
                    <div className="w-14 h-14 bg-[#182162] rounded-2xl flex items-center justify-center mb-6">
                      <span className="text-white font-bold text-[15px]">{item.step}</span>
                    </div>
                    <h3 className="text-[#182162] text-[20px] font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-500 text-[15px] leading-relaxed">{item.body}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Products */}
        {yashilProducts.length > 0 && (
          <section className="py-24 bg-[#f9f8f6]">
            <div className="max-w-7xl mx-auto px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="flex items-end justify-between mb-12"
              >
                <div>
                  <p className="text-[#00C875] text-[11px] font-bold tracking-[0.2em] uppercase mb-2">
                    Коллекция
                  </p>
                  <h2 className="text-[#182162] text-[40px] font-extrabold tracking-tight">
                    Товары Yashil Meros
                  </h2>
                </div>
                <Link href="/catalog"
                  className="flex items-center gap-2 text-[#182162] font-semibold text-[14px]
                             hover:text-[#00C875] transition-colors group">
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
                variants={stagger} initial="hidden"
                whileInView="show" viewport={{ once: true }}
              >
                {yashilProducts.map(p => (
                  <motion.div key={p.id} variants={fadeUp}>
                    <ProductCard product={p} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {/* CTA banner */}
        <section className="bg-[#182162]">
          <div className="max-w-7xl mx-auto px-8 py-16 flex items-center justify-between">
            <div>
              <h3 className="text-white text-[32px] font-extrabold tracking-tight mb-2">
                Готов сажать деревья?
              </h3>
              <p className="text-white/40 text-[15px]">
                Скачай Click и начни копить эко-баллы уже сегодня
              </p>
            </div>
            <Link href="/catalog"
              className="bg-[#00C875] text-[#063a1f] font-bold px-10 py-4 rounded-full
                         text-[15px] hover:bg-[#00b368] active:scale-[0.98] transition-all
                         inline-flex items-center gap-3 flex-shrink-0">
              Смотреть товары
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </section>

      </div>

      {/* ============================================================
          MOBILE
      ============================================================ */}
      <div className="lg:hidden max-w-md mx-auto">
        <main className="pb-24">

          <div className="bg-[#182162] px-5 pt-6 pb-8">
            <div className="w-14 h-14 bg-[#00C875] rounded-2xl flex items-center justify-center mb-4">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 4C10 4 6 7 6 11c0 2.5 1.5 4.5 3.5 5.8V24h9v-7.2C20.5 15.5 22 13.5 22 11c0-4-4-7-8-7z"
                  fill="white" opacity="0.9"/>
              </svg>
            </div>
            <h1 className="text-white text-[26px] font-bold tracking-tight leading-tight mb-2">
              Yashil Meros
            </h1>
            <p className="text-white/60 text-[14px] leading-relaxed">
              Экологический проект Click. Каждое действие в приложении приносит эко-баллы — они идут на посадку деревьев в Ташкенте.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 px-5 -mt-4">
            {stats.map(s => (
              <div key={s.label} className="bg-white border border-gray-100 rounded-2xl p-3.5 text-center shadow-sm">
                <p className="text-[#182162] text-[18px] font-bold tracking-tight">{s.value}</p>
                <p className="text-gray-400 text-[11px] font-medium mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="px-5 mt-6">
            <h2 className="text-[#182162] text-[17px] font-bold tracking-tight mb-4">Как это работает</h2>
            <div className="space-y-3">
              {steps.map(item => (
                <div key={item.step} className="flex gap-4 bg-[#f9f8f6] rounded-2xl p-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                                  bg-[#182162] font-bold text-[12px] text-white">
                    {item.step}
                  </div>
                  <div>
                    <p className="text-[#182162] text-[13px] font-bold mb-0.5">{item.title}</p>
                    <p className="text-gray-500 text-[12px] leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {yashilProducts.length > 0 && (
            <div className="px-5 mt-6">
              <h2 className="text-[#182162] text-[17px] font-bold tracking-tight mb-3">Товары коллекции</h2>
              <div className="space-y-2.5">
                {yashilProducts.map(p => (
                  <Link key={p.id} href={`/product/${p.slug}`}
                    className="flex gap-3 bg-[#f9f8f6] rounded-2xl p-3 hover:bg-gray-50 transition-colors">
                    <div className="w-14 h-14 rounded-xl flex-shrink-0 overflow-hidden"
                      style={{ backgroundColor: p.imageBg }}>
                      {p.image && (
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover object-top" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#182162] text-[13px] font-bold truncate">{p.name}</p>
                      <p className="text-gray-400 text-[11px] mt-0.5">{p.collab}</p>
                    </div>
                    <div className="flex-shrink-0 self-center">
                      <p className="text-[#182162] text-[13px] font-bold">
                        {new Intl.NumberFormat('ru-RU').format(p.price)}
                      </p>
                      <p className="text-gray-400 text-[10px] text-right">сум</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="px-5 mt-6">
            <Link href="/catalog"
              className="block w-full bg-[#182162] text-white text-[15px] font-bold
                         py-4 rounded-2xl text-center hover:bg-[#0e1540] active:scale-[0.98] transition-all">
              Смотреть все товары
            </Link>
          </div>

        </main>
      </div>

      <TabBar />
    </div>
  )
}
