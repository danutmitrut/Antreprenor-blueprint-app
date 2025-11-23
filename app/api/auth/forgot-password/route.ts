import { NextResponse } from 'next/server';
import {
    getUserByEmail,
    generateResetToken,
    setPasswordResetToken,
} from '@/lib/auth';
import { sendPasswordResetEmail } from '@/lib/email';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        // Validation
        if (!email) {
            return NextResponse.json(
                { error: 'Email este obligatoriu' },
                { status: 400 }
            );
        }

        // Get user
        const user = await getUserByEmail(email);
        if (!user) {
            // Return success even if user doesn't exist (security best practice)
            // This prevents email enumeration attacks
            return NextResponse.json({
                success: true,
                message:
                    'Dacă emailul există în baza noastră de date, vei primi instrucțiuni de resetare.',
            });
        }

        // Generate reset token
        const resetToken = generateResetToken();

        // Save reset token to database
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

        // Send password reset email
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
