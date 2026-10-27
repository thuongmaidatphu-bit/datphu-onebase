const fs = require('fs');
const p = 'e:\\datphu-onebase\\index.html';
let h = fs.readFileSync(p, 'utf8');

const func = `    // ================= TÍNH TOÁN PHÍ SÀN 8% - 15% & TIỀN THỰC NHẬN =================
    function calculateSellerPayout() {
      const priceInput = document.getElementById("postPrice");
      const catInput = document.getElementById("postCat");
      const feeRateEl = document.getElementById("payoutFeeRate");
      const feeAmountEl = document.getElementById("payoutFeeAmount");
      const netReceiveEl = document.getElementById("payoutNetReceive");

      if (!priceInput || !catInput) return;

      const price = parseFloat(priceInput.value) || 0;
      const cat = catInput.value;

      let feeRate = 0.08;
      let feeLabel = "8% (Đặc sản OCOP)";

      if (cat === "sach_cu") {
        feeRate = 0.12;
        feeLabel = "12% (Sách cũ & Tư liệu)";
      } else if (cat === "do_cu") {
        feeRate = 0.10;
        feeLabel = "10% (Đồ thanh lý 6K)";
      } else if (cat === "dac_san") {
        feeRate = 0.08;
        feeLabel = "8% (Đặc sản OCOP)";
      }

      const feeAmount = Math.round(price * feeRate);
      const netReceive = Math.max(0, price - feeAmount);

      if (feeRateEl) feeRateEl.textContent = feeLabel;
      if (feeAmountEl) feeAmountEl.textContent = feeAmount.toLocaleString("vi-VN") + " đ";
      if (netReceiveEl) netReceiveEl.textContent = netReceive.toLocaleString("vi-VN") + " đ";
    }

`;

if (!h.includes('function calculateSellerPayout()')) {
  h = h.replace('    function handlePostItem(e) {', func + '    function handlePostItem(e) {');
  fs.writeFileSync(p, h, 'utf8');
  console.log('Successfully injected calculateSellerPayout!');
} else {
  console.log('Already exists!');
}
