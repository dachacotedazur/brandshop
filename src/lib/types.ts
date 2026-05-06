export type ProductTag = 'art' | 'eco' | 'limited' | 'new' | 'leather' | 'handmade' | 'collab' | 'travel'

export type ProductCategory = 'all' | 'clothing' | 'leather' | 'eco' | 'travel' | 'accessories'

export interface Product {
  id: string
  slug: string
  name: string
  nameUz?: string          // Название на узбекском
  price: number            // в сумах
  originalPrice?: number   // для отображения скидки
  image: string
  imageBg: string          // цвет фона карточки
  tag?: ProductTag
  collab?: string          // 'Kuznetsovs Gallery' | 'Мастера Ташкента'
  category: ProductCategory
  collection?: string      // название коллекции
  description: string
  isAvailable: boolean
  cashbackPercent?: number // % кешбэка через Click Pay
  season?: 'all' | 'spring' | 'summer' | 'autumn' | 'winter'
  yashilMeros?: boolean    // связан с проектом
}

export interface Collection {
  id: string
  name: string
  slug: string
  description: string
  coverImage: string
  collab?: string
  products: string[]       // массив product ids
}
