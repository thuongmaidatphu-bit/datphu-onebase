# 🛠️ CẨM NANG CẤU HÌNH SẢN PHẨM & VẬN HÀNH THỰC TẾ (TỪ A – Z)
**Đơn vị:** CÔNG TY TNHH THƯƠNG MẠI ĐẤT PHÚ (`MST: 4401020233` — Giám đốc: **Phạm Thanh Hân**)  

Để hệ thống **Chatbox AI & Sàn Đất Phú (Chợ Phiên + Gọi Thợ 6K)** chạy thực tế và thu tiền tự động, công việc của bạn được chia làm **2 nhóm rõ ràng**:
- **Nhóm A (Làm 1 lần duy nhất — khoảng 15 phút):** Cấu hình Hạ tầng Gốc của Công ty Đất Phú.
- **Nhóm B (Làm lặp lại 5 phút/tiệm):** Cấu hình Sản phẩm & Bảng giá cho từng Cửa hàng thuê/mua.

---

## PHẦN A: 3 VIỆC CẦN LÀM 1 LẦN DUY NHẤT CHO HỆ THỐNG GỐC ĐẤT PHÚ

### Việc 1: Khởi tạo Bảng Dữ liệu trên Supabase (3 phút)
1. Đăng nhập vào Supabase Dashboard của bạn (Project: `fxaqxgvounimfrxjcszw`):  
   👉 `https://supabase.com/dashboard/project/fxaqxgvounimfrxjcszw/sql/new`
2. Mở file [00_MASTER_SETUP_GEN4.sql](file:///e:/datphu-onebase/supabase/migrations/00_MASTER_SETUP_GEN4.sql), copy toàn bộ (`Ctrl + A` ➔ `Ctrl + C`), dán vào ô SQL Editor của Supabase và bấm nút **RUN**.
3. Vào mục **Project Settings ➔ API** trên Supabase, copy 2 thông số:
   - `Project URL`: `https://fxaqxgvounimfrxjcszw.supabase.co`
   - `anon public key` (và `service_role key` dùng cho n8n/Edge Function).

### Việc 2: Lấy Chìa khóa Trí tuệ Nhân tạo (Gemini API Key — 2 phút)
1. Truy cập Google AI Studio: `https://aistudio.google.com/app/apikey` (Đăng nhập bằng Gmail công ty Đất Phú).
2. Bấm **"Create API Key"** để lấy mã `AIzaSy...` (Dòng **Gemini 1.5 Flash** có gói miễn phí rất lớn và chi phí trả phí cực rẻ, chỉ ~1.500đ cho 1.000 tin nhắn).
3. Dán mã này vào luồng tự động hóa [n8n_datphu_gen4_workflow.json](file:///e:/datphu-onebase/n8n_datphu_gen4_workflow.json) hoặc Supabase Edge Function [index.ts](file:///e:/datphu-onebase/supabase/functions/omni-webhook/index.ts).

### Việc 3: Đưa Giao diện Web App lên Tên miền thật (5 phút — Miễn phí 100%)
Để gửi link qua Zalo cho khách hàng bấm trên điện thoại (thay vì mở file trên máy tính):
1. Truy cập **Vercel.com** hoặc **Netlify.com** (hoặc dùng `npx vercel` ngay trong thư mục `E:\datphu-onebase`).
2. Kéo thả thư mục `E:\datphu-onebase` lên để nhận ngay đường link HTTPS chính thức (ví dụ: `https://datphu-onebase.vercel.app` hoặc gắn tên miền riêng `https://app.datphu.vn`).

---

## PHẦN B: 3 BƯỚC CẤU HÌNH SẢN PHẨM CHO MỘT CỬA HÀNG MỚI (5 PHÚT / TIỆM)

Mỗi khi bạn chốt được 1 cửa hàng (gói 199K / 1.990K / 3.900K), bạn chỉ cần thu thập **3 thông tin** của chủ quán và nạp vào công cụ **[cau_hinh_san_pham.html](file:///e:/datphu-onebase/cau_hinh_san_pham.html)**:

### Bước 1: Nhập Thông tin Cửa hàng & Tài khoản Ngân hàng của Chủ tiệm
- **Tên cửa hàng:** (Ví dụ: *Đặc Sản Phú Yên Chị Ba*)
- **Số điện thoại Zalo chủ tiệm:** (Để AI bắn đơn hàng và chuyển tiếp khi khách cần gặp người thật)
- **Ngân hàng & Số tài khoản nhận tiền của Chủ tiệm:** (Ví dụ: `VCB` - `0751000025858`).  
  👉 *Lưu ý quan trọng:* Nhập STK của ai thì mã VietQR trong khung chat sẽ chuyển tiền thẳng về tài khoản của người đó (**Zero-Float**).

### Bước 2: Nhập Danh sách Sản phẩm / Dịch vụ (Từ 5 – 15 món chủ lực)
Với mỗi sản phẩm hoặc dịch vụ, bạn chỉ cần nhập **4 ô**:
1. **Tên sản phẩm / Dịch vụ:** (VD: *Bò Một Nắng Krông Pa 500g* hoặc *Tháo lắp máy lạnh 1.5HP*)
2. **Giá bán niêm yết (VNĐ):** (VD: `280000` hoặc `500000`) — *AI sẽ bám sát con số này để tính tổng tiền và tạo mã VietQR, tuyệt đối không tự bịa giá.*
3. **Ưu đãi / Khuyến mãi đi kèm:** (VD: *Tặng kèm 2 hũ muối kiến vàng* hoặc *Bảo hành điện tử 3 tháng chuẩn 6K*)
4. **Mô tả ngắn / Quy cách:** (VD: *Đóng gói hút chân không, giao nhanh 30 phút nội thành Tuy Hòa*).

### Bước 3: Xuất Cấu hình & Bàn giao cho Chủ tiệm (1-Click)
Sau khi nhập xong sản phẩm trên trang **[cau_hinh_san_pham.html](file:///e:/datphu-onebase/cau_hinh_san_pham.html)**, hệ thống tự động sinh ra cho bạn **3 thứ**:
1. **Lệnh SQL tự động (`INSERT INTO...`):** Copy dán vào Supabase để lưu vĩnh viễn cửa hàng lên Cloud.
2. **Đường link Chatbox Zalo AI riêng của tiệm:** Để chủ quán gắn vào phần giới thiệu Zalo / Fanpage Facebook hoặc in mã QR dán tại quầy thu ngân.
3. **1 Dòng Mã Nhúng Website (`<script src=...>`):** Nếu chủ quán có sẵn Website, chỉ cần dán 1 dòng này vào web là nút Chat Đỏ - Xanh Dương hiện lên ngay góc phải màn hình!
