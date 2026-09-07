-- Keep the legacy SKU column for compatibility, but generate it when callers omit it.
create or replace function public.create_product_with_stock(
  product_business_id text,
  product_name text,
  product_description text,
  product_sku text,
  product_barcode text,
  product_category text,
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
      business_id, name, description, sku, barcode, category,
      cost_price, selling_price, reorder_level, current_stock, image_url
    ) values (
      product_business_id,
      product_name,
      nullif(product_description, ''),
      coalesce(nullif(product_sku, ''), 'ITEM-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 12))),
      nullif(product_barcode, ''),
      product_category,
      product_cost_price,
      product_selling_price,
      product_reorder_level,
      greatest(opening_quantity, 0),
      product_image_url
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
