# CORS 設置指南

## 🎯 為什麼需要設置 CORS？

您的 GitHub Pages 網站 [https://ben-one0708.github.io/alwaysJoy/](https://ben-one0708.github.io/alwaysJoy/) 需要能夠訪問 Supabase 資料庫，這需要正確的 CORS 設置。

## 🚀 設置步驟

### 方法一：通過 Supabase Dashboard

#### 步驟 1：登入 Supabase Dashboard

1. 前往 [Supabase Dashboard](https://supabase.com/dashboard)
2. 選擇您的項目：`alwaysjoy-learning`

#### 步驟 2：找到 CORS 設置

**選項 A：通過 Settings**
1. 在左側選單中點擊 **"Settings"**
2. 點擊 **"API"**
3. 滾動到 **"CORS"** 部分
4. 在 **"Additional Allowed Origins"** 中添加：
   ```
   https://ben-one0708.github.io
   ```
5. 點擊 **"Save"**

**選項 B：通過 Project Settings**
1. 在左側選單中點擊 **"Project Settings"**
2. 點擊 **"API"**
3. 找到 **"CORS"** 設置
4. 添加：`https://ben-one0708.github.io`

**選項 C：通過 Configuration**
1. 在左側選單中點擊 **"Settings"**
2. 點擊 **"Configuration"**
3. 找到 **"API"** 標籤
4. 設置 CORS

### 方法二：通過 SQL 命令設置

如果找不到 CORS 設置界面，可以使用 SQL 命令：

1. 在 Supabase Dashboard 中點擊 **"SQL Editor"**
2. 執行以下 SQL 命令：

```sql
-- 設置 CORS 策略
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('avatars', 'avatars', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/gif'])
ON CONFLICT (id) DO NOTHING;

-- 或者直接設置 RLS 策略允許跨域訪問
CREATE POLICY "Allow public read access" ON storage.objects
FOR SELECT USING (bucket_id = 'avatars');
```

### 方法三：檢查是否已經設置

有時候 CORS 可能已經預設允許了。讓我們先測試：

1. 前往您的網站：[https://ben-one0708.github.io/alwaysJoy/](https://ben-one0708.github.io/alwaysJoy/)
2. 打開開發者工具（F12）
3. 點擊 Console 標籤
4. 執行測試：

```javascript
// 測試連接
apiService.testConnection().then(result => {
    console.log('連接測試結果:', result);
}).catch(error => {
    console.error('連接錯誤:', error);
});
```

## 🔍 找不到 CORS 設置的解決方案

### 方案 1：使用 Supabase CLI

1. 安裝 Supabase CLI：
```bash
npm install -g supabase
```

2. 登入並設置：
```bash
supabase login
supabase link --project-ref cxdzsefbblkadblxzhddga
```

3. 創建配置文件：
```bash
supabase init
```

### 方案 2：檢查項目設置

1. 在 Supabase Dashboard 中：
   - 點擊項目名稱
   - 查看 "Settings" 或 "Configuration"
   - 尋找 "API" 或 "CORS" 相關設置

### 方案 3：聯繫 Supabase 支援

如果以上方法都不行：
1. 在 Supabase Dashboard 中點擊 "Support"
2. 描述您的 CORS 設置問題
3. 提供您的項目 ID：`cxdzsefbblkadblxzhddga`

## 🚨 常見問題

### 問題 1：找不到 CORS 設置
**解決方案**：
- 嘗試不同的菜單路徑（Settings → API, Project Settings → API, Configuration → API）
- 使用 SQL 命令設置
- 檢查是否已經預設允許

### 問題 2：CORS 錯誤仍然存在
**錯誤訊息**：`Access to fetch at 'https://cxdzsefbblkadblxzhddga.supabase.co' from origin 'https://ben-one0708.github.io' has been blocked by CORS policy`

**解決方案**：
- 確保添加了正確的域名：`https://ben-one0708.github.io`
- 等待 5-10 分鐘讓設置生效
- 清除瀏覽器快取

### 問題 3：API 密鑰錯誤
**錯誤訊息**：`Invalid API key`

**解決方案**：
- 檢查 `api-supabase-client.js` 中的密鑰是否正確
- 確保使用的是 **anon public key** 而不是 **service_role key**

## ✅ 成功標誌

當一切設置正確時，您應該看到：

1. **控制台訊息**：`Supabase 連接成功`
2. **連接測試**：返回 `true`
3. **成績查詢**：返回數據而不是錯誤

## 🎯 測試步驟

設置完成後，測試以下功能：

1. **測試學生登入**：
   - 帳號：`C2 Yuni`
   - 密碼：`yuni`

2. **測試管理員功能**：
   - 帳號：`Ben`
   - 密碼：`BenBenBen`

3. **測試成績記錄**：
   - 完成練習並記錄成績
   - 查看成績是否正確保存

## 🔧 緊急備用方案

如果 CORS 設置仍然有問題，我們可以：

1. **使用本地存儲**：暫時使用瀏覽器本地存儲
2. **設置代理**：使用 GitHub Pages 的代理功能
3. **切換到其他服務**：考慮使用 Firebase 或其他 BaaS 服務

---

**🎉 完成 CORS 設置後，您的網站就能完美連接 Supabase 資料庫了！**

如果仍然找不到 CORS 設置，請告訴我您在 Supabase Dashboard 中看到哪些選項，我會提供更具體的指導。
