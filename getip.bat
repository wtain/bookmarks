@echo off
for /f "tokens=3 delims=: " %%i  in ('netsh interface ip show config name^="Wi-Fi" ^| findstr "IP Address" ^| findstr [0-9]') do set IP=%%i
echo %IP%