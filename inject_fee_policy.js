const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Cập nhật input postPrice và postCat với sự kiện calculateSellerPayout()
const targetCatPrice = `          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-slate-400 mb-1">Danh mục</label>
              <select id="postCat" class="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500">
                <option value="sach_cu">📚 Sách cũ & Tư liệu</option>
                <option value="do_cu">🌀 Đồ thanh lý kiểm định 6K</option>
                <option value="dac_san">🥩 Đặc sản xứ Nẫu</option>
              </select>
            </div>
            <div>
              <label class="block text-slate-400 mb-1">Giá bán mong muốn (VNĐ)</label>
              <input id="postPrice" required type="number" placeholder="VD: 150000" class="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500" />
            </div>
          </div>`;

const newCatPriceWithPayout = `          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-slate-400 mb-1">Danh mục sản phẩm</label>
              <select id="postCat" onchange="calculateSellerPayout()" class="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500">
                <option value="dac_san">🥩 Đặc sản xứ Nẫu (Phí 8%)</option>
                <option value="do_cu">🌀 Đồ thanh lý kiểm định 6K (Phí 10%)</option>
                <option value="sach_cu">📚 Sách cũ & Tư liệu quý (Phí 12%)</option>
              </select>
            </div>
            <div>
              <label class="block text-slate-400 mb-1">Giá bán mong muốn (VNĐ)</label>
              <input id="postPrice" oninput="calculateSellerPayout()" required type="number" placeholder="VD: 200000" class="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500 font-mono" />
            </div>
          </div>

          <!-- Bảng Minh Bạch Phí Sàn 8% - 15% & Số Tiền Thực Nhận -->
          <div id="payoutCalcBox" class="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-3 rounded-2xl border border-emerald-900/60 text-[11px] space-y-1.5 shadow-inner">
            <div class="flex justify-between items-center text-slate-300">
              <span class="flex items-center gap-1.5 font-medium">
                <i class="fa-solid fa-receipt text-amber-400"></i>
                <span>Biểu phí sàn Đất Phú OneBase:</span>
              </span>
              <span id="payoutFeeRate" class="font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded-lg border border-amber-700/60 font-mono text-[10px]">8% (Đặc sản OCOP)</span>
            </div>
            <div class="flex justify-between items-center text-slate-400">
              <span>Phí sàn giữ lại (Vận hành AI & Ký số):</span>
              <span id="payoutFeeAmount" class="font-mono text-slate-300">0 đ</span>
            </div>
            <div class="flex justify-between items-center pt-1.5 border-t border-slate-800 font-bold">
              <span class="text-white flex items-center gap-1">
                <i class="fa-solid fa-wallet text-emerald-400"></i>
                <span>Tiền thực nhận về tài khoản của bạn:</span>
              </span>
              <span id="payoutNetReceive" class="text-emerald-400 font-mono text-xs font-black">0 đ</span>
            </div>
            <div class="text-[9px] text-slate-500 italic">
              * Nhận tiền chuyển khoản trong ngày qua VietQR Napas khi giao dịch thành công. Cam kết 100% không phí ẩn!
            </div>
          </div>`;

if (html.includes(targetCatPrice.replace(/\r\n/g, '\n'))) {
  html = html.replace(targetCatPrice.replace(/\r\n/g, '\n'), newCatPriceWithPayout.replace(/\r\n/g, '\n'));
  console.log('1. Đã cập nhật form người bán với bảng phí sàn 8% - 15%');
} else if (html.includes(targetCatPrice.replace(/\n/g, '\r\n'))) {
  html = html.replace(targetCatPrice.replace(/\n/g, '\r\n'), newCatPriceWithPayout.replace(/\n/g, '\r\n'));
  console.log('1. Đã cập nhật form người bán với bảng phí sàn 8% - 15% (CRLF)');
}

// 2. Chèn hàm calculateSellerPayout vào JavaScript
const jsFunction = `
    // ================= TÍNH TOÁN PHÍ SÀN 8% - 15% & TIỀN THỰC NHẬN =================
    function calculateSellerPayout() {
      const priceInput = document.getElementById('postPrice');
      const catInput = document.getElementById('postCat');
      const feeRateEl = document.getElementById('payoutFeeRate');
      const feeAmountEl = document.getElementById('payoutFeeAmount');
      const netReceiveEl = document.getElementById('payoutNetReceive');

      if (!priceInput || !catInput) return;

      const price = parseFloat(priceInput.value) || 0;
      const cat = catInput.value;

      let feeRate = 0.08; // 8% mặc định cho đặc sản
      let feeLabel = '8% (Đặc sản OCOP)';

      if (cat === 'sach_cu') {
        feeRate = 0.12; // 12% cho sách cũ & tư liệu quý
        feeLabel = '12% (Sách cũ & Tư liệu)';
      } else if (cat === 'do_cu') {
        feeRate = 0.10; // 10% cho đồ thanh lý kiểm định 6K
        feeLabel = '10% (Đồ thanh lý 6K)';
      } else if (cat === 'dac_san') {
        feeRate = 0.08; // 8% cho đặc sản xứ Nẫu
        feeLabel = '8% (Đặc sản OCOP)';
      }

      const feeAmount = Math.round(price * feeRate);
      const netReceive = Math.max(0, price - feeAmount);

      if (feeRateEl) feeRateEl.textContent = feeLabel;
      if (feeAmountEl) feeAmountEl.textContent = feeAmount.toLocaleString('vi-VN') + ' đ';
      if (netReceiveEl) netReceiveEl.textContent = netReceive.toLocaleString('vi-VN') + ' đ';
    }
`;

if (!html.includes('calculateSellerPayout')) {
  const marker = '// ================= SELLER: POST ITEM =================';
  if (html.includes(marker)) {
    html = html.replace(marker, jsFunction + '\n    ' + marker);
    console.log('2. Đã chèn hàm calculateSellerPayout vào index.html');
  }
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('HOÀN THÀNH TÍCH HỢP BIỂU PHÍ SÀN 8% - 15% VÀO INDEX.HTML!');
