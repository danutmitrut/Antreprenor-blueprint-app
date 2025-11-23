import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@antreprenorblueprint.com';
const SITE_NAME = 'Antreprenor Blueprint';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

// =====================================================
// EMAIL TEMPLATES
// =====================================================

/**
 * Welcome email template (sent after successful payment)
 */
function getWelcomeEmailHtml(params: {
    firstName: string;
    email: string;
    resetLink: string;
}): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bun venit la ${SITE_NAME}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            background: #ffffff;
            padding: 30px;
            border: 1px solid #e1e4e8;
            border-top: none;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            margin: 20px 0;
            font-weight: 600;
        }
        .footer {
            text-align: center;
            padding: 20px;
            color: #6b7280;
            font-size: 14px;
        }
        .info-box {
            background: #f3f4f6;
            padding: 15px;
            border-radius: 6px;
            margin: 20px 0;
            border-left: 4px solid #667eea;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎉 Bun venit la ${SITE_NAME}!</h1>
    </div>

    <div class="content">
        <p>Bună ${params.firstName},</p>

        <p>Îți mulțumim că ai ales <strong>${SITE_NAME}</strong>! Contul tău a fost creat cu succes.</p>

        <div class="info-box">
            <p><strong>📧 Email:</strong> ${params.email}</p>
            <p style="margin-bottom: 0;"><strong>🔐 Parolă:</strong> Pentru securitate, te rugăm să îți setezi propria parolă folosind link-ul de mai jos.</p>
        </div>

        <p><strong>Următorii pași:</strong></p>
        <ol>
            <li>Setează-ți parola folosind butonul de mai jos</li>
            <li>Conectează-te la contul tău</li>
            <li>Accesează rapoartele tale personalizate HEXACO</li>
        </ol>

        <div style="text-align: center;">
            <a href="${params.resetLink}" class="button">Setează Parola →</a>
        </div>

        <p style="margin-top: 30px;">Dacă butonul nu funcționează, copiază și lipește acest link în browser:</p>
        <p style="word-break: break-all; color: #667eea;">${params.resetLink}</p>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e1e4e8;">

        <p><strong>Ai întrebări?</strong> Răspunde la acest email și te vom ajuta cu plăcere!</p>

        <p>Cu respect,<br>Echipa ${SITE_NAME}</p>
    </div>

    <div class="footer">
        <p>Ai primit acest email pentru că ai achiziționat un abonament la ${SITE_NAME}.</p>
        <p>&copy; ${new Date().getFullYear()} ${SITE_NAME}. Toate drepturile rezervate.</p>
    </div>
</body>
</html>
    `.trim();
}

/**
 * Password reset email template
 */
function getPasswordResetEmailHtml(params: {
    firstName: string;
    resetLink: string;
}): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resetare Parolă - ${SITE_NAME}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            background: #ffffff;
            padding: 30px;
            border: 1px solid #e1e4e8;
            border-top: none;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            margin: 20px 0;
            font-weight: 600;
        }
        .footer {
            text-align: center;
            padding: 20px;
            color: #6b7280;
            font-size: 14px;
        }
        .warning-box {
            background: #fef3c7;
            padding: 15px;
            border-radius: 6px;
            margin: 20px 0;
            border-left: 4px solid #f59e0b;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🔐 Resetare Parolă</h1>
    </div>

    <div class="content">
        <p>Bună ${params.firstName},</p>

        <p>Am primit o solicitare de resetare a parolei pentru contul tău ${SITE_NAME}.</p>

        <p>Pentru a-ți reseta parola, apasă pe butonul de mai jos:</p>

        <div style="text-align: center;">
            <a href="${params.resetLink}" class="button">Resetează Parola →</a>
        </div>

        <p style="margin-top: 30px;">Dacă butonul nu funcționează, copiază și lipește acest link în browser:</p>
        <p style="word-break: break-all; color: #667eea;">${params.resetLink}</p>

        <div class="warning-box">
            <p><strong>⚠️ Important:</strong></p>
            <ul style="margin: 0;">
                <li>Link-ul expiră în <strong>1 oră</strong></li>
                <li>Dacă nu ai solicitat resetarea parolei, ignoră acest email</li>
                <li>Parola ta actuală rămâne activă până la resetare</li>
            </ul>
        </div>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e1e4e8;">

        <p>Cu respect,<br>Echipa ${SITE_NAME}</p>
    </div>

    <div class="footer">
        <p>Dacă ai probleme cu resetarea parolei, contactează-ne răspunzând la acest email.</p>
        <p>&copy; ${new Date().getFullYear()} ${SITE_NAME}. Toate drepturile rezervate.</p>
    </div>
</body>
</html>
    `.trim();
}

// =====================================================
// EMAIL SENDING FUNCTIONS
// =====================================================

/**
 * Send welcome email to new user after successful payment
 */
export async function sendWelcomeEmail(params: {
    email: string;
    firstName: string;
    lastName: string;
    resetToken: string;
}): Promise<{ success: boolean; error?: string }> {
    try {
        const resetLink = `${BASE_URL}/auth/reset-password?token=${params.resetToken}`;

        const { data, error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: params.email,
            subject: `Bun venit la ${SITE_NAME}! Setează-ți parola`,
            html: getWelcomeEmailHtml({
                firstName: params.firstName,
                email: params.email,
                resetLink,
            }),
        });

        if (error) {
            console.error('Resend error:', error);
            return { success: false, error: error.message };
        }

        console.log('✅ Welcome email sent:', data?.id);
        return { success: true };
    } catch (error: any) {
        console.error('Send welcome email exception:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(params: {
    email: string;
    firstName: string;
    resetToken: string;
}): Promise<{ success: boolean; error?: string }> {
    try {
        const resetLink = `${BASE_URL}/auth/reset-password?token=${params.resetToken}`;

        const { data, error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: params.email,
            subject: `Resetare Parolă - ${SITE_NAME}`,
            html: getPasswordResetEmailHtml({
                firstName: params.firstName,
                resetLink,
            }),
        });

        if (error) {
            console.error('Resend error:', error);
            return { success: false, error: error.message };
        }

        console.log('✅ Password reset email sent:', data?.id);
        return { success: true };
    } catch (error: any) {
        console.error('Send password reset email exception:', error);
        return { success: false, error: error.message };
    }
}
