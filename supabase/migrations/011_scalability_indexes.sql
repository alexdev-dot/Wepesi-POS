-- Add indexes for multi-tenant scalability (100+ businesses)
-- These indexes improve query performance when filtering by business_id

-- Products table indexes
CREATE INDEX IF NOT EXISTS idx_products_business_id_is_active ON products(business_id, is_active);
CREATE INDEX IF NOT EXISTS idx_products_business_id_category ON products(business_id, category);
CREATE INDEX IF NOT EXISTS idx_products_business_id_created_at ON products(business_id, created_at DESC);

-- Sales table indexes
CREATE INDEX IF NOT EXISTS idx_sales_business_id_created_at ON sales(business_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sales_business_id_status ON sales(business_id, status);
CREATE INDEX IF NOT EXISTS idx_sales_business_id_created_at_status ON sales(business_id, created_at DESC, status);

-- Sale items table indexes
CREATE INDEX IF NOT EXISTS idx_sale_items_product_id ON sale_items(product_id);
CREATE INDEX IF NOT EXISTS idx_sale_items_sale_id ON sale_items(sale_id);

-- Inventory movements indexes
CREATE INDEX IF NOT EXISTS idx_inventory_movements_business_id ON inventory_movements(business_id);
CREATE INDEX IF NOT EXISTS idx_inventory_movements_business_id_created_at ON inventory_movements(business_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inventory_movements_product_id_business_id ON inventory_movements(product_id, business_id);

-- Categories table indexes
CREATE INDEX IF NOT EXISTS idx_categories_business_id_name ON categories(business_id, name);

-- Composite index for common dashboard queries
CREATE INDEX IF NOT EXISTS idx_products_business_id_stock ON products(business_id, current_stock, reorder_level);
