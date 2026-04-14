import { NextRequest, NextResponse } from 'next/server'
import { createClickPayment } from '@/lib/click-pay'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { orderId, amount, description, returnUrl } = body

    if (!orderId || !amount) {
      return NextResponse.json(
        { error: 'orderId and amount are required' },
        { status: 400 }
      )
    }

    const payment = await createClickPayment({
      orderId,
      amount,
      description: description || 'Click Brandshop order',
      returnUrl: returnUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success`,
    })

    return NextResponse.json(payment)
  } catch (err: any) {
    console.error('[click-pay/init]', err)
    return NextResponse.json(
      { error: err.message || 'Payment init failed' },
      { status: 500 }
    )
  }
}
