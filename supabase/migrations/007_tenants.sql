-- Create tenants table for business/tenant information
CREATE TABLE IF NOT EXISTS tenants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  business_name TEXT NOT NULL,
  business_type TEXT NOT NULL DEFAULT 'retail',
  branch_name TEXT NOT NULL,
  country TEXT NOT NULL,
  city TEXT NOT NULL,
  branch_address TEXT,
  currency TEXT NOT NULL DEFAULT 'USD',
  tax_enabled BOOLEAN DEFAULT FALSE,
  tax_name TEXT,
  tax_rate DECIMAL(5, 2),
  subscription_plan TEXT NOT NULL DEFAULT 'free',
  subscription_period TEXT NOT NULL DEFAULT 'monthly',
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_tenants_user_id ON tenants(user_id);
CREATE INDEX IF NOT EXISTS idx_tenants_status ON tenants(status);
CREATE INDEX IF NOT EXISTS idx_tenants_subscription_plan ON tenants(subscription_plan);

-- Add trigger to update updated_at timestamp
CREATE TRIGGER update_tenants_updated_at
  BEFORE UPDATE ON tenants
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can read their own tenant data
CREATE POLICY "Users can read own tenant data"
  ON tenants FOR SELECT
  TO authenticated
  USING (user_id::text = auth.uid()::text);

-- Create policy: Service role can read all tenants
CREATE POLICY "Service role can read all tenants"
  ON tenants FOR SELECT
  TO service_role
  USING (true);

-- Create policy: Service role can insert tenants
CREATE POLICY "Service role can insert tenants"
  ON tenants FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Create policy: Service role can update tenants
CREATE POLICY "Service role can update tenants"
  ON tenants FOR UPDATE
  TO service_role
  USING (true);

-- Create policy: Users can update own tenant data
CREATE POLICY "Users can update own tenant data"
  ON tenants FOR UPDATE
  TO authenticated
  USING (user_id::text = auth.uid()::text);

-- Create policy: Service role can delete tenants
CREATE POLICY "Service role can delete tenants"
  ON tenants FOR DELETE
  TO service_role
  USING (true);
