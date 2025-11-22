import { createBrowserClient } from '@supabase/ssr';

export const createClient = () => {
    // Skip during SSR/build to prevent errors
    if (typeof window === 'undefined') {
        return null as any;
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
        throw new Error('Missing Supabase environment variables');
    }

    return createBrowserClient(url, key);
};
