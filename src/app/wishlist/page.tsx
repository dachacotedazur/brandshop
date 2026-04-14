import Link from 'next/link'
import TabBar from '@/components/TabBar'
import Header from '@/components/Header'

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-white max-w-md mx-auto">
      <Header />

      <main className="pb-24">
        <div className="bg-[#182162] px-5 pt-4 pb-5">
          <h1 className="text-white text-[22px] font-bold tracking-tight">
            Избранное
          </h1>
        </div>

        <div className="py-20 text-center px-5">
          <div className="w-16 h-16 bg-[#f5f5f3] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 24S3 17 3 10a5.5 5.5 0 0 1 11-1.6A5.5 5.5 0 0 1 25 10c0 7-11 14-11 14z"
                stroke="#d1d5db" strokeWidth="1.5" fill="none"/>
            </svg>
          </div>
          <p className="text-gray-400 text-[14px] mb-4">Здесь будут ваши избранные товары</p>
          <Link
            href="/catalog"
            className="inline-flex bg-[#182162] text-white text-[13px] font-bold
                       px-6 py-2.5 rounded-full hover:bg-[#0e1540] transition-colors"
          >
            Перейти в каталог
          </Link>
        </div>
      </main>

      <TabBar active="wishlist" />
    </div>
  )
}
