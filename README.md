# Click Brandshop

Мерч-магазин Click × Kuznetsovs Gallery × Yashil Meros.

**Tech stack:** Next.js 14 · TypeScript · Tailwind CSS · Zustand · Click Pay

---

## Быстрый старт

```bash
# 1. Установить зависимости
npm install

# 2. Скопировать env
cp .env.example .env.local
# → заполнить CLICK_SERVICE_ID, CLICK_MERCHANT_ID, CLICK_SECRET_KEY

# 3. Запустить dev-сервер
npm run dev
# → http://localhost:3000
```

---

## Структура проекта

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx            # Главная страница
│   ├── product/[slug]/     # Страница товара
│   ├── catalog/            # Каталог
│   ├── cart/               # Корзина
│   ├── checkout/           # Оплата через Click Pay
│   └── yashil-meros/       # Страница проекта
│
├── components/
│   ├── Header.tsx          # Навбар (navy)
│   ├── HeroSection.tsx     # Hero с коллабом
│   ├── ProductCard.tsx     # Карточка товара
│   ├── CategoryFilter.tsx  # Фильтр по категориям
│   ├── CashbackStrip.tsx   # Click Pay кешбэк
│   ├── MissionBanner.tsx   # Yashil Meros CTA
│   ├── ArtisanBlock.tsx    # Мастера Ташкента
│   └── TabBar.tsx          # Нижняя навигация
│
├── lib/
│   ├── types.ts            # TypeScript типы
│   ├── products.ts         # Данные товаров (заменить на Sanity в Phase 2)
│   └── click-pay.ts        # Click Pay API helper
│
└── store/
    └── cart.ts             # Корзина (Zustand + localStorage)
```

---

## Фазы разработки

### Phase 1 — MVP (апрель–май 2026)
- [x] Бренд-токены Click в Tailwind
- [x] Структура страниц
- [x] Данные товаров
- [x] Компоненты UI
- [x] Click Pay helper
- [x] Корзина (Zustand)
- [ ] Страница оплаты
- [ ] Webhook от Click Pay
- [ ] Деплой на Vercel + shop.click.uz

### Phase 2 — Осенний дроп (июль–август 2026)
- [ ] Sanity CMS (убрать hardcoded данные)
- [ ] Система дропов с таймером
- [ ] Страница Yashil Meros с деревьями
- [ ] Click Premium кешбэк интеграция

### Phase 3 — Полный магазин (сентябрь+)
- [ ] Gift Box конструктор
- [ ] B2B форма для корпоратива
- [ ] Push-уведомления через Click SuperApp

---

## Click Pay интеграция

1. Получить `service_id` и `merchant_id` в личном кабинете Click:
   https://merchant.click.uz
2. Заполнить `.env.local`
3. Webhook URL для подтверждения платежей:
   `https://shop.click.uz/api/click-pay/confirm`

Документация: https://docs.click.uz/

---

## Бренд-система

Цвета Click из брендбука:

| Токен          | Hex       | Использование           |
|----------------|-----------|-------------------------|
| `navy`         | `#182162` | Фоны, кнопки, заголовки |
| `green.click`  | `#00C875` | CTA, акценты, кешбэк    |
| `coral.click`  | `#F26B43` | Теги, предупреждения    |
| `sky.click`    | `#7FCEEC` | Вторичные акценты       |

Шрифт: **Helvetica Neue** (Light 300, Regular 400, Medium 500)
