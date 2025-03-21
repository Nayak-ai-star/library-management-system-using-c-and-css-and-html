@echo off
echo Opening Library Management System...

:: The URL where your web server will be hosting the site
set SERVER_URL=http://localhost:8080/web/

:: Start the web server in a separate process
start /B cmd /c "cd %~dp0 && python -m http.server 8080"

:: Wait a moment for the server to start
timeout /t 2 /nobreak >nul

:: Open the default browser with the server URL
start "" "%SERVER_URL%"

echo Library Management System is now running.
echo Server URL: %SERVER_URL%
echo.
echo Press any key to close the server when you're done.
pause >nul

:: When user presses a key, kill the Python http server
taskkill /F /IM python.exe
echo Server stopped. Goodbye!
timeout /t 2 >nul 