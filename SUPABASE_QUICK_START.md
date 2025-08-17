# 🚀 Supabase 快速開始指南

## 📋 **概述**

這個指南將幫助您在5分鐘內完成Supabase資料庫設置，為您的拼字練習平台提供完整的後端支援。

## 🎯 **快速設置步驟**

### **方法1：使用互動式設置助手（推薦）**

1. **打開設置助手**：
   ```
   在瀏覽器中打開 supabase-setup.html
   ```

2. **按照步驟操作**：
   - 創建Supabase項目
   - 獲取API密鑰
   - 執行SQL腳本
   - 設置CORS
   - 生成配置文件

3. **測試連接**：
   ```
   打開 test-database.html 測試所有功能
   ```

### **方法2：手動設置**

#### **步驟1：創建Supabase項目**
1. 前往 [https://supabase.com](https://supabase.com)
2. 點擊 "Start your project"
3. 創建項目：`alwaysjoy-education`
4. 選擇區域：`Southeast Asia (Singapore)`

#### **步驟2：獲取API密鑰**
1. 在Dashboard中點擊 "Settings" > "API"
2. 複製 Project URL 和 anon public key

#### **步驟3：設置資料庫**
1. 點擊 "SQL Editor"
2. 執行以下三個SQL腳本：

**腳本1：學生表**
```sql
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    group_name VARCHAR(50) NOT NULL,
    level VARCHAR(20) NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO students (name, password, group_name, level, isAdmin) VALUES
('C2 Yuni', 'Yuni', 'B組', 'C2', FALSE),
('C2 Emily', 'Emily', 'B組', 'C2', FALSE),
('A8 Vito', 'Vito', 'B組', 'A8', FALSE),
('A4 Eudora', 'Eudora', 'C組', 'A4', FALSE),
('A5 Zoe', 'Zoe', 'C組', 'A5', FALSE),
('N6 Bruce', 'Bruce', 'D組', 'N6', FALSE),
('N7 Laura', 'Laura', 'D組', 'N7', FALSE),
('K9 Lilian', 'Lilian', 'E組', 'K9', FALSE),
('K9 Jill', 'Jill', 'E組', 'K9', FALSE),
('I2 Candy', 'Candy', 'F組', 'I2', FALSE),
('N3 Avery', 'Avery', 'F組', 'N3', FALSE),
('教務組 Annie', 'Annie', '教務組', 'Admin', FALSE),
('教務組 Celina', 'Celina', '教務組', 'Admin', FALSE),
('教務組 Nina', 'Nina', '教務組', 'Admin', FALSE),
('Ben', 'BenBenBen', '管理員', 'Admin', TRUE);
```

**腳本2：成績表**
```sql
CREATE TABLE scores (
    id SERIAL PRIMARY KEY,
    studentName VARCHAR(100) NOT NULL,
    quizType VARCHAR(50) NOT NULL,
    score INTEGER NOT NULL,
    totalQuestions INTEGER NOT NULL,
    percentage INTEGER NOT NULL,
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    details JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_scores_student_name ON scores(studentName);
CREATE INDEX idx_scores_quiz_type ON scores(quizType);
CREATE INDEX idx_scores_date ON scores(date);
CREATE INDEX idx_scores_student_date ON scores(studentName, date);
```

**腳本3：安全設置**
```sql
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their own data" ON students
    FOR SELECT USING (name = current_user);

CREATE POLICY "Students can view their own scores" ON scores
    FOR SELECT USING (studentName = current_user);

CREATE POLICY "Students can insert their own scores" ON scores
    FOR INSERT WITH CHECK (studentName = current_user);
```

#### **步驟4：設置CORS**
1. 在 "Settings" > "API" > "CORS" 中添加：
   ```
   https://your-username.github.io
   http://localhost:3000
   http://localhost:5500
   ```

#### **步驟5：配置前端**
1. 將 `supabase-config-template.js` 重命名為 `supabase-config.js`
2. 填入您的 Project URL 和 anon key：

```javascript
const SUPABASE_CONFIG = {
    PROJECT_URL: 'https://your-project-ref.supabase.co',
    ANON_KEY: 'your-anon-key-here',
    REGION: 'ap-southeast-1',
    PROJECT_NAME: 'alwaysjoy-education'
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SUPABASE_CONFIG;
} else {
    window.SUPABASE_CONFIG = SUPABASE_CONFIG;
}
```

## 🧪 **測試設置**

### **使用測試頁面**
1. 打開 `test-database.html`
2. 點擊 "測試資料庫連接"
3. 測試學生登入功能
4. 測試成績儲存功能
5. 測試成績查詢功能

### **手動測試**
在瀏覽器控制台中執行：
```javascript
// 測試連接
window.apiService.testConnection().then(result => {
    console.log('連接狀態:', result);
});

// 測試學生登入
window.apiService.login('C2 Yuni', 'Yuni').then(result => {
    console.log('登入結果:', result);
});

// 測試成績儲存
const testScore = {
    studentName: 'C2 Yuni',
    quizType: 'vocabulary_part1',
    score: 85,
    totalQuestions: 36,
    percentage: 85
};
window.apiService.saveScore(testScore).then(result => {
    console.log('儲存結果:', result);
});
```

## 📊 **功能驗證清單**

- [ ] Supabase項目創建成功
- [ ] 資料庫表創建成功
- [ ] 學生資料插入成功
- [ ] API密鑰配置正確
- [ ] CORS設置完成
- [ ] 資料庫連接測試通過
- [ ] 學生登入功能正常
- [ ] 成績儲存功能正常
- [ ] 成績查詢功能正常
- [ ] 主網站整合完成

## 🔧 **故障排除**

### **常見問題**

1. **CORS錯誤**
   - 檢查CORS設置是否包含正確的域名
   - 確保域名格式正確（包含協議）

2. **認證錯誤**
   - 確認API密鑰正確複製
   - 檢查Project URL格式

3. **資料庫錯誤**
   - 確認SQL腳本執行成功
   - 檢查表是否正確創建

4. **連接超時**
   - 檢查網路連接
   - 確認Supabase服務狀態

### **調試技巧**

```javascript
// 啟用詳細日誌
localStorage.setItem('debug', 'true');

// 檢查配置
console.log('Supabase配置:', window.SUPABASE_CONFIG);

// 檢查API服務
console.log('API服務:', window.apiService);
```

## 🎉 **完成設置**

設置完成後，您的拼字練習平台將具備：

- ✅ **學生管理系統**：15個預設學生帳號
- ✅ **成績記錄功能**：支援多種練習類型
- ✅ **安全認證**：Row Level Security保護
- ✅ **即時同步**：Supabase即時功能
- ✅ **完整API**：增刪改查所有功能

## 📞 **支援**

如果遇到問題：
1. 檢查瀏覽器控制台錯誤
2. 查看Supabase Dashboard日誌
3. 使用 `test-database.html` 進行診斷
4. 參考 `SUPABASE_SETUP.md` 詳細指南

---

**設置時間**：5-10分鐘  
**技術要求**：基本網頁開發知識  
**成本**：免費（Supabase免費方案）
