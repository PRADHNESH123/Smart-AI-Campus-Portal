@echo off
echo ========================================================
echo  Kalasalingam University - Smart Campus Portal
echo  Google Antigravity SDK & React Portal Runner
echo ========================================================
echo.

echo [1/2] Starting Python Google Antigravity Agent Server (Port 8000)...
start "KLU AI Agent Server" cmd /k "python -m uvicorn backend.agent_server:app --host 127.0.0.1 --port 8000"

echo [2/2] Starting React Vite Frontend (Port 3000)...
start "KLU Campus Portal Frontend" cmd /k "npm run dev"

echo.
echo Both servers are launching!
echo Frontend: http://localhost:3000
echo Backend:  http://127.0.0.1:8000
echo.
pause
