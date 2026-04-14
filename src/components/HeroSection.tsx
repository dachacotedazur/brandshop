'use client'

import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="bg-[#182162] px-5 pt-6 pb-8 relative overflow-hidden">

      {/* Декоративный круг */}
      <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full border border-[#00C875]/10 bg-[#00C875]/5 pointer-events-none" />
      <div className="absolute -right-16 top-8 w-32 h-32 rounded-full border border-white/5 pointer-events-none" />

      {/* Eyebrow */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[#00C875] text-[10px] font-bold tracking-[0.1em] uppercase">
          Click × Kuznetsovs Gallery
        </span>
      </div>

      {/* Headline */}
      <h1 className="text-[32px] font-extrabold text-white leading-[1.05] tracking-[-0.04em] mb-2">
        Носимое<br />
        <span className="text-[#00C875]">искусство</span><br />
        Ташкента
      </h1>

      {/* Sub */}
      <p className="text-white/50 text-[13px] leading-relaxed mb-6 font-normal max-w-[240px]">
        Принты о городе, воздухе и деньгах.
        Авторская коллекция.
      </p>

      {/* CTAs */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/catalog" className="btn-primary text-[13px] px-5 py-2.5">
          Смотреть коллекцию
        </Link>
        <Link href="/about" className="text-white/50 text-[12px] font-medium flex items-center gap-1 hover:text-white/80 transition-colors">
          О проекте
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M3.5 2L6.5 5L3.5 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>

      {/* Collab badges */}
      <div className="border-t border-white/10 pt-4 flex items-center gap-2 flex-wrap">
        <span className="text-white/30 text-[10px] uppercase tracking-widest font-medium">
          Коллаб с
        </span>
        <span className="text-[11px] font-semibold text-white bg-white/10 px-3 py-1 rounded-full">
          Kuznetsovs Gallery
        </span>
        <span className="text-white/30 text-[10px]">+</span>
        <span className="text-[11px] font-semibold text-[#00C875] bg-[#00C875]/10 px-3 py-1 rounded-full">
          Yashil Meros
        </span>
      </div>

    </section>
  )
}
