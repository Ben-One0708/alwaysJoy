/**
 * 本地存儲 API 客戶端
 * 使用瀏覽器本地存儲來保存數據，無需後端服務器
 */
class LocalStorageClientService {
    constructor() {
        this.storageKey = 'alwaysjoy_data';
        this.initializeData();
        console.log('本地存儲 API 客戶端已初始化');
    }

    /**
     * 初始化本地數據
     */
    initializeData() {
        const existingData = localStorage.getItem(this.storageKey);
        if (!existingData) {
            // 創建初始數據結構
            const initialData = {
                students: [
                    { id: 1, username: 'C2 Yuni', password: 'yuni', name: 'Yuni', group: 'B組' },
                    { id: 2, username: 'C2 Emily', password: 'emily', name: 'Emily', group: 'B組' },
                    { id: 3, username: 'A8 Vito', password: 'vito', name: 'Vito', group: 'B組' },
                    { id: 4, username: 'A4 Eudora', password: 'eudora', name: 'Eudora', group: 'C組' },
                    { id: 5, username: 'A5 Zoe', password: 'zoe', name: 'Zoe', group: 'C組' },
                    { id: 6, username: 'N6 Bruce', password: 'bruce', name: 'Bruce', group: 'D組' },
                    { id: 7, username: 'N7 Laura', password: 'laura', name: 'Laura', group: 'D組' },
                    { id: 8, username: 'K9 Lilian', password: 'lilian', name: 'Lilian', group: 'E組' },
                    { id: 9, username: 'K9 Jill', password: 'jill', name: 'Jill', group: 'E組' },
                    { id: 10, username: 'I2 Candy', password: 'candy', name: 'Candy', group: 'F組' },
                    { id: 11, username: 'N3 Avery', password: 'avery', name: 'Avery', group: 'F組' },
                    { id: 12, username: '教務組 Annie', password: 'annie', name: 'Annie', group: '教務組' },
                    { id: 13, username: '教務組 Celina', password: 'celina', name: 'Celina', group: '教務組' },
                    { id: 14, username: '教務組 Nina', password: 'nina', name: 'Nina', group: '教務組' },
                    { id: 15, username: 'Ben', password: 'BenBenBen', name: 'Ben', group: '管理員', isAdmin: true }
                ],
                scores: [
                    { id: 1, studentName: 'Yuni', group: 'B組', quizType: '雜誌單字', score: 85, date: '2024-01-15' },
                    { id: 2, studentName: 'Emily', group: 'B組', quizType: '各級別單字', score: 92, date: '2024-01-15' },
                    { id: 3, studentName: 'Vito', group: 'B組', quizType: '段落單字', score: 78, date: '2024-01-15' },
                    { id: 4, studentName: 'Eudora', group: 'C組', quizType: '混合題型', score: 88, date: '2024-01-15' },
                    { id: 5, studentName: 'Zoe', group: 'C組', quizType: '大批次題目', score: 95, date: '2024-01-15' },
                    { id: 6, studentName: 'Bruce', group: 'D組', quizType: '雜誌單字', score: 82, date: '2024-01-16' },
                    { id: 7, studentName: 'Laura', group: 'D組', quizType: '各級別單字', score: 89, date: '2024-01-16' },
                    { id: 8, studentName: 'Lilian', group: 'E組', quizType: '段落單字', score: 91, date: '2024-01-16' },
                    { id: 9, studentName: 'Jill', group: 'E組', quizType: '混合題型', score: 87, date: '2024-01-16' },
                    { id: 10, studentName: 'Candy', group: 'F組', quizType: '大批次題目', score: 93, date: '2024-01-17' },
                    { id: 11, studentName: 'Avery', group: 'F組', quizType: '雜誌單字', score: 86, date: '2024-01-17' },
                    { id: 12, studentName: 'Annie', group: '教務組', quizType: '各級別單字', score: 90, date: '2024-01-17' },
                    { id: 13, studentName: 'Celina', group: '教務組', quizType: '段落單字', score: 84, date: '2024-01-17' },
                    { id: 14, studentName: 'Nina', group: '教務組', quizType: '混合題型', score: 88, date: '2024-01-17' }
                ]
            };
            localStorage.setItem(this.storageKey, JSON.stringify(initialData));
        }
    }

    /**
     * 獲取所有數據
     */
    getData() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : { students: [], scores: [] };
    }

    /**
     * 保存數據
     */
    saveData(data) {
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    /**
     * 測試連接
     */
    async testConnection() {
        try {
            const data = this.getData();
            return data.students.length > 0;
        } catch (error) {
            console.error('本地存儲測試失敗:', error);
            return false;
        }
    }

    /**
     * 學生登入
     */
    async login(username, password) {
        try {
            const data = this.getData();
            const student = data.students.find(s =>
                s.username === username && s.password === password
            );

            if (student) {
                return {
                    success: true,
                    student: {
                        id: student.id,
                        name: student.name,
                        group: student.group,
                        isAdmin: student.isAdmin || false
                    }
                };
            } else {
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
            const data = this.getData();
            return data.scores || [];
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
            const data = this.getData();
            return data.scores.filter(score => score.studentName === studentName) || [];
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
            const data = this.getData();
            const newScore = {
                id: Date.now(),
                studentName: studentName,
                group: group,
                quizType: quizType,
                score: score,
                date: new Date().toISOString().split('T')[0]
            };

            data.scores.push(newScore);
            this.saveData(data);

            return {
                success: true,
                score: newScore
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
            const data = this.getData();
            return data.students || [];
        } catch (error) {
            console.error('獲取學生錯誤:', error);
            return [];
        }
    }

    /**
     * 導出數據
     */
    exportData() {
        try {
            const data = this.getData();
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `alwaysjoy_data_${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            return true;
        } catch (error) {
            console.error('導出數據錯誤:', error);
            return false;
        }
    }

    /**
     * 導入數據
     */
    importData(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    this.saveData(data);
                    resolve(true);
                } catch (error) {
                    console.error('導入數據錯誤:', error);
                    reject(error);
                }
            };
            reader.readAsText(file);
        });
    }

    /**
     * 清除所有數據
     */
    clearAllData() {
        try {
            localStorage.removeItem(this.storageKey);
            this.initializeData();
            return true;
        } catch (error) {
            console.error('清除數據錯誤:', error);
            return false;
        }
    }
}

// 創建全局實例
const apiService = new LocalStorageClientService();
