# Supabase 資料庫設置指南

## 📋 **概述**

本指南將幫助您設置Supabase PostgreSQL資料庫，以支援AlwaysJoy教育平台的學生分數儲存功能。

## 🚀 **步驟1：創建Supabase項目**

1. 前往 [Supabase](https://supabase.com)
2. 點擊 "Start your project"
3. 選擇 "New project"
4. 填寫項目資訊：
   - **Organization**: 選擇您的組織
   - **Name**: `alwaysjoy-education`
   - **Database Password**: 設置強密碼
   - **Region**: 選擇最近的區域（如 `Southeast Asia (Singapore)`）

## 🗄️ **步驟2：創建資料庫表**

在Supabase Dashboard中，前往 **SQL Editor** 並執行以下SQL腳本：

### **1. 學生表 (students)**

```sql
-- 創建學生表
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    group_name VARCHAR(50) NOT NULL,
    level VARCHAR(20) NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 插入預設學生資料
INSERT INTO students (name, password, group_name, level, isAdmin) VALUES
('C2 Yuni', 'Yuni', 'B組', 'C2', FALSE),
('C2 Emily', 'Emily', 'B組', 'C2', FALSE),
('A8 Vito', 'Vito', 'B組', 'A8', FALSE),
('A4 Eudora', 'Eudora', 'C組', 'A4', FALSE),
('A5 Zoe', 'Zoe', 'C組', 'A5', FALSE),
('N6 Bruce', 'Bruce', 'D組', 'N6', FALSE),
('N7 Laura', 'Laura', 'D組', 'N7', FALSE),
('K9 Lilian', 'Lilian', 'E組', 'K9', FALSE),
('K9 Jill', 'Jill', 'E組', 'K9', FALSE),
('I2 Candy', 'Candy', 'F組', 'I2', FALSE),
('N3 Avery', 'Avery', 'F組', 'N3', FALSE),
('教務組 Annie', 'Annie', '教務組', 'Admin', FALSE),
('教務組 Celina', 'Celina', '教務組', 'Admin', FALSE),
('教務組 Nina', 'Nina', '教務組', 'Admin', FALSE),
('Ben', 'BenBenBen', '管理員', 'Admin', TRUE);
```

### **2. 成績表 (scores)**

```sql
-- 創建成績表
CREATE TABLE scores (
    id SERIAL PRIMARY KEY,
    studentName VARCHAR(100) NOT NULL,
    quizType VARCHAR(50) NOT NULL,
    score INTEGER NOT NULL,
    totalQuestions INTEGER NOT NULL,
    percentage INTEGER NOT NULL,
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    details JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 創建索引以提高查詢效能
CREATE INDEX idx_scores_student_name ON scores(studentName);
CREATE INDEX idx_scores_quiz_type ON scores(quizType);
CREATE INDEX idx_scores_date ON scores(date);
CREATE INDEX idx_scores_student_date ON scores(studentName, date);
```

### **3. 題目表 (questions)**

```sql
-- 創建題目表（用於未來擴展）
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    difficulty VARCHAR(20) NOT NULL,
    clue TEXT NOT NULL,
    answer VARCHAR(100) NOT NULL,
    definition TEXT,
    image_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 創建索引
CREATE INDEX idx_questions_category ON questions(category);
CREATE INDEX idx_questions_difficulty ON questions(difficulty);
```

## 🔧 **步驟3：設置Row Level Security (RLS)**

```sql
-- 啟用RLS
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

-- 學生表策略
CREATE POLICY "Students can view their own data" ON students
    FOR SELECT USING (name = current_user);

-- 成績表策略
CREATE POLICY "Students can view their own scores" ON scores
    FOR SELECT USING (studentName = current_user);

CREATE POLICY "Students can insert their own scores" ON scores
    FOR INSERT WITH CHECK (studentName = current_user);

-- 題目表策略（所有用戶可讀）
CREATE POLICY "All users can view questions" ON questions
    FOR SELECT USING (true);
```

## 🔑 **步驟4：配置API密鑰**

1. 在Supabase Dashboard中點擊 **Settings** → **API**
2. 複製以下資訊：
   - **Project URL**: `https://your-project-ref.supabase.co`
   - **anon public key**: `your-anon-key`

3. 編輯 `api-supabase-client.js` 文件：

```javascript
// 在 api-supabase-client.js 中更新這些值
this.supabaseUrl = 'https://your-project-ref.supabase.co'; // 替換為您的Project URL
this.supabaseKey = 'your-anon-key'; // 替換為您的anon public密鑰
```

## 🌐 **步驟5：設置CORS**

在Supabase Dashboard中：

1. 前往 **Settings** → **API**
2. 在 **CORS** 部分添加您的域名：
   - `https://your-username.github.io`
   - `http://localhost:3000` (開發用)

## 📊 **步驟6：測試資料庫連接**

在瀏覽器控制台中測試：

```javascript
// 測試連接
window.apiService.testConnection().then(result => {
    console.log('Supabase連接狀態:', result);
});

// 測試儲存成績
const testScore = {
    studentName: 'Test Student',
    quizType: 'vocabulary_part1',
    score: 85,
    totalQuestions: 36,
    percentage: 85,
    date: new Date().toISOString()
};

window.apiService.saveScore(testScore).then(result => {
    console.log('測試成績儲存成功:', result);
}).catch(error => {
    console.error('測試成績儲存失敗:', error);
});
```

## 📈 **資料庫查詢範例**

### **獲取學生所有成績**
```sql
SELECT * FROM scores 
WHERE studentName = 'C2 Yuni' 
ORDER BY date DESC;
```

### **獲取特定練習類型的成績統計**
```sql
SELECT 
    studentName,
    AVG(percentage) as avg_percentage,
    COUNT(*) as attempts,
    MAX(date) as last_attempt
FROM scores 
WHERE quizType = 'vocabulary_part1'
GROUP BY studentName
ORDER BY avg_percentage DESC;
```

### **獲取組別成績統計**
```sql
SELECT 
    s.group_name,
    AVG(sc.percentage) as group_avg,
    COUNT(DISTINCT sc.studentName) as active_students
FROM students s
JOIN scores sc ON s.name = sc.studentName
WHERE sc.quizType = 'vocabulary_part1'
GROUP BY s.group_name
ORDER BY group_avg DESC;
```

## 🔒 **安全注意事項**

1. **密碼安全**: 在生產環境中，學生密碼應該經過雜湊處理
2. **API密鑰**: 不要在前端代碼中暴露服務角色密鑰
3. **CORS設置**: 只允許必要的域名訪問
4. **資料備份**: 定期備份重要資料

## 🚨 **故障排除**

### **常見問題**

1. **CORS錯誤**: 檢查CORS設置是否包含正確的域名
2. **認證錯誤**: 確認API密鑰正確
3. **權限錯誤**: 檢查RLS策略設置
4. **連接超時**: 檢查網路連接和Supabase服務狀態

### **調試技巧**

```javascript
// 在瀏覽器控制台中啟用詳細日誌
localStorage.setItem('debug', 'true');

// 檢查API服務是否正確載入
console.log('API Service:', window.apiService);

// 測試基本連接
window.apiService.testConnection().then(result => {
    console.log('連接測試結果:', result);
});
```

## 📞 **支援**

如果遇到問題，請檢查：
1. Supabase Dashboard中的錯誤日誌
2. 瀏覽器開發者工具的控制台錯誤
3. 網路連接狀態
4. API密鑰配置

---

**版本**: 1.0.0  
**最後更新**: 2024年8月  
**適用於**: AlwaysJoy教育平台 v2.0
