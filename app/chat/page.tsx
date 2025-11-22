'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Send, User, Bot, Download, ArrowLeft, Square, Sparkles, X, Check } from 'lucide-react';
import { calculateHexacoScores } from '@/lib/scoring';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
    id: string;
    role: 'user' | 'assistant';
    content: string;
};

export default function ChatPage() {
    const router = useRouter();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const abortControllerRef = useRef<AbortController | null>(null);
    const [scores, setScores] = useState<any>(null);
    const [userInfo, setUserInfo] = useState<any>(null);
    const [userGoals, setUserGoals] = useState<any>(null);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [debugInfo, setDebugInfo] = useState<string>('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [showSubscription, setShowSubscription] = useState(false);
    const [isReportComplete, setIsReportComplete] = useState(false);
    const [subscriptionStep, setSubscriptionStep] = useState<'teaser' | 'details'>('teaser');

    useEffect(() => {
        const savedAnswers = localStorage.getItem('hexaco_answers');
        const savedUserInfo = localStorage.getItem('user_info');
        const savedUserGoals = localStorage.getItem('user_goals');
        const savedScores = localStorage.getItem('hexaco_scores'); // Pre-calculated scores for testing

        if (savedUserInfo && savedUserGoals) {
            const parsedUserInfo = JSON.parse(savedUserInfo);

            // Use pre-calculated scores if available (for testing), otherwise calculate from answers
            let calculated;
            if (savedScores) {
                calculated = JSON.parse(savedScores);
            } else if (savedAnswers) {
                const answers = JSON.parse(savedAnswers);
                calculated = calculateHexacoScores(answers);
            } else {
                router.push('/test');
                return;
            }

            setScores(calculated);
            setUserInfo(parsedUserInfo);
            setUserGoals(JSON.parse(savedUserGoals));
            setIsReady(true);

            // Add initial assistant message
            setMessages([{
                id: '1',
                role: 'assistant',
                content: `Bună, ${parsedUserInfo.firstName}! Am primit scorurile tale HEXACO. Sunt gata să generez raportul tău antreprenorial personalizat.\n\nÎnainte să încep, confirmă că vrei să pornesc cu **Capitolul I: Analiza Personalității pe Factori și Fațete**?`
            }]);
        } else {
            router.push('/test');
        }
    }, [router]);

    const handleStop = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
            setIsLoading(false);
            setIsGenerating(false);
            setDebugInfo('Generare oprită de utilizator');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // If currently generating, stop instead
        if (isGenerating) {
            handleStop();
            return;
        }

        if (!inputValue.trim() || isLoading) return;

        // Magic command for testing finish flow
        if (inputValue === '/test-finish') {
            setInputValue('');
            setMessages(prev => [
                ...prev,
                { id: Date.now().toString(), role: 'user', content: '/test-finish' },
                {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    content: "**Analiza s-a încheiat.**\n\n⚠️ **IMPORTANT:** Te rog să **salvezi această analiză acum** folosind butonul de **Export (DOCX)** din dreapta sus (sau copy-paste), pentru a nu pierde datele. Această sesiune se va închide curând."
                }
            ]);

            // Trigger the finish flow
            setTimeout(() => {
                setShowSubscription(true);
                setIsReportComplete(true);
            }, 6000); // 6 seconds delay

            return;
        }

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);
        setIsGenerating(true);
        setDebugInfo('Starting request...');

        // Create new AbortController for this request
        abortControllerRef.current = new AbortController();

        try {
            // Filter out messages with empty content (streaming placeholders)
            const validMessages = [...messages, userMessage].filter(m => m.content && m.content.trim() !== '');

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: validMessages.map(m => ({ role: m.role, content: m.content })),
                    scores,
                    userInfo,
                    userGoals
                }),
                signal: abortControllerRef.current.signal,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API Error: ${response.status} - ${errorText}`);
            }

            if (!response.body) throw new Error('No response body');

            setDebugInfo('Response received, starting stream...');

            // Create a placeholder message for the assistant
            const assistantMessageId = (Date.now() + 1).toString();
            setMessages(prev => [...prev, {
                id: assistantMessageId,
                role: 'assistant',
                content: ''
            }]);

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let accumulatedContent = '';
            let chunkCount = 0;

            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    setDebugInfo(`Stream finished. Chunks: ${chunkCount}. Total length: ${accumulatedContent.length}`);
                    break;
                }

                chunkCount++;
                const chunk = decoder.decode(value, { stream: true });
                accumulatedContent += chunk;

                setMessages(prev => prev.map(m =>
                    m.id === assistantMessageId
                        ? { ...m, content: accumulatedContent }
                        : m
                ));
            }

            // Trigger subscription offer after report generation
            // This condition checks if it's the first assistant message after the initial greeting
            const assistantMessagesCount = messages.filter(m => m.role === 'assistant').length;
            if (assistantMessagesCount === 1 && !isReportComplete) {
                // Delay increased to 6 seconds to allow user to read the "Save" instruction
                setTimeout(() => {
                    setShowSubscription(true);
                    setIsReportComplete(true);
                }, 6000);
            }

        } catch (error: any) {
            if (error.name === 'AbortError') {
                console.log('Request aborted by user');
                setDebugInfo('Generare oprită');
            } else {
                console.error('Chat error:', error);
                setDebugInfo(`Error: ${error.message}`);
                setMessages(prev => [...prev, {
                    id: Date.now().toString(),
                    role: 'assistant',
                    content: `❌ A apărut o eroare: ${error.message}. Te rog să încerci din nou.`
                }]);
            }
        } finally {
            setIsLoading(false);
            setIsGenerating(false);
            abortControllerRef.current = null;
        }
    };

    // Simple auto-scroll - smooth scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleExport = async () => {
        try {
            // Dynamic import to avoid SSR issues with docx
            const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = await import('docx');
            const { saveAs } = await import('file-saver');

            const reportContent = messages
                .filter((m: any) => m.role === 'assistant')
                .map((m: any) => m.content)
                .join('\n\n');

            // Better markdown parser that preserves bold formatting
            const parseLine = (line: string) => {
                // Handle headings with dark blue color (#1e3a8a) and bold
                if (line.startsWith('### ')) {
                    return new Paragraph({
                        children: [
                            new TextRun({
                                text: line.replace('### ', ''),
                                bold: true,
                                size: 28, // 14pt
                                color: '1e3a8a', // Dark blue
                                font: 'Roboto'
                            })
                        ],
                        heading: HeadingLevel.HEADING_3,
                        spacing: { before: 120, after: 60, line: 180 }, // line spacing 0.9
                    });
                }
                if (line.startsWith('## ')) {
                    return new Paragraph({
                        children: [
                            new TextRun({
                                text: line.replace('## ', ''),
                                bold: true,
                                size: 32, // 16pt
                                color: '1e3a8a', // Dark blue
                                font: 'Roboto'
                            })
                        ],
                        heading: HeadingLevel.HEADING_2,
                        spacing: { before: 180, after: 90, line: 180 },
                    });
                }
                if (line.startsWith('# ')) {
                    return new Paragraph({
                        children: [
                            new TextRun({
                                text: line.replace('# ', ''),
                                bold: true,
                                size: 36, // 18pt
                                color: '1e3a8a', // Dark blue
                                font: 'Roboto'
                            })
                        ],
                        heading: HeadingLevel.HEADING_1,
                        spacing: { before: 240, after: 120, line: 180 },
                    });
                }

                // Parse bold text (**text**)
                const parts: any[] = [];
                const boldRegex = /\*\*(.+?)\*\*/g;
                let lastIndex = 0;
                let match;

                while ((match = boldRegex.exec(line)) !== null) {
                    // Add text before bold
                    if (match.index > lastIndex) {
                        const normalText = line.substring(lastIndex, match.index);
                        if (normalText) {
                            parts.push(new TextRun({
                                text: normalText,
                                size: 24, // 12pt
                                font: 'Roboto'
                            }));
                        }
                    }
                    // Add bold text
                    parts.push(new TextRun({
                        text: match[1],
                        bold: true,
                        size: 24, // 12pt
                        font: 'Roboto'
                    }));
                    lastIndex = boldRegex.lastIndex;
                }

                // Add remaining text after last bold
                if (lastIndex < line.length) {
                    const remainingText = line.substring(lastIndex);
                    if (remainingText) {
                        parts.push(new TextRun({
                            text: remainingText,
                            size: 24, // 12pt
                            font: 'Roboto'
                        }));
                    }
                }

                // If no bold found, return simple paragraph
                if (parts.length === 0 && line.trim()) {
                    parts.push(new TextRun({
                        text: line,
                        size: 24, // 12pt
                        font: 'Roboto'
                    }));
                }

                return new Paragraph({
                    children: parts.length > 0 ? parts : [new TextRun({
                        text: line,
                        size: 24, // 12pt
                        font: 'Roboto'
                    })],
                    spacing: { after: 60, line: 180 }, // line spacing 0.9 (180 = 0.9 * 240)
                });
            };

            const children = reportContent.split('\n').map(parseLine);

            const userName = userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : 'Utilizator';
            const currentDate = new Date().toLocaleDateString('ro-RO', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            const doc = new Document({
                sections: [{
                    properties: {},
                    children: [
                        // Main Title
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'ANALIZA PERSONALITĂȚII ANTREPRENORIALE',
                                    bold: true,
                                    size: 40, // 20pt for main title
                                    color: '1e3a8a', // Dark blue
                                    font: 'Roboto'
                                })
                            ],
                            heading: HeadingLevel.TITLE,
                            spacing: { after: 120, line: 180 },
                            alignment: AlignmentType.CENTER,
                        }),
                        // Separator line
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: '━'.repeat(50),
                                    color: '1e3a8a',
                                    size: 20
                                })
                            ],
                            spacing: { after: 120 },
                            alignment: AlignmentType.CENTER,
                        }),
                        // Name
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'Nume: ',
                                    bold: true,
                                    size: 24,
                                    font: 'Roboto'
                                }),
                                new TextRun({
                                    text: userName,
                                    size: 24,
                                    font: 'Roboto'
                                })
                            ],
                            spacing: { after: 60, line: 180 },
                        }),
                        // Date
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'Data: ',
                                    bold: true,
                                    size: 24,
                                    font: 'Roboto'
                                }),
                                new TextRun({
                                    text: currentDate,
                                    size: 24,
                                    font: 'Roboto'
                                })
                            ],
                            spacing: { after: 60, line: 180 },
                        }),
                        // Occupation
                        ...(userInfo?.occupation ? [new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'Ocupație: ',
                                    bold: true,
                                    size: 24,
                                    font: 'Roboto'
                                }),
                                new TextRun({
                                    text: userInfo.occupation,
                                    size: 24,
                                    font: 'Roboto'
                                })
                            ],
                            spacing: { after: 60, line: 180 },
                        })] : []),
                        // Industry
                        ...(userInfo?.industry ? [new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'Domeniu de activitate: ',
                                    bold: true,
                                    size: 24,
                                    font: 'Roboto'
                                }),
                                new TextRun({
                                    text: userInfo.industry,
                                    size: 24,
                                    font: 'Roboto'
                                })
                            ],
                            spacing: { after: 60, line: 180 },
                        })] : []),
                        // Email
                        ...(userInfo?.email ? [new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'Email: ',
                                    bold: true,
                                    size: 24,
                                    font: 'Roboto'
                                }),
                                new TextRun({
                                    text: userInfo.email,
                                    size: 24,
                                    font: 'Roboto'
                                })
                            ],
                            spacing: { after: 60, line: 180 },
                        })] : []),
                        // Separator before content
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: '━'.repeat(50),
                                    color: '1e3a8a',
                                    size: 20
                                })
                            ],
                            spacing: { before: 60, after: 240 },
                            alignment: AlignmentType.CENTER,
                        }),
                        ...children
                    ],
                }],
            });

            const blob = await Packer.toBlob(doc);
            saveAs(blob, `Raport de evaluare a personalitatii antreprenoriale ${userName}.docx`);
        } catch (error) {
            console.error('Export failed:', error);
            alert('A apărut o eroare la generarea documentului.');
        }
    };

    if (!isReady) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                    <button
                        onClick={() => router.push('/rezultate')}
                        className="flex items-center text-slate-600 hover:text-slate-900 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Înapoi la Rezultate
                    </button>
                    <div className="font-semibold text-slate-900">Antreprenor Blueprint Agent</div>
                    <div className="flex items-center gap-3">
                        {/* Persistent Upgrade Button */}
                        {isReportComplete && (
                            <button
                                onClick={() => setShowSubscription(true)}
                                className="flex items-center bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-lg hover:from-amber-500 hover:to-orange-600 transition-all font-bold text-sm shadow-md animate-pulse"
                            >
                                <Sparkles className="w-4 h-4 mr-2" />
                                Upgrade
                            </button>
                        )}
                        <button
                            onClick={handleExport}
                            className="flex items-center bg-primary/10 text-primary px-4 py-2 rounded-lg hover:bg-primary/20 transition-colors font-medium text-sm"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Export Raport
                        </button>
                    </div>
                </div>
            </div>

            {/* Debug Info (Visible only if there's info) */}
            {debugInfo && (
                <div className="bg-yellow-50 border-b border-yellow-200 p-2 text-xs text-yellow-800 font-mono text-center">
                    Debug: {debugInfo}
                </div>
            )}

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 max-w-4xl mx-auto w-full">
                {messages.map((m) => (
                    <div
                        key={m.id}
                        className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`
                max-w-[85%] md:max-w-[75%] rounded-2xl p-6 shadow-sm
                ${m.role === 'user'
                                    ? 'bg-primary text-white rounded-tr-none'
                                    : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'}
              `}
                        >
                            <div className="flex items-center mb-3 opacity-70 text-xs uppercase tracking-wider font-bold">
                                {m.role === 'user' ? <User className="w-4 h-4 mr-2" /> : <Bot className="w-4 h-4 mr-2" />}
                                {m.role === 'user' ? 'Tu' : 'Agent'}
                            </div>
                            <div
                                className={`prose ${m.role === 'user' ? 'prose-invert' : 'prose-slate'} max-w-none`}
                                style={{
                                    color: m.role === 'user' ? 'white' : '#1e293b'
                                }}
                            >
                                <style jsx>{`
                                    div :global(h1), div :global(h2), div :global(h3), div :global(h4), div :global(h5), div :global(h6) {
                                        color: #0f172a !important;
                                        font-weight: 700 !important;
                                    }
                                    div :global(strong) {
                                        color: #0f172a !important;
                                        font-weight: 700 !important;
                                    }
                                `}</style>
                                {m.content ? (
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {m.content}
                                    </ReactMarkdown>
                                ) : (
                                    <span style={{ opacity: 0.5 }}>Așteptăm răspunsul...</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-white border-t border-slate-200 p-4 md:p-6">
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative">
                    <input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={isReportComplete ? "Sesiunea s-a încheiat. Salvează raportul sau fă upgrade." : "Scrie răspunsul tău aici..."}
                        disabled={isReportComplete}
                        className={`w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-6 pr-14 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-inner ${isReportComplete ? 'opacity-50 cursor-not-allowed' : ''}`}
                    />
                    <button
                        type="submit"
                        disabled={!isGenerating && (!inputValue.trim() || isLoading || isReportComplete)}
                        className={`absolute right-3 top-1/2 -translate-y-1/2 text-white p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${isGenerating
                            ? 'bg-red-500 hover:bg-red-600'
                            : 'bg-primary hover:bg-primary/90'
                            }`}
                        title={isGenerating ? 'Oprește generarea' : 'Trimite mesaj'}
                    >
                        {isGenerating ? (
                            <Square className="w-5 h-5" fill="currentColor" />
                        ) : (
                            <Send className="w-5 h-5" />
                        )}
                    </button>
                </form>
            </div>
            {/* Subscription Modal */}
            <AnimatePresence>
                {showSubscription && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
                    >
                        {/* Step 1: Teaser Modal */}
                        {subscriptionStep === 'teaser' ? (
                            <motion.div
                                key="teaser"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative"
                            >
                                <button
                                    onClick={() => setShowSubscription(false)}
                                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors z-10"
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-center relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md border border-white/20">
                                        <Sparkles className="w-8 h-8 text-amber-300" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">
                                        Deblochează Potențialul Maxim
                                    </h3>
                                    <p className="text-slate-300 font-medium">
                                        Antreprenor Blueprint Premium
                                    </p>
                                </div>

                                <div className="p-8">
                                    <p className="text-slate-600 text-center mb-8 leading-relaxed">
                                        Ai primit o analiză detaliată. Dar cum ar fi să ai un <strong>partener de business AI</strong> disponibil 24/7, care îți cunoaște afacerea la perfecție?
                                    </p>

                                    <button
                                        onClick={() => setSubscriptionStep('details')}
                                        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                                    >
                                        Vreau să știu mai multe
                                        <ArrowLeft className="w-4 h-4 rotate-180" />
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            /* Step 2: Detailed "Triple" Modal */
                            <motion.div
                                key="details"
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full overflow-hidden relative flex flex-col max-h-[90vh]"
                            >
                                <button
                                    onClick={() => setShowSubscription(false)}
                                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors z-10"
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                <div className="bg-slate-900 p-8 md:p-10 text-center relative overflow-hidden shrink-0">
                                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 relative z-10">
                                        Raportul îți arată cine ești ca antreprenor.
                                        <br />
                                        <span className="text-amber-400">Dar e abia începutul.</span>
                                    </h3>
                                    <p className="text-slate-300 max-w-3xl mx-auto relative z-10 text-sm md:text-base leading-relaxed">
                                        De aici, Antreprenor Blueprint poate deveni consultantul tău permanent: știe cum gândești, ce te motivează, unde te blochezi și ce vrei să construiești. Nu mai vorbești cu un AI generic, ci cu un agent care pornește de la profilul tău real.
                                    </p>
                                </div>

                                <div className="p-6 md:p-10 overflow-y-auto">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                        {/* Card 1 */}
                                        <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 hover:border-primary/20 transition-colors flex flex-col">
                                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                                                <Bot className="w-6 h-6" />
                                            </div>
                                            <h4 className="font-bold text-lg text-slate-900 mb-2">Board Member AI</h4>
                                            <p className="text-slate-600 text-sm leading-relaxed flex-grow">
                                                Blueprint devine membrul tău de board care te cunoaște deja. Discuți decizii grele, strategii, dileme de pricing sau recrutare, iar el îți arată clar unde e aliniat cu profilul tău și unde te expui la risc.
                                            </p>
                                        </div>

                                        {/* Card 2 */}
                                        <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 hover:border-primary/20 transition-colors flex flex-col">
                                            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4 text-amber-600">
                                                <Sparkles className="w-6 h-6" />
                                            </div>
                                            <h4 className="font-bold text-lg text-slate-900 mb-2">Memorie Infinită</h4>
                                            <p className="text-slate-600 text-sm leading-relaxed flex-grow">
                                                Agentul nu uită nimic: raportul tău, obiectivele, conversațiile anterioare. Poți reveni oricând la concluzii și planuri începute. Blueprint devine jurnalul tău strategic augmentat.
                                            </p>
                                        </div>

                                        {/* Card 3 */}
                                        <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 hover:border-primary/20 transition-colors flex flex-col">
                                            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 text-emerald-600">
                                                <Check className="w-6 h-6" />
                                            </div>
                                            <h4 className="font-bold text-lg text-slate-900 mb-2">Evoluție Continuă</h4>
                                            <p className="text-slate-600 text-sm leading-relaxed flex-grow">
                                                Nu rămâi blocat la insight-uri, ci primești pași de acțiune. Pe măsură ce afacerea se schimbă, agentul își actualizează recomandările. O strategie vie, care crește odată cu tine.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-blue-50/50 rounded-xl p-6 mb-8 border border-blue-100">
                                        <p className="text-slate-700 text-sm text-center italic">
                                            "În loc să rămână un PDF uitat într-un folder, Blueprint continuă să lucreze pentru tine: te ajută să îți prioritizezi acțiunile, să vezi unde îți sabotezi singur progresul și să testezi scenarii de business fără să-ți arzi nervii și resursele."
                                        </p>
                                    </div>

                                    <div className="flex flex-col md:flex-row items-center justify-between bg-slate-900 rounded-2xl p-6 md:p-8 text-white gap-6 shadow-xl shadow-slate-900/20">
                                        <div>
                                            <div className="text-3xl font-bold mb-1">30 RON <span className="text-lg font-normal text-slate-400">/ lună</span></div>
                                            <div className="text-slate-400 text-xs md:text-sm max-w-md">
                                                Garanție 30 de zile: dacă nu te ajută, primești banii înapoi. Poți opri abonamentul oricând, direct din cont.
                                            </div>
                                        </div>
                                        <button
                                            onClick={async () => {
                                                try {
                                                    const response = await fetch('/api/stripe/checkout', {
                                                        method: 'POST',
                                                        headers: { 'Content-Type': 'application/json' },
                                                        body: JSON.stringify({
                                                            email: userInfo?.email,
                                                            name: `${userInfo?.firstName} ${userInfo?.lastName}`
                                                        }),
                                                    });
                                                    const data = await response.json();
                                                    if (data.url) {
                                                        window.location.href = data.url;
                                                    } else {
                                                        alert('Eroare la inițierea plății. Te rog încearcă din nou.');
                                                    }
                                                } catch (error) {
                                                    console.error('Payment error:', error);
                                                    alert('Eroare la conexiune.');
                                                }
                                            }}
                                            className="w-full md:w-auto bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-orange-500/20 transition-all transform hover:-translate-y-0.5 whitespace-nowrap text-lg"
                                        >
                                            Activează Abonamentul
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
