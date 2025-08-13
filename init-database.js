const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/alwaysjoy',
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function initDatabase() {
    try {
        console.log('開始初始化數據庫...');

        // 創建學生表
        await pool.query(`
            CREATE TABLE IF NOT EXISTS students (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) UNIQUE NOT NULL,
                "group" VARCHAR(50) NOT NULL,
                level VARCHAR(50) NOT NULL,
                password VARCHAR(100) NOT NULL,
                "isAdmin" BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ 學生表創建成功');

        // 創建成績表
        await pool.query(`
            CREATE TABLE IF NOT EXISTS scores (
                id SERIAL PRIMARY KEY,
                "studentName" VARCHAR(100) NOT NULL,
                date DATE NOT NULL,
                scores JSONB NOT NULL,
                notes TEXT,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY ("studentName") REFERENCES students(name) ON DELETE CASCADE
            )
        `);
        console.log('✅ 成績表創建成功');

        // 創建題目表
        await pool.query(`
            CREATE TABLE IF NOT EXISTS questions (
                id SERIAL PRIMARY KEY,
                question TEXT NOT NULL,
                answer TEXT NOT NULL,
                category VARCHAR(100) NOT NULL,
                difficulty VARCHAR(50) NOT NULL,
                options JSONB,
                explanation TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ 題目表創建成功');

        // 創建索引以提高查詢性能
        await pool.query('CREATE INDEX IF NOT EXISTS idx_scores_student_name ON scores("studentName")');
        await pool.query('CREATE INDEX IF NOT EXISTS idx_scores_date ON scores(date)');
        await pool.query('CREATE INDEX IF NOT EXISTS idx_questions_category ON questions(category)');
        await pool.query('CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON questions(difficulty)');
        await pool.query('CREATE INDEX IF NOT EXISTS idx_questions_category_difficulty ON questions(category, difficulty)');
        console.log('✅ 索引創建成功');

        // 插入示例題目
        const sampleQuestions = [
            {
                question: '請填入缺少的字母：app_e (apple)',
                answer: 'l',
                category: '拼字練習',
                difficulty: '初級',
                options: ['l', 'e', 'a', 'p'],
                explanation: 'apple是蘋果的意思，缺少的字母是l'
            },
            {
                question: '請填入缺少的字母：b_ok (book)',
                answer: 'o',
                category: '拼字練習',
                difficulty: '初級',
                options: ['o', 'a', 'e', 'i'],
                explanation: 'book是書的意思，缺少的字母是o'
            },
            {
                question: '請填入缺少的字母：c_t (cat)',
                answer: 'a',
                category: '拼字練習',
                difficulty: '初級',
                options: ['a', 'e', 'i', 'o'],
                explanation: 'cat是貓的意思，缺少的字母是a'
            },
            {
                question: '請填入缺少的字母：d_g (dog)',
                answer: 'o',
                category: '拼字練習',
                difficulty: '初級',
                options: ['o', 'a', 'e', 'i'],
                explanation: 'dog是狗的意思，缺少的字母是o'
            },
            {
                question: '請填入缺少的字母：h_se (house)',
                answer: 'ou',
                category: '拼字練習',
                difficulty: '中級',
                options: ['ou', 'au', 'eu', 'oi'],
                explanation: 'house是房子的意思，缺少的字母是ou'
            }
        ];

        for (const question of sampleQuestions) {
            await pool.query(
                'INSERT INTO questions (question, answer, category, difficulty, options, explanation) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING',
                [question.question, question.answer, question.category, question.difficulty, question.options, question.explanation]
            );
        }
        console.log('✅ 示例題目插入成功');

        console.log('🎉 數據庫初始化完成！');

    } catch (error) {
        console.error('❌ 數據庫初始化失敗:', error);
    } finally {
        await pool.end();
    }
}

initDatabase();
