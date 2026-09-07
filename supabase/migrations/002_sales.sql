create table if not exists public.sales (
  id uuid primary key default gen_random_uuid(),
  business_id text not null,
  receipt_number text not null unique,
  cashier text not null default 'Cashier',
  customer text not null default 'Walk-in Customer',
  subtotal numeric(12, 2) not null check (subtotal >= 0),
  discount numeric(12, 2) not null default 0 check (discount >= 0),
  tax numeric(12, 2) not null default 0 check (tax >= 0),
  total numeric(12, 2) not null check (total >= 0),
  payment_method text not null check (payment_method in ('cash', 'card', 'mpesa')),
  amount_paid numeric(12, 2) not null check (amount_paid >= 0),
  change_amount numeric(12, 2) not null default 0,
  status text not null default 'completed' check (status in ('completed', 'refunded', 'voided')),
  created_at timestamptz not null default now()
);

create table if not exists public.sale_items (
  id uuid primary key default gen_random_uuid(),
  sale_id uuid not null references public.sales(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete restrict,
  product_name text not null,
  quantity integer not null check (quantity > 0),
  unit_price numeric(12, 2) not null check (unit_price >= 0),
  line_total numeric(12, 2) not null check (line_total >= 0)
);

create index if not exists sales_business_created_idx on public.sales (business_id, created_at desc);
create index if not exists sale_items_sale_id_idx on public.sale_items (sale_id);

create or replace function public.complete_sale(
  sale_business_id text,
  sale_cashier text,
  sale_customer text,
  sale_subtotal numeric,
  sale_discount numeric,
  sale_tax numeric,
  sale_total numeric,
  sale_payment_method text,
  sale_amount_paid numeric,
  sale_change_amount numeric,
  sale_items jsonb
) returns public.sales
language plpgsql
security invoker
as $$
  declare
    created_sale public.sales;
    item jsonb;
    product_row public.products;
    item_product_id uuid;
    item_quantity integer;
    item_unit_price numeric;
  begin
    if jsonb_array_length(sale_items) = 0 then
      raise exception 'A sale must contain at least one item';
    end if;

    insert into public.sales (
      business_id, receipt_number, cashier, customer, subtotal, discount, tax,
      total, payment_method, amount_paid, change_amount
    ) values (
      sale_business_id,
      'INV-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 10)),
      coalesce(nullif(sale_cashier, ''), 'Cashier'),
      coalesce(nullif(sale_customer, ''), 'Walk-in Customer'),
      sale_subtotal, sale_discount, sale_tax, sale_total, sale_payment_method,
      sale_amount_paid, sale_change_amount
    ) returning * into created_sale;

    for item in select * from jsonb_array_elements(sale_items) loop
      item_product_id := (item->>'productId')::uuid;
      item_quantity := (item->>'quantity')::integer;
      item_unit_price := (item->>'unitPrice')::numeric;

      select * into product_row
      from public.products
      where id = item_product_id and business_id = sale_business_id
      for update;

      if product_row.id is null then
        raise exception 'Product is not available for this business';
      end if;

      if product_row.current_stock < item_quantity then
        raise exception 'Insufficient stock for %', product_row.name;
      end if;

      update public.products
      set current_stock = current_stock - item_quantity,
          updated_at = now()
      where id = item_product_id;

      insert into public.sale_items (
        sale_id, product_id, product_name, quantity, unit_price, line_total
      ) values (
        created_sale.id, product_row.id, product_row.name, item_quantity,
        item_unit_price, item_quantity * item_unit_price
      );

      insert into public.inventory_movements (
        business_id, product_id, movement_type, quantity, unit_cost, notes
      ) values (
        sale_business_id, product_row.id, 'sale', item_quantity,
        product_row.cost_price, created_sale.receipt_number
      );
    end loop;

    return created_sale;
  end;
$$;

alter table public.sales enable row level security;
alter table public.sale_items enable row level security;

drop policy if exists sales_anon_access on public.sales;
create policy sales_anon_access on public.sales for all to anon, authenticated using (true) with check (true);

drop policy if exists sale_items_anon_access on public.sale_items;
create policy sale_items_anon_access on public.sale_items for all to anon, authenticated using (true) with check (true);
