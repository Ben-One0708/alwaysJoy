/**
 * SQLite 客戶端 API 服務
 * 使用 SQL.js 實現客戶端 SQLite 數據庫
 */

class SQLiteClientService {
    constructor() {
        this.db = null;
        this.isInitialized = false;
        this.initDatabase();
    }

    /**
     * 初始化 SQLite 數據庫
     */
    async initDatabase() {
        try {
            // 動態載入 SQL.js
            if (typeof initSqlJs === 'undefined') {
                const script = document.createElement('script');
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.js';
                script.onload = () => this.createDatabase();
                document.head.appendChild(script);
            } else {
                await this.createDatabase();
            }
        } catch (error) {
            console.error('SQLite 初始化失敗:', error);
        }
    }

    /**
     * 創建數據庫和表
     */
    async createDatabase() {
        try {
            const SQL = await initSqlJs({
                locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
            });

            this.db = new SQL.Database();
            
            // 創建學生表
            this.db.run(`
                CREATE TABLE IF NOT EXISTS students (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT UNIQUE NOT NULL,
                    password TEXT NOT NULL,
                    name TEXT NOT NULL,
                    group_name TEXT NOT NULL,
                    isAdmin INTEGER DEFAULT 0,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `);

            // 創建成績表
            this.db.run(`
                CREATE TABLE IF NOT EXISTS scores (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    studentName TEXT NOT NULL,
                    group_name TEXT NOT NULL,
                    quizType TEXT NOT NULL,
                    score INTEGER NOT NULL,
                    date TEXT NOT NULL,
                    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `);

            // 初始化樣本數據
            await this.initializeSampleData();
            
            this.isInitialized = true;
            console.log('SQLite 數據庫已初始化');
        } catch (error) {
            console.error('創建數據庫失敗:', error);
        }
    }

    /**
     * 初始化樣本數據
     */
    async initializeSampleData() {
        try {
            // 檢查是否已有數據
            const existingStudents = this.db.exec("SELECT COUNT(*) as count FROM students");
            if (existingStudents[0].values[0][0] > 0) {
                console.log('數據庫已有數據，跳過初始化');
                return;
            }

            // 插入樣本學生
            const sampleStudents = [
                ['ben', 'admin123', 'Ben', '管理員組', 1],
                ['annie', 'student123', 'Annie', 'A組', 0],
                ['bob', 'student123', 'Bob', 'B組', 0],
                ['cathy', 'student123', 'Cathy', 'C組', 0],
                ['david', 'student123', 'David', 'D組', 0]
            ];

            const insertStudentStmt = this.db.prepare(`
                INSERT INTO students (username, password, name, group_name, isAdmin)
                VALUES (?, ?, ?, ?, ?)
            `);

            sampleStudents.forEach(student => {
                insertStudentStmt.run(student);
            });
            insertStudentStmt.free();

            // 插入樣本成績
            const sampleScores = [
                ['Annie', 'A組', 'vocabulary', 85, '2024-01-15'],
                ['Annie', 'A組', 'magazine', 90, '2024-01-15'],
                ['Annie', 'A組', 'spelling', 88, '2024-01-15'],
                ['Bob', 'B組', 'vocabulary', 78, '2024-01-14'],
                ['Bob', 'B組', 'magazine', 82, '2024-01-14'],
                ['Cathy', 'C組', 'vocabulary', 92, '2024-01-13'],
                ['Cathy', 'C組', 'spelling', 95, '2024-01-13'],
                ['David', 'D組', 'magazine', 87, '2024-01-12'],
                ['David', 'D組', 'spelling', 89, '2024-01-12']
            ];

            const insertScoreStmt = this.db.prepare(`
                INSERT INTO scores (studentName, group_name, quizType, score, date)
                VALUES (?, ?, ?, ?, ?)
            `);

            sampleScores.forEach(score => {
                insertScoreStmt.run(score);
            });
            insertScoreStmt.free();

            console.log('樣本數據已初始化');
        } catch (error) {
            console.error('初始化樣本數據失敗:', error);
        }
    }

    /**
     * 測試連接
     */
    async testConnection() {
        try {
            if (!this.db || !this.isInitialized) {
                return false;
            }
            
            const result = this.db.exec("SELECT 1 as test");
            return result.length > 0;
        } catch (error) {
            console.error('SQLite 連接測試失敗:', error);
            return false;
        }
    }

    /**
     * 學生登入
     */
    async login(username, password) {
        try {
            if (!this.db || !this.isInitialized) {
                throw new Error('SQLite 未初始化');
            }

            const stmt = this.db.prepare(`
                SELECT id, username, name, group_name, isAdmin 
                FROM students 
                WHERE username = ? AND password = ?
            `);
            
            stmt.bind([username, password]);
            
            if (stmt.step()) {
                const row = stmt.getAsObject();
                stmt.free();
                
                return {
                    success: true,
                    student: {
                        id: row.id,
                        name: row.name,
                        group: row.group_name,
                        isAdmin: row.isAdmin === 1
                    }
                };
            } else {
                stmt.free();
                return {
                    success: false,
                    message: '帳號或密碼錯誤'
                };
            }
        } catch (error) {
            console.error('登入錯誤:', error);
            return {
                success: false,
                message: '登入失敗'
            };
        }
    }

    /**
     * 獲取所有成績
     */
    async getAllScores() {
        try {
            if (!this.db || !this.isInitialized) {
                throw new Error('SQLite 未初始化');
            }

            const result = this.db.exec(`
                SELECT id, studentName, group_name, quizType, score, date, timestamp
                FROM scores 
                ORDER BY date DESC, timestamp DESC
            `);
            
            if (result.length === 0) {
                return [];
            }

            const scores = [];
            result[0].values.forEach(row => {
                scores.push({
                    id: row[0],
                    studentName: row[1],
                    group: row[2],
                    quizType: row[3],
                    score: row[4],
                    date: row[5],
                    timestamp: row[6]
                });
            });

            return scores;
        } catch (error) {
            console.error('獲取成績錯誤:', error);
            return [];
        }
    }

    /**
     * 獲取學生成績
     */
    async getStudentScores(studentName) {
        try {
            if (!this.db || !this.isInitialized) {
                throw new Error('SQLite 未初始化');
            }

            const stmt = this.db.prepare(`
                SELECT id, studentName, group_name, quizType, score, date, timestamp
                FROM scores 
                WHERE studentName = ?
                ORDER BY date DESC, timestamp DESC
            `);
            
            stmt.bind([studentName]);
            
            const scores = [];
            while (stmt.step()) {
                const row = stmt.getAsObject();
                scores.push({
                    id: row.id,
                    studentName: row.studentName,
                    group: row.group_name,
                    quizType: row.quizType,
                    score: row.score,
                    date: row.date,
                    timestamp: row.timestamp
                });
            }
            
            stmt.free();
            return scores;
        } catch (error) {
            console.error('獲取學生成績錯誤:', error);
            return [];
        }
    }

    /**
     * 保存成績
     */
    async saveScore(studentName, group, quizType, score) {
        try {
            if (!this.db || !this.isInitialized) {
                throw new Error('SQLite 未初始化');
            }

            const date = new Date().toISOString().split('T')[0];
            const timestamp = new Date().toISOString();

            const stmt = this.db.prepare(`
                INSERT INTO scores (studentName, group_name, quizType, score, date, timestamp)
                VALUES (?, ?, ?, ?, ?, ?)
            `);
            
            stmt.run([studentName, group, quizType, score, date, timestamp]);
            const lastId = this.db.exec("SELECT last_insert_rowid()")[0].values[0][0];
            stmt.free();
            
            return {
                success: true,
                score: {
                    id: lastId,
                    studentName: studentName,
                    group: group,
                    quizType: quizType,
                    score: score,
                    date: date,
                    timestamp: timestamp
                }
            };
        } catch (error) {
            console.error('保存成績錯誤:', error);
            return {
                success: false,
                message: '保存失敗'
            };
        }
    }

    /**
     * 獲取所有學生
     */
    async getAllStudents() {
        try {
            if (!this.db || !this.isInitialized) {
                throw new Error('SQLite 未初始化');
            }

            const result = this.db.exec(`
                SELECT id, username, name, group_name, isAdmin, created_at
                FROM students 
                ORDER BY name
            `);
            
            if (result.length === 0) {
                return [];
            }

            const students = [];
            result[0].values.forEach(row => {
                students.push({
                    id: row[0],
                    username: row[1],
                    name: row[2],
                    group: row[3],
                    isAdmin: row[4] === 1,
                    created_at: row[5]
                });
            });

            return students;
        } catch (error) {
            console.error('獲取學生錯誤:', error);
            return [];
        }
    }

    /**
     * 添加學生
     */
    async addStudent(username, password, name, group) {
        try {
            if (!this.db || !this.isInitialized) {
                throw new Error('SQLite 未初始化');
            }

            const stmt = this.db.prepare(`
                INSERT INTO students (username, password, name, group_name, isAdmin)
                VALUES (?, ?, ?, ?, 0)
            `);
            
            stmt.run([username, password, name, group]);
            const lastId = this.db.exec("SELECT last_insert_rowid()")[0].values[0][0];
            stmt.free();
            
            return {
                success: true,
                student: {
                    id: lastId,
                    username: username,
                    name: name,
                    group: group,
                    isAdmin: false
                }
            };
        } catch (error) {
            console.error('添加學生錯誤:', error);
            return {
                success: false,
                message: '添加失敗'
            };
        }
    }

    /**
     * 更新學生
     */
    async updateStudent(id, username, password, name, group) {
        try {
            if (!this.db || !this.isInitialized) {
                throw new Error('SQLite 未初始化');
            }

            const stmt = this.db.prepare(`
                UPDATE students 
                SET username = ?, password = ?, name = ?, group_name = ?
                WHERE id = ?
            `);
            
            stmt.run([username, password, name, group, id]);
            stmt.free();
            
            return {
                success: true,
                message: '更新成功'
            };
        } catch (error) {
            console.error('更新學生錯誤:', error);
            return {
                success: false,
                message: '更新失敗'
            };
        }
    }

    /**
     * 刪除學生
     */
    async deleteStudent(id) {
        try {
            if (!this.db || !this.isInitialized) {
                throw new Error('SQLite 未初始化');
            }

            // 先刪除相關的成績記錄
            const deleteScoresStmt = this.db.prepare(`
                DELETE FROM scores WHERE studentName IN (
                    SELECT name FROM students WHERE id = ?
                )
            `);
            deleteScoresStmt.run([id]);
            deleteScoresStmt.free();

            // 再刪除學生
            const deleteStudentStmt = this.db.prepare(`
                DELETE FROM students WHERE id = ?
            `);
            deleteStudentStmt.run([id]);
            deleteStudentStmt.free();
            
            return {
                success: true,
                message: '刪除成功'
            };
        } catch (error) {
            console.error('刪除學生錯誤:', error);
            return {
                success: false,
                message: '刪除失敗'
            };
        }
    }

    /**
     * 刪除成績
     */
    async deleteScore(id) {
        try {
            if (!this.db || !this.isInitialized) {
                throw new Error('SQLite 未初始化');
            }

            const stmt = this.db.prepare(`
                DELETE FROM scores WHERE id = ?
            `);
            
            stmt.run([id]);
            stmt.free();
            
            return {
                success: true,
                message: '刪除成功'
            };
        } catch (error) {
            console.error('刪除成績錯誤:', error);
            return {
                success: false,
                message: '刪除失敗'
            };
        }
    }

    /**
     * 導出數據
     */
    async exportData() {
        try {
            if (!this.db || !this.isInitialized) {
                throw new Error('SQLite 未初始化');
            }

            const students = await this.getAllStudents();
            const scores = await this.getAllScores();
            
            const exportData = {
                students: students,
                scores: scores,
                exportDate: new Date().toISOString()
            };

            return {
                success: true,
                data: exportData
            };
        } catch (error) {
            console.error('導出數據錯誤:', error);
            return {
                success: false,
                message: '導出失敗'
            };
        }
    }

    /**
     * 初始化樣本數據
     */
    async initializeSampleData() {
        try {
            if (!this.db || !this.isInitialized) {
                throw new Error('SQLite 未初始化');
            }

            // 清空現有數據
            this.db.run("DELETE FROM scores");
            this.db.run("DELETE FROM students");
            this.db.run("DELETE FROM sqlite_sequence WHERE name IN ('students', 'scores')");

            // 重新初始化樣本數據
            await this.initializeSampleData();
            
            return {
                success: true,
                message: '樣本數據已重新初始化'
            };
        } catch (error) {
            console.error('初始化樣本數據錯誤:', error);
            return {
                success: false,
                message: '初始化失敗'
            };
        }
    }
}

// 創建全局實例
window.apiService = new SQLiteClientService();
