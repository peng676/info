@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ========================================
echo           🚀 Git 自动推送脚本
echo ========================================
echo.

REM 检查是否是 Git 仓库
if not exist ".git" (
    echo [1/6] 初始化 Git 仓库...
    git init
    git branch -M main
    git remote add origin https://github.com/peng676/info.git
)

echo [1/6] 检查 Git 状态...
git status --short

echo.
echo [2/6] 添加所有修改的文件...
git add .

echo.
echo [3/6] 检查是否有文件需要提交...
git status --short > temp.txt
set /p changes=<temp.txt
del temp.txt

if "%changes%"=="" (
    echo ✅ 没有文件需要提交，工作区是干净的！
    echo.
    echo ========================================
    echo           🎉 脚本执行完毕
    echo ========================================
    pause
    exit /b 0
)

REM 获取当前日期时间作为提交信息
for /f "tokens=2 delims==" %%i in ('wmic os get localdatetime /value') do set datetime=%%i
set year=%datetime:~0,4%
set month=%datetime:~4,2%
set day=%datetime:~6,2%
set hour=%datetime:~8,2%
set minute=%datetime:~10,2%
set second=%datetime:~12,2%

set commit_msg=Update %year%-%month%-%day% %hour%:%minute%:%second%

echo.
echo [4/6] 提交更改...
git commit -m "%commit_msg%"
if errorlevel 1 (
    echo ❌ 提交失败！
    pause
    exit /b 1
)

echo.
echo [5/6] 拉取远程更新（防止冲突）...
git pull origin main --rebase
if errorlevel 1 (
    echo ⚠️  拉取远程更新失败，请检查是否有冲突
    pause
    exit /b 1
)

echo.
echo [6/6] 推送到 GitHub...
git push -u origin main
if errorlevel 1 (
    echo ❌ 推送失败！
    pause
    exit /b 1
)

echo.
echo ========================================
echo           ✅ 推送成功！
echo ========================================
echo 提交信息: %commit_msg%
echo.
echo 您可以访问: https://github.com/peng676/info
echo.
timeout /t 3 >nul
