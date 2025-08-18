# SQLite 本地資料庫設置指南

## 🎉 簡化設置 - 無需雲端資料庫！

您的 AlwaysJoy 學習平台現在使用 **SQLite 本地資料庫**，這意味著：

✅ **無需註冊任何雲端服務**  
✅ **無需設置 API 密鑰**  
✅ **無需配置 CORS**  
✅ **數據完全本地化**  
✅ **即開即用**  

## 🚀 快速開始

### 1. 直接使用
只需打開 `index.html` 文件，系統會自動：
- 初始化 SQLite 資料庫
- 創建必要的表
- 插入示例數據
- 準備好所有功能

### 2. 本地伺服器（推薦）
為了更好的體驗，建議使用本地伺服器：

```bash
# 方法 1: Python
python3 -m http.server 8000

# 方法 2: Node.js
npx http-server

# 方法 3: PHP
php -S localhost:8000
```

然後訪問：`http://localhost:8000`

## 📊 功能特色

### 完整的資料庫功能
- **學生管理**：15 位學生，按組別分類
- **成績記錄**：完整的成績儲存和查詢
- **管理員功能**：Ben 可以查看所有學生成績
- **數據匯出**：可以匯出資料庫文件
- **數據匯入**：可以匯入之前的資料庫文件

### 示例數據
系統預設包含：
- **15 位學生**：B組、C組、D組、E組、F組、教務組、管理員
- **11 筆成績記錄**：各種練習類型的示例成績
- **10 道練習題目**：字義填空題目

## 🔧 技術架構

### 前端技術
- **HTML5** + **CSS3** + **JavaScript**
- **SQL.js**：在瀏覽器中運行 SQLite
- **Font Awesome**：圖標庫
- **響應式設計**：支援手機、平板、電腦

### 資料庫結構
```sql
-- 學生表
students (id, name, group_name, level, password, is_admin, created_at)

-- 成績表
scores (id, student_name, quiz_type, score, total_questions, percentage, date, notes, details)

-- 題目表
questions (id, question, answer, category, difficulty, options, image_url, created_at)
```

## 👥 測試帳號

### 管理員帳號
- **帳號**：`Ben`
- **密碼**：`BenBenBen`
- **功能**：查看所有學生成績、統計數據

### 學生帳號
- **帳號**：`C2 Yuni`
- **密碼**：`yuni`
- **功能**：練習、記錄成績、查看個人進度

## 📁 文件結構

```
alwaysJoy/
├── index.html              # 主頁面
├── database.js             # SQLite 資料庫核心
├── api-sqlite-client.js    # API 客戶端
├── script.js               # 主要邏輯
├── styles.css              # 樣式文件
├── MJ3.html               # 字義填空練習
├── vocabulary_quiz*.html   # 詞彙練習
└── images/                # 圖片資源
```

## 🔄 數據管理

### 匯出資料庫
在管理員面板中點擊「匯出成績」，會下載 `.db` 文件。

### 匯入資料庫
可以匯入之前匯出的資料庫文件，恢復數據。

### 備份建議
- 定期匯出資料庫文件
- 保存多個版本的備份
- 重要數據建議額外備份

## 🎯 使用流程

### 學生使用
1. 選擇組別和姓名
2. 輸入密碼登入
3. 選擇練習項目
4. 完成練習並記錄成績
5. 查看個人進度

### 管理員使用
1. 使用 Ben 帳號登入
2. 點擊「成績管理」
3. 查看所有學生成績
4. 使用篩選功能
5. 匯出成績報告

## 🆘 常見問題

### Q: 為什麼選擇 SQLite？
A: SQLite 是輕量級的本地資料庫，無需伺服器設置，適合小型項目。

### Q: 數據會丟失嗎？
A: 數據儲存在瀏覽器的記憶體中，關閉頁面會丟失。建議定期匯出備份。

### Q: 可以多人同時使用嗎？
A: 每個用戶都有獨立的本地資料庫，無法共享數據。

### Q: 如何升級到雲端資料庫？
A: 可以參考 `SUPABASE_SETUP.md` 設置 Supabase 雲端資料庫。

## 🚀 部署到 GitHub Pages

1. 推送代碼到 GitHub
2. 啟用 GitHub Pages
3. 訪問您的網站

**注意**：GitHub Pages 上的數據不會持久保存，每次重新載入都會重置。

## 📞 支援

- 📧 技術問題：檢查瀏覽器控制台錯誤
- 🔧 功能建議：查看 `README.md`
- 🗄️ 資料庫問題：檢查 `database.js`

---

**🎉 享受您的 AlwaysJoy 學習平台！**
