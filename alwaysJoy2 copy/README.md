# AlwaysJoy 學習平台

一個現代化的教育網站，專為學生學習和教師管理而設計，使用GitHub Pages + Supabase架構。

## 🚀 部署架構

```
GitHub Pages (前端) ←→ Supabase (後端數據庫)
     ↓
靜態網站託管          PostgreSQL數據庫
     ↓
學生練習界面          成績儲存和查詢
```

## 功能特色

### ⏰ 倒數計時器
- 位於網站中央的倒數計時器
- 顯示距離2025年12月7日全國區賽的剩餘時間
- 包含天、小時、分鐘、秒的即時更新
- 具有脈衝動畫效果，增加視覺吸引力

### 📚 學習地圖功能

#### 1. 雜誌單字練習
- 1-36題、1-72題、1-108題三個選項
- 即時練習和評分
- 進度追蹤和統計

#### 2. 各級別單字
- 顯示「請至佳音雲端學院官網練習」提示
- 額外單字準備中

#### 3. 個人練習成績登記
- 雜誌單字成績登記
- 雲端學院拼字模擬100題成績登記
- 練習模式和計時模式都適用

#### 4. 學習進度總覽
- 從2025/7/26開始計算學習天數
- 即時更新統計數據
- 個人學習記錄

### 👥 學生管理
- 按組別分類：B組、C組、D組、E組、F組、教務組、管理員
- 包含 15 位學生和管理員：
  - **B組**: C2 Yuni, C2 Emily, A8 Vito
  - **C組**: A4 Eudora, A5 Zoe
  - **D組**: N6 Bruce, N7 Laura
  - **E組**: K9 Lilian, K9 Jill
  - **F組**: I2 Candy, N3 Avery
  - **教務組**: Annie, Celina, Nina
  - **管理員**: Ben

### 📊 管理員功能
- 成績管理：查看所有學生成績
- 學生統計：總學生數和總記錄數
- 詳細分析：個別學生學習狀況
- 成績篩選：按組別查看成績

## 技術特色

### 🎨 現代化設計
- 響應式設計，支援各種設備
- 漸層背景和現代化 UI
- Font Awesome 圖標支援
- 流暢的動畫效果

### 📱 響應式佈局
- 桌面版：完整功能展示
- 平板版：適配中等螢幕
- 手機版：垂直佈局優化

### �� 互動功能
- 模態框展示詳細內容
- 分頁切換無需重新載入
- 即時分數儲存到Supabase
- 外部點擊關閉模態框

### 🗄️ 數據庫整合
- Supabase PostgreSQL數據庫
- 實時數據同步
- 安全的API認證
- 自動備份和恢復

## 部署說明

### 快速部署
1. **創建Supabase項目**
   - 前往 [Supabase](https://supabase.com)
   - 創建新項目：`alwaysjoy-learning`
   - 執行 `GITHUB_DEPLOYMENT.md` 中的SQL腳本

2. **配置API密鑰**
   - 在Supabase Dashboard中獲取Project URL和API密鑰
   - 編輯 `api-supabase-client.js` 文件，填入您的密鑰

3. **創建GitHub倉庫**
   - 前往 [GitHub](https://github.com)
   - 創建新倉庫：`alwaysjoy-learning`
   - 推送代碼到GitHub

4. **啟用GitHub Pages**
   - 在GitHub倉庫設置中啟用Pages
   - 選擇 `gh-pages` 分支
   - 等待自動部署

### 本地開發
```bash
# 啟動本地伺服器
python3 -m http.server 8000

# 訪問 http://localhost:8000
```

## 文件結構

```
alwaysJoy/
├── index.html              # 主頁面
├── script.js               # 主要JavaScript邏輯
├── styles.css              # 樣式文件
├── api-supabase-client.js  # Supabase客戶端API
├── GITHUB_DEPLOYMENT.md    # 部署指南
├── .github/workflows/      # GitHub Actions配置
│   └── deploy.yml
└── .gitignore             # Git忽略文件
```

## 數據庫結構

### students表
- `id`: 主鍵
- `name`: 學生姓名
- `group`: 組別
- `level`: 等級
- `password`: 密碼
- `isAdmin`: 是否為管理員

### scores表
- `id`: 主鍵
- `studentName`: 學生姓名
- `date`: 日期
- `scores`: 成績JSON
- `notes`: 備註

### questions表
- `id`: 主鍵
- `question`: 題目
- `answer`: 答案
- `category`: 分類
- `difficulty`: 難度
- `options`: 選項JSON

## 瀏覽器支援
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 授權
此專案為 AlwaysJoy 教育平台專用，請勿未經授權使用。

---

**開發者**: AlwaysJoy 教育團隊  
**版本**: 2.0.0 (GitHub + Supabase)  
**更新日期**: 2025年
