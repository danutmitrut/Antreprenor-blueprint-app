import { NextResponse } from 'next/server';
import { createUser, generateToken } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const { email, password, first_name, last_name } = await req.json();

        // Validation
        if (!email || !password || !first_name || !last_name) {
            return NextResponse.json(
                { error: 'Toate câmpurile sunt obligatorii' },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Email invalid' },
                { status: 400 }
            );
        }

        // Password validation (minimum 8 characters)
        if (password.length < 8) {
            return NextResponse.json(
                { error: 'Parola trebuie să aibă cel puțin 8 caractere' },
                { status: 400 }
            );
        }

        // Create user
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

        // Generate JWT token
        const token = generateToken({
            userId: user.id,
            email: user.email,
        });

        // Return user data and token
        return NextResponse.json({
            success: true,
            token,
            user: {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                email_verified: user.email_verified,
            },
        });
    } catch (error: any) {
        console.error('Register error:', error);
        return NextResponse.json(
            { error: 'Eroare internă a serverului' },
            { status: 500 }
        );
    }
}
