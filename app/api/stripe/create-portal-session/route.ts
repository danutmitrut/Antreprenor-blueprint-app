import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { verifyToken, getUserById } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        // Initialize Stripe
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
            apiVersion: '2024-12-18.acacia' as any,
        });

        // Get token from Authorization header
        const authHeader = req.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json(
                { error: 'Token lipsă' },
                { status: 401 }
            );
        }

        const token = authHeader.substring(7);

        // Verify token
        const payload = verifyToken(token);
        if (!payload) {
            return NextResponse.json(
                { error: 'Token invalid sau expirat' },
                { status: 401 }
            );
        }

        // Get user
        const user = await getUserById(payload.userId);
        if (!user || !user.stripe_customer_id) {
            return NextResponse.json(
                { error: 'Utilizator fără abonament Stripe' },
                { status: 400 }
            );
        }

        // Get base URL
        const host = req.headers.get('host');
        const protocol = req.headers.get('x-forwarded-proto') || 'https';
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
                       (host ? `${protocol}://${host}` : 'http://localhost:3000');

        // Create Stripe billing portal session
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
