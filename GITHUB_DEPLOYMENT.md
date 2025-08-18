# GitHub 部署指南

## 1. 創建 GitHub 倉庫

1. 前往 [GitHub](https://github.com)
2. 點擊右上角的 "+" 號，選擇 "New repository"
3. 填寫倉庫資訊：
   - **Repository name**: `alwaysjoy-learning`
   - **Description**: AlwaysJoy 拼字比賽練習平台
   - **Visibility**: Public (或 Private，根據需要)
   - **Initialize this repository with**: 不要勾選任何選項
4. 點擊 "Create repository"

## 2. 推送代碼到 GitHub

在本地終端機中執行以下命令：

```bash
# 確保在項目目錄中
cd /Users/hsienjenchiu/Desktop/alwaysJoy

# 添加所有文件到 Git
git add .

# 提交更改
git commit -m "Initial commit: AlwaysJoy learning platform"

# 添加遠程倉庫（替換 YOUR_USERNAME 為您的 GitHub 用戶名）
git remote add origin https://github.com/YOUR_USERNAME/alwaysjoy-learning.git

# 推送到主分支
git branch -M main
git push -u origin main
```

## 3. 設置 GitHub Pages

1. 在 GitHub 倉庫頁面中，點擊 "Settings" 標籤
2. 在左側選單中點擊 "Pages"
3. 在 "Source" 部分：
   - 選擇 "Deploy from a branch"
   - 在 "Branch" 下拉選單中選擇 "main"
   - 在 "Folder" 中選擇 "/ (root)"
4. 點擊 "Save"

## 4. 自動部署設置

創建 GitHub Actions 工作流程來自動部署：

### 創建 `.github/workflows/deploy.yml` 文件

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies (if any)
      run: |
        # 如果有 package.json，取消註釋以下行
        # npm install
        
    - name: Build (if needed)
      run: |
        # 如果有構建步驟，取消註釋以下行
        # npm run build
        
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

## 5. 自定義域名設置（可選）

如果您有自己的域名：

1. 在 GitHub 倉庫的 "Settings" → "Pages" 中
2. 在 "Custom domain" 欄位中輸入您的域名
3. 點擊 "Save"
4. 在您的域名提供商處設置 DNS 記錄：
   - 類型：CNAME
   - 名稱：www（或您想要的子域名）
   - 值：`YOUR_USERNAME.github.io`

## 6. 環境變數設置

為了保護 API 密鑰，建議使用環境變數：

1. 在 GitHub 倉庫的 "Settings" → "Secrets and variables" → "Actions"
2. 點擊 "New repository secret"
3. 添加以下密鑰：
   - `SUPABASE_URL`: 您的 Supabase Project URL
   - `SUPABASE_ANON_KEY`: 您的 Supabase anon key

## 7. 更新 API 配置

在部署前，確保更新 `api-supabase-client.js` 中的配置：

```javascript
// 使用環境變數或直接設置
this.supabaseUrl = process.env.SUPABASE_URL || 'https://your-project-ref.supabase.co';
this.supabaseKey = process.env.SUPABASE_ANON_KEY || 'your-anon-key';
```

## 8. 測試部署

1. 推送代碼後，GitHub Actions 會自動構建和部署
2. 等待幾分鐘後，訪問您的 GitHub Pages URL：
   - `https://YOUR_USERNAME.github.io/alwaysjoy-learning`
3. 測試所有功能是否正常運作

## 9. 持續部署

每次推送到 `main` 分支時，GitHub Actions 會自動重新部署網站。

## 10. 監控和維護

### 檢查部署狀態
- 在 GitHub 倉庫頁面點擊 "Actions" 標籤
- 查看最新的工作流程運行狀態

### 查看網站統計
- 在 "Settings" → "Pages" 中查看訪問統計
- 監控網站性能和可用性

### 備份和恢復
- 定期備份代碼和資料庫
- 設置自動備份流程

## 11. 故障排除

### 常見問題

1. **部署失敗**：
   - 檢查 GitHub Actions 日誌
   - 確認所有文件都已提交
   - 檢查語法錯誤

2. **網站無法訪問**：
   - 確認 GitHub Pages 已啟用
   - 檢查自定義域名設置
   - 等待部署完成

3. **API 連接問題**：
   - 確認 Supabase 配置正確
   - 檢查 CORS 設置
   - 驗證 API 密鑰

### 調試技巧

```bash
# 本地測試
python3 -m http.server 8000
# 訪問 http://localhost:8000

# 檢查 Git 狀態
git status
git log --oneline

# 檢查遠程倉庫
git remote -v
```

## 12. 安全最佳實踐

1. **代碼安全**：
   - 不要在前端代碼中硬編碼敏感資訊
   - 使用環境變數管理密鑰
   - 定期更新依賴項

2. **訪問控制**：
   - 設置適當的倉庫權限
   - 使用分支保護規則
   - 審查所有代碼更改

3. **監控**：
   - 設置錯誤監控
   - 監控網站性能
   - 定期檢查安全漏洞

---

**版本**: 1.0.0  
**最後更新**: 2024年12月  
**適用於**: AlwaysJoy 學習平台
