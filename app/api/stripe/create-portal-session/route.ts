import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { authenticateRequest } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
            apiVersion: '2024-12-18.acacia' as any,
        });

        const auth = await authenticateRequest(req);
        if (!auth) {
            return NextResponse.json(
                { error: 'Token invalid sau expirat' },
                { status: 401 }
            );
        }

        const user = auth.user;
        if (!user.stripe_customer_id) {
            return NextResponse.json(
                { error: 'Utilizator fără abonament Stripe' },
                { status: 400 }
            );
        }

        const host = req.headers.get('host');
        const protocol = req.headers.get('x-forwarded-proto') || 'https';
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
                       (host ? `${protocol}://${host}` : 'http://localhost:3000');

        const session = await stripe.billingPortal.sessions.create({
            customer: user.stripe_customer_id,
            return_url: `${baseUrl}/dashboard`,
        });

        return NextResponse.json({
            success: true,
            url: session.url,
        });
    } catch (error: any) {
        console.error('Create portal session error:', error);
        return NextResponse.json(
            { error: 'Eroare internă a serverului', details: error.message },
            { status: 500 }
        );
    }
}
