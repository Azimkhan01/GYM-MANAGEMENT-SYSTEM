@echo off
cd /d %~dp0
start cmd /k "nodemon -e hbs,js,css"
timeout /t 2 >nul
start chrome http://127.0.0.1:8000
