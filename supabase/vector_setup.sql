-- Enable pgvector extension
create extension if not exists vector;

-- Documents table for RAG
create table public.documents (
  id uuid default uuid_generate_v4() primary key,
  content text not null,
  embedding vector(1536), -- OpenAI text-embedding-3-small dimensions
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for faster similarity search
create index on public.documents using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- Enable RLS
alter table public.documents enable row level security;

-- Policy: Anyone can read documents (for RAG queries)
create policy "Anyone can read documents" on public.documents
  for select using (true);

-- Function for semantic search
create or replace function match_documents(
  query_embedding vector(1536),
  match_threshold float default 0.5,
  match_count int default 3
)
returns table (
  id uuid,
  content text,
  metadata jsonb,
  similarity float
)
language sql stable
as $$
  select
    documents.id,
    documents.content,
    documents.metadata,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where 1 - (documents.embedding <=> query_embedding) > match_threshold
  order by documents.embedding <=> query_embedding
  limit match_count;
$$;
