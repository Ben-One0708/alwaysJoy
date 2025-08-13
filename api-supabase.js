// Supabase API服務類
class SupabaseAPIService {
    constructor() {
        // 檢測環境並設置API基礎URL
        if (window.location.hostname === 'localhost') {
            this.baseURL = 'http://localhost:3000/api';
        } else if (window.location.hostname.includes('github.io')) {
            // GitHub Pages環境，需要指向您的後端API
            this.baseURL = 'https://your-backend-url.com/api'; // 請替換為您的後端URL
        } else {
            this.baseURL = '/api';
        }
    }

    // 學生登入
    async login(name, password) {
        try {
            const response = await fetch(`${this.baseURL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, password })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('登入錯誤:', error);
            throw error;
        }
    }

    // 獲取學生成績
    async getStudentScores(studentName) {
        try {
            const response = await fetch(`${this.baseURL}/scores/${encodeURIComponent(studentName)}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('獲取成績錯誤:', error);
            throw error;
        }
    }

    // 儲存成績
    async saveScore(scoreData) {
        try {
            const response = await fetch(`${this.baseURL}/scores`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(scoreData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('儲存成績錯誤:', error);
            throw error;
        }
    }

    // 獲取所有成績（管理員用）
    async getAllScores() {
        try {
            const response = await fetch(`${this.baseURL}/all-scores`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('獲取所有成績錯誤:', error);
            throw error;
        }
    }

    // 獲取所有學生
    async getAllStudents() {
        try {
            const response = await fetch(`${this.baseURL}/students`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('獲取學生列表錯誤:', error);
            throw error;
        }
    }

    // 獲取隨機題目
    async getRandomQuestions(count = 10, category = null, difficulty = null) {
        try {
            let url = `${this.baseURL}/questions/random?count=${count}`;
            if (category) url += `&category=${encodeURIComponent(category)}`;
            if (difficulty) url += `&difficulty=${encodeURIComponent(difficulty)}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('獲取隨機題目錯誤:', error);
            throw error;
        }
    }

    // 獲取題目分類
    async getQuestionCategories() {
        try {
            const response = await fetch(`${this.baseURL}/questions/categories`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('獲取題目分類錯誤:', error);
            throw error;
        }
    }

    // 獲取題目難度等級
    async getQuestionDifficulties() {
        try {
            const response = await fetch(`${this.baseURL}/questions/difficulties`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('獲取題目難度錯誤:', error);
            throw error;
        }
    }

    // 添加題目
    async addQuestion(questionData) {
        try {
            const response = await fetch(`${this.baseURL}/questions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(questionData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('添加題目錯誤:', error);
            throw error;
        }
    }

    // 初始化學生數據
    async initStudents() {
        try {
            const response = await fetch(`${this.baseURL}/init-students`, {
                method: 'POST'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('初始化學生數據錯誤:', error);
            throw error;
        }
    }

    // 測試連接
    async testConnection() {
        try {
            const response = await fetch(`${this.baseURL}/students`);
            return response.ok;
        } catch (error) {
            console.error('連接測試失敗:', error);
            return false;
        }
    }
}

// 創建全局API服務實例
window.apiService = new SupabaseAPIService();
