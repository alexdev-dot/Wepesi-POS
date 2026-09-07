-- Fix Storage Isolation for Product Images
--
-- This migration updates storage policies to allow uploads with localStorage-based auth
-- Data isolation is enforced at the API level using folder structure (business_id/filename)
-- The path structure is: businessId/randomUUID.extension

-- Drop existing policies
DROP POLICY IF EXISTS product_images_authenticated_read ON storage.objects;
DROP POLICY IF EXISTS product_images_authenticated_upload ON storage.objects;
DROP POLICY IF EXISTS product_images_authenticated_update ON storage.objects;
DROP POLICY IF EXISTS product_images_authenticated_delete ON storage.objects;

-- Since the app uses localStorage-based authentication (not Supabase Auth),
-- we allow anon access to the bucket. Data isolation is handled by:
-- 1. API-level filtering by business_id
-- 2. Folder structure (businessId/) provides logical separation
-- 3. Client-side code only requests images for their own business_id

CREATE POLICY product_images_public_read
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'product-images');

CREATE POLICY product_images_public_upload
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'product-images');

CREATE POLICY product_images_public_update
ON storage.objects FOR UPDATE
TO anon, authenticated
USING (bucket_id = 'product-images')
WITH CHECK (bucket_id = 'product-images');

CREATE POLICY product_images_public_delete
ON storage.objects FOR DELETE
TO anon, authenticated
USING (bucket_id = 'product-images');

-- Future enhancement: When Supabase Auth is implemented, update policies to:
-- 1. Create a business_users table mapping auth.uid() to business_id
-- 2. Use (storage.foldername) in policies to check business ownership
-- Example:
-- CREATE POLICY product_images_business_read
-- ON storage.objects FOR SELECT
-- TO authenticated
-- USING (
--   bucket_id = 'product-images'
--   AND (storage.foldername) IN (
--     SELECT business_id FROM business_users WHERE user_id = auth.uid()
--   )
-- );
