/**
 * Script to process HEXACO documentation and generate embeddings
 * Run: npx tsx scripts/embed-docs.ts
 */

import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import fs from 'fs/promises';
import path from 'path';

// Initialize clients
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Chunking configuration
const CHUNK_SIZE = 500; // tokens
const CHUNK_OVERLAP = 50; // tokens

interface Chunk {
    content: string;
    metadata: {
        source: string;
        title?: string;
        section?: string;
    };
}

/**
 * Split text into chunks with overlap
 */
function chunkText(text: string, source: string): Chunk[] {
    const chunks: Chunk[] = [];

    // Split by sections (## headers)
    const sections = text.split(/(?=^##\s)/m);

    for (const section of sections) {
        // Extract section title if exists
        const titleMatch = section.match(/^##\s+(.+)/m);
        const title = titleMatch ? titleMatch[1].trim() : undefined;

        // Split long sections into smaller chunks
        const words = section.split(/\s+/);
        for (let i = 0; i < words.length; i += CHUNK_SIZE - CHUNK_OVERLAP) {
            const chunkWords = words.slice(i, i + CHUNK_SIZE);
            const content = chunkWords.join(' ').trim();

            if (content.length > 100) { // Skip very small chunks
                chunks.push({
                    content,
                    metadata: {
                        source,
                        title,
                    },
                });
            }
        }
    }

    return chunks;
}

/**
 * Generate embedding for text
 */
async function generateEmbedding(text: string): Promise<number[]> {
    const response = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text,
    });

    return response.data[0].embedding;
}

/**
 * Main function to process and upload documents
 */
async function main() {
    console.log('🚀 Starting document embedding process...\n');

    // Files to process
    const files = [
        { path: 'documentation/C1.md', name: 'C1.md' },
        { path: 'documentation/C2.md', name: 'C2.md' },
    ];

    let totalChunks = 0;

    for (const file of files) {
        console.log(`📄 Processing ${file.name}...`);

        const filePath = path.join(process.cwd(), file.path);
        const content = await fs.readFile(filePath, 'utf-8');

        // Chunk the document
        const chunks = chunkText(content, file.name);
        console.log(`  → Generated ${chunks.length} chunks`);

        // Process in batches to avoid rate limits
        const batchSize = 10;
        for (let i = 0; i < chunks.length; i += batchSize) {
            const batch = chunks.slice(i, i + batchSize);

            console.log(`  → Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(chunks.length / batchSize)}...`);

            // Generate embeddings for batch
            const embeddings = await Promise.all(
                batch.map((chunk) => generateEmbedding(chunk.content))
            );

            // Insert into Supabase
            const records = batch.map((chunk, idx) => ({
                content: chunk.content,
                embedding: embeddings[idx],
                metadata: chunk.metadata,
            }));

            const { error } = await supabase.from('documents').insert(records);

            if (error) {
                console.error(`  ❌ Error inserting batch: ${error.message}`);
            } else {
                console.log(`  ✅ Inserted ${batch.length} chunks`);
                totalChunks += batch.length;
            }

            // Small delay to avoid rate limits
            await new Promise((resolve) => setTimeout(resolve, 200));
        }

        console.log(`✅ Completed ${file.name}\n`);
    }

    console.log(`🎉 Done! Total chunks inserted: ${totalChunks}`);
}

main().catch(console.error);
