// Supabase客戶端API服務
class SupabaseClientService {
    constructor() {
        // Supabase 配置
        this.supabaseUrl = 'https://cxdzsefbblkadblxzhddga.supabase.co';
        this.supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4ZHNlZmJsa2FkYmx4emhkZGdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzNTU1ODgsImV4cCI6MjA3MDkzMTU4OH0.Q_xlceGEBytHRc5zD2dgIlu-5Y8RIE9cJUD9Uvqo0z4';

        // 初始化Supabase客戶端
        this.supabase = window.supabase.createClient(this.supabaseUrl, this.supabaseKey);

        // 測試連接
        this.testConnection().then(isConnected => {
            if (!isConnected) {
                console.warn('Supabase 連接失敗，請檢查配置');
            } else {
                console.log('Supabase 連接成功');
            }
        });
    }

    // 學生登入
    async login(name, password) {
        try {
            const { data, error } = await this.supabase
                .from('students')
                .select('name, group, level, isAdmin')
                .eq('name', name)
                .eq('password', password)
                .single();

            if (error) {
                throw new Error(error.message);
            }

            if (data) {
                return { success: true, student: data };
            } else {
                return { success: false, error: '帳號或密碼錯誤' };
            }
        } catch (error) {
            console.error('登入錯誤:', error);
            throw error;
        }
    }

    // 獲取學生成績
    async getStudentScores(studentName) {
        try {
            const { data, error } = await this.supabase
                .from('scores')
                .select('*')
                .eq('student_name', studentName)
                .order('date', { ascending: false });

            if (error) {
                console.warn('Supabase 查詢失敗，使用本地存儲數據:', error);
                return this.getLocalScores().filter(score =>
                    score.student_name === studentName || score.studentName === studentName
                );
            }

            return data || [];
        } catch (error) {
            console.error('獲取成績錯誤:', error);
            console.log('使用本地存儲作為備用方案');
            return this.getLocalScores().filter(score =>
                score.student_name === studentName || score.studentName === studentName
            );
        }
    }

    // 儲存成績
    async saveScore(scoreData) {
        try {
            // 確保scoreData包含必要欄位
            const scoreRecord = {
                student_name: scoreData.studentName || scoreData.student_name || 'Anonymous',
                quiz_type: scoreData.quizType || scoreData.quiz_type || 'unknown',
                score: scoreData.score || 0,
                total_questions: scoreData.totalQuestions || scoreData.total_questions || 0,
                percentage: scoreData.percentage || 0,
                date: scoreData.date || new Date().toISOString(),
                notes: scoreData.notes || '',
                details: scoreData.details || {}
            };

            const { data, error } = await this.supabase
                .from('scores')
                .insert([scoreRecord])
                .select()
                .single();

            if (error) {
                console.warn('Supabase 儲存失敗，使用本地存儲:', error);
                return this.saveToLocalStorage(scoreRecord);
            }

            // 同時保存到本地存儲作為備用
            this.saveToLocalStorage(scoreRecord);

            return { success: true, score: data };
        } catch (error) {
            console.error('儲存成績錯誤:', error);
            console.log('使用本地存儲作為備用方案');
            return this.saveToLocalStorage(scoreRecord);
        }
    }

    // 保存到本地存儲
    saveToLocalStorage(scoreRecord) {
        try {
            const key = `score_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            localStorage.setItem(key, JSON.stringify(scoreRecord));
            console.log('成績已保存到本地存儲:', key);
            return { success: true, score: { ...scoreRecord, id: key } };
        } catch (error) {
            console.error('本地存儲失敗:', error);
            return { success: false, error: '本地存儲失敗' };
        }
    }

    // 獲取所有成績（管理員用）
    async getAllScores() {
        try {
            const { data, error } = await this.supabase
                .from('scores')
                .select('*')
                .order('date', { ascending: false });

            if (error) {
                console.warn('Supabase 查詢失敗，使用本地存儲數據:', error);
                return this.getLocalScores();
            }

            return data || [];
        } catch (error) {
            console.error('獲取所有成績錯誤:', error);
            console.log('使用本地存儲作為備用方案');
            return this.getLocalScores();
        }
    }

    // 獲取本地存儲的成績（備用方案）
    getLocalScores() {
        const scores = [];

        // 從 localStorage 獲取成績數據
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('score_')) {
                try {
                    const scoreData = JSON.parse(localStorage.getItem(key));
                    // 轉換為標準格式
                    const score = {
                        id: key,
                        student_name: scoreData.studentName || scoreData.student_name || 'Unknown',
                        quiz_type: scoreData.quizType || scoreData.quiz_type || 'unknown',
                        score: scoreData.score || 0,
                        total_questions: scoreData.totalQuestions || scoreData.total_questions || 0,
                        percentage: scoreData.percentage || 0,
                        date: scoreData.date || new Date().toISOString(),
                        notes: scoreData.notes || '',
                        details: scoreData.details || {}
                    };
                    scores.push(score);
                } catch (e) {
                    console.error('解析本地成績數據失敗:', e);
                }
            }
        }

        // 按日期排序
        return scores.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    // 獲取所有學生
    async getAllStudents() {
        try {
            const { data, error } = await this.supabase
                .from('students')
                .select('name, group, level, isAdmin')
                .order('name');

            if (error) {
                throw new Error(error.message);
            }

            return data || [];
        } catch (error) {
            console.error('獲取學生列表錯誤:', error);
            throw error;
        }
    }

    // 獲取隨機題目
    async getRandomQuestions(count = 10, category = null, difficulty = null) {
        try {
            let query = this.supabase
                .from('questions')
                .select('*');

            if (category) {
                query = query.eq('category', category);
            }

            if (difficulty) {
                query = query.eq('difficulty', difficulty);
            }

            const { data, error } = await query
                .limit(count);

            if (error) {
                throw new Error(error.message);
            }

            // 在客戶端隨機排序
            return (data || []).sort(() => Math.random() - 0.5);
        } catch (error) {
            console.error('獲取隨機題目錯誤:', error);
            throw error;
        }
    }

    // 獲取題目分類
    async getQuestionCategories() {
        try {
            const { data, error } = await this.supabase
                .from('questions')
                .select('category')
                .order('category');

            if (error) {
                throw new Error(error.message);
            }

            // 去重並返回唯一分類
            const categories = [...new Set(data.map(item => item.category))];
            return categories;
        } catch (error) {
            console.error('獲取題目分類錯誤:', error);
            throw error;
        }
    }

    // 獲取題目難度等級
    async getQuestionDifficulties() {
        try {
            const { data, error } = await this.supabase
                .from('questions')
                .select('difficulty')
                .order('difficulty');

            if (error) {
                throw new Error(error.message);
            }

            // 去重並返回唯一難度
            const difficulties = [...new Set(data.map(item => item.difficulty))];
            return difficulties;
        } catch (error) {
            console.error('獲取題目難度錯誤:', error);
            throw error;
        }
    }

    // 添加題目
    async addQuestion(questionData) {
        try {
            const { data, error } = await this.supabase
                .from('questions')
                .insert([questionData])
                .select()
                .single();

            if (error) {
                throw new Error(error.message);
            }

            return { success: true, question: data };
        } catch (error) {
            console.error('添加題目錯誤:', error);
            throw error;
        }
    }

    // 測試連接
    async testConnection() {
        try {
            const { data, error } = await this.supabase
                .from('students')
                .select('count')
                .limit(1);

            if (error) {
                console.warn('Supabase 連接測試失敗:', error);
                return false;
            }

            console.log('Supabase 連接測試成功');
            return true;
        } catch (error) {
            console.error('連接測試失敗:', error);
            return false;
        }
    }
}

// 創建全局API服務實例
window.apiService = new SupabaseClientService();
