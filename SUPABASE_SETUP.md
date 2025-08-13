# Supabase設置指南

## 🚀 快速開始

### **步驟1：創建Supabase帳號**

1. 前往 [Supabase](https://supabase.com)
2. 點擊「Start your project」
3. 使用GitHub或Google帳號註冊

### **步驟2：創建新項目**

1. 點擊「New Project」
2. 選擇組織（或創建新組織）
3. 填寫項目信息：
   - **Name**: `alwaysjoy-learning`
   - **Database Password**: 設置一個強密碼（請記住）
   - **Region**: 選擇離您最近的區域
4. 點擊「Create new project」

### **步驟3：獲取連接信息**

1. 在項目儀表板中，點擊左側菜單的「Settings」
2. 點擊「Database」
3. 找到「Connection string」部分
4. 複製「URI」連接字串

### **步驟4：配置環境變數**

1. 複製環境變數範例文件：
```bash
cp env-supabase.example .env
```

2. 編輯 `.env` 文件，填入您的連接信息：
```env
DATABASE_URL=postgresql://postgres:your_password@db.your_project_ref.supabase.co:5432/postgres
PORT=3000
NODE_ENV=development
```

### **步驟5：安裝依賴**

```bash
npm install pg express cors dotenv
```

### **步驟6：初始化數據庫**

```bash
node init-database.js
```

### **步驟7：啟動應用**

```bash
node server-postgres.js
```

## 📊 Supabase優勢

### **免費額度：**
- 500MB數據庫
- 2GB帶寬
- 50,000行數據
- 自動備份

### **內建功能：**
- 實時數據庫
- 身份驗證
- 文件存儲
- API自動生成

## 🔧 數據庫管理

### **使用Supabase Dashboard**

1. **查看數據**：
   - 點擊左側「Table Editor」
   - 查看 `students`, `scores`, `questions` 表

2. **SQL編輯器**：
   - 點擊左側「SQL Editor」
   - 執行SQL查詢

3. **API文檔**：
   - 點擊左側「API」
   - 查看自動生成的API文檔

### **常用SQL查詢**

```sql
-- 查看所有學生
SELECT * FROM students;

-- 查看所有成績
SELECT * FROM scores ORDER BY date DESC;

-- 查看題目統計
SELECT category, COUNT(*) as count 
FROM questions 
GROUP BY category;

-- 獲取隨機題目
SELECT * FROM questions 
WHERE category = '拼字練習' 
ORDER BY RANDOM() 
LIMIT 10;
```

## 🔐 安全設置

### **Row Level Security (RLS)**

在Supabase中啟用RLS來保護數據：

```sql
-- 啟用RLS
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

-- 創建策略
CREATE POLICY "Students can view their own data" ON students
    FOR SELECT USING (auth.uid()::text = name);

CREATE POLICY "Students can view their own scores" ON scores
    FOR SELECT USING (auth.uid()::text = "studentName");
```

## 📈 監控和備份

### **監控**
- 在Supabase Dashboard中查看使用量
- 監控API請求數量
- 查看數據庫性能

### **備份**
- Supabase自動備份
- 可以手動導出數據
- 支持時間點恢復

## 🔧 故障排除

### **連接問題**
```bash
# 測試連接
psql $DATABASE_URL -c "SELECT version();"
```

### **權限問題**
- 檢查數據庫密碼是否正確
- 確認IP白名單設置
- 檢查SSL設置

### **性能問題**
- 使用Supabase Dashboard查看慢查詢
- 檢查索引是否正確創建
- 監控資源使用量

## 💡 最佳實踐

1. **定期備份**：利用Supabase自動備份
2. **監控使用量**：避免超出免費額度
3. **使用索引**：為常用查詢建立索引
4. **安全設置**：啟用RLS保護數據
5. **API優化**：使用Supabase內建API

## 🚀 部署選項

### **本地開發**
```bash
node server-postgres.js
```

### **Vercel部署**
1. 連接GitHub倉庫
2. 設置環境變數
3. 自動部署

### **Railway部署**
1. 連接GitHub倉庫
2. 設置環境變數
3. 自動部署

## 📞 支持

- [Supabase文檔](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [GitHub Issues](https://github.com/supabase/supabase/issues)
