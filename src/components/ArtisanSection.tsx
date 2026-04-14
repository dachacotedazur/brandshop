import Link from 'next/link'

export default function ArtisanSection() {
  return (
    <section className="px-4 pb-6">

      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[#182162] font-bold text-[15px] tracking-tight">
          Мастера Ташкента
        </h2>
        <Link href="/artisans" className="text-[#00C875] text-[12px] font-semibold">
          Все →
        </Link>
      </div>

      <div className="bg-[#f9f8f6] rounded-2xl p-4 flex gap-3 items-start">

        {/* Icon */}
        <div className="w-14 h-14 bg-[#e8e6e2] rounded-xl flex items-center justify-center flex-shrink-0 text-2xl">
          🧵
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <h3 className="text-[#182162] font-bold text-[13px] leading-tight mb-1">
            Кожаные изделия ручной работы
          </h3>
          <p className="text-gray-500 text-[11px] leading-relaxed">
            Ташкентские мастера создают кошельки и чехлы из натуральной кожи специально для Click Brandshop.
          </p>

          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {['Натуральная кожа', 'Ташкент', 'Ручная работа'].map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-semibold text-[#182162] bg-white border border-[#e8e6e2] rounded-full px-2 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>

    </section>
  )
}
