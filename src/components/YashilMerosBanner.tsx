import Link from 'next/link'

export default function YashilMerosBanner() {
  return (
    <div className="px-4 pb-4">
      <Link
        href="/yashil-meros"
        className="flex items-center gap-3 bg-[#182162] rounded-2xl p-4 hover:bg-[#1e2a7a] transition-colors"
      >
        {/* Icon */}
        <div className="w-11 h-11 bg-[#00C875] rounded-xl flex items-center justify-center flex-shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 3C7 3 5 5.5 5 8c0 3 3.5 6.5 5 8 1.5-1.5 5-5 5-8 0-2.5-2-5-5-5z" fill="white"/>
            <circle cx="10" cy="8" r="2" fill="#00C875"/>
          </svg>
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-[13px] leading-tight tracking-tight">
            Yashil Meros
          </p>
          <p className="text-white/50 text-[11px] mt-0.5 leading-tight">
            Каждая покупка — эко-баллы на посадку дерева
          </p>
        </div>

        {/* Arrow */}
        <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M4 2.5L7.5 6L4 9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </Link>
    </div>
  )
}
