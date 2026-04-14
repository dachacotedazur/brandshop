import { NextRequest, NextResponse } from 'next/server'
import { verifyClickSignature } from '@/lib/click-pay'

// Click отправляет сюда подтверждение платежа
// Документация: https://docs.click.uz/

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const secretKey = process.env.CLICK_SECRET_KEY

    if (!secretKey) {
      return NextResponse.json({ error: -9, error_note: 'Server error' })
    }

    // Верифицируем подпись от Click
    const isValid = verifyClickSignature(body, secretKey)
    if (!isValid) {
      return NextResponse.json({ error: -1, error_note: 'SIGN CHECK FAILED' })
    }

    const { action, merchant_trans_id, amount } = body

    // action = 0 — подготовить (проверить заказ)
    // action = 1 — подтвердить (оплата прошла)
    if (action === 0) {
      // Проверяем что заказ существует
      // TODO: Проверить orderId в базе данных
      return NextResponse.json({
        click_trans_id: body.click_trans_id,
        merchant_trans_id,
        merchant_confirm_id: Date.now(),
        error: 0,
        error_note: 'Success',
      })
    }

    if (action === 1) {
      // Платёж подтверждён — помечаем заказ как оплаченный
      // TODO: Обновить статус заказа в базе данных
      console.log(`Order ${merchant_trans_id} paid: ${amount} сум`)

      return NextResponse.json({
        click_trans_id: body.click_trans_id,
        merchant_trans_id,
        merchant_confirm_id: Date.now(),
        error: 0,
        error_note: 'Success',
      })
    }

    return NextResponse.json({ error: -3, error_note: 'Action not found' })
  } catch (err: any) {
    console.error('[click-pay/confirm]', err)
    return NextResponse.json({ error: -9, error_note: 'Server error' })
  }
}
