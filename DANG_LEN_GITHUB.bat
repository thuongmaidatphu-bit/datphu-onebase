@echo off
chcp 65001 > nul
title ĐỒNG BỘ DỮ LIỆU ĐẤT PHÚ ONEBASE GEN 4 LÊN GITHUB & VERCEL
color 0A

echo =====================================================================
echo    CÔNG TY TNHH THƯƠNG MẠI ĐẤT PHÚ - ĐỒNG BỘ GITHUB & VERCEL (GEN 4)
echo =====================================================================
echo.
cd /d "%~dp0"

if not exist ".git" (
    if exist "e:\datphu-onebase\.git" (
        cd /d "e:\datphu-onebase"
    )
)

echo [1/3] Đang gom toàn bộ file mới nhất trong thư mục E:\datphu-onebase...
git add -A
git commit -m "feat(gen4): update Dat Phu OneBase Gen 4 ecosystem" 2>nul

echo.
echo [2/3] Đang đẩy toàn bộ dữ liệu lên GitHub...
echo Kho lưu trữ: https://github.com/thuongmaidatphu-bit/datphu-onebase.git
echo.

git push origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo =====================================================================
    echo [3/3 - THÀNH CÔNG RỰC RỠ]
    echo Toàn bộ dữ liệu đã được đưa lên GitHub!
    echo Vercel sẽ tự động cập nhật website online trong vòng 1 phút.
    echo =====================================================================
) else (
    echo.
    echo =====================================================================
    echo [HƯỚNG DẪN ĐĂNG NHẬP GITHUB]
    echo Nếu cửa sổ GitHub hiện lên, vui lòng bấm "Sign in with your browser".
    echo Hoặc bạn có thể kéo thả trực tiếp thư mục E:\datphu-onebase lên GitHub/Vercel!
    echo =====================================================================
)

echo.
pause
