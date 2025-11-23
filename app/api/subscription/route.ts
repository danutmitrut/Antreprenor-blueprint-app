import { NextResponse } from 'next/server';
import { verifyToken, getUserSubscription } from '@/lib/auth';

export async function GET(req: Request) {
    try {
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

        // Get subscription
        const subscription = await getUserSubscription(payload.userId);

        return NextResponse.json({
            success: true,
            subscription,
        });
    } catch (error: any) {
        console.error('Get subscription error:', error);
        return NextResponse.json(
            { error: 'Eroare internă a serverului' },
            { status: 500 }
        );
    }
}
