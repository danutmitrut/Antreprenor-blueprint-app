'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { Check, Loader2, AlertCircle } from 'lucide-react';

function SetupAccountContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const sessionId = searchParams.get('session_id');
    const supabase = createClient();

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [userData, setUserData] = useState<any>(null);
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (!sessionId) {
            setError('Sesiune invalidă.');
            setLoading(false);
            return;
        }

        const verifySession = async () => {
            try {
                const res = await fetch(`/api/stripe/verify-session?session_id=${sessionId}`);
                const data = await res.json();

                if (data.error) {
                    throw new Error(data.error);
                }

                setUserData(data);
            } catch (err: any) {
                setError(err.message || 'Eroare la verificarea sesiunii.');
            } finally {
                setLoading(false);
            }
        };

        verifySession();
    }, [sessionId]);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            const { data, error } = await supabase.auth.signUp({
                email: userData.email,
                password: password,
                options: {
                    data: {
                        full_name: userData.name,
                        stripe_customer_id: userData.customer_id,
                    },
                },
            });

            if (error) throw error;

            // Redirect to dashboard or home
            router.push('/chat'); // Or a welcome dashboard
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="w-6 h-6 text-red-600" />
                    </div>
                    <h1 className="text-xl font-bold text-slate-900 mb-2">A apărut o eroare</h1>
                    <p className="text-slate-600 mb-6">{error}</p>
                    <button
                        onClick={() => router.push('/')}
                        className="text-primary hover:underline"
                    >
                        Înapoi la prima pagină
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">Plată Confirmată!</h1>
                    <p className="text-slate-600">
                        Mulțumim, {userData?.name?.split(' ')[0]}.<br />
                        Setează o parolă pentru a-ți accesa contul.
                    </p>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                        <input
                            type="email"
                            value={userData?.email || ''}
                            disabled
                            className="w-full bg-slate-100 border border-slate-200 rounded-lg px-4 py-2 text-slate-500 cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Parolă Nouă</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-slate-900 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                            placeholder="Minim 6 caractere"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {submitting ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            'Creează Contul'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default function SetupAccountPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        }>
            <SetupAccountContent />
        </Suspense>
    );
}
