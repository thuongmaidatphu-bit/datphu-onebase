const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Nâng cấp CSS trong thẻ <style>
const oldStyle = `  <style>
    .custom-scroll::-webkit-scrollbar { width: 4px; height: 4px; }
    .custom-scroll::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
    .pulse-radar { animation: radar-pulse 2s infinite ease-out; }
    @keyframes radar-pulse {
      0% { transform: scale(0.95); opacity: 0.9; }
      50% { transform: scale(1.2); opacity: 0.3; }
      100% { transform: scale(1.4); opacity: 0; }
    }
  </style>`;

const newStyle = `  <style>
    .custom-scroll::-webkit-scrollbar { width: 4px; height: 4px; }
    .custom-scroll::-webkit-scrollbar-thumb { background: #475569; border-radius: 6px; }
    .custom-scroll::-webkit-scrollbar-thumb:hover { background: #0284c7; }
    
    /* Radar & Glow Animations */
    .pulse-radar { animation: radar-pulse 2s infinite ease-out; }
    @keyframes radar-pulse {
      0% { transform: scale(0.95); opacity: 0.9; }
      50% { transform: scale(1.25); opacity: 0.35; }
      100% { transform: scale(1.5); opacity: 0; }
    }

    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    .shimmer-btn {
      background-size: 200% auto;
      animation: shimmer 3s infinite linear;
    }

    /* Glassmorphism Classes */
    .glass-panel {
      background: rgba(15, 23, 42, 0.75);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
    }

    .glass-input {
      background: rgba(2, 6, 23, 0.65) !important;
      backdrop-filter: blur(8px);
      border: 1px solid rgba(51, 65, 85, 0.8) !important;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .glass-input:focus {
      background: rgba(15, 23, 42, 0.9) !important;
      border-color: #f59e0b !important;
      box-shadow: 0 0 15px -2px rgba(245, 158, 11, 0.4);
    }

    /* 3D Icon Badge */
    .icon-badge-3d {
      box-shadow: 0 4px 12px -1px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.35);
    }
  </style>`;

if (html.includes(oldStyle.replace(/\r\n/g, '\n'))) {
  html = html.replace(oldStyle.replace(/\r\n/g, '\n'), newStyle.replace(/\r\n/g, '\n'));
  console.log('1. Đã nâng cấp CSS Style với Glassmorphism & Shimmer effect.');
} else if (html.includes(oldStyle.replace(/\n/g, '\r\n'))) {
  html = html.replace(oldStyle.replace(/\n/g, '\r\n'), newStyle.replace(/\n/g, '\r\n'));
  console.log('1. Đã nâng cấp CSS Style với Glassmorphism & Shimmer effect (CRLF).');
}

// 2. Nâng cấp toàn diện SECTION 2: GỌI THỢ 6K & CỨU HỘ TIỆM (sectionDispatch)
const regexSectionDispatch = /<section id="sectionDispatch"[\s\S]*?<!-- ================= SECTION 3: YÊU THÍCH ================= -->/;

const newSectionDispatch = `<section id="sectionDispatch" class="hidden space-y-4">
        
        <!-- Banner Radar Cứu Hộ 6K Đẳng Cấp -->
        <div class="relative overflow-hidden rounded-3xl p-5 bg-gradient-to-r from-amber-950/70 via-slate-900/90 to-orange-950/60 border border-amber-500/40 shadow-2xl glass-panel">
          <!-- Ambient Glow Orb sau banner -->
          <div class="absolute -right-10 -top-10 w-44 h-44 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute -left-10 -bottom-10 w-44 h-44 bg-orange-600/15 rounded-full blur-3xl pointer-events-none"></div>

          <div class="relative z-10 flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-3.5">
              <div class="relative">
                <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 flex items-center justify-center text-slate-950 text-2xl font-black shadow-lg shadow-amber-500/30 icon-badge-3d">
                  <i class="fa-solid fa-shield-halved text-slate-950 drop-shadow-sm"></i>
                </div>
                <span class="absolute -top-1 -right-1 flex h-4 w-4">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-900"></span>
                </span>
              </div>
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <h2 class="font-black text-base text-white tracking-wide">ĐIỀU PHỐI THỢ 6K & CỨU HỘ TIỆM 24/7</h2>
                  <span class="text-[9px] font-black px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 uppercase tracking-wider">Khẩn cấp 15P</span>
                </div>
                <p class="text-xs text-slate-300 mt-0.5 flex items-center gap-2 flex-wrap">
                  <span>⚡ Cam kết có mặt 15–20 phút</span>
                  <span class="text-slate-600">•</span>
                  <span class="text-emerald-400 font-semibold">✔ Xuất HĐĐT có mã CQT (1C26TDP)</span>
                </p>
              </div>
            </div>

            <div class="flex items-center gap-2 bg-slate-950/80 border border-emerald-500/40 px-3.5 py-1.5 rounded-2xl shadow-inner">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span class="text-xs font-black text-emerald-400 tracking-wide">5 THỢ TRỰC SẴN</span>
            </div>
          </div>
        </div>

        <!-- Form Gọi Thợ & Đặt Xe Nhanh (Glassmorphism & Neon Design) -->
        <form onsubmit="handleQuickDispatch(event)" class="glass-panel p-5 rounded-3xl border border-slate-700/60 space-y-4 text-xs shadow-2xl relative">
          
          <!-- Hàng 4 Card Dịch Vụ 3D Đa Sắc -->
          <div class="space-y-1.5">
            <div class="flex justify-between items-center text-slate-300">
              <label class="font-bold text-xs flex items-center gap-1.5 text-white">
                <i class="fa-solid fa-shapes text-amber-400"></i>
                <span>Chọn phân hệ dịch vụ cần điều phối:</span>
              </label>
              <span class="text-[10px] text-sky-400">Tự động kết nối thợ gần nhất</span>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <!-- Dịch vụ 1: Cứu Hộ Tiệm 15p -->
              <button type="button" onclick="setDispatchServiceType('tho_6k')" id="srvBtn-tho_6k" class="p-3 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-amber-500 text-slate-950 font-black flex flex-col items-center justify-center gap-1.5 transition transform hover:scale-[1.02] shadow-lg shadow-amber-500/25 border border-amber-300">
                <div class="w-8 h-8 rounded-xl bg-slate-950/20 flex items-center justify-center text-base">
                  <i class="fa-solid fa-bolt-lightning text-slate-950"></i>
                </div>
                <div class="text-[11px] leading-tight">Cứu Hộ Tiệm 15p</div>
                <div class="text-[9px] font-normal opacity-90">Điện, nước, máy lạnh</div>
              </button>

              <!-- Dịch vụ 2: Taxi Du Lịch 4-7c -->
              <button type="button" onclick="setDispatchServiceType('taxi')" id="srvBtn-taxi" class="p-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 text-slate-200 hover:text-white font-bold flex flex-col items-center justify-center gap-1.5 transition transform hover:scale-[1.02]">
                <div class="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-base">
                  <i class="fa-solid fa-taxi"></i>
                </div>
                <div class="text-[11px] leading-tight">Gọi Xe Taxi 4-7c</div>
                <div class="text-[9px] text-slate-400 font-normal">Sân bay & nội thành</div>
              </button>

              <!-- Dịch vụ 3: Thuê Xe Máy Tour -->
              <button type="button" onclick="setDispatchServiceType('xemay')" id="srvBtn-xemay" class="p-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 text-slate-200 hover:text-white font-bold flex flex-col items-center justify-center gap-1.5 transition transform hover:scale-[1.02]">
                <div class="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-base">
                  <i class="fa-solid fa-motorcycle"></i>
                </div>
                <div class="text-[11px] leading-tight">Thuê Xe Máy Tour</div>
                <div class="text-[9px] text-slate-400 font-normal">Chỉ 120k/ngày tự lái</div>
              </button>

              <!-- Dịch vụ 4: Bao Xe Hợp Đồng -->
              <button type="button" onclick="setDispatchServiceType('tour')" id="srvBtn-tour" class="p-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 text-slate-200 hover:text-white font-bold flex flex-col items-center justify-center gap-1.5 transition transform hover:scale-[1.02]">
                <div class="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-base">
                  <i class="fa-solid fa-van-shuttle"></i>
                </div>
                <div class="text-[11px] leading-tight">Bao Xe Tour Đi Đảo</div>
                <div class="text-[9px] text-slate-400 font-normal">Bãi Xép, Mũi Điện</div>
              </button>
            </div>
          </div>

          <!-- Các Trường Nhập Liệu Có Icon Phía Trước -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label class="block text-slate-300 font-semibold mb-1" id="lblDispName">Tên Tiệm hoặc Họ Tên Khách</label>
              <div class="relative">
                <i class="fa-solid fa-store absolute left-3.5 top-3 text-amber-400 text-xs"></i>
                <input id="dispName" required type="text" value="Tiệm Tóc Hair Salon Tuy Hòa" class="w-full pl-9 pr-3 py-2.5 rounded-xl text-white glass-input text-xs font-medium" />
              </div>
            </div>

            <div>
              <label class="block text-slate-300 font-semibold mb-1">Số điện thoại liên hệ</label>
              <div class="relative">
                <i class="fa-solid fa-phone-volume absolute left-3.5 top-3 text-emerald-400 text-xs"></i>
                <input id="dispPhone" required type="tel" value="0935123456" class="w-full pl-9 pr-3 py-2.5 rounded-xl text-white glass-input text-xs font-mono" />
              </div>
            </div>
          </div>

          <div>
            <div class="flex justify-between items-center mb-1">
              <label class="text-slate-300 font-semibold" id="lblDispAddress">Địa chỉ sự cố tại Tuy Hòa / Phú Yên</label>
              <button type="button" onclick="getLocationGPS()" class="text-[10px] text-sky-400 hover:text-sky-300 flex items-center gap-1 font-semibold">
                <i class="fa-solid fa-crosshairs text-sky-400"></i> Lấy tọa độ GPS
              </button>
            </div>
            <div class="relative">
              <i class="fa-solid fa-map-location-dot absolute left-3.5 top-3 text-rose-400 text-xs"></i>
              <input id="dispAddress" required type="text" value="Số 88 Lê Thánh Tôn, TP. Tuy Hòa" class="w-full pl-9 pr-3 py-2.5 rounded-xl text-white glass-input text-xs" />
            </div>
          </div>

          <div>
            <label class="block text-slate-300 font-semibold mb-1" id="lblDispDesc">Mô tả sự cố hoặc yêu cầu xe</label>
            <div class="relative">
              <i class="fa-solid fa-wrench absolute left-3.5 top-3 text-amber-400 text-xs"></i>
              <textarea id="dispDesc" rows="2" class="w-full pl-9 pr-3 py-2.5 rounded-xl text-white glass-input text-xs">Bồn gội đầu bị tắc nước, máy sấy uốn bị chập nhảy cầu dao</textarea>
            </div>
          </div>

          <!-- Nút Bấm Kích Hoạt Lệnh Bắn Thợ Siêu Cấp -->
          <button type="submit" id="btnDispSubmit" class="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 text-slate-950 font-black text-xs transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] flex items-center justify-center gap-2 tracking-wide shimmer-btn">
            <i class="fa-solid fa-truck-fast text-sm"></i>
            <span id="btnDispSubmitText" class="text-sm font-black">BẮN PHIẾU ĐIỀU THỢ GẦN NHẤT NGAY (15 PHÚT)</span>
          </button>
        </form>

        <!-- Danh Sách 5 Thợ Lành Nghề Chuẩn 6K (Thiết Kế Thẻ 3D Sống Động) -->
        <div class="space-y-3 pt-2">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm font-bold">
                <i class="fa-solid fa-user-astronaut"></i>
              </div>
              <h3 class="font-black text-xs text-white uppercase tracking-wider">Đội Thợ 6K Đang Ứng Trực Bán Kính Tuy Hòa</h3>
            </div>
            <span class="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800/80 font-mono">PostGIS GPS Real-Time</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <!-- Thợ 1: Chú Tùng -->
            <div class="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/60 flex justify-between items-center transition shadow-lg group">
              <div class="flex items-center gap-3">
                <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 flex items-center justify-center font-black text-lg shadow-md shadow-amber-500/20">
                  <i class="fa-solid fa-bolt"></i>
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <span class="font-black text-xs text-white">Chú Tùng</span>
                    <span class="text-[9px] bg-emerald-950 text-emerald-400 px-1.5 py-0.2 rounded font-bold border border-emerald-800">4.95 ⭐</span>
                  </div>
                  <div class="text-[11px] text-slate-300">Điện nước khẩn cấp • Trực P.7 (0.8km)</div>
                  <div class="text-[10px] text-amber-400 font-semibold flex items-center gap-1 mt-0.5">
                    <i class="fa-solid fa-motorcycle text-[9px]"></i> Sẵn sàng xuất phát trong 5p
                  </div>
                </div>
              </div>
              <button onclick="selectWorkerForDispatch('Chú Tùng - Điện Nước', 'Sự cố chập điện nước')" class="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black rounded-xl text-[11px] hover:opacity-90 transition shadow">
                Chọn
              </button>
            </div>

            <!-- Thợ 2: Trần Quốc Hưng -->
            <div class="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-sky-500/60 flex justify-between items-center transition shadow-lg group">
              <div class="flex items-center gap-3">
                <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-400 to-blue-600 text-white flex items-center justify-center font-black text-lg shadow-md shadow-sky-500/20">
                  <i class="fa-solid fa-snowflake"></i>
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <span class="font-black text-xs text-white">Trần Quốc Hưng</span>
                    <span class="text-[9px] bg-emerald-950 text-emerald-400 px-1.5 py-0.2 rounded font-bold border border-emerald-800">4.98 ⭐</span>
                  </div>
                  <div class="text-[11px] text-slate-300">Điện lạnh & Tủ đông • Trực P.5 (1.2km)</div>
                  <div class="text-[10px] text-sky-400 font-semibold flex items-center gap-1 mt-0.5">
                    <i class="fa-solid fa-gauge-high text-[9px]"></i> Đã chuẩn bị sẵn gas & đồng hồ
                  </div>
                </div>
              </div>
              <button onclick="selectWorkerForDispatch('Trần Quốc Hưng - Điện Lạnh', 'Máy lạnh/tủ đông không mát')" class="px-3 py-1.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-black rounded-xl text-[11px] hover:opacity-90 transition shadow">
                Chọn
              </button>
            </div>

            <!-- Thợ 3: Lê Văn Long -->
            <div class="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-rose-500/60 flex justify-between items-center transition shadow-lg group">
              <div class="flex items-center gap-3">
                <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-500 to-red-600 text-white flex items-center justify-center font-black text-lg shadow-md shadow-rose-500/20">
                  <i class="fa-solid fa-key"></i>
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <span class="font-black text-xs text-white">Lê Văn Long</span>
                    <span class="text-[9px] bg-emerald-950 text-emerald-400 px-1.5 py-0.2 rounded font-bold border border-emerald-800">4.90 ⭐</span>
                  </div>
                  <div class="text-[11px] text-slate-300">Thợ khóa & Cửa cuốn • Trực P.2 (1.5km)</div>
                  <div class="text-[10px] text-rose-400 font-semibold flex items-center gap-1 mt-0.5">
                    <i class="fa-solid fa-clock text-[9px]"></i> Mở khóa khẩn cấp trong 10p
                  </div>
                </div>
              </div>
              <button onclick="selectWorkerForDispatch('Lê Văn Long - Thợ Khóa', 'Kẹt khóa tiệm/cửa cuốn')" class="px-3 py-1.5 bg-gradient-to-r from-rose-500 to-red-600 text-white font-black rounded-xl text-[11px] hover:opacity-90 transition shadow">
                Chọn
              </button>
            </div>

            <!-- Thợ 4: Hoàng Tuấn -->
            <div class="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-yellow-500/60 flex justify-between items-center transition shadow-lg group">
              <div class="flex items-center gap-3">
                <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-yellow-400 to-amber-600 text-slate-950 flex items-center justify-center font-black text-lg shadow-md shadow-yellow-500/20">
                  <i class="fa-solid fa-solar-panel"></i>
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <span class="font-black text-xs text-white">Hoàng Tuấn</span>
                    <span class="text-[9px] bg-emerald-950 text-emerald-400 px-1.5 py-0.2 rounded font-bold border border-emerald-800">4.92 ⭐</span>
                  </div>
                  <div class="text-[11px] text-slate-300">Đèn năng lượng & Camera • Bình Kiến (2.0km)</div>
                  <div class="text-[10px] text-yellow-400 font-semibold flex items-center gap-1 mt-0.5">
                    <i class="fa-solid fa-video text-[9px]"></i> Phụ tùng chính hãng có sẵn
                  </div>
                </div>
              </div>
              <button onclick="selectWorkerForDispatch('Hoàng Tuấn - Năng Lượng & Camera', 'Sửa camera/đèn năng lượng')" class="px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-amber-600 text-slate-950 font-black rounded-xl text-[11px] hover:opacity-90 transition shadow">
                Chọn
              </button>
            </div>

            <!-- Bác Tài: Tấn Dũng Taxi -->
            <div class="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/60 flex justify-between items-center transition shadow-lg group sm:col-span-2">
              <div class="flex items-center gap-3">
                <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 text-white flex items-center justify-center font-black text-lg shadow-md shadow-cyan-500/20">
                  <i class="fa-solid fa-car-side"></i>
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <span class="font-black text-xs text-white">Bác Tài Tấn Dũng (Đội Xe 6K)</span>
                    <span class="text-[9px] bg-emerald-950 text-emerald-400 px-1.5 py-0.2 rounded font-bold border border-emerald-800">5.0 ⭐</span>
                  </div>
                  <div class="text-[11px] text-slate-300">Taxi 4-7 chỗ & Xe máy du lịch • Trực Đại lộ Hùng Vương (1.0km)</div>
                  <div class="text-[10px] text-cyan-400 font-semibold flex items-center gap-1 mt-0.5">
                    <i class="fa-solid fa-gas-pump text-[9px]"></i> Xe đời mới, sạch sẽ, đón trong 10 phút
                  </div>
                </div>
              </div>
              <button onclick="selectWorkerForDispatch('Bác Tài Tấn Dũng - Taxi', 'Đón khách đi tour/sân bay')" class="px-3.5 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black rounded-xl text-[11px] hover:opacity-90 transition shadow">
                Chọn Xe
              </button>
            </div>
          </div>
        </div>

      </section>

      <!-- ================= SECTION 3: YÊU THÍCH ================= -->`;

if (html.match(regexSectionDispatch)) {
  html = html.replace(regexSectionDispatch, newSectionDispatch);
  console.log('2. Đã thay thế và nâng cấp toàn diện sectionDispatch!');
}

// 3. Thêm hàm getLocationGPS() vào JS nếu chưa có
const gpsFunc = `
    function getLocationGPS() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          pos => {
            const lat = pos.coords.latitude.toFixed(4);
            const lng = pos.coords.longitude.toFixed(4);
            const addrInput = document.getElementById('dispAddress');
            if (addrInput) {
              addrInput.value = \`Vị trí GPS: \${lat}, \${lng} (Gần TP. Tuy Hòa)\`;
              alert(\`Đã xác định tọa độ GPS thành công [\${lat}, \${lng}]! Thợ sẽ định vị chính xác vị trí của bạn.\`);
            }
          },
          err => {
            alert('Không thể lấy GPS tự động. Vui lòng gõ địa chỉ thủ công!');
          }
        );
      } else {
        alert('Thiết bị của bạn không hỗ trợ định vị GPS!');
      }
    }
`;

if (!html.includes('function getLocationGPS()')) {
  const insertMarker = 'function setDispatchServiceType(type) {';
  if (html.includes(insertMarker)) {
    html = html.replace(insertMarker, gpsFunc + '\n    ' + insertMarker);
    console.log('3. Đã thêm hàm getLocationGPS() vào JavaScript.');
  }
}

// 4. Cập nhật hàm setDispatchServiceType để áp dụng style nút bấm 3D rực rỡ
const oldSetDispatch = `function setDispatchServiceType(type) {
      currentDispatchType = type;
      ['srvBtn-tho_6k', 'srvBtn-taxi', 'srvBtn-xemay', 'srvBtn-tour'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.className = 'py-2 px-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center gap-1 text-[11px] transition';
      });

      const activeBtn = document.getElementById('srvBtn-' + type);
      if (activeBtn) {
        activeBtn.className = 'py-2 px-2 rounded-xl bg-amber-500 text-slate-950 font-bold flex items-center justify-center gap-1 text-[11px] transition';
      }`;

const newSetDispatch = `function setDispatchServiceType(type) {
      currentDispatchType = type;
      
      const defaultClass = 'p-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 text-slate-200 hover:text-white font-bold flex flex-col items-center justify-center gap-1.5 transition transform hover:scale-[1.02]';
      
      ['srvBtn-tho_6k', 'srvBtn-taxi', 'srvBtn-xemay', 'srvBtn-tour'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.className = defaultClass;
      });

      const activeBtn = document.getElementById('srvBtn-' + type);
      if (activeBtn) {
        if (type === 'tho_6k') {
          activeBtn.className = 'p-3 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-amber-500 text-slate-950 font-black flex flex-col items-center justify-center gap-1.5 transition transform hover:scale-[1.02] shadow-lg shadow-amber-500/25 border border-amber-300';
        } else if (type === 'taxi') {
          activeBtn.className = 'p-3 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600 text-white font-black flex flex-col items-center justify-center gap-1.5 transition transform hover:scale-[1.02] shadow-lg shadow-cyan-500/25 border border-cyan-300';
        } else if (type === 'xemay') {
          activeBtn.className = 'p-3 rounded-2xl bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500 text-white font-black flex flex-col items-center justify-center gap-1.5 transition transform hover:scale-[1.02] shadow-lg shadow-purple-500/25 border border-purple-300';
        } else if (type === 'tour') {
          activeBtn.className = 'p-3 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600 text-white font-black flex flex-col items-center justify-center gap-1.5 transition transform hover:scale-[1.02] shadow-lg shadow-emerald-500/25 border border-emerald-300';
        }
      }`;

if (html.includes(oldSetDispatch.replace(/\r\n/g, '\n'))) {
  html = html.replace(oldSetDispatch.replace(/\r\n/g, '\n'), newSetDispatch.replace(/\r\n/g, '\n'));
  console.log('4. Đã cập nhật setDispatchServiceType cho nút 3D đa sắc.');
} else if (html.includes(oldSetDispatch.replace(/\n/g, '\r\n'))) {
  html = html.replace(oldSetDispatch.replace(/\n/g, '\r\n'), newSetDispatch.replace(/\n/g, '\r\n'));
  console.log('4. Đã cập nhật setDispatchServiceType cho nút 3D đa sắc (CRLF).');
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('HOÀN THÀNH NÂNG CẤP GIAO DIỆN & ICON SIÊU ĐẸP!');
