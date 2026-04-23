'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
import { useCartStore } from '@/store/cart'

function formatPrice(n: number) {
  return new Intl.NumberFormat('ru-RU').format(n)
}

function EmptyCart() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-8 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-20 h-20 bg-[#f5f5f3] rounded-3xl flex items-center justify-center mx-auto mb-6">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path d="M4 4h3l4 14h16l3-9H10" stroke="#d1d5db" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="16" cy="31" r="2.5" fill="#d1d5db"/>
            <circle cx="24" cy="31" r="2.5" fill="#d1d5db"/>
          </svg>
        </div>
        <h2 className="text-[#182162] text-[22px] font-bold mb-2 tracking-tight">Корзина пуста</h2>
        <p className="text-gray-400 text-[15px] mb-8 leading-relaxed max-w-xs mx-auto">
          Добавьте товары из коллекции<br/>Click × Kuznetsovs Gallery
        </p>
        <Link href="/catalog"
          className="inline-flex bg-[#182162] text-white px-8 py-3.5 rounded-2xl
                     text-[14px] font-bold hover:bg-[#0e1540] transition-colors">
          Смотреть каталог
        </Link>
      </motion.div>
    </div>
  )
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore()
  const total = totalPrice()
  const cashback = Math.round(total * 0.05)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ============================================================
          DESKTOP
      ============================================================ */}
      <div className="hidden lg:block">
        {/* Page title */}
        <div className="bg-[#182162]">
          <div className="max-w-7xl mx-auto px-8 py-8">
            <p className="text-[#00C875] text-[11px] font-bold tracking-[0.2em] uppercase mb-1">
              Оформление заказа
            </p>
            <h1 className="text-white text-[36px] font-extrabold tracking-tight">
              Корзина
              {items.length > 0 && (
                <span className="text-white/30 text-[20px] font-medium ml-4">
                  {items.length} {items.length === 1 ? 'товар' : 'товара'}
                </span>
              )}
            </h1>
          </div>
        </div>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="max-w-7xl mx-auto px-8 py-10">
            <div className="grid grid-cols-[1fr_380px] gap-10 items-start">

              {/* Left: items */}
              <div>
                <AnimatePresence>
                  {items.map(({ product, quantity }) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-5 py-6 border-b border-gray-100 last:border-0"
                    >
                      {/* Image */}
                      <div className="w-24 h-24 rounded-2xl flex-shrink-0 overflow-hidden"
                        style={{ backgroundColor: product.imageBg }}>
                        {product.image ? (
                          <img src={product.image} alt={product.name}
                            className="w-full h-full object-cover object-top" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center opacity-40">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                              <rect x="4" y="8" width="20" height="16" rx="2" stroke="white" strokeWidth="1.2"/>
                              <path d="M9 8 Q14 2 19 8" stroke="white" strokeWidth="1.2" fill="none"/>
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[#182162] text-[16px] font-bold leading-tight mb-1">
                          {product.name}
                        </p>
                        {product.collab && (
                          <p className="text-gray-400 text-[13px] mb-3">{product.collab}</p>
                        )}
                        {product.yashilMeros && (
                          <div className="inline-flex items-center gap-1.5 bg-[#00C875]/10 rounded-full px-2.5 py-1 mb-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00C875]" />
                            <span className="text-[#00a060] text-[11px] font-bold">Yashil Meros</span>
                          </div>
                        )}

                        <div className="flex items-center gap-4">
                          {/* Qty controls */}
                          <div className="flex items-center gap-2.5 bg-[#f9f8f6] rounded-xl px-2 py-1.5">
                            <button
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center
                                         justify-center text-[#182162] text-[16px] font-bold
                                         hover:bg-gray-50 transition-colors"
                            >−</button>
                            <span className="text-[#182162] text-[14px] font-bold w-5 text-center">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              className="w-7 h-7 rounded-lg bg-[#182162] flex items-center
                                         justify-center text-white text-[16px] font-bold
                                         hover:bg-[#0e1540] transition-colors"
                            >+</button>
                          </div>

                          <button
                            onClick={() => removeItem(product.id)}
                            className="text-gray-300 hover:text-gray-500 transition-colors text-[13px] font-medium"
                          >
                            Удалить
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right flex-shrink-0">
                        <p className="text-[#182162] text-[18px] font-bold">
                          {formatPrice(product.price * quantity)}
                        </p>
                        <p className="text-gray-400 text-[12px]">сум</p>
                        {quantity > 1 && (
                          <p className="text-gray-400 text-[12px] mt-1">
                            {formatPrice(product.price)} × {quantity}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Right: order summary */}
              <div className="sticky top-24">
                <div className="bg-[#f9f8f6] rounded-3xl p-8">
                  <h2 className="text-[#182162] text-[18px] font-bold mb-6">Ваш заказ</h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-[14px]">
                      <span className="text-gray-500">Товары ({items.length})</span>
                      <span className="text-[#182162] font-semibold">{formatPrice(total)} сум</span>
                    </div>
                    <div className="flex justify-between text-[14px]">
                      <span className="text-gray-500">Доставка</span>
                      <span className="text-[#00a060] font-semibold">Уточняется</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 flex justify-between">
                      <span className="text-[#182162] text-[16px] font-bold">Итого</span>
                      <span className="text-[#182162] text-[16px] font-bold">{formatPrice(total)} сум</span>
                    </div>
                  </div>

                  {/* Cashback */}
                  <div className="flex items-start gap-3 bg-[#00C875]/8 border border-[#00C875]/20
                                  rounded-2xl px-4 py-3.5 mb-6">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0 mt-0.5">
                      <path d="M9 2L11 7h5l-4 3 1.5 5L9 12.5 4.5 15 6 10 2 7h5L9 2z" fill="#00C875"/>
                    </svg>
                    <p className="text-[#00a060] text-[13px] font-medium leading-relaxed">
                      При оплате через Click Pay вы получите{' '}
                      <span className="font-bold">+{formatPrice(cashback)} сум</span> кешбэка
                    </p>
                  </div>

                  <Link href="/checkout"
                    className="block w-full bg-[#182162] text-white text-[15px] font-bold
                               py-4 rounded-2xl text-center hover:bg-[#0e1540]
                               active:scale-[0.99] transition-all mb-3">
                    Оформить заказ
                  </Link>
                  <p className="text-center text-gray-400 text-[12px]">
                    Оплата через Click Pay · безопасно
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* ============================================================
          MOBILE
      ============================================================ */}
      <div className="lg:hidden">
        {items.length === 0 ? (
          <>
            <EmptyCart />
            <TabBar active="cart" />
          </>
        ) : (
          <>
            <div className="bg-[#182162] sticky top-0 z-50">
              <div className="max-w-md mx-auto px-5 py-3.5 flex items-center justify-between">
                <h1 className="text-white text-[17px] font-bold">Корзина</h1>
                <span className="text-white/50 text-[13px]">{items.length} товара</span>
              </div>
            </div>

            <main className="pb-40">
              <div className="px-5 pt-4 space-y-3">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-3 bg-[#f9f8f6] rounded-2xl p-3">
                    <div className="w-20 h-20 rounded-xl flex-shrink-0 overflow-hidden"
                      style={{ backgroundColor: product.imageBg }}>
                      {product.image ? (
                        <img src={product.image} alt={product.name}
                          className="w-full h-full object-cover object-top" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center opacity-40">
                          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                            <rect x="4" y="8" width="20" height="16" rx="2" stroke="white" strokeWidth="1.2"/>
                            <path d="M9 8 Q14 2 19 8" stroke="white" strokeWidth="1.2" fill="none"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#182162] text-[13px] font-bold leading-tight mb-0.5 truncate">
                        {product.name}
                      </p>
                      {product.collab && (
                        <p className="text-gray-400 text-[10px] font-medium mb-2">{product.collab}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-[#182162] text-[14px] font-bold">
                          {formatPrice(product.price * quantity)}{' '}
                          <span className="text-gray-400 text-[10px] font-normal">сум</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="w-6 h-6 rounded-lg bg-white border border-gray-200 flex items-center
                                       justify-center text-[#182162] text-[14px] font-bold hover:bg-gray-50 transition-colors">
                            −
                          </button>
                          <span className="text-[#182162] text-[13px] font-bold w-4 text-center">{quantity}</span>
                          <button onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="w-6 h-6 rounded-lg bg-[#182162] flex items-center
                                       justify-center text-white text-[14px] font-bold hover:bg-[#0e1540] transition-colors">
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => removeItem(product.id)}
                      className="self-start w-6 h-6 flex items-center justify-center text-gray-300
                                 hover:text-gray-500 transition-colors flex-shrink-0">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              <div className="mx-5 mt-4 flex items-center gap-3 bg-[#00C875]/8 border border-[#00C875]/20 rounded-xl p-3">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2L11 7h5l-4 3 1.5 5L9 12.5 4.5 15 6 10 2 7h5L9 2z" fill="#00C875"/>
                </svg>
                <p className="text-[#00a060] text-[12px] font-medium">
                  При оплате через Click Pay вы получите{' '}
                  <span className="font-bold">+{formatPrice(cashback)} сум</span> кешбэка
                </p>
              </div>

              <div className="mx-5 mt-4 bg-[#f9f8f6] rounded-2xl p-4 space-y-2.5">
                <div className="flex justify-between text-[13px]">
                  <span className="text-gray-500">Товары ({items.length})</span>
                  <span className="text-[#182162] font-semibold">{formatPrice(total)} сум</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-gray-500">Доставка</span>
                  <span className="text-[#00a060] font-semibold">Уточняется</span>
                </div>
                <div className="border-t border-gray-200 pt-2.5 flex justify-between">
                  <span className="text-[#182162] text-[15px] font-bold">Итого</span>
                  <span className="text-[#182162] text-[15px] font-bold">{formatPrice(total)} сум</span>
                </div>
              </div>
            </main>

            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md
                            bg-white border-t border-gray-100 px-5 py-4 z-40">
              <Link href="/checkout"
                className="block w-full bg-[#182162] text-white text-[15px] font-bold
                           py-4 rounded-2xl text-center hover:bg-[#0e1540] active:scale-[0.98] transition-all">
                Оформить заказ · {formatPrice(total)} сум
              </Link>
              <p className="text-center text-gray-400 text-[11px] mt-2">
                Оплата через Click Pay · безопасно
              </p>
            </div>

            <TabBar active="cart" />
          </>
        )}
      </div>
    </div>
  )
}
