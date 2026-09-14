-- SUPABASE SCHEMA - NEWSLETTER
CREATE TABLE public.newsletter (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Allow anonymous inserts (anyone can subscribe)
ALTER TABLE public.newsletter ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert to newsletter" ON public.newsletter
  FOR INSERT WITH CHECK (true);

