const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 中間件
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // 服務靜態文件

// PostgreSQL連接
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/alwaysjoy',
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// 測試數據庫連接
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('PostgreSQL連接錯誤:', err);
    } else {
        console.log('PostgreSQL連接成功！');
    }
});

// API路由

// 獲取所有學生
app.get('/api/students', async (req, res) => {
    try {
        const result = await pool.query('SELECT name, "group", level, "isAdmin" FROM students ORDER BY name');
        res.json(result.rows);
    } catch (error) {
        console.error('獲取學生列表失敗:', error);
        res.status(500).json({ error: '獲取學生列表失敗' });
    }
});

// 學生登入
app.post('/api/login', async (req, res) => {
    try {
        const { name, password } = req.body;
        const result = await pool.query(
            'SELECT name, "group", level, "isAdmin" FROM students WHERE name = $1 AND password = $2',
            [name, password]
        );
        
        if (result.rows.length > 0) {
            res.json({ 
                success: true, 
                student: result.rows[0]
            });
        } else {
            res.status(401).json({ success: false, error: '帳號或密碼錯誤' });
        }
    } catch (error) {
        console.error('登入失敗:', error);
        res.status(500).json({ error: '登入失敗' });
    }
});

// 獲取學生成績
app.get('/api/scores/:studentName', async (req, res) => {
    try {
        const { studentName } = req.params;
        const result = await pool.query(
            'SELECT * FROM scores WHERE "studentName" = $1 ORDER BY date DESC',
            [studentName]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('獲取成績失敗:', error);
        res.status(500).json({ error: '獲取成績失敗' });
    }
});

// 儲存成績
app.post('/api/scores', async (req, res) => {
    try {
        const { studentName, date, scores, notes } = req.body;
        const result = await pool.query(
            'INSERT INTO scores ("studentName", date, scores, notes) VALUES ($1, $2, $3, $4) RETURNING *',
            [studentName, date, scores, notes]
        );
        res.json({ success: true, score: result.rows[0] });
    } catch (error) {
        console.error('儲存成績失敗:', error);
        res.status(500).json({ error: '儲存成績失敗' });
    }
});

// 獲取所有成績（管理員用）
app.get('/api/all-scores', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM scores ORDER BY date DESC');
        res.json(result.rows);
    } catch (error) {
        console.error('獲取所有成績失敗:', error);
        res.status(500).json({ error: '獲取所有成績失敗' });
    }
});

// 題目相關API

// 獲取隨機題目
app.get('/api/questions/random', async (req, res) => {
    try {
        const { count = 10, category, difficulty } = req.query;
        let query = 'SELECT * FROM questions WHERE 1=1';
        const params = [];
        let paramCount = 0;

        if (category) {
            paramCount++;
            query += ` AND category = $${paramCount}`;
            params.push(category);
        }

        if (difficulty) {
            paramCount++;
            query += ` AND difficulty = $${paramCount}`;
            params.push(difficulty);
        }

        query += ` ORDER BY RANDOM() LIMIT $${paramCount + 1}`;
        params.push(parseInt(count));

        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (error) {
        console.error('獲取隨機題目失敗:', error);
        res.status(500).json({ error: '獲取隨機題目失敗' });
    }
});

// 獲取題目分類
app.get('/api/questions/categories', async (req, res) => {
    try {
        const result = await pool.query('SELECT DISTINCT category FROM questions ORDER BY category');
        res.json(result.rows.map(row => row.category));
    } catch (error) {
        console.error('獲取題目分類失敗:', error);
        res.status(500).json({ error: '獲取題目分類失敗' });
    }
});

// 獲取題目難度等級
app.get('/api/questions/difficulties', async (req, res) => {
    try {
        const result = await pool.query('SELECT DISTINCT difficulty FROM questions ORDER BY difficulty');
        res.json(result.rows.map(row => row.difficulty));
    } catch (error) {
        console.error('獲取題目難度失敗:', error);
        res.status(500).json({ error: '獲取題目難度失敗' });
    }
});

// 添加題目
app.post('/api/questions', async (req, res) => {
    try {
        const { question, answer, category, difficulty, options, explanation } = req.body;
        const result = await pool.query(
            'INSERT INTO questions (question, answer, category, difficulty, options, explanation) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [question, answer, category, difficulty, options, explanation]
        );
        res.json({ success: true, question: result.rows[0] });
    } catch (error) {
        console.error('添加題目失敗:', error);
        res.status(500).json({ error: '添加題目失敗' });
    }
});

// 初始化學生數據
app.post('/api/init-students', async (req, res) => {
    try {
        const studentsData = [
            ['C2 Yuni', 'B組', 'C2', 'Yuni', false],
            ['C2 Emily', 'B組', 'C2', 'Emily', false],
            ['A8 Vito', 'B組', 'A8', 'Vito', false],
            ['A4 Eudora', 'C組', 'A4', 'Eudora', false],
            ['A5 Zoe', 'C組', 'A5', 'Zoe', false],
            ['N6 Bruce', 'D組', 'N6', 'Bruce', false],
            ['N7 Laura', 'D組', 'N7', 'Laura', false],
            ['K9 Lilian', 'E組', 'K9', 'Lilian', false],
            ['K9 Jill', 'E組', 'K9', 'Jill', false],
            ['I2 Candy', 'F組', 'I2', 'Candy', false],
            ['N3 Avery', 'F組', 'N3', 'Avery', false],
            ['教務組 Annie', '教務組', 'Admin', 'Annie', false],
            ['教務組 Celina', '教務組', 'Admin', 'Celina', false],
            ['教務組 Nina', '教務組', 'Admin', 'Nina', false],
            ['Ben', '管理員', 'Admin', 'BenBenBen', true]
        ];

        // 清空現有數據
        await pool.query('DELETE FROM students');
        
        // 插入新數據
        for (const student of studentsData) {
            await pool.query(
                'INSERT INTO students (name, "group", level, password, "isAdmin") VALUES ($1, $2, $3, $4, $5)',
                student
            );
        }
        
        res.json({ success: true, message: '學生數據初始化成功' });
    } catch (error) {
        console.error('初始化學生數據失敗:', error);
        res.status(500).json({ error: '初始化學生數據失敗' });
    }
});

// 啟動伺服器
app.listen(PORT, () => {
    console.log(`伺服器運行在 http://localhost:${PORT}`);
});
