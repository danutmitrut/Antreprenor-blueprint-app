import { NextResponse } from 'next/server';
import { authenticateRequest, getUserSubscription } from '@/lib/auth';

export async function GET(req: Request) {
    try {
        const auth = await authenticateRequest(req);
        if (!auth) {
            return NextResponse.json(
                { error: 'Token invalid sau expirat' },
                { status: 401 }
            );
        }

        const subscription = await getUserSubscription(auth.user.id);

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
