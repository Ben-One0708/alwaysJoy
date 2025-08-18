// Supabase客戶端API服務
class SupabaseClientService {
    constructor() {
        // 從配置文件或環境變數獲取Supabase設置
        this.supabaseUrl = this.getSupabaseUrl();
        this.supabaseKey = this.getSupabaseKey();

        // 檢查配置是否正確
        if (!this.supabaseUrl || !this.supabaseKey ||
            this.supabaseUrl.includes('your-project-ref') ||
            this.supabaseKey.includes('your-anon-key')) {
            console.error('❌ Supabase配置未設置！請檢查 supabase-config.js 文件');
            throw new Error('Supabase配置未正確設置');
        }

        // 初始化Supabase客戶端
        this.supabase = window.supabase.createClient(this.supabaseUrl, this.supabaseKey);
        console.log('✅ Supabase客戶端已初始化');
    }

    // 獲取Supabase URL
    getSupabaseUrl() {
        // 優先使用配置文件
        if (window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.PROJECT_URL) {
            return window.SUPABASE_CONFIG.PROJECT_URL;
        }

        // 備用：環境變數或默認值
        return process.env.SUPABASE_URL || 'https://your-project-ref.supabase.co';
    }

    // 獲取Supabase Key
    getSupabaseKey() {
        // 優先使用配置文件
        if (window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.ANON_KEY) {
            return window.SUPABASE_CONFIG.ANON_KEY;
        }

        // 備用：環境變數或默認值
        return process.env.SUPABASE_ANON_KEY || 'your-anon-key';
    }

    // 學生登入
    async login(name, password) {
        try {
            const { data, error } = await this.supabase
                .from('students')
                .select('*')
                .eq('name', name)
                .eq('password', password)
                .single();

            if (error) {
                throw new Error(error.message);
            }

            if (data) {
                // 將 group_name 映射為 group 以保持向後兼容
                return {
                    success: true,
                    student: {
                        name: data.name,
                        group: data.group_name || data.group,
                        level: data.level,
                        isAdmin: data.isadmin || data.isAdmin || false
                    }
                };
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
                .eq('studentname', studentName)
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
            const score = parseInt(scoreData.score) || 0;
            const totalQuestions = parseInt(scoreData.totalQuestions) || 0;
            
            // 正確計算百分比，確保不超過100%
            let percentage = 0;
            if (totalQuestions > 0) {
                percentage = Math.round((score / totalQuestions) * 100);
                // 確保百分比不超過100%
                percentage = Math.min(percentage, 100);
            }

            // 確保scoreData包含必要欄位
            const scoreRecord = {
                studentname: scoreData.studentName || 'Anonymous',
                quiztype: scoreData.quizType || 'unknown',
                score: score,
                totalquestions: totalQuestions,
                percentage: percentage,
                date: scoreData.date || new Date().toISOString(),
                details: scoreData.details || {}
            };

            // 調試：檢查計算結果
            console.log('成績儲存調試:', {
                score: score,
                totalQuestions: totalQuestions,
                calculatedPercentage: percentage,
                originalPercentage: scoreData.percentage
            });

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
                .select('*')
                .order('name');

            if (error) {
                throw new Error(error.message);
            }

            // 將 group_name 映射為 group 以保持向後兼容
            return (data || []).map(student => ({
                name: student.name,
                group: student.group_name || student.group,
                level: student.level,
                isAdmin: student.isadmin || student.isAdmin || false
            }));
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
