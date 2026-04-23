import Link from 'next/link'
import type { Product, ProductTag } from '@/lib/types'

const tagConfig: Record<ProductTag, { label: string; bg: string; text: string }> = {
  art:      { label: 'Арт',     bg: '#F26B43', text: '#fff' },
  eco:      { label: 'Eco',     bg: '#182162', text: '#fff' },
  limited:  { label: 'Лимит',   bg: '#fff',    text: '#182162' },
  new:      { label: 'Новое',   bg: '#00C875', text: '#063a1f' },
  leather:  { label: 'Кожа',   bg: '#8B6914', text: '#fff' },
  handmade: { label: 'Handmade',bg: '#6B4C9A', text: '#fff' },
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU').format(price)
}

export default function ProductCard({ product }: { product: Product }) {
  const tag = product.tag ? tagConfig[product.tag] : null

  return (
    <Link href={`/product/${product.slug}`} className="product-card block group">

      {/* Image area */}
      <div
        className="relative h-[148px] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: product.imageBg }}
      >
        {/* Tag */}
        {tag && (
          <span
            className="absolute top-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded-full z-10 border"
            style={{
              backgroundColor: tag.bg,
              color: tag.text,
              borderColor: tag.bg === '#fff' ? '#182162' : 'transparent',
            }}
          >
            {tag.label}
          </span>
        )}

        {/* Wishlist */}
        <button
          className="absolute top-2 right-2 w-6 h-6 bg-white/90 rounded-full flex items-center justify-center z-10 hover:bg-white transition-colors"
          onClick={(e) => { e.preventDefault(); /* TODO: wishlist logic */ }}
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M5.5 9.5S1 6.5 1 3.5A2.5 2.5 0 0 1 5.5 2.3 2.5 2.5 0 0 1 10 3.5C10 6.5 5.5 9.5 5.5 9.5Z"
              stroke="#ccc" strokeWidth="1" fill="none"/>
          </svg>
        </button>

        {/* Product image or placeholder */}
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center opacity-40">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect x="8" y="12" width="32" height="28" rx="3" stroke="white" strokeWidth="1.5"/>
              <path d="M16 12 Q24 4 32 12" stroke="white" strokeWidth="1.5" fill="none"/>
            </svg>
          </div>
        )}

        {/* Yashil Meros indicator */}
        {product.yashilMeros && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-[#00C875]/20 backdrop-blur-sm rounded-full px-2 py-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00C875]" />
            <span className="text-[#00C875] text-[8px] font-bold">Yashil</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="text-[#182162] text-[12px] font-semibold leading-tight mb-1 tracking-tight line-clamp-2">
          {product.name}
        </h3>

        {product.collab && (
          <p className="text-gray-400 text-[10px] font-medium mb-2">
            {product.collab}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div>
            <span className="text-[#182162] text-[13px] font-bold tracking-tight">
              {formatPrice(product.price)}
            </span>
            <span className="text-gray-400 text-[10px] font-medium ml-1">сум</span>
          </div>

          <button
            className="w-7 h-7 bg-[#182162] rounded-lg flex items-center justify-center
                       hover:bg-[#00C875] transition-colors group-hover:bg-[#00C875]"
            onClick={(e) => { e.preventDefault(); /* TODO: add to cart */ }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 2h1.5l2 7h5.5l1.5-4H5.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="7" cy="11.5" r="1" fill="white"/>
              <circle cx="10" cy="11.5" r="1" fill="white"/>
            </svg>
          </button>
        </div>
      </div>

    </Link>
  )
}
