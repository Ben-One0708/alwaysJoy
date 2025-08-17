-- 修正資料庫表結構
-- 請在Supabase SQL Editor中執行此腳本

-- 刪除現有表
DROP TABLE IF EXISTS scores;
DROP TABLE IF EXISTS students;

-- 重新創建學生表（使用正確的欄位名稱）
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    group_name VARCHAR(50) NOT NULL,
    level VARCHAR(20) NOT NULL,
    isadmin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 插入預設學生資料
INSERT INTO students (name, password, group_name, level, isadmin) VALUES
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

-- 重新創建成績表（使用正確的欄位名稱）
CREATE TABLE scores (
    id SERIAL PRIMARY KEY,
    studentname VARCHAR(100) NOT NULL,
    quiztype VARCHAR(50) NOT NULL,
    score INTEGER NOT NULL,
    totalquestions INTEGER NOT NULL,
    percentage INTEGER NOT NULL,
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    details JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 創建索引
CREATE INDEX idx_scores_student_name ON scores(studentname);
CREATE INDEX idx_scores_quiz_type ON scores(quiztype);
CREATE INDEX idx_scores_date ON scores(date);
CREATE INDEX idx_scores_student_date ON scores(studentname, date);

-- 設置安全策略
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;

-- 簡化的策略（允許所有操作）
CREATE POLICY "Allow all operations on students" ON students
    FOR ALL USING (true);

CREATE POLICY "Allow all operations on scores" ON scores
    FOR ALL USING (true);
