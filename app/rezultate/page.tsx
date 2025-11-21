'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { calculateHexacoScores, HexacoScores } from '@/lib/scoring';
import { DOMAINS, FACETS } from '@/lib/hexaco-data';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Download, MessageSquare, Copy, ArrowRight } from 'lucide-react';

export default function ResultsPage() {
    const router = useRouter();
    const [scores, setScores] = useState<HexacoScores | null>(null);
    const [userInfo, setUserInfo] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedAnswers = localStorage.getItem('hexaco_answers');
        const savedUserInfo = localStorage.getItem('user_info');

        if (savedAnswers) {
            const answers = JSON.parse(savedAnswers);
            const calculated = calculateHexacoScores(answers);
            setScores(calculated);
        } else {
            router.push('/test');
        }

        if (savedUserInfo) {
            setUserInfo(JSON.parse(savedUserInfo));
        }

        setLoading(false);
    }, [router]);

    if (loading || !scores) return <div className="min-h-screen flex items-center justify-center">Calculare rezultate...</div>;

    // Prepare data for Radar Chart
    const radarData = Object.entries(DOMAINS).map(([key, label]) => ({
        subject: label,
        A: scores.factors[key],
        fullMark: 5,
    }));

    const handleGenerateReport = () => {
        router.push('/chat');
    };

    const copyToClipboard = () => {
        const text = generateMarkdownSheet(scores);
        navigator.clipboard.writeText(text);
        alert('Fișa a fost copiată în clipboard!');
    };

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
            <div className="max-w-5xl mx-auto">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">Profilul Tău HEXACO</h1>
                    <p className="text-slate-600 text-lg">Analiza preliminară a celor 6 dimensiuni majore și 24 de fațete.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Radar Chart Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
                        <h2 className="text-xl font-semibold mb-6 text-primary">Privire de Ansamblu</h2>
                        <div className="w-full h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                    <PolarGrid stroke="#e2e8f0" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 12 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} />
                                    <Radar
                                        name="Scor"
                                        dataKey="A"
                                        stroke="#0891B2"
                                        strokeWidth={3}
                                        fill="#0891B2"
                                        fillOpacity={0.3}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Actions Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-center space-y-6">
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                            <h3 className="text-lg font-semibold mb-2 text-slate-800">Pasul Următor</h3>
                            <p className="text-slate-600 mb-4">
                                Transformă aceste cifre într-un <strong>Plan Strategic de Business</strong>.
                                Agentul nostru AI va analiza profilul tău în profunzime.
                            </p>
                            <button
                                onClick={handleGenerateReport}
                                className="w-full bg-accent hover:bg-accent-dark text-white py-4 px-6 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center group"
                            >
                                <MessageSquare className="w-5 h-5 mr-2" />
                                Discută cu Agentul & Generează Raportul
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={copyToClipboard}
                                className="flex items-center justify-center p-4 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 font-medium transition-colors"
                            >
                                <Copy className="w-5 h-5 mr-2" />
                                Copiază Fișa
                            </button>
                            <button
                                onClick={() => {
                                    const text = generateMarkdownSheet(scores);
                                    const blob = new Blob([text], { type: 'text/plain' });
                                    const url = URL.createObjectURL(blob);
                                    const a = document.createElement('a');
                                    a.href = url;
                                    const userName = userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : 'Utilizator';
                                    a.download = `Fisa de scoruri Hexaco ${userName}.txt`;
                                    a.click();
                                    URL.revokeObjectURL(url);
                                }}
                                className="flex items-center justify-center p-4 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 font-medium transition-colors"
                            >
                                <Download className="w-5 h-5 mr-2" />
                                Descarcă Fișa
                            </button>
                        </div>
                    </div>
                </div>

                {/* Detailed Scores */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(DOMAINS).map(([domainKey, domainLabel]) => (
                        <div key={domainKey} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                                <h3 className="font-bold text-slate-800">{domainLabel}</h3>
                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-bold text-sm">
                                    {scores.factors[domainKey]}
                                </span>
                            </div>
                            <div className="p-6 space-y-4">
                                {Object.entries(FACETS).filter(([key]) => {
                                    // This is a bit hacky, ideally we map facets to domains in data structure
                                    // But based on naming convention or manual mapping we can do it.
                                    // Let's rely on the order or just filter by checking if the facet belongs to this domain in HEXACO_QUESTIONS
                                    // Actually, we don't have a direct map in FACETS object.
                                    // Let's use a helper or just hardcode the groups for display.
                                    return true;
                                }).map(([facetKey, facetLabel]) => {
                                    // Filter facets belonging to this domain
                                    // We need a map. Let's create a quick map here or in data.
                                    // For now, I will just list all facets and filter by domain logic (H, E, X, A, C, O)
                                    // H facets: Sincerity, Fairness, Greed Avoidance, Modesty
                                    // ...
                                    // To keep it simple and robust, let's assume I'll fix the mapping in the display logic below.
                                    return null;
                                })}

                                {/* Render Facets for this Domain */}
                                {getFacetsForDomain(domainKey).map(facet => (
                                    <div key={facet} className="flex justify-between items-center">
                                        <span className="text-slate-600 text-sm">{FACETS[facet as keyof typeof FACETS]}</span>
                                        <div className="flex items-center">
                                            <div className="w-24 h-2 bg-slate-100 rounded-full mr-3 overflow-hidden">
                                                <div
                                                    className="h-full bg-secondary"
                                                    style={{ width: `${(scores.facets[FACETS[facet as keyof typeof FACETS]] / 5) * 100}%` }}
                                                />
                                            </div>
                                            <span className="text-slate-900 font-medium text-sm w-6 text-right">
                                                {scores.facets[FACETS[facet as keyof typeof FACETS]]}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Helper to group facets (should be in data file ideally)
function getFacetsForDomain(domain: string): string[] {
    switch (domain) {
        case 'Honesty-Humility': return ['Sincerity', 'Fairness', 'Greed Avoidance', 'Modesty'];
        case 'Emotionality': return ['Fearfulness', 'Anxiety', 'Dependence', 'Sentimentality'];
        case 'Extraversion': return ['Social Self-Esteem', 'Social Boldness', 'Sociability', 'Liveliness'];
        case 'Agreeableness': return ['Forgiveness', 'Gentleness', 'Flexibility', 'Patience'];
        case 'Conscientiousness': return ['Organization', 'Diligence', 'Perfectionism', 'Prudence'];
        case 'Openness to Experience': return ['Aesthetic Appreciation', 'Inquisitiveness', 'Creativity', 'Unconventionality'];
        default: return [];
    }
}

function generateMarkdownSheet(scores: HexacoScores): string {
    let md = `# Profil HEXACO\n\n`;
    Object.entries(DOMAINS).forEach(([key, label]) => {
        md += `## ${label}: ${scores.factors[key]}\n`;
        getFacetsForDomain(key).forEach(facet => {
            const facetLabel = FACETS[facet as keyof typeof FACETS];
            md += `- ${facetLabel}: ${scores.facets[facetLabel]}\n`;
        });
        md += `\n`;
    });
    return md;
}
