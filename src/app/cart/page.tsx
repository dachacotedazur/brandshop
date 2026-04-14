'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
import { useCartStore } from '@/store/cart'

function formatPrice(n: number) {
  return new Intl.NumberFormat('ru-RU').format(n)
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore()
  const total = totalPrice()
  const cashback = Math.round(total * 0.05)

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white max-w-md mx-auto">
        <Header />
        <div className="flex flex-col items-center justify-center py-32 px-8 text-center">
          <div className="w-20 h-20 bg-[#f5f5f3] rounded-3xl flex items-center
                          justify-center mb-6">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path d="M4 4h3l4 14h16l3-9H10"
                stroke="#d1d5db" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="16" cy="31" r="2.5" fill="#d1d5db"/>
              <circle cx="24" cy="31" r="2.5" fill="#d1d5db"/>
            </svg>
          </div>
          <h2 className="text-[#182162] text-[20px] font-bold mb-2 tracking-tight">
            Корзина пуста
          </h2>
          <p className="text-gray-400 text-[14px] mb-8 leading-relaxed">
            Добавьте товары из коллекции<br/>Click × Kuznetsovs Gallery
          </p>
          <Link href="/catalog"
            className="bg-[#182162] text-white px-8 py-3.5 rounded-2xl
                       text-[14px] font-bold hover:bg-[#0e1540] transition-colors"
          >
            Смотреть каталог
          </Link>
        </div>
        <TabBar active="cart" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto">

      {/* Header */}
      <div className="bg-[#182162] px-5 py-3.5 flex items-center justify-between sticky top-0 z-50">
        <h1 className="text-white text-[17px] font-bold">Корзина</h1>
        <span className="text-white/50 text-[13px]">{items.length} товара</span>
      </div>

      <main className="pb-40">

        {/* Items */}
        <div className="px-5 pt-4 space-y-3">
          {items.map(({ product, quantity }) => (
            <div key={product.id}
              className="flex gap-3 bg-[#f9f8f6] rounded-2xl p-3">

              {/* Image */}
              <div className="w-20 h-20 rounded-xl flex-shrink-0 flex items-center justify-center"
                style={{ backgroundColor: product.imageBg }}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="4" y="8" width="20" height="16" rx="2"
                    stroke="white" strokeWidth="1.2" opacity="0.4"/>
                  <path d="M9 8 Q14 2 19 8"
                    stroke="white" strokeWidth="1.2" fill="none" opacity="0.4"/>
                </svg>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-[#182162] text-[13px] font-bold leading-tight mb-0.5 truncate">
                  {product.name}
                </p>
                {product.collab && (
                  <p className="text-gray-400 text-[10px] font-medium mb-2">
                    {product.collab}
                  </p>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-[#182162] text-[14px] font-bold">
                    {formatPrice(product.price * quantity)} <span className="text-gray-400 text-[10px] font-normal">сум</span>
                  </span>

                  {/* Qty controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="w-6 h-6 rounded-lg bg-white border border-gray-200
                                 flex items-center justify-center text-[#182162]
                                 text-[14px] font-bold hover:bg-gray-50 transition-colors"
                    >
                      −
                    </button>
                    <span className="text-[#182162] text-[13px] font-bold w-4 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="w-6 h-6 rounded-lg bg-[#182162]
                                 flex items-center justify-center text-white
                                 text-[14px] font-bold hover:bg-[#0e1540] transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeItem(product.id)}
                className="self-start w-6 h-6 flex items-center justify-center
                           text-gray-300 hover:text-gray-500 transition-colors flex-shrink-0"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 3l8 8M11 3l-8 8"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Cashback info */}
        <div className="mx-5 mt-4 flex items-center gap-3
                        bg-[#00C875]/8 border border-[#00C875]/20 rounded-xl p-3">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 2L11 7h5l-4 3 1.5 5L9 12.5 4.5 15 6 10 2 7h5L9 2z"
              fill="#00C875"/>
          </svg>
          <p className="text-[#00a060] text-[12px] font-medium">
            При оплате через Click Pay вы получите{' '}
            <span className="font-bold">+{formatPrice(cashback)} сум</span> кешбэка
          </p>
        </div>

        {/* Order summary */}
        <div className="mx-5 mt-4 bg-[#f9f8f6] rounded-2xl p-4 space-y-2.5">
          <div className="flex justify-between text-[13px]">
            <span className="text-gray-500">Товары ({items.length})</span>
            <span className="text-[#182162] font-semibold">
              {formatPrice(total)} сум
            </span>
          </div>
          <div className="flex justify-between text-[13px]">
            <span className="text-gray-500">Доставка</span>
            <span className="text-[#00a060] font-semibold">Уточняется</span>
          </div>
          <div className="border-t border-gray-200 pt-2.5 flex justify-between">
            <span className="text-[#182162] text-[15px] font-bold">Итого</span>
            <span className="text-[#182162] text-[15px] font-bold">
              {formatPrice(total)} сум
            </span>
          </div>
        </div>

      </main>

      {/* Sticky checkout button */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md
                      bg-white border-t border-gray-100 px-5 py-4 z-40">
        <Link href="/checkout"
          className="block w-full bg-[#182162] text-white text-[15px] font-bold
                     py-4 rounded-2xl text-center hover:bg-[#0e1540]
                     active:scale-[0.98] transition-all"
        >
          Оформить заказ · {formatPrice(total)} сум
        </Link>
        <p className="text-center text-gray-400 text-[11px] mt-2">
          Оплата через Click Pay · безопасно
        </p>
      </div>

      <TabBar active="cart" />
    </div>
  )
}
