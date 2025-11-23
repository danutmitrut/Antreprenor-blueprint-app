-- Drop existing tables and recreate clean
-- Run this FIRST in Supabase SQL Editor

-- Drop existing policies first
DROP POLICY IF EXISTS "Service role can manage users" ON public.users;
DROP POLICY IF EXISTS "Service role can manage subscriptions" ON public.subscriptions;
DROP POLICY IF EXISTS "Service role can manage reports" ON public.reports;

-- Drop existing tables (CASCADE will drop dependent objects)
DROP TABLE IF EXISTS public.reports CASCADE;
DROP TABLE IF EXISTS public.subscriptions CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

-- Drop existing functions
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
DROP FUNCTION IF EXISTS has_active_subscription(UUID) CASCADE;

-- Now run the auth_schema.sql to recreate everything fresh
