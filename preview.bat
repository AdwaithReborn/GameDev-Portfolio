@echo off
title Adwaith Asokan - Game Dev Portfolio Preview
echo ==============================================================================
echo              ADWAITH ASOKAN - GAME DEVELOPMENT PORTFOLIO
echo ==============================================================================
echo.
echo Starting local preview server on http://localhost:8000 ...
echo (Press Ctrl+C in this terminal window to stop the server anytime)
echo.

start "" "http://localhost:8000"
python -m http.server 8000

if %ERRORLEVEL% NEQ 0 (
    echo Python server could not start. Opening index.html directly...
    start "" "index.html"
)
pause
