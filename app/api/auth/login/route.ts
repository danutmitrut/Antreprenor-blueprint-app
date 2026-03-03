import { NextResponse } from 'next/server';
import {
    generateToken,
    getAuthCookieName,
    getAuthCookieOptions,
    getUserByEmail,
    verifyPassword,
} from '@/lib/auth';
import { enforceRateLimit } from '@/lib/rate-limit';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email și parola sunt obligatorii' },
                { status: 400 }
            );
        }

        const limited = await enforceRateLimit(
            req,
            '/api/auth/login',
            10,
            15 * 60 * 1000,
            'Prea multe încercări de autentificare. Încearcă din nou în 15 minute.'
        );
        if (limited) return limited;

        const user = await getUserByEmail(email);
        if (!user) {
            return NextResponse.json(
                { error: 'Email sau parolă incorectă' },
                { status: 401 }
            );
        }

        const isValid = await verifyPassword(password, user.password_hash);
        if (!isValid) {
            return NextResponse.json(
                { error: 'Email sau parolă incorectă' },
                { status: 401 }
            );
        }

        const token = generateToken(
            {
                userId: user.id,
                email: user.email,
            },
            user.password_hash
        );

        const response = NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                email_verified: user.email_verified,
            },
        });

        response.cookies.set(getAuthCookieName(), token, getAuthCookieOptions());
        return response;
    } catch (error: any) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Eroare internă a serverului' },
            { status: 500 }
        );
    }
}
