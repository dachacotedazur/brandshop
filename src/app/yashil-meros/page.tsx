import Link from 'next/link'
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
import { availableProducts } from '@/lib/products'

const yashilProducts = availableProducts.filter(p => p.yashilMeros)

export default function YashilMerosPage() {
  return (
    <div className="min-h-screen bg-white max-w-md mx-auto">
      <Header />

      <main className="pb-24">

        {/* Hero */}
        <div className="bg-[#182162] px-5 pt-6 pb-8">
          <div className="w-14 h-14 bg-[#00C875] rounded-2xl flex items-center
                          justify-center mb-4">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 4C10 4 6 7 6 11c0 2.5 1.5 4.5 3.5 5.8V24h9v-7.2C20.5 15.5 22 13.5 22 11c0-4-4-7-8-7z"
                fill="white" opacity="0.9"/>
            </svg>
          </div>
          <h1 className="text-white text-[26px] font-bold tracking-tight leading-tight mb-2">
            Yashil Meros
          </h1>
          <p className="text-white/60 text-[14px] leading-relaxed">
            Экологический проект Click. Каждое действие в приложении
            приносит эко-баллы — они идут на посадку деревьев в Ташкенте.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 px-5 -mt-4">
          {[
            { value: '10 000+', label: 'деревьев' },
            { value: '5×', label: 'рост участников' },
            { value: '2022', label: 'год запуска' },
          ].map((stat) => (
            <div key={stat.label}
              className="bg-white border border-gray-100 rounded-2xl p-3.5 text-center shadow-sm">
              <p className="text-[#182162] text-[18px] font-bold tracking-tight">
                {stat.value}
              </p>
              <p className="text-gray-400 text-[11px] font-medium mt-0.5">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="px-5 mt-6">
          <h2 className="text-[#182162] text-[17px] font-bold tracking-tight mb-4">
            Как это работает
          </h2>
          <div className="space-y-3">
            {[
              {
                step: '01',
                title: 'Покупаешь товар',
                body: 'Любой товар коллекции Yashil Meros или любая оплата через Click',
                color: '#182162',
              },
              {
                step: '02',
                title: 'Получаешь эко-баллы',
                body: 'Баллы начисляются автоматически на твой аккаунт Click',
                color: '#00C875',
              },
              {
                step: '03',
                title: 'Сажаешь дерево',
                body: 'Активируй баллы в приложении — и дерево с твоим именем появится в Ташкенте',
                color: '#00C875',
              },
            ].map((item) => (
              <div key={item.step}
                className="flex gap-4 bg-[#f9f8f6] rounded-2xl p-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center
                                flex-shrink-0 font-bold text-[12px]"
                  style={{ backgroundColor: item.color, color: '#fff' }}>
                  {item.step}
                </div>
                <div>
                  <p className="text-[#182162] text-[13px] font-bold mb-0.5">
                    {item.title}
                  </p>
                  <p className="text-gray-500 text-[12px] leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Yashil products */}
        {yashilProducts.length > 0 && (
          <div className="px-5 mt-6">
            <h2 className="text-[#182162] text-[17px] font-bold tracking-tight mb-3">
              Товары коллекции
            </h2>
            <div className="space-y-2.5">
              {yashilProducts.map((p) => (
                <Link key={p.id} href={`/product/${p.slug}`}
                  className="flex gap-3 bg-[#f9f8f6] rounded-2xl p-3 hover:bg-gray-50
                             transition-colors">
                  <div className="w-14 h-14 rounded-xl flex-shrink-0"
                    style={{ backgroundColor: p.imageBg }}/>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#182162] text-[13px] font-bold truncate">
                      {p.name}
                    </p>
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

        {/* CTA */}
        <div className="px-5 mt-6">
          <Link href="/catalog"
            className="block w-full bg-[#182162] text-white text-[15px] font-bold
                       py-4 rounded-2xl text-center hover:bg-[#0e1540]
                       active:scale-[0.98] transition-all">
            Смотреть все товары
          </Link>
        </div>

      </main>

      <TabBar />
    </div>
  )
}
