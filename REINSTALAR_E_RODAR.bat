@echo off
echo Corrigindo Electron quebrado...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
npm cache clean --force
npm install
npm start
pause
