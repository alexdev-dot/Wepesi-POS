create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  business_id text not null,
  name text not null,
  description text,
  status text not null default 'Active' check (status in ('Active', 'Inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (business_id, name)
);

create table if not exists public.brands (
  id uuid primary key default gen_random_uuid(),
  business_id text not null,
  name text not null,
  description text,
  logo text,
  status text not null default 'Active' check (status in ('Active', 'Inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (business_id, name)
);

create index if not exists categories_business_id_idx on public.categories (business_id);
create index if not exists brands_business_id_idx on public.brands (business_id);

alter table public.categories enable row level security;
alter table public.brands enable row level security;

drop policy if exists categories_anon_access on public.categories;
create policy categories_anon_access on public.categories for all to anon, authenticated using (true) with check (true);

drop policy if exists brands_anon_access on public.brands;
create policy brands_anon_access on public.brands for all to anon, authenticated using (true) with check (true);
