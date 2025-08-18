# 🚀 快速開始指南

## 5分鐘部署 AlwaysJoy 學習平台

### 步驟 1: 創建 GitHub 倉庫

1. 前往 [GitHub](https://github.com)
2. 點擊 "New repository"
3. 倉庫名稱：`alwaysjoy-learning`
4. 選擇 Public 或 Private
5. **不要** 初始化 README
6. 點擊 "Create repository"

### 步驟 2: 推送代碼

在終端機中執行：

```bash
# 添加遠程倉庫（替換 YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/alwaysjoy-learning.git

# 推送代碼
git push -u origin main
```

或者使用部署腳本：

```bash
./deploy.sh
```

### 步驟 3: 啟用 GitHub Pages

1. 在 GitHub 倉庫頁面點擊 "Settings"
2. 左側選單點擊 "Pages"
3. Source 選擇 "Deploy from a branch"
4. Branch 選擇 "main"
5. Folder 選擇 "/ (root)"
6. 點擊 "Save"

### 步驟 4: 設置 Supabase（可選）

如果需要資料庫功能：

1. 前往 [Supabase](https://supabase.com)
2. 創建新項目：`alwaysjoy-learning`
3. 執行 `SUPABASE_SETUP.md` 中的 SQL 腳本
4. 更新 `api-supabase-client.js` 中的 API 密鑰

### 步驟 5: 測試網站

等待幾分鐘後，訪問：
```
https://YOUR_USERNAME.github.io/alwaysjoy-learning
```

## 🎯 功能特色

✅ **即時部署** - 推送到 GitHub 自動部署  
✅ **響應式設計** - 支援手機、平板、電腦  
✅ **學生管理** - 按組別分類學生  
✅ **練習系統** - 雜誌單字練習  
✅ **成績追蹤** - 個人成績記錄  
✅ **倒數計時** - 比賽倒數計時器  

## 📱 測試帳號

### 管理員帳號
- 帳號：`Ben`
- 密碼：`BenBenBen`

### 學生帳號
- 帳號：`C2 Yuni`
- 密碼：`yuni`

## 🔧 自定義設置

### 修改學生資料
編輯 `script.js` 中的學生資料：

```javascript
const students = {
    'B組': ['C2 Yuni', 'C2 Emily', 'A8 Vito'],
    'C組': ['A4 Eudora', 'A5 Zoe'],
    // ... 更多組別
};
```

### 修改練習題目
編輯 `MJ3.html` 中的題目：

```javascript
const questions = [
    { clue: "題目內容", definition: "完整句子", answer: "答案" },
    // ... 更多題目
];
```

### 修改倒數日期
編輯 `script.js` 中的目標日期：

```javascript
const targetDate = new Date('2025-12-07T00:00:00');
```

## 🆘 常見問題

### Q: 網站無法訪問？
A: 檢查 GitHub Pages 是否已啟用，等待幾分鐘讓部署完成。

### Q: 登入失敗？
A: 確認帳號密碼正確，或檢查 Supabase 設置。

### Q: 樣式顯示異常？
A: 確認所有 CSS 文件都已正確載入。

### Q: 如何添加新學生？
A: 在 `script.js` 中添加學生資料，或直接在 Supabase 資料庫中添加。

## 📞 支援

- 📧 技術支援：查看 `README.md`
- 🗄️ 資料庫設置：查看 `SUPABASE_SETUP.md`
- 🔧 配置說明：查看 `CONFIGURATION.md`
- 🚀 部署指南：查看 `GITHUB_DEPLOYMENT.md`

---

**🎉 恭喜！您的 AlwaysJoy 學習平台已成功部署！**
