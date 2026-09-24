-- Create orders table for recording completed Stripe purchases & shipping choices
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  stripe_session_id text unique,
  customer_email text,
  customer_name text,
  items jsonb,
  shipping_method text,
  shipping_cost numeric(10,2) default 0,
  total_amount numeric(10,2) default 0,
  status text default 'completed',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS and public policies for admin dashboard and serverless webhooks
alter table public.orders enable row level security;

create policy "Allow select for all" on public.orders for select using (true);
create policy "Allow insert for all" on public.orders for insert with check (true);
create policy "Allow update for all" on public.orders for update using (true);
create policy "Allow delete for all" on public.orders for delete using (true);
