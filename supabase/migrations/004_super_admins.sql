-- Create super_admins table for secure authentication
CREATE TABLE IF NOT EXISTS super_admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  mfa_secret TEXT,
  mfa_enabled BOOLEAN DEFAULT FALSE,
  failed_login_attempts INTEGER DEFAULT 0,
  last_failed_login TIMESTAMP WITH TIME ZONE,
  account_locked_until TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_super_admins_email ON super_admins(email);

-- Create index on is_active for filtering
CREATE INDEX IF NOT EXISTS idx_super_admins_is_active ON super_admins(is_active);

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_super_admins_updated_at
  BEFORE UPDATE ON super_admins
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE super_admins ENABLE ROW LEVEL SECURITY;

-- Create policy: Only super admins can read their own data (via service role)
CREATE POLICY "Service role can read all super_admins"
  ON super_admins FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can insert super_admins"
  ON super_admins FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update super_admins"
  ON super_admins FOR UPDATE
  TO service_role
  USING (true);

CREATE POLICY "Service role can delete super_admins"
  ON super_admins FOR DELETE
  TO service_role
  USING (true);

-- No access for anon or authenticated users - only service role
