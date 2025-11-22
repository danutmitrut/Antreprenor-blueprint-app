'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { Loader2, AlertCircle, Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function ForgotPasswordPage() {
    const supabase = createClient();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState('');

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/update-password`,
            });

            if (error) throw error;

            setSuccess(true);
        } catch (err: any) {
            setError(err.message || 'Eroare la trimiterea email-ului.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
                <Link href="/auth/login" className="flex items-center text-slate-500 hover:text-slate-800 mb-6 text-sm transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Înapoi la Login
                </Link>

                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-8 h-8 text-amber-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">Recuperare Parolă</h1>
                    <p className="text-slate-600">
                        Introduce email-ul pentru a primi instrucțiunile de resetare.
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 mb-6 text-sm">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        {error}
                    </div>
                )}

                {success ? (
                    <div className="bg-green-50 text-green-700 p-4 rounded-lg text-center mb-6">
                        <p className="font-medium">Email trimis!</p>
                        <p className="text-sm mt-1">Verifică inbox-ul (și spam) pentru link-ul de resetare.</p>
                    </div>
                ) : (
                    <form onSubmit={handleReset} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-slate-900 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                                placeholder="email@exemplu.com"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                'Trimite Link-ul'
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
