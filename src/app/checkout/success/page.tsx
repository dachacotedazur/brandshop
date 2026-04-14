'use client'

import Link from 'next/link'
import { useEffect, Suspense } from 'react'
import { useCartStore } from '@/store/cart'
import { useSearchParams } from 'next/navigation'

function CheckoutSuccessContent() {
  const { clearCart } = useCartStore()
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto flex flex-col
                    items-center justify-center px-8 text-center">

      {/* Success icon */}
      <div className="w-24 h-24 bg-[#00C875] rounded-full flex items-center
                      justify-center mb-6 animate-pulse-green">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M10 20L17 27L30 14"
            stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <h1 className="text-[#182162] text-[26px] font-bold tracking-tight mb-2">
        Заказ оформлен!
      </h1>

      {orderId && (
        <p className="text-gray-400 text-[13px] mb-2 font-mono">
          #{orderId}
        </p>
      )}

      <p className="text-gray-500 text-[14px] leading-relaxed mb-8">
        Спасибо за покупку. Мы свяжемся с вами для уточнения деталей доставки.
      </p>

      {/* Yashil Meros note */}
      <div className="w-full bg-[#00C875]/8 border border-[#00C875]/20
                      rounded-2xl p-4 mb-8 text-left">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-2 h-2 rounded-full bg-[#00C875]"/>
          <span className="text-[#00a060] text-[12px] font-bold">Yashil Meros</span>
        </div>
        <p className="text-[#00a060] text-[12px] leading-relaxed">
          Ваша покупка принесла эко-баллы — они пойдут на посадку деревьев в Ташкенте.
        </p>
      </div>

      <div className="flex flex-col gap-3 w-full">
        <Link href="/catalog"
          className="w-full bg-[#182162] text-white text-[15px] font-bold
                     py-4 rounded-2xl text-center hover:bg-[#0e1540]
                     active:scale-[0.98] transition-all"
        >
          Продолжить покупки
        </Link>
        <Link href="/"
          className="w-full bg-[#f9f8f6] text-[#182162] text-[14px] font-semibold
                     py-3.5 rounded-2xl text-center hover:bg-gray-100 transition-all"
        >
          На главную
        </Link>
      </div>

    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense>
      <CheckoutSuccessContent />
    </Suspense>
  )
}
