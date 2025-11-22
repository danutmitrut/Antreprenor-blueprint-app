-- RATE LIMITS Table
create table public.rate_limits (
  id uuid default uuid_generate_v4() primary key,
  ip_address text not null,
  endpoint text not null, -- e.g., '/api/chat'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for faster queries
create index rate_limits_ip_created_at_idx on public.rate_limits (ip_address, created_at);

-- Enable RLS
alter table public.rate_limits enable row level security;

-- Policies (Only server can insert/read usually, but we'll allow anon insert for tracking)
create policy "Anon can insert rate limits" on public.rate_limits
  for insert with check (true);

create policy "Anon can view their own rate limits" on public.rate_limits
  for select using (true); -- Simplified for now, logic handled in API
