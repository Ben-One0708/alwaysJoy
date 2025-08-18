// Supabase客戶端API服務
class SupabaseClientService {
    constructor() {
        // 這些值需要從您的Supabase項目設置中獲取
        // 請在部署前更新這些值
        this.supabaseUrl = 'https://your-project-ref.supabase.co'; // 請替換為您的 Project URL
        this.supabaseKey = 'your-anon-key'; // 請替換為您的 anon key

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
            // 檢查是否配置了 Supabase
            if (this.supabaseUrl === 'https://your-project-ref.supabase.co' ||
                this.supabaseKey === 'your-anon-key') {
                console.warn('Supabase 未配置，使用本地存儲數據');
                return this.getLocalScores().filter(score =>
                    score.student_name === studentName || score.studentName === studentName
                );
            }

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

            // 檢查是否配置了 Supabase
            if (this.supabaseUrl === 'https://your-project-ref.supabase.co' ||
                this.supabaseKey === 'your-anon-key') {
                console.warn('Supabase 未配置，使用本地存儲');
                return this.saveToLocalStorage(scoreRecord);
            }

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
            // 檢查是否配置了 Supabase
            if (this.supabaseUrl === 'https://your-project-ref.supabase.co' ||
                this.supabaseKey === 'your-anon-key') {
                console.warn('Supabase 未配置，使用本地存儲數據');
                return this.getLocalScores();
            }

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
            // 檢查是否配置了 Supabase
            if (this.supabaseUrl === 'https://your-project-ref.supabase.co' || 
                this.supabaseKey === 'your-anon-key') {
                console.warn('Supabase 未配置，使用本地模式');
                return false;
            }

            const { data, error } = await this.supabase
                .from('students')
                .select('count')
                .limit(1);

            return !error;
        } catch (error) {
            console.error('連接測試失敗:', error);
            return false;
        }
    }
}

// 創建全局API服務實例
window.apiService = new SupabaseClientService();
