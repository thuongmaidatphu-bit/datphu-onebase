const fs = require('fs');
const p = 'e:\\datphu-onebase\\index.html';
let h = fs.readFileSync(p, 'utf8');

const oldFuncCode = `    function setDispatchServiceType(type) {
      currentDispatchType = type;
      ['srvBtn-tho_6k', 'srvBtn-taxi', 'srvBtn-xemay', 'srvBtn-tour'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.className = 'py-2 px-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center gap-1 text-[11px] transition';
      });
      const activeBtn = document.getElementById('srvBtn-' + type);
      if (activeBtn) activeBtn.className = 'py-2 px-2 rounded-xl bg-amber-500 text-slate-950 font-bold flex items-center justify-center gap-1 text-[11px] transition';`;

const newFuncCode = `    function setDispatchServiceType(type) {
      currentDispatchType = type;
      const defaultBtnClass = 'p-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 text-slate-200 hover:text-white font-bold flex flex-col items-center justify-center gap-1.5 transition transform hover:scale-[1.02]';
      
      ['srvBtn-tho_6k', 'srvBtn-taxi', 'srvBtn-xemay', 'srvBtn-tour'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.className = defaultBtnClass;
      });

      const activeBtn = document.getElementById('srvBtn-' + type);
      const submitBtn = document.getElementById('btnDispSubmit');

      if (activeBtn) {
        if (type === 'tho_6k') {
          activeBtn.className = 'p-3 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-amber-500 text-slate-950 font-black flex flex-col items-center justify-center gap-1.5 transition transform hover:scale-[1.02] shadow-lg shadow-amber-500/25 border border-amber-300';
          if (submitBtn) submitBtn.className = 'w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 text-slate-950 font-black text-xs transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] flex items-center justify-center gap-2 tracking-wide shimmer-btn';
        } else if (type === 'taxi') {
          activeBtn.className = 'p-3 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600 text-white font-black flex flex-col items-center justify-center gap-1.5 transition transform hover:scale-[1.02] shadow-lg shadow-cyan-500/25 border border-cyan-300';
          if (submitBtn) submitBtn.className = 'w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 text-white font-black text-xs transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] flex items-center justify-center gap-2 tracking-wide shimmer-btn';
        } else if (type === 'xemay') {
          activeBtn.className = 'p-3 rounded-2xl bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500 text-white font-black flex flex-col items-center justify-center gap-1.5 transition transform hover:scale-[1.02] shadow-lg shadow-purple-500/25 border border-purple-300';
          if (submitBtn) submitBtn.className = 'w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 text-white font-black text-xs transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] flex items-center justify-center gap-2 tracking-wide shimmer-btn';
        } else if (type === 'tour') {
          activeBtn.className = 'p-3 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600 text-white font-black flex flex-col items-center justify-center gap-1.5 transition transform hover:scale-[1.02] shadow-lg shadow-emerald-500/25 border border-emerald-300';
          if (submitBtn) submitBtn.className = 'w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600 text-white font-black text-xs transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2 tracking-wide shimmer-btn';
        }
      }`;

if (h.includes(oldFuncCode.replace(/\r\n/g, '\n'))) {
  h = h.replace(oldFuncCode.replace(/\r\n/g, '\n'), newFuncCode.replace(/\r\n/g, '\n'));
  console.log('Đã cập nhật setDispatchServiceType thành công!');
} else if (h.includes(oldFuncCode.replace(/\n/g, '\r\n'))) {
  h = h.replace(oldFuncCode.replace(/\n/g, '\r\n'), newFuncCode.replace(/\n/g, '\r\n'));
  console.log('Đã cập nhật setDispatchServiceType thành công (CRLF)!');
} else {
  // Thay thế bằng regex
  const regexFunc = /function setDispatchServiceType\(type\)[\s\S]*?if \(activeBtn\) activeBtn\.className = 'py-2 px-2 rounded-xl bg-amber-500 text-slate-950 font-bold flex items-center justify-center gap-1 text-\[11px\] transition';/;
  if (h.match(regexFunc)) {
    h = h.replace(regexFunc, newFuncCode);
    console.log('Đã cập nhật setDispatchServiceType bằng regex thành công!');
  } else {
    console.log('Không tìm thấy oldFuncCode.');
  }
}

fs.writeFileSync(p, h, 'utf8');
