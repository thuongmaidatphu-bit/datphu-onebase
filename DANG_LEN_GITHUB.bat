@echo off
chcp 65001 > nul
title ĐĂNG TẢI DỮ LIỆU ĐẤT PHÚ CHỢ PHIÊN LÊN GITHUB
color 0A

echo =====================================================================
echo    CÔNG TY TNHH THƯƠNG MẠI ĐẤT PHÚ - HỆ THỐNG ĐỒNG BỘ GITHUB
echo =====================================================================
echo.
echo Đang kiểm tra thư mục hiện tại: %~dp0
cd /d "%~dp0"

if not exist ".git" (
    if exist "e:\datphu-onebase\.git" (
        cd /d "e:\datphu-onebase"
    )
)

git status
echo.
echo =====================================================================
echo Đang tiến hành đẩy toàn bộ dữ liệu mới nhất lên GitHub...
echo Kho lưu trữ: https://github.com/thuongmaidatphu-bit/datphu-onebase.git
echo =====================================================================
echo.

git push origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo =====================================================================
    echo [THÀNH CÔNG] Toàn bộ dữ liệu và mã nguồn đã được đăng lên GitHub!
    echo Vercel sẽ tự động cập nhật website online trong vòng 1-2 phút.
    echo =====================================================================
) else (
    echo.
    echo =====================================================================
    echo [LƯU Ý] Nếu GitHub yêu cầu đăng nhập:
    echo Bạn vui lòng chọn 'Sign in with your browser' hoặc dán mã Token GitHub.
    echo Sau khi đăng nhập xong, lần sau hệ thống sẽ tự động đồng bộ 100%.
    echo =====================================================================
)

echo.
pause
