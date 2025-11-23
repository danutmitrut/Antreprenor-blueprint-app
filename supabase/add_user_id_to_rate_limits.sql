-- Add user_id column to rate_limits table
-- Run this in Supabase SQL Editor

ALTER TABLE rate_limits
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES users(id) ON DELETE CASCADE;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS rate_limits_user_id_idx ON rate_limits(user_id);

-- Comment
COMMENT ON COLUMN rate_limits.user_id IS 'Optional: links rate limit to authenticated user';
