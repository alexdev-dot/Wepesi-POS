-- Remove the product-brand feature while preserving products and transaction history.
drop function if exists public.create_product_with_stock(text, text, text, text, text, text, text, numeric, numeric, integer, integer, text, text, text);

alter table public.products
drop column if exists brand;

drop table if exists public.brands;
