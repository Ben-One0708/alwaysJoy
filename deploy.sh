#!/bin/bash

# AlwaysJoy 學習平台部署腳本
# 此腳本將幫助您完成 GitHub 部署

echo "🚀 AlwaysJoy 學習平台部署腳本"
echo "================================"

# 檢查是否已設置遠程倉庫
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ 尚未設置遠程倉庫"
    echo ""
    echo "請按照以下步驟操作："
    echo "1. 前往 https://github.com 創建新倉庫：alwaysjoy-learning"
    echo "2. 複製倉庫 URL"
    echo "3. 運行以下命令："
    echo "   git remote add origin https://github.com/YOUR_USERNAME/alwaysjoy-learning.git"
    echo "   git push -u origin main"
    echo ""
    exit 1
fi

# 顯示當前遠程倉庫
echo "📦 當前遠程倉庫："
git remote -v
echo ""

# 檢查是否有未提交的更改
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  發現未提交的更改，正在提交..."
    git add .
    git commit -m "Update: $(date)"
fi

# 推送到 GitHub
echo "📤 推送到 GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ 代碼推送成功！"
    echo ""
    echo "🎉 下一步操作："
    echo "1. 前往您的 GitHub 倉庫頁面"
    echo "2. 點擊 Settings → Pages"
    echo "3. Source 選擇 'Deploy from a branch'"
    echo "4. Branch 選擇 'main'"
    echo "5. Folder 選擇 '/ (root)'"
    echo "6. 點擊 Save"
    echo ""
    echo "🌐 您的網站將在幾分鐘後可用於："
    echo "   https://YOUR_USERNAME.github.io/alwaysjoy-learning"
    echo ""
    echo "📋 記得完成 Supabase 設置："
    echo "1. 創建 Supabase 項目"
    echo "2. 執行 SUPABASE_SETUP.md 中的 SQL 腳本"
    echo "3. 更新 api-supabase-client.js 中的 API 密鑰"
    echo ""
else
    echo "❌ 推送失敗，請檢查錯誤信息"
    exit 1
fi
