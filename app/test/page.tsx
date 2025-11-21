'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import { HEXACO_QUESTIONS } from '@/lib/hexaco-data';
import { useRouter } from 'next/navigation';

export default function TestPage() {
    const router = useRouter();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [isLoaded, setIsLoaded] = useState(false);

    // Load progress from localStorage
    useEffect(() => {
        // Verifică dacă datele personale și obiectivele au fost completate
        const savedUserInfo = localStorage.getItem('user_info');
        const savedUserGoals = localStorage.getItem('user_goals');

        if (!savedUserInfo || !savedUserGoals) {
            router.push('/start');
            return;
        }

        const savedAnswers = localStorage.getItem('hexaco_answers');
        if (savedAnswers) {
            setAnswers(JSON.parse(savedAnswers));
        }
        setIsLoaded(true);
    }, [router]);

    // Save progress
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('hexaco_answers', JSON.stringify(answers));
        }
    }, [answers, isLoaded]);

    const currentQuestion = HEXACO_QUESTIONS[currentQuestionIndex];
    const progress = ((Object.keys(answers).length) / HEXACO_QUESTIONS.length) * 100;
    const isLastQuestion = currentQuestionIndex === HEXACO_QUESTIONS.length - 1;

    const handleAnswer = (value: number) => {
        setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));

        // Auto-advance after a short delay if not the last question
        if (!isLastQuestion) {
            setTimeout(() => {
                setCurrentQuestionIndex(prev => prev + 1);
            }, 250);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < HEXACO_QUESTIONS.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            finishTest();
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const finishTest = () => {
        if (Object.keys(answers).length < HEXACO_QUESTIONS.length) {
            alert('Te rugăm să răspunzi la toate întrebările înainte de a finaliza.');
            return;
        }
        router.push('/rezultate');
    };

    if (!isLoaded) return null;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans text-slate-900">
            {/* Header / Progress */}
            <div className="w-full max-w-2xl mb-8">
                <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
                    <span>Întrebarea {currentQuestionIndex + 1} din {HEXACO_QUESTIONS.length}</span>
                    <span>{Math.round(progress)}% Completat</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>

            {/* Question Card */}
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 md:p-12 min-h-[400px] flex flex-col justify-between relative overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestion.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex-grow flex flex-col justify-center"
                    >
                        <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-8 leading-tight text-center">
                            {currentQuestion.text}
                        </h2>

                        {/* Options */}
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <button
                                    key={value}
                                    onClick={() => handleAnswer(value)}
                                    className={`
                    py-4 px-2 rounded-xl border-2 transition-all duration-200 font-medium text-sm md:text-base
                    ${answers[currentQuestion.id] === value
                                            ? 'border-primary bg-primary/10 text-primary shadow-md scale-105'
                                            : 'border-slate-100 hover:border-primary/50 hover:bg-slate-50 text-slate-600'}
                  `}
                                >
                                    {value === 1 && "Dezacord Puternic"}
                                    {value === 2 && "Dezacord"}
                                    {value === 3 && "Neutru"}
                                    {value === 4 && "Acord"}
                                    {value === 5 && "Acord Puternic"}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex justify-between mt-12 pt-6 border-t border-slate-100">
                    <button
                        onClick={handlePrev}
                        disabled={currentQuestionIndex === 0}
                        className="flex items-center text-slate-400 hover:text-slate-600 disabled:opacity-30 transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5 mr-1" />
                        Anterior
                    </button>

                    {isLastQuestion ? (
                        <button
                            onClick={finishTest}
                            className="flex items-center bg-success hover:bg-success-dark text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                        >
                            Generează Fișa
                            <CheckCircle className="w-5 h-5 ml-2" />
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            className="flex items-center text-primary hover:text-primary-dark font-medium transition-colors"
                        >
                            Următorul
                            <ChevronRight className="w-5 h-5 ml-1" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
