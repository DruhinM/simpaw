import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-razorpay-signature') || '';

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest('hex');

    if (signature === expectedSignature) {
      // Payment is verified
      const paymentDetails = JSON.parse(body);
      console.log('Payment verified:', paymentDetails);
      
      // Here you can add your business logic for successful payments
      // For example, update order status, send confirmation email, etc.

      return NextResponse.json({ status: 'ok' });
    } else {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 });
  }
} 