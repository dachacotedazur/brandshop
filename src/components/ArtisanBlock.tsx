export default function ArtisanBlock() {
  return (
    <div className="bg-[#f9f8f6] rounded-2xl p-4">
      <div className="flex items-start gap-3">

        <div className="w-14 h-14 bg-[#e8e4de] rounded-xl flex items-center justify-center flex-shrink-0 text-2xl">
          🧵
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-[#182162] text-[13px] font-bold leading-tight mb-1">
            Мастера Ташкента
          </p>
          <p className="text-gray-500 text-[11px] leading-relaxed">
            Кожаные кошельки и чехлы — ручная работа местных ремесленников.
            Каждое изделие уникально.
          </p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {['Натуральная кожа', 'Ташкент', 'Ручная работа'].map((t) => (
              <span key={t}
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full
                           bg-white text-[#182162] border border-[#e8e4de]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
