import { NextResponse } from 'next/server';
import { getAuthCookieName, getExpiredAuthCookieOptions } from '@/lib/auth';

export async function POST() {
    const response = NextResponse.json({ success: true });
    response.cookies.set(getAuthCookieName(), '', getExpiredAuthCookieOptions());
    return response;
}
