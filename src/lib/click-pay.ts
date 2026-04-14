// Click Pay API integration
// Документация: https://docs.click.uz/
// Требует: CLICK_SERVICE_ID, CLICK_MERCHANT_ID, CLICK_SECRET_KEY в .env

export interface ClickPaymentParams {
  orderId: string
  amount: number        // в сумах
  description: string
  returnUrl: string
}

export interface ClickPaymentResponse {
  paymentUrl: string
  transactionId: string
}

// Инициализация платежа через Click Pay
export async function createClickPayment(
  params: ClickPaymentParams
): Promise<ClickPaymentResponse> {
  const serviceId = process.env.CLICK_SERVICE_ID
  const merchantId = process.env.CLICK_MERCHANT_ID

  if (!serviceId || !merchantId) {
    throw new Error('Click Pay credentials not configured')
  }

  // Формируем URL для оплаты через Click
  // https://my.click.uz/services/pay
  const paymentUrl = new URL('https://my.click.uz/services/pay')
  paymentUrl.searchParams.set('service_id', serviceId)
  paymentUrl.searchParams.set('merchant_id', merchantId)
  paymentUrl.searchParams.set('amount', params.amount.toString())
  paymentUrl.searchParams.set('transaction_param', params.orderId)
  paymentUrl.searchParams.set('return_url', params.returnUrl)

  return {
    paymentUrl: paymentUrl.toString(),
    transactionId: params.orderId,
  }
}

// Верификация подписи от Click (webhook)
export function verifyClickSignature(
  params: Record<string, string>,
  secretKey: string
): boolean {
  // Реализация согласно документации Click Pay
  // https://docs.click.uz/
  const { sign_time, click_trans_id, service_id, merchant_trans_id,
          amount, action, sign_string } = params

  const signString = [
    click_trans_id,
    service_id,
    secretKey,
    merchant_trans_id,
    amount,
    action,
    sign_time,
  ].join('')

  const crypto = require('crypto')
  const expected = crypto
    .createHash('md5')
    .update(signString)
    .digest('hex')

  return expected === sign_string
}

// Типы статусов платежа
export type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'success'
  | 'failed'
  | 'cancelled'
