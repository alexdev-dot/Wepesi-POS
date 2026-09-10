-- Ensure tenants table has all required columns for onboarding
-- This migration fixes missing columns that are causing onboarding failures

-- Add subscription_plan column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'tenants' AND column_name = 'subscription_plan'
    ) THEN
        ALTER TABLE tenants ADD COLUMN subscription_plan TEXT NOT NULL DEFAULT 'free';
    END IF;
END $$;

-- Add subscription_period column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'tenants' AND column_name = 'subscription_period'
    ) THEN
        ALTER TABLE tenants ADD COLUMN subscription_period TEXT NOT NULL DEFAULT 'monthly';
    END IF;
END $$;

-- Add status column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'tenants' AND column_name = 'status'
    ) THEN
        ALTER TABLE tenants ADD COLUMN status TEXT NOT NULL DEFAULT 'pending';
    END IF;
END $$;

-- Add branch_address column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'tenants' AND column_name = 'branch_address'
    ) THEN
        ALTER TABLE tenants ADD COLUMN branch_address TEXT;
    END IF;
END $$;

-- Add currency column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'tenants' AND column_name = 'currency'
    ) THEN
        ALTER TABLE tenants ADD COLUMN currency TEXT NOT NULL DEFAULT 'USD';
    END IF;
END $$;

-- Add tax_enabled column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'tenants' AND column_name = 'tax_enabled'
    ) THEN
        ALTER TABLE tenants ADD COLUMN tax_enabled BOOLEAN DEFAULT FALSE;
    END IF;
END $$;

-- Add tax_name column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'tenants' AND column_name = 'tax_name'
    ) THEN
        ALTER TABLE tenants ADD COLUMN tax_name TEXT;
    END IF;
END $$;

-- Add tax_rate column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'tenants' AND column_name = 'tax_rate'
    ) THEN
        ALTER TABLE tenants ADD COLUMN tax_rate DECIMAL(5, 2);
    END IF;
END $$;

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_tenants_status ON tenants(status);
CREATE INDEX IF NOT EXISTS idx_tenants_subscription_plan ON tenants(subscription_plan);
CREATE INDEX IF NOT EXISTS idx_tenants_subscription_period ON tenants(subscription_period);
