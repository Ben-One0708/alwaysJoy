# Supabase部署指南

## 🚀 部署選項

### **選項1：Vercel部署（推薦）**

#### **步驟1：準備GitHub倉庫**
1. 將代碼推送到GitHub
2. 確保包含所有必要文件

#### **步驟2：連接Vercel**
1. 前往 [Vercel](https://vercel.com)
2. 使用GitHub帳號登入
3. 點擊「New Project」
4. 選擇您的GitHub倉庫

#### **步驟3：配置環境變數**
在Vercel項目設置中添加：
```
DATABASE_URL=postgresql://postgres:your_password@db.your_project_ref.supabase.co:5432/postgres
NODE_ENV=production
```

#### **步驟4：部署**
1. 點擊「Deploy」
2. 等待部署完成
3. 獲取生產URL

### **選項2：Railway部署**

#### **步驟1：連接Railway**
1. 前往 [Railway](https://railway.app)
2. 使用GitHub帳號登入
3. 點擊「New Project」
4. 選擇「Deploy from GitHub repo」

#### **步驟2：配置環境變數**
在Railway項目設置中添加：
```
DATABASE_URL=postgresql://postgres:your_password@db.your_project_ref.supabase.co:5432/postgres
NODE_ENV=production
```

#### **步驟3：部署**
1. Railway會自動檢測並部署
2. 等待部署完成
3. 獲取生產URL

### **選項3：本地部署**

#### **步驟1：安裝依賴**
```bash
npm install
```

#### **步驟2：設置環境變數**
```bash
cp env-supabase.example .env
# 編輯.env文件，填入Supabase連接信息
```

#### **步驟3：初始化數據庫**
```bash
node init-database.js
```

#### **步驟4：啟動應用**
```bash
npm start
```

## 📊 Supabase設置

### **創建Supabase項目**
1. 前往 [Supabase](https://supabase.com)
2. 創建新項目
3. 獲取連接信息

### **數據庫初始化**
```bash
# 在本地運行
node init-database.js

# 或在Supabase Dashboard中執行SQL
```

### **環境變數配置**
```env
DATABASE_URL=postgresql://postgres:your_password@db.your_project_ref.supabase.co:5432/postgres
NODE_ENV=production
PORT=3000
```

## 🔧 部署後配置

### **域名設置**
1. 在Vercel/Railway中設置自定義域名
2. 更新DNS記錄
3. 配置SSL證書

### **環境變數管理**
- 生產環境：在部署平台設置
- 開發環境：使用.env文件

### **數據庫備份**
- Supabase自動備份
- 可手動導出數據
- 支持時間點恢復

## 📈 監控和維護

### **性能監控**
- Vercel Analytics
- Railway Metrics
- Supabase Dashboard

### **錯誤追蹤**
- 查看部署平台日誌
- 監控API響應時間
- 設置錯誤警報

### **數據庫優化**
- 定期檢查索引
- 監控查詢性能
- 清理過期數據

## 🔐 安全設置

### **Supabase安全**
1. 啟用Row Level Security (RLS)
2. 設置適當的訪問策略
3. 定期更新密碼

### **應用安全**
1. 使用HTTPS
2. 設置CORS策略
3. 驗證輸入數據

## 🚨 故障排除

### **常見問題**

#### **連接錯誤**
```bash
# 測試數據庫連接
psql $DATABASE_URL -c "SELECT version();"
```

#### **部署失敗**
- 檢查環境變數
- 查看構建日誌
- 確認依賴版本

#### **API錯誤**
- 檢查CORS設置
- 驗證API端點
- 查看錯誤日誌

### **調試技巧**
```bash
# 本地測試
npm run dev

# 檢查日誌
tail -f logs/app.log

# 數據庫連接測試
node -e "require('./server-postgres.js')"
```

## 📞 支持

- [Vercel文檔](https://vercel.com/docs)
- [Railway文檔](https://docs.railway.app)
- [Supabase文檔](https://supabase.com/docs)
- [PostgreSQL文檔](https://www.postgresql.org/docs)

## 🎯 最佳實踐

1. **環境分離**：開發、測試、生產環境分離
2. **版本控制**：使用Git管理代碼
3. **自動部署**：設置CI/CD流程
4. **監控告警**：設置性能監控
5. **備份策略**：定期備份數據
6. **安全更新**：定期更新依賴
