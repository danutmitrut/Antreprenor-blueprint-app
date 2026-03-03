import { NextResponse } from 'next/server';
import { authenticateRequest, hasActiveSubscription } from '@/lib/auth';

export async function GET(req: Request) {
    try {
        const auth = await authenticateRequest(req);
        if (!auth) {
            return NextResponse.json(
                { error: 'Token invalid sau expirat' },
                { status: 401 }
            );
        }

        const { user } = auth;
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
