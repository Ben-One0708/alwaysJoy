-- AlwaysJoy 學習平台資料庫設置腳本
-- 請在 Supabase Dashboard 的 SQL Editor 中執行此腳本

-- 1. 創建 students 表
CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    group_name VARCHAR(50) NOT NULL,
    level VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 創建 scores 表
CREATE TABLE IF NOT EXISTS scores (
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

-- 3. 創建 questions 表
CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer VARCHAR(255) NOT NULL,
    category VARCHAR(50),
    difficulty VARCHAR(20),
    options JSONB DEFAULT '[]',
    image_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 創建索引
CREATE INDEX IF NOT EXISTS idx_scores_student_name ON scores(student_name);
CREATE INDEX IF NOT EXISTS idx_scores_date ON scores(date);
CREATE INDEX IF NOT EXISTS idx_scores_quiz_type ON scores(quiz_type);
CREATE INDEX IF NOT EXISTS idx_questions_category ON questions(category);
CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON questions(difficulty);

-- 5. 插入學生資料
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
('Ben', '管理員', 'Admin', 'BenBenBen', TRUE)
ON CONFLICT (name) DO NOTHING;

-- 6. 插入示例成績數據
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
('N3 Avery', 'level_practice', 85, 50, 85.00, '各級別單字練習')
ON CONFLICT DO NOTHING;

-- 7. 插入示例題目
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
('She''s angry because her brother broke her d______.', 'doll', 'vocabulary', 'easy')
ON CONFLICT DO NOTHING;

-- 8. 啟用 Row Level Security (RLS)
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

-- 9. 創建 RLS 策略
DROP POLICY IF EXISTS "Students can view own data" ON students;
CREATE POLICY "Students can view own data" ON students
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Students can view own scores" ON scores;
CREATE POLICY "Students can view own scores" ON scores
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Students can insert own scores" ON scores;
CREATE POLICY "Students can insert own scores" ON scores
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view all data" ON students;
CREATE POLICY "Admins can view all data" ON students
    FOR ALL USING (true);

DROP POLICY IF EXISTS "Admins can view all scores" ON scores;
CREATE POLICY "Admins can view all scores" ON scores
    FOR ALL USING (true);

DROP POLICY IF EXISTS "Questions are public" ON questions;
CREATE POLICY "Questions are public" ON questions
    FOR SELECT USING (true);

-- 10. 顯示設置完成訊息
SELECT 'AlwaysJoy 資料庫設置完成！' as message;
