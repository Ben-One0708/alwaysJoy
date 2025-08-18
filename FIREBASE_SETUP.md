# Firebase 設置指南

## 🎯 為什麼選擇 Firebase？

Firebase 是 Google 提供的後端服務，具有以下優勢：
- **簡單設置**：幾分鐘內即可完成配置
- **免費額度**：每月有免費使用額度
- **實時同步**：數據實時更新
- **安全可靠**：Google 基礎設施保障
- **無需服務器**：完全託管服務

## 🚀 設置步驟

### 步驟 1：創建 Firebase 項目

1. **前往 Firebase Console**：
   - 訪問 [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - 使用 Google 帳號登入

2. **創建新項目**：
   - 點擊 "創建項目"
   - 項目名稱：`alwaysjoy-learning`
   - 選擇是否啟用 Google Analytics（可選）
   - 點擊 "創建項目"

### 步驟 2：啟用 Firestore 數據庫

1. **在項目控制台中**：
   - 點擊左側選單的 "Firestore Database"
   - 點擊 "創建數據庫"

2. **選擇安全規則**：
   - 選擇 "以測試模式開始"
   - 選擇數據庫位置（建議選擇離您最近的區域）
   - 點擊 "完成"

### 步驟 3：獲取配置信息

1. **項目設置**：
   - 點擊左側選單的齒輪圖標 "項目設置"
   - 滾動到 "您的應用" 部分

2. **添加 Web 應用**：
   - 點擊 Web 圖標 `</>`
   - 應用暱稱：`AlwaysJoy Web`
   - 點擊 "註冊應用"

3. **複製配置**：
   - 複製顯示的配置對象
   - 它看起來像這樣：
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
     authDomain: "alwaysjoy-learning.firebaseapp.com",
     projectId: "alwaysjoy-learning",
     storageBucket: "alwaysjoy-learning.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:abcdefghijklmnop"
   };
   ```

### 步驟 4：更新代碼配置

1. **編輯 `api-firebase-client.js`**：
   - 找到 `this.config` 對象
   - 用您的實際配置替換示例配置

2. **更新配置示例**：
   ```javascript
   this.config = {
       apiKey: "您的實際 API 密鑰",
       authDomain: "您的項目域名",
       projectId: "您的項目 ID",
       storageBucket: "您的存儲桶",
       messagingSenderId: "您的發送者 ID",
       appId: "您的應用 ID"
   };
   ```

### 步驟 5：設置安全規則

1. **在 Firestore Database 中**：
   - 點擊 "規則" 標籤
   - 用以下規則替換現有規則：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 允許讀取所有文檔
    match /{document=**} {
      allow read: if true;
    }
    
    // 允許寫入成績和學生數據
    match /scores/{scoreId} {
      allow write: if true;
    }
    
    match /students/{studentId} {
      allow write: if true;
    }
  }
}
```

2. **點擊 "發布"** 保存規則

### 步驟 6：初始化數據

1. **在您的網站中**：
   - 打開瀏覽器開發者工具（F12）
   - 在控制台中執行：
   ```javascript
   apiService.initializeSampleData().then(result => {
       console.log('數據初始化結果:', result);
   });
   ```

2. **驗證數據**：
   ```javascript
   apiService.getAllStudents().then(students => {
       console.log('學生列表:', students);
   });
   ```

## 🔧 測試連接

### 方法一：使用測試頁面

1. **創建測試頁面**：
   - 在您的網站中添加 Firebase SDK
   - 創建簡單的測試頁面

2. **測試代碼**：
   ```javascript
   // 測試連接
   apiService.testConnection().then(result => {
       console.log('連接測試結果:', result);
   });

   // 測試登入
   apiService.login('Ben', 'BenBenBen').then(result => {
       console.log('登入測試結果:', result);
   });
   ```

### 方法二：在控制台中測試

1. **打開您的網站**：[https://ben-one0708.github.io/alwaysJoy/](https://ben-one0708.github.io/alwaysJoy/)
2. **打開開發者工具**（F12）
3. **在控制台中執行**：
   ```javascript
   // 測試 Firebase 連接
   apiService.testConnection().then(result => {
       console.log('Firebase 連接:', result);
   });

   // 測試獲取成績
   apiService.getAllScores().then(scores => {
       console.log('所有成績:', scores);
   });
   ```

## 🚨 常見問題

### 問題 1：Firebase SDK 未載入
**錯誤訊息**：`Firebase SDK 未載入`

**解決方案**：
- 確保在 HTML 中正確引入 Firebase SDK
- 檢查網絡連接
- 確認 Firebase 配置正確

### 問題 2：權限錯誤
**錯誤訊息**：`Missing or insufficient permissions`

**解決方案**：
- 檢查 Firestore 安全規則
- 確保規則允許讀寫操作
- 重新發布安全規則

### 問題 3：配置錯誤
**錯誤訊息**：`Invalid API key`

**解決方案**：
- 檢查 `api-firebase-client.js` 中的配置
- 確保所有配置值都正確
- 重新從 Firebase Console 複製配置

### 問題 4：CORS 錯誤
**錯誤訊息**：`Access to fetch at 'firebase.googleapis.com' has been blocked by CORS policy`

**解決方案**：
- Firebase 通常不需要額外的 CORS 設置
- 檢查瀏覽器是否阻止了請求
- 嘗試清除瀏覽器快取

## ✅ 成功標誌

當一切設置正確時，您應該看到：

1. **控制台訊息**：`Firebase 已初始化`
2. **連接測試**：返回 `true`
3. **數據查詢**：成功獲取學生和成績數據
4. **登入功能**：可以正常登入系統

## 🎯 下一步

設置完成後，您可以：

1. **測試學生登入**：
   - 帳號：`C2 Yuni`
   - 密碼：`yuni`

2. **測試管理員功能**：
   - 帳號：`Ben`
   - 密碼：`BenBenBen`

3. **測試成績記錄**：
   - 完成練習並記錄成績
   - 查看成績是否正確保存

## 📊 Firebase 免費額度

Firebase 提供以下免費額度：
- **Firestore**：1GB 存儲，50,000 讀取/天，20,000 寫入/天
- **Hosting**：10GB 存儲，360MB/天 傳輸
- **Authentication**：10,000 用戶

對於 AlwaysJoy 學習平台，這些免費額度完全足夠使用。

## 🔒 安全建議

1. **生產環境**：
   - 設置更嚴格的安全規則
   - 啟用身份驗證
   - 限制 API 密鑰使用

2. **數據備份**：
   - 定期導出數據
   - 設置自動備份
   - 監控使用量

---

**🎉 完成 Firebase 設置後，您的網站就能完美連接雲端數據庫了！**
