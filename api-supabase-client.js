// Supabase客戶端API服務
class SupabaseClientService {
    constructor() {
        // 這些值需要從您的Supabase項目設置中獲取
        this.supabaseUrl = 'https://your-project-ref.supabase.co'; // 請替換
        this.supabaseKey = 'your-anon-key'; // 請替換

        // 初始化Supabase客戶端
        this.supabase = window.supabase.createClient(this.supabaseUrl, this.supabaseKey);
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
                .eq('studentName', studentName)
                .order('date', { ascending: false });

            if (error) {
                throw new Error(error.message);
            }

            return data || [];
        } catch (error) {
            console.error('獲取成績錯誤:', error);
            throw error;
        }
    }

    // 儲存成績
    async saveScore(scoreData) {
        try {
            // 確保scoreData包含必要欄位
            const scoreRecord = {
                studentName: scoreData.studentName || 'Anonymous',
                quizType: scoreData.quizType || 'unknown',
                score: scoreData.score || 0,
                totalQuestions: scoreData.totalQuestions || 0,
                percentage: scoreData.percentage || 0,
                date: scoreData.date || new Date().toISOString(),
                details: scoreData.details || {}
            };

            const { data, error } = await this.supabase
                .from('scores')
                .insert([scoreRecord])
                .select()
                .single();

            if (error) {
                throw new Error(error.message);
            }

            return { success: true, score: data };
        } catch (error) {
            console.error('儲存成績錯誤:', error);
            throw error;
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
                throw new Error(error.message);
            }

            return data || [];
        } catch (error) {
            console.error('獲取所有成績錯誤:', error);
            throw error;
        }
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

            return !error;
        } catch (error) {
            console.error('連接測試失敗:', error);
            return false;
        }
    }
}

// 創建全局API服務實例
window.apiService = new SupabaseClientService();
