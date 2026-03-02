'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, Target, AlertCircle, Lightbulb } from 'lucide-react';

export default function ObjectivesPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        mainGoal: '',
        mainObstacle: '',
        expectations: ''
    });
    const [userInfo, setUserInfo] = useState<any>(null);
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        // Verifică dacă datele personale au fost completate
        const savedUserInfo = localStorage.getItem('user_info');
        if (!savedUserInfo) {
            router.push('/start');
            return;
        }
        setUserInfo(JSON.parse(savedUserInfo));
    }, [router]);

    const validateField = (value: string): string | null => {
        if (!value.trim()) return 'Acest câmp este obligatoriu.';
        if (value.trim().length < 30) return `Încă ${30 - value.trim().length} caractere necesare (minim 30).`;
        const invalidTextRegex = /^[\d\s\W]+$/;
        if (invalidTextRegex.test(value)) return 'Scrie în text coerent, nu doar cifre sau semne.';
        const wordCountRegex = /[a-zA-ZăâîșțĂÂÎȘȚ]{2,}/g;
        const words = (value.match(wordCountRegex) || []).length;
        if (words < 4) return 'Răspunsul are nevoie de cel puțin 4 cuvinte semnificative.';
        return null;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const errors: Record<string, string> = {};
        const fields = [
            { key: 'mainGoal', label: 'Întrebarea 1' },
            { key: 'mainObstacle', label: 'Întrebarea 2' },
            { key: 'expectations', label: 'Întrebarea 3' },
        ];

        for (const field of fields) {
            const err = validateField(formData[field.key as keyof typeof formData]);
            if (err) errors[field.key] = err;
        }

        setFieldErrors(errors);

        if (Object.keys(errors).length > 0) {
            const count = Object.keys(errors).length;
            setError(`${count === 1 ? 'Un răspuns necesită' : `${count} răspunsuri necesită`} completare — verifică câmpurile marcate mai jos.`);
            return;
        }

        // Salvează în localStorage
        localStorage.setItem('user_goals', JSON.stringify(formData));

        // Șterge răspunsurile vechi pentru a începe testul curat
        localStorage.removeItem('hexaco_answers');
        localStorage.removeItem('hexaco_scores');

        // Redirect la test
        router.push('/test');
    };

    if (!userInfo) {
        return <div className="min-h-screen flex items-center justify-center">Se încarcă...</div>;
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <div className="max-w-3xl w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 relative">
                            <img src="/logo.png" alt="AI Architect" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-slate-900 font-bold text-lg">AI ARCHITECT</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Hai să înțelegem care sunt obiectivele tale
                    </h1>
                    <p className="text-slate-600 text-lg">
                        Aceste răspunsuri vor fi folosite în Capitolul IV pentru a personaliza strategiile și recomandările
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Error Alert */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                                <div className="mt-0.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <p className="text-sm font-medium">{error}</p>
                            </div>
                        )}

                        {/* Întrebarea 1 */}
                        <div>
                            <label className="block text-lg font-bold text-slate-900 mb-3">
                                <Target className="w-5 h-5 inline mr-2 text-primary" />
                                1. Care este principalul obiectiv personal sau profesional pe care dorești să îl atingi?
                            </label>
                            <textarea
                                value={formData.mainGoal}
                                onChange={(e) => { setFormData({ ...formData, mainGoal: e.target.value }); setFieldErrors(prev => ({ ...prev, mainGoal: undefined as any })); }}
                                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all resize-none text-slate-900 placeholder:text-slate-400 ${fieldErrors.mainGoal ? 'border-red-300 focus:ring-red-400' : 'border-slate-200 focus:ring-primary'}`}
                                rows={4}
                                placeholder="Ex: Creșterea veniturilor, scalarea afacerii, echilibru viață personală-business..."
                                required
                            />
                            <div className="flex justify-between items-start mt-2">
                                <div className="flex-1">
                                    {fieldErrors.mainGoal ? (
                                        <p className="text-sm text-red-600 font-medium">{fieldErrors.mainGoal}</p>
                                    ) : (
                                        <p className="text-sm text-slate-500">Fii cât mai specific posibil. De exemplu: "Vreau să cresc veniturile afacerii de la 50K la 200K în următorul an."</p>
                                    )}
                                </div>
                                <span className={`text-xs ml-3 tabular-nums ${formData.mainGoal.trim().length >= 30 ? 'text-emerald-600' : 'text-slate-400'}`}>
                                    {formData.mainGoal.trim().length}/30
                                </span>
                            </div>
                        </div>

                        {/* Întrebarea 2 */}
                        <div>
                            <label className="block text-lg font-bold text-slate-900 mb-3">
                                <AlertCircle className="w-5 h-5 inline mr-2 text-amber-600" />
                                2. Care crezi că este cel mai mare obstacol care te împiedică să atingi acest obiectiv?
                            </label>
                            <textarea
                                value={formData.mainObstacle}
                                onChange={(e) => { setFormData({ ...formData, mainObstacle: e.target.value }); setFieldErrors(prev => ({ ...prev, mainObstacle: undefined as any })); }}
                                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all resize-none text-slate-900 placeholder:text-slate-400 ${fieldErrors.mainObstacle ? 'border-red-300 focus:ring-red-400' : 'border-slate-200 focus:ring-primary'}`}
                                rows={4}
                                placeholder="Ex: Lipsa de claritate, procrastinarea, frica de eșec, lipsa de timp..."
                                required
                            />
                            <div className="flex justify-between items-start mt-2">
                                <div className="flex-1">
                                    {fieldErrors.mainObstacle ? (
                                        <p className="text-sm text-red-600 font-medium">{fieldErrors.mainObstacle}</p>
                                    ) : (
                                        <p className="text-sm text-slate-500">Poate fi un obstacol extern (resurse, piață) sau intern (mentalitate, obiceiuri).</p>
                                    )}
                                </div>
                                <span className={`text-xs ml-3 tabular-nums ${formData.mainObstacle.trim().length >= 30 ? 'text-emerald-600' : 'text-slate-400'}`}>
                                    {formData.mainObstacle.trim().length}/30
                                </span>
                            </div>
                        </div>

                        {/* Întrebarea 3 */}
                        <div>
                            <label className="block text-lg font-bold text-slate-900 mb-3">
                                <Lightbulb className="w-5 h-5 inline mr-2 text-emerald-600" />
                                3. Ce ți-ar plăcea să obții din această analiză de personalitate?
                            </label>
                            <textarea
                                value={formData.expectations}
                                onChange={(e) => { setFormData({ ...formData, expectations: e.target.value }); setFieldErrors(prev => ({ ...prev, expectations: undefined as any })); }}
                                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all resize-none text-slate-900 placeholder:text-slate-400 ${fieldErrors.expectations ? 'border-red-300 focus:ring-red-400' : 'border-slate-200 focus:ring-primary'}`}
                                rows={4}
                                placeholder="Ex: O mai bună înțelegere a punctelor tale forte, strategii de optimizare, claritate în luarea deciziilor..."
                                required
                            />
                            <div className="flex justify-between items-start mt-2">
                                <div className="flex-1">
                                    {fieldErrors.expectations ? (
                                        <p className="text-sm text-red-600 font-medium">{fieldErrors.expectations}</p>
                                    ) : (
                                        <p className="text-sm text-slate-500">Ce tip de insight sau strategie te-ar ajuta cel mai mult acum?</p>
                                    )}
                                </div>
                                <span className={`text-xs ml-3 tabular-nums ${formData.expectations.trim().length >= 30 ? 'text-emerald-600' : 'text-slate-400'}`}>
                                    {formData.expectations.trim().length}/30
                                </span>
                            </div>
                        </div>

                        {/* Info Box */}
                        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                            <p className="text-sm text-emerald-800">
                                <strong>Notă:</strong> Răspunsurile tale vor fi integrate în Capitolul IV al raportului,
                                unde vom corela analiza HEXACO cu obiectivele și provocările tale concrete.
                            </p>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => router.push('/start')}
                                className="flex items-center justify-center px-6 py-3 border border-slate-200 rounded-xl text-slate-600 font-medium hover:bg-slate-50 transition-all"
                            >
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                Anterior
                            </button>
                            <button
                                type="submit"
                                className="flex-1 flex items-center justify-center bg-accent hover:bg-accent-dark text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5"
                            >
                                Mai departe
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </button>
                        </div>
                    </form>
                </div>

                {/* Progress Indicator */}
                <div className="mt-8 flex items-center justify-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                </div>
                <p className="text-center text-sm text-slate-500 mt-3">Pasul 2 din 4: Obiective și așteptări</p>
            </div>
        </div>
    );
}
