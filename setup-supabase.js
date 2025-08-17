// Supabase 快速設置腳本
// 這個腳本會幫助您快速設置Supabase配置

class SupabaseSetup {
    constructor() {
        this.configTemplate = `// Supabase 配置
const SUPABASE_CONFIG = {
    PROJECT_URL: 'YOUR_PROJECT_URL_HERE',
    ANON_KEY: 'YOUR_ANON_KEY_HERE',
    REGION: 'ap-southeast-1',
    PROJECT_NAME: 'alwaysjoy-education'
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SUPABASE_CONFIG;
} else {
    window.SUPABASE_CONFIG = SUPABASE_CONFIG;
}`;
    }

    // 顯示設置指南
    showSetupGuide() {
        const guide = `
🚀 Supabase 快速設置指南

📋 步驟1：創建Supabase項目
1. 前往 https://supabase.com
2. 點擊 "Start your project"
3. 創建新項目，名稱為 "alwaysjoy-education"
4. 選擇最近的區域（如 Singapore 或 Tokyo）

📋 步驟2：獲取API密鑰
1. 在項目Dashboard中點擊 "Settings" > "API"
2. 複製 Project URL 和 anon public key

📋 步驟3：設置資料庫
1. 點擊 "SQL Editor"
2. 執行以下SQL腳本（分3次執行）：

腳本1 - 學生表：
${this.getStudentsTableSQL()}

腳本2 - 成績表：
${this.getScoresTableSQL()}

腳本3 - 安全設置：
${this.getSecuritySQL()}

📋 步驟4：配置前端
1. 將 supabase-config-template.js 重命名為 supabase-config.js
2. 填入您的 Project URL 和 anon key
3. 使用 test-database.html 測試連接

📋 步驟5：設置CORS
在 Settings > API > CORS 中添加：
- https://your-username.github.io
- http://localhost:3000
- http://localhost:5500

需要我幫您執行哪個步驟？
        `;

        console.log(guide);
        return guide;
    }

    // 獲取學生表SQL
    getStudentsTableSQL() {
        return `
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
('Ben', 'BenBenBen', '管理員', 'Admin', TRUE);`;
    }

    // 獲取成績表SQL
    getScoresTableSQL() {
        return `
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

-- 創建索引
CREATE INDEX idx_scores_student_name ON scores(studentName);
CREATE INDEX idx_scores_quiz_type ON scores(quizType);
CREATE INDEX idx_scores_date ON scores(date);
CREATE INDEX idx_scores_student_date ON scores(studentName, date);`;
    }

    // 獲取安全設置SQL
    getSecuritySQL() {
        return `
-- 啟用RLS
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;

-- 學生表策略
CREATE POLICY "Students can view their own data" ON students
    FOR SELECT USING (name = current_user);

-- 成績表策略
CREATE POLICY "Students can view their own scores" ON scores
    FOR SELECT USING (studentName = current_user);

CREATE POLICY "Students can insert their own scores" ON scores
    FOR INSERT WITH CHECK (studentName = current_user);`;
    }

    // 創建配置文件
    createConfigFile(projectUrl, anonKey) {
        const config = this.configTemplate
            .replace('YOUR_PROJECT_URL_HERE', projectUrl)
            .replace('YOUR_ANON_KEY_HERE', anonKey);

        return config;
    }

    // 測試配置
    async testConfig(projectUrl, anonKey) {
        try {
            const supabase = window.supabase.createClient(projectUrl, anonKey);
            const { data, error } = await supabase
                .from('students')
                .select('count')
                .limit(1);

            if (error) {
                throw error;
            }

            return { success: true, message: '配置測試成功！' };
        } catch (error) {
            return { success: false, message: `配置測試失敗：${error.message}` };
        }
    }
}

// 創建全局設置實例
window.supabaseSetup = new SupabaseSetup();

// 顯示設置指南
console.log('🚀 Supabase設置助手已載入！');
console.log('輸入 supabaseSetup.showSetupGuide() 查看完整設置指南');
