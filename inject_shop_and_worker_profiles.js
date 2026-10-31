const fs = require('fs');
const p = 'e:\\datphu-onebase\\index.html';
let html = fs.readFileSync(p, 'utf8');

// 1. Dữ liệu cửa hàng & thợ chuyên sâu
const sellerShops = {
  'shop-chiba': {
    id: 'shop-chiba',
    name: 'Hộ Đặc Sản Xứ Nẫu Chị Ba',
    owner: 'Chị Ba Tuy Hòa',
    phone: '0905.889.911',
    address: 'Số 45 Trần Hưng Đạo, P. 4, TP. Tuy Hòa',
    rating: 4.98,
    reviewsCount: 142,
    badge: 'Hộ Nghề Truyền Thống OCOP',
    avatar: '🥩',
    bgGradient: 'from-orange-950 via-slate-900 to-amber-950',
    description: 'Chuyên cung cấp Bò một nắng hai sương Krông Pa, muối kiến vàng, nước mắm Gành Đỏ chính gốc đóng chai thuỷ tinh.'
  },
  'shop-sach-tuyhoa': {
    id: 'shop-sach-tuyhoa',
    name: 'Tiệm Sách Cũ & Tư Liệu Tuy Hòa',
    owner: 'Thầy Hưng Khảo Cứu',
    phone: '0935.123.789',
    address: 'Số 88 Lê Thánh Tôn, P. 1, TP. Tuy Hòa',
    rating: 4.96,
    reviewsCount: 89,
    badge: 'Kho Tư Liệu Bản Địa',
    avatar: '📚',
    bgGradient: 'from-amber-950 via-slate-900 to-yellow-950',
    description: 'Bảo tồn và ký gửi các tác phẩm địa chí, văn học Phú Yên, tạp chí khảo cứu xưa trước năm 1975 và sách học nghề thực chiến.'
  },
  'shop-dienmay-phulam': {
    id: 'shop-dienmay-phulam',
    name: 'Kho Điện Máy Thanh Lý 6K Phú Lâm',
    owner: 'Anh Hoàng Kỹ Thuật',
    phone: '0914.333.555',
    address: '21/146 Ngô Gia Tự, P. Phú Yên, TP. Tuy Hòa',
    rating: 4.95,
    reviewsCount: 215,
    badge: 'Trạm Kiểm Định Kỹ Thuật 6K',
    avatar: '🌀',
    bgGradient: 'from-sky-950 via-slate-900 to-blue-950',
    description: 'Thu mua và ký gửi quạt Nhật bãi, máy sấy tóc salon, máy bơm nước và camera an ninh đã qua kiểm định bo mạch đạt chuẩn 6K.'
  }
};

const workersPortfolio = {
  'DP-W01': {
    id: 'DP-W01',
    name: 'Chú Tùng',
    title: 'Chuyên Gia Điện Nước Khẩn Cấp (15 Năm Kinh Nghiệm)',
    phone: '0905.112.233',
    rating: 4.95,
    cases: 420,
    eta: '8–12 phút',
    station: 'Trực trạm Phường 7 (Bán kính 0.8km)',
    avatar: '⚡',
    badge: 'Trưởng Nhóm Cứu Hộ Tiệm',
    certs: [
      'Bằng Thợ Điện Công Nghiệp & Dân Dụng Bậc 5/7',
      'Chứng nhận an toàn điện lực và PCCC Tuy Hòa',
      'Cam kết ứng cứu tiệm tóc, tiệm cà phê trong 15 phút'
    ],
    tools: ['Máy hàn nhiệt ống PPR', 'Aptomat chống rò 32A', 'Van bi đồng phi 21-27', 'Bút thử điện điện tử', 'Dây cáp Cadivi']
  },
  'DP-W02': {
    id: 'DP-W02',
    name: 'Trần Quốc Hưng',
    title: 'Kỹ Sư Điện Lạnh, Điều Hòa & Tủ Đông',
    phone: '0914.223.344',
    rating: 4.98,
    cases: 356,
    eta: '10–15 phút',
    station: 'Trực trạm Phường 5 (Bán kính 1.2km)',
    avatar: '❄️',
    badge: 'Kỹ Sư Điều Hòa Inverter',
    certs: [
      'Kỹ sư Kỹ thuật Nhiệt - Điện Lạnh Đại học Bách Khoa',
      'Chứng chỉ bảo hành ủy quyền Daikin, Panasonic, Casper',
      'Đạt chuẩn kiểm định 6K Đất Phú cấp năm 2026'
    ],
    tools: ['Bình gas lạnh R32 & R410A chính hãng', 'Bơm hút chân không 2 tầng', 'Đồng hồ đo áp suất đôi', 'Que hàn bạc cao cấp']
  },
  'DP-W03': {
    id: 'DP-W03',
    name: 'Lê Văn Long',
    title: 'Chuyên Viên Mở Khóa & Sửa Cửa Cuốn',
    phone: '0935.334.455',
    rating: 4.90,
    cases: 285,
    eta: '5–10 phút',
    station: 'Trực trạm Phường 2 (Bán kính 1.5km)',
    avatar: '🔑',
    badge: 'Bàn Tay Vàng Mở Khóa',
    certs: [
      'Chứng chỉ Cơ điện tử khóa bảo mật & Cửa cuốn thông minh',
      'Cam kết không cạy phá hư hỏng tài sản của gia chủ',
      'Bảo hành ổ khóa và motor cửa cuốn 6 tháng'
    ],
    tools: ['Bộ mở khóa chuyên dụng cao cấp', 'Bộ sao chép remote cửa cuốn mã nhảy', 'Hộp điều khiển motor 220V', 'Dầu bôi trơn chuyên dụng']
  },
  'DP-W04': {
    id: 'DP-W04',
    name: 'Hoàng Tuấn',
    title: 'Kỹ Thuật Viên Đèn Năng Lượng Mặt Trời & Camera 6K',
    phone: '0942.445.566',
    rating: 4.92,
    cases: 198,
    eta: '15 phút',
    station: 'Trực trạm Bình Kiến (Bán kính 2.0km)',
    avatar: '☀️',
    badge: 'Chuyên Gia Điện Mặt Trời & Camera',
    certs: [
      'Chứng chỉ Lắp đặt hệ thống Solar & Camera IP thông minh',
      'Kỹ thuật viên đối tác Ezviz, Imou, Dahua tại Phú Yên'
    ],
    tools: ['Pin Lithium năng lượng mặt trời 300W', 'Bộ camera wifi Ezviz/Imou', 'Đồng hồ vạn năng Fluke', 'Thang nhôm rút chữ A']
  },
  'DP-T01': {
    id: 'DP-T01',
    name: 'Bác Tài Tấn Dũng',
    title: 'Đội Trưởng Đội Xe 6K (Taxi 4-7 Chỗ & Xe Máy Du Lịch)',
    phone: '0905.778.899',
    rating: 5.0,
    cases: 620,
    eta: '10 phút',
    station: 'Đại lộ Hùng Vương, Tuy Hòa (Bán kính 1.0km)',
    avatar: '🚕',
    badge: 'Tài Xế Du Lịch Bản Địa 5 Sao',
    certs: [
      'Giấy phép lái xe Hạng D (20 năm an toàn giao thông)',
      'Thẻ hướng dẫn viên du lịch bản địa Phú Yên',
      'Bảo hiểm trách nhiệm dân sự hành khách tối đa'
    ],
    tools: ['Xe 7 chỗ Xpander đời mới sạch sẽ', 'Xe máy AirBlade/Vision cho thuê tự lái 120k', 'Wifi 4G miễn phí trên xe', 'Nước suối lạnh phục vụ']
  }
};

// 2. Chèn 2 Modal vào HTML trước thẻ đóng </div> cuối
const modalsHtml = `
    <!-- ================= MODAL TRANG GIAN HÀNG NGƯỜI BÁN KÝ GỬI ================= -->
    <div id="sellerShopModal" class="hidden fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div class="glass-panel bg-slate-900 border border-slate-700/80 rounded-3xl p-5 w-full max-w-xl space-y-4 shadow-2xl relative max-h-[92vh] flex flex-col custom-scroll overflow-hidden">
        <!-- Header Shop -->
        <div id="shopModalHeaderBg" class="relative rounded-2xl overflow-hidden bg-gradient-to-r from-amber-950 via-slate-900 to-emerald-950 p-4 border border-slate-800">
          <button onclick="closeSellerShopModal()" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-950/70 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition">
            <i class="fa-solid fa-xmark text-sm"></i>
          </button>
          
          <div class="flex items-center gap-3.5">
            <div id="shopModalAvatar" class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-500 to-amber-600 text-slate-950 font-black text-2xl flex items-center justify-center shadow-lg shadow-amber-500/30 icon-badge-3d border border-amber-300">
              🏪
            </div>
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <h3 id="shopModalName" class="font-black text-base text-white">Gian Hàng Đặc Sản Chị Ba Tuy Hòa</h3>
                <span class="text-[9px] bg-emerald-950 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-800">✔ Đã Xác Minh 6K</span>
              </div>
              <p id="shopModalAddress" class="text-xs text-slate-300 mt-0.5">📍 Phường 7, TP. Tuy Hòa, Tỉnh Phú Yên</p>
              <div class="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                <span class="text-amber-400 font-bold flex items-center gap-1">
                  <i class="fa-solid fa-star text-xs"></i> <span id="shopModalRating">4.96</span> (<span id="shopModalReviews">128</span> đánh giá)
                </span>
                <span>•</span>
                <span id="shopModalTotalItems" class="text-slate-300">8 món ký gửi</span>
                <span>•</span>
                <span class="text-emerald-400 font-medium">Phản hồi 100%</span>
              </div>
            </div>
          </div>
        </div>

        <p id="shopModalDesc" class="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-2xl border border-slate-800 leading-relaxed">
          Chuyên cung cấp các sản phẩm chuẩn bản địa Tuy Hòa đã qua quy trình thẩm định 6K nghiêm ngặt.
        </p>

        <!-- Action Call/Zalo -->
        <div class="grid grid-cols-2 gap-2 text-xs">
          <a id="shopModalCallBtn" href="tel:0935123456" class="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center gap-2 transition border border-slate-700">
            <i class="fa-solid fa-phone text-emerald-400"></i>
            <span>Gọi Chủ Tiệm</span>
          </a>
          <button onclick="alert('Đã gửi yêu cầu kết nối Zalo OA tới Chủ gian hàng!')" class="py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold flex items-center justify-center gap-2 transition shadow">
            <i class="fa-solid fa-comment-dots"></i>
            <span>Nhắn Tin Zalo</span>
          </button>
        </div>

        <!-- Danh sách sản phẩm của gian hàng -->
        <div class="space-y-2 flex-1 overflow-y-auto custom-scroll pr-1">
          <div class="flex justify-between items-center text-xs pb-1 border-b border-slate-800">
            <span class="font-bold text-white flex items-center gap-1.5">
              <i class="fa-solid fa-boxes-stacked text-amber-400"></i>
              <span>Sản Phẩm Đang Ký Gửi Trên Sàn</span>
            </span>
            <span class="text-[10px] text-emerald-400 font-mono">Bảo hành 30 ngày</span>
          </div>

          <div id="shopModalProductList" class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <!-- Dynamically populated via JS -->
          </div>
        </div>
      </div>
    </div>

    <!-- ================= MODAL HỒ SƠ NĂNG LỰC THỢ KỸ THUẬT 6K ================= -->
    <div id="workerPortfolioModal" class="hidden fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div class="glass-panel bg-slate-900 border border-slate-700/80 rounded-3xl p-5 w-full max-w-lg space-y-4 shadow-2xl relative max-h-[92vh] flex flex-col custom-scroll overflow-hidden">
        
        <!-- Header Thợ -->
        <div class="relative rounded-2xl overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/80 p-4 border border-slate-800">
          <button onclick="closeWorkerPortfolioModal()" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-950/70 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition">
            <i class="fa-solid fa-xmark text-sm"></i>
          </button>

          <div class="flex items-center gap-3.5">
            <div id="workerModalAvatar" class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 font-black text-2xl flex items-center justify-center shadow-lg shadow-amber-500/30 icon-badge-3d border border-amber-300">
              ⚡
            </div>
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <h3 id="workerModalName" class="font-black text-base text-white">Trần Quốc Hưng</h3>
                <span class="text-[9px] bg-amber-500 text-slate-950 font-black px-2 py-0.5 rounded-full uppercase">Thợ Nòng Cốt 6K</span>
              </div>
              <p id="workerModalSkill" class="text-xs text-amber-400 font-semibold mt-0.5">Kỹ Sư Điện Lạnh & Tủ Đông Dân Dụng</p>
              <p id="workerModalStation" class="text-[11px] text-slate-400">📍 Bán kính trực: Phường 5, Tuy Hòa (Bán kính 5.0 km)</p>
            </div>
          </div>
        </div>

        <!-- 3 Chỉ Số Tín Nhiệm & KPI -->
        <div class="grid grid-cols-3 gap-2 text-center text-xs">
          <div class="bg-slate-950/80 p-2.5 rounded-2xl border border-slate-800">
            <div class="text-[10px] text-slate-400">Đánh giá khách hàng</div>
            <div id="workerModalRating" class="font-black text-amber-400 text-sm mt-0.5">⭐ 4.98</div>
          </div>
          <div class="bg-slate-950/80 p-2.5 rounded-2xl border border-slate-800">
            <div class="text-[10px] text-slate-400">Số ca hoàn thành</div>
            <div id="workerModalCases" class="font-black text-emerald-400 text-sm mt-0.5">348 ca</div>
          </div>
          <div class="bg-slate-950/80 p-2.5 rounded-2xl border border-slate-800">
            <div class="text-[10px] text-slate-400">Tốc độ có mặt</div>
            <div id="workerModalETA" class="font-black text-sky-400 text-sm mt-0.5">12-15 phút</div>
          </div>
        </div>

        <!-- Hồ Sơ Chứng Chỉ & An Toàn -->
        <div class="bg-slate-950/60 p-3 rounded-2xl border border-slate-800 space-y-1.5 text-xs">
          <div class="font-bold text-white flex items-center gap-1.5 text-[11px]">
            <i class="fa-solid fa-certificate text-amber-400"></i>
            <span>Chứng Chỉ Nghề & Đăng Ký Pháp Lý:</span>
          </div>
          <div id="workerModalCertsList" class="text-[11px] text-slate-300 space-y-1">
            <p>• Bằng nghề Kỹ thuật Điện - Lạnh Dân Dụng (Bậc 4/7).</p>
            <p>• Đã ký cam kết bảo mật & Quy chuẩn đạo đức nghề nghiệp Kín Kẽ 6K.</p>
            <p>• Bảo hiểm trách nhiệm dân sự nghề nghiệp có giá trị.</p>
          </div>
        </div>

        <!-- Trang Bị Cốp Xe Thợ Sẵn Sàng -->
        <div class="space-y-1.5 text-xs">
          <div class="font-bold text-white flex items-center gap-1.5 text-[11px]">
            <i class="fa-solid fa-toolbox text-sky-400"></i>
            <span>Vật Tư Sẵn Có Trong Cốp Xe (Bảo Hành 30 Ngày):</span>
          </div>
          <div id="workerModalToolsList" class="flex flex-wrap gap-1.5 text-[10px]">
            <!-- Dynamically populated -->
          </div>
        </div>

        <!-- Nút Kích Hoạt Điều Thợ -->
        <div class="pt-2 border-t border-slate-800 flex gap-2">
          <a id="workerModalCallLink" href="tel:0914223344" class="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition border border-slate-700">
            <i class="fa-solid fa-phone text-emerald-400"></i> Gọi
          </a>
          <button id="workerModalBookBtn" class="flex-1 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 text-slate-950 font-black text-xs transition shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 shimmer-btn">
            <i class="fa-solid fa-truck-fast"></i>
            <span id="workerModalBookText">BẮN PHIẾU GỌI THỢ NÀY NGAY (15 PHÚT)</span>
          </button>
        </div>
      </div>
    </div>
`;

if (!html.includes('id="sellerShopModal"')) {
  const insertBeforeScript = '  <script>';
  html = html.replace(insertBeforeScript, modalsHtml + '\n' + insertBeforeScript);
  console.log('1. Đã chèn 2 Modal: Gian Hàng Người Bán & Hồ Sơ Năng Lực Thợ!');
}

// 3. Chèn Logic JavaScript tương tác vào cuối thẻ script
const jsLogic = `
    // ================= DỮ LIỆU GIAN HÀNG & THỢ KỸ THUẬT 6K =================
    const SELLER_SHOPS = ${JSON.stringify(sellerShops, null, 2)};
    const WORKERS_PORTFOLIO = ${JSON.stringify(workersPortfolio, null, 2)};

    function openSellerShopModal(shopId) {
      const shop = SELLER_SHOPS[shopId] || SELLER_SHOPS['shop-chiba'];
      if (!shop) return;

      document.getElementById('shopModalName').textContent = shop.name;
      document.getElementById('shopModalAvatar').textContent = shop.avatar;
      document.getElementById('shopModalAddress').textContent = '📍 ' + shop.address;
      document.getElementById('shopModalRating').textContent = shop.rating;
      document.getElementById('shopModalReviews').textContent = shop.reviewsCount;
      document.getElementById('shopModalDesc').textContent = shop.description;
      document.getElementById('shopModalCallBtn').href = 'tel:' + shop.phone.replace(/[^0-9]/g, '');

      // Tìm các sản phẩm của shop này
      const shopProducts = PRODUCTS.filter(p => (p.sellerId === shopId) || (shopId === 'shop-chiba' && p.category === 'dac_san') || (shopId === 'shop-sach-tuyhoa' && p.category === 'sach_cu') || (shopId === 'shop-dienmay-phulam' && p.category === 'do_cu'));
      
      const listEl = document.getElementById('shopModalProductList');
      document.getElementById('shopModalTotalItems').textContent = \`\${shopProducts.length} món ký gửi\`;

      listEl.innerHTML = shopProducts.map(p => \`
        <div class="p-2.5 rounded-2xl bg-slate-950 border border-slate-800 flex justify-between items-center hover:border-slate-700 transition">
          <div class="flex items-center gap-2">
            <span class="text-xl">\${p.icon}</span>
            <div>
              <div class="font-bold text-white text-[11px] truncate max-w-[130px]">\${p.title}</div>
              <div class="text-[10px] text-amber-400 font-black">\${p.price.toLocaleString('vi-VN')} đ</div>
            </div>
          </div>
          <button onclick="addToCart('\${p.id}'); closeSellerShopModal();" class="px-2.5 py-1 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-[10px] transition">
            + Mua
          </button>
        </div>
      \`).join('');

      document.getElementById('sellerShopModal').classList.remove('hidden');
    }

    function closeSellerShopModal() {
      document.getElementById('sellerShopModal').classList.add('hidden');
    }

    function openWorkerPortfolioModal(workerId) {
      const w = WORKERS_PORTFOLIO[workerId] || WORKERS_PORTFOLIO['DP-W01'];
      if (!w) return;

      document.getElementById('workerModalName').textContent = w.name;
      document.getElementById('workerModalAvatar').textContent = w.avatar;
      document.getElementById('workerModalSkill').textContent = w.title;
      document.getElementById('workerModalStation').textContent = '📍 ' + w.station;
      document.getElementById('workerModalRating').textContent = '⭐ ' + w.rating;
      document.getElementById('workerModalCases').textContent = w.cases + ' ca';
      document.getElementById('workerModalETA').textContent = w.eta;
      document.getElementById('workerModalCallLink').href = 'tel:' + w.phone.replace(/[^0-9]/g, '');

      // Render certs
      const certsContainer = document.getElementById('workerModalCertsList');
      certsContainer.innerHTML = w.certs.map(c => \`<p>• \${c}</p>\`).join('');

      // Render tools
      const toolsContainer = document.getElementById('workerModalToolsList');
      toolsContainer.innerHTML = w.tools.map(t => \`<span class="px-2.5 py-1 rounded-lg bg-slate-800/90 text-slate-200 border border-slate-700 font-medium">\${t}</span>\`).join('');

      // Action Book Button
      const bookBtn = document.getElementById('workerModalBookBtn');
      bookBtn.onclick = function() {
        closeWorkerPortfolioModal();
        switchTab('dispatch');
        selectWorkerForDispatch(w.name + ' - ' + w.title, 'Yêu cầu điều phối trực tiếp');
      };

      document.getElementById('workerPortfolioModal').classList.remove('hidden');
    }

    function closeWorkerPortfolioModal() {
      document.getElementById('workerPortfolioModal').classList.add('hidden');
    }
`;

if (!html.includes('function openSellerShopModal')) {
  const insertBeforeScriptEnd = '  </script>';
  html = html.replace(insertBeforeScriptEnd, jsLogic + '\n' + insertBeforeScriptEnd);
  console.log('2. Đã thêm các hàm mở Trang Gian Hàng & Hồ Sơ Thợ vào JavaScript!');
}

// 4. Cập nhật thẻ thợ trong sectionDispatch để khi click vào card hoặc avatar thì mở Hồ Sơ Thợ
html = html.replace(`selectWorkerForDispatch('Chú Tùng - Điện Nước'`, `openWorkerPortfolioModal('DP-W01'); // selectWorkerForDispatch('Chú Tùng - Điện Nước'`);
html = html.replace(`selectWorkerForDispatch('Trần Quốc Hưng - Điện Lạnh'`, `openWorkerPortfolioModal('DP-W02'); // selectWorkerForDispatch('Trần Quốc Hưng'`);
html = html.replace(`selectWorkerForDispatch('Lê Văn Long - Thợ Khóa'`, `openWorkerPortfolioModal('DP-W03'); // selectWorkerForDispatch('Lê Văn Long'`);
html = html.replace(`selectWorkerForDispatch('Hoàng Tuấn - Năng Lượng & Camera'`, `openWorkerPortfolioModal('DP-W04'); // selectWorkerForDispatch('Hoàng Tuấn'`);
html = html.replace(`selectWorkerForDispatch('Bác Tài Tấn Dũng - Taxi'`, `openWorkerPortfolioModal('DP-T01'); // selectWorkerForDispatch('Bác Tài Tấn Dũng'`);

// 5. Cập nhật renderProducts() để mỗi sản phẩm hiển thị Nút xem gian hàng người bán
const oldSellerInProduct = `<h3 class="font-bold text-xs text-white leading-snug line-clamp-2 h-8" title="\${p.title}">\${p.title}</h3>`;
const newSellerInProduct = `<h3 class="font-bold text-xs text-white leading-snug line-clamp-2 h-8" title="\${p.title}">\${p.title}</h3>
                <div class="flex items-center justify-between text-[10px] pt-1 border-t border-slate-900/80">
                  <button type="button" onclick="event.stopPropagation(); openSellerShopModal(p.category === 'dac_san' ? 'shop-chiba' : p.category === 'sach_cu' ? 'shop-sach-tuyhoa' : 'shop-dienmay-phulam')" class="text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1 hover:underline truncate max-w-[140px]">
                    <i class="fa-solid fa-store text-[9px] text-amber-400"></i>
                    <span>\${p.category === 'dac_san' ? 'Hộ ĐS Chị Ba' : p.category === 'sach_cu' ? 'Tiệm Sách Cũ Tuy Hòa' : 'Kho Máy 6K Phú Lâm'}</span>
                  </button>
                  <span class="text-[9px] text-emerald-400 font-bold">✔ 6K</span>
                </div>`;

if (html.includes(oldSellerInProduct)) {
  html = html.replace(oldSellerInProduct, newSellerInProduct);
  console.log('3. Đã gắn nút [Xem Gian Hàng Người Bán] vào từng thẻ sản phẩm Chợ Phiên!');
}

fs.writeFileSync(p, html, 'utf8');
console.log('HOÀN THÀNH TÍCH HỢP TRANG GIAN HÀNG & HỒ SƠ THỢ RIÊNG BIỆT!');
