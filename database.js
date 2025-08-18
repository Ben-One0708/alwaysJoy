// AlwaysJoy 學習平台 - SQLite 本地資料庫
// 使用 SQL.js 在瀏覽器中運行 SQLite

class LocalDatabase {
    constructor() {
        this.db = null;
        this.initDatabase();
    }

    // 初始化資料庫
    async initDatabase() {
        try {
            // 動態載入 SQL.js
            if (typeof SQL === 'undefined') {
                await this.loadSQLJS();
            }
            
            // 創建資料庫
            this.db = new SQL.Database();
            this.createTables();
            this.insertSampleData();
            
            console.log('SQLite 資料庫初始化成功');
        } catch (error) {
            console.error('資料庫初始化失敗:', error);
        }
    }

    // 載入 SQL.js
    async loadSQLJS() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.js';
            script.onload = () => {
                // 初始化 SQL.js
                initSqlJs({
                    locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
                }).then(SQL => {
                    window.SQL = SQL;
                    resolve();
                }).catch(reject);
            };
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    // 創建表
    createTables() {
        // 創建學生表
        this.db.run(`
            CREATE TABLE IF NOT EXISTS students (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT UNIQUE NOT NULL,
                group_name TEXT NOT NULL,
                level TEXT,
                password TEXT NOT NULL,
                is_admin BOOLEAN DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // 創建成績表
        this.db.run(`
            CREATE TABLE IF NOT EXISTS scores (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                student_name TEXT NOT NULL,
                quiz_type TEXT NOT NULL,
                score INTEGER NOT NULL,
                total_questions INTEGER NOT NULL,
                percentage REAL NOT NULL,
                date DATETIME DEFAULT CURRENT_TIMESTAMP,
                notes TEXT,
                details TEXT DEFAULT '{}'
            )
        `);

        // 創建題目表
        this.db.run(`
            CREATE TABLE IF NOT EXISTS questions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                question TEXT NOT NULL,
                answer TEXT NOT NULL,
                category TEXT,
                difficulty TEXT,
                options TEXT DEFAULT '[]',
                image_url TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log('資料庫表創建完成');
    }

    // 插入示例數據
    insertSampleData() {
        // 插入學生數據
        const students = [
            ['C2 Yuni', 'B組', 'C2', 'yuni', 0],
            ['C2 Emily', 'B組', 'C2', 'emily', 0],
            ['A8 Vito', 'B組', 'A8', 'vito', 0],
            ['A4 Eudora', 'C組', 'A4', 'eudora', 0],
            ['A5 Zoe', 'C組', 'A5', 'zoe', 0],
            ['N6 Bruce', 'D組', 'N6', 'bruce', 0],
            ['N7 Laura', 'D組', 'N7', 'laura', 0],
            ['K9 Lilian', 'E組', 'K9', 'lilian', 0],
            ['K9 Jill', 'E組', 'K9', 'jill', 0],
            ['I2 Candy', 'F組', 'I2', 'candy', 0],
            ['N3 Avery', 'F組', 'N3', 'avery', 0],
            ['教務組 Annie', '教務組', 'Admin', 'annie', 1],
            ['教務組 Celina', '教務組', 'Admin', 'celina', 1],
            ['教務組 Nina', '教務組', 'Admin', 'nina', 1],
            ['Ben', '管理員', 'Admin', 'BenBenBen', 1]
        ];

        students.forEach(student => {
            this.db.run(
                'INSERT OR IGNORE INTO students (name, group_name, level, password, is_admin) VALUES (?, ?, ?, ?, ?)',
                student
            );
        });

        // 插入示例成績
        const scores = [
            ['C2 Yuni', 'magazine_vocabulary', 85, 36, 85.00, '雜誌單字練習'],
            ['C2 Emily', 'magazine_vocabulary', 92, 36, 92.00, '雜誌單字練習'],
            ['A8 Vito', 'level_practice', 78, 50, 78.00, '各級別單字練習'],
            ['A4 Eudora', 'paragraph_reading', 88, 30, 88.00, '段落閱讀練習'],
            ['A5 Zoe', 'mixed_questions', 95, 100, 95.00, '混合題型練習'],
            ['N6 Bruce', 'magazine_vocabulary', 82, 36, 82.00, '雜誌單字練習'],
            ['N7 Laura', 'level_practice', 90, 50, 90.00, '各級別單字練習'],
            ['K9 Lilian', 'paragraph_reading', 87, 30, 87.00, '段落閱讀練習'],
            ['K9 Jill', 'mixed_questions', 93, 100, 93.00, '混合題型練習'],
            ['I2 Candy', 'magazine_vocabulary', 89, 36, 89.00, '雜誌單字練習'],
            ['N3 Avery', 'level_practice', 85, 50, 85.00, '各級別單字練習']
        ];

        scores.forEach(score => {
            this.db.run(
                'INSERT INTO scores (student_name, quiz_type, score, total_questions, percentage, notes) VALUES (?, ?, ?, ?, ?, ?)',
                score
            );
        });

        console.log('示例數據插入完成');
    }

    // 學生登入
    login(name, password) {
        try {
            const result = this.db.exec(
                'SELECT name, group_name, level, is_admin FROM students WHERE name = ? AND password = ?',
                [name, password]
            );

            if (result.length > 0 && result[0].values.length > 0) {
                const row = result[0].values[0];
                return {
                    success: true,
                    student: {
                        name: row[0],
                        group: row[1],
                        level: row[2],
                        isAdmin: row[3] === 1
                    }
                };
            } else {
                return { success: false, error: '帳號或密碼錯誤' };
            }
        } catch (error) {
            console.error('登入錯誤:', error);
            return { success: false, error: error.message };
        }
    }

    // 獲取所有成績
    getAllScores() {
        try {
            const result = this.db.exec(`
                SELECT id, student_name, quiz_type, score, total_questions, percentage, date, notes
                FROM scores 
                ORDER BY date DESC
            `);

            if (result.length > 0) {
                return result[0].values.map(row => ({
                    id: row[0],
                    student_name: row[1],
                    quiz_type: row[2],
                    score: row[3],
                    total_questions: row[4],
                    percentage: row[5],
                    date: row[6],
                    notes: row[7]
                }));
            }
            return [];
        } catch (error) {
            console.error('獲取成績錯誤:', error);
            return [];
        }
    }

    // 獲取學生成績
    getStudentScores(studentName) {
        try {
            const result = this.db.exec(
                `SELECT id, student_name, quiz_type, score, total_questions, percentage, date, notes
                 FROM scores 
                 WHERE student_name = ? 
                 ORDER BY date DESC`,
                [studentName]
            );

            if (result.length > 0) {
                return result[0].values.map(row => ({
                    id: row[0],
                    student_name: row[1],
                    quiz_type: row[2],
                    score: row[3],
                    total_questions: row[4],
                    percentage: row[5],
                    date: row[6],
                    notes: row[7]
                }));
            }
            return [];
        } catch (error) {
            console.error('獲取學生成績錯誤:', error);
            return [];
        }
    }

    // 儲存成績
    saveScore(scoreData) {
        try {
            const scoreRecord = {
                student_name: scoreData.studentName || scoreData.student_name || 'Anonymous',
                quiz_type: scoreData.quizType || scoreData.quiz_type || 'unknown',
                score: scoreData.score || 0,
                total_questions: scoreData.totalQuestions || scoreData.total_questions || 0,
                percentage: scoreData.percentage || 0,
                notes: scoreData.notes || '',
                details: JSON.stringify(scoreData.details || {})
            };

            this.db.run(
                `INSERT INTO scores (student_name, quiz_type, score, total_questions, percentage, notes, details)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                    scoreRecord.student_name,
                    scoreRecord.quiz_type,
                    scoreRecord.score,
                    scoreRecord.total_questions,
                    scoreRecord.percentage,
                    scoreRecord.notes,
                    scoreRecord.details
                ]
            );

            // 獲取插入的記錄
            const result = this.db.exec('SELECT last_insert_rowid()');
            const id = result[0].values[0][0];

            return { 
                success: true, 
                score: { ...scoreRecord, id, date: new Date().toISOString() }
            };
        } catch (error) {
            console.error('儲存成績錯誤:', error);
            return { success: false, error: error.message };
        }
    }

    // 獲取所有學生
    getAllStudents() {
        try {
            const result = this.db.exec(
                'SELECT name, group_name, level, is_admin FROM students ORDER BY name'
            );

            if (result.length > 0) {
                return result[0].values.map(row => ({
                    name: row[0],
                    group: row[1],
                    level: row[2],
                    isAdmin: row[3] === 1
                }));
            }
            return [];
        } catch (error) {
            console.error('獲取學生列表錯誤:', error);
            return [];
        }
    }

    // 測試連接
    testConnection() {
        try {
            const result = this.db.exec('SELECT COUNT(*) FROM students');
            return result.length > 0;
        } catch (error) {
            console.error('連接測試失敗:', error);
            return false;
        }
    }

    // 匯出資料庫
    exportDatabase() {
        try {
            const data = this.db.export();
            const blob = new Blob([data], { type: 'application/x-sqlite3' });
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `alwaysjoy_database_${new Date().toISOString().split('T')[0]}.db`;
            link.click();
            
            URL.revokeObjectURL(url);
            return true;
        } catch (error) {
            console.error('匯出資料庫失敗:', error);
            return false;
        }
    }

    // 匯入資料庫
    importDatabase(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = new Uint8Array(e.target.result);
                    this.db = new SQL.Database(data);
                    console.log('資料庫匯入成功');
                    resolve(true);
                } catch (error) {
                    console.error('資料庫匯入失敗:', error);
                    reject(error);
                }
            };
            reader.readAsArrayBuffer(file);
        });
    }
}

// 創建全局資料庫實例
window.localDB = new LocalDatabase();
