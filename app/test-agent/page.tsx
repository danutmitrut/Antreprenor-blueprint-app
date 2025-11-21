'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TestAgentPage() {
    const router = useRouter();

    useEffect(() => {
        // Mock HEXACO scores - typical entrepreneurial profile
        const mockScores = {
            factors: {
                "Honesty-Humility": 3.2,
                "Emotionality": 2.8,
                "Extraversion": 4.1,
                "Agreeableness": 3.5,
                "Conscientiousness": 4.3,
                "Openness to Experience": 4.0
            },
            facets: {
                "Sinceritate": 3.0,
                "Corectitudine": 3.5,
                "Evitarea lăcomiei": 3.0,
                "Modestie": 3.2,
                "Frica": 2.5,
                "Anxietate": 3.0,
                "Dependență": 2.8,
                "Sentimentalitate": 3.0,
                "Stima de sine socială": 4.2,
                "Îndrăzneală socială": 4.0,
                "Sociabilitate": 4.1,
                "Vivacitate": 4.2,
                "Iertare": 3.5,
                "Blândețe": 3.4,
                "Flexibilitate": 3.6,
                "Răbdare": 3.5,
                "Organizare": 4.5,
                "Diligență": 4.3,
                "Perfecționism": 4.2,
                "Prudență": 4.2,
                "Apreciere estetică": 3.8,
                "Curiozitate": 4.2,
                "Creativitate": 4.0,
                "Neconvenționalitate": 4.0
            }
        };

        const mockUserInfo = {
            firstName: "Ion",
            lastName: "Luca",
            age: 35,
            gender: "Masculin",
            experience: 8,
            industry: "IT & Software",
            role: "Fondator & CEO"
        };

        const mockUserGoals = {
            "Obiectiv 1": "Scalarea echipei de la 10 la 50 angajați în următorii 2 ani",
            "Obiectiv 2": "Creșterea veniturilor cu 300% și atingerea pragului de 5M EUR ARR",
            "Obiectiv 3": "Îmbunătățirea delegării și evitarea micromanagementului"
        };

        // Save to localStorage
        localStorage.setItem('hexaco_scores', JSON.stringify(mockScores)); // Pre-calculated scores
        localStorage.setItem('user_info', JSON.stringify(mockUserInfo));
        localStorage.setItem('user_goals', JSON.stringify(mockUserGoals));

        // Small delay to ensure localStorage is saved
        setTimeout(() => {
            router.push('/chat');
        }, 100);
    }, [router]);

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-slate-600 font-medium">Încărcare scoruri mock...</p>
                <p className="text-slate-500 text-sm mt-2">Redirecting la chat agent...</p>
            </div>
        </div>
    );
}
