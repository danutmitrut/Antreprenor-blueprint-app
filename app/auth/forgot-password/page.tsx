'use client';

import { useState } from 'react';
import { Loader2, AlertCircle, Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function ForgotPasswordPage() {
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
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Eroare la trimiterea email-ului');
            }

            setSuccess(true);
        } catch (err: any) {
            setError(err.message || 'Eroare la trimiterea email-ului.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
                <Link
                    href="/auth/login"
                    className="flex items-center text-slate-600 hover:text-slate-900 mb-6 text-sm transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                    Înapoi la Login
                </Link>

                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">Ai uitat parola?</h1>
                    <p className="text-slate-600">
                        Introduce adresa ta de email și îți vom trimite instrucțiuni pentru resetare.
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 mb-6 text-sm">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        {error}
                    </div>
                )}

                {success ? (
                    <div className="space-y-4">
                        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg text-center">
                            <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-600" />
                            <p className="font-semibold text-lg mb-1">Email trimis cu succes!</p>
                            <p className="text-sm">
                                Verifică inbox-ul (și folder-ul spam) pentru link-ul de resetare a parolei.
                            </p>
                        </div>
                        <Link
                            href="/auth/login"
                            className="block text-center text-sm text-blue-600 hover:text-blue-700 hover:underline"
                        >
                            Înapoi la Login
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleReset} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Adresa de Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all"
                                placeholder="email@exemplu.com"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                'Trimite Link de Resetare'
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
