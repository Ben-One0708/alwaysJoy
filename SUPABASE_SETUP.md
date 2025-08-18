# Supabase 資料庫設置指南

## 1. 創建 Supabase 項目

1. 前往 [Supabase](https://supabase.com)
2. 註冊/登入帳號
3. 點擊 "New Project"
4. 填寫項目資訊：
   - **Organization**: 選擇您的組織
   - **Name**: `alwaysjoy-learning`
   - **Database Password**: 設置一個強密碼
   - **Region**: 選擇離您最近的區域（建議選擇亞洲區域）
5. 點擊 "Create new project"

## 2. 獲取 API 密鑰

1. 在項目 Dashboard 中，點擊左側選單的 "Settings"
2. 點擊 "API"
3. 複製以下資訊：
   - **Project URL**: `https://your-project-ref.supabase.co`
   - **anon public key**: `your-anon-key`

## 3. 創建資料庫表

在 Supabase Dashboard 中，點擊左側選單的 "SQL Editor"，然後執行以下 SQL 腳本：

### 創建 students 表
```sql
-- 創建學生表
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    group_name VARCHAR(50) NOT NULL,
    level VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 插入學生資料
INSERT INTO students (name, group_name, level, password, is_admin) VALUES
('C2 Yuni', 'B組', 'C2', 'yuni', FALSE),
('C2 Emily', 'B組', 'C2', 'emily', FALSE),
('A8 Vito', 'B組', 'A8', 'vito', FALSE),
('A4 Eudora', 'C組', 'A4', 'eudora', FALSE),
('A5 Zoe', 'C組', 'A5', 'zoe', FALSE),
('N6 Bruce', 'D組', 'N6', 'bruce', FALSE),
('N7 Laura', 'D組', 'N7', 'laura', FALSE),
('K9 Lilian', 'E組', 'K9', 'lilian', FALSE),
('K9 Jill', 'E組', 'K9', 'jill', FALSE),
('I2 Candy', 'F組', 'I2', 'candy', FALSE),
('N3 Avery', 'F組', 'N3', 'avery', FALSE),
('教務組 Annie', '教務組', 'Admin', 'annie', TRUE),
('教務組 Celina', '教務組', 'Admin', 'celina', TRUE),
('教務組 Nina', '教務組', 'Admin', 'nina', TRUE),
('Ben', '管理員', 'Admin', 'BenBenBen', TRUE);
```

### 創建 scores 表
```sql
-- 創建成績表
CREATE TABLE scores (
    id SERIAL PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    quiz_type VARCHAR(50) NOT NULL,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    percentage DECIMAL(5,2) NOT NULL,
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    details JSONB DEFAULT '{}',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 創建索引以提高查詢效能
CREATE INDEX idx_scores_student_name ON scores(student_name);
CREATE INDEX idx_scores_date ON scores(date);
CREATE INDEX idx_scores_quiz_type ON scores(quiz_type);

-- 插入一些示例成績數據
INSERT INTO scores (student_name, quiz_type, score, total_questions, percentage, notes) VALUES
('C2 Yuni', 'magazine_vocabulary', 85, 36, 85.00, '雜誌單字練習'),
('C2 Emily', 'magazine_vocabulary', 92, 36, 92.00, '雜誌單字練習'),
('A8 Vito', 'level_practice', 78, 50, 78.00, '各級別單字練習'),
('A4 Eudora', 'paragraph_reading', 88, 30, 88.00, '段落閱讀練習'),
('A5 Zoe', 'mixed_questions', 95, 100, 95.00, '混合題型練習'),
('N6 Bruce', 'magazine_vocabulary', 82, 36, 82.00, '雜誌單字練習'),
('N7 Laura', 'level_practice', 90, 50, 90.00, '各級別單字練習'),
('K9 Lilian', 'paragraph_reading', 87, 30, 87.00, '段落閱讀練習'),
('K9 Jill', 'mixed_questions', 93, 100, 93.00, '混合題型練習'),
('I2 Candy', 'magazine_vocabulary', 89, 36, 89.00, '雜誌單字練習'),
('N3 Avery', 'level_practice', 85, 50, 85.00, '各級別單字練習');
```

### 創建 questions 表
```sql
-- 創建題目表
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer VARCHAR(255) NOT NULL,
    category VARCHAR(50),
    difficulty VARCHAR(20),
    options JSONB DEFAULT '[]',
    image_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 插入一些示例題目
INSERT INTO questions (question, answer, category, difficulty) VALUES
('He always r___s books before bed.', 'reads', 'vocabulary', 'easy'),
('My mom likes to go for a walk at the p_____.', 'park', 'vocabulary', 'easy'),
('I usually walk my dog at the p______ in the evening.', 'park', 'vocabulary', 'easy'),
('Tom enjoys playing with his friends at the p__________.', 'playground', 'vocabulary', 'medium'),
('My favorite activity is playing seesaw at the p__________.', 'playground', 'vocabulary', 'medium'),
('He is working at the o_______ this afternoon.', 'office', 'vocabulary', 'easy'),
('You should go to the teacher''s o _______.', 'office', 'vocabulary', 'easy'),
('There are so many animals in the z ______.', 'zoo', 'vocabulary', 'easy'),
('You can see a lion in the z ______.', 'zoo', 'vocabulary', 'easy'),
('She''s angry because her brother broke her d______.', 'doll', 'vocabulary', 'easy');

-- 創建索引
CREATE INDEX idx_questions_category ON questions(category);
CREATE INDEX idx_questions_difficulty ON questions(difficulty);
```

## 4. 設置 Row Level Security (RLS)

```sql
-- 啟用 RLS
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

-- 創建策略
-- 學生可以查看自己的資料
CREATE POLICY "Students can view own data" ON students
    FOR SELECT USING (true);

-- 學生可以查看自己的成績
CREATE POLICY "Students can view own scores" ON scores
    FOR SELECT USING (true);

-- 學生可以插入自己的成績
CREATE POLICY "Students can insert own scores" ON scores
    FOR INSERT WITH CHECK (true);

-- 管理員可以查看所有資料
CREATE POLICY "Admins can view all data" ON students
    FOR ALL USING (true);

CREATE POLICY "Admins can view all scores" ON scores
    FOR ALL USING (true);

-- 題目對所有人開放
CREATE POLICY "Questions are public" ON questions
    FOR SELECT USING (true);
```

## 5. 更新 API 配置

將獲取的 API 密鑰更新到 `api-supabase-client.js` 文件中：

```javascript
// 在 api-supabase-client.js 中更新這些值
this.supabaseUrl = 'https://your-project-ref.supabase.co'; // 替換為您的 Project URL
this.supabaseKey = 'your-anon-key'; // 替換為您的 anon key
```

## 6. 設置 CORS

在 Supabase Dashboard 中：

1. 前往 "Settings" → "API"
2. 在 "CORS" 部分添加您的域名：
   - `https://ben-one0708.github.io`
   - `http://localhost:3000` (開發用)
   - `http://localhost:8000` (開發用)

## 7. 測試連接

在瀏覽器控制台中測試連接：

```javascript
// 測試資料庫連接
apiService.testConnection().then(result => {
    console.log('連接測試結果:', result);
});

// 測試獲取所有成績
apiService.getAllScores().then(scores => {
    console.log('所有成績:', scores);
});

// 測試獲取所有學生
apiService.getAllStudents().then(students => {
    console.log('所有學生:', students);
});
```

## 8. 功能測試

### 測試學生登入
```javascript
// 測試學生登入
apiService.login('C2 Yuni', 'yuni').then(result => {
    console.log('登入結果:', result);
});
```

### 測試儲存成績
```javascript
// 測試儲存成績
const testScore = {
    studentName: 'C2 Yuni',
    quizType: 'magazine_vocabulary',
    score: 85,
    totalQuestions: 36,
    percentage: 85.00,
    notes: '測試成績'
};

apiService.saveScore(testScore).then(result => {
    console.log('儲存成績結果:', result);
});
```

## 9. 安全注意事項

1. **API 密鑰安全**：
   - 不要將 API 密鑰提交到公開的 Git 倉庫
   - 考慮使用環境變數來管理密鑰

2. **資料庫安全**：
   - 定期備份資料庫
   - 監控異常訪問
   - 定期更新密碼

3. **應用程式安全**：
   - 實施適當的輸入驗證
   - 使用 HTTPS
   - 定期更新依賴項

## 10. 故障排除

### 常見問題

1. **CORS 錯誤**：
   - 在 Supabase Dashboard 中檢查 API 設置
   - 確保允許您的域名

2. **認證錯誤**：
   - 檢查 API 密鑰是否正確
   - 確認 RLS 策略設置

3. **連接超時**：
   - 檢查網路連接
   - 確認 Supabase 服務狀態

### 獲取幫助

- Supabase 文檔：https://supabase.com/docs
- Supabase 社群：https://github.com/supabase/supabase/discussions
- 技術支援：https://supabase.com/support

## 11. 部署檢查清單

- [ ] Supabase 項目已創建
- [ ] 資料庫表已創建
- [ ] 學生資料已插入
- [ ] 示例成績數據已插入
- [ ] RLS 策略已設置
- [ ] API 密鑰已更新
- [ ] CORS 設置已完成
- [ ] 連接測試通過
- [ ] 功能測試通過

---

**完成這些步驟後，您的 AlwaysJoy 學習平台將具備完整的資料庫功能！**
