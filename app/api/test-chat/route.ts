import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';

export const maxDuration = 60;

export async function POST(req: Request) {
    try {
        console.log('=== TEST API ===');
        console.log('API Key:', process.env.ANTHROPIC_API_KEY?.substring(0, 20) + '...');

        const result = streamText({
            model: anthropic('claude-3-5-sonnet-20241022'),
            messages: [{ role: 'user', content: 'Salut! Scrie un paragraf scurt in romana.' }],
        });

        return result.toTextStreamResponse();
    } catch (error: any) {
        console.error('Test API Error:', error);
        return new Response(JSON.stringify({
            error: error.message,
            stack: error.stack
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
