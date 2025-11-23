import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
    try {
        // Initialize Stripe inside handler to avoid build-time errors
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
            apiVersion: '2024-12-18.acacia' as any,
        });

        const { email, name } = await req.json();

        // Get base URL from request headers or environment variable
        const host = req.headers.get('host');
        const protocol = req.headers.get('x-forwarded-proto') || 'https';
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
                       (host ? `${protocol}://${host}` : 'http://localhost:3000');

        console.log('=== STRIPE CHECKOUT DEBUG ===');
        console.log('Base URL:', baseUrl);
        console.log('Host:', host);
        console.log('Protocol:', protocol);
        console.log('NEXT_PUBLIC_BASE_URL:', process.env.NEXT_PUBLIC_BASE_URL);

        // Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: process.env.STRIPE_PRICE_ID,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${baseUrl}/auth/callback?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${baseUrl}/chat`,
            customer_email: email,
            metadata: {
                full_name: name,
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error('Stripe Checkout Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error.message },
            { status: 500 }
        );
    }
}
