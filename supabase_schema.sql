-- SUPABASE SCHEMA - NOVUM STORE
-- 1. Create Products Table
CREATE TABLE public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  price NUMERIC NOT NULL,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  image_url TEXT,
  tag_id TEXT NOT NULL,
  material TEXT,
  fit TEXT,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Setup Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access to visible products
CREATE POLICY "Allow anonymous read access" ON public.products
  FOR SELECT USING (is_visible = true);

-- Allow authenticated/admin full access (For simplicity here, we allow all for demo purposes if not using Auth yet)
-- Note: In a real app, restrict this to authenticated admins!
CREATE POLICY "Allow all access to admin" ON public.products
  FOR ALL USING (true) WITH CHECK (true);

-- 3. Create Storage Bucket for product images
INSERT INTO storage.buckets (id, name, public) VALUES ('products', 'products', true);

-- 4. Storage Policies
-- Allow public viewing of images
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'products');

-- Allow all uploads (again, secure this in production)
CREATE POLICY "Allow all uploads" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'products');

