// AlwaysJoy 學習平台 - SQLite API 客戶端
// 使用本地 SQLite 資料庫，無需雲端設置

class SQLiteClientService {
    constructor() {
        this.db = null;
        this.initDatabase();
    }

    // 初始化資料庫
    async initDatabase() {
        try {
            // 等待 SQLite 資料庫初始化
            while (!window.localDB || !window.localDB.db) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            
            this.db = window.localDB;
            console.log('SQLite API 客戶端初始化成功');
        } catch (error) {
            console.error('SQLite API 客戶端初始化失敗:', error);
        }
    }

    // 學生登入
    async login(name, password) {
        try {
            await this.waitForDatabase();
            return this.db.login(name, password);
        } catch (error) {
            console.error('登入錯誤:', error);
            return { success: false, error: error.message };
        }
    }

    // 獲取學生成績
    async getStudentScores(studentName) {
        try {
            await this.waitForDatabase();
            return this.db.getStudentScores(studentName);
        } catch (error) {
            console.error('獲取成績錯誤:', error);
            return [];
        }
    }

    // 儲存成績
    async saveScore(scoreData) {
        try {
            await this.waitForDatabase();
            return this.db.saveScore(scoreData);
        } catch (error) {
            console.error('儲存成績錯誤:', error);
            return { success: false, error: error.message };
        }
    }

    // 獲取所有成績（管理員用）
    async getAllScores() {
        try {
            await this.waitForDatabase();
            return this.db.getAllScores();
        } catch (error) {
            console.error('獲取所有成績錯誤:', error);
            return [];
        }
    }

    // 獲取所有學生
    async getAllStudents() {
        try {
            await this.waitForDatabase();
            return this.db.getAllStudents();
        } catch (error) {
            console.error('獲取學生列表錯誤:', error);
            return [];
        }
    }

    // 獲取隨機題目
    async getRandomQuestions(count = 10, category = null, difficulty = null) {
        try {
            await this.waitForDatabase();
            // 這裡可以實現從 questions 表獲取隨機題目
            // 暫時返回空數組
            return [];
        } catch (error) {
            console.error('獲取隨機題目錯誤:', error);
            return [];
        }
    }

    // 獲取題目分類
    async getQuestionCategories() {
        try {
            await this.waitForDatabase();
            // 這裡可以實現從 questions 表獲取分類
            return ['vocabulary', 'grammar', 'reading'];
        } catch (error) {
            console.error('獲取題目分類錯誤:', error);
            return [];
        }
    }

    // 獲取題目難度等級
    async getQuestionDifficulties() {
        try {
            await this.waitForDatabase();
            // 這裡可以實現從 questions 表獲取難度等級
            return ['easy', 'medium', 'hard'];
        } catch (error) {
            console.error('獲取題目難度錯誤:', error);
            return [];
        }
    }

    // 添加題目
    async addQuestion(questionData) {
        try {
            await this.waitForDatabase();
            // 這裡可以實現添加題目到 questions 表
            return { success: true, question: questionData };
        } catch (error) {
            console.error('添加題目錯誤:', error);
            return { success: false, error: error.message };
        }
    }

    // 測試連接
    async testConnection() {
        try {
            await this.waitForDatabase();
            return this.db.testConnection();
        } catch (error) {
            console.error('連接測試失敗:', error);
            return false;
        }
    }

    // 匯出資料庫
    exportDatabase() {
        try {
            return this.db.exportDatabase();
        } catch (error) {
            console.error('匯出資料庫失敗:', error);
            return false;
        }
    }

    // 匯入資料庫
    async importDatabase(file) {
        try {
            await this.waitForDatabase();
            return await this.db.importDatabase(file);
        } catch (error) {
            console.error('匯入資料庫失敗:', error);
            return false;
        }
    }

    // 等待資料庫初始化
    async waitForDatabase() {
        let attempts = 0;
        while (!this.db && attempts < 50) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
        
        if (!this.db) {
            throw new Error('資料庫初始化超時');
        }
    }
}

// 創建全局 API 服務實例
window.apiService = new SQLiteClientService();
