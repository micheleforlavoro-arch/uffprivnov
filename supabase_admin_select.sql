-- Aggiunta permessi di lettura per Admin
CREATE POLICY "Allow public select to contacts" ON public.contacts FOR SELECT USING (true);
CREATE POLICY "Allow public select to newsletter" ON public.newsletter FOR SELECT USING (true);

