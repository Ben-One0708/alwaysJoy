# SQLite 設置指南

## 概述

本項目使用 SQLite 作為客戶端數據庫，通過 SQL.js 庫在瀏覽器中運行。這是一個純前端的解決方案，不需要服務器端設置。

## 技術架構

- **SQLite**: 客戶端數據庫引擎
- **SQL.js**: JavaScript SQLite 實現
- **本地存儲**: 瀏覽器本地存儲作為備用

## 功能特點

### ✅ 優點
- **無需服務器**: 完全在客戶端運行
- **即開即用**: 無需複雜的設置
- **離線可用**: 不依賴網絡連接
- **數據持久化**: 數據保存在瀏覽器中
- **跨設備同步**: 通過瀏覽器同步（如果啟用）

### ⚠️ 限制
- **單設備數據**: 數據僅存在於當前設備
- **無雲端備份**: 清除瀏覽器數據會丟失所有記錄
- **容量限制**: 受瀏覽器存儲限制

## 快速開始

### 1. 基本使用

1. 打開 `index.html`
2. 系統會自動初始化 SQLite 數據庫
3. 使用預設帳號登入：
   - **管理員**: `ben` / `admin123`
   - **學生**: `annie` / `student123`

### 2. 測試數據庫

訪問 `sqlite-test.html` 進行完整的數據庫測試：

```bash
# 在瀏覽器中打開
http://localhost:8000/sqlite-test.html
```

## 數據庫結構

### 學生表 (students)
```sql
CREATE TABLE students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    group_name TEXT NOT NULL,
    isAdmin INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 成績表 (scores)
```sql
CREATE TABLE scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    studentName TEXT NOT NULL,
    group_name TEXT NOT NULL,
    quizType TEXT NOT NULL,
    score INTEGER NOT NULL,
    date TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 預設數據

### 學生帳號
| 用戶名 | 密碼 | 姓名 | 組別 | 權限 |
|--------|------|------|------|------|
| ben | admin123 | Ben | 管理員組 | 管理員 |
| annie | student123 | Annie | A組 | 學生 |
| bob | student123 | Bob | B組 | 學生 |
| cathy | student123 | Cathy | C組 | 學生 |
| david | student123 | David | D組 | 學生 |

### 樣本成績
- Annie: 雜誌單字 85分, 各級別單字 90分, 段落單字 88分
- Bob: 雜誌單字 78分, 各級別單字 82分
- Cathy: 雜誌單字 92分, 段落單字 95分
- David: 各級別單字 87分, 段落單字 89分

## API 方法

### 基本操作
```javascript
// 測試連接
await window.apiService.testConnection()

// 學生登入
await window.apiService.login(username, password)

// 獲取所有成績
await window.apiService.getAllScores()

// 獲取學生成績
await window.apiService.getStudentScores(studentName)

// 保存成績
await window.apiService.saveScore(studentName, group, quizType, score)
```

### 學生管理
```javascript
// 獲取所有學生
await window.apiService.getAllStudents()

// 添加學生
await window.apiService.addStudent(username, password, name, group)

// 更新學生
await window.apiService.updateStudent(id, username, password, name, group)

// 刪除學生
await window.apiService.deleteStudent(id)
```

### 數據管理
```javascript
// 導出數據
await window.apiService.exportData()

// 初始化樣本數據
await window.apiService.initializeSampleData()

// 刪除成績
await window.apiService.deleteScore(id)
```

## 故障排除

### 常見問題

#### 1. 數據庫初始化失敗
**症狀**: 控制台顯示 "SQLite 初始化失敗"
**解決方案**: 
- 檢查網絡連接（需要載入 SQL.js）
- 清除瀏覽器緩存
- 嘗試使用不同的瀏覽器

#### 2. 登入失敗
**症狀**: 無法使用預設帳號登入
**解決方案**:
- 訪問 `sqlite-test.html` 重新初始化數據
- 檢查用戶名和密碼是否正確
- 清除瀏覽器數據重新開始

#### 3. 成績不顯示
**症狀**: 管理員面板看不到成績
**解決方案**:
- 確保已正確保存成績
- 檢查控制台是否有錯誤信息
- 重新載入頁面

### 調試技巧

1. **打開開發者工具**
   ```javascript
   // 檢查 API 服務狀態
   console.log(window.apiService)
   ```

2. **測試數據庫連接**
   ```javascript
   // 測試連接
   const isConnected = await window.apiService.testConnection()
   console.log('數據庫連接:', isConnected)
   ```

3. **查看數據**
   ```javascript
   // 獲取所有成績
   const scores = await window.apiService.getAllScores()
   console.log('成績數據:', scores)
   ```

## 數據備份

### 導出數據
```javascript
const exportResult = await window.apiService.exportData()
if (exportResult.success) {
    const dataStr = JSON.stringify(exportResult.data, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    
    const a = document.createElement('a')
    a.href = url
    a.download = `alwaysjoy_backup_${new Date().toISOString().split('T')[0]}.json`
    a.click()
}
```

### 恢復數據
```javascript
// 讀取備份文件
const file = event.target.files[0]
const reader = new FileReader()
reader.onload = async function(e) {
    const data = JSON.parse(e.target.result)
    
    // 重新初始化數據庫
    await window.apiService.initializeSampleData()
    
    // 恢復學生數據
    for (const student of data.students) {
        await window.apiService.addStudent(
            student.username,
            student.password,
            student.name,
            student.group
        )
    }
    
    // 恢復成績數據
    for (const score of data.scores) {
        await window.apiService.saveScore(
            score.studentName,
            score.group,
            score.quizType,
            score.score
        )
    }
}
reader.readAsText(file)
```

## 部署說明

### GitHub Pages
1. 推送代碼到 GitHub
2. 啟用 GitHub Pages
3. 訪問 `https://yourusername.github.io/alwaysJoy/`

### 本地部署
1. 使用任何 HTTP 服務器
2. 例如 Python: `python -m http.server 8000`
3. 訪問 `http://localhost:8000`

## 更新日誌

### v1.0.0 (2024-01-15)
- 初始 SQLite 實現
- 基本 CRUD 操作
- 管理員面板
- 成績管理系統

## 技術支持

如果遇到問題，請：
1. 檢查瀏覽器控制台的錯誤信息
2. 訪問 `sqlite-test.html` 進行診斷
3. 清除瀏覽器數據重新開始
4. 嘗試使用不同的瀏覽器

---

**注意**: 這是一個客戶端解決方案，數據僅存在於當前設備的瀏覽器中。建議定期導出數據進行備份。
