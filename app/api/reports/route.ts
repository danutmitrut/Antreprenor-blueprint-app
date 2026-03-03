import { NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
    try {
        const auth = await authenticateRequest(req);
        if (!auth) {
            return NextResponse.json(
                { error: 'Token invalid sau expirat' },
                { status: 401 }
            );
        }

        const { data: reports, error } = await supabase
            .from('reports')
            .select('id, created_at, hexaco_scores, user_info, user_goals')
            .eq('user_id', auth.user.id)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Fetch reports error:', error);
            return NextResponse.json(
                { error: 'Eroare la încărcarea rapoartelor' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            reports: reports || [],
        });
    } catch (error: any) {
        console.error('Get reports error:', error);
        return NextResponse.json(
            { error: 'Eroare internă a serverului' },
            { status: 500 }
        );
    }
}
