# CORS 設置指南

## 🎯 為什麼需要設置 CORS？

您的 GitHub Pages 網站 [https://ben-one0708.github.io/alwaysJoy/](https://ben-one0708.github.io/alwaysJoy/) 需要能夠訪問 Supabase 資料庫，這需要正確的 CORS 設置。

## 🚀 設置步驟

### 步驟 1：登入 Supabase Dashboard

1. 前往 [Supabase Dashboard](https://supabase.com/dashboard)
2. 選擇您的項目：`alwaysjoy-learning`

### 步驟 2：設置 CORS

1. 在左側選單中點擊 **"Settings"**
2. 點擊 **"API"**
3. 滾動到 **"CORS"** 部分
4. 在 **"Additional Allowed Origins"** 中添加：
   ```
   https://ben-one0708.github.io
   ```
5. 點擊 **"Save"**

### 步驟 3：驗證設置

在您的網站 [https://ben-one0708.github.io/alwaysJoy/](https://ben-one0708.github.io/alwaysJoy/) 中：

1. 打開瀏覽器開發者工具（F12）
2. 點擊 **"Console"** 標籤
3. 刷新頁面
4. 查看是否有 CORS 錯誤

## 🔧 測試連接

在瀏覽器控制台中執行：

```javascript
// 測試 Supabase 連接
apiService.testConnection().then(result => {
    console.log('連接測試結果:', result);
});

// 測試獲取所有成績
apiService.getAllScores().then(scores => {
    console.log('所有成績:', scores);
});
```

## 🚨 常見問題

### 問題 1：CORS 錯誤
**錯誤訊息**：`Access to fetch at 'https://cxdzsefbblkadblxzhddga.supabase.co' from origin 'https://ben-one0708.github.io' has been blocked by CORS policy`

**解決方案**：
- 確保在 Supabase CORS 設置中添加了 `https://ben-one0708.github.io`
- 等待幾分鐘讓設置生效

### 問題 2：API 密鑰錯誤
**錯誤訊息**：`Invalid API key`

**解決方案**：
- 檢查 `api-supabase-client.js` 中的密鑰是否正確
- 確保使用的是 **anon public key** 而不是 **service_role key**

### 問題 3：資料庫表不存在
**錯誤訊息**：`relation "students" does not exist`

**解決方案**：
- 執行 `setup-database.sql` 腳本創建表
- 參考 `SUPABASE_SETUP.md` 的完整設置指南

## ✅ 成功標誌

當一切設置正確時，您應該看到：

1. **控制台訊息**：`Supabase 連接成功`
2. **連接測試**：返回 `true`
3. **成績查詢**：返回數據而不是錯誤

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

---

**🎉 完成 CORS 設置後，您的網站就能完美連接 Supabase 資料庫了！**
