import { NextResponse } from 'next/server';
import {
    createUser,
    generateToken,
    getAuthCookieName,
    getAuthCookieOptions,
} from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const { email, password, first_name, last_name } = await req.json();

        if (!email || !password || !first_name || !last_name) {
            return NextResponse.json(
                { error: 'Toate câmpurile sunt obligatorii' },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Email invalid' },
                { status: 400 }
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                { error: 'Parola trebuie să aibă cel puțin 8 caractere' },
                { status: 400 }
            );
        }

        const { user, error } = await createUser({
            email,
            password,
            first_name,
            last_name,
        });

        if (error || !user) {
            return NextResponse.json(
                { error: error || 'Eroare la crearea contului' },
                { status: 400 }
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
        console.error('Register error:', error);
        return NextResponse.json(
            { error: 'Eroare internă a serverului' },
            { status: 500 }
        );
    }
}
