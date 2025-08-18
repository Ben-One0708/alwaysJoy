/**
 * Firebase API 客戶端
 * 使用 Firebase Firestore 作為後端數據庫
 */
class FirebaseClientService {
    constructor() {
        // Firebase 配置
        this.config = {
            apiKey: "AIzaSyBlQm3N1f8gno83eMExUhf_ArLqZShXLj0",
            authDomain: "alwaysjoy-1872b.firebaseapp.com",
            projectId: "alwaysjoy-1872b",
            storageBucket: "alwaysjoy-1872b.firebasestorage.app",
            messagingSenderId: "838707106957",
            appId: "1:838707106957:web:1946b429778966711fbec4",
            measurementId: "G-4BLLQG8DND"
        };

        // 初始化 Firebase
        if (typeof firebase !== 'undefined') {
            firebase.initializeApp(this.config);
            this.db = firebase.firestore();
            console.log('Firebase 已初始化');
        } else {
            console.error('Firebase SDK 未載入');
        }
    }

    /**
     * 測試連接
     */
    async testConnection() {
        try {
            if (!this.db) {
                return false;
            }

            // 嘗試讀取一個測試文檔
            const testDoc = await this.db.collection('test').doc('connection').get();
            return true;
        } catch (error) {
            console.error('Firebase 連接測試失敗:', error);
            return false;
        }
    }

    /**
     * 學生登入
     */
    async login(username, password) {
        try {
            if (!this.db) {
                throw new Error('Firebase 未初始化');
            }

            // 從 Firestore 查詢學生
            const studentsRef = this.db.collection('students');
            const query = await studentsRef.where('username', '==', username).get();

            if (query.empty) {
                return {
                    success: false,
                    message: '帳號不存在'
                };
            }

            const studentDoc = query.docs[0];
            const studentData = studentDoc.data();

            if (studentData.password === password) {
                return {
                    success: true,
                    student: {
                        id: studentDoc.id,
                        name: studentData.name,
                        group: studentData.group,
                        isAdmin: studentData.isAdmin || false
                    }
                };
            } else {
                return {
                    success: false,
                    message: '密碼錯誤'
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
            if (!this.db) {
                throw new Error('Firebase 未初始化');
            }

            const scoresRef = this.db.collection('scores');
            const snapshot = await scoresRef.orderBy('date', 'desc').get();

            const scores = [];
            snapshot.forEach(doc => {
                scores.push({
                    id: doc.id,
                    ...doc.data()
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
            if (!this.db) {
                throw new Error('Firebase 未初始化');
            }

            const scoresRef = this.db.collection('scores');
            const query = await scoresRef.where('studentName', '==', studentName).orderBy('date', 'desc').get();

            const scores = [];
            query.forEach(doc => {
                scores.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

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
            if (!this.db) {
                throw new Error('Firebase 未初始化');
            }

            const scoreData = {
                studentName: studentName,
                group: group,
                quizType: quizType,
                score: score,
                date: new Date().toISOString().split('T')[0],
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            };

            const docRef = await this.db.collection('scores').add(scoreData);

            return {
                success: true,
                score: {
                    id: docRef.id,
                    ...scoreData
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
            if (!this.db) {
                throw new Error('Firebase 未初始化');
            }

            const studentsRef = this.db.collection('students');
            const snapshot = await studentsRef.orderBy('name').get();

            const students = [];
            snapshot.forEach(doc => {
                students.push({
                    id: doc.id,
                    ...doc.data()
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
    async addStudent(studentData) {
        try {
            if (!this.db) {
                throw new Error('Firebase 未初始化');
            }

            const docRef = await this.db.collection('students').add(studentData);
            return {
                success: true,
                studentId: docRef.id
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
    async updateStudent(studentId, updateData) {
        try {
            if (!this.db) {
                throw new Error('Firebase 未初始化');
            }

            await this.db.collection('students').doc(studentId).update(updateData);
            return {
                success: true
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
    async deleteStudent(studentId) {
        try {
            if (!this.db) {
                throw new Error('Firebase 未初始化');
            }

            await this.db.collection('students').doc(studentId).delete();
            return {
                success: true
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
    async deleteScore(scoreId) {
        try {
            if (!this.db) {
                throw new Error('Firebase 未初始化');
            }

            await this.db.collection('scores').doc(scoreId).delete();
            return {
                success: true
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
            const [students, scores] = await Promise.all([
                this.getAllStudents(),
                this.getAllScores()
            ]);

            const data = {
                students: students,
                scores: scores,
                exportDate: new Date().toISOString()
            };

            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `alwaysjoy_firebase_data_${new Date().toISOString().split('T')[0]}.json`;
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
     * 初始化示例數據
     */
    async initializeSampleData() {
        try {
            if (!this.db) {
                throw new Error('Firebase 未初始化');
            }

            // 檢查是否已有數據
            const studentsSnapshot = await this.db.collection('students').get();
            if (!studentsSnapshot.empty) {
                console.log('數據已存在，跳過初始化');
                return true;
            }

            // 添加示例學生
            const sampleStudents = [
                { username: 'C2 Yuni', password: 'yuni', name: 'Yuni', group: 'B組' },
                { username: 'C2 Emily', password: 'emily', name: 'Emily', group: 'B組' },
                { username: 'A8 Vito', password: 'vito', name: 'Vito', group: 'B組' },
                { username: 'A4 Eudora', password: 'eudora', name: 'Eudora', group: 'C組' },
                { username: 'A5 Zoe', password: 'zoe', name: 'Zoe', group: 'C組' },
                { username: 'N6 Bruce', password: 'bruce', name: 'Bruce', group: 'D組' },
                { username: 'N7 Laura', password: 'laura', name: 'Laura', group: 'D組' },
                { username: 'K9 Lilian', password: 'lilian', name: 'Lilian', group: 'E組' },
                { username: 'K9 Jill', password: 'jill', name: 'Jill', group: 'E組' },
                { username: 'I2 Candy', password: 'candy', name: 'Candy', group: 'F組' },
                { username: 'N3 Avery', password: 'avery', name: 'Avery', group: 'F組' },
                { username: '教務組 Annie', password: 'annie', name: 'Annie', group: '教務組' },
                { username: '教務組 Celina', password: 'celina', name: 'Celina', group: '教務組' },
                { username: '教務組 Nina', password: 'nina', name: 'Nina', group: '教務組' },
                { username: 'Ben', password: 'BenBenBen', name: 'Ben', group: '管理員', isAdmin: true }
            ];

            // 批量添加學生
            const batch = this.db.batch();
            sampleStudents.forEach(student => {
                const docRef = this.db.collection('students').doc();
                batch.set(docRef, student);
            });

            await batch.commit();
            console.log('示例學生數據已初始化');

            // 添加示例成績
            const sampleScores = [
                { studentName: 'Yuni', group: 'B組', quizType: '雜誌單字', score: 85, date: '2024-01-15' },
                { studentName: 'Emily', group: 'B組', quizType: '各級別單字', score: 92, date: '2024-01-15' },
                { studentName: 'Vito', group: 'B組', quizType: '段落單字', score: 78, date: '2024-01-15' },
                { studentName: 'Eudora', group: 'C組', quizType: '混合題型', score: 88, date: '2024-01-15' },
                { studentName: 'Zoe', group: 'C組', quizType: '大批次題目', score: 95, date: '2024-01-15' }
            ];

            const scoreBatch = this.db.batch();
            sampleScores.forEach(score => {
                const docRef = this.db.collection('scores').doc();
                scoreBatch.set(docRef, {
                    ...score,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
            });

            await scoreBatch.commit();
            console.log('示例成績數據已初始化');

            return true;
        } catch (error) {
            console.error('初始化示例數據錯誤:', error);
            return false;
        }
    }
}

// 創建全局實例
const apiService = new FirebaseClientService();
