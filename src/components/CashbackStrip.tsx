export default function CashbackStrip() {
  return (
    <div className="mx-4 my-3">
      <div className="bg-[#E6F9F1] border border-[#00C875]/30 rounded-2xl px-4 py-3 flex items-center gap-3">

        {/* Icon */}
        <div className="w-9 h-9 bg-[#00C875] rounded-xl flex items-center justify-center flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2L9.5 5.5L13.5 6L11 8.5L11.5 12.5L8 11L4.5 12.5L5 8.5L2.5 6L6.5 5.5L8 2Z"
              fill="white" stroke="white" strokeWidth="0.5" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-[#063a1f] text-[12px] font-semibold leading-tight">
            Оплати через Click — получи кешбэк
          </p>
          <p className="text-[#063a1f]/50 text-[10px] mt-0.5 leading-tight">
            Двойной кешбэк с Click Premium
          </p>
        </div>

        {/* Arrow */}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 text-[#00A060]">
          <path d="M5 3.5L8.5 7L5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

      </div>
    </div>
  )
}
