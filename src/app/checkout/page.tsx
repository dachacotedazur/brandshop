'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCartStore } from '@/store/cart'

function formatPrice(n: number) {
  return new Intl.NumberFormat('ru-RU').format(n)
}

type Step = 'contacts' | 'delivery' | 'payment'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCartStore()
  const total = totalPrice()

  const [step, setStep] = useState<Step>('contacts')
  const [isLoading, setIsLoading] = useState(false)

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    comment: '',
  })

  const updateForm = (key: string, value: string) =>
    setForm(prev => ({ ...prev, [key]: value }))

  const handleClickPay = async () => {
    setIsLoading(true)
    try {
      const orderId = `order_${Date.now()}`
      const res = await fetch('/api/click-pay/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          amount: total,
          description: `Click Brandshop · ${items.length} товаров`,
          returnUrl: `${window.location.origin}/checkout/success?order_id=${orderId}`,
          customerName: form.name,
          customerPhone: form.phone,
        }),
      })

      const data = await res.json()
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl
      }
    } catch (err) {
      console.error('Click Pay error:', err)
      setIsLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white max-w-md mx-auto flex items-center justify-center">
        <div className="text-center px-8">
          <p className="text-gray-400 text-[14px] mb-4">Корзина пуста</p>
          <Link href="/catalog"
            className="text-[#182162] text-[14px] font-bold underline">
            В каталог
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f9f8f6] max-w-md mx-auto">

      {/* Header */}
      <div className="bg-[#182162] px-5 py-3.5 flex items-center gap-3 sticky top-0 z-50">
        <Link href="/cart"
          className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 3L5 7l4 4" stroke="white" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <h1 className="text-white text-[17px] font-bold">Оформление заказа</h1>
      </div>

      {/* Steps indicator */}
      <div className="bg-[#182162] px-5 pb-4">
        <div className="flex items-center gap-2">
          {(['contacts', 'delivery', 'payment'] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center
                text-[11px] font-bold flex-shrink-0 transition-all ${
                  s === step
                    ? 'bg-[#00C875] text-[#063a1f]'
                    : ['contacts', 'delivery', 'payment'].indexOf(step) > i
                      ? 'bg-white/20 text-white'
                      : 'bg-white/10 text-white/40'
                }`}>
                {['contacts', 'delivery', 'payment'].indexOf(step) > i ? '✓' : i + 1}
              </div>
              {i < 2 && (
                <div className="h-0.5 flex-1 bg-white/10 rounded-full">
                  <div className={`h-full bg-[#00C875] rounded-full transition-all ${
                    ['contacts', 'delivery', 'payment'].indexOf(step) > i ? 'w-full' : 'w-0'
                  }`}/>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <main className="px-5 py-5 pb-32 space-y-4">

        {/* Step 1: Contacts */}
        {step === 'contacts' && (
          <div className="bg-white rounded-2xl p-5">
            <h2 className="text-[#182162] text-[16px] font-bold mb-4 tracking-tight">
              Контактные данные
            </h2>
            <div className="space-y-3">
              <div>
                <label className="text-gray-500 text-[12px] font-medium block mb-1.5">
                  Имя
                </label>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={form.name}
                  onChange={e => updateForm('name', e.target.value)}
                  className="w-full bg-[#f9f8f6] rounded-xl px-4 py-3 text-[14px]
                             text-[#182162] placeholder-gray-300 outline-none
                             focus:ring-2 focus:ring-[#182162]/20 transition-all"
                />
              </div>
              <div>
                <label className="text-gray-500 text-[12px] font-medium block mb-1.5">
                  Телефон
                </label>
                <input
                  type="tel"
                  placeholder="+998 __ ___ __ __"
                  value={form.phone}
                  onChange={e => updateForm('phone', e.target.value)}
                  className="w-full bg-[#f9f8f6] rounded-xl px-4 py-3 text-[14px]
                             text-[#182162] placeholder-gray-300 outline-none
                             focus:ring-2 focus:ring-[#182162]/20 transition-all"
                />
              </div>
            </div>
            <button
              onClick={() => setStep('delivery')}
              disabled={!form.name || !form.phone}
              className="w-full bg-[#182162] text-white text-[14px] font-bold
                         py-3.5 rounded-xl mt-5 hover:bg-[#0e1540]
                         disabled:opacity-40 disabled:cursor-not-allowed
                         active:scale-[0.98] transition-all"
            >
              Далее
            </button>
          </div>
        )}

        {/* Step 2: Delivery */}
        {step === 'delivery' && (
          <div className="bg-white rounded-2xl p-5">
            <h2 className="text-[#182162] text-[16px] font-bold mb-4 tracking-tight">
              Доставка
            </h2>

            {/* Delivery options */}
            <div className="space-y-2.5 mb-4">
              {[
                { id: 'courier', label: 'Курьер по Ташкенту', price: 'уточняется', icon: '🛵' },
                { id: 'pickup', label: 'Самовывоз из офиса Click', price: 'бесплатно', icon: '📍' },
              ].map((opt) => (
                <label key={opt.id}
                  className="flex items-center gap-3 p-3.5 rounded-xl border-2
                             border-[#182162]/10 cursor-pointer hover:border-[#182162]/30
                             has-[:checked]:border-[#182162] transition-all">
                  <input type="radio" name="delivery" value={opt.id}
                    className="accent-[#182162]" defaultChecked={opt.id === 'pickup'}/>
                  <span className="text-xl">{opt.icon}</span>
                  <div className="flex-1">
                    <p className="text-[#182162] text-[13px] font-semibold">{opt.label}</p>
                    <p className="text-gray-400 text-[11px] mt-0.5">{opt.price}</p>
                  </div>
                </label>
              ))}
            </div>

            <div>
              <label className="text-gray-500 text-[12px] font-medium block mb-1.5">
                Адрес доставки
              </label>
              <textarea
                placeholder="Улица, дом, квартира"
                value={form.address}
                onChange={e => updateForm('address', e.target.value)}
                rows={2}
                className="w-full bg-[#f9f8f6] rounded-xl px-4 py-3 text-[14px]
                           text-[#182162] placeholder-gray-300 outline-none resize-none
                           focus:ring-2 focus:ring-[#182162]/20 transition-all"
              />
            </div>

            <div className="flex gap-2.5 mt-5">
              <button
                onClick={() => setStep('contacts')}
                className="flex-1 bg-[#f9f8f6] text-[#182162] text-[14px] font-bold
                           py-3.5 rounded-xl hover:bg-gray-100 active:scale-[0.98] transition-all"
              >
                Назад
              </button>
              <button
                onClick={() => setStep('payment')}
                className="flex-[2] bg-[#182162] text-white text-[14px] font-bold
                           py-3.5 rounded-xl hover:bg-[#0e1540] active:scale-[0.98] transition-all"
              >
                К оплате
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 'payment' && (
          <>
            {/* Order summary */}
            <div className="bg-white rounded-2xl p-5">
              <h2 className="text-[#182162] text-[16px] font-bold mb-4 tracking-tight">
                Ваш заказ
              </h2>
              <div className="space-y-2.5">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex justify-between items-center">
                    <div className="flex-1 min-w-0 mr-3">
                      <p className="text-[#182162] text-[13px] font-medium truncate">
                        {product.name}
                      </p>
                      <p className="text-gray-400 text-[11px]">× {quantity}</p>
                    </div>
                    <span className="text-[#182162] text-[13px] font-bold flex-shrink-0">
                      {formatPrice(product.price * quantity)} сум
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between">
                <span className="text-[#182162] text-[15px] font-bold">Итого</span>
                <span className="text-[#182162] text-[15px] font-bold">
                  {formatPrice(total)} сум
                </span>
              </div>
            </div>

            {/* Click Pay button */}
            <div className="bg-white rounded-2xl p-5">
              <h2 className="text-[#182162] text-[16px] font-bold mb-1 tracking-tight">
                Оплата
              </h2>
              <p className="text-gray-400 text-[12px] mb-4">
                Безопасная оплата через Click Pay
              </p>

              {/* Cashback preview */}
              <div className="flex items-center gap-2 bg-[#00C875]/8 rounded-xl p-3 mb-4">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1.5L9.8 6H14l-3.5 2.5L11.8 13 8 10.5 4.2 13 5.5 8.5 2 6h4.2L8 1.5z"
                    fill="#00C875"/>
                </svg>
                <p className="text-[#00a060] text-[12px] font-medium">
                  Кешбэк: <span className="font-bold">+{formatPrice(Math.round(total * 0.05))} сум</span>
                  {' '}на кошелёк Click
                </p>
              </div>

              <button
                onClick={handleClickPay}
                disabled={isLoading}
                className="w-full py-4 rounded-2xl text-[15px] font-bold
                           flex items-center justify-center gap-2.5
                           bg-[#182162] text-white
                           hover:bg-[#0e1540] active:scale-[0.98]
                           disabled:opacity-60 disabled:cursor-not-allowed
                           transition-all"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white
                                    rounded-full animate-spin"/>
                    Переход к оплате...
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="8" fill="#00C875"/>
                      <path d="M7 10.5L9 12.5L13 8"
                        stroke="#182162" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Оплатить через Click · {formatPrice(total)} сум
                  </>
                )}
              </button>

              <p className="text-center text-gray-300 text-[11px] mt-3">
                Нажимая «Оплатить», вы соглашаетесь с условиями Click
              </p>
            </div>

            <button
              onClick={() => setStep('delivery')}
              className="w-full text-gray-400 text-[13px] py-2"
            >
              ← Изменить данные
            </button>
          </>
        )}

      </main>
    </div>
  )
}
