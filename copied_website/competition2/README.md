# 虛擬鍵盤應用

這是一個包含兩個頁面的虛擬鍵盤應用，支持英文單字輸入和題目練習。

## 頁面說明

### 1. 雙組虛擬鍵盤 (index.html)
- **功能**: 雙組競賽模式的虛擬鍵盤
- **特色**: 
  - 兩組獨立的鍵盤和顯示區域
  - 計分系統
  - 支持實體鍵盤輸入
  - 響應式設計，支持觸碰設備

### 2. 詞彙測驗 + 虛擬鍵盤 (vocabulary_keyboard.html) ⭐ 新功能
- **功能**: 結合詞彙測驗和虛擬鍵盤的學習模式
- **特色**:
  - 上方顯示詞彙測驗題目和圖片
  - 下方提供虛擬鍵盤輸入答案
  - 支援左右按鍵切換題目
  - 即時答案檢查和分數顯示
  - 支援實體鍵盤和虛擬鍵盤
  - 響應式設計

### 3. 單鍵盤題目練習 (single-keyboard.html)
- **功能**: 單一鍵盤的題目練習模式
- **特色**:
  - 可編輯的題目區域
  - 單一答案輸入區域
  - 答案檢查功能
  - 模態框編輯題目
  - 支持實體鍵盤輸入
  - 響應式設計

## 文件結構

```
competition/
├── index.html                    # 雙組虛擬鍵盤頁面
├── vocabulary_keyboard.html      # 詞彙測驗 + 虛擬鍵盤頁面 ⭐
├── single-keyboard.html          # 單鍵盤題目練習頁面
├── styles.css                    # 雙組頁面樣式
├── single-keyboard.css           # 單鍵盤頁面樣式
├── script.js                     # 雙組頁面功能
├── single-keyboard.js            # 單鍵盤頁面功能
├── image2/                       # 詞彙圖片資料夾
└── README.md                     # 說明文件
```

## 使用方法

### 雙組虛擬鍵盤
1. 打開 `index.html`
2. 使用虛擬鍵盤或實體鍵盤輸入文字
3. 左半邊鍵盤控制第一組，右半邊鍵盤控制第二組
4. 使用計分按鈕記錄分數

### 詞彙測驗 + 虛擬鍵盤 ⭐
1. 打開 `vocabulary_keyboard.html`
2. 觀看上方顯示的詞彙題目和圖片
3. 使用下方虛擬鍵盤輸入答案
4. 使用左右按鈕或方向鍵切換題目
5. 按 Enter 鍵檢查答案
6. 使用下拉選單跳題

### 單鍵盤題目練習
1. 打開 `single-keyboard.html`
2. 點擊「編輯題目」按鈕設置您的題目
3. 使用虛擬鍵盤或實體鍵盤輸入答案
4. 點擊「檢查答案」驗證答案
5. 使用「清除答案」重新開始

## 功能特色

### 通用功能
- 🎨 現代化的漸層背景設計
- 📱 完全響應式設計，支持手機和平板
- ⌨️ 支持實體鍵盤輸入
- 👆 觸碰設備優化
- ✨ 流暢的動畫效果

### 單鍵盤題目練習專屬功能
- 📝 可編輯的題目區域
- ✅ 答案檢查功能
- 🎯 視覺化的答案反饋
- 🔄 一鍵清除功能
- 💾 題目保存功能

## 自定義答案檢查

在 `single-keyboard.js` 中，您可以修改 `checkAnswer` 函數來實現自己的答案檢查邏輯：

```javascript
function checkAnswer(userAnswer) {
    // 在這裡添加您的答案檢查邏輯
    const correctAnswers = [
        'your_answer_1',
        'your_answer_2',
        'your_answer_3'
    ];
    
    return correctAnswers.some(answer => 
        userAnswer.toLowerCase().trim() === answer.toLowerCase().trim()
    );
}
```

## 技術特點

- **純前端實現**: 無需後端服務器
- **現代CSS**: 使用CSS Grid、Flexbox和漸層
- **ES6+ JavaScript**: 使用現代JavaScript語法
- **無依賴**: 不依賴任何外部庫
- **跨平台**: 支持所有現代瀏覽器

## 瀏覽器支持

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 開發說明

如需修改樣式，請編輯對應的CSS文件：
- 雙組頁面：`styles.css`
- 單鍵盤頁面：`single-keyboard.css`

如需修改功能，請編輯對應的JavaScript文件：
- 雙組頁面：`script.js`
- 單鍵盤頁面：`single-keyboard.js`
