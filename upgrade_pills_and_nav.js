const fs = require('fs');
const p = 'e:\\datphu-onebase\\index.html';
let h = fs.readFileSync(p, 'utf8');

// 1. Nâng cấp Category Pills
const targetPillsOld = `      <!-- Categories Pills -->
      <div class="flex gap-2 overflow-x-auto pb-1 text-xs custom-scroll">
        <button onclick="filterCategory('all')" id="cat-all" class="cat-pill px-3.5 py-1.5 rounded-2xl bg-sky-600 text-white font-bold shrink-0 flex items-center gap-1.5">
          <i class="fa-solid fa-layer-group"></i>
          <span>Tất cả</span>
          <span id="badgeCountAll" class="text-[10px] bg-white/20 px-1.5 py-0.2 rounded-full">10</span>
        </button>

        <button onclick="filterCategory('sach_cu')" id="cat-sach_cu" class="cat-pill px-3.5 py-1.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white shrink-0 flex items-center gap-1.5">
          <i class="fa-solid fa-book text-amber-400"></i>
          <span>Sách cũ & Tư liệu</span>
          <span id="badgeCountSach" class="text-[10px] bg-slate-800 px-1.5 py-0.2 rounded-full">3</span>
        </button>

        <button onclick="filterCategory('do_cu')" id="cat-do_cu" class="cat-pill px-3.5 py-1.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white shrink-0 flex items-center gap-1.5">
          <i class="fa-solid fa-wrench text-emerald-400"></i>
          <span>Đồ thanh lý 6K</span>
          <span id="badgeCountDocu" class="text-[10px] bg-slate-800 px-1.5 py-0.2 rounded-full">3</span>
        </button>

        <button onclick="filterCategory('dac_san')" id="cat-dac_san" class="cat-pill px-3.5 py-1.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white shrink-0 flex items-center gap-1.5">
          <i class="fa-solid fa-bowl-food text-orange-400"></i>
          <span>Đặc sản xứ Nẫu</span>
          <span id="badgeCountDacsan" class="text-[10px] bg-slate-800 px-1.5 py-0.2 rounded-full">4</span>
        </button>

        <button onclick="filterCategory('xe_du_lich')" id="cat-xe_du_lich" class="cat-pill px-3.5 py-1.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white shrink-0 flex items-center gap-1.5">
          <i class="fa-solid fa-taxi text-yellow-400"></i>
          <span>Taxi & Xe máy du lịch</span>
          <span id="badgeCountXe" class="text-[10px] bg-slate-800 px-1.5 py-0.2 rounded-full">3</span>
        </button>

        <button onclick="toggleOnly6K()" id="btnOnly6K" class="px-3.5 py-1.5 rounded-2xl bg-slate-950 border border-emerald-800 text-emerald-400 hover:bg-emerald-950/40 font-semibold shrink-0 flex items-center gap-1.5">
          <i class="fa-solid fa-shield-check"></i>
          <span>Chỉ hàng test 6K ⇅</span>
        </button>
      </div>`;

const newPillsHtml = `      <!-- Categories Pills 3D High-Tech -->
      <div class="flex gap-2.5 overflow-x-auto pb-1 text-xs custom-scroll pt-1">
        <button onclick="filterCategory('all')" id="cat-all" class="cat-pill px-4 py-2 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-black shrink-0 flex items-center gap-2 shadow-lg shadow-sky-500/25 border border-sky-400/40 transition transform hover:scale-[1.03]">
          <i class="fa-solid fa-layer-group text-sm"></i>
          <span>Tất cả</span>
          <span id="badgeCountAll" class="text-[10px] bg-black/25 px-2 py-0.5 rounded-full font-mono">10</span>
        </button>

        <button onclick="filterCategory('sach_cu')" id="cat-sach_cu" class="cat-pill px-4 py-2 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-slate-200 hover:text-white shrink-0 flex items-center gap-2 transition transform hover:scale-[1.03] hover:border-amber-500/50">
          <span class="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">
            <i class="fa-solid fa-book"></i>
          </span>
          <span class="font-bold">Sách Cũ & Tư Liệu</span>
          <span id="badgeCountSach" class="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full font-mono text-amber-400">3</span>
        </button>

        <button onclick="filterCategory('do_cu')" id="cat-do_cu" class="cat-pill px-4 py-2 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-slate-200 hover:text-white shrink-0 flex items-center gap-2 transition transform hover:scale-[1.03] hover:border-emerald-500/50">
          <span class="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">
            <i class="fa-solid fa-wrench"></i>
          </span>
          <span class="font-bold">Đồ Thanh Lý 6K</span>
          <span id="badgeCountDocu" class="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full font-mono text-emerald-400">3</span>
        </button>

        <button onclick="filterCategory('dac_san')" id="cat-dac_san" class="cat-pill px-4 py-2 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-slate-200 hover:text-white shrink-0 flex items-center gap-2 transition transform hover:scale-[1.03] hover:border-orange-500/50">
          <span class="w-6 h-6 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs">
            <i class="fa-solid fa-bowl-food"></i>
          </span>
          <span class="font-bold">Đặc Sản Xứ Nẫu</span>
          <span id="badgeCountDacsan" class="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full font-mono text-orange-400">4</span>
        </button>

        <button onclick="filterCategory('xe_du_lich')" id="cat-xe_du_lich" class="cat-pill px-4 py-2 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-slate-200 hover:text-white shrink-0 flex items-center gap-2 transition transform hover:scale-[1.03] hover:border-yellow-500/50">
          <span class="w-6 h-6 rounded-lg bg-yellow-500/20 text-yellow-400 flex items-center justify-center text-xs">
            <i class="fa-solid fa-taxi"></i>
          </span>
          <span class="font-bold">Taxi & Xe Máy Tour</span>
          <span id="badgeCountXe" class="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full font-mono text-yellow-400">3</span>
        </button>

        <button onclick="toggleOnly6K()" id="btnOnly6K" class="px-3.5 py-2 rounded-2xl bg-slate-900/90 border border-emerald-700/60 text-emerald-400 hover:bg-emerald-950/60 font-bold shrink-0 flex items-center gap-1.5 transition">
          <i class="fa-solid fa-shield-halved text-xs"></i>
          <span>Chỉ Hàng 6K ⇅</span>
        </button>
      </div>`;

if (h.includes(targetPillsOld.replace(/\r\n/g, '\n'))) {
  h = h.replace(targetPillsOld.replace(/\r\n/g, '\n'), newPillsHtml.replace(/\r\n/g, '\n'));
  console.log('1. Đã nâng cấp Category Pills sang giao diện 3D!');
} else if (h.includes(targetPillsOld.replace(/\n/g, '\r\n'))) {
  h = h.replace(targetPillsOld.replace(/\n/g, '\r\n'), newPillsHtml.replace(/\n/g, '\r\n'));
  console.log('1. Đã nâng cấp Category Pills sang giao diện 3D (CRLF)!');
}

// 2. Nâng cấp Bottom Navigation Bar
const targetNavOld = `    <!-- Bottom Navigation Bar (5 Tab Chuẩn) -->
    <nav class="bg-slate-950 border-t border-slate-800 px-4 sm:px-8 py-2.5 flex justify-between items-center text-[10px] text-slate-400 shrink-0">
      <button onclick="switchTab('explore')" id="nav-explore" class="nav-tab-btn flex flex-col items-center gap-1 text-sky-400 font-bold transition">
        <i class="fa-solid fa-compass text-base"></i>
        <span>Khám phá</span>
      </button>

      <button onclick="switchTab('dispatch')" id="nav-dispatch" class="nav-tab-btn flex flex-col items-center gap-1 hover:text-slate-200 transition">
        <i class="fa-solid fa-wrench text-base"></i>
        <span>Gọi thợ 6K</span>
      </button>

      <button onclick="switchTab('favorites')" id="nav-favorites" class="nav-tab-btn flex flex-col items-center gap-1 hover:text-slate-200 transition relative">
        <i class="fa-solid fa-heart text-base text-rose-500"></i>
        <span id="favBadge" class="absolute -top-1 -right-2 bg-rose-500 text-white font-black text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center">0</span>
        <span>Yêu thích</span>
      </button>

      <button onclick="switchTab('orders')" id="nav-orders" class="nav-tab-btn flex flex-col items-center gap-1 hover:text-slate-200 transition relative">
        <i class="fa-solid fa-receipt text-base text-emerald-400"></i>
        <span id="ordersBadge" class="absolute -top-1 -right-2 bg-emerald-500 text-slate-950 font-black text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center">1</span>
        <span>Đơn của tôi</span>
      </button>

      <button onclick="switchTab('profile')" id="nav-profile" class="nav-tab-btn flex flex-col items-center gap-1 hover:text-slate-200 transition">
        <i class="fa-solid fa-user text-base"></i>
        <span>Tài khoản</span>
      </button>
    </nav>`;

const newNavHtml = `    <!-- Floating Bottom Navigation Dock (Glassmorphism & Glow Design) -->
    <div class="px-3 sm:px-6 py-2 shrink-0 bg-slate-950/95 border-t border-slate-800/80">
      <nav class="glass-panel px-3 sm:px-6 py-2.5 rounded-2xl flex justify-between items-center text-[11px] text-slate-400 shadow-2xl">
        <button onclick="switchTab('explore')" id="nav-explore" class="nav-tab-btn flex flex-col items-center gap-1 text-sky-400 font-black transition transform hover:scale-105">
          <div class="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center text-sm shadow-sm">
            <i class="fa-solid fa-compass"></i>
          </div>
          <span class="tracking-tight text-[10px]">Khám Phá</span>
        </button>

        <button onclick="switchTab('dispatch')" id="nav-dispatch" class="nav-tab-btn flex flex-col items-center gap-1 text-slate-400 hover:text-amber-400 font-bold transition transform hover:scale-105">
          <div class="w-8 h-8 rounded-xl bg-slate-800/80 text-amber-400 flex items-center justify-center text-sm shadow-sm">
            <i class="fa-solid fa-shield-halved"></i>
          </div>
          <span class="tracking-tight text-[10px]">Gọi Thợ 6K</span>
        </button>

        <button onclick="switchTab('favorites')" id="nav-favorites" class="nav-tab-btn flex flex-col items-center gap-1 text-slate-400 hover:text-rose-400 font-bold transition transform hover:scale-105 relative">
          <div class="w-8 h-8 rounded-xl bg-slate-800/80 text-rose-500 flex items-center justify-center text-sm shadow-sm">
            <i class="fa-solid fa-heart"></i>
          </div>
          <span id="favBadge" class="absolute -top-1 right-1 bg-rose-500 text-white font-black text-[8px] w-4 h-4 rounded-full flex items-center justify-center shadow">0</span>
          <span class="tracking-tight text-[10px]">Yêu Thích</span>
        </button>

        <button onclick="switchTab('orders')" id="nav-orders" class="nav-tab-btn flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-400 font-bold transition transform hover:scale-105 relative">
          <div class="w-8 h-8 rounded-xl bg-slate-800/80 text-emerald-400 flex items-center justify-center text-sm shadow-sm">
            <i class="fa-solid fa-receipt"></i>
          </div>
          <span id="ordersBadge" class="absolute -top-1 right-1 bg-emerald-500 text-slate-950 font-black text-[8px] w-4 h-4 rounded-full flex items-center justify-center shadow">1</span>
          <span class="tracking-tight text-[10px]">Đơn Hàng</span>
        </button>

        <button onclick="switchTab('profile')" id="nav-profile" class="nav-tab-btn flex flex-col items-center gap-1 text-slate-400 hover:text-indigo-400 font-bold transition transform hover:scale-105">
          <div class="w-8 h-8 rounded-xl bg-slate-800/80 text-indigo-400 flex items-center justify-center text-sm shadow-sm">
            <i class="fa-solid fa-user-gear"></i>
          </div>
          <span class="tracking-tight text-[10px]">Tài Khoản</span>
        </button>
      </nav>
    </div>`;

if (h.includes(targetNavOld.replace(/\r\n/g, '\n'))) {
  h = h.replace(targetNavOld.replace(/\r\n/g, '\n'), newNavHtml.replace(/\r\n/g, '\n'));
  console.log('2. Đã nâng cấp Bottom Navigation Dock!');
} else if (h.includes(targetNavOld.replace(/\n/g, '\r\n'))) {
  h = h.replace(targetNavOld.replace(/\n/g, '\r\n'), newNavHtml.replace(/\n/g, '\r\n'));
  console.log('2. Đã nâng cấp Bottom Navigation Dock (CRLF)!');
}

fs.writeFileSync(p, h, 'utf8');
console.log('HOÀN TẤT NÂNG CẤP CATEGORY PILLS & FLOATING NAV DOCK!');
