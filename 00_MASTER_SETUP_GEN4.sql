-- >>> FILE: 00_FULL_SETUP.sql
-- ==============================================================================
-- BỘ CẤU HÌNH ĐẦY ĐỦ (ALL-IN-ONE) CHO SUPABASE E-COMMERCE
-- Dự án: Đất Phú OneBase (Chợ Phiên Tuy Hòa - Phú Yên)
-- Hướng dẫn: Mở Supabase Dashboard -> Chọn SQL Editor -> Tạo New Query -> Dán toàn bộ nội dung file này vào và bấm 'RUN'.
-- ==============================================================================

-- BƯỚC 1: EXTENSIONS & ENUMS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";

DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('customer', 'vendor', 'admin', 'shipper');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'shipping', 'completed', 'cancelled');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_status AS ENUM ('unpaid', 'paid', 'refunded');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_method AS ENUM ('vietqr', 'cod', 'momo', 'bank_transfer');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- BƯỚC 2: CÁC BẢNG DỮ LIỆU CỐT LÕI
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL DEFAULT '',
    phone TEXT,
    avatar_url TEXT,
    role user_role NOT NULL DEFAULT 'customer',
    address JSONB DEFAULT '{}'::jsonb,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    icon_url TEXT,
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vendor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    images TEXT[] NOT NULL DEFAULT '{}',
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    view_count INT NOT NULL DEFAULT 0,
    rating_avg NUMERIC(2, 1) NOT NULL DEFAULT 5.0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.product_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    sku TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    price NUMERIC(15, 2) NOT NULL CHECK (price >= 0),
    compare_at_price NUMERIC(15, 2) CHECK (compare_at_price >= price),
    stock_quantity INT NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    attributes JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.cart_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    variant_id UUID NOT NULL REFERENCES public.product_variants(id) ON DELETE CASCADE,
    quantity INT NOT NULL CHECK (quantity > 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, variant_id)
);

CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_code TEXT UNIQUE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    vendor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    subtotal NUMERIC(15, 2) NOT NULL DEFAULT 0,
    shipping_fee NUMERIC(15, 2) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(15, 2) NOT NULL DEFAULT 0,
    total_amount NUMERIC(15, 2) NOT NULL DEFAULT 0,
    status order_status NOT NULL DEFAULT 'pending',
    payment_status payment_status NOT NULL DEFAULT 'unpaid',
    payment_method payment_method NOT NULL DEFAULT 'vietqr',
    shipping_address JSONB NOT NULL,
    customer_note TEXT,
    tracking_number TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES public.product_variants(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    variant_title TEXT NOT NULL,
    price NUMERIC(15, 2) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    total NUMERIC(15, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    payment_method payment_method NOT NULL,
    transaction_code TEXT,
    amount NUMERIC(15, 2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    provider_response JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_vendor ON public.products(vendor_id);
CREATE INDEX IF NOT EXISTS idx_products_published ON public.products(is_published);
CREATE INDEX IF NOT EXISTS idx_products_search_gin ON public.products USING gin(name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_variants_product ON public.product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_cart_user ON public.cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON public.order_items(order_id);

-- BƯỚC 3: BẢO MẬT ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles Policies
DROP POLICY IF EXISTS "Cho phép xem thông tin hồ sơ cơ bản" ON public.profiles;
CREATE POLICY "Cho phép xem thông tin hồ sơ cơ bản" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Người dùng tự cập nhật hồ sơ của chính mình" ON public.profiles;
CREATE POLICY "Người dùng tự cập nhật hồ sơ của chính mình" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Categories Policies
DROP POLICY IF EXISTS "Công khai danh mục hoạt động" ON public.categories;
CREATE POLICY "Công khai danh mục hoạt động" ON public.categories FOR SELECT USING (is_active = true OR public.is_admin());

DROP POLICY IF EXISTS "Admin quản lý danh mục" ON public.categories;
CREATE POLICY "Admin quản lý danh mục" ON public.categories FOR ALL USING (public.is_admin());

-- Products Policies
DROP POLICY IF EXISTS "Khách hàng xem sản phẩm đã xuất bản" ON public.products;
CREATE POLICY "Khách hàng xem sản phẩm đã xuất bản" ON public.products FOR SELECT USING (is_published = true OR auth.uid() = vendor_id OR public.is_admin());

DROP POLICY IF EXISTS "Vendor quản lý sản phẩm của mình" ON public.products;
CREATE POLICY "Vendor quản lý sản phẩm của mình" ON public.products FOR INSERT WITH CHECK (auth.uid() = vendor_id OR public.is_admin());

DROP POLICY IF EXISTS "Vendor cập nhật sản phẩm của mình" ON public.products;
CREATE POLICY "Vendor cập nhật sản phẩm của mình" ON public.products FOR UPDATE USING (auth.uid() = vendor_id OR public.is_admin());

DROP POLICY IF EXISTS "Vendor xóa sản phẩm của mình" ON public.products;
CREATE POLICY "Vendor xóa sản phẩm của mình" ON public.products FOR DELETE USING (auth.uid() = vendor_id OR public.is_admin());

-- Variants Policies
DROP POLICY IF EXISTS "Xem biến thể của sản phẩm hợp lệ" ON public.product_variants;
CREATE POLICY "Xem biến thể của sản phẩm hợp lệ" ON public.product_variants FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.products p WHERE p.id = product_variants.product_id AND (p.is_published = true OR p.vendor_id = auth.uid() OR public.is_admin()))
);

DROP POLICY IF EXISTS "Vendor quản lý biến thể" ON public.product_variants;
CREATE POLICY "Vendor quản lý biến thể" ON public.product_variants FOR ALL USING (
    EXISTS (SELECT 1 FROM public.products p WHERE p.id = product_variants.product_id AND (p.vendor_id = auth.uid() OR public.is_admin()))
);

-- Cart Policies
DROP POLICY IF EXISTS "Người dùng quản lý giỏ hàng của chính mình" ON public.cart_items;
CREATE POLICY "Người dùng quản lý giỏ hàng của chính mình" ON public.cart_items FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Orders Policies
DROP POLICY IF EXISTS "Khách hàng xem đơn của mình; Vendor xem đơn của gian hàng; Admin xem tất cả" ON public.orders;
CREATE POLICY "Khách hàng xem đơn của mình; Vendor xem đơn của gian hàng; Admin xem tất cả" ON public.orders FOR SELECT USING (
    auth.uid() = user_id OR auth.uid() = vendor_id OR public.is_admin()
);

DROP POLICY IF EXISTS "Khách hàng tạo đơn hàng cho chính mình" ON public.orders;
CREATE POLICY "Khách hàng tạo đơn hàng cho chính mình" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Vendor/Admin cập nhật trạng thái đơn" ON public.orders;
CREATE POLICY "Vendor/Admin cập nhật trạng thái đơn" ON public.orders FOR UPDATE USING (auth.uid() = vendor_id OR public.is_admin());

-- Order Items Policies
DROP POLICY IF EXISTS "Xem chi tiết đơn hàng liên quan" ON public.order_items;
CREATE POLICY "Xem chi tiết đơn hàng liên quan" ON public.order_items FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_items.order_id AND (o.user_id = auth.uid() OR o.vendor_id = auth.uid() OR public.is_admin()))
);

-- Payments Policies
DROP POLICY IF EXISTS "Xem giao dịch thanh toán của đơn hàng liên quan" ON public.payments;
CREATE POLICY "Xem giao dịch thanh toán của đơn hàng liên quan" ON public.payments FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.orders o WHERE o.id = payments.order_id AND (o.user_id = auth.uid() OR o.vendor_id = auth.uid() OR public.is_admin()))
);

-- BƯỚC 4: FUNCTIONS & TRIGGERS
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_profiles_updated_at ON public.profiles;
CREATE TRIGGER tr_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS tr_products_updated_at ON public.products;
CREATE TRIGGER tr_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS tr_variants_updated_at ON public.product_variants;
CREATE TRIGGER tr_variants_updated_at BEFORE UPDATE ON public.product_variants FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS tr_orders_updated_at ON public.orders;
CREATE TRIGGER tr_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Trigger tự tạo Profile từ auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, role, avatar_url)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email, 'Thành viên mới'),
        COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'customer'),
        NEW.raw_user_meta_data->>'avatar_url'
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Hàm Đặt Hàng Nguyên Tử (Atomic Place Order)
CREATE OR REPLACE FUNCTION public.place_order(
    p_shipping_address JSONB,
    p_payment_method payment_method DEFAULT 'vietqr',
    p_customer_note TEXT DEFAULT ''
)
RETURNS JSONB AS $$
DECLARE
    v_user_id UUID := auth.uid();
    v_order_id UUID;
    v_order_code TEXT;
    v_subtotal NUMERIC(15, 2) := 0;
    v_total NUMERIC(15, 2) := 0;
    v_shipping_fee NUMERIC(15, 2) := 0;
    cart_rec RECORD;
    v_vendor_id UUID := NULL;
BEGIN
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Bạn cần đăng nhập để đặt hàng.';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM public.cart_items WHERE user_id = v_user_id) THEN
        RAISE EXCEPTION 'Giỏ hàng của bạn đang trống!';
    END IF;

    v_order_code := 'DP-' || TO_CHAR(NOW(), 'YYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');

    INSERT INTO public.orders (order_code, user_id, subtotal, shipping_fee, total_amount, shipping_address, payment_method, customer_note)
    VALUES (v_order_code, v_user_id, 0, v_shipping_fee, 0, p_shipping_address, p_payment_method, p_customer_note)
    RETURNING id INTO v_order_id;

    FOR cart_rec IN
        SELECT c.id AS cart_item_id, c.variant_id, c.quantity, v.title AS variant_title, v.price, v.stock_quantity, p.name AS product_name, p.vendor_id
        FROM public.cart_items c
        JOIN public.product_variants v ON c.variant_id = v.id
        JOIN public.products p ON v.product_id = p.id
        WHERE c.user_id = v_user_id
        FOR UPDATE OF v
    LOOP
        IF cart_rec.stock_quantity < cart_rec.quantity THEN
            RAISE EXCEPTION 'Sản phẩm "% - %" chỉ còn % sản phẩm trong kho!', cart_rec.product_name, cart_rec.variant_title, cart_rec.stock_quantity;
        END IF;

        UPDATE public.product_variants SET stock_quantity = stock_quantity - cart_rec.quantity WHERE id = cart_rec.variant_id;

        IF v_vendor_id IS NULL THEN
            v_vendor_id := cart_rec.vendor_id;
        END IF;

        INSERT INTO public.order_items (order_id, variant_id, product_name, variant_title, price, quantity, total)
        VALUES (v_order_id, cart_rec.variant_id, cart_rec.product_name, cart_rec.variant_title, cart_rec.price, cart_rec.quantity, (cart_rec.price * cart_rec.quantity));

        v_subtotal := v_subtotal + (cart_rec.price * cart_rec.quantity);
    END LOOP;

    v_total := v_subtotal + v_shipping_fee;

    UPDATE public.orders SET vendor_id = v_vendor_id, subtotal = v_subtotal, total_amount = v_total WHERE id = v_order_id;
    DELETE FROM public.cart_items WHERE user_id = v_user_id;

    RETURN jsonb_build_object('success', true, 'order_id', v_order_id, 'order_code', v_order_code, 'total_amount', v_total);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- BƯỚC 5: NẠP DỮ LIỆU MẪU ĐẶC SẢN ĐẤT PHÚ
INSERT INTO public.categories (id, name, slug, display_order) VALUES
('c1000000-0000-0000-0000-000000000001', 'Siêu Thị Mẹ & Bé (Sữa Tã)', 'sua-ta-me-va-be', 1),
('c1000000-0000-0000-0000-000000000002', 'Đặc Sản Xứ Nẫu & OCOP', 'dac-san-xu-nau-ocop', 2),
('c1000000-0000-0000-0000-000000000003', 'Bếp Chay Thanh Tịnh', 'bep-chay-thanh-tinh', 3),
('c1000000-0000-0000-0000-000000000004', 'Thiết Bị IT & Camera An Ninh', 'it-camera-an-ninh', 4)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (id, category_id, name, slug, description, images, is_published, is_featured, rating_avg) VALUES
('d1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000002', 'Bò Một Nắng Krông Pa Chấm Muối Kiến Vàng', 'bo-mot-nang-krong-pa', 'Bò cỏ phơi 1 nắng giòn ngọt kèm muối kiến rừng.', ARRAY['https://images.unsplash.com/photo-1544025162-d76694265947?w=800'], true, true, 5.0),
('d1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000002', 'Nước Mắm Gành Đỏ Truyền Thống 40 Độ Đạm', 'nuoc-mam-ganh-do-truyen-thong', 'Ủ chượp cá cơm than vịnh Xuân Đài thơm ngon tự nhiên.', ARRAY['https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800'], true, true, 4.9),
('d1000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000003', 'Mâm Cỗ Giỗ Chay 8 Món Thanh Tịnh Tâm Đức', 'mam-co-gio-chay-8-mon', 'Mâm cỗ chay thanh tịnh gồm 8 món chay nguyên vị phục vụ tận nơi.', ARRAY['https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800'], true, true, 5.0),
('d1000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000004', 'Camera WiFi Ngoài Trời EZVIZ H8c Xoay 360 Độ', 'camera-ezviz-h8c-360', 'Chống nước, ban đêm có màu, cảnh báo còi hú, hỗ trợ lắp đặt Tuy Hòa.', ARRAY['https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800'], true, true, 4.8)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.product_variants (product_id, sku, title, price, compare_at_price, stock_quantity, attributes) VALUES
('d1000000-0000-0000-0000-000000000001', 'BOMN-500G', 'Gói hút chân không 500g', 280000, 310000, 50, '{"weight": "500g"}'),
('d1000000-0000-0000-0000-000000000001', 'BOMN-1KG', 'Gói quà tặng 1kg (Tặng kèm 2 hũ muối kiến)', 550000, 600000, 30, '{"weight": "1kg"}'),
('d1000000-0000-0000-0000-000000000002', 'NMGD-CAP-500ML', 'Cặp 2 chai thủy tinh 500ml', 160000, 180000, 100, '{"volume": "1000ml"}'),
('d1000000-0000-0000-0000-000000000003', 'MCCHAY-8MON', 'Set trọn gói 1 mâm (Bàn ghế + Bát đĩa sành)', 850000, 950000, 10, '{"set": "8 món"}'),
('d1000000-0000-0000-0000-000000000004', 'CAM-H8C-NO-CARD', 'Camera kèm công lắp đặt cơ bản', 890000, 990000, 20, '{"storage": "chưa thẻ"}'),
('d1000000-0000-0000-0000-000000000004', 'CAM-H8C-64GB', 'Camera + Thẻ nhớ Sandisk 64GB + Công lắp đặt', 1050000, 1190000, 15, '{"storage": "thẻ 64GB"}')
ON CONFLICT (sku) DO NOTHING;


-- >>> FILE: 06_ai_chatbot_saas.sql
-- ==============================================================================
-- 06: AI SALES CHATBOT SAAS (HỆ THỐNG CHO THUÊ TRỢ LÝ BÁN HÀNG AI MULTI-TENANT)
-- ==============================================================================

-- 1. Bảng Quản lý Khách Thuê Bot (Tenants / Shops)
CREATE TABLE IF NOT EXISTS public.ai_tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    bot_code TEXT UNIQUE NOT NULL, -- Mã nhúng định danh, vd: 'shop-nam-tien'
    shop_name TEXT NOT NULL,
    bot_name TEXT NOT NULL DEFAULT 'Trợ Lý AI Bán Hàng',
    welcome_message TEXT NOT NULL DEFAULT 'Dạ em chào anh/chị! Em có thể tư vấn sản phẩm nào cho mình hôm nay ạ?',
    theme_color TEXT NOT NULL DEFAULT '#059669',
    bot_persona TEXT NOT NULL DEFAULT 'Thân thiện, nhiệt tình, luôn chủ động gợi ý sản phẩm kèm theo và khéo léo xin số điện thoại khách hàng để lên đơn.',
    plan_tier TEXT NOT NULL DEFAULT 'starter' CHECK (plan_tier IN ('starter', 'growth', 'enterprise')),
    monthly_fee NUMERIC(15, 2) NOT NULL DEFAULT 199000,
    message_quota INT NOT NULL DEFAULT 1000,
    messages_used INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '30 days'),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Bảng Kho Tri Thức & Sản Phẩm Riêng Của Từng Shop (RAG Knowledge Base)
CREATE TABLE IF NOT EXISTS public.ai_knowledge_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.ai_tenants(id) ON DELETE CASCADE,
    item_type TEXT NOT NULL DEFAULT 'product' CHECK (item_type IN ('product', 'policy', 'faq')),
    title TEXT NOT NULL,
    price NUMERIC(15, 2) DEFAULT 0,
    promo_note TEXT,
    content TEXT NOT NULL,
    image_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Bảng Khách Hàng Tiềm Năng & Đơn Hàng Do AI Tự Động Thu Thập (Captured Leads)
CREATE TABLE IF NOT EXISTS public.ai_leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.ai_tenants(id) ON DELETE CASCADE,
    customer_name TEXT DEFAULT 'Khách hàng Web',
    customer_phone TEXT NOT NULL,
    interested_product TEXT,
    order_value NUMERIC(15, 2) DEFAULT 0,
    chat_summary TEXT,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed', 'cancelled')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Bảng Lịch Sử Hội Thoại (Chat Logs)
CREATE TABLE IF NOT EXISTS public.ai_chat_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.ai_tenants(id) ON DELETE CASCADE,
    session_id TEXT NOT NULL,
    sender TEXT NOT NULL CHECK (sender IN ('user', 'bot', 'human_agent')),
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes tối ưu truy vấn Multi-tenant
CREATE INDEX IF NOT EXISTS idx_ai_knowledge_tenant ON public.ai_knowledge_items(tenant_id);
CREATE INDEX IF NOT EXISTS idx_ai_leads_tenant ON public.ai_leads(tenant_id);
CREATE INDEX IF NOT EXISTS idx_ai_chat_logs_session ON public.ai_chat_logs(tenant_id, session_id);

-- Bật RLS
ALTER TABLE public.ai_tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_knowledge_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_chat_logs ENABLE ROW LEVEL SECURITY;

-- Policies cho Widget đọc cấu hình công khai và ghi nhận Lead
DROP POLICY IF EXISTS "Public read active tenant config" ON public.ai_tenants;
CREATE POLICY "Public read active tenant config" ON public.ai_tenants
    FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public read tenant knowledge" ON public.ai_knowledge_items;
CREATE POLICY "Public read tenant knowledge" ON public.ai_knowledge_items
    FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public insert leads from chatbox" ON public.ai_leads;
CREATE POLICY "Public insert leads from chatbox" ON public.ai_leads
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public insert chat logs" ON public.ai_chat_logs;
CREATE POLICY "Public insert chat logs" ON public.ai_chat_logs
    FOR INSERT WITH CHECK (true);

-- 5. Hàm RPC kiểm tra hạn mức gói thuê & tăng bộ đếm tin nhắn
CREATE OR REPLACE FUNCTION public.increment_bot_usage(p_bot_code TEXT)
RETURNS JSONB AS $$
DECLARE
    v_tenant public.ai_tenants%ROWTYPE;
BEGIN
    SELECT * INTO v_tenant FROM public.ai_tenants WHERE bot_code = p_bot_code FOR UPDATE;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('allowed', false, 'reason', 'Không tìm thấy mã Bot');
    END IF;

    IF NOT v_tenant.is_active OR v_tenant.expires_at < NOW() THEN
        RETURN jsonb_build_object('allowed', false, 'reason', 'Gói thuê đã hết hạn');
    END IF;

    IF v_tenant.messages_used >= v_tenant.message_quota THEN
        RETURN jsonb_build_object('allowed', false, 'reason', 'Đã hết lượt tin nhắn trong tháng');
    END IF;

    UPDATE public.ai_tenants
    SET messages_used = messages_used + 1, updated_at = NOW()
    WHERE id = v_tenant.id;

    RETURN jsonb_build_object(
        'allowed', true,
        'messages_used', v_tenant.messages_used + 1,
        'message_quota', v_tenant.message_quota
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Dữ liệu mẫu 3 Khách Hàng Đang Thuê Chatbox AI
INSERT INTO public.ai_tenants (id, bot_code, shop_name, bot_name, welcome_message, theme_color, plan_tier, monthly_fee, message_quota, messages_used) VALUES
(
    'a1000000-0000-0000-0000-000000000001',
    'bot-dac-san-phu-yen',
    'Đặc Sản Xứ Nẫu Chị Ba',
    'Út Nẫu AI - Chuyên Đặc Sản Phú Yên',
    'Dạ Út Nẫu chào anh/chị nghen! Anh/chị đang tìm Bò một nắng Krông Pa, Nước mắm Gành Đỏ hay Mực một nắng Sông Cầu để làm quà ạ?',
    '#d97706',
    'growth',
    499000,
    5000,
    1420
),
(
    'a1000000-0000-0000-0000-000000000002',
    'bot-sieu-thi-nam-tien',
    'Hệ Thống 10 Siêu Thị Sữa Tã Năm Tiền',
    'Trợ Lý Mẹ & Bé Năm Tiền',
    'Chào Ba Mẹ! Em là Trợ lý AI của Siêu thị Năm Tiền. Ba mẹ cần tìm sữa công thức, tã bỉm nội địa hay đồ ăn dặm cho bé mấy tháng tuổi ạ?',
    '#0284c7',
    'enterprise',
    1200000,
    20000,
    6850
),
(
    'a1000000-0000-0000-0000-000000000003',
    'bot-bep-chay-tam-duc',
    'Bếp Chay Thanh Tịnh Tâm Đức',
    'Trợ Lý Bếp Chay Tâm Đức',
    'Nam Mô A Di Đà Phật! Bếp Chay Tâm Đức xin kính chào quý khách. Quý gia chủ cần đặt Mâm cỗ giỗ chay tận nhà hay món chay thanh tịnh hằng ngày ạ?',
    '#059669',
    'starter',
    199000,
    1000,
    380
)
ON CONFLICT (bot_code) DO NOTHING;


-- >>> FILE: 07_omnichannel_webhooks.sql
-- ==============================================================================
-- 07: OMNI-CHANNEL MESSAGING (ZALO OA, FACEBOOK MESSENGER, VIBER BOT)
-- Hệ thống Nhận & Trả lời Tin nhắn Đa kênh Tự động bằng AI
-- ==============================================================================

-- 1. Định nghĩa nguồn kênh tin nhắn
DO $$ BEGIN
    CREATE TYPE messaging_channel AS ENUM ('website', 'zalo', 'facebook', 'viber');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Bảng Cấu hình Kết nối Kênh của từng Shop thuê (Tenant Channel Connections)
CREATE TABLE IF NOT EXISTS public.ai_channel_connections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.ai_tenants(id) ON DELETE CASCADE,
    channel messaging_channel NOT NULL,
    channel_name TEXT NOT NULL, -- VD: 'Fanpage Đặc Sản Chị Ba', 'Zalo OA Siêu Thị Năm Tiền'
    external_page_id TEXT NOT NULL, -- Facebook Page ID, Zalo OA ID, hoặc Viber Bot URI
    access_token TEXT, -- Page Access Token / Zalo OA Token / Viber Auth Token
    verify_token TEXT DEFAULT encode(gen_random_bytes(12), 'hex'),
    ai_auto_reply BOOLEAN NOT NULL DEFAULT TRUE, -- Cho phép bật/tắt AI để nhân viên nhảy vào chat
    is_connected BOOLEAN NOT NULL DEFAULT TRUE,
    last_webhook_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(tenant_id, channel, external_page_id)
);

-- 3. Bổ sung cột nguồn kênh (channel_source) vào bảng Leads và Chat Logs
ALTER TABLE public.ai_leads 
    ADD COLUMN IF NOT EXISTS channel_source messaging_channel NOT NULL DEFAULT 'website',
    ADD COLUMN IF NOT EXISTS external_sender_id TEXT;

ALTER TABLE public.ai_chat_logs 
    ADD COLUMN IF NOT EXISTS channel_source messaging_channel NOT NULL DEFAULT 'website',
    ADD COLUMN IF NOT EXISTS external_sender_id TEXT,
    ADD COLUMN IF NOT EXISTS sender_name TEXT DEFAULT 'Khách hàng';

-- Index tra cứu nhanh khi Webhook từ Zalo/Facebook/Viber bắn về
CREATE INDEX IF NOT EXISTS idx_channel_lookup ON public.ai_channel_connections(channel, external_page_id);

-- Bật RLS
ALTER TABLE public.ai_channel_connections ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public view active channel connections" ON public.ai_channel_connections;
CREATE POLICY "Public view active channel connections" ON public.ai_channel_connections
    FOR SELECT USING (is_connected = true);

-- 4. Dữ liệu kết nối mẫu cho 3 Shop thuê
INSERT INTO public.ai_channel_connections (tenant_id, channel, channel_name, external_page_id, ai_auto_reply, is_connected) VALUES
('a1000000-0000-0000-0000-000000000001', 'zalo', 'Zalo OA Đặc Sản Xứ Nẫu Chị Ba', 'zalo_oa_440199281', true, true),
('a1000000-0000-0000-0000-000000000001', 'facebook', 'Fanpage Bò Một Nắng Chị Ba Phú Yên', 'fb_page_109283746', true, true),
('a1000000-0000-0000-0000-000000000001', 'viber', 'Viber Chị Ba Wholesale', 'viber_bot_chiba', true, true),
('a1000000-0000-0000-0000-000000000002', 'zalo', 'Zalo OA Siêu Thị Mẹ & Bé Năm Tiền', 'zalo_oa_998877665', true, true),
('a1000000-0000-0000-0000-000000000002', 'facebook', 'Fanpage Hệ Thống Sữa Tã Năm Tiền', 'fb_page_554433221', true, true)
ON CONFLICT DO NOTHING;


-- >>> FILE: 08_b2b_gen4_vietqr_n8n.sql
-- ==============================================================================
-- 08: ĐẤT PHÚ GEN 4 - B2B AI BOT CONFIGS, VIETQR ZERO-FLOAT & N8N SCHEMA
-- Khớp 100% với luồng 6 Node n8n (b2b_merchants, b2b_bot_configs, b2b_ai_orders)
-- ==============================================================================

-- 1. Bảng Chủ Cửa Hàng / Hộ Kinh Doanh Thuê Bot (b2b_merchants)
CREATE TABLE IF NOT EXISTS public.b2b_merchants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    business_name TEXT NOT NULL,
    owner_phone TEXT NOT NULL,
    owner_zalo_id TEXT, -- Để n8n bắn cảnh báo Human Handoff & Báo cáo ROI tối Chủ Nhật
    subscription_plan TEXT NOT NULL DEFAULT 'monthly_199k' CHECK (subscription_plan IN ('monthly_199k', 'yearly_1990k', 'pro_499k')),
    referred_by_agent TEXT, -- Mã Đại lý / Cựu nhân viên ngân hàng giới thiệu (hưởng 30-50% tháng đầu)
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '30 days'),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Bảng Cấu Hình Bot 15 Phút & Tài Khoản VietQR Zero-Float (b2b_bot_configs)
CREATE TABLE IF NOT EXISTS public.b2b_bot_configs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    merchant_id UUID NOT NULL REFERENCES public.b2b_merchants(id) ON DELETE CASCADE,
    zalo_oa_id TEXT UNIQUE,
    fb_page_id TEXT UNIQUE,
    viber_bot_id TEXT UNIQUE,
    -- 3 Thao tác Onboarding 15 phút của Chủ tiệm:
    bank_code TEXT NOT NULL DEFAULT 'MB', -- Mã BIN/Ngân hàng VietQR (MB, VCB, ICB, BIDV...)
    bank_account_number TEXT NOT NULL,    -- Số tài khoản của chính chủ tiệm (Zero-Float: tiền về thẳng chủ tiệm)
    bank_account_name TEXT NOT NULL,      -- Tên chủ tài khoản
    items_catalog JSONB NOT NULL DEFAULT '[]'::jsonb, -- Danh mục 5-10 món chính + giá chuẩn (Chống chém gió)
    ai_system_prompt TEXT NOT NULL DEFAULT 'Chỉ tư vấn đúng các món trong bảng giá. Nếu khách hỏi món ngoài danh mục, trả lời: "Dạ món này cửa hàng hiện chưa có, em xin báo chủ tiệm hỗ trợ Anh/Chị ngay ạ!"',
    human_handoff_until TIMESTAMPTZ NOT NULL DEFAULT NOW() - INTERVAL '1 minute', -- Tự động tạm dừng 30 phút khi khách gõ "gặp chủ tiệm"
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Bảng Đơn Hàng AI Đã Chốt & Sinh Mã VietQR (b2b_ai_orders)
CREATE TABLE IF NOT EXISTS public.b2b_ai_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    merchant_id UUID NOT NULL REFERENCES public.b2b_merchants(id) ON DELETE CASCADE,
    order_code TEXT NOT NULL DEFAULT ('DP' || LPAD(FLOOR(RANDOM() * 100000)::TEXT, 5, '0')),
    channel_source TEXT NOT NULL DEFAULT 'zalo',
    customer_zalo_id TEXT,
    customer_name TEXT DEFAULT 'Khách hàng',
    customer_phone TEXT NOT NULL,
    customer_address TEXT,
    items_summary TEXT,
    total_amount NUMERIC(15, 2) NOT NULL DEFAULT 0,
    vietqr_url TEXT,
    status TEXT NOT NULL DEFAULT 'pending_payment' CHECK (status IN ('pending_payment', 'paid', 'completed', 'cancelled')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. View Báo Cáo ROI Tự Động Tối Chủ Nhật Hàng Tuần (Weekly ROI Report)
CREATE OR REPLACE VIEW public.v_b2b_weekly_roi_report AS
SELECT 
    m.id AS merchant_id,
    m.business_name,
    m.owner_phone,
    m.owner_zalo_id,
    168 AS hours_online,
    COUNT(o.id) AS total_orders_closed,
    COALESCE(SUM(o.total_amount), 0) AS total_vietqr_revenue
FROM public.b2b_merchants m
LEFT JOIN public.b2b_ai_orders o 
    ON o.merchant_id = m.id 
    AND o.created_at >= (NOW() - INTERVAL '7 days')
GROUP BY m.id, m.business_name, m.owner_phone, m.owner_zalo_id;

-- 5. Bật Row Level Security (RLS) Phân Tách Tuyệt Đối Giữa Các Cửa Hàng
ALTER TABLE public.b2b_merchants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.b2b_bot_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.b2b_ai_orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Merchant chỉ xem dữ liệu của chính mình" ON public.b2b_merchants;
CREATE POLICY "Merchant chỉ xem dữ liệu của chính mình" ON public.b2b_merchants
    FOR ALL USING (owner_user_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "Merchant quản lý cấu hình bot riêng" ON public.b2b_bot_configs;
CREATE POLICY "Merchant quản lý cấu hình bot riêng" ON public.b2b_bot_configs
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.b2b_merchants m WHERE m.id = b2b_bot_configs.merchant_id AND (m.owner_user_id = auth.uid() OR public.is_admin()))
    );

DROP POLICY IF EXISTS "Merchant chỉ xem đơn hàng của tiệm mình" ON public.b2b_ai_orders;
CREATE POLICY "Merchant chỉ xem đơn hàng của tiệm mình" ON public.b2b_ai_orders
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.b2b_merchants m WHERE m.id = b2b_ai_orders.merchant_id AND (m.owner_user_id = auth.uid() OR public.is_admin()))
    );

-- 6. Dữ liệu mẫu kiểm thử luồng n8n
INSERT INTO public.b2b_merchants (id, business_name, owner_phone, subscription_plan, referred_by_agent) VALUES
('b2b00000-0000-0000-0000-000000000001', 'Đặc Sản Xứ Nẫu Chị Ba', '0914882341', 'monthly_199k', 'AGENT_VCB_TUYHOA_01'),
('b2b00000-0000-0000-0000-000000000002', 'Hệ Thống Sữa Tã Năm Tiền', '0989112567', 'yearly_1990k', 'AGENT_MB_PHUYEN_02')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.b2b_bot_configs (merchant_id, zalo_oa_id, bank_code, bank_account_number, bank_account_name, items_catalog) VALUES
(
    'b2b00000-0000-0000-0000-000000000001',
    'zalo_oa_440199281',
    'MB',
    '0914882341',
    'NGUYEN THI BA',
    '[{"name": "Bò Một Nắng Krông Pa 500g", "price": 280000}, {"name": "Combo Bò Một Nắng 1Kg", "price": 550000}, {"name": "Nước Mắm Gành Đỏ Cặp 2 Chai", "price": 160000}]'::jsonb
)
ON CONFLICT (zalo_oa_id) DO NOTHING;

-- >>> FILE: 09_worker_6k_and_mckinsey_vas.sql
-- ==============================================================================
-- 09: HẠ TẦNG GỌI THỢ 6K (OTP K5 & CHIA TIỀN 95/5) + TÍN NHIỆM DÒNG TIỀN PRO VAS
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.worker_6k_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    worker_code TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    specialty TEXT NOT NULL, -- 'Điện lạnh', 'Điện nước', 'Sửa khóa', 'Camera IT'
    ward_area TEXT NOT NULL DEFAULT 'P.7, TP. Tuy Hòa',
    rating_avg NUMERIC(2,1) NOT NULL DEFAULT 4.9,
    completed_jobs INT NOT NULL DEFAULT 128,
    bank_code TEXT NOT NULL DEFAULT 'VCB',
    bank_account_no TEXT NOT NULL,
    is_verified_cccd BOOLEAN NOT NULL DEFAULT TRUE,
    is_online BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.worker_6k_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_code TEXT UNIQUE NOT NULL, -- VD: 'REQ-882910'
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_address TEXT NOT NULL,
    service_title TEXT NOT NULL,
    worker_id UUID REFERENCES public.worker_6k_profiles(id) ON DELETE SET NULL,
    k_stage TEXT NOT NULL DEFAULT 'K4' CHECK (k_stage IN ('K1', 'K2', 'K3', 'K4', 'K5', 'K6')),
    locked_price NUMERIC(15,2) NOT NULL DEFAULT 500000,
    worker_payout_95 NUMERIC(15,2) GENERATED ALWAYS AS (locked_price * 0.95) STORED,
    platform_fee_5 NUMERIC(15,2) GENERATED ALWAYS AS (locked_price * 0.05) STORED,
    otp_code_4digit TEXT NOT NULL DEFAULT '6821',
    is_otp_verified BOOLEAN NOT NULL DEFAULT FALSE,
    checkin_gps_coords TEXT DEFAULT '13.0955, 109.3209',
    warranty_months INT NOT NULL DEFAULT 3,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.merchant_credit_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    merchant_id UUID NOT NULL REFERENCES public.b2b_merchants(id) ON DELETE CASCADE,
    credit_score INT NOT NULL DEFAULT 850 CHECK (credit_score BETWEEN 300 AND 1000),
    tier_rank TEXT NOT NULL DEFAULT 'DIAMOND',
    monthly_verified_gmv NUMERIC(15,2) NOT NULL DEFAULT 68500000,
    recommended_credit_limit NUMERIC(15,2) NOT NULL DEFAULT 150000000,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(merchant_id)
);

ALTER TABLE public.worker_6k_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.worker_6k_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.merchant_credit_scores ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public view verified 6K workers" ON public.worker_6k_profiles;
CREATE POLICY "Public view verified 6K workers" ON public.worker_6k_profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public view and verify 6K bookings" ON public.worker_6k_bookings;
CREATE POLICY "Public view and verify 6K bookings" ON public.worker_6k_bookings FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public view merchant credit scores" ON public.merchant_credit_scores;
CREATE POLICY "Public view merchant credit scores" ON public.merchant_credit_scores FOR SELECT USING (true);

-- Hàm RPC Xác thực OTP 4 số (K5) & Giải ngân 95/5 tự động
CREATE OR REPLACE FUNCTION public.verify_worker_6k_otp(
    p_booking_code TEXT,
    p_otp_input TEXT
)
RETURNS JSONB AS $$
DECLARE
    v_booking public.worker_6k_bookings%ROWTYPE;
BEGIN
    SELECT * INTO v_booking FROM public.worker_6k_bookings WHERE booking_code = p_booking_code FOR UPDATE;
    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'message', 'Không tìm thấy mã ca dịch vụ!');
    END IF;

    IF v_booking.otp_code_4digit <> TRIM(p_otp_input) THEN
        RETURN jsonb_build_object('success', false, 'message', 'Mã OTP 4 số không khớp!');
    END IF;

    UPDATE public.worker_6k_bookings
    SET is_otp_verified = TRUE, k_stage = 'K6', completed_at = NOW()
    WHERE id = v_booking.id;

    RETURN jsonb_build_object(
        'success', true,
        'booking_code', v_booking.booking_code,
        'k_stage', 'K6',
        'worker_payout_95', v_booking.locked_price * 0.95,
        'platform_fee_5', v_booking.locked_price * 0.05,
        'message', 'Nghiệm thu K5 thành công! Đã giải ngân 95% cho Thợ & kích hoạt Bảo hành điện tử K6.'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Dữ liệu mẫu Case Study Chị Phượng & Thợ Lê Văn Hùng
INSERT INTO public.worker_6k_profiles (id, worker_code, full_name, phone, specialty, ward_area, rating_avg, completed_jobs, bank_code, bank_account_no) VALUES
('66000000-0000-0000-0000-000000000001', 'THO-PY-001', 'Lê Văn Hùng', '0935668999', 'Điện lạnh & Máy giặt', 'P.7, TP. Tuy Hòa', 4.9, 142, 'VCB', '0751000088999')
ON CONFLICT (worker_code) DO NOTHING;

INSERT INTO public.worker_6k_bookings (booking_code, customer_name, customer_phone, customer_address, service_title, worker_id, k_stage, locked_price, otp_code_4digit) VALUES
('REQ-882910', 'Chị Phượng', '0905123456', 'P.7, TP. Tuy Hòa, Phú Yên', 'Tháo lắp & Di dời máy lạnh Inverter 1.5HP (Trọn gói ống đồng & nạp gas bổ sung)', '66000000-0000-0000-0000-000000000001', 'K4', 500000, '6821')
ON CONFLICT (booking_code) DO NOTHING;

INSERT INTO public.merchant_credit_scores (merchant_id, credit_score, tier_rank, monthly_verified_gmv, recommended_credit_limit) VALUES
('b2b00000-0000-0000-0000-000000000001', 850, 'DIAMOND', 68500000, 150000000)
ON CONFLICT (merchant_id) DO NOTHING;

