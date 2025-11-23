import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export interface SearchResult {
    content: string;
    metadata: Record<string, any>;
    similarity: number;
}

/**
 * Search for relevant document chunks using semantic similarity
 */
export async function searchDocuments(
    query: string,
    options: {
        matchThreshold?: number;
        matchCount?: number;
    } = {}
): Promise<SearchResult[]> {
    const { matchThreshold = 0.5, matchCount = 3 } = options;

    // Initialize Supabase client
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Generate embedding for query
    const embeddingResponse = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: query,
    });

    const queryEmbedding = embeddingResponse.data[0].embedding;

    // Search Supabase for similar documents
    const { data, error } = await supabase.rpc('match_documents', {
        query_embedding: queryEmbedding,
        match_threshold: matchThreshold,
        match_count: matchCount,
    });

    if (error) {
        console.error('Error searching documents:', error);
        return [];
    }

    return data || [];
}
