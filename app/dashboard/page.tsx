'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Loader2,
    FileText,
    Calendar,
    CreditCard,
    LogOut,
    User,
    CheckCircle,
    XCircle,
    AlertCircle,
    ExternalLink,
    PlusCircle
} from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface UserData {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    has_active_subscription: boolean;
    created_at: string;
}

interface Subscription {
    status: string;
    current_period_end: string;
    cancel_at_period_end: boolean;
}

interface Report {
    id: string;
    created_at: string;
    hexaco_scores: any;
    user_info: any;
}

export default function DashboardPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<UserData | null>(null);
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [reports, setReports] = useState<Report[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem('auth_token');

            if (!token) {
                router.push('/auth/login');
                return;
            }

            // Fetch user info
            const userResponse = await fetch('/api/auth/me', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!userResponse.ok) {
                throw new Error('Sesiune expirată');
            }

            const userData = await userResponse.json();
            setUser(userData.user);

            // Fetch subscription info
            const subResponse = await fetch('/api/subscription', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (subResponse.ok) {
                const subData = await subResponse.json();
                setSubscription(subData.subscription);
            }

            // Fetch reports
            const reportsResponse = await fetch('/api/reports', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (reportsResponse.ok) {
                const reportsData = await reportsResponse.json();
                setReports(reportsData.reports || []);
            }

        } catch (err: any) {
            setError(err.message);
            if (err.message === 'Sesiune expirată') {
                localStorage.removeItem('auth_token');
                router.push('/auth/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        router.push('/auth/login');
    };

    const handleManageBilling = async () => {
        try {
            const token = localStorage.getItem('auth_token');
            const response = await fetch('/api/stripe/create-portal-session', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            }
        } catch (err) {
            console.error('Error creating portal session:', err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 p-4">
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">Eroare</h1>
                    <p className="text-slate-600 mb-6">{error}</p>
                    <button
                        onClick={() => router.push('/auth/login')}
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all"
                    >
                        Înapoi la Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                                <User className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-slate-900">
                                    {user?.first_name} {user?.last_name}
                                </h1>
                                <p className="text-sm text-slate-500">{user?.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="text-sm font-medium">Deconectare</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Subscription Status Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <CreditCard className="w-5 h-5 text-blue-600" />
                                <h2 className="text-lg font-bold text-slate-900">Abonament</h2>
                            </div>

                            {user?.has_active_subscription ? (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        <span className="text-sm font-semibold text-green-700">Activ</span>
                                    </div>
                                    {subscription && (
                                        <>
                                            <div className="text-sm text-slate-600">
                                                <span className="font-medium">Expiră la:</span>
                                                <br />
                                                {new Date(subscription.current_period_end).toLocaleDateString('ro-RO', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </div>
                                            {subscription.cancel_at_period_end && (
                                                <div className="bg-amber-50 border border-amber-200 text-amber-700 p-3 rounded-lg text-sm">
                                                    <AlertCircle className="w-4 h-4 inline mr-1" />
                                                    Abonamentul va fi anulat la expirare
                                                </div>
                                            )}
                                        </>
                                    )}
                                    <button
                                        onClick={handleManageBilling}
                                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 text-sm"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        Gestionează Abonamentul
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <XCircle className="w-5 h-5 text-red-600" />
                                        <span className="text-sm font-semibold text-red-700">Inactiv</span>
                                    </div>
                                    <p className="text-sm text-slate-600">
                                        Abonamentul tău a expirat sau a fost anulat.
                                    </p>
                                    <Link
                                        href="/start"
                                        className="block w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition-all text-center text-sm"
                                    >
                                        Reînnoiește Abonamentul
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
                            <h2 className="text-lg font-bold text-slate-900 mb-4">Acțiuni Rapide</h2>
                            <div className="space-y-3">
                                <Link
                                    href="/test"
                                    className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-lg transition-colors group"
                                >
                                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                                        <PlusCircle className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-slate-900 text-sm">Raport Nou</p>
                                        <p className="text-xs text-slate-500">Începe test HEXACO</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Reports List */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-blue-600" />
                                    <h2 className="text-lg font-bold text-slate-900">Rapoartele Tale</h2>
                                </div>
                                <span className="text-sm text-slate-500">
                                    {reports.length} {reports.length === 1 ? 'raport' : 'rapoarte'}
                                </span>
                            </div>

                            {reports.length === 0 ? (
                                <div className="text-center py-12">
                                    <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                                    <p className="text-slate-600 mb-4">
                                        Nu ai generat încă niciun raport HEXACO.
                                    </p>
                                    <Link
                                        href="/test"
                                        className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all"
                                    >
                                        Începe Primul Test
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {reports.map((report) => (
                                        <div
                                            key={report.id}
                                            className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50/50 transition-all group"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Calendar className="w-4 h-4 text-slate-400" />
                                                        <span className="text-sm text-slate-600">
                                                            {new Date(report.created_at).toLocaleDateString('ro-RO', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                            })}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-slate-700">
                                                        <span className="font-medium">Industrie:</span>{' '}
                                                        {report.user_info?.industry || 'N/A'}
                                                    </p>
                                                    <p className="text-sm text-slate-700">
                                                        <span className="font-medium">Vârstă:</span>{' '}
                                                        {report.user_info?.age || 'N/A'}
                                                    </p>
                                                </div>
                                                <Link
                                                    href={`/dashboard/reports/${report.id}`}
                                                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all text-sm"
                                                >
                                                    Vezi Raport
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
