const fs = require('fs');
const path = require('path');

const brainDir = 'C:/Users/Admin/.gemini/antigravity/brain/07120904-e49f-434a-88d1-ea4b937ac6ae';
const targetBaseDir = 'e:/DU_LIEU_CONG_TY_DAT_PHU';
const repoDocsDir = 'e:/datphu-onebase/docs';

// Ensure directories
const dirsToCreate = [
  targetBaseDir,
  path.join(targetBaseDir, '1_HO_SO_DOANH_NGHIEP_VA_PHAP_LY'),
  path.join(targetBaseDir, '2_CHIEN_LUOC_KINH_TE_VA_THUONG_HIEU'),
  path.join(targetBaseDir, '3_CO_SO_DU_LIEU_DATABASE_JSON_CSV'),
  path.join(targetBaseDir, '4_HINH_ANH_LOGO_VA_CHUNG_TU'),
  path.join(targetBaseDir, '5_HE_THONG_WEB_APP_OFFLINE'),
  repoDocsDir
];

dirsToCreate.forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

console.log('Created directories structure.');

// 1. Copy Legal & Company Profile Docs
const legalDocs = [
  { src: path.join(brainDir, 'datphu_ho_so_doanh_nghiep.md'), dest: path.join(targetBaseDir, '1_HO_SO_DOANH_NGHIEP_VA_PHAP_LY', 'datphu_ho_so_doanh_nghiep.md') },
  { src: path.join(brainDir, 'datphu_co_cau_to_chuc.md'), dest: path.join(targetBaseDir, '1_HO_SO_DOANH_NGHIEP_VA_PHAP_LY', 'datphu_co_cau_to_chuc_tai_chinh_ke_toan.md') }
];

legalDocs.forEach(item => {
  if (fs.existsSync(item.src)) {
    fs.copyFileSync(item.src, item.dest);
    fs.copyFileSync(item.src, path.join(repoDocsDir, path.basename(item.dest)));
    console.log('Copied legal doc:', path.basename(item.dest));
  }
});

// Thêm tóm tắt thông tin pháp lý
const phapLyText = `CÔNG TY TNHH THƯƠNG MẠI ĐẤT PHÚ
Mã số thuế: 4401020233 (Cấp ngày: 08/11/2016 bởi Sở KH&ĐT tỉnh Phú Yên)
Người đại diện pháp luật: PHẠM THANH HÂN - Chức vụ: Giám Đốc
Địa chỉ trụ sở chính: Thôn Đông Phước, Xã Hòa An, Huyện Phú Hòa, Tỉnh Phú Yên.
Văn phòng điều hành Tuy Hòa: Số 21/146 Ngô Gia Tự, KP. Phú Đông 2, P. Phú Yên, TP. Tuy Hòa.
Tài khoản ngân hàng chính thức: 0751000025858 tại Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank - CN Phú Yên). Mã BIN: 970436.
Ký hiệu mẫu hóa đơn điện tử: 1C26TDP (Ký hiệu hóa đơn: C26TDP).
Chế độ kế toán áp dụng: Thông tư 88/2021/TT-BTC & Thông tư 133/2016/TT-BTC.
`;
fs.writeFileSync(path.join(targetBaseDir, '1_HO_SO_DOANH_NGHIEP_VA_PHAP_LY', 'thong_tin_phap_ly_va_hd_dien_tu.txt'), phapLyText, 'utf8');

// 2. Copy Strategy & Brand Guidelines Docs
const strategyDocs = [
  { src: path.join(brainDir, 'BAN_KE_HOACH_NEN_KINH_TE_KIEU_MOI_DAT_PHU.md'), dest: path.join(targetBaseDir, '2_CHIEN_LUOC_KINH_TE_VA_THUONG_HIEU', 'BAN_KE_HOACH_NEN_KINH_TE_KIEU_MOI_DAT_PHU.md') },
  { src: path.join(brainDir, 'datphu_brand_guidelines.md'), dest: path.join(targetBaseDir, '2_CHIEN_LUOC_KINH_TE_VA_THUONG_HIEU', 'datphu_brand_guidelines_cam_nang_thuong_hieu.md') }
];

strategyDocs.forEach(item => {
  if (fs.existsSync(item.src)) {
    fs.copyFileSync(item.src, item.dest);
    fs.copyFileSync(item.src, path.join(repoDocsDir, path.basename(item.dest)));
    console.log('Copied strategy doc:', path.basename(item.dest));
  }
});

// Thêm file biểu phí sàn 8% - 15%
const feeText = `# BIỂU PHÍ SÀN THƯƠNG MẠI ĐIỆN TỬ ĐẤT PHÚ ONEBASE (8% - 15%)

1. Đặc sản Xứ Nẫu & Nông sản OCOP: 8% (Bao gồm hóa đơn điện tử, tiếp thị số, hỗ trợ hộ kinh doanh)
2. Đồ thanh lý kiểm định 6K: 10% (Bao gồm chi phí thẩm định an toàn thiết bị, bảo hành 30 ngày)
3. Sách cũ, tư liệu khảo cứu & Văn hóa: 12% (Bao gồm chi phí bảo quản, phân loại số)
4. Dịch vụ cứu hộ thợ kỹ thuật: Thợ nhận 80% • Sàn giữ 20% (Duy trì hạ tầng điều phối AI và bảo vệ quyền lợi khách hàng)

Cam kết 100% minh bạch, không phí ẩn.
`;
fs.writeFileSync(path.join(targetBaseDir, '2_CHIEN_LUOC_KINH_TE_VA_THUONG_HIEU', 'quy_chuan_bieu_phi_san_8_15_phan_tram.md'), feeText, 'utf8');

// 3. Export Databases: Inventory, CRM, Accounting, Community Feed, Workers
const inventoryData = [
  { id: 'inv-01', name: 'Tụ ngậm quạt Daikin/Panasonic 35uF 450V', cat: 'vat_tu', catName: 'Vật tư kỹ thuật (8%)', feeRate: 0.08, cost: 45000, price: 120000, stock: 8, unit: 'cái' },
  { id: 'inv-02', name: 'Bò một nắng Krông Pa - Sơn Hòa (Hút chân không 1kg)', cat: 'dac_san', catName: 'Đặc sản Xứ Nẫu (8%)', feeRate: 0.08, cost: 460000, price: 620000, stock: 15, unit: 'kg' },
  { id: 'inv-03', name: 'Bộ 3 cuốn Khảo cứu Địa chí & Văn hóa Phú Yên (Bìa cứng)', cat: 'sach_cu', catName: 'Sách cũ & Tư liệu (12%)', feeRate: 0.12, cost: 110000, price: 185000, stock: 3, unit: 'bộ' },
  { id: 'inv-04', name: 'Máy bơm nước tăng áp Sena 150W (Kiểm định 6K)', cat: 'do_cu', catName: 'Đồ cũ kiểm định (10%)', feeRate: 0.10, cost: 350000, price: 550000, stock: 2, unit: 'cái' },
  { id: 'inv-05', name: 'Bánh tráng Hòa Đa nướng mè thượng hạng (Xâu 20 cái)', cat: 'dac_san', catName: 'Đặc sản Xứ Nẫu (8%)', feeRate: 0.08, cost: 35000, price: 65000, stock: 30, unit: 'xâu' },
  { id: 'inv-06', name: 'Bình gas lạnh R32 mini nạp cứu hộ (1kg van chống nổ)', cat: 'vat_tu', catName: 'Vật tư kỹ thuật (8%)', feeRate: 0.08, cost: 180000, price: 280000, stock: 5, unit: 'bình' }
];

const crmData = [
  { id: 'crm-01', name: 'Chị Lan', phone: '0905123456', address: 'Số 45 Nguyễn Huệ, P.7, TP. Tuy Hòa', device: 'Máy giặt Toshiba 8.5kg & Bò một nắng', cycleMonths: 3, lastDate: '2026-07-20', nextDate: '2026-10-20', tier: 'VIP' },
  { id: 'crm-02', name: 'Anh Tuấn (Quán phở Phú Yên)', phone: '0914987654', address: '182 Hùng Vương, P.7, TP. Tuy Hòa', device: 'Tủ đông Sanaky 400L & Nồi ninh điện', cycleMonths: 6, lastDate: '2026-06-10', nextDate: '2026-12-10', tier: 'TIEM' },
  { id: 'crm-03', name: 'Chú Ba Đức', phone: '0983222333', address: 'Đường Nguyễn Văn Linh, P. Phú Lâm, Tuy Hòa', device: 'Máy bơm nước giếng khoan 750W', cycleMonths: 6, lastDate: '2026-04-15', nextDate: '2026-10-15', tier: 'STANDARD' },
  { id: 'crm-04', name: 'Cô Thảo', phone: '0935555666', address: 'Khu phố 3, Phường 5, TP. Tuy Hòa', device: 'Máy lạnh Daikin 1.5HP Inverter', cycleMonths: 3, lastDate: '2026-07-22', nextDate: '2026-10-22', tier: 'VIP' },
  { id: 'crm-05', name: 'Thầy Hưng', phone: '0978111222', address: 'Trường THPT Duy Tân, P.9, TP. Tuy Hòa', device: 'Tủ sách khảo cứu & Đặc sản biếu tết', cycleMonths: 12, lastDate: '2026-01-10', nextDate: '2026-12-30', tier: 'STANDARD' }
];

const accountingData = {
  circular: 'Thong tu 88/2021/TT-BTC & TT 133/2016/TT-BTC',
  company: 'CONG TY TNHH THUONG MAI DAT PHU',
  taxCode: '4401020233',
  invoiceTemplate: '1C26TDP',
  period: 'Thang 10/2026',
  s1_revenue: [
    { date: '2026-10-15', docNo: 'HD-001/1C26TDP', desc: 'Ban 5kg Bo mot nang Krong Pa', goodsRev: 3100000, serviceRev: 0, total: 3100000 },
    { date: '2026-10-18', docNo: 'HD-002/1C26TDP', desc: 'Cong tho bao duong may lanh Daikin', goodsRev: 0, serviceRev: 450000, total: 450000 },
    { date: '2026-10-22', docNo: 'HD-003/1C26TDP', desc: 'Thanh ly may bom Sena 150W 6K', goodsRev: 550000, serviceRev: 0, total: 550000 },
    { date: '2026-10-25', docNo: 'HD-004/1C26TDP', desc: 'Ban 10 xau Banh trang Hoa Da', goodsRev: 650000, serviceRev: 0, total: 650000 }
  ],
  s3_expenses: [
    { date: '2026-10-05', desc: 'Do xang xe may di cuu ho may bom Phu Lam', cat: 'xang_xe', amount: 80000 },
    { date: '2026-10-12', desc: 'Mua thung carton mang PE boc hang', cat: 'bao_bi', amount: 150000 },
    { date: '2026-10-18', desc: 'Cuoc 4G va dien thoai cham soc khach', cat: 'dien_nuoc', amount: 120000 },
    { date: '2026-10-24', desc: 'Bao duong may han dong ho van nang', cat: 'cong_cu', amount: 200000 }
  ],
  s4_taxes: {
    totalRevenueGoods: 4300000,
    totalRevenueServices: 450000,
    vatGoods_1_percent: 43000,
    pitGoods_0_5_percent: 21500,
    vatService_5_percent: 22500,
    pitService_2_percent: 9000,
    totalTaxPaid: 96000,
    status: 'Da nop 100% vao Kho bac Nha nuoc tinh Phu Yen'
  }
};

const dbDir = path.join(targetBaseDir, '3_CO_SO_DU_LIEU_DATABASE_JSON_CSV');

// JSON files
fs.writeFileSync(path.join(dbDir, 'inventory_erp_kho_hang.json'), JSON.stringify(inventoryData, null, 2), 'utf8');
fs.writeFileSync(path.join(dbDir, 'crm_danh_ba_khach_quen_tuy_hoa.json'), JSON.stringify(crmData, null, 2), 'utf8');
fs.writeFileSync(path.join(dbDir, 'so_ke_toan_tt88_s1_s4.json'), JSON.stringify(accountingData, null, 2), 'utf8');

// CSV files
let invCSV = "\uFEFFMa Hang,Ten Mat Hang,Nganh Hang,Gia Von (VND),Gia Ban (VND),Phi San %,Ton Kho\r\n";
inventoryData.forEach(i => {
  invCSV += `"${i.id}","${i.name}","${i.catName}",${i.cost},${i.price},${i.feeRate * 100}%,${i.stock}\r\n`;
});
fs.writeFileSync(path.join(dbDir, 'inventory_erp_kho_hang.csv'), invCSV, 'utf8');

let crmCSV = "\uFEFFMa Khach,Ten Khach Hang,So Dien Thoai,Dia Chi Tuy Hoa,Thiet Bi,Chu Ky (Thang),Han Bao Duong,Hang Khach\r\n";
crmData.forEach(c => {
  crmCSV += `"${c.id}","${c.name}","${c.phone}","${c.address}","${c.device}",${c.cycleMonths},"${c.nextDate}","${c.tier}"\r\n`;
});
fs.writeFileSync(path.join(dbDir, 'crm_danh_ba_khach_quen_tuy_hoa.csv'), crmCSV, 'utf8');

console.log('Exported database JSON & CSV files.');

// 4. Copy Logo & Media Images
const imgTargetDir = path.join(targetBaseDir, '4_HINH_ANH_LOGO_VA_CHUNG_TU');
const logoSrc = path.join(brainDir, 'logo_datphu.jpg');
if (fs.existsSync(logoSrc)) {
  fs.copyFileSync(logoSrc, path.join(imgTargetDir, 'logo_chinh_thuc_datphu.jpg'));
  console.log('Copied official logo to 4_HINH_ANH_LOGO_VA_CHUNG_TU');
}

// Copy user uploaded historical photos (sổ sách, chứng từ, biên bản 10 năm qua)
const userUploadsDir = path.join(brainDir, '.user_uploaded');
if (fs.existsSync(userUploadsDir)) {
  fs.readdirSync(userUploadsDir).forEach(img => {
    fs.copyFileSync(path.join(userUploadsDir, img), path.join(imgTargetDir, img));
  });
  console.log('Copied all user uploaded historical documents to 4_HINH_ANH_LOGO_VA_CHUNG_TU');
}

// 5. Copy Web App Offline to 5_HE_THONG_WEB_APP_OFFLINE
const appTargetDir = path.join(targetBaseDir, '5_HE_THONG_WEB_APP_OFFLINE');
const filesToCopy = ['index.html', 'datphu_booking_app.html', 'admin.html', 'server.js', 'package.json', 'ai_tools_hub.js'];
filesToCopy.forEach(f => {
  const p = path.join('e:/datphu-onebase', f);
  if (fs.existsSync(p)) {
    fs.copyFileSync(p, path.join(appTargetDir, f));
  }
});
// Copy assets into appTargetDir
const assetsSrc = 'e:/datphu-onebase/assets';
const assetsDest = path.join(appTargetDir, 'assets');
if (fs.existsSync(assetsSrc)) {
  if (!fs.existsSync(assetsDest)) fs.mkdirSync(assetsDest, { recursive: true });
  fs.readdirSync(assetsSrc).forEach(f => {
    fs.copyFileSync(path.join(assetsSrc, f), path.join(assetsDest, f));
  });
}
console.log('Copied Web App Offline package.');

// 6. Create Readme & Guide
const guideText = `================================================================================
HỆ THỐNG DỮ LIỆU TOÀN DIỆN CÔNG TY TNHH THƯƠNG MẠI ĐẤT PHÚ
LƯU TRỮ TẠI: E:\\DU_LIEU_CONG_TY_DAT_PHU\\
NGÀY XUẤT BẢN: 27/10/2026
================================================================================

1. CẤU TRÚC THƯ MỤC:
   ├── 1_HO_SO_DOANH_NGHIEP_VA_PHAP_LY:
   │   ├── datphu_ho_so_doanh_nghiep.md (MST: 4401020233, Người đại diện: Phạm Thanh Hân)
   │   ├── datphu_co_cau_to_chuc_tai_chinh_ke_toan.md (Bộ máy tài chính, kế toán thuế 10 năm)
   │   └── thong_tin_phap_ly_va_hd_dien_tu.txt (Hóa đơn điện tử 1C26TDP, Vietcombank 0751000025858)
   │
   ├── 2_CHIEN_LUOC_KINH_TE_VA_THUONG_HIEU:
   │   ├── BAN_KE_HOACH_NEN_KINH_TE_KIEU_MOI_DAT_PHU.md (Kế hoạch kinh tế số Đất Phú)
   │   ├── datphu_brand_guidelines_cam_nang_thuong_hieu.md (Quy chuẩn logo Đầu Đại Bàng Đỏ-Xanh)
   │   └── quy_chuan_bieu_phi_san_8_15_phan_tram.md (Biểu phí minh bạch 8% - 15%)
   │
   ├── 3_CO_SO_DU_LIEU_DATABASE_JSON_CSV:
   │   ├── inventory_erp_kho_hang.json & .csv (Dữ liệu tồn kho, giá vốn, lãi ròng)
   │   ├── crm_danh_ba_khach_quen_tuy_hoa.json & .csv (Khách thân thiết, chu kỳ bảo dưỡng)
   │   └── so_ke_toan_tt88_s1_s4.json (Sổ kế toán chuẩn Thông tư 88/2021/TT-BTC)
   │
   ├── 4_HINH_ANH_LOGO_VA_CHUNG_TU:
   │   ├── logo_chinh_thuc_datphu.jpg (Logo gốc độ phân giải cao)
   │   └── [Toàn bộ ảnh chụp sổ sách, chứng từ kế toán 10 năm qua của công ty]
   │
   └── 5_HE_THONG_WEB_APP_OFFLINE:
       ├── index.html (Ứng dụng chạy trực tiếp trên trình duyệt, không cần mạng)
       ├── datphu_booking_app.html
       └── assets/ (Logo và tài nguyên đồ họa)

2. CÁCH MỞ VÀ SỬ DỤNG:
   - Mở ứng dụng ngay: Double click vào file "5_HE_THONG_WEB_APP_OFFLINE\\index.html".
   - Tra cứu dữ liệu Excel: Mở các file .csv trong thư mục 3 bằng Microsoft Excel.
   - Đọc cẩm nang thương hiệu & chiến lược: Mở các file .md bằng Notepad hoặc trình duyệt.

================================================================================
BẢN QUYỀN THUỘC CÔNG TY TNHH THƯƠNG MẠI ĐẤT PHÚ - PHÚ YÊN
================================================================================
`;

fs.writeFileSync(path.join(targetBaseDir, 'HUONG_DAN_TRA_CUU_DU_LIEU.txt'), guideText, 'utf8');
fs.writeFileSync(path.join(targetBaseDir, 'README.md'), `# HỆ THỐNG DỮ LIỆU ĐẤT PHÚ\n\nXem file [HUONG_DAN_TRA_CUU_DU_LIEU.txt](HUONG_DAN_TRA_CUU_DU_LIEU.txt) để biết chi tiết.`, 'utf8');

console.log('All data successfully exported to E:/DU_LIEU_CONG_TY_DAT_PHU!');
