import { NextResponse } from 'next/server';
import {
    getUserByEmail,
    generateResetToken,
    setPasswordResetToken,
} from '@/lib/auth';
import { sendPasswordResetEmail } from '@/lib/email';
import { enforceRateLimit } from '@/lib/rate-limit';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                { error: 'Email este obligatoriu' },
                { status: 400 }
            );
        }

        const limited = await enforceRateLimit(
            req,
            '/api/auth/forgot-password',
            5,
            60 * 60 * 1000,
            'Prea multe cereri de resetare parolă. Încearcă din nou într-o oră.'
        );
        if (limited) return limited;

        const user = await getUserByEmail(email);
        if (!user) {
            return NextResponse.json({
                success: true,
                message:
                    'Dacă emailul există în baza noastră de date, vei primi instrucțiuni de resetare.',
            });
        }

        const resetToken = generateResetToken();

        const { success, error } = await setPasswordResetToken(
            user.id,
            resetToken
        );

        if (!success || error) {
            return NextResponse.json(
                { error: 'Eroare la generarea token-ului de resetare' },
                { status: 500 }
            );
        }

        const emailResult = await sendPasswordResetEmail({
            email: user.email,
            firstName: user.first_name,
            resetToken,
        });

        if (emailResult.success) {
            console.log('✅ Password reset email sent to:', user.email);
        } else {
            console.error('❌ Failed to send password reset email:', emailResult.error);
        }

        return NextResponse.json({
            success: true,
            message:
                'Dacă emailul există în baza noastră de date, vei primi instrucțiuni de resetare.',
        });
    } catch (error: any) {
        console.error('Forgot password error:', error);
        return NextResponse.json(
            { error: 'Eroare internă a serverului' },
            { status: 500 }
        );
    }
}
