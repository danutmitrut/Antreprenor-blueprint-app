import { NextResponse } from 'next/server';
import { getUserByResetToken, updateUserPassword } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const { token, password } = await req.json();

        // Validation
        if (!token || !password) {
            return NextResponse.json(
                { error: 'Token și parola sunt obligatorii' },
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

        // Get user by reset token
        const user = await getUserByResetToken(token);
        if (!user) {
            return NextResponse.json(
                { error: 'Token invalid sau expirat' },
                { status: 400 }
            );
        }

        // Check if token is expired
        if (user.password_reset_expires) {
            const expiresAt = new Date(user.password_reset_expires);
            const now = new Date();

            if (now > expiresAt) {
                return NextResponse.json(
                    { error: 'Token-ul a expirat. Te rog să solici unul nou.' },
                    { status: 400 }
                );
            }
        }

        // Update password
        const { success, error } = await updateUserPassword(user.id, password);

        if (!success || error) {
            return NextResponse.json(
                { error: error || 'Eroare la actualizarea parolei' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Parola a fost resetată cu succes',
        });
    } catch (error: any) {
        console.error('Reset password error:', error);
        return NextResponse.json(
            { error: 'Eroare internă a serverului' },
            { status: 500 }
        );
    }
}
