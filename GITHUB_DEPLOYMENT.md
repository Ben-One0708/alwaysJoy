# GitHub + Supabase 部署指南

## 🚀 完整部署流程

### **步驟1：創建Supabase項目**

1. 前往 [Supabase](https://supabase.com)
2. 註冊帳號並創建新項目
3. 項目名稱：`alwaysjoy-learning`
4. 記錄項目URL和API密鑰

### **步驟2：配置Supabase數據庫**

#### **在Supabase Dashboard中執行SQL：**

```sql
-- 創建學生表
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    "group" VARCHAR(50) NOT NULL,
    level VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    "isAdmin" BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 創建成績表
CREATE TABLE scores (
    id SERIAL PRIMARY KEY,
    "studentName" VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    scores JSONB NOT NULL,
    notes TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("studentName") REFERENCES students(name) ON DELETE CASCADE
);

-- 創建題目表
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    difficulty VARCHAR(50) NOT NULL,
    options JSONB,
    explanation TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 創建索引
CREATE INDEX idx_scores_student_name ON scores("studentName");
CREATE INDEX idx_scores_date ON scores(date);
CREATE INDEX idx_questions_category ON questions(category);
CREATE INDEX idx_questions_difficulty ON questions(difficulty);
CREATE INDEX idx_questions_category_difficulty ON questions(category, difficulty);

-- 插入學生數據
INSERT INTO students (name, "group", level, password, "isAdmin") VALUES
('C2 Yuni', 'B組', 'C2', 'Yuni', false),
('C2 Emily', 'B組', 'C2', 'Emily', false),
('A8 Vito', 'B組', 'A8', 'Vito', false),
('A4 Eudora', 'C組', 'A4', 'Eudora', false),
('A5 Zoe', 'C組', 'A5', 'Zoe', false),
('N6 Bruce', 'D組', 'N6', 'Bruce', false),
('N7 Laura', 'D組', 'N7', 'Laura', false),
('K9 Lilian', 'E組', 'K9', 'Lilian', false),
('K9 Jill', 'E組', 'K9', 'Jill', false),
('I2 Candy', 'F組', 'I2', 'Candy', false),
('N3 Avery', 'F組', 'N3', 'Avery', false),
('教務組 Annie', '教務組', 'Admin', 'Annie', false),
('教務組 Celina', '教務組', 'Admin', 'Celina', false),
('教務組 Nina', '教務組', 'Admin', 'Nina', false),
('Ben', '管理員', 'Admin', 'BenBenBen', true);

-- 插入示例題目
INSERT INTO questions (question, answer, category, difficulty, options, explanation) VALUES
('請填入缺少的字母：app_e (apple)', 'l', '拼字練習', '初級', '["l", "e", "a", "p"]', 'apple是蘋果的意思，缺少的字母是l'),
('請填入缺少的字母：b_ok (book)', 'o', '拼字練習', '初級', '["o", "a", "e", "i"]', 'book是書的意思，缺少的字母是o'),
('請填入缺少的字母：c_t (cat)', 'a', '拼字練習', '初級', '["a", "e", "i", "o"]', 'cat是貓的意思，缺少的字母是a'),
('請填入缺少的字母：d_g (dog)', 'o', '拼字練習', '初級', '["o", "a", "e", "i"]', 'dog是狗的意思，缺少的字母是o'),
('請填入缺少的字母：h_se (house)', 'ou', '拼字練習', '中級', '["ou", "au", "eu", "oi"]', 'house是房子的意思，缺少的字母是ou');
```

### **步驟3：配置Supabase API密鑰**

1. 在Supabase Dashboard中點擊「Settings」→「API」
2. 複製「Project URL」和「anon public」密鑰
3. 編輯 `api-supabase-client.js` 文件：

```javascript
this.supabaseUrl = 'https://your-project-ref.supabase.co'; // 替換為您的Project URL
this.supabaseKey = 'your-anon-key'; // 替換為您的anon public密鑰
```

### **步驟4：創建GitHub倉庫**

1. 前往 [GitHub](https://github.com)
2. 點擊「New repository」
3. 倉庫名稱：`alwaysjoy-learning`
4. 選擇「Public」
5. 不要初始化README（我們已有文件）

### **步驟5：推送代碼到GitHub**

```bash
# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit: AlwaysJoy Learning System with Supabase"

# 添加遠程倉庫（替換為您的GitHub倉庫URL）
git remote add origin https://github.com/your-username/alwaysjoy-learning.git

# 推送到GitHub
git push -u origin main
```

### **步驟6：啟用GitHub Pages**

1. 在GitHub倉庫頁面點擊「Settings」
2. 滾動到「Pages」部分
3. Source選擇「Deploy from a branch」
4. Branch選擇「gh-pages」
5. 點擊「Save」

### **步驟7：配置GitHub Actions**

GitHub Actions會自動部署到GitHub Pages。確保 `.github/workflows/deploy.yml` 文件存在。

## 🔧 配置說明

### **Supabase設置**

#### **Row Level Security (RLS)**
```sql
-- 啟用RLS
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

-- 創建策略（可選）
CREATE POLICY "Allow public read access" ON students FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON scores FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON questions FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON scores FOR INSERT WITH CHECK (true);
```

#### **API密鑰安全**
- 使用 `anon public` 密鑰（只讀權限）
- 在生產環境中設置適當的RLS策略
- 定期輪換密鑰

### **GitHub Pages設置**

#### **自定義域名（可選）**
1. 在GitHub Pages設置中添加自定義域名
2. 更新DNS記錄
3. 配置SSL證書

#### **CORS設置**
確保Supabase允許GitHub Pages域名訪問：
1. 在Supabase Dashboard中設置CORS
2. 添加您的GitHub Pages URL

## 📊 功能測試

### **本地測試**
```bash
# 啟動本地伺服器
python3 -m http.server 8000

# 訪問 http://localhost:8000
```

### **生產測試**
1. 等待GitHub Actions部署完成
2. 訪問您的GitHub Pages URL
3. 測試所有功能

## 🔍 故障排除

### **常見問題**

#### **CORS錯誤**
- 檢查Supabase CORS設置
- 確認API密鑰正確
- 檢查域名白名單

#### **數據庫連接錯誤**
- 確認Supabase項目URL正確
- 檢查API密鑰是否有效
- 驗證表結構是否正確

#### **GitHub Pages部署失敗**
- 檢查GitHub Actions日誌
- 確認文件路徑正確
- 檢查分支設置

### **調試技巧**
```javascript
// 在瀏覽器控制台中測試連接
window.apiService.testConnection().then(result => {
    console.log('連接測試結果:', result);
});
```

## 📈 監控和維護

### **Supabase監控**
- 在Supabase Dashboard中查看使用量
- 監控API請求數量
- 查看數據庫性能

### **GitHub監控**
- 查看GitHub Actions部署狀態
- 監控GitHub Pages訪問量
- 檢查錯誤日誌

## 🎯 最佳實踐

1. **安全第一**：使用適當的RLS策略
2. **版本控制**：定期提交代碼更改
3. **備份數據**：定期導出Supabase數據
4. **性能優化**：監控查詢性能
5. **用戶體驗**：測試所有功能流程

## 📞 支持

- [Supabase文檔](https://supabase.com/docs)
- [GitHub Pages文檔](https://pages.github.com)
- [GitHub Actions文檔](https://docs.github.com/en/actions)
