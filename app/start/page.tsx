'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, User, Mail, Calendar, Users } from 'lucide-react';

export default function StartPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        age: '',
        gender: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validare
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.age || !formData.gender) {
            alert('Te rugăm să completezi toate câmpurile.');
            return;
        }

        // Salvează în localStorage
        localStorage.setItem('user_info', JSON.stringify(formData));

        // Redirect la obiective
        router.push('/obiective');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <div className="max-w-2xl w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 relative">
                            <img src="/logo.png" alt="AI Architect" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-slate-900 font-bold text-lg">AI ARCHITECT</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Începem construcția profilului tău antreprenorial
                    </h1>
                    <p className="text-slate-600 text-lg">
                        Pentru o precizie a interpretării avem nevoie de câteva informații de bază
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Nume */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    <User className="w-4 h-4 inline mr-2" />
                                    Prenume *
                                </label>
                                <input
                                    type="text"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 placeholder:text-slate-400"
                                    placeholder="Ion"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Nume de familie *
                                </label>
                                <input
                                    type="text"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 placeholder:text-slate-400"
                                    placeholder="Popescu"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                <Mail className="w-4 h-4 inline mr-2" />
                                Adresă de email *
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 placeholder:text-slate-400"
                                placeholder="ion.popescu@exemplu.ro"
                                required
                            />
                        </div>

                        {/* Vârstă */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                <Calendar className="w-4 h-4 inline mr-2" />
                                Vârstă *
                            </label>
                            <input
                                type="number"
                                min="18"
                                max="100"
                                value={formData.age}
                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 placeholder:text-slate-400"
                                placeholder="35"
                                required
                            />
                        </div>

                        {/* Gen */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-3">
                                <Users className="w-4 h-4 inline mr-2" />
                                Gen *
                            </label>
                            <div className="flex gap-4">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        checked={formData.gender === 'male'}
                                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                        className="w-4 h-4 text-primary focus:ring-primary cursor-pointer"
                                        required
                                    />
                                    <span className="ml-2 text-slate-700">Bărbat</span>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        checked={formData.gender === 'female'}
                                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                        className="w-4 h-4 text-primary focus:ring-primary cursor-pointer"
                                    />
                                    <span className="ml-2 text-slate-700">Femeie</span>
                                </label>
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => router.push('/')}
                                className="flex items-center justify-center px-6 py-3 border border-slate-200 rounded-xl text-slate-600 font-medium hover:bg-slate-50 transition-all"
                            >
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                Înapoi
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
                    <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                </div>
                <p className="text-center text-sm text-slate-500 mt-3">Pasul 1 din 4: Date personale</p>
            </div>
        </div>
    );
}
