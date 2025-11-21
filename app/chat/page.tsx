'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Send, User, Bot, Download, ArrowLeft } from 'lucide-react';
import { calculateHexacoScores } from '@/lib/scoring';

type Message = {
    id: string;
    role: 'user' | 'assistant';
    content: string;
};

export default function ChatPage() {
    const router = useRouter();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [scores, setScores] = useState<any>(null);
    const [userInfo, setUserInfo] = useState<any>(null);
    const [userGoals, setUserGoals] = useState<any>(null);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const savedAnswers = localStorage.getItem('hexaco_answers');
        const savedUserInfo = localStorage.getItem('user_info');
        const savedUserGoals = localStorage.getItem('user_goals');

        if (savedAnswers && savedUserInfo && savedUserGoals) {
            const answers = JSON.parse(savedAnswers);
            const calculated = calculateHexacoScores(answers);
            const parsedUserInfo = JSON.parse(savedUserInfo);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })),
                    scores,
                    userInfo,
                    userGoals
                }),
            });

            if (!response.ok) throw new Error('API request failed');
            if (!response.body) throw new Error('No response body');

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

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                accumulatedContent += chunk;

                setMessages(prev => prev.map(m =>
                    m.id === assistantMessageId
                        ? { ...m, content: accumulatedContent }
                        : m
                ));
            }

        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: 'assistant',
                content: '❌ A apărut o eroare. Te rog să încerci din nou.'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    // Auto-scroll
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

            // Simple parser: split by newlines and create paragraphs
            // For a better result, we'd parse markdown structure. 
            // For MVP, we treat headers (lines starting with #) specially.

            // Better markdown parser that preserves bold formatting
            const parseLine = (line: string) => {
                // Handle headings
                if (line.startsWith('### ')) {
                    return new Paragraph({
                        text: line.replace('### ', ''),
                        heading: HeadingLevel.HEADING_3,
                        spacing: { before: 200, after: 100 },
                    });
                }
                if (line.startsWith('## ')) {
                    return new Paragraph({
                        text: line.replace('## ', ''),
                        heading: HeadingLevel.HEADING_2,
                        spacing: { before: 300, after: 150 },
                    });
                }
                if (line.startsWith('# ')) {
                    return new Paragraph({
                        text: line.replace('# ', ''),
                        heading: HeadingLevel.HEADING_1,
                        spacing: { before: 400, after: 200 },
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
                            parts.push(new TextRun({ text: normalText, size: 24 }));
                        }
                    }
                    // Add bold text
                    parts.push(new TextRun({
                        text: match[1],
                        bold: true,
                        size: 24
                    }));
                    lastIndex = boldRegex.lastIndex;
                }

                // Add remaining text after last bold
                if (lastIndex < line.length) {
                    const remainingText = line.substring(lastIndex);
                    if (remainingText) {
                        parts.push(new TextRun({ text: remainingText, size: 24 }));
                    }
                }

                // If no bold found, return simple paragraph
                if (parts.length === 0 && line.trim()) {
                    parts.push(new TextRun({ text: line, size: 24 }));
                }

                return new Paragraph({
                    children: parts.length > 0 ? parts : [new TextRun({ text: line, size: 24 })],
                    spacing: { after: 120 },
                });
            };

            const children = reportContent.split('\n').map(parseLine);

            const userName = userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : 'Utilizator';

            const doc = new Document({
                sections: [{
                    properties: {},
                    children: [
                        new Paragraph({
                            text: `Raport de evaluare a personalității antreprenoriale ${userName}`,
                            heading: HeadingLevel.TITLE,
                            spacing: { after: 400 },
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
                    <button
                        onClick={handleExport}
                        className="flex items-center bg-primary/10 text-primary px-4 py-2 rounded-lg hover:bg-primary/20 transition-colors font-medium text-sm"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Export Raport
                    </button>
                </div>
            </div>

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
                            <div className={`prose ${m.role === 'user' ? 'prose-invert' : 'prose-slate'} max-w-none prose-headings:text-slate-900 prose-p:text-slate-900 prose-strong:text-slate-900 prose-li:text-slate-900`}>
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {m.content}
                                </ReactMarkdown>
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
                        placeholder="Scrie răspunsul tău aici..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-6 pr-14 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-inner"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !inputValue.trim()}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
}
