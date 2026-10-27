const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Chèn nút roleBtnAI vào thanh role switcher
const oldRoleBtns = `<button onclick="switchRole('worker')" id="roleBtnWorker" class="px-2.5 py-0.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-[11px] transition">Thợ Kỹ Thuật 6K</button>`;
const newRoleBtns = `<button onclick="switchRole('worker')" id="roleBtnWorker" class="px-2.5 py-0.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-[11px] transition">Thợ Kỹ Thuật 6K</button>
        <button onclick="switchRole('ai')" id="roleBtnAI" class="px-2.5 py-0.5 rounded-lg bg-indigo-950/90 border border-indigo-700/80 text-indigo-300 hover:text-white text-[11px] font-bold transition flex items-center gap-1 shadow-sm">
          <i class="fa-solid fa-microchip text-indigo-400"></i>
          <span>13 Công Cụ AI</span>
        </button>`;

if (html.includes(oldRoleBtns) && !html.includes('roleBtnAI')) {
  html = html.replace(oldRoleBtns, newRoleBtns);
  console.log('1. Đã chèn nút 13 Công Cụ AI vào thanh Header Role Switcher.');
}

// 2. Chèn sectionAITools sau sectionProfile
const targetProfileEnd = `          <div class="text-[11px] text-slate-400 space-y-1">
            <p>• <strong>Mã số thuế:</strong> 4401020233 • Đại diện pháp luật: <strong>Phạm Thanh Hân</strong></p>
            <p>• <strong>Địa chỉ ĐKKD:</strong> 21/146 Ngô Gia Tự, KP. Phú Đông 2, P. Phú Yên, T. Đắk Lắk</p>
            <p>• <strong>Hóa đơn điện tử:</strong> Ký hiệu <code>1C26TDP</code> kết nối Cơ quan Thuế qua EFY Việt Nam.</p>
            <p>• <strong>Chứng thực Hợp đồng:</strong> CeCA Bộ Công Thương (Giấy xác nhận số 010/CCDVCTHĐDT).</p>
          </div>
        </div>

      </section>`;

const aiToolsSectionHtml = `          <div class="text-[11px] text-slate-400 space-y-1">
            <p>• <strong>Mã số thuế:</strong> 4401020233 • Đại diện pháp luật: <strong>Phạm Thanh Hân</strong></p>
            <p>• <strong>Địa chỉ ĐKKD:</strong> 21/146 Ngô Gia Tự, KP. Phú Đông 2, P. Phú Yên, T. Đắk Lắk</p>
            <p>• <strong>Hóa đơn điện tử:</strong> Ký hiệu <code>1C26TDP</code> kết nối Cơ quan Thuế qua EFY Việt Nam.</p>
            <p>• <strong>Chứng thực Hợp đồng:</strong> CeCA Bộ Công Thương (Giấy xác nhận số 010/CCDVCTHĐDT).</p>
          </div>
        </div>

      </section>

      <!-- ================= SECTION 7: TRUNG TÂM VẬN HÀNH 13 CÔNG CỤ AI (ANTIGRAVITY ENGINE) ================= -->
      <section id="sectionAITools" class="hidden space-y-4">
        <!-- Banner Tổng Quan -->
        <div class="bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-indigo-700/60 rounded-3xl p-5 space-y-3 shadow-xl">
          <div class="flex flex-wrap justify-between items-center gap-2">
            <div>
              <div class="flex items-center gap-2">
                <span class="text-xs font-black px-2.5 py-0.5 rounded-full bg-indigo-500 text-white">Google DeepMind</span>
                <span class="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">13/13 ONLINE</span>
              </div>
              <h2 class="text-base font-black text-white mt-1.5 flex items-center gap-2">
                <span>🤖 Trung Tâm Vận Hành 13 Công Cụ AI Đất Phú OneBase</span>
              </h2>
              <p class="text-xs text-slate-300">Hệ điều hành Kín Kẽ OS™ • Mô hình Điều phối Mạng lưới Bản địa (Asset-Light 6K)</p>
            </div>
            <div class="text-right font-mono text-[11px] text-slate-400">
              <div>Pháp nhân: <strong class="text-white">Cty TNHH TM Đất Phú</strong></div>
              <div>STK VCB: <strong class="text-sky-400">0751000025858</strong></div>
            </div>
          </div>

          <!-- Thông số nhanh -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800 text-center text-xs">
            <div class="bg-slate-950/70 p-2 rounded-xl border border-slate-800">
              <div class="text-[10px] text-slate-400">Bộ máy nhân sự</div>
              <div class="font-black text-indigo-400">7 Nhân Sự</div>
            </div>
            <div class="bg-slate-950/70 p-2 rounded-xl border border-slate-800">
              <div class="text-[10px] text-slate-400">Phòng ban liên kết</div>
              <div class="font-black text-sky-400">6 Phòng Ban</div>
            </div>
            <div class="bg-slate-950/70 p-2 rounded-xl border border-slate-800">
              <div class="text-[10px] text-slate-400">Tốc độ điều phối thợ</div>
              <div class="font-black text-amber-400">ETA 15 Phút</div>
            </div>
            <div class="bg-slate-950/70 p-2 rounded-xl border border-slate-800">
              <div class="text-[10px] text-slate-400">Hóa đơn điện tử</div>
              <div class="font-black text-emerald-400">1C26TDP (CQT)</div>
            </div>
          </div>
        </div>

        <!-- Terminal Output Screen (Hiển thị kết quả kích hoạt AI trực tiếp) -->
        <div class="bg-slate-950 border border-indigo-900/60 rounded-3xl p-4 space-y-2 font-mono text-xs shadow-2xl">
          <div class="flex justify-between items-center pb-2 border-b border-slate-800">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span class="text-slate-300 font-bold">Màn Hình Phản Hồi AI Agent (Live Output)</span>
            </div>
            <span id="aiActiveToolLabel" class="text-[10px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">Sẵn sàng nhận lệnh</span>
          </div>
          <pre id="aiTerminalScreen" class="bg-black/90 p-3 rounded-2xl text-[11px] text-emerald-400 overflow-x-auto custom-scroll max-h-56 leading-relaxed">
// Chào mừng Ban Giám Đốc Đất Phú Commerce.
// Hãy bấm nút [Kích Hoạt Live] ở bất kỳ công cụ AI bên dưới để xem luồng tính toán tự động...
          </pre>
        </div>

        <!-- Lưới Danh Sách 13 Công Cụ AI -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">

          <!-- AI-01 -->
          <div class="bg-slate-950 border border-slate-800 hover:border-indigo-500 rounded-2xl p-3.5 space-y-2 transition">
            <div class="flex justify-between items-start">
              <div>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800">AI-01</span>
                <h4 class="font-black text-white text-xs mt-1">Antigravity AI Core Orchestrator</h4>
                <div class="text-[10px] text-slate-400">Toàn hệ thống • Google DeepMind</div>
              </div>
              <span class="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold">🟢 ONLINE</span>
            </div>
            <p class="text-[11px] text-slate-300">Kiến trúc sư AI: Lập trình, nâng cấp tính năng, bảo trì mã nguồn và kiểm toán dữ liệu vi mô RLS.</p>
            <button onclick="triggerAITool('tool_01')" class="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition flex items-center justify-center gap-1.5">
              <i class="fa-solid fa-play text-[10px]"></i> Kích Hoạt Kiểm Toán Hệ Thống
            </button>
          </div>

          <!-- AI-02 -->
          <div class="bg-slate-950 border border-slate-800 hover:border-sky-500 rounded-2xl p-3.5 space-y-2 transition">
            <div class="flex justify-between items-start">
              <div>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">AI-02</span>
                <h4 class="font-black text-white text-xs mt-1">AI PostGIS Dispatcher</h4>
                <div class="text-[10px] text-slate-400">Phòng Kỹ Thuật • Haversine PostGIS</div>
              </div>
              <span class="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold">🟢 ONLINE</span>
            </div>
            <p class="text-[11px] text-slate-300">Tự động đo GPS, quét bán kính 3-5 km và bắn ca cho thợ gần tiệm nhất (ETA 15 phút).</p>
            <button onclick="triggerAITool('tool_02')" class="w-full py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold transition flex items-center justify-center gap-1.5">
              <i class="fa-solid fa-location-arrow text-[10px]"></i> Kích Hoạt Bắn Thợ 15 Phút
            </button>
          </div>

          <!-- AI-03 -->
          <div class="bg-slate-950 border border-slate-800 hover:border-emerald-500 rounded-2xl p-3.5 space-y-2 transition">
            <div class="flex justify-between items-start">
              <div>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">AI-03</span>
                <h4 class="font-black text-white text-xs mt-1">AI Image & Video Inspection 6K</h4>
                <div class="text-[10px] text-slate-400">Kỹ Thuật & QA • Computer Vision</div>
              </div>
              <span class="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold">🟢 ONLINE</span>
            </div>
            <p class="text-[11px] text-slate-300">Phân tích ảnh/video hiện trường (K3) để phát hiện hư hỏng bo mạch, rò rỉ gas/nước trước khi báo giá.</p>
            <button onclick="triggerAITool('tool_03')" class="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition flex items-center justify-center gap-1.5">
              <i class="fa-solid fa-camera-viewfinder text-[10px]"></i> Thử Soi Bo Mạch & Hư Hỏng
            </button>
          </div>

          <!-- AI-04 -->
          <div class="bg-slate-950 border border-slate-800 hover:border-amber-500 rounded-2xl p-3.5 space-y-2 transition">
            <div class="flex justify-between items-start">
              <div>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">AI-04</span>
                <h4 class="font-black text-white text-xs mt-1">AI Dynamic Pricing & Valuation</h4>
                <div class="text-[10px] text-slate-400">Phòng TMĐT • Thuật Toán Định Giá</div>
              </div>
              <span class="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold">🟢 ONLINE</span>
            </div>
            <p class="text-[11px] text-slate-300">Thuật toán định giá sách cũ quý, đồ thanh lý và phụ tùng theo độ hao mòn thực tế và thị giá Tuy Hòa.</p>
            <button onclick="triggerAITool('tool_04')" class="w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold transition flex items-center justify-center gap-1.5">
              <i class="fa-solid fa-calculator text-[10px]"></i> Thử Định Giá Món Đồ Ký Gửi
            </button>
          </div>

          <!-- AI-05 -->
          <div class="bg-slate-950 border border-slate-800 hover:border-teal-500 rounded-2xl p-3.5 space-y-2 transition">
            <div class="flex justify-between items-start">
              <div>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-950 text-teal-400 border border-teal-800">AI-05</span>
                <h4 class="font-black text-white text-xs mt-1">AI Product Content Studio</h4>
                <div class="text-[10px] text-slate-400">Phòng TMĐT • Content Generator</div>
              </div>
              <span class="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold">🟢 ONLINE</span>
            </div>
            <p class="text-[11px] text-slate-300">Tự động soạn tiêu đề chuẩn SEO, mô tả 6K, chính sách bảo hành và bộ hashtag Chợ Phiên.</p>
            <button onclick="triggerAITool('tool_05')" class="w-full py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold transition flex items-center justify-center gap-1.5">
              <i class="fa-solid fa-wand-magic-sparkles text-[10px]"></i> Thử Soạn Bài Đăng Chuẩn SEO
            </button>
          </div>

          <!-- AI-06 -->
          <div class="bg-slate-950 border border-slate-800 hover:border-emerald-500 rounded-2xl p-3.5 space-y-2 transition">
            <div class="flex justify-between items-start">
              <div>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">AI-06</span>
                <h4 class="font-black text-white text-xs mt-1">AI VietQR Matcher & Anti-Fraud</h4>
                <div class="text-[10px] text-slate-400">Phòng Tài Chính • Vietcombank 0751000025858</div>
              </div>
              <span class="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold">🟢 ONLINE</span>
            </div>
            <p class="text-[11px] text-slate-300">Tự động đối soát số dư biến động Napas 247 với mã DATPHU DPxxxx, chặn đứng bill chuyển tiền giả.</p>
            <button onclick="triggerAITool('tool_06')" class="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition flex items-center justify-center gap-1.5">
              <i class="fa-solid fa-qrcode text-[10px]"></i> Thử Đối Soát VietQR Napas
            </button>
          </div>

          <!-- AI-07 -->
          <div class="bg-slate-950 border border-slate-800 hover:border-indigo-500 rounded-2xl p-3.5 space-y-2 transition">
            <div class="flex justify-between items-start">
              <div>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800">AI-07</span>
                <h4 class="font-black text-white text-xs mt-1">AI E-Invoice Auto-Issuer (1C26TDP)</h4>
                <div class="text-[10px] text-slate-400">Phòng Tài Chính • EFY-CA / CeCA</div>
              </div>
              <span class="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold">🟢 ONLINE</span>
            </div>
            <p class="text-[11px] text-slate-300">Tự động bóc tách tiền công/vật tư khi phiếu đạt K5 để ký phát hành HĐĐT 1C26TDP có mã CQT.</p>
            <button onclick="triggerAITool('tool_07')" class="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition flex items-center justify-center gap-1.5">
              <i class="fa-solid fa-file-invoice text-[10px]"></i> Thử Ký Phát Hành HĐĐT 1C26TDP
            </button>
          </div>

          <!-- AI-08 -->
          <div class="bg-slate-950 border border-slate-800 hover:border-purple-500 rounded-2xl p-3.5 space-y-2 transition">
            <div class="flex justify-between items-start">
              <div>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800">AI-08</span>
                <h4 class="font-black text-white text-xs mt-1">AI EFY-eKYC & OCR Scanner</h4>
                <div class="text-[10px] text-slate-400">Phòng Pháp Chế • OCR VNeID</div>
              </div>
              <span class="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold">🟢 ONLINE</span>
            </div>
            <p class="text-[11px] text-slate-300">Tự động đọc và đối chiếu CCCD, giấy phép kinh doanh của các tiệm và chứng chỉ tay nghề thợ.</p>
            <button onclick="triggerAITool('tool_08')" class="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition flex items-center justify-center gap-1.5">
              <i class="fa-solid fa-id-card text-[10px]"></i> Thử Quét Thẩm Định Hồ Sơ Thợ
            </button>
          </div>

          <!-- AI-09 -->
          <div class="bg-slate-950 border border-slate-800 hover:border-slate-500 rounded-2xl p-3.5 space-y-2 transition">
            <div class="flex justify-between items-start">
              <div>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">AI-09</span>
                <h4 class="font-black text-white text-xs mt-1">AI Legal & Contract Assistant</h4>
                <div class="text-[10px] text-slate-400">Ban Giám Đốc • Hợp Đồng CeCA</div>
              </div>
              <span class="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold">🟢 ONLINE</span>
            </div>
            <p class="text-[11px] text-slate-300">Tự động soạn thảo, rà soát điều khoản biên bản nghiệm thu và hợp đồng CeCA Bộ Công Thương.</p>
            <button onclick="triggerAITool('tool_09')" class="w-full py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold transition flex items-center justify-center gap-1.5">
              <i class="fa-solid fa-signature text-[10px]"></i> Thử Soạn Biên Bản Nghiệm Thu K5
            </button>
          </div>

          <!-- AI-10 -->
          <div class="bg-slate-950 border border-slate-800 hover:border-rose-500 rounded-2xl p-3.5 space-y-2 transition">
            <div class="flex justify-between items-start">
              <div>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800">AI-10</span>
                <h4 class="font-black text-white text-xs mt-1">AI Voice Bot Hotline Cứu Hộ</h4>
                <div class="text-[10px] text-slate-400">Phòng CSKH • Trực Ban Đêm 24/7</div>
              </div>
              <span class="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold">🟢 ONLINE</span>
            </div>
            <p class="text-[11px] text-slate-300">Tiếp nhận cuộc gọi khẩn cấp ban đêm hoặc giờ cao điểm, chuyển giọng nói thành phiếu điều phối K1.</p>
            <button onclick="triggerAITool('tool_10')" class="w-full py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold transition flex items-center justify-center gap-1.5">
              <i class="fa-solid fa-phone-volume text-[10px]"></i> Giả Lập Tiếp Nhận Cuộc Gọi Khẩn
            </button>
          </div>

          <!-- AI-11 -->
          <div class="bg-slate-950 border border-slate-800 hover:border-amber-500 rounded-2xl p-3.5 space-y-2 transition">
            <div class="flex justify-between items-start">
              <div>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">AI-11</span>
                <h4 class="font-black text-white text-xs mt-1">AI Sentiment & Review Analyzer</h4>
                <div class="text-[10px] text-slate-400">Phòng CSKH • Giám Sát Đánh Giá</div>
              </div>
              <span class="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold">🟢 ONLINE</span>
            </div>
            <p class="text-[11px] text-slate-300">Quét đánh giá 1-5 sao thời gian thực, kích hoạt cảnh báo lập tức nếu thợ bị chấm dưới 4 sao.</p>
            <button onclick="triggerAITool('tool_11')" class="w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold transition flex items-center justify-center gap-1.5">
              <i class="fa-solid fa-star-half-stroke text-[10px]"></i> Thử Quét Cảm Xúc Đánh Giá
            </button>
          </div>

          <!-- AI-12 -->
          <div class="bg-slate-950 border border-slate-800 hover:border-cyan-500 rounded-2xl p-3.5 space-y-2 transition">
            <div class="flex justify-between items-start">
              <div>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">AI-12</span>
                <h4 class="font-black text-white text-xs mt-1">AI Inventory Forecaster</h4>
                <div class="text-[10px] text-slate-400">Phòng Kỹ Thuật • Dự Báo Vật Tư</div>
              </div>
              <span class="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold">🟢 ONLINE</span>
            </div>
            <p class="text-[11px] text-slate-300">Dự báo nhu cầu vật tư cần nhập cốp xe (gas lạnh, aptomat, van nước, camera) theo tuần.</p>
            <button onclick="triggerAITool('tool_12')" class="w-full py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition flex items-center justify-center gap-1.5">
              <i class="fa-solid fa-boxes-stacked text-[10px]"></i> Thử Dự Báo Nhu Cầu Cốp Xe
            </button>
          </div>

          <!-- AI-13 -->
          <div class="bg-slate-950 border border-slate-800 hover:border-emerald-500 rounded-2xl p-3.5 space-y-2 transition md:col-span-2">
            <div class="flex justify-between items-start">
              <div>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">AI-13</span>
                <h4 class="font-black text-white text-xs mt-1">AI 6K KPI & Audit Auditor</h4>
                <div class="text-[10px] text-slate-400">Ban Giám Đốc • Chia Tỷ Lệ Hoa Hồng 80/20</div>
              </div>
              <span class="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold">🟢 ONLINE</span>
            </div>
            <p class="text-[11px] text-slate-300">Kiểm toán tiến trình K1 ➔ K6 của từng ca thợ, chấm điểm tuân thủ để tính hoa hồng 80% cho thợ và 20% cho sàn minh bạch.</p>
            <button onclick="triggerAITool('tool_13')" class="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition flex items-center justify-center gap-1.5">
              <i class="fa-solid fa-scale-unbalanced-flip text-[10px]"></i> Kiểm Toán Ca Thợ & Tính Hoa Hồng 80/20
            </button>
          </div>

        </div>
      </section>`;

// Thay thế profile end bằng sectionAITools
const profileRegex = /<section id="sectionProfile"[\s\S]*?<\/section>/;
const profileMatch = html.match(profileRegex);
if (profileMatch && !html.includes('sectionAITools')) {
  html = html.replace(profileMatch[0], profileMatch[0] + '\n\n' + aiToolsSectionHtml.substring(aiToolsSectionHtml.indexOf('<!-- ================= SECTION 7')));
  console.log('2. Đã chèn sectionAITools (Trung Tâm Vận Hành 13 Công Cụ AI) thành công.');
}

// 3. Cập nhật switchRole trong Javascript để hỗ trợ role 'ai'
const oldSwitchRole = `function switchRole(role) {
      document.getElementById('roleBtnBuyer').className = 'px-2.5 py-0.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-[11px] transition';
      document.getElementById('roleBtnSeller').className = 'px-2.5 py-0.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-[11px] transition';
      document.getElementById('roleBtnWorker').className = 'px-2.5 py-0.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-[11px] transition';

      if (role === 'buyer') {
        document.getElementById('roleBtnBuyer').className = 'px-2.5 py-0.5 rounded-lg bg-sky-600 text-white font-bold text-[11px] transition';
        switchTab('explore');
      } else if (role === 'seller') {
        document.getElementById('roleBtnSeller').className = 'px-2.5 py-0.5 rounded-lg bg-emerald-600 text-white font-bold text-[11px] transition';
        ['sectionExplore', 'sectionDispatch', 'sectionFavorites', 'sectionMyOrders', 'sectionProfile'].forEach(s => {
          const el = document.getElementById(s);
          if (el) el.classList.add('hidden');
        });
        document.getElementById('sectionSeller').classList.remove('hidden');
      } else if (role === 'worker') {
        document.getElementById('roleBtnWorker').className = 'px-2.5 py-0.5 rounded-lg bg-amber-600 text-white font-bold text-[11px] transition';
        switchTab('dispatch');
      }
    }`;

const newSwitchRole = `function switchRole(role) {
      ['roleBtnBuyer', 'roleBtnSeller', 'roleBtnWorker', 'roleBtnAI'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.className = 'px-2.5 py-0.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-[11px] transition';
      });

      const allSections = ['sectionExplore', 'sectionDispatch', 'sectionFavorites', 'sectionMyOrders', 'sectionSeller', 'sectionProfile', 'sectionAITools'];
      allSections.forEach(s => {
        const el = document.getElementById(s);
        if (el) el.classList.add('hidden');
      });

      if (role === 'buyer') {
        document.getElementById('roleBtnBuyer').className = 'px-2.5 py-0.5 rounded-lg bg-sky-600 text-white font-bold text-[11px] transition';
        switchTab('explore');
      } else if (role === 'seller') {
        document.getElementById('roleBtnSeller').className = 'px-2.5 py-0.5 rounded-lg bg-emerald-600 text-white font-bold text-[11px] transition';
        document.getElementById('sectionSeller').classList.remove('hidden');
      } else if (role === 'worker') {
        document.getElementById('roleBtnWorker').className = 'px-2.5 py-0.5 rounded-lg bg-amber-600 text-white font-bold text-[11px] transition';
        switchTab('dispatch');
      } else if (role === 'ai') {
        const btnAI = document.getElementById('roleBtnAI');
        if (btnAI) btnAI.className = 'px-2.5 py-0.5 rounded-lg bg-indigo-600 text-white font-bold text-[11px] transition shadow-md shadow-indigo-600/40';
        document.getElementById('sectionAITools').classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    // ================= KÍCH HOẠT 13 CÔNG CỤ AI LIVE =================
    function triggerAITool(toolKey) {
      const screen = document.getElementById('aiTerminalScreen');
      const label = document.getElementById('aiActiveToolLabel');
      
      const simulatedTools = {
        tool_01: {
          tool_id: 'AI-01: Antigravity AI Orchestrator',
          dept: 'Ban Giám Đốc (Google DeepMind)',
          status: 'ONLINE (Singapore Region)',
          database: 'Supabase PostgreSQL RLS Verified',
          accounting_link: 'Vietcombank 0751000025858 (Napas 247 Matcher Active)',
          e_invoice: 'Ky hieu 1C26TDP (EFY-CA / CeCA Verified)',
          active_workers: '6 Thợ nòng cốt Tuy Hòa sẵn sàng'
        },
        tool_02: {
          tool_id: 'AI-02: AI PostGIS Dispatcher',
          dept: 'Phòng Kỹ Thuật',
          gps_scan: 'Toạ độ 13.0882, 109.3094 (Trung tâm Tuy Hòa)',
          nearest_worker: 'Nguyễn Văn Hùng (Điện Nước) - 1.2 km',
          eta: '7 phút',
          k_stage: 'K2_DISPATCHED_TO_WORKER_APP',
          action: 'Bắn thông báo Zalo OA & SMS tới máy thợ'
        },
        tool_03: {
          tool_id: 'AI-03: AI Image & Video Inspection 6K',
          dept: 'Kỹ Thuật & QA',
          media_analyzed: 'hien_truong_may_lanh.jpg',
          detected_fault: 'Xì dàn ống đồng gas R32, bám tuyết đầu hồi',
          severity: 'Trung bình (Cần hàn vá & bổ sung 0.4kg gas R32)',
          est_time: '45 phút',
          certification: 'DATPHU-6K-INSPECTION-PASSED'
        },
        tool_04: {
          tool_id: 'AI-04: AI Dynamic Pricing & Valuation',
          dept: 'Phòng Thương Mại Điện Tử',
          item: 'Sách cổ Lịch Sử Xứ Nẫu (Độ mới 85%)',
          original_price: '200.000 đ',
          depreciation_rate: '-15%',
          cultural_appreciation: '+25%',
          recommended_price: '190.000 đ',
          price_range: '170.000 đ - 215.000 đ'
        },
        tool_05: {
          tool_id: 'AI-05: AI Product Content Studio',
          dept: 'Phòng Thương Mại Điện Tử',
          seo_title: '[CHUẨN 6K] Bò Một Nắng Krông Pa - Giao Nhanh 15 Phút Tuy Hòa',
          desc: 'Sản phẩm đã kiểm định 6K Đất Phú: nguồn gốc minh bạch, bò cỏ thả tự nhiên, tẩm ướp gia vị truyền thống muối kiến vàng. Có HĐĐT 1C26TDP.',
          hashtags: '#DatPhuOneBase #DacSanXuNau #ChoPhienTuyHoa #Chuan6K'
        },
        tool_06: {
          tool_id: 'AI-06: AI VietQR Matcher & Anti-Fraud',
          dept: 'Phòng Kế Toán - Tài Chính',
          bank: 'Vietcombank - CN Phú Yên (STK: 0751000025858)',
          account_holder: 'CONG TY TNHH THUONG MAI DAT PHU',
          incoming_napas: 'DATPHU DP2418 +250.000VND',
          match_result: 'TRÙNG KHỚP 100% VỚI ĐƠN HÀNG #DP2418',
          anti_fraud: 'PASSED (Không có dấu hiệu sửa bill Photoshop)',
          action: 'Tự động kích hoạt xuất kho và phát lệnh giao xe 15p'
        },
        tool_07: {
          tool_id: 'AI-07: AI E-Invoice Auto-Issuer',
          dept: 'Phòng Kế Toán - Tài Chính',
          seller: 'CÔNG TY TNHH THƯƠNG MẠI ĐẤT PHÚ (MST: 4401020233)',
          invoice_symbol: '1C26TDP',
          labor_fee: '150.000 đ (Thuế suất 0% KCT)',
          parts_fee: '100.000 đ (Linh kiện VAT 10%: 10.000 đ)',
          total_payment: '260.000 đ',
          digital_signature: 'EFY-CA KÝ SỐ HỢP LỆ • CQT ĐÃ CẤP MÃ'
        },
        tool_08: {
          tool_id: 'AI-08: AI EFY-eKYC & OCR Scanner',
          dept: 'Phòng Pháp Chế & Nhân Sự',
          doc_type: 'CCCD Chip & Chứng Chỉ Nghề Thợ',
          extracted_name: 'NGUYỄN VĂN HÙNG',
          hometown: 'Phường 7, TP. Tuy Hòa',
          cert_verified: 'Bằng Thợ Điện - Lạnh Dân Dụng Bậc 4',
          compliance: 'ĐỦ ĐIỀU KIỆN KÝ KẾT HỢP ĐỒNG LIÊN KẾT 6K'
        },
        tool_09: {
          tool_id: 'AI-09: AI Legal & Contract Assistant',
          dept: 'Ban Giám Đốc & Pháp Chế',
          document: 'Biên Bản Nghiệm Thu & Bảo Hành Số 6K (K5)',
          legal_standard: 'Nghị định 70/2025/NĐ-CP & CeCA Bộ Công Thương',
          clauses_status: '3/3 Điều khoản tuân thủ pháp luật giao dịch điện tử',
          e_sign_ready: 'SẴN SÀNG KÝ SỐ BẰNG TOKEN DOANH NGHIỆP'
        },
        tool_10: {
          tool_id: 'AI-10: AI Voice Bot Hotline Cứu Hộ',
          dept: 'Phòng CSKH (Trực Đêm 24/7)',
          voice_input: 'Alo tiệm bị cháy aptomat sập cầu dao tối thui ở số 45 Nguyễn Huệ!',
          nlp_classification: 'SỰ CỐ KHẨN CẤP: Chập điện / Mất nguồn',
          auto_k1_ticket: 'TICKET-K1-VOICE-45NH',
          action: 'Tự động kích hoạt AI-02 Dispatcher bắn thợ sau 5 giây'
        },
        tool_11: {
          tool_id: 'AI-11: AI Sentiment & Review Analyzer',
          dept: 'Phòng CSKH',
          rating_scanned: '5.0 / 5.0 Sao',
          comment: 'Thợ tới đúng 12 phút, máy lạnh chạy êm ru, giá niêm yết rõ ràng!',
          sentiment: 'CỰC KỲ HÀI LÒNG',
          kpi_trigger: '+20 Điểm KPI tín nhiệm cho Thợ Trần Minh Tâm'
        },
        tool_12: {
          tool_id: 'AI-12: AI Inventory Forecaster',
          dept: 'Phòng Kỹ Thuật & Vật Tư',
          forecast_period: 'Tuần tới (Mùa nắng nóng Tuy Hòa)',
          suggested_restock: [
            '15 Bình gas lạnh R32 (Dự báo nhu cầu tăng 60%)',
            '25 Cái Aptomat RCBO chống rò 32A',
            '20 Bộ van bi tay gạt & rơ-le máy bơm',
            '10 Bộ Camera Imou Ranger 2'
          ],
          total_est_cost: '14.500.000 đ'
        },
        tool_13: {
          tool_id: 'AI-13: AI 6K KPI & Audit Auditor',
          dept: 'Ban Giám Đốc & Kiểm Toán Độc Lập',
          worker_audited: 'DP-W01: Nguyễn Văn Hùng',
          completed_jobs: '18 Ca K1-K6 trong tuần',
          compliance_rate: '99.4% (Đầy đủ ảnh hiện trường K3 và chữ ký K5)',
          total_labor_rev: '4.500.000 đ',
          payout_calculation: {
            worker_80pct: '3.600.000 đ',
            platform_20pct: '900.000 đ',
            bonus_kpi: '300.000 đ',
            net_income: '3.900.000 đ'
          },
          status: 'ĐÃ DUYỆT CHI QUA VIETQR NAPAS'
        }
      };

      const res = simulatedTools[toolKey];
      if (res) {
        label.textContent = res.tool_id;
        screen.textContent = JSON.stringify(res, null, 2);
        screen.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }`;

// Thay thế hàm switchRole trong Javascript
const switchRoleRegex = /function switchRole\(role\)[\s\S]*?\n    \}/;
const switchRoleMatch = html.match(switchRoleRegex);
if (switchRoleMatch) {
  html = html.replace(switchRoleMatch[0], newSwitchRole);
  console.log('3. Đã cập nhật switchRole và thêm triggerAITool vào Javascript.');
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('HOÀN THÀNH CẬP NHẬT GIAO DIỆN & LOGIC 13 CÔNG CỤ AI!');
