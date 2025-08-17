# 🚀 Supabase 資料庫設置完整指南

## 📋 **步驟1：創建Supabase項目**

### 1.1 前往Supabase官網
- 打開瀏覽器，前往 [https://supabase.com](https://supabase.com)
- 點擊右上角的 "Start your project" 按鈕

### 1.2 登入或註冊
- 如果您沒有帳號，請先註冊一個GitHub或Google帳號
- 登入後，您會看到Supabase Dashboard

### 1.3 創建新項目
- 點擊 "New project" 按鈕
- 填寫項目資訊：
  - **Organization**: 選擇您的組織（如果沒有，會自動創建）
  - **Name**: `alwaysjoy-education`
  - **Database Password**: 設置一個強密碼（請記住這個密碼）
  - **Region**: 選擇 `Southeast Asia (Singapore)` 或 `East Asia (Tokyo)`
- 點擊 "Create new project"

### 1.4 等待項目創建
- 項目創建需要2-3分鐘
- 創建完成後，您會收到通知

## 🗄️ **步驟2：設置資料庫表**

### 2.1 進入SQL Editor
- 在項目Dashboard中，點擊左側選單的 "SQL Editor"
- 點擊 "New query" 創建新的SQL查詢

### 2.2 執行學生表創建腳本
複製以下SQL代碼到編輯器中：

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

- 點擊 "Run" 執行腳本

### 2.3 執行成績表創建腳本
創建新的SQL查詢，複製以下代碼：

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

### 2.4 執行題目表創建腳本
創建新的SQL查詢，複製以下代碼：

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

創建新的SQL查詢，複製以下代碼：

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

## 🔑 **步驟4：獲取API密鑰**

### 4.1 進入API設置
- 在左側選單中點擊 "Settings"
- 點擊 "API"

### 4.2 複製必要資訊
您會看到以下資訊：
- **Project URL**: `https://your-project-ref.supabase.co`
- **anon public key**: `your-anon-key`

請複製這兩個值，我們接下來會用到。

## 🌐 **步驟5：設置CORS**

### 5.1 在API設置頁面
- 找到 "CORS" 部分
- 添加以下域名：
  - `https://your-username.github.io` (替換為您的GitHub Pages域名)
  - `http://localhost:3000` (本地開發用)
  - `http://localhost:5500` (VS Code Live Server用)

### 5.2 保存設置
- 點擊 "Save" 保存CORS設置

## ✅ **步驟6：驗證設置**

### 6.1 檢查表是否創建成功
- 在左側選單中點擊 "Table Editor"
- 您應該能看到三個表：`students`、`scores`、`questions`

### 6.2 檢查學生資料
- 點擊 `students` 表
- 您應該能看到15個學生記錄

## 🎯 **下一步**

完成以上步驟後，請：
1. 更新 `api-supabase-client.js` 中的API密鑰
2. 使用 `test-database.html` 測試連接
3. 整合到主網站

---

**注意事項：**
- 請妥善保管您的Database Password
- API密鑰可以安全地在前端使用（anon key）
- 如果遇到問題，請檢查Supabase Dashboard中的錯誤日誌
