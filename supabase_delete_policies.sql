-- Permessi di eliminazione per Admin su Contatti e Newsletter
CREATE POLICY "Allow public delete to contacts" ON public.contacts FOR DELETE USING (true);
CREATE POLICY "Allow public delete to newsletter" ON public.newsletter FOR DELETE USING (true);
