create extension if not exists pgcrypto;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  business_id text not null,
  image_url text,
  name text not null,
  description text,
  sku text not null,
  barcode text,
  category text not null,
  brand text,
  cost_price numeric(12, 2) not null check (cost_price >= 0),
  selling_price numeric(12, 2) not null check (selling_price >= 0),
  reorder_level integer not null default 0 check (reorder_level >= 0),
  current_stock integer not null default 0 check (current_stock >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (business_id, sku),
  unique (business_id, barcode)
);

create table if not exists public.inventory_movements (
  id uuid primary key default gen_random_uuid(),
  business_id text not null,
  product_id uuid not null references public.products(id) on delete restrict,
  movement_type text not null check (movement_type in ('opening_stock', 'restock', 'sale', 'adjustment')),
  quantity integer not null check (quantity > 0),
  unit_cost numeric(12, 2) not null check (unit_cost >= 0),
  supplier text,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists products_business_id_idx on public.products (business_id);
create index if not exists inventory_movements_product_id_idx on public.inventory_movements (product_id);

create or replace function public.create_product_with_stock(
  product_business_id text,
  product_name text,
  product_description text,
  product_sku text,
  product_barcode text,
  product_category text,
  product_brand text,
  product_cost_price numeric,
  product_selling_price numeric,
  product_reorder_level integer,
  opening_quantity integer,
  opening_supplier text,
  opening_notes text,
  product_image_url text
) returns public.products
language plpgsql
security invoker
as $$
  declare created_product public.products;
  begin
    insert into public.products (
      business_id, name, description, sku, barcode, category, brand,
      cost_price, selling_price, reorder_level, current_stock, image_url
    ) values (
      product_business_id, product_name, nullif(product_description, ''), product_sku,
      nullif(product_barcode, ''), product_category, nullif(product_brand, ''),
      product_cost_price, product_selling_price, product_reorder_level,
      greatest(opening_quantity, 0), product_image_url
    ) returning * into created_product;

    if opening_quantity > 0 then
      insert into public.inventory_movements (
        business_id, product_id, movement_type, quantity, unit_cost, supplier, notes
      ) values (
        product_business_id, created_product.id, 'opening_stock', opening_quantity,
        product_cost_price, nullif(opening_supplier, ''), nullif(opening_notes, '')
      );
    end if;

    return created_product;
  end;
$$;

create or replace function public.receive_stock(
  movement_business_id text,
  movement_product_id uuid,
  movement_quantity integer,
  movement_unit_cost numeric,
  movement_supplier text,
  movement_notes text
) returns public.products
language plpgsql
security invoker
as $$
  declare updated_product public.products;
  begin
    update public.products
    set current_stock = current_stock + movement_quantity,
        cost_price = movement_unit_cost,
        updated_at = now()
    where id = movement_product_id and business_id = movement_business_id
    returning * into updated_product;

    if updated_product.id is null then
      raise exception 'Product was not found for this business';
    end if;

    insert into public.inventory_movements (
      business_id, product_id, movement_type, quantity, unit_cost, supplier, notes
    ) values (
      movement_business_id, movement_product_id, 'restock', movement_quantity,
      movement_unit_cost, nullif(movement_supplier, ''), nullif(movement_notes, '')
    );

    return updated_product;
  end;
$$;

-- The existing app currently stores its session locally. These policies are a
-- temporary compatibility layer; replace them with auth.uid()-based policies
-- when Supabase Auth is enabled for the login flow.
alter table public.products enable row level security;
alter table public.inventory_movements enable row level security;

drop policy if exists products_anon_access on public.products;
create policy products_anon_access on public.products for all to anon, authenticated using (true) with check (true);

drop policy if exists inventory_movements_anon_access on public.inventory_movements;
create policy inventory_movements_anon_access on public.inventory_movements for all to anon, authenticated using (true) with check (true);

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists product_images_public_read on storage.objects;
create policy product_images_public_read
on storage.objects for select to anon, authenticated
using (bucket_id = 'product-images');

drop policy if exists product_images_public_upload on storage.objects;
create policy product_images_public_upload
on storage.objects for insert to anon, authenticated
with check (bucket_id = 'product-images');

drop policy if exists product_images_public_update on storage.objects;
create policy product_images_public_update
on storage.objects for update to anon, authenticated
using (bucket_id = 'product-images')
with check (bucket_id = 'product-images');

drop policy if exists product_images_public_delete on storage.objects;
create policy product_images_public_delete
on storage.objects for delete to anon, authenticated
using (bucket_id = 'product-images');
