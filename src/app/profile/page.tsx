import Link from 'next/link'
import TabBar from '@/components/TabBar'
import Header from '@/components/Header'

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-white max-w-md mx-auto">
      <Header />

      <main className="pb-24">
        <div className="bg-[#182162] px-5 pt-4 pb-5">
          <h1 className="text-white text-[22px] font-bold tracking-tight">
            Профиль
          </h1>
        </div>

        <div className="py-20 text-center px-5">
          <div className="w-16 h-16 bg-[#f5f5f3] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="10" r="5" stroke="#d1d5db" strokeWidth="1.5"/>
              <path d="M4 26c0-6 4.5-9 10-9s10 3 10 9" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <p className="text-gray-400 text-[14px] mb-2">Войдите через Click</p>
          <p className="text-gray-300 text-[12px] mb-5">чтобы видеть историю заказов и бонусы</p>
          <Link
            href="/"
            className="inline-flex bg-[#182162] text-white text-[13px] font-bold
                       px-6 py-2.5 rounded-full hover:bg-[#0e1540] transition-colors"
          >
            Войти с Click
          </Link>
        </div>
      </main>

      <TabBar active="profile" />
    </div>
  )
}
