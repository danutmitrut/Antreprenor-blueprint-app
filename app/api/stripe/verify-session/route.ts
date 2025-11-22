import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-12-18.acacia' as any,
});

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
        return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (!session) {
            return NextResponse.json({ error: 'Invalid session' }, { status: 404 });
        }

        return NextResponse.json({
            email: session.customer_details?.email || session.customer_email,
            name: session.customer_details?.name || session.metadata?.full_name,
            customer_id: session.customer,
            payment_status: session.payment_status,
        });
    } catch (error: any) {
        console.error('Stripe Verify Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error.message },
            { status: 500 }
        );
    }
}
