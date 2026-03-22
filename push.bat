@echo off
chcp 65001 >nul
echo =======================================
echo 正在自动配置 Git 并推送到 GitHub...
echo =======================================

cd /d "d:\com_222"

echo.
echo [1/6] 初始化 Git 仓库...
git init

echo.
echo [2/6] 配置用户名和邮箱 (解决 Author identity unknown 报错)...
git config --global user.name "peng676"
git config --global user.email "peng676@github.com"

echo.
echo [3/6] 添加文件到暂存区...
git add .

echo.
echo [4/6] 提交文件...
git commit -m "Initial commit"

echo.
echo [5/6] 设置主分支并关联远程仓库...
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/peng676/info.git

echo.
echo [6/6] 开始推送到 GitHub (如果弹出登录框，请授权登录)...
git push -u origin main --force

echo.
echo =======================================
echo 执行完毕！
echo 如果看到 "branch 'main' set up to track 'origin/main'"，说明成功了！
echo 如果有红色报错，请截图发给 AI。
echo =======================================
pause
