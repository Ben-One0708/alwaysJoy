#!/bin/bash

echo "🚀 AlwaysJoy Supabase 設置腳本"
echo "================================"

# 檢查是否已安裝Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 請先安裝 Node.js"
    exit 1
fi

# 檢查是否已安裝npm
if ! command -v npm &> /dev/null; then
    echo "❌ 請先安裝 npm"
    exit 1
fi

echo "✅ Node.js 和 npm 已安裝"

# 安裝依賴
echo "📦 安裝依賴..."
npm install pg express cors dotenv

# 檢查.env文件是否存在
if [ ! -f ".env" ]; then
    echo "📝 創建環境變數文件..."
    cp env-supabase.example .env
    echo "⚠️  請編輯 .env 文件，填入您的 Supabase 連接信息"
    echo "   1. 前往 https://supabase.com 創建項目"
    echo "   2. 在項目設置中獲取連接字串"
    echo "   3. 將連接字串填入 .env 文件的 DATABASE_URL"
else
    echo "✅ .env 文件已存在"
fi

echo ""
echo "🎉 設置完成！"
echo ""
echo "📋 下一步："
echo "1. 前往 https://supabase.com 創建項目"
echo "2. 編輯 .env 文件，填入連接信息"
echo "3. 運行: node init-database.js"
echo "4. 運行: node server-postgres.js"
echo "5. 訪問: http://localhost:3000"
echo ""
echo "📚 詳細指南請查看: SUPABASE_SETUP.md"
