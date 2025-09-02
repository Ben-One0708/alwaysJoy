# Spelling Bee App 快速啟動指南

## 🚀 環境準備

### 1. 安裝 Node.js
```bash
# 檢查 Node.js 版本 (需要 16+)
node --version
npm --version
```

### 2. 安裝 React Native CLI
```bash
npm install -g @react-native-community/cli
```

### 3. 安裝開發工具
- **Android**: Android Studio + Android SDK
- **iOS**: Xcode (僅 macOS)
- **編輯器**: VS Code (推薦)

## 📱 專案初始化

### 1. 創建新專案
```bash
# 進入 app-version 資料夾
cd app-version

# 安裝依賴
npm install

# 或者使用 yarn
yarn install
```

### 2. iOS 專案設置 (僅 macOS)
```bash
cd ios
pod install
cd ..
```

## 🔧 開發命令

### 啟動 Metro 服務器
```bash
npm start
# 或
yarn start
```

### 運行 Android 版本
```bash
npm run android
# 或
yarn android
```

### 運行 iOS 版本 (僅 macOS)
```bash
npm run ios
# 或
yarn ios
```

### 測試
```bash
npm test
# 或
yarn test
```

## 📁 專案結構說明

```
app-version/
├── src/
│   ├── components/          # 可重用組件
│   │   └── VirtualKeyboard.js  # 虛擬鍵盤組件
│   ├── screens/             # 頁面組件
│   │   ├── HomeScreen.js    # 主頁面
│   │   ├── VocabularyQuizScreen.js    # 詞彙測驗頁面
│   │   ├── TeamCompetitionScreen.js   # 團隊競賽頁面
│   │   └── ProfileScreen.js # 個人中心頁面
│   ├── navigation/          # 導航配置
│   ├── services/            # 業務邏輯
│   └── utils/               # 工具函數
├── assets/                  # 靜態資源
├── config/                  # 配置文件
└── docs/                    # 文檔
```

## 🎯 核心功能實現

### 1. 虛擬鍵盤組件
- 支持觸碰輸入
- 觸覺反饋
- 大小寫切換
- 特殊按鍵處理

### 2. 導航系統
- 堆疊導航
- 頁面轉場動畫
- 標題配置

### 3. 主題系統
- 漸層背景
- 統一色彩方案
- 響應式設計

## 📱 平台特定配置

### Android
- 最低 API 級別: 23 (Android 6.0)
- 目標 API 級別: 33 (Android 13)
- 權限配置在 `android/app/src/main/AndroidManifest.xml`

### iOS
- 最低版本: iOS 12.0
- 目標版本: iOS 16.0+
- 權限配置在 `ios/SpellingBeeApp/Info.plist`

## 🧪 測試指南

### 單元測試
```bash
npm test
```

### E2E 測試 (Detox)
```bash
# 安裝 Detox
npm install -g detox-cli

# 配置測試
detox init

# 運行測試
detox test
```

### 手動測試
1. 在不同設備上測試
2. 測試各種觸碰手勢
3. 測試橫豎屏切換
4. 測試深色模式

## 🚀 部署準備

### Android APK 構建
```bash
cd android
./gradlew assembleRelease
```

### iOS 構建
```bash
cd ios
xcodebuild -workspace SpellingBeeApp.xcworkspace -scheme SpellingBeeApp -configuration Release -destination generic/platform=iOS -archivePath SpellingBeeApp.xcarchive archive
```

## 🔍 常見問題

### 1. Metro 服務器無法啟動
```bash
# 清理緩存
npm start -- --reset-cache
```

### 2. Android 構建失敗
```bash
cd android
./gradlew clean
./gradlew assembleDebug
```

### 3. iOS 構建失敗
```bash
cd ios
pod deintegrate
pod install
```

### 4. 依賴問題
```bash
# 清理 node_modules
rm -rf node_modules
npm install
```

## 📚 學習資源

### React Native 官方
- [官方文檔](https://reactnative.dev/)
- [組件參考](https://reactnative.dev/docs/components-and-apis)
- [樣式指南](https://reactnative.dev/docs/style)

### 導航
- [React Navigation](https://reactnavigation.org/)
- [導航配置](https://reactnavigation.org/docs/getting-started)

### 性能優化
- [性能指南](https://reactnative.dev/docs/performance)
- [調試技巧](https://reactnative.dev/docs/debugging)

## 🎉 下一步

1. **完善組件**: 實現所有頁面組件
2. **數據管理**: 添加本地存儲和狀態管理
3. **音效支持**: 添加按鍵音效和背景音樂
4. **動畫優化**: 添加頁面轉場和按鍵動畫
5. **測試覆蓋**: 提高測試覆蓋率
6. **性能優化**: 優化渲染性能

## 🤝 貢獻指南

1. Fork 專案
2. 創建功能分支
3. 提交更改
4. 發起 Pull Request

## 📞 支持

如有問題，請：
1. 查看 [Issues](https://github.com/yourusername/spelling-bee-app/issues)
2. 創建新的 Issue
3. 聯繫開發團隊

---

**祝您開發愉快！** 🚀
