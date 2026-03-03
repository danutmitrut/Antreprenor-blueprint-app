import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing Supabase environment variables for rate limiting');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export function getRequestIp(req: Request): string {
    const forwardedFor = req.headers.get('x-forwarded-for');
    if (forwardedFor) {
        return forwardedFor.split(',')[0].trim();
    }

    return req.headers.get('x-real-ip') || 'unknown';
}

export async function enforceRateLimit(
    req: Request,
    endpoint: string,
    limit: number,
    windowMs: number,
    message: string
): Promise<NextResponse | null> {
    const ip = getRequestIp(req);
    const windowStart = new Date(Date.now() - windowMs).toISOString();

    const { count, error: countError } = await supabase
        .from('rate_limits')
        .select('*', { count: 'exact', head: true })
        .eq('ip_address', ip)
        .eq('endpoint', endpoint)
        .gte('created_at', windowStart);

    if (countError) {
        console.error(`Rate limit count error for ${endpoint}:`, countError);
        return null;
    }

    if ((count ?? 0) >= limit) {
        return NextResponse.json(
            {
                error: message,
            },
            {
                status: 429,
                headers: {
                    'Retry-After': String(Math.ceil(windowMs / 1000)),
                },
            }
        );
    }

    const { error: insertError } = await supabase.from('rate_limits').insert({
        ip_address: ip,
        endpoint,
    });

    if (insertError) {
        console.error(`Rate limit insert error for ${endpoint}:`, insertError);
    }

    return null;
}
