# AlwaysJoy 學習平台

一個專為拼字比賽設計的線上練習平台，支援多學生練習和成績管理。

## 🌟 功能特色

- **多學生支援**：支援多個學生同時使用
- **練習模式**：提供多種練習題型
- **成績記錄**：自動記錄和查看練習成績
- **管理員功能**：管理員可查看所有學生成績
- **響應式設計**：支援手機、平板、電腦
- **雲端數據庫**：使用 Firebase Firestore 保存數據

## 🚀 快速開始

### 方法一：直接使用（推薦）

1. **訪問網站**：
   - 前往：[https://ben-one0708.github.io/alwaysJoy/](https://ben-one0708.github.io/alwaysJoy/)

2. **登入系統**：
   - **管理員**：Ben / BenBenBen
   - **學生**：C2 Yuni / yuni

3. **開始使用**：
   - 選擇練習模式
   - 完成練習並記錄成績

### 方法二：本地部署

1. **下載代碼**：
   ```bash
   git clone https://github.com/Ben-One0708/alwaysJoy.git
   cd alwaysJoy
   ```

2. **配置 Firebase**：
   - 按照 `FIREBASE_SETUP.md` 的步驟設置 Firebase
   - 更新 `api-firebase-client.js` 中的配置

3. **開啟網站**：
   - 用瀏覽器打開 `index.html`
   - 或使用本地服務器：
   ```bash
   python -m http.server 8000
   # 然後訪問 http://localhost:8000
   ```

## 👥 測試帳號

### 管理員帳號
- **帳號**：Ben
- **密碼**：BenBenBen
- **功能**：查看所有學生成績、管理系統

### 學生帳號
- **B組**：C2 Yuni / yuni, C2 Emily / emily, A8 Vito / vito
- **C組**：A4 Eudora / eudora, A5 Zoe / zoe
- **D組**：N6 Bruce / bruce, N7 Laura / laura
- **E組**：K9 Lilian / lilian, K9 Jill / jill
- **F組**：I2 Candy / candy, N3 Avery / avery
- **教務組**：教務組 Annie / annie, 教務組 Celina / celina, 教務組 Nina / nina

## 📁 文件結構

```
alwaysJoy/
├── index.html              # 主頁面
├── script.js               # 主要 JavaScript 邏輯
├── styles.css              # 樣式文件
├── api-firebase-client.js  # Firebase API 客戶端
├── FIREBASE_SETUP.md       # Firebase 設置指南
├── firebase-test.html      # Firebase 測試頁面
├── MJ3.html               # 詞彙練習遊戲
├── vocabulary_quiz_*.html  # 詞彙練習頁面
├── image/                 # 圖片資源
└── README.md              # 說明文件
```

## 🔧 技術架構

### 前端技術
- **HTML5**：頁面結構
- **CSS3**：樣式和響應式設計
- **JavaScript (ES6+)**：互動邏輯和數據處理

### 後端服務
- **Firebase Firestore**：雲端 NoSQL 數據庫
- **Firebase SDK**：JavaScript 客戶端庫
- **實時同步**：數據實時更新

### 部署平台
- **GitHub Pages**：靜態網站託管
- **Firebase Hosting**：可選的託管服務
- **Git**：版本控制

## 📊 功能模組

### 1. 登入系統
- 學生和管理員登入
- 身份驗證和授權
- 會話管理

### 2. 練習系統
- 雜誌單字練習
- 各級別單字練習
- 段落單字練習
- 混合題型練習
- 大批次題目練習

### 3. 成績管理
- 自動記錄練習成績
- 成績統計和分析
- 歷史成績查詢
- 成績導出功能

### 4. 管理員功能
- 查看所有學生成績
- 成績篩選和排序
- 數據統計
- 成績導出

## 🎯 使用流程

1. **登入**：使用學生或管理員帳號登入
2. **選擇功能**：
   - 學生：進入練習模式
   - 管理員：查看成績管理
3. **練習**：選擇練習類型並開始練習
4. **記錄成績**：系統自動記錄練習結果
5. **查看成績**：在個人頁面或管理員頁面查看成績

## 🔒 數據安全

- **Firebase 安全規則**：可配置的數據訪問權限
- **身份驗證**：支援多種登入方式
- **數據備份**：自動備份和恢復
- **實時同步**：多設備數據同步

## 📱 響應式設計

- **桌面版**：完整功能界面
- **平板版**：適配中等螢幕
- **手機版**：觸控友好的移動界面

## 🛠️ 開發指南

### 添加新功能
1. 修改 `script.js` 添加新邏輯
2. 更新 `styles.css` 添加樣式
3. 修改 `index.html` 更新界面

### 添加新練習
1. 創建新的 HTML 練習頁面
2. 在 `script.js` 中添加練習邏輯
3. 更新導航和成績記錄

### 數據管理
- 數據存儲在 Firebase Firestore 中
- 使用 `api-firebase-client.js` 管理數據
- 支援數據導出和導入

## 🚀 部署

### GitHub Pages 部署
1. 推送代碼到 GitHub
2. 在倉庫設置中啟用 GitHub Pages
3. 選擇分支和目錄
4. 等待部署完成

### Firebase Hosting 部署（可選）
1. 安裝 Firebase CLI
2. 初始化 Firebase 項目
3. 部署到 Firebase Hosting

### 本地部署
1. 下載所有文件
2. 配置 Firebase
3. 用瀏覽器打開 `index.html`
4. 或使用本地服務器

## 🔧 Firebase 設置

詳細的 Firebase 設置步驟請參考 `FIREBASE_SETUP.md`：

1. **創建 Firebase 項目**
2. **啟用 Firestore 數據庫**
3. **獲取配置信息**
4. **更新代碼配置**
5. **設置安全規則**
6. **初始化數據**

## 📞 支援

如有問題或建議，請：
1. 檢查瀏覽器控制台是否有錯誤
2. 確認 Firebase 配置正確
3. 使用 `firebase-test.html` 測試連接
4. 聯繫開發者

## 📄 授權

本項目採用 MIT 授權條款。

---

**🎉 享受您的學習之旅！**
