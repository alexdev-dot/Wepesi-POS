-- Receipt Templates Table
CREATE TABLE IF NOT EXISTS receipt_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  template_id TEXT NOT NULL,
  settings JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_receipt_templates_user_template ON receipt_templates(user_id, template_id);

-- Create index for updated_at
CREATE INDEX IF NOT EXISTS idx_receipt_templates_updated_at ON receipt_templates(updated_at);

-- Add RLS policies
ALTER TABLE receipt_templates ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own templates
CREATE POLICY "Users can view own receipt templates"
  ON receipt_templates FOR SELECT
  USING (auth.uid()::text = user_id::text);

-- Policy: Users can insert their own templates
CREATE POLICY "Users can insert own receipt templates"
  ON receipt_templates FOR INSERT
  WITH CHECK (auth.uid()::text = user_id::text);

-- Policy: Users can update their own templates
CREATE POLICY "Users can update own receipt templates"
  ON receipt_templates FOR UPDATE
  USING (auth.uid()::text = user_id::text);

-- Policy: Users can delete their own templates
CREATE POLICY "Users can delete own receipt templates"
  ON receipt_templates FOR DELETE
  USING (auth.uid()::text = user_id::text);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_receipt_templates_updated_at
  BEFORE UPDATE ON receipt_templates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
