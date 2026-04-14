import Link from 'next/link'

export default function MissionBanner() {
  return (
    <Link href="/yashil-meros"
      className="block bg-[#182162] rounded-2xl p-4 flex items-center gap-3 hover:opacity-95 transition-opacity"
    >
      <div className="w-11 h-11 bg-[#00C875] rounded-xl flex items-center justify-center flex-shrink-0">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 3C7.5 3 5 5.5 5 8c0 1.5.8 2.8 2 3.7V17h6v-5.3c1.2-.9 2-2.2 2-3.7 0-2.5-2.5-5-5-5z"
            fill="white" opacity="0.9"/>
          <path d="M10 17v-7M7 9c0 0 1-3 3-4M13 9c0 0-1-3-3-4"
            stroke="#182162" strokeWidth="1" strokeLinecap="round"/>
        </svg>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-white text-[13px] font-bold leading-tight">
          Yashil Meros
        </p>
        <p className="text-white/50 text-[11px] mt-0.5 leading-tight">
          Каждая покупка — эко-баллы на посадку дерева
        </p>
      </div>

      <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M5 3l4 4-4 4" stroke="white" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </Link>
  )
}
