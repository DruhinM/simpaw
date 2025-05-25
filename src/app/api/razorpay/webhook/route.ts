import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-razorpay-signature');

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest('hex');

    if (signature === expectedSignature) {
      const payment = JSON.parse(body);
      
      // Handle successful payment
      // You can:
      // 1. Update your database
      // 2. Send confirmation email
      // 3. Trigger any post-payment workflows

      return NextResponse.json({ status: 'ok' });
    }

    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
} 