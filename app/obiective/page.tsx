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

    useEffect(() => {
        // Verifică dacă datele personale au fost completate
        const savedUserInfo = localStorage.getItem('user_info');
        if (!savedUserInfo) {
            router.push('/start');
            return;
        }
        setUserInfo(JSON.parse(savedUserInfo));
    }, [router]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validare
        if (!formData.mainGoal || !formData.mainObstacle || !formData.expectations) {
            alert('Te rugăm să răspunzi la toate cele 3 întrebări.');
            return;
        }

        // Salvează în localStorage
        localStorage.setItem('user_goals', JSON.stringify(formData));

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
                        {/* Întrebarea 1 */}
                        <div>
                            <label className="block text-lg font-bold text-slate-900 mb-3">
                                <Target className="w-5 h-5 inline mr-2 text-primary" />
                                1. Care este principalul obiectiv personal sau profesional pe care dorești să îl atingi?
                            </label>
                            <textarea
                                value={formData.mainGoal}
                                onChange={(e) => setFormData({ ...formData, mainGoal: e.target.value })}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none text-slate-900 placeholder:text-slate-400"
                                rows={4}
                                placeholder="Ex: Creșterea veniturilor, scalarea afacerii, echilibru viață personală-business..."
                                required
                            />
                            <p className="text-sm text-slate-500 mt-2">
                                Fii cât mai specific posibil. De exemplu: "Vreau să cresc veniturile afacerii de la 50K la 200K în următorul an."
                            </p>
                        </div>

                        {/* Întrebarea 2 */}
                        <div>
                            <label className="block text-lg font-bold text-slate-900 mb-3">
                                <AlertCircle className="w-5 h-5 inline mr-2 text-amber-600" />
                                2. Care crezi că este cel mai mare obstacol care te împiedică să atingi acest obiectiv?
                            </label>
                            <textarea
                                value={formData.mainObstacle}
                                onChange={(e) => setFormData({ ...formData, mainObstacle: e.target.value })}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none text-slate-900 placeholder:text-slate-400"
                                rows={4}
                                placeholder="Ex: Lipsa de claritate, procrastinarea, frica de eșec, lipsa de timp..."
                                required
                            />
                            <p className="text-sm text-slate-500 mt-2">
                                Poate fi un obstacol extern (resurse, piață) sau intern (mentalitate, obiceiuri).
                            </p>
                        </div>

                        {/* Întrebarea 3 */}
                        <div>
                            <label className="block text-lg font-bold text-slate-900 mb-3">
                                <Lightbulb className="w-5 h-5 inline mr-2 text-emerald-600" />
                                3. Ce ți-ar plăcea să obții din această analiză de personalitate?
                            </label>
                            <textarea
                                value={formData.expectations}
                                onChange={(e) => setFormData({ ...formData, expectations: e.target.value })}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none text-slate-900 placeholder:text-slate-400"
                                rows={4}
                                placeholder="Ex: O mai bună înțelegere a punctelor tale forte, strategii de optimizare, claritate în luarea deciziilor..."
                                required
                            />
                            <p className="text-sm text-slate-500 mt-2">
                                Ce tip de insight sau strategie te-ar ajuta cel mai mult acum?
                            </p>
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
