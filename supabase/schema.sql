-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- USERS Table
create table public.users (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  stripe_customer_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.users enable row level security;

-- Policies for Users
create policy "Users can view their own data" on public.users
  for select using (auth.uid() = id);

create policy "Users can update their own data" on public.users
  for update using (auth.uid() = id);

-- Handle User Creation (Trigger)
-- This automatically creates a public.users record when a new user signs up via Supabase Auth
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- SUBSCRIPTIONS Table
create table public.subscriptions (
  id text primary key, -- Stripe Subscription ID
  user_id uuid references public.users(id) not null,
  status text check (status in ('active', 'past_due', 'canceled', 'incomplete', 'incomplete_expired', 'trialing', 'unpaid')),
  plan_id text,
  current_period_end timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.subscriptions enable row level security;

-- Policies for Subscriptions
create policy "Users can view their own subscriptions" on public.subscriptions
  for select using (auth.uid() = user_id);


-- REPORTS Table
create table public.reports (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) not null,
  content jsonb, -- Stores the chat history/report content
  type text default 'initial', -- 'initial', 'follow_up', etc.
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.reports enable row level security;

-- Policies for Reports
create policy "Users can view their own reports" on public.reports
  for select using (auth.uid() = user_id);

create policy "Users can insert their own reports" on public.reports
  for insert with check (auth.uid() = user_id);
