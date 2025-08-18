# 配置說明

## 快速設置

在部署到 GitHub Pages 之前，請按照以下步驟進行配置：

### 1. Supabase 設置

1. **創建 Supabase 項目**：
   - 前往 [Supabase](https://supabase.com)
   - 創建新項目：`alwaysjoy-learning`
   - 記錄 Project URL 和 anon key

2. **設置資料庫**：
   - 執行 `SUPABASE_SETUP.md` 中的 SQL 腳本
   - 創建必要的表和數據

3. **更新 API 配置**：
   - 編輯 `api-supabase-client.js`
   - 更新 `supabaseUrl` 和 `supabaseKey`

### 2. GitHub 設置

1. **創建 GitHub 倉庫**：
   - 倉庫名稱：`alwaysjoy-learning`
   - 設置為 Public 或 Private

2. **推送代碼**：
   ```bash
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/alwaysjoy-learning.git
   git push -u origin main
   ```

3. **啟用 GitHub Pages**：
   - 在倉庫 Settings → Pages
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)

### 3. 測試部署

1. **本地測試**：
   ```bash
   python3 -m http.server 8000
   # 訪問 http://localhost:8000
   ```

2. **生產測試**：
   - 等待 GitHub Actions 部署完成
   - 訪問 `https://YOUR_USERNAME.github.io/alwaysjoy-learning`

## 配置檢查清單

- [ ] Supabase 項目已創建
- [ ] 資料庫表已創建
- [ ] API 密鑰已更新
- [ ] GitHub 倉庫已創建
- [ ] 代碼已推送
- [ ] GitHub Pages 已啟用
- [ ] 本地測試通過
- [ ] 生產環境測試通過

## 故障排除

### API 連接問題
```javascript
// 在瀏覽器控制台中測試
apiService.testConnection().then(result => {
    console.log('連接測試結果:', result);
});
```

### 常見錯誤
1. **CORS 錯誤**：檢查 Supabase CORS 設置
2. **認證錯誤**：確認 API 密鑰正確
3. **部署失敗**：檢查 GitHub Actions 日誌

## 安全注意事項

1. **不要將 API 密鑰提交到公開倉庫**
2. **使用環境變數管理敏感資訊**
3. **定期更新密鑰**
4. **監控異常訪問**

## 支援

- Supabase 文檔：https://supabase.com/docs
- GitHub Pages 文檔：https://pages.github.com
- 項目文檔：查看 `README.md` 和 `SUPABASE_SETUP.md`
