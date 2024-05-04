@echo off
start "FRONTEND" powershell -NoExit -Command "cd client; npm run dev --turbo"
start "WEBSOCKET" powershell -NoExit -Command "cd server;  npm run dev"

