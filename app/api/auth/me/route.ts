import { NextResponse } from 'next/server';
import { verifyToken, getUserById, hasActiveSubscription } from '@/lib/auth';

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

        const token = authHeader.substring(7); // Remove 'Bearer ' prefix

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
        if (!user) {
            return NextResponse.json(
                { error: 'Utilizator negăsit' },
                { status: 404 }
            );
        }

        // Check subscription status
        const hasSubscription = await hasActiveSubscription(user.id);

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                email_verified: user.email_verified,
                has_active_subscription: hasSubscription,
                created_at: user.created_at,
            },
        });
    } catch (error: any) {
        console.error('Get user info error:', error);
        return NextResponse.json(
            { error: 'Eroare internă a serverului' },
            { status: 500 }
        );
    }
}
