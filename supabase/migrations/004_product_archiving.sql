alter table public.products
  add column if not exists is_active boolean not null default true;

create index if not exists products_active_business_idx
  on public.products (business_id, is_active);

-- Product deletion is an archive so completed sales and stock movements remain auditable.
