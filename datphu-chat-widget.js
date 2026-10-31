/**
 * ĐẤT PHÚ AI SALES CHATBOX WIDGET (SAAS EMBEDDABLE SDK v1.0)
 * Nhúng vào bất kỳ Website nào chỉ với 1 dòng lệnh:
 * <script src="https://domain-cua-ban.com/datphu-chat-widget.js" data-bot-code="bot-dac-san-phu-yen"></script>
 */
(function () {
    const scriptTag = document.currentScript || document.querySelector('script[data-bot-code]');
    const botCode = scriptTag ? scriptTag.getAttribute('data-bot-code') : 'bot-dac-san-phu-yen';
    const customColor = scriptTag ? scriptTag.getAttribute('data-theme-color') : '#059669';
    const customTitle = scriptTag ? scriptTag.getAttribute('data-bot-name') : 'Trợ Lý AI Bán Hàng 24/7';

    const style = document.createElement('style');
    style.innerHTML = `
        #dp-ai-widget-launcher {
            position: fixed; bottom: 24px; right: 24px; z-index: 99999;
            background: ${customColor}; color: #fff; border: none; border-radius: 999px;
            padding: 14px 22px; font-family: system-ui, sans-serif; font-weight: 700;
            font-size: 15px; cursor: pointer; display: flex; align-items: center; gap: 10px;
            box-shadow: 0 10px 25px -5px rgba(0,0,0,0.3); transition: transform 0.2s;
        }
        #dp-ai-widget-launcher:hover { transform: scale(1.05); }
        #dp-ai-widget-box {
            position: fixed; bottom: 88px; right: 24px; width: 370px; height: 540px;
            background: #fff; border-radius: 18px; box-shadow: 0 20px 45px rgba(0,0,0,0.22);
            z-index: 99999; display: none; flex-direction: column; overflow: hidden;
            font-family: system-ui, sans-serif; border: 1px solid #e2e8f0;
        }
        #dp-ai-widget-box.open { display: flex; }
        .dp-w-header {
            background: ${customColor}; color: #fff; padding: 14px 16px;
            display: flex; justify-content: space-between; align-items: center;
        }
        .dp-w-body {
            flex: 1; padding: 14px; overflow-y: auto; background: #f8fafc;
            display: flex; flex-direction: column; gap: 10px; font-size: 14px;
        }
        .dp-w-msg { max-width: 82%; padding: 10px 14px; border-radius: 14px; line-height: 1.45; }
        .dp-w-bot { background: #fff; color: #1e293b; align-self: flex-start; border: 1px solid #e2e8f0; }
        .dp-w-user { background: ${customColor}; color: #fff; align-self: flex-end; }
        .dp-w-footer {
            padding: 10px; background: #fff; border-top: 1px solid #e2e8f0; display: flex; gap: 8px;
        }
        .dp-w-footer input {
            flex: 1; border: 1px solid #cbd5e1; border-radius: 99px; padding: 9px 14px; outline: none;
        }
        .dp-w-footer button {
            background: ${customColor}; color: #fff; border: none; border-radius: 99px;
            padding: 0 16px; font-weight: 600; cursor: pointer;
        }
    `;
    document.head.appendChild(style);

    const container = document.createElement('div');
    container.innerHTML = `
        <button id="dp-ai-widget-launcher">
            <span>💬</span> <span>Chat tư vấn ngay</span>
        </button>
        <div id="dp-ai-widget-box">
            <div class="dp-w-header">
                <div>
                    <div style="font-weight:700;font-size:15px;">${customTitle}</div>
                    <div style="font-size:11px;opacity:0.9;">🟢 Đang trực tuyến • Mã Bot: ${botCode}</div>
                </div>
                <span id="dp-ai-widget-close" style="cursor:pointer;font-size:20px;">&times;</span>
            </div>
            <div class="dp-w-body" id="dp-w-messages">
                <div class="dp-w-msg dp-w-bot">Dạ em chào anh/chị! Em có thể tư vấn sản phẩm hay báo giá gì cho mình hôm nay ạ?</div>
            </div>
            <div class="dp-w-footer">
                <input type="text" id="dp-w-input" placeholder="Nhập câu hỏi hoặc SĐT đặt hàng..." />
                <button id="dp-w-send">Gửi</button>
            </div>
        </div>
    `;
    document.body.appendChild(container);

    const launcher = document.getElementById('dp-ai-widget-launcher');
    const box = document.getElementById('dp-ai-widget-box');
    const closeBtn = document.getElementById('dp-ai-widget-close');
    const input = document.getElementById('dp-w-input');
    const sendBtn = document.getElementById('dp-w-send');
    const msgList = document.getElementById('dp-w-messages');

    launcher.onclick = () => box.classList.toggle('open');
    closeBtn.onclick = () => box.classList.remove('open');

    function sendMsg() {
        const text = input.value.trim();
        if (!text) return;
        msgList.innerHTML += `<div class="dp-w-msg dp-w-user">${text}</div>`;
        input.value = '';
        msgList.scrollTop = msgList.scrollHeight;

        setTimeout(() => {
            const phoneMatch = text.match(/(0[3|5|7|8|9])+([0-9]{8})\b/);
            let reply = 'Dạ em đã ghi nhận yêu cầu. Anh/chị cho em xin Số điện thoại để bộ phận bán hàng gửi ưu đãi và lên đơn ngay cho mình nhé!';
            if (phoneMatch) {
                reply = `🎉 Tuyệt vời! Em đã lưu số điện thoại <b>${phoneMatch[0]}</b> của anh/chị. Nhân viên bên em sẽ gọi xác nhận đơn trong 5 phút ạ!`;
            }
            msgList.innerHTML += `<div class="dp-w-msg dp-w-bot">${reply}</div>`;
            msgList.scrollTop = msgList.scrollHeight;
        }, 600);
    }

    sendBtn.onclick = sendMsg;
    input.onkeypress = (e) => { if (e.key === 'Enter') sendMsg(); };
})();
