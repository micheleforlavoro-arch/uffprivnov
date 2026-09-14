-- Creazione del bucket "products" se non esiste (deve essere pubblico per poter mostrare le immagini)
insert into storage.buckets (id, name, public)
values ('products', 'products', true)
on conflict (id) do update set public = true;

-- Policy per permettere a chiunque di caricare le immagini (per semplificare il gestionale admin)
create policy "Allow public uploads to products"
on storage.objects for insert
with check ( bucket_id = 'products' );

-- Policy per permettere a chiunque di visualizzare le immagini
create policy "Allow public viewing of products"
on storage.objects for select
using ( bucket_id = 'products' );

