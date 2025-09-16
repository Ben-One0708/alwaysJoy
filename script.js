// AlwaysJoy 教育平台 - JavaScript 功能文件

// 全局變數
let currentStudent = null;
let currentScores = {};
let practiceData = {};

// 學生資料
const students = {
    'C2 Yuni': { group: 'B組', level: 'C2', password: 'Yuni', isAdmin: false },
    'C2 Emily': { group: 'B組', level: 'C2', password: 'Emily', isAdmin: false },
    'A8 Vito': { group: 'B組', level: 'A8', password: 'Vito', isAdmin: false },
    'A4 Eudora': { group: 'C組', level: 'A4', password: 'Eudora', isAdmin: false },
    'A5 Zoe': { group: 'C組', level: 'A5', password: 'Zoe', isAdmin: false },
    'N6 Bruce': { group: 'D組', level: 'N6', password: 'Bruce', isAdmin: false },
    'N7 Laura': { group: 'D組', level: 'N7', password: 'Laura', isAdmin: false },
    'K9 Lilian': { group: 'E組', level: 'K9', password: 'Lilian', isAdmin: false },
    'K9 Jill': { group: 'E組', level: 'K9', password: 'Jill', isAdmin: false },
    'I2 Candy': { group: 'F組', level: 'I2', password: 'Candy', isAdmin: false },
    'N3 Avery': { group: 'F組', level: 'N3', password: 'Avery', isAdmin: false },
    '教務組 Annie': { group: '教務組', level: 'Admin', password: 'Annie', isAdmin: false },
    '教務組 Celina': { group: '教務組', level: 'Admin', password: 'Celina', isAdmin: false },
    '教務組 Nina': { group: '教務組', level: 'Admin', password: 'Nina', isAdmin: false },
    'Ben': { group: '管理員', level: 'Admin', password: 'BenBenBen', isAdmin: true }
};

// 組別對應的學生
const groupStudents = {
    'B組': ['C2 Yuni', 'C2 Emily', 'A8 Vito'],
    'C組': ['A4 Eudora', 'A5 Zoe'],
    'D組': ['N6 Bruce', 'N7 Laura'],
    'E組': ['K9 Lilian', 'K9 Jill'],
    'F組': ['I2 Candy', 'N3 Avery'],
    '教務組': ['教務組 Annie', '教務組 Celina', '教務組 Nina'],
    '管理員': ['Ben']
};

// 練習題目範例（實際使用時可從資料庫載入）
const practiceQuestions = {
    'magazine': [
        '1. 請寫出以下單字的中文意思：',
        '2. 請完成以下句子：',
        '3. 請選擇正確的單字：'
    ],
    'level': [
        '1. 基礎級別單字練習：',
        '2. 中級單字練習：',
        '3. 高級單字練習：'
    ],
    'paragraph': [
        '1. 段落理解練習：',
        '2. 上下文單字練習：',
        '3. 閱讀理解練習：'
    ],
    'mixed': [
        '1. 綜合題型練習：',
        '2. 多選題練習：',
        '3. 填空題練習：'
    ],
    'batch': [
        '1. 大批次題目練習（200題）：',
        '2. 疲乏度訓練：',
        '3. 速度測試：'
    ]
};

// 頁面載入完成後的初始化
document.addEventListener('DOMContentLoaded', function () {
    console.log('AlwaysJoy 教育平台已載入完成！');
    initializeApp();
});

// 初始化應用程式
function initializeApp() {
    // 檢查登入狀態
    checkLoginStatus();

    // 檢查學生登入狀態
    checkStudentLoginStatus();

    // 啟動倒數計時器
    startCountdown();

    // 載入練習資料
    loadPracticeData();

    // 設置事件監聽器
    setupEventListeners();

    // 顯示歡迎訊息
    showWelcomeMessage();
}

// 檢查學生登入狀態
function checkStudentLoginStatus() {
    if (isStudentLoggedIn()) {
        // 已登入，顯示學習地圖
        showLearningMap();
    } else {
        // 未登入，顯示學生登入介面
        showStudentLogin();
    }
}

// 檢查登入狀態
function checkLoginStatus() {
    if (isLoggedIn()) {
        // 已登入，顯示主要內容
        showMainContent();
    } else {
        // 未登入，顯示登入頁面
        showLoginPage();
    }
}

// 顯示登入頁面
function showLoginPage() {
    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('mainContent').style.display = 'none';
}

// 顯示主要內容
function showMainContent() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
}

// 主登入功能
function loginToSystem() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const errorDiv = document.getElementById('loginPageError');

    // 驗證帳號密碼
    if (username === 'Joyloveyou' && password === 'Joyloveyou') {
        // 登入成功
        setLoggedIn(true);
        showMainContent();
        showSuccessMessage('登入成功！歡迎使用 AlwaysJoy 教育平台');

        // 清空輸入欄位
        document.getElementById('loginUsername').value = '';
        document.getElementById('loginPassword').value = '';
    } else {
        // 登入失敗
        errorDiv.style.display = 'flex';
        document.getElementById('loginPassword').value = '';
        document.getElementById('loginPassword').focus();

        // 3秒後隱藏錯誤訊息
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 3000);
    }
}

// 登出功能
function logoutFromSystem() {
    if (confirm('確定要登出系統嗎？')) {
        setLoggedIn(false);
        showLoginPage();
        showSuccessMessage('已成功登出系統');
    }
}

// 啟動倒數計時器
function startCountdown() {
    // 設定目標日期：2025年12月7日
    const targetDate = new Date('2025-12-07T00:00:00');

    function updateCountdown() {
        const now = new Date();
        const timeDifference = targetDate - now;

        if (timeDifference > 0) {
            // 計算剩餘時間
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            // 更新顯示
            const daysElement = document.getElementById('days');
            const hoursElement = document.getElementById('hours');
            const minutesElement = document.getElementById('minutes');
            const secondsElement = document.getElementById('seconds');

            if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
            if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
            if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
            if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
        } else {
            // 時間到了
            const daysElement = document.getElementById('days');
            const hoursElement = document.getElementById('hours');
            const minutesElement = document.getElementById('minutes');
            const secondsElement = document.getElementById('seconds');

            if (daysElement) daysElement.textContent = '00';
            if (hoursElement) hoursElement.textContent = '00';
            if (minutesElement) minutesElement.textContent = '00';
            if (secondsElement) secondsElement.textContent = '00';

            // 顯示完成訊息
            const countdownContainer = document.querySelector('.countdown-container');
            if (countdownContainer) {
                countdownContainer.innerHTML = `
                    <div style="font-size: 2rem; color: #28a745; font-weight: bold;">
                        <i class="fas fa-check-circle"></i> 時間到了！
                    </div>
                `;
            }
        }
    }

    // 立即更新一次
    updateCountdown();

    // 每秒更新一次
    setInterval(updateCountdown, 1000);
}

// 載入排行榜資料（保留函數以備用）
function loadLeaderboard() {
    // 這裡可以從 API 載入實際的排行榜資料
    const leaderboardData = [
        { name: 'C2 Yuni', score: 95, group: 'B組' },
        { name: 'A4 Eudora', score: 92, group: 'C組' },
        { name: 'K9 Lilian', score: 88, group: 'E組' }
    ];

    updateLeaderboard(leaderboardData);
}

// 更新排行榜顯示（保留函數以備用）
function updateLeaderboard(data) {
    const stages = document.querySelectorAll('.stage');

    stages.forEach((stage, index) => {
        if (data[index]) {
            const student = data[index];
            stage.innerHTML = `
                <div class="stage-number">${index + 1}</div>
                <div class="stage-place">${student.name}</div>
                <div style="font-size: 0.9rem; margin-top: 5px;">${student.score}分</div>
            `;
        }
    });
}

// 載入練習資料
function loadPracticeData() {
    // 這裡可以從 API 載入實際的練習資料
    practiceData = {
        'C2 Yuni': {
            magazine: { completed: true, score: 95 },
            level: { completed: false, score: 0 },
            paragraph: { completed: true, score: 88 },
            mixed: { completed: false, score: 0 },
            batch: { completed: false, score: 0 }
        }
        // 其他學生的資料...
    };
}

// 設置事件監聽器
function setupEventListeners() {
    // 分頁切換
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function () {
            const tabName = this.getAttribute('data-tab');
            showTab(tabName);
        });
    });

    // 模態框外部點擊關閉
    window.addEventListener('click', function (event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    // 鍵盤快捷鍵
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeAllModals();
        }

        // 在登入頁面按Enter鍵登入
        if (event.key === 'Enter' && document.getElementById('loginPage').style.display === 'flex') {
            loginToSystem();
        }

        // 在登入模態框中按Enter鍵登入
        if (event.key === 'Enter' && document.getElementById('loginModal').style.display === 'block') {
            login();
        }
    });
}

// 顯示歡迎訊息
function showWelcomeMessage() {
    const now = new Date();
    const hour = now.getHours();
    let greeting = '';

    if (hour < 12) {
        greeting = '早安！';
    } else if (hour < 18) {
        greeting = '午安！';
    } else {
        greeting = '晚安！';
    }

    // 可以在這裡顯示歡迎訊息
    console.log(`${greeting}歡迎使用 AlwaysJoy 教育平台`);
}

// 分頁切換功能
function showTab(tabName) {
    // 隱藏所有內容區域
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => {
        section.classList.remove('active');
    });

    // 移除所有分頁的 active 狀態
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    // 顯示選中的內容區域
    const targetSection = document.getElementById(tabName);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // 添加選中分頁的 active 狀態
    const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
}

// 打開 PDF 模態框
function openPDF(date, type) {
    // 檢查是否已登入
    if (!isLoggedIn()) {
        // 顯示登入模態框
        showLoginModalForPDF(date, type);
        return;
    }

    // 已登入，直接打開PDF
    openPDFModal(date, type);
}

// 顯示登入模態框（用於PDF）
function showLoginModalForPDF(date, type) {
    // 儲存要打開的PDF資訊
    window.pendingPDF = { date: date, type: type };

    // 清空輸入欄位
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('loginError').style.display = 'none';

    // 顯示登入模態框
    document.getElementById('loginModal').style.display = 'block';
}

// 打開PDF模態框（內部函數）
function openPDFModal(date, type) {
    const modal = document.getElementById('pdfModal');
    const title = document.getElementById('pdfTitle');
    const content = document.getElementById('pdfContent');

    title.textContent = `課程總覽 - ${date}`;

    // 檢查是否為 7/26、8/2、8/23、9/13 或 訂正在電腦 日期
    if (date === '7/26') {
        // 顯示 7/26 的 PDF 文件
        content.innerHTML = `
            <div class="pdf-container responsive-pdf-container">
                <div class="pdf-header">
                    <h3 class="pdf-title">
                        <i class="fas fa-file-pdf pdf-icon"></i>課程資料 PDF
                    </h3>
                    <div class="pdf-info">
                        <span class="pdf-date"><strong>日期：</strong>${date}</span>
                        <span class="pdf-type"><strong>類型：</strong>課程總覽</span>
                    </div>
                </div>
                
                <div class="pdf-viewer-container">
                    <div class="pdf-loading">
                        <i class="fas fa-spinner fa-spin loading-icon"></i>
                        <span>載入中...</span>
                    </div>
                    <iframe src="2025拼字練習1.pdf" 
                            class="pdf-iframe"
                            onload="this.parentElement.querySelector('.pdf-loading').style.display='none';">
                    </iframe>
                </div>
                
                <div class="pdf-actions">
                    <button onclick="downloadPDF('${date}', '${type}')" class="pdf-btn download-btn">
                        <i class="fas fa-download"></i>下載 PDF
                    </button>
                    <a href="2025拼字練習1.pdf" target="_blank" class="pdf-btn open-btn">
                        <i class="fas fa-external-link-alt"></i>在新視窗開啟
                    </a>
                </div>
            </div>
        `;
    } else if (date === '8/2') {
        // 顯示 8/2 的 PDF 文件
        content.innerHTML = `
            <div class="pdf-container responsive-pdf-container">
                <div class="pdf-header">
                    <h3 class="pdf-title">
                        <i class="fas fa-file-pdf pdf-icon"></i>課程資料 PDF
                    </h3>
                    <div class="pdf-info">
                        <span class="pdf-date"><strong>日期：</strong>${date}</span>
                        <span class="pdf-type"><strong>類型：</strong>課程總覽</span>
                    </div>
                </div>
                
                <div class="pdf-viewer-container">
                    <div class="pdf-loading">
                        <i class="fas fa-spinner fa-spin loading-icon"></i>
                        <span>載入中...</span>
                    </div>
                    <iframe src="2025拼字練習2.pdf" 
                            class="pdf-iframe"
                            onload="this.parentElement.querySelector('.pdf-loading').style.display='none';">
                    </iframe>
                </div>
                
                <div class="pdf-actions">
                    <button onclick="downloadPDF('${date}', '${type}')" class="pdf-btn download-btn">
                        <i class="fas fa-download"></i>下載 PDF
                    </button>
                    <a href="2025拼字練習2.pdf" target="_blank" class="pdf-btn open-btn">
                        <i class="fas fa-external-link-alt"></i>在新視窗開啟
                    </a>
                </div>
            </div>
        `;
    } else if (date === '8/23') {
        // 顯示 8/23 的 PDF 文件
        content.innerHTML = `
            <div class="pdf-container responsive-pdf-container">
                <div class="pdf-header">
                    <h3 class="pdf-title">
                        <i class="fas fa-file-pdf pdf-icon"></i>課程資料 PDF
                    </h3>
                    <div class="pdf-info">
                        <span class="pdf-date"><strong>日期：</strong>${date}</span>
                        <span class="pdf-type"><strong>類型：</strong>課程總覽</span>
                    </div>
                </div>
                
                <div class="pdf-viewer-container">
                    <div class="pdf-loading">
                        <i class="fas fa-spinner fa-spin loading-icon"></i>
                        <span>載入中...</span>
                    </div>
                    <iframe src="2025拼字練習3.pdf" 
                            class="pdf-iframe"
                            onload="this.parentElement.querySelector('.pdf-loading').style.display='none';">
                    </iframe>
                </div>
                
                <div class="pdf-actions">
                    <button onclick="downloadPDF('${date}', '${type}')" class="pdf-btn download-btn">
                        <i class="fas fa-download"></i>下載 PDF
                    </button>
                    <a href="2025拼字練習3.pdf" target="_blank" class="pdf-btn open-btn">
                        <i class="fas fa-external-link-alt"></i>在新視窗開啟
                    </a>
                </div>
            </div>
        `;
    } else if (date === '9/13') {
        // 顯示 9/13 的 PDF 文件
        content.innerHTML = `
            <div class="pdf-container responsive-pdf-container">
                <div class="pdf-header">
                    <h3 class="pdf-title">
                        <i class="fas fa-file-pdf pdf-icon"></i>課程資料 PDF
                    </h3>
                    <div class="pdf-info">
                        <span class="pdf-date"><strong>日期：</strong>${date}</span>
                        <span class="pdf-type"><strong>類型：</strong>課程總覽</span>
                    </div>
                </div>
                
                <div class="pdf-viewer-container">
                    <div class="pdf-loading">
                        <i class="fas fa-spinner fa-spin loading-icon"></i>
                        <span>載入中...</span>
                    </div>
                    <iframe src="2025拼字練習4.pdf" 
                            class="pdf-iframe"
                            onload="this.parentElement.querySelector('.pdf-loading').style.display='none';">
                    </iframe>
                </div>
                
                <div class="pdf-actions">
                    <button onclick="downloadPDF('${date}', '${type}')" class="pdf-btn download-btn">
                        <i class="fas fa-download"></i>下載 PDF
                    </button>
                    <a href="2025拼字練習4.pdf" target="_blank" class="pdf-btn open-btn">
                        <i class="fas fa-external-link-alt"></i>在新視窗開啟
                    </a>
                </div>
            </div>
        `;
    } else if (date === '訂正在電腦') {
        // 顯示 訂正在電腦 的 PDF 文件
        content.innerHTML = `
            <div class="pdf-container responsive-pdf-container">
                <div class="pdf-header">
                    <h3 class="pdf-title">
                        <i class="fas fa-laptop pdf-icon"></i>訂正在電腦 PDF
                    </h3>
                    <div class="pdf-info">
                        <span class="pdf-type"><strong>類型：</strong>訂正在電腦</span>
                        <span class="pdf-file"><strong>檔案：</strong>佳音拼字比賽-訂正在電腦上-2</span>
                    </div>
                </div>
                
                <div class="pdf-viewer-container">
                    <div class="pdf-loading">
                        <i class="fas fa-spinner fa-spin loading-icon"></i>
                        <span>載入中...</span>
                    </div>
                    <iframe src="佳音拼字比賽-訂正在電腦上-2.pdf" 
                            class="pdf-iframe"
                            onload="this.parentElement.querySelector('.pdf-loading').style.display='none';">
                    </iframe>
                </div>
                
                <div class="pdf-actions">
                    <button onclick="downloadPDF('${date}', '${type}')" class="pdf-btn download-btn">
                        <i class="fas fa-download"></i>下載 PDF
                    </button>
                    <a href="佳音拼字比賽-訂正在電腦上-2.pdf" target="_blank" class="pdf-btn open-btn">
                        <i class="fas fa-external-link-alt"></i>在新視窗開啟
                    </a>
                </div>
            </div>
        `;
    } else {
        // 顯示準備中的訊息
        content.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <div style="font-size: 4rem; color: #ffc107; margin-bottom: 20px;">
                    <i class="fas fa-clock"></i>
                </div>
                <h3 style="color: #333; margin-bottom: 15px; font-size: 1.5rem;">Ben老師還在準備中...</h3>
                <p style="color: #666; font-size: 1.1rem; margin-bottom: 20px;">日期：${date}</p>
                <p style="color: #888; font-size: 1rem;">請稍後再來查看，課程資料正在準備中</p>
                <div style="margin-top: 30px;">
                    <button onclick="closeModal('pdfModal')" style="background: #6c757d; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
                        <i class="fas fa-times"></i> 關閉
                    </button>
                </div>
            </div>
        `;
    }

    modal.style.display = 'block';
}

// 下載 PDF
function downloadPDF(date, type) {
    if (date === '7/26') {
        // 創建下載連結
        const link = document.createElement('a');
        link.href = '2025拼字練習1.pdf';
        link.download = `7-26_課程總覽.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else if (date === '8/2') {
        // 創建下載連結
        const link = document.createElement('a');
        link.href = '2025拼字練習2.pdf';
        link.download = `8-2_課程總覽.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else if (date === '8/23') {
        // 創建下載連結
        const link = document.createElement('a');
        link.href = '2025拼字練習3.pdf';
        link.download = `8-23_課程總覽.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else if (date === '9/13') {
        // 創建下載連結
        const link = document.createElement('a');
        link.href = '2025拼字練習4.pdf';
        link.download = `9-13_課程總覽.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else if (date === '訂正在電腦') {
        // 創建下載連結
        const link = document.createElement('a');
        link.href = '佳音拼字比賽-訂正在電腦上-2.pdf';
        link.download = `訂正在電腦_佳音拼字比賽.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        // 這裡可以實現實際的 PDF 下載功能
        console.log(`下載 ${type} PDF: ${date}`);
        alert(`正在下載 ${date} 的課程總覽 PDF 文件...`);
    }
}

// 開啟成績登記表
function openScoreSheet() {
    const scoreSheetUrl = 'https://docs.google.com/spreadsheets/d/1dVtlnLWCdgloPTiD15FkqcF-MjYbZUu1sMOQX15LjbQ/edit?gid=0#gid=0';

    try {
        // 在新分頁開啟 Google Sheets
        const newWindow = window.open(scoreSheetUrl, '_blank', 'noopener,noreferrer');

        // 檢查是否成功開啟視窗
        if (newWindow) {
            // 成功開啟
            alert('成績登記表已在新分頁開啟！\n\n如果頁面顯示空白，請：\n1. 檢查瀏覽器是否阻擋了彈出視窗\n2. 確保您已登入 Google 帳號\n3. 重新整理頁面');
        } else {
            // 可能被瀏覽器阻擋
            alert('無法開啟新分頁，可能是瀏覽器阻擋了彈出視窗。\n\n請手動複製以下連結到新分頁開啟：\n\n' + scoreSheetUrl);
        }
    } catch (error) {
        // 發生錯誤
        console.error('開啟成績登記表時發生錯誤:', error);
        alert('開啟成績登記表時發生錯誤。\n\n請手動複製以下連結到新分頁開啟：\n\n' + scoreSheetUrl);
    }
}

// 複製連結到剪貼簿
function copyLink() {
    const linkInput = document.querySelector('.link-input');
    linkInput.select();
    linkInput.setSelectionRange(0, 99999); // 用於移動設備

    try {
        document.execCommand('copy');
        alert('連結已複製到剪貼簿！');
    } catch (err) {
        // 如果 execCommand 失敗，嘗試使用新的 Clipboard API
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(linkInput.value).then(() => {
                alert('連結已複製到剪貼簿！');
            }).catch(() => {
                alert('無法複製連結，請手動選擇並複製。');
            });
        } else {
            alert('無法複製連結，請手動選擇並複製。');
        }
    }
}

// 開啟遊戲平台
function openGamePlatform() {
    try {
        window.open('competition2/homepage.html', '_blank');
        console.log('遊戲平台已在新分頁開啟');
    } catch (error) {
        console.error('開啟遊戲平台時發生錯誤:', error);
        alert('開啟遊戲平台時發生錯誤。\n\n請手動複製以下連結到新分頁開啟：\n\ncompetition2/homepage.html');
    }
}

// 複製遊戲連結
function copyGameLink() {
    const gameLinkInput = document.querySelector('.game-link-info .link-input');
    gameLinkInput.select();
    gameLinkInput.setSelectionRange(0, 99999); // 用於移動設備

    try {
        document.execCommand('copy');
        alert('遊戲連結已複製到剪貼簿！');
    } catch (err) {
        // 如果 execCommand 失敗，嘗試使用新的 Clipboard API
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(gameLinkInput.value).then(() => {
                alert('遊戲連結已複製到剪貼簿！');
            }).catch(() => {
                alert('無法複製遊戲連結，請手動選擇並複製。');
            });
        } else {
            alert('無法複製遊戲連結，請手動選擇並複製。');
        }
    }
}

// 預覽 PDF
function previewPDF(date, type) {
    // 這裡可以實現 PDF 線上預覽功能
    console.log(`預覽 ${type} PDF: ${date}`);
    alert(`正在開啟 ${date} 的課程總覽 PDF 預覽...`);
}

// 更新學生姓名選單
function updateStudentNames() {
    const groupSelect = document.getElementById('studentGroup');
    const nameSelect = document.getElementById('studentName');
    const selectedGroup = groupSelect.value;

    // 清空姓名選單
    nameSelect.innerHTML = '<option value="">請選擇姓名</option>';

    if (selectedGroup && groupStudents[selectedGroup]) {
        // 啟用姓名選單
        nameSelect.disabled = false;

        // 添加該組的學生
        groupStudents[selectedGroup].forEach(studentName => {
            const option = document.createElement('option');
            option.value = studentName;
            option.textContent = studentName;
            nameSelect.appendChild(option);
        });
    } else {
        // 禁用姓名選單
        nameSelect.disabled = true;
    }
}

// 切換密碼顯示
function togglePassword() {
    const passwordInput = document.getElementById('studentPassword');
    const toggleBtn = document.querySelector('.password-toggle i');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        toggleBtn.className = 'fas fa-eye';
    }
}

// 學生登入
function studentLogin() {
    const group = document.getElementById('studentGroup').value;
    const name = document.getElementById('studentName').value;
    const password = document.getElementById('studentPassword').value;
    const errorDiv = document.getElementById('studentLoginError');

    // 驗證輸入
    if (!group || !name || !password) {
        errorDiv.textContent = '請填寫所有欄位';
        errorDiv.style.display = 'flex';
        return;
    }

    // 驗證密碼
    if (students[name] && students[name].password === password) {
        // 登入成功
        setStudentLoggedIn(name);
        showSuccessMessage(`歡迎 ${name}！登入成功`);

        // 清空表單
        document.getElementById('studentGroup').value = '';
        document.getElementById('studentName').value = '';
        document.getElementById('studentPassword').value = '';
        document.getElementById('studentName').disabled = true;

        // 清除可能保存的選擇
        localStorage.removeItem('lastSelectedGroup');
        localStorage.removeItem('lastSelectedStudent');

        // 隱藏錯誤訊息
        errorDiv.style.display = 'none';

        // 顯示學習地圖
        showLearningMap();
    } else {
        // 登入失敗
        errorDiv.textContent = '密碼錯誤，請重新輸入';
        errorDiv.style.display = 'flex';
        document.getElementById('studentPassword').value = '';
        document.getElementById('studentPassword').focus();
    }
}

// 設置學生登入狀態
function setStudentLoggedIn(studentName) {
    localStorage.setItem('studentLoggedIn', 'true');
    localStorage.setItem('currentStudent', studentName);
    localStorage.setItem('studentLoginTime', new Date().toISOString());
}

// 檢查學生登入狀態
function isStudentLoggedIn() {
    return localStorage.getItem('studentLoggedIn') === 'true';
}

// 獲取當前登入學生
function getCurrentStudent() {
    return localStorage.getItem('currentStudent');
}

// 學生登出
function studentLogout() {
    // 清除所有登入相關的數據
    localStorage.removeItem('studentLoggedIn');
    localStorage.removeItem('currentStudent');
    localStorage.removeItem('studentLoginTime');

    // 清除可能保存的組別和姓名選擇
    localStorage.removeItem('lastSelectedGroup');
    localStorage.removeItem('lastSelectedStudent');

    // 清除其他可能的登入狀態
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loginTime');

    // 清除練習相關的配置（避免影響下次登入）
    localStorage.removeItem('magazinePracticeConfig');
    localStorage.removeItem('practiceTimerId');

    showSuccessMessage('已登出');
    showStudentLogin();
}

// 顯示學習地圖
function showLearningMap() {
    const currentStudent = getCurrentStudent();
    const isAdmin = students[currentStudent] && students[currentStudent].isAdmin;

    const practiceSection = document.getElementById('practice');
    practiceSection.innerHTML = `
        <h2><i class="fas fa-map"></i> 學習地圖</h2>
        <div class="welcome-message">
            <h1>歡迎 ${currentStudent}！</h1>
            <p>選擇您想要練習的學習項目：</p>
        </div>
        
        <div class="learning-map">
            <div class="map-container">
                <!-- 雜誌單字學習區 -->
                <div class="learning-area magazine-area" onclick="openLearningArea('magazine')">
                    <div class="area-icon">
                        <img src="https://cdn-icons-png.flaticon.com/512/2702/2702134.png" alt="雜誌單字" class="area-image">
                    </div>
                    <div class="area-content">
                        <h3>雜誌單字</h3>
                        <p>從有趣的雜誌文章中學習實用單字</p>
                        <div class="area-stats">
                            <span class="stat-item">
                                <i class="fas fa-star"></i>
                                <span>已完成: 0 次</span>
                            </span>
                            <span class="stat-item">
                                <i class="fas fa-trophy"></i>
                                <span>最高分: 0 分</span>
                            </span>
                        </div>
                    </div>
                    <div class="area-arrow">
                        <i class="fas fa-arrow-right"></i>
                    </div>
                </div>

                <!-- 連接線 -->
                <div class="connection-line"></div>

                <!-- 各級別單字學習區 -->
                <div class="learning-area level-area" onclick="openLearningArea('level')">
                    <div class="area-icon">
                        <img src="https://cdn-icons-png.flaticon.com/512/1995/1995515.png" alt="各級別單字" class="area-image">
                    </div>
                    <div class="area-content">
                        <h3>各級別單字</h3>
                        <p>按照不同級別系統性地學習單字</p>
                        <div class="area-stats">
                            <span class="stat-item">
                                <i class="fas fa-star"></i>
                                <span>已完成: 0 次</span>
                            </span>
                            <span class="stat-item">
                                <i class="fas fa-trophy"></i>
                                <span>最高分: 0 分</span>
                            </span>
                        </div>
                    </div>
                    <div class="area-arrow">
                        <i class="fas fa-arrow-right"></i>
                    </div>
                </div>

                <!-- 連接線 -->
                <div class="connection-line"></div>

                <!-- 個人練習成績登記區 -->
                <div class="learning-area score-area" onclick="openLearningArea('score')">
                    <div class="area-icon">
                        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="成績登記" class="area-image">
                    </div>
                    <div class="area-content">
                        <h3>個人練習成績登記</h3>
                        <p>記錄您的練習成績和學習進度</p>
                        <div class="area-stats">
                            <span class="stat-item">
                                <i class="fas fa-calendar"></i>
                                <span>已登記: 0 次</span>
                            </span>
                            <span class="stat-item">
                                <i class="fas fa-chart-line"></i>
                                <span>平均分: 0 分</span>
                            </span>
                        </div>
                    </div>
                    <div class="area-arrow">
                        <i class="fas fa-arrow-right"></i>
                    </div>
                </div>

                ${isAdmin ? `
                <!-- 連接線 -->
                <div class="connection-line"></div>

                <!-- 成績管理區 (僅管理員可見) -->
                <div class="learning-area admin-area" onclick="openLearningArea('admin')">
                    <div class="area-icon">
                        <img src="https://cdn-icons-png.flaticon.com/512/1828/1828640.png" alt="成績管理" class="area-image">
                    </div>
                    <div class="area-content">
                        <h3>成績管理</h3>
                        <p>查看所有學生的練習成績和學習狀況</p>
                        <div class="area-stats">
                            <span class="stat-item">
                                <i class="fas fa-users"></i>
                                <span>總學生: 0 人</span>
                            </span>
                            <span class="stat-item">
                                <i class="fas fa-chart-bar"></i>
                                <span>總記錄: 0 筆</span>
                            </span>
                        </div>
                    </div>
                    <div class="area-arrow">
                        <i class="fas fa-arrow-right"></i>
                    </div>
                </div>
                ` : ''}
            </div>

            <!-- 學習進度總覽 -->
            <div class="progress-overview">
                <h3><i class="fas fa-chart-line"></i> 學習進度總覽</h3>
                <div class="progress-stats">
                    <div class="progress-item">
                        <div class="progress-circle">
                            <span class="progress-number">0</span>
                            <span class="progress-label">總練習次數</span>
                        </div>
                    </div>
                    <div class="progress-item">
                        <div class="progress-circle">
                            <span class="progress-number">0</span>
                            <span class="progress-label">平均分數</span>
                        </div>
                    </div>
                    <div class="progress-item">
                        <div class="progress-circle">
                            <span class="progress-number">0</span>
                            <span class="progress-label">學習天數</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 登出按鈕 -->
            <div style="text-align: center; margin-top: 30px;">
                <button onclick="studentLogout()" class="logout-btn">
                    <i class="fas fa-sign-out-alt"></i> 登出
                </button>
            </div>
        </div>
    `;

    // 更新成績統計
    updateLearningMapStats();

    // 如果是管理員，更新管理員區域的統計數據
    if (isAdmin) {
        updateAdminAreaStats();
    }
}

// 顯示學生登入介面
function showStudentLogin() {
    // 確保清除所有可能保存的選擇
    localStorage.removeItem('lastSelectedGroup');
    localStorage.removeItem('lastSelectedStudent');

    const practiceSection = document.getElementById('practice');
    practiceSection.innerHTML = `
        <h2><i class="fas fa-user-graduate"></i> 學生登入</h2>
        <p>請選擇您的組別和姓名，並輸入密碼：</p>

        <div class="student-login-container">
            <div class="login-form-card">
                <div class="form-header">
                    <i class="fas fa-user-graduate header-icon"></i>
                    <h3>學生身份驗證</h3>
                    <p>請選擇您的組別和姓名進行登入</p>
                </div>

                <div class="form-group">
                    <label for="studentGroup">
                        <i class="fas fa-users"></i> 組別：
                    </label>
                    <select id="studentGroup" onchange="updateStudentNames()" class="form-select" autocomplete="off">
                        <option value="">請選擇組別</option>
                        <option value="B組">B組</option>
                        <option value="C組">C組</option>
                        <option value="D組">D組</option>
                        <option value="E組">E組</option>
                        <option value="F組">F組</option>
                        <option value="教務組">教務組</option>
                        <option value="管理員">管理員</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="studentName">
                        <i class="fas fa-user"></i> 姓名：
                    </label>
                    <select id="studentName" class="form-select" disabled autocomplete="off">
                        <option value="">請先選擇組別</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="studentPassword">
                        <i class="fas fa-key"></i> 密碼：
                    </label>
                    <div class="password-container">
                        <input type="password" id="studentPassword" placeholder="請輸入密碼" class="form-input" autocomplete="new-password">
                        <button type="button" class="password-toggle" onclick="togglePassword()">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>

                <div id="studentLoginError" class="login-error" style="display: none;">
                    <i class="fas fa-exclamation-triangle"></i> 密碼錯誤，請重新輸入
                </div>

                <button onclick="studentLogin()" class="login-submit-btn">
                    <i class="fas fa-sign-in-alt"></i> 登入學習
                </button>

                <div class="login-help">
                    <p><i class="fas fa-info-circle"></i> 如有登入問題，請聯繫管理員</p>
                </div>
            </div>

            <!-- 學生列表 -->
            <div class="student-list-card">
                <h3><i class="fas fa-list"></i> 學生名單</h3>
                <div class="student-groups">
                    <div class="group-section">
                        <h4><span class="group-badge">B組</span></h4>
                        <ul>
                            <li>C2 Yuni</li>
                            <li>C2 Emily</li>
                            <li>A8 Vito</li>
                        </ul>
                    </div>
                    <div class="group-section">
                        <h4><span class="group-badge">C組</span></h4>
                        <ul>
                            <li>A4 Eudora</li>
                            <li>A5 Zoe</li>
                        </ul>
                    </div>
                    <div class="group-section">
                        <h4><span class="group-badge">D組</span></h4>
                        <ul>
                            <li>N6 Bruce</li>
                            <li>N7 Laura</li>
                        </ul>
                    </div>
                    <div class="group-section">
                        <h4><span class="group-badge">E組</span></h4>
                        <ul>
                            <li>K9 Lilian</li>
                            <li>K9 Jill</li>
                        </ul>
                    </div>
                    <div class="group-section">
                        <h4><span class="group-badge">F組</span></h4>
                        <ul>
                            <li>I2 Candy</li>
                            <li>N3 Avery</li>
                        </ul>
                    </div>
                    <div class="group-section">
                        <h4><span class="group-badge">教務組</span></h4>
                        <ul>
                            <li>教務組 Annie</li>
                            <li>教務組 Celina</li>
                            <li>教務組 Nina</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 打開學習區域
function openLearningArea(areaType) {
    // 檢查是否已登入
    if (!isStudentLoggedIn()) {
        showStudentLogin();
        return;
    }

    // 根據學習區域類型決定下一步
    if (areaType === 'magazine') {
        // 雜誌單字練習：打開選擇頁面
        openMagazineSelectionModal();
    } else if (areaType === 'score') {
        // 成績登記：打開成績登記頁面
        openScoreRegistrationModal();
    } else if (areaType === 'level') {
        // 各級別單字：顯示提示訊息
        showLevelPracticeNotice();
    } else if (areaType === 'admin') {
        // 管理員成績管理：顯示所有學生成績
        openAdminPanel();
    } else {
        // 其他練習：直接打開練習
        openPracticeModal(areaType);
    }
}

// 打開管理員面板
function openAdminPanel() {
    const currentStudent = getCurrentStudent();
    const isAdmin = students[currentStudent] && students[currentStudent].isAdmin;

    if (!isAdmin) {
        showError('您沒有權限訪問管理員功能');
        return;
    }

    // 顯示管理員面板
    const practiceSection = document.getElementById('practice');
    practiceSection.innerHTML = `
        <div class="admin-panel">
            <div class="admin-header">
                <h2><i class="fas fa-chart-bar"></i> 成績管理面板</h2>
                <p>歡迎 ${currentStudent}，您可以查看所有學生的練習成績</p>
            </div>
            
            <div class="admin-controls">
                <div class="filter-section">
                    <label for="groupFilter">按組別篩選：</label>
                    <select id="groupFilter" onchange="filterScores()">
                        <option value="">全部組別</option>
                        <option value="B組">B組</option>
                        <option value="C組">C組</option>
                        <option value="D組">D組</option>
                        <option value="E組">E組</option>
                        <option value="F組">F組</option>
                        <option value="教務組">教務組</option>
                    </select>
                    
                    <label for="dateFilter">按日期篩選：</label>
                    <input type="date" id="dateFilter" onchange="filterScores()">
                    
                    <button onclick="refreshScores()" class="refresh-btn">
                        <i class="fas fa-sync-alt"></i> 重新整理
                    </button>
                </div>
            </div>
            
            <div class="admin-stats">
                <div class="stat-card">
                    <h3>總學生數</h3>
                    <div class="stat-number" id="totalStudents">0</div>
                </div>
                <div class="stat-card">
                    <h3>總記錄數</h3>
                    <div class="stat-number" id="totalRecords">0</div>
                </div>
                <div class="stat-card">
                    <h3>平均分數</h3>
                    <div class="stat-number" id="averageScore">0</div>
                </div>
                <div class="stat-card">
                    <h3>今日新增</h3>
                    <div class="stat-number" id="todayRecords">0</div>
                </div>
            </div>
            
            <div class="scores-table-container">
                <h3><i class="fas fa-table"></i> 所有學生成績記錄</h3>
                <div class="table-wrapper">
                    <table class="scores-table" id="scoresTable">
                        <thead>
                            <tr>
                                <th>學生姓名</th>
                                <th>組別</th>
                                <th>練習類型</th>
                                <th>分數</th>
                                <th>日期</th>
                                <th>備註</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody id="scoresTableBody">
                            <tr>
                                <td colspan="7" class="loading">載入中...</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="admin-actions">
                <button onclick="exportScores()" class="export-btn">
                    <i class="fas fa-download"></i> 匯出成績
                </button>
                <button onclick="showLearningMap()" class="back-btn">
                    <i class="fas fa-arrow-left"></i> 返回學習地圖
                </button>
            </div>
        </div>
    `;

    // 載入成績數據
    loadAllScores();

    // 設置自動刷新（每30秒刷新一次）
    setInterval(async () => {
        console.log('自動刷新成績數據...');
        await loadAllScores();
    }, 30000);
}

// 載入所有成績數據
async function loadAllScores() {
    try {
        // 使用 SQLite API 服務
        if (window.apiService && typeof window.apiService.getAllScores === 'function') {
            console.log('使用 SQLite 載入成績數據');
            const scores = await window.apiService.getAllScores();
            console.log('載入到的成績數據:', scores);
            displayScores(scores);
            updateAdminStats(scores);
        } else {
            console.log('SQLite API 服務不可用，使用本地存儲作為備用');
            // 使用本地存儲作為備用
            const scores = getLocalScores();
            displayScores(scores);
            updateAdminStats(scores);
        }
    } catch (error) {
        console.error('載入成績失敗:', error);
        console.log('使用本地存儲作為備用方案');

        // 使用本地存儲作為備用
        const scores = getLocalScores();
        displayScores(scores);
        updateAdminStats(scores);
    }
}

// 顯示成績數據
function displayScores(scores) {
    const tbody = document.getElementById('scoresTableBody');

    if (!scores || scores.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="no-data">暫無成績記錄</td></tr>';
        return;
    }

    tbody.innerHTML = scores.map(score => `
        <tr>
            <td>${score.studentName || score.student_name}</td>
            <td>${getStudentGroup(score.studentName || score.student_name)}</td>
            <td>${score.quizType || score.quiz_type}</td>
            <td>${score.score}</td>
            <td>${formatDate(score.date)}</td>
            <td>${score.notes || '-'}</td>
            <td>
                <button onclick="viewScoreDetails('${score.id}')" class="view-btn">
                    <i class="fas fa-eye"></i> 查看
                </button>
            </td>
        </tr>
    `).join('');
}

// 更新管理員統計數據
function updateAdminStats(scores) {
    const totalStudents = new Set(scores.map(s => s.studentName || s.student_name)).size;
    const totalRecords = scores.length;
    const averageScore = scores.length > 0 ?
        Math.round(scores.reduce((sum, s) => sum + s.score, 0) / scores.length) : 0;

    const today = new Date().toDateString();
    const todayRecords = scores.filter(s =>
        new Date(s.date).toDateString() === today
    ).length;

    document.getElementById('totalStudents').textContent = totalStudents;
    document.getElementById('totalRecords').textContent = totalRecords;
    document.getElementById('averageScore').textContent = averageScore;
    document.getElementById('todayRecords').textContent = todayRecords;
}

// 篩選成績
async function filterScores() {
    const groupFilter = document.getElementById('groupFilter').value;
    const dateFilter = document.getElementById('dateFilter').value;

    try {
        // 重新載入並篩選數據
        let scores;
        if (window.apiService) {
            scores = await window.apiService.getAllScores();
        } else {
            scores = getLocalScores();
        }

        let filteredScores = scores;

        if (groupFilter) {
            filteredScores = filteredScores.filter(score =>
                getStudentGroup(score.studentName || score.student_name) === groupFilter
            );
        }

        if (dateFilter) {
            filteredScores = filteredScores.filter(score =>
                score.date.startsWith(dateFilter)
            );
        }

        displayScores(filteredScores);
    } catch (error) {
        console.error('篩選成績失敗:', error);
        // 使用本地存儲作為備用
        const scores = getLocalScores();
        displayScores(scores);
    }
}

// 重新整理成績
async function refreshScores() {
    console.log('重新整理成績數據...');
    await loadAllScores();
    showSuccessMessage('成績數據已更新！');
}

// 匯出成績
function exportScores() {
    // 實現匯出功能
    showSuccess('匯出功能開發中...');
}

// 查看成績詳情
function viewScoreDetails(scoreId) {
    // 實現查看詳情功能
    showSuccess('詳情查看功能開發中...');
}

// 獲取學生組別
function getStudentGroup(studentName) {
    return students[studentName] ? students[studentName].group : '未知';
}

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-TW');
}

// 獲取本地存儲的成績（備用）
function getLocalScores() {
    const scores = [];

    // 檢查是否有本地存儲的成績
    let hasLocalScores = false;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('score_')) {
            hasLocalScores = true;
            try {
                const score = JSON.parse(localStorage.getItem(key));
                scores.push(score);
            } catch (e) {
                console.error('解析成績數據失敗:', e);
            }
        }
    }

    // 如果沒有本地成績，創建一些示例數據
    if (!hasLocalScores) {
        console.log('創建示例成績數據');
        const sampleScores = [
            {
                id: 'sample_1',
                student_name: 'C2 Yuni',
                quiz_type: 'magazine_vocabulary',
                score: 85,
                total_questions: 36,
                percentage: 85.00,
                date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                notes: '雜誌單字練習'
            },
            {
                id: 'sample_2',
                student_name: 'C2 Emily',
                quiz_type: 'magazine_vocabulary',
                score: 92,
                total_questions: 36,
                percentage: 92.00,
                date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                notes: '雜誌單字練習'
            },
            {
                id: 'sample_3',
                student_name: 'A8 Vito',
                quiz_type: 'level_practice',
                score: 78,
                total_questions: 50,
                percentage: 78.00,
                date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                notes: '各級別單字練習'
            },
            {
                id: 'sample_4',
                student_name: 'A4 Eudora',
                quiz_type: 'paragraph_reading',
                score: 88,
                total_questions: 30,
                percentage: 88.00,
                date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
                notes: '段落閱讀練習'
            },
            {
                id: 'sample_5',
                student_name: 'A5 Zoe',
                quiz_type: 'mixed_questions',
                score: 95,
                total_questions: 100,
                percentage: 95.00,
                date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                notes: '混合題型練習'
            }
        ];

        // 保存示例數據到本地存儲
        sampleScores.forEach((score, index) => {
            const key = `score_sample_${index + 1}`;
            localStorage.setItem(key, JSON.stringify(score));
        });

        return sampleScores;
    }

    return scores.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// 顯示登入模態框
function showLoginModal(areaType) {
    // 儲存要打開的學習區域類型
    window.pendingArea = areaType;

    // 清空輸入欄位
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('loginError').style.display = 'none';

    // 顯示登入模態框
    document.getElementById('loginModal').style.display = 'block';
}

// 登入驗證
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');

    // 驗證帳號密碼
    if (username === 'Joyloveyou' && password === 'Joyloveyou') {
        // 登入成功
        setLoggedIn(true);
        closeModal('loginModal');

        // 打開練習模態框
        if (window.pendingArea) {
            openPracticeModal(window.pendingArea);
            window.pendingArea = null;
        }

        showSuccessMessage('登入成功！');
    } else {
        // 登入失敗
        errorDiv.style.display = 'flex';
        document.getElementById('password').value = '';
        document.getElementById('password').focus();
    }
}

// 檢查登入狀態
function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

// 設置登入狀態
function setLoggedIn(status) {
    if (status) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('loginTime', new Date().toISOString());
    } else {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('loginTime');
    }
}

// 登出
function logout() {
    setLoggedIn(false);
    showSuccessMessage('已登出');
}

// 打開練習模態框（內部函數）
function openPracticeModal(areaType) {
    currentStudent = areaType;
    const modal = document.getElementById('practiceModal');
    const title = document.getElementById('practiceTitle');

    // 根據學習區域類型設置標題
    const areaNames = {
        'magazine': '雜誌單字練習',
        'level': '各級別單字練習'
    };

    title.textContent = areaNames[areaType] || '練習內容';

    // 載入練習資料
    loadPracticeContent(areaType);

    modal.style.display = 'block';
}

// 載入練習內容
function loadPracticeContent(areaType) {
    const practiceContent = document.querySelector('#practiceModal .modal-content');

    // 更新練習內容
    updatePracticeSections(areaType);

    // 載入已儲存的分數
    loadScores(areaType);
}

// 更新練習區塊
function updatePracticeSections(areaType) {
    const practiceContainer = document.querySelector('#practiceModal .modal-content');

    // 根據學習區域類型顯示對應的練習內容
    let practiceHTML = '';

    if (areaType === 'magazine') {
        practiceHTML = `
            <div class="practice-section">
                <div class="practice-title">
                    <i class="fas fa-book"></i> 雜誌單字練習
                </div>
                <div class="practice-content">
                    <h4>練習說明：</h4>
                    <p>選擇您想要練習的題數：1~36題、1~72題或1~108題</p>
                    <button onclick="openMagazineSelectionModal()" class="start-practice-btn" style="background: var(--primary-gradient); color: white; border: none; padding: 15px 30px; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; margin-top: 15px; display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-play"></i> 選擇練習題數
                    </button>
                </div>
            </div>
        `;
    } else if (areaType === 'level') {
        practiceHTML = `
            <div class="practice-section">
                <div class="practice-title">
                    <i class="fas fa-language"></i> 各級別單字練習
                </div>
                <div class="practice-content">
                    <h4>練習說明：</h4>
                    <p>按照不同級別系統性地學習單字，從基礎到進階逐步提升！</p>
                    <div class="practice-example">
                        <h5>練習範例：</h5>
                        <p><strong>基礎級別：</strong> happy, sad, big, small</p>
                        <p><strong>中級級別：</strong> delighted, miserable, enormous, tiny</p>
                        <p><strong>高級級別：</strong> ecstatic, despondent, colossal, minuscule</p>
                    </div>
                    <textarea id="level-answer" placeholder="請在此輸入您的練習答案..." rows="6" style="width: 100%; padding: 15px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 16px; margin-top: 15px;"></textarea>
                </div>
            </div>
        `;
    }

    // 插入分數輸入區域
    practiceHTML += `
        <div class="score-input">
            <h3><i class="fas fa-chart-line"></i> 成績記錄</h3>
            <div class="score-field">
                <label>本次練習分數:</label>
                <input type="number" id="score-${areaType}" min="0" max="100" placeholder="0-100">
            </div>
            <button class="save-score" onclick="saveScores()">
                <i class="fas fa-save"></i> 儲存分數
            </button>
        </div>
    `;

    // 替換練習內容
    const existingSections = practiceContainer.querySelectorAll('.practice-section, .score-input');
    existingSections.forEach(section => section.remove());

    practiceContainer.insertAdjacentHTML('beforeend', practiceHTML);
}

// 載入分數
function loadScores(areaType) {
    // 這裡可以從資料庫載入歷史分數
    const scores = practiceData[areaType] || {};

    Object.keys(scores).forEach(category => {
        const scoreInput = document.getElementById(`score-${category}`);
        if (scoreInput && scores[category].score > 0) {
            scoreInput.value = scores[category].score;
        }
    });
}

// 雜誌練習相關變數
let magazinePracticeConfig = null;
let magazineQuestions = [];
let magazineTimerId = null;

// 打開雜誌單字練習選擇模態框
function openMagazineSelectionModal() {
    const modal = document.getElementById('magazineSelectionModal');
    modal.style.display = 'block';
}

// 開始雜誌單字練習
function startMagazinePractice(questionCount) {
    // 關閉選擇模態框
    closeModal('magazineSelectionModal');

    // 初始化練習
    magazinePracticeConfig = {
        totalQuestions: questionCount,
        currentQuestion: 1,
        correctAnswers: 0,
        incorrectAnswers: 0,
        startTime: new Date(),
        userAnswers: []
    };

    // 生成題目
    generateMagazineQuestions(questionCount);

    // 顯示練習模態框
    openMagazinePracticeModal();

    // 載入第一題
    loadMagazineQuestion(1);

    // 開始計時
    startMagazineTimer();
}

// 開啟詞彙填空遊戲
function openVocabularyQuiz(part) {
    // 關閉選擇模態框
    closeModal('magazineSelectionModal');

    // 獲取當前學生資訊
    const currentStudent = getCurrentStudent() || 'Anonymous';

    // 根據部分選擇對應的文件
    let quizFile = '';
    switch (part) {
        case 'part1':
            quizFile = 'vocabulary_quiz_part1.html';
            break;
        case 'part2':
            quizFile = 'vocabulary_quiz_part2.html';
            break;
        case 'part3':
            quizFile = 'vocabulary_quiz_part3.html';
            break;
        case 'full':
            quizFile = 'vocabulary_quiz_full.html';
            break;
        default:
            console.error('Invalid part:', part);
            return;
    }

    // 添加學生資訊到URL參數
    const urlWithParams = `${quizFile}?student=${encodeURIComponent(currentStudent)}`;

    // 在當前頁面開啟
    window.location.href = urlWithParams;
}

function openMagazinePracticeModal() {
    document.getElementById('magazinePracticeModal').style.display = 'block';

    // 更新題目選擇器
    updateMagazineQuestionSelector();

    // 更新進度條
    updateMagazineProgress();

    // 添加鍵盤事件監聽
    addMagazineKeyboardListeners();
}

function closeMagazinePractice() {
    document.getElementById('magazinePracticeModal').style.display = 'none';
    stopMagazineTimer();

    // 移除鍵盤事件監聽
    removeMagazineKeyboardListeners();

    // 重置練習狀態
    magazinePracticeConfig = null;
}

// 添加鍵盤事件監聽
function addMagazineKeyboardListeners() {
    document.addEventListener('keydown', handleMagazineKeyboard);
}

// 移除鍵盤事件監聽
function removeMagazineKeyboardListeners() {
    document.removeEventListener('keydown', handleMagazineKeyboard);
}

// 處理鍵盤事件
function handleMagazineKeyboard(event) {
    // 如果焦點在輸入框上，不處理導航快捷鍵
    if (event.target.id === 'magazineAnswerInput') {
        // 只處理 Enter 鍵提交答案
        if (event.key === 'Enter') {
            event.preventDefault();
            submitMagazineAnswer();
        }
        return;
    }

    switch (event.key) {
        case 'ArrowLeft':
            event.preventDefault();
            if (magazinePracticeConfig.currentQuestion > 1) {
                previousMagazineQuestion();
            }
            break;
        case 'ArrowRight':
            event.preventDefault();
            if (magazinePracticeConfig.currentQuestion < magazinePracticeConfig.totalQuestions) {
                nextMagazineQuestion();
            }
            break;
        case 'Enter':
            event.preventDefault();
            submitMagazineAnswer();
            break;
        case 'Escape':
            event.preventDefault();
            closeMagazinePractice();
            break;
    }
}

function generateMagazineQuestions(count) {
    // 從MJ3.html的題目中選擇指定數量
    const allQuestions = [
        { clue: "He always r___s books before bed.", answer: "reads", image: "images/reading.jpg" },
        { clue: "My mom likes to go for a walk at the p_____.", answer: "park", image: "images/park.jpg" },
        { clue: "I usually walk my dog at the p______ in the evening.", answer: "park", image: "images/park2.jpg" },
        { clue: "Tom enjoys playing with his friends at the p__________.", answer: "playground", image: "images/playground.jpg" },
        { clue: "My favorite activity is playing seesaw at the p__________.", answer: "playground", image: "images/seesaw.jpg" },
        { clue: "He is working at the o_______ this afternoon.", answer: "office", image: "images/office.jpg" },
        { clue: "You should go to the teacher's o _______.", answer: "office", image: "images/teacher-office.jpg" },
        { clue: "There are so many animals in the z ______.", answer: "zoo", image: "images/zoo.jpg" },
        { clue: "You can see a lion in the z ______.", answer: "zoo", image: "images/lion.jpg" },
        { clue: "She's angry because her brother broke her d______.", answer: "doll", image: "images/doll.jpg" },
        { clue: "My sister likes to play with her d______ at her free time.", answer: "doll", image: "images/doll2.jpg" },
        { clue: "Sam's hobby is collecting c______.", answer: "cards", image: "images/cards.jpg" },
        { clue: "The magician is showing his tricks with a pair of c______s.", answer: "cards", image: "images/magic-cards.jpg" },
        { clue: "Hank needs someone to fix his r_________.", answer: "robot", image: "images/robot.jpg" },
        { clue: "The movie \"Transformers\" is a story about _________.", answer: "robots", image: "images/transformers.jpg" },
        { clue: "Now I can play v_______ g_______ at home.", answer: "video games", image: "images/video-games.jpg" },
        { clue: "Bobby can not play v_______ g_______ before homework.", answer: "video games", image: "images/gaming.jpg" },
        { clue: "Matt likes to fly a k_______ at the park.", answer: "kite", image: "images/kite.jpg" },
        { clue: "My favorite activity is flying a k_______.", answer: "kite", image: "images/kite2.jpg" },
        { clue: "There are s___________ people in the classroom.", answer: "sixteen", image: "images/classroom.jpg" },
        { clue: "Ten plus seven is s____________.", answer: "seventeen", image: "images/math.jpg" },
        { clue: "There are t_________ p_________ on the stage.", answer: "twenty people", image: "images/stage.jpg" },
        { clue: "Stinky tofu is a famous food from T__________.", answer: "Taiwan", image: "images/taiwan.jpg" },
        { clue: "You have to go to t______ U______.", answer: "the USA", image: "images/usa.jpg" },
        { clue: "London is a city in E__________.", answer: "England", image: "images/london.jpg" },
        { clue: "The Great Wall is a famous place in C________.", answer: "China", image: "images/great-wall.jpg" },
        { clue: "Paris is a city in F_________.", answer: "France", image: "images/paris.jpg" },
        { clue: "How is the w__________ today?", answer: "weather", image: "images/weather.jpg" },
        { clue: "It's s________ outside.", answer: "snowy", image: "images/snow.jpg" },
        { clue: "Tomorrow will be r________.", answer: "rainy", image: "images/rain.jpg" },
        { clue: "It's s________ and it's very hot outside.", answer: "sunny", image: "images/sunny.jpg" },
        { clue: "It's w________ outside.", answer: "windy", image: "images/windy.jpg" },
        { clue: "We can build a s__________ at the yard.", answer: "snowman", image: "images/snowman.jpg" },
        { clue: "Betty has a pretty f______.", answer: "face", image: "images/face.jpg" },
        { clue: "People listen to others with their e______.", answer: "ears", image: "images/ears.jpg" },
        { clue: "People see everything with their e______.", answer: "eyes", image: "images/eyes.jpg" },
        { clue: "There's something wrong with my n_______.", answer: "nose", image: "images/nose.jpg" },
        { clue: "Don't talk with food in your m_______.", answer: "mouth", image: "images/mouth.jpg" },
        { clue: "Monkeys have l_______ arms and s______ legs.", answer: "long, short", image: "images/monkey.jpg" },
        { clue: "It is important to wash our h_______ before we eat.", answer: "hands", image: "images/hands.jpg" },
        { clue: "Henry just hurt his l_____.", answer: "leg", image: "images/leg.jpg" },
        { clue: "I usually go to school on f______.", answer: "foot", image: "images/foot.jpg" },
        { clue: "Three times ten is t_________.", answer: "thirty", image: "images/math2.jpg" },
        { clue: "The m__________ just made the bird disappear.", answer: "magician", image: "images/magician.jpg" },
        { clue: "The s_________ is singing my favorite song!", answer: "singer", image: "images/singer.jpg" },
        { clue: "Her dream is to become a s________.", answer: "singer", image: "images/singer2.jpg" },
        { clue: "My grandfather is a f_______, he works under the sun.", answer: "farmer", image: "images/farmer.jpg" },
        { clue: "When I am sick, I go to see a d_________.", answer: "doctor", image: "images/doctor.jpg" },
        { clue: "I want to be a n_________ to help the doctor.", answer: "nurse", image: "images/nurse.jpg" },
        { clue: "There are many f__________ in the yard.", answer: "flowers", image: "images/flowers.jpg" },
        { clue: "Don't let the b______ come inside.", answer: "bugs", image: "images/bugs.jpg" },
        { clue: "Ally is scared of b_______.", answer: "bugs", image: "images/bugs2.jpg" },
        { clue: "There are f_______ around the garbage.", answer: "flies", image: "images/flies.jpg" },
        { clue: "Be careful when you see a b______.", answer: "bee", image: "images/bee.jpg" },
        { clue: "You can see beautiful b___________ near flowers.", answer: "butterflies", image: "images/butterflies.jpg" },
        { clue: "Our school took us to the m__________.", answer: "museum", image: "images/museum.jpg" },
        { clue: "Is there any m______ on the table?", answer: "mugs", image: "images/mugs.jpg" },
        { clue: "I need a m_____ to help me find it.", answer: "map", image: "images/map.jpg" },
        { clue: "m _______ is a useful thing to find direction.", answer: "map", image: "images/map2.jpg" },
        { clue: "I want to write a c_______ to my mom.", answer: "card", image: "images/card.jpg" },
        { clue: "My uncle sent me a p__________ from Japan.", answer: "postcard", image: "images/postcard.jpg" },
        { clue: "I used a b___________ to mark my page.", answer: "bookmark", image: "images/bookmark.jpg" },
        { clue: "Bella put some s_________ on her pencil case.", answer: "stickers", image: "images/stickers.jpg" },
        { clue: "I need a n_____________ to take notes.", answer: "notebook", image: "images/notebook.jpg" },
        { clue: "Let me get a r________ to check the length.", answer: "ruler", image: "images/ruler.jpg" },
        { clue: "I need a red c________ to color it.", answer: "crayon", image: "images/crayon.jpg" },
        { clue: "Get a p_________ c_______ to store your pens.", answer: "pencil case", image: "images/pencil-case.jpg" },
        { clue: "David is good at art. He can d_______ almost everything.", answer: "draw", image: "images/draw.jpg" },
        { clue: "The homework is to d________ an apple.", answer: "draw", image: "images/draw2.jpg" },
        { clue: "Maybe we can get some markers to p________ it.", answer: "paint", image: "images/paint.jpg" },
        { clue: "John s_______ hard to get good grades on the exam.", answer: "studies", image: "images/study.jpg" },
        { clue: "I just s_________ history for two hours.", answer: "studied", image: "images/study2.jpg" },
        { clue: "My dad w_________ every day.", answer: "works", image: "images/work.jpg" },
        { clue: "After Mom finish her w_______, she can take us out.", answer: "work", image: "images/work2.jpg" },
        { clue: "You have to d ________ more warm water.", answer: "drink", image: "images/drink.jpg" },
        { clue: "I want to d________ some ice water.", answer: "drink", image: "images/drink2.jpg" },
        { clue: "The baby is c_________. He might be hungry.", answer: "crying", image: "images/crying.jpg" },
        { clue: "Eddy c ________ because he doesn't do well on the test.", answer: "cries", image: "images/cry.jpg" },
        { clue: "Be polite when you t______ to your teacher.", answer: "talk", image: "images/talk.jpg" },
        { clue: "We should not t______ to each other in class.", answer: "talk", image: "images/talk2.jpg" },
        { clue: "May I w________ T______ after I finish my homework?", answer: "watch TV", image: "images/tv.jpg" },
        { clue: "My dad likes to w______ T___ when he goes home.", answer: "watch TV", image: "images/tv2.jpg" },
        { clue: "Who c_______ this chicken? It tasted very yummy.", answer: "cooked", image: "images/cook.jpg" },
        { clue: "My mom always c_______ a lot of food for me.", answer: "cooks", image: "images/cook2.jpg" },
        { clue: "Everybody please l____ ____ and wait for the teacher.", answer: "line up", image: "images/line-up.jpg" },
        { clue: "There are many people ______ ____ in front of the restaurant.", answer: "line up", image: "images/line-up2.jpg" },
        { clue: "I want to t_______ p__________ with him.", answer: "take pictures", image: "images/camera.jpg" },
        { clue: "We use a camera to t_______ p__________.", answer: "take pictures", image: "images/camera2.jpg" },
        { clue: "I r_____ ___ b______ to school.", answer: "ride a bike", image: "images/bike.jpg" },
        { clue: "I w______ ___ n_____ when I was in class.", answer: "write a note", image: "images/note.jpg" },
        { clue: "I like to r____.", answer: "run", image: "images/run.jpg" },
        { clue: "Don't r_____ in the classroom.", answer: "run", image: "images/run2.jpg" },
        { clue: "Before PE class, teacher tells us to j____.", answer: "jog", image: "images/jog.jpg" },
        { clue: "It likes to s______ in the pool.", answer: "swim", image: "images/swim.jpg" },
        { clue: "On Mother's Day, I h____ my mom to thank her.", answer: "hug", image: "images/hug.jpg" },
        { clue: "At the end of the magic show, we c______ for the magician.", answer: "clap", image: "images/clap.jpg" },
        { clue: "What a beautiful song! Please c______ for the singer.", answer: "clap", image: "images/clap2.jpg" }
    ];

    // 隨機選擇指定數量的題目
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    magazineQuestions = shuffled.slice(0, count);
}

function loadMagazineQuestion(questionNumber) {
    if (!magazineQuestions || questionNumber < 1 || questionNumber > magazineQuestions.length) {
        return;
    }

    const question = magazineQuestions[questionNumber - 1];
    const questionIndex = questionNumber - 1;

    // 更新題目編號
    document.getElementById('magazineQuestionNumber').textContent = questionNumber + '.';

    // 更新題目內容
    document.getElementById('magazineQuestionContent').textContent = question.clue;

    // 更新題目圖片
    const imageElement = document.getElementById('magazineQuestionImage');
    const imageOverlay = document.querySelector('.image-overlay');

    if (question.image && question.image !== '') {
        imageElement.src = question.image;
        imageElement.style.display = 'block';
        imageOverlay.style.display = 'none';
    } else {
        imageElement.style.display = 'none';
        imageOverlay.style.display = 'flex';
    }

    // 清空答案輸入框並聚焦
    const answerInput = document.getElementById('magazineAnswerInput');
    answerInput.value = '';
    answerInput.focus();

    // 隱藏答案反饋
    document.getElementById('magazineAnswerFeedback').style.display = 'none';

    // 更新導航按鈕狀態
    updateMagazineNavigationButtons(questionNumber);

    // 更新進度
    updateMagazineProgress();

    // 手機優化：滾動到頂部
    if (window.innerWidth <= 768) {
        const modalContent = document.querySelector('.magazine-practice-content');
        if (modalContent) {
            modalContent.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
}

function submitMagazineAnswer() {
    const userAnswer = document.getElementById('magazineAnswerInput').value.trim().toLowerCase();
    const currentQuestion = magazinePracticeConfig.currentQuestion;
    const question = magazineQuestions[currentQuestion - 1];

    if (!userAnswer) {
        // 手機友好的提示
        showMobileToast('請輸入答案！', 'warning');
        return;
    }

    const isCorrect = userAnswer === question.answer.toLowerCase();
    const feedbackElement = document.getElementById('magazineAnswerFeedback');

    // 儲存用戶答案
    magazinePracticeConfig.userAnswers[currentQuestion - 1] = userAnswer;

    // 更新統計
    if (isCorrect) {
        magazinePracticeConfig.correctAnswers++;
        feedbackElement.className = 'answer-feedback correct';
        feedbackElement.innerHTML = `<i class="fas fa-check-circle"></i> 正確！答案：${question.answer}`;
        showMobileToast('答對了！', 'success');
    } else {
        magazinePracticeConfig.incorrectAnswers++;
        feedbackElement.className = 'answer-feedback incorrect';
        feedbackElement.innerHTML = `<i class="fas fa-times-circle"></i> 錯誤！正確答案：${question.answer}`;
        showMobileToast('答錯了，再接再厲！', 'error');
    }

    feedbackElement.style.display = 'block';

    // 更新統計顯示
    updateMagazineStats();

    // 檢查是否完成所有題目
    if (currentQuestion === magazinePracticeConfig.totalQuestions) {
        setTimeout(() => {
            completeMagazinePractice();
        }, 2000);
    }
}

// 手機友好的提示功能
function showMobileToast(message, type = 'info') {
    // 移除現有的提示
    const existingToast = document.querySelector('.mobile-toast');
    if (existingToast) {
        existingToast.remove();
    }

    // 創建新的提示
    const toast = document.createElement('div');
    toast.className = `mobile-toast mobile-toast-${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'times-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;

    // 添加到頁面
    document.body.appendChild(toast);

    // 顯示動畫
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    // 自動隱藏
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    }, 3000);
}

function updateMagazineNavigationButtons(currentQuestion) {
    const prevBtn = document.querySelector('.magazine-navigation-buttons .prev-btn');
    const nextBtn = document.querySelector('.magazine-navigation-buttons .next-btn');

    prevBtn.disabled = currentQuestion === 1;
    nextBtn.disabled = currentQuestion === magazinePracticeConfig.totalQuestions;
}

function previousMagazineQuestion() {
    if (magazinePracticeConfig.currentQuestion > 1) {
        magazinePracticeConfig.currentQuestion--;
        loadMagazineQuestion(magazinePracticeConfig.currentQuestion);
    }
}

function nextMagazineQuestion() {
    if (magazinePracticeConfig.currentQuestion < magazinePracticeConfig.totalQuestions) {
        magazinePracticeConfig.currentQuestion++;
        loadMagazineQuestion(magazinePracticeConfig.currentQuestion);
    }
}

function goToMagazineQuestion() {
    const questionNumber = parseInt(document.getElementById('magazineQuestionSelect').value);
    magazinePracticeConfig.currentQuestion = questionNumber;
    loadMagazineQuestion(questionNumber);
}

function updateMagazineQuestionSelector() {
    const select = document.getElementById('magazineQuestionSelect');
    const totalQuestions = document.getElementById('magazineTotalQuestions');

    // 清空現有選項
    select.innerHTML = '';

    // 添加新選項
    for (let i = 1; i <= magazinePracticeConfig.totalQuestions; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `第 ${i} 題`;
        select.appendChild(option);
    }

    // 更新總題數顯示
    totalQuestions.textContent = `/ ${magazinePracticeConfig.totalQuestions} 題`;
}

function updateMagazineProgress() {
    const currentQuestion = magazinePracticeConfig.currentQuestion;
    const totalQuestions = magazinePracticeConfig.totalQuestions;
    const progressPercentage = (currentQuestion / totalQuestions) * 100;

    // 更新進度條
    document.getElementById('magazineProgressFill').style.width = progressPercentage + '%';

    // 更新進度文字
    document.getElementById('magazineProgressText').textContent = `${currentQuestion} / ${totalQuestions}`;

    // 更新題目計數器
    document.getElementById('magazineQuestionCounter').textContent = `第 ${currentQuestion} 題 / 共 ${totalQuestions} 題`;
}

function updateMagazineStats() {
    const correct = magazinePracticeConfig.correctAnswers;
    const incorrect = magazinePracticeConfig.incorrectAnswers;
    const total = correct + incorrect;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

    document.getElementById('magazineCorrectCount').textContent = correct;
    document.getElementById('magazineIncorrectCount').textContent = incorrect;
    document.getElementById('magazineAccuracyRate').textContent = accuracy + '%';
}

function startMagazineTimer() {
    magazineTimerId = setInterval(() => {
        const now = new Date();
        const elapsed = Math.floor((now - magazinePracticeConfig.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;

        document.getElementById('magazineTimer').textContent =
            `時間：${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

function stopMagazineTimer() {
    if (magazineTimerId) {
        clearInterval(magazineTimerId);
        magazineTimerId = null;
    }
}

function completeMagazinePractice() {
    stopMagazineTimer();

    // 計算總分
    const totalQuestions = magazinePracticeConfig.totalQuestions;
    const correctAnswers = magazinePracticeConfig.correctAnswers;
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    // 顯示完成訊息
    const completionMessage = `
        <div style="text-align: center; padding: 30px;">
            <h2 style="color: #4CAF50; margin-bottom: 20px;">
                <i class="fas fa-trophy"></i> 練習完成！
            </h2>
            <div style="background: rgba(255, 255, 255, 0.1); border-radius: 15px; padding: 20px; margin: 20px 0;">
                <p style="font-size: 18px; margin-bottom: 10px;">總分：<strong style="color: #4CAF50;">${score} 分</strong></p>
                <p style="font-size: 16px; margin-bottom: 5px;">正確：${correctAnswers} 題</p>
                <p style="font-size: 16px; margin-bottom: 5px;">錯誤：${totalQuestions - correctAnswers} 題</p>
                <p style="font-size: 16px;">總題數：${totalQuestions} 題</p>
            </div>
            <button onclick="closeMagazinePractice()" style="
                background: #4CAF50; 
                color: white; 
                border: none; 
                padding: 12px 25px; 
                border-radius: 8px; 
                font-size: 16px; 
                cursor: pointer;
                margin-top: 20px;
            ">
                <i class="fas fa-check"></i> 完成
            </button>
        </div>
    `;

    // 替換題目內容區域
    document.getElementById('magazineQuestionContainer').innerHTML = completionMessage;

    // 隱藏導航和統計
    document.querySelector('.magazine-question-navigation').style.display = 'none';
    document.querySelector('.magazine-navigation-buttons').style.display = 'none';
    document.querySelector('.magazine-practice-stats').style.display = 'none';
}

// 添加鍵盤事件監聽
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && document.getElementById('magazinePracticeModal').style.display === 'block') {
        event.preventDefault();
        submitMagazineAnswer();
    }
});

// 生成範例題目
function generateSampleQuestions(count) {
    const questions = [];
    const samplePrompts = [
        '請填入缺少的字母：app_e (apple)',
        '請填入缺少的字母：b_ok (book)',
        '請填入缺少的字母：c_t (cat)',
        '請填入缺少的字母：d_g (dog)',
        '請填入缺少的字母：h_se (house)',
        '請填入缺少的字母：c_r (car)',
        '請填入缺少的字母：tr_e (tree)',
        '請填入缺少的字母：fl_wer (flower)',
        '請填入缺少的字母：s_n (sun)',
        '請填入缺少的字母：m_n (moon)'
    ];

    for (let i = 0; i < count; i++) {
        const promptIndex = i % samplePrompts.length;
        questions.push({
            prompt: samplePrompts[promptIndex],
            example: 'apple → 填入 "l"',
            answer: 'l'
        });
    }

    return questions;
}

// 更新導航按鈕狀態
function updateNavigationButtons(currentQuestion, totalQuestions) {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const completeBtn = document.querySelector('.complete-practice');

    // 上一題按鈕
    prevBtn.disabled = currentQuestion <= 1;

    // 下一題按鈕
    if (currentQuestion >= totalQuestions) {
        nextBtn.style.display = 'none';
        completeBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        completeBtn.style.display = 'none';
    }
}

// 開始練習計時器
function startPracticeTimer() {
    const timerElement = document.getElementById('practiceTimer');
    const startTime = new Date();

    const timer = setInterval(() => {
        const now = new Date();
        const elapsed = now - startTime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);

        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);

    // 儲存計時器ID以便停止
    localStorage.setItem('practiceTimerId', timer);
}

// 停止練習計時器
function stopPracticeTimer() {
    const timerId = localStorage.getItem('practiceTimerId');
    if (timerId) {
        clearInterval(parseInt(timerId));
        localStorage.removeItem('practiceTimerId');
    }
}

// 提交答案
function submitAnswer() {
    const answerInput = document.getElementById('answerInput');
    const answer = answerInput.value.trim().toLowerCase();

    if (!answer) {
        alert('請輸入答案！');
        return;
    }

    const config = JSON.parse(localStorage.getItem('magazinePracticeConfig') || '{}');
    const currentQuestion = config.currentQuestion;

    // 這裡可以檢查答案正確性
    // 目前使用簡單的範例檢查
    const isCorrect = checkAnswer(currentQuestion, answer);

    // 更新統計
    if (isCorrect) {
        config.correctAnswers++;
        showAnswerFeedback(true);
    } else {
        config.incorrectAnswers++;
        showAnswerFeedback(false);
    }

    // 儲存答案
    config.answers[currentQuestion - 1] = {
        question: currentQuestion,
        answer: answer,
        correct: isCorrect
    };

    // 更新配置
    localStorage.setItem('magazinePracticeConfig', JSON.stringify(config));

    // 更新統計顯示
    updatePracticeStats();

    // 清空輸入框
    answerInput.value = '';

    // 自動進入下一題
    setTimeout(() => {
        if (currentQuestion < config.totalQuestions) {
            nextQuestion();
        } else {
            completePractice();
        }
    }, 1500);
}

// 檢查答案
function checkAnswer(questionNumber, answer) {
    // 這裡可以實現實際的答案檢查邏輯
    // 目前使用簡單的範例
    const sampleAnswers = ['l', 'o', 'a', 'o', 'u', 'a', 'e', 'o', 'u', 'o'];
    const answerIndex = (questionNumber - 1) % sampleAnswers.length;
    return answer === sampleAnswers[answerIndex];
}

// 顯示答案反饋
function showAnswerFeedback(isCorrect) {
    const feedback = document.createElement('div');
    feedback.className = `answer-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    feedback.innerHTML = `
        <i class="fas fa-${isCorrect ? 'check' : 'times'}"></i>
        ${isCorrect ? '正確！' : '錯誤，請再試一次'}
    `;

    document.body.appendChild(feedback);

    setTimeout(() => {
        feedback.remove();
    }, 1500);
}

// 更新練習統計
function updatePracticeStats() {
    const config = JSON.parse(localStorage.getItem('magazinePracticeConfig') || '{}');
    const correctCount = document.getElementById('correctCount');
    const incorrectCount = document.getElementById('incorrectCount');
    const accuracyRate = document.getElementById('accuracyRate');

    correctCount.textContent = config.correctAnswers || 0;
    incorrectCount.textContent = config.incorrectAnswers || 0;

    const total = (config.correctAnswers || 0) + (config.incorrectAnswers || 0);
    const accuracy = total > 0 ? Math.round(((config.correctAnswers || 0) / total) * 100) : 0;
    accuracyRate.textContent = `${accuracy}%`;
}

// 前往指定題目
function goToQuestion() {
    const questionSelect = document.getElementById('questionSelect');
    const questionNumber = parseInt(questionSelect.value);

    const config = JSON.parse(localStorage.getItem('magazinePracticeConfig') || '{}');
    config.currentQuestion = questionNumber;
    localStorage.setItem('magazinePracticeConfig', JSON.stringify(config));

    loadQuestion(questionNumber);
}

// 上一題
function previousQuestion() {
    const config = JSON.parse(localStorage.getItem('magazinePracticeConfig') || '{}');
    if (config.currentQuestion > 1) {
        config.currentQuestion--;
        localStorage.setItem('magazinePracticeConfig', JSON.stringify(config));
        loadQuestion(config.currentQuestion);

        // 更新選擇器
        document.getElementById('questionSelect').value = config.currentQuestion;
    }
}

// 下一題
function nextQuestion() {
    const config = JSON.parse(localStorage.getItem('magazinePracticeConfig') || '{}');
    if (config.currentQuestion < config.totalQuestions) {
        config.currentQuestion++;
        localStorage.setItem('magazinePracticeConfig', JSON.stringify(config));
        loadQuestion(config.currentQuestion);

        // 更新選擇器
        document.getElementById('questionSelect').value = config.currentQuestion;
    }
}

// 完成練習
function completePractice() {
    stopPracticeTimer();

    const config = JSON.parse(localStorage.getItem('magazinePracticeConfig') || '{}');
    const total = config.correctAnswers + config.incorrectAnswers;
    const accuracy = total > 0 ? Math.round((config.correctAnswers / total) * 100) : 0;

    // 顯示完成結果
    const resultHTML = `
        <div class="practice-result">
            <h2><i class="fas fa-flag-checkered"></i> 練習完成！</h2>
            <div class="result-stats">
                <div class="result-item">
                    <i class="fas fa-check-circle"></i>
                    <span>正確：${config.correctAnswers}</span>
                </div>
                <div class="result-item">
                    <i class="fas fa-times-circle"></i>
                    <span>錯誤：${config.incorrectAnswers}</span>
                </div>
                <div class="result-item">
                    <i class="fas fa-percentage"></i>
                    <span>正確率：${accuracy}%</span>
                </div>
            </div>
            <div class="result-actions">
                <button onclick="closeModal('magazinePracticeModal')" class="result-btn">
                    <i class="fas fa-home"></i> 返回首頁
                </button>
                <button onclick="restartPractice()" class="result-btn">
                    <i class="fas fa-redo"></i> 重新練習
                </button>
            </div>
        </div>
    `;

    const modal = document.getElementById('magazinePracticeModal');
    const content = modal.querySelector('.modal-content');
    content.innerHTML = resultHTML;
}

// 重新開始練習
function restartPractice() {
    const config = JSON.parse(localStorage.getItem('magazinePracticeConfig') || '{}');
    closeModal('magazinePracticeModal');
    startMagazinePractice(config.totalQuestions);
}

// 儲存分數
async function saveScores() {
    if (!currentStudent) {
        alert('請先選擇學生！');
        return;
    }

    const scores = {
        magazine: document.getElementById('score-magazine')?.value || 0,
        level: document.getElementById('score-level')?.value || 0,
        paragraph: document.getElementById('score-paragraph')?.value || 0,
        mixed: document.getElementById('score-mixed')?.value || 0,
        batch: document.getElementById('score-batch')?.value || 0
    };

    // 驗證分數
    const invalidScores = Object.entries(scores).filter(([key, value]) => {
        const num = parseInt(value);
        return isNaN(num) || num < 0 || num > 100;
    });

    if (invalidScores.length > 0) {
        alert('請確保所有分數都在 0-100 之間！');
        return;
    }

    try {
        // 獲取學生組別
        const studentGroup = getStudentGroup(currentStudent);

        // 保存每個練習類型的成績到 SQLite
        const savePromises = [];

        if (parseInt(scores.magazine) > 0) {
            savePromises.push(
                window.apiService.saveScore(currentStudent, studentGroup, '雜誌單字', parseInt(scores.magazine))
            );
        }

        if (parseInt(scores.level) > 0) {
            savePromises.push(
                window.apiService.saveScore(currentStudent, studentGroup, '各級別單字', parseInt(scores.level))
            );
        }

        if (parseInt(scores.paragraph) > 0) {
            savePromises.push(
                window.apiService.saveScore(currentStudent, studentGroup, '段落單字', parseInt(scores.paragraph))
            );
        }

        if (parseInt(scores.mixed) > 0) {
            savePromises.push(
                window.apiService.saveScore(currentStudent, studentGroup, '混合題型', parseInt(scores.mixed))
            );
        }

        if (parseInt(scores.batch) > 0) {
            savePromises.push(
                window.apiService.saveScore(currentStudent, studentGroup, '大批次題目', parseInt(scores.batch))
            );
        }

        // 等待所有成績保存完成
        if (savePromises.length > 0) {
            await Promise.all(savePromises);
            console.log('所有成績已成功保存到 SQLite');
        }

        // 同時保存到本地存儲作為備用
        localStorage.setItem(`scores_${currentStudent}`, JSON.stringify({
            student: currentStudent,
            scores: scores,
            timestamp: new Date().toISOString()
        }));

        // 更新排行榜
        updateStudentScores(currentStudent, scores);

        // 顯示成功訊息
        showSuccessMessage('分數已成功儲存到 SQLite 數據庫！');

    } catch (error) {
        console.error('保存成績失敗:', error);

        // 如果 SQLite 保存失敗，只保存到本地存儲
        localStorage.setItem(`scores_${currentStudent}`, JSON.stringify({
            student: currentStudent,
            scores: scores,
            timestamp: new Date().toISOString()
        }));

        updateStudentScores(currentStudent, scores);
        showSuccessMessage('分數已保存到本地存儲！');
    }
}

// 更新學生分數
function updateStudentScores(studentName, scores) {
    // 計算平均分數
    const totalScore = Object.values(scores).reduce((sum, score) => sum + parseInt(score), 0);
    const averageScore = Math.round(totalScore / Object.keys(scores).length);

    // 更新練習資料
    if (!practiceData[studentName]) {
        practiceData[studentName] = {};
    }

    Object.keys(scores).forEach(category => {
        practiceData[studentName][category] = {
            completed: parseInt(scores[category]) > 0,
            score: parseInt(scores[category])
        };
    });

    // 更新排行榜（這裡可以呼叫 API）
    console.log(`學生 ${studentName} 的平均分數: ${averageScore}`);
}

// 顯示成功訊息
function showSuccessMessage(message) {
    // 創建成功訊息元素
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
    successDiv.innerHTML = `<i class="fas fa-check"></i> ${message}`;

    document.body.appendChild(successDiv);

    // 3秒後自動移除
    setTimeout(() => {
        successDiv.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.parentNode.removeChild(successDiv);
            }
        }, 300);
    }, 3000);
}

// 顯示錯誤訊息
function showError(message) {
    // 創建錯誤訊息元素
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #dc3545;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
    errorDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;

    document.body.appendChild(errorDiv);

    // 5秒後自動移除
    setTimeout(() => {
        errorDiv.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 300);
    }, 5000);
}

// 顯示成功訊息（簡化版）
function showSuccess(message) {
    showSuccessMessage(message);
}

// 關閉模態框
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// 關閉所有模態框
function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
}

// 搜尋功能
function searchStudents(query) {
    const studentItems = document.querySelectorAll('.student-item');
    const queryLower = query.toLowerCase();

    studentItems.forEach(item => {
        const studentName = item.textContent.toLowerCase();
        if (studentName.includes(queryLower)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// 匯出成績報告
function exportScores() {
    const allScores = {};

    // 從本地儲存收集所有分數
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('scores_')) {
            const data = JSON.parse(localStorage.getItem(key));
            allScores[data.student] = data.scores;
        }
    });

    // 創建 CSV 內容
    let csvContent = '學生姓名,雜誌單字,各級別單字,段落單字,混合題型,大批次題目,平均分數\n';

    Object.keys(allScores).forEach(student => {
        const scores = allScores[student];
        const total = Object.values(scores).reduce((sum, score) => sum + parseInt(score), 0);
        const average = Math.round(total / Object.keys(scores).length);

        csvContent += `${student},${scores.magazine},${scores.level},${scores.paragraph},${scores.mixed},${scores.batch},${average}\n`;
    });

    // 下載 CSV 文件
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `成績報告_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// 重置所有資料
function resetAllData() {
    if (confirm('確定要重置所有資料嗎？此操作無法復原！')) {
        // 清除本地儲存
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('scores_')) {
                localStorage.removeItem(key);
            }
        });

        // 重置練習資料
        practiceData = {};

        // 重新載入頁面
        location.reload();
    }
}

// 雜誌練習相關變數
let currentQuestionIndex = 0;
let practiceStartTime = null;
let practiceTimer = null;
let userAnswers = [];
let correctAnswers = 0;
let incorrectAnswers = 0;







// 更新計時器
function updateTimer() {
    if (!practiceStartTime) return;

    const now = new Date();
    const diff = now - practiceStartTime;
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    document.getElementById('practiceTimer').textContent =
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// 載入題目
function loadQuestion(index) {
    if (index < 0 || index >= window.currentQuestions.length) return;

    currentQuestionIndex = index;
    const question = window.currentQuestions[index];

    // 更新題目內容
    document.getElementById('questionContent').innerHTML = `
        <p>${question.text}</p>
        <div class="question-hint">
            <small><i class="fas fa-lightbulb"></i> 提示：完整單字是 "${question.fullWord}"</small>
        </div>
    `;

    // 更新進度
    updateProgress();

    // 更新導航按鈕
    updateNavigationButtons();

    // 清空答案輸入框
    document.getElementById('answerInput').value = '';
    document.getElementById('answerInput').focus();

    // 更新統計
    updateStats();
}

// 更新進度
function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / window.currentQuestions.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
    document.getElementById('progressText').textContent = `${currentQuestionIndex + 1} / ${window.currentQuestions.length}`;
}

// 更新導航按鈕
function updateNavigationButtons() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.disabled = currentQuestionIndex === window.currentQuestions.length - 1;
}

// 更新題目選單
function updateQuestionSelector() {
    const selector = document.getElementById('questionSelect');
    selector.innerHTML = '';

    window.currentQuestions.forEach((question, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `第 ${index + 1} 題`;
        selector.appendChild(option);
    });

    selector.value = currentQuestionIndex;
}

// 提交答案
function submitAnswer() {
    const answerInput = document.getElementById('answerInput');
    const userAnswer = answerInput.value.trim().toLowerCase();
    const question = window.currentQuestions[currentQuestionIndex];

    if (!userAnswer) {
        alert('請輸入答案！');
        return;
    }

    // 儲存答案
    userAnswers[currentQuestionIndex] = userAnswer;

    // 檢查答案
    const isCorrect = userAnswer === question.answer.toLowerCase();
    if (isCorrect) {
        correctAnswers++;
        showAnswerFeedback(true, question);
    } else {
        incorrectAnswers++;
        showAnswerFeedback(false, question);
    }

    // 更新統計
    updateStats();

    // 自動跳轉到下一題
    setTimeout(() => {
        if (currentQuestionIndex < window.currentQuestions.length - 1) {
            nextQuestion();
        } else {
            showCompletionButton();
        }
    }, 2000);
}

// 顯示答案回饋
function showAnswerFeedback(isCorrect, question) {
    const feedback = document.createElement('div');
    feedback.className = `answer-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    feedback.innerHTML = `
        <div class="feedback-content">
            <i class="fas fa-${isCorrect ? 'check-circle' : 'times-circle'}"></i>
            <span>${isCorrect ? '正確！' : '錯誤！'}</span>
            <p>正確答案：${question.answer.toUpperCase()}</p>
            <p>完整單字：${question.fullWord}</p>
            <p>解釋：${question.explanation}</p>
        </div>
    `;

    document.getElementById('questionContent').appendChild(feedback);

    // 3秒後移除回饋
    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.parentNode.removeChild(feedback);
        }
    }, 3000);
}

// 更新統計
function updateStats() {
    document.getElementById('correctCount').textContent = correctAnswers;
    document.getElementById('incorrectCount').textContent = incorrectAnswers;

    const total = correctAnswers + incorrectAnswers;
    const accuracy = total > 0 ? Math.round((correctAnswers / total) * 100) : 0;
    document.getElementById('accuracyRate').textContent = `${accuracy}%`;
}

// 跳轉到指定題目
function goToQuestion() {
    const selector = document.getElementById('questionSelect');
    const index = parseInt(selector.value);
    loadQuestion(index);
}

// 上一題
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        loadQuestion(currentQuestionIndex - 1);
    }
}

// 下一題
function nextQuestion() {
    if (currentQuestionIndex < window.currentQuestions.length - 1) {
        loadQuestion(currentQuestionIndex + 1);
    }
}

// 顯示完成按鈕
function showCompletionButton() {
    document.querySelector('.complete-practice').style.display = 'inline-flex';
}

// 完成練習
function completePractice() {
    // 停止計時器
    if (practiceTimer) {
        clearInterval(practiceTimer);
    }

    // 計算成績
    const totalQuestions = window.currentQuestions.length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const timeSpent = document.getElementById('practiceTimer').textContent;

    // 收集錯誤的題目
    const wrongQuestions = [];
    userAnswers.forEach((answer, index) => {
        const question = window.currentQuestions[index];
        if (answer.toLowerCase() !== question.answer.toLowerCase()) {
            wrongQuestions.push({
                questionNumber: index + 1,
                question: question,
                userAnswer: answer,
                correctAnswer: question.answer
            });
        }
    });

    // 顯示結果
    let resultHTML = `
        <div class="practice-result">
            <h3><i class="fas fa-trophy"></i> 練習完成！</h3>
            <div class="result-stats">
                <div class="result-item">
                    <span class="result-label">總題數：</span>
                    <span class="result-value">${totalQuestions}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">正確答案：</span>
                    <span class="result-value correct">${correctAnswers}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">錯誤答案：</span>
                    <span class="result-value incorrect">${incorrectAnswers}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">正確率：</span>
                    <span class="result-value">${score}%</span>
                </div>
                <div class="result-item">
                    <span class="result-label">用時：</span>
                    <span class="result-value">${timeSpent}</span>
                </div>
            </div>
    `;

    // 如果有錯誤題目，顯示錯誤題目列表
    if (wrongQuestions.length > 0) {
        resultHTML += `
            <div class="wrong-questions-section">
                <h4><i class="fas fa-exclamation-triangle"></i> 錯誤題目 (${wrongQuestions.length}題)</h4>
                <div class="wrong-questions-list">
        `;

        wrongQuestions.forEach(wrong => {
            resultHTML += `
                <div class="wrong-question-item">
                    <div class="question-number">第 ${wrong.questionNumber} 題</div>
                    <div class="question-content">${wrong.question.text}</div>
                    <div class="answer-comparison">
                        <span class="user-answer">您的答案：${wrong.userAnswer.toUpperCase()}</span>
                        <span class="correct-answer">正確答案：${wrong.correctAnswer.toUpperCase()}</span>
                    </div>
                    <div class="question-explanation">
                        <strong>完整單字：</strong>${wrong.question.fullWord} - ${wrong.question.explanation}
                    </div>
                </div>
            `;
        });

        resultHTML += `
                </div>
            </div>
        `;
    }

    resultHTML += `
            <button onclick="closeMagazinePractice()" class="close-practice-btn">
                <i class="fas fa-times"></i> 關閉
            </button>
        </div>
    `;

    document.getElementById('magazinePracticeModal').innerHTML = resultHTML;
}

// 關閉雜誌練習
function closeMagazinePractice() {
    if (practiceTimer) {
        clearInterval(practiceTimer);
    }
    closeModal('magazinePracticeModal');
}

// 添加鍵盤事件監聽
document.addEventListener('keydown', function (event) {
    // 在雜誌練習模態框中按Enter鍵提交答案
    if (event.key === 'Enter' && document.getElementById('magazinePracticeModal').style.display === 'block') {
        const answerInput = document.getElementById('answerInput');
        if (answerInput && document.activeElement === answerInput) {
            submitAnswer();
        }
    }
});

// 添加動畫 CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .answer-feedback {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    }
    
    .answer-feedback.correct {
        border-left: 4px solid #28a745;
    }
    
    .answer-feedback.incorrect {
        border-left: 4px solid #dc3545;
    }
    
    .feedback-content {
        text-align: center;
    }
    
    .feedback-content i {
        font-size: 2rem;
        margin-bottom: 10px;
    }
    
    .feedback-content.correct i {
        color: #28a745;
    }
    
    .feedback-content.incorrect i {
        color: #dc3545;
    }
    
    .practice-result {
        text-align: center;
        padding: 40px;
    }
    
    .result-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin: 30px 0;
    }
    
    .result-item {
        background: #f8f9fa;
        padding: 20px;
        border-radius: 10px;
        border: 1px solid #e9ecef;
    }
    
    .result-label {
        display: block;
        font-weight: 600;
        color: var(--text-light);
        margin-bottom: 5px;
    }
    
    .result-value {
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--text-dark);
    }
    
    .result-value.correct {
        color: #28a745;
    }
    
    .result-value.incorrect {
        color: #dc3545;
    }
    
    .close-practice-btn {
        background: var(--secondary-color);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 5px;
        cursor: pointer;
        font-weight: 600;
        transition: var(--transition);
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 0 auto;
    }
    
    .close-practice-btn:hover {
        background: #357abd;
        transform: translateY(-1px);
    }
    
    .question-hint {
        margin-top: 15px;
        padding: 10px;
        background: #fff3cd;
        border: 1px solid #ffeaa7;
        border-radius: 5px;
        color: #856404;
    }
`;
document.head.appendChild(style);

// 打開成績登記模態框
function openScoreRegistrationModal() {
    const modal = document.getElementById('scoreRegistrationModal');

    // 設置當前日期為預設值
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('practiceDate').value = today;

    // 顯示學生資訊
    const currentStudent = getCurrentStudent();
    const studentInfo = students[currentStudent];

    document.getElementById('studentNameDisplay').textContent = currentStudent;
    document.getElementById('studentGroupDisplay').textContent = studentInfo ? studentInfo.group : '';

    // 載入歷史成績記錄
    loadScoreHistory();

    modal.style.display = 'block';
}

// 提交成績登記
async function submitScoreRegistration() {
    const currentStudent = getCurrentStudent();
    const practiceDate = document.getElementById('practiceDate').value;
    const magazineScore = document.getElementById('magazineScore').value;
    const spellingScore = document.getElementById('spellingScore').value;
    const practiceNotes = document.getElementById('practiceNotes').value;

    // 驗證必填欄位
    if (!practiceDate) {
        alert('請選擇練習日期！');
        return;
    }

    // 檢查是否有至少一個分數
    const scores = [magazineScore, spellingScore];
    const hasScore = scores.some(score => score && score > 0);

    if (!hasScore) {
        alert('請至少輸入一個練習分數！');
        return;
    }

    // 創建成績記錄
    const scoreRecord = {
        id: Date.now(),
        studentName: currentStudent,
        date: practiceDate,
        scores: {
            magazine: parseInt(magazineScore) || 0,
            spelling: parseInt(spellingScore) || 0
        },
        notes: practiceNotes,
        timestamp: new Date().toISOString()
    };

    try {
        // 儲存成績記錄
        await saveScoreRecord(scoreRecord);

        // 調試：檢查儲存結果
        console.log('儲存的成績記錄:', scoreRecord);
        console.log('當前學生:', currentStudent);
        console.log('儲存後的數據:', localStorage.getItem(`studentScores_${currentStudent}`));

        // 清空表單
        clearScoreForm();

        // 重新載入歷史記錄
        loadScoreHistory();

        // 更新學習地圖統計
        updateLearningMapStats();

        // 顯示成功訊息
        showSuccessMessage('成績登記成功並已同步到雲端！');

    } catch (error) {
        console.error('成績登記失敗:', error);
        showSuccessMessage('成績登記成功（僅保存到本地）！');
    }
}

// 儲存成績記錄
async function saveScoreRecord(scoreRecord) {
    try {
        // 獲取學生組別
        const studentGroup = getStudentGroup(scoreRecord.studentName);

        // 保存到 SQLite
        if (scoreRecord.scores.magazine > 0) {
            await window.apiService.saveScore(
                scoreRecord.studentName,
                studentGroup,
                '雜誌單字',
                scoreRecord.scores.magazine
            );
        }

        if (scoreRecord.scores.spelling > 0) {
            await window.apiService.saveScore(
                scoreRecord.studentName,
                studentGroup,
                '雲端學院拼字模擬',
                scoreRecord.scores.spelling
            );
        }

        console.log('成績記錄已保存到 SQLite');

    } catch (error) {
        console.error('保存成績記錄到 SQLite 失敗:', error);
    }

    // 同時保存到本地存儲作為備用
    const studentScores = JSON.parse(localStorage.getItem(`studentScores_${scoreRecord.studentName}`) || '[]');
    studentScores.push(scoreRecord);
    localStorage.setItem(`studentScores_${scoreRecord.studentName}`, JSON.stringify(studentScores));
}

// 載入成績歷史記錄
function loadScoreHistory() {
    const currentStudent = getCurrentStudent();
    const studentScores = JSON.parse(localStorage.getItem(`studentScores_${currentStudent}`) || '[]');
    const historyContainer = document.getElementById('scoreHistory');

    if (studentScores.length === 0) {
        historyContainer.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #666;">
                <i class="fas fa-inbox" style="font-size: 3rem; margin-bottom: 15px; opacity: 0.5;"></i>
                <p>尚無成績記錄</p>
                <p style="font-size: 0.9rem;">開始登記您的練習成績吧！</p>
            </div>
        `;
        return;
    }

    // 按日期排序（最新的在前）
    studentScores.sort((a, b) => new Date(b.date) - new Date(a.date));

    const historyHTML = studentScores.map(record => {
        const totalScore = Object.values(record.scores).reduce((sum, score) => sum + score, 0);
        const averageScore = Math.round(totalScore / Object.keys(record.scores).filter(key => record.scores[key] > 0).length);

        return `
            <div class="history-item">
                <div class="history-header">
                    <div class="history-date">
                        <i class="fas fa-calendar"></i>
                        ${formatDate(record.date)}
                    </div>
                    <div style="color: #667eea; font-weight: 600;">
                        平均分：${averageScore} 分
                    </div>
                </div>
                <div class="history-scores">
                    <div class="score-item">
                        <div class="score-label">雜誌單字</div>
                        <div class="score-value">${record.scores.magazine}</div>
                    </div>
                    <div class="score-item">
                        <div class="score-label">拼字模擬100題</div>
                        <div class="score-value">${record.scores.spelling}</div>
                    </div>
                </div>
                ${record.notes ? `
                    <div class="history-notes">
                        <i class="fas fa-comment"></i>
                        ${record.notes}
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');

    historyContainer.innerHTML = historyHTML;
}

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
}

// 清空成績表單
function clearScoreForm() {
    document.getElementById('magazineScore').value = '';
    document.getElementById('spellingScore').value = '';
    document.getElementById('practiceNotes').value = '';
}

// 更新學習地圖中的成績統計
function updateLearningMapStats() {
    const currentStudent = getCurrentStudent();
    if (!currentStudent) return;

    const studentScores = JSON.parse(localStorage.getItem(`studentScores_${currentStudent}`) || '[]');

    // 計算統計數據
    const totalRecords = studentScores.length;
    const totalScore = studentScores.reduce((sum, record) => {
        const recordTotal = Object.values(record.scores).reduce((s, score) => s + score, 0);
        const recordCount = Object.keys(record.scores).filter(key => record.scores[key] > 0).length;
        return sum + (recordCount > 0 ? recordTotal / recordCount : 0);
    }, 0);
    const averageScore = totalRecords > 0 ? Math.round(totalScore / totalRecords) : 0;

    // 更新成績登記區域顯示
    const scoreArea = document.querySelector('.score-area .area-stats');
    if (scoreArea) {
        const statItems = scoreArea.querySelectorAll('.stat-item span');
        if (statItems.length >= 2) {
            statItems[0].textContent = `已登記: ${totalRecords} 次`;
            statItems[1].textContent = `平均分: ${averageScore} 分`;
        }
    }

    // 更新學習進度總覽
    updateProgressOverview(totalRecords, averageScore, studentScores);
}

// 更新學習進度總覽
function updateProgressOverview(totalRecords, averageScore, studentScores) {
    // 計算學習天數（從2025年7月26日開始計算）
    const startDate = new Date('2025-07-26');
    const today = new Date();
    const timeDiff = today.getTime() - startDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const learningDays = Math.max(0, daysDiff); // 確保不會是負數

    // 更新進度總覽的數字
    const progressNumbers = document.querySelectorAll('.progress-number');
    if (progressNumbers.length >= 3) {
        progressNumbers[0].textContent = totalRecords; // 總練習次數
        progressNumbers[1].textContent = averageScore; // 平均分數
        progressNumbers[2].textContent = learningDays; // 學習天數
    }
}

// 更新管理員區域統計數據
function updateAdminAreaStats() {
    // 計算所有學生的統計數據
    const allStudents = Object.keys(students).filter(name => !students[name].isAdmin);
    const totalStudents = allStudents.length;

    // 計算總成績記錄
    let totalRecords = 0;
    allStudents.forEach(studentName => {
        const studentScores = JSON.parse(localStorage.getItem(`studentScores_${studentName}`) || '[]');
        totalRecords += studentScores.length;
    });

    // 調試：檢查Annie的數據
    console.log('=== 更新管理員區域統計 ===');
    console.log('Annie的成績數據:', localStorage.getItem('studentScores_教務組 Annie'));

    // 測試：如果Annie沒有數據，手動添加一些測試數據
    const annieScores = localStorage.getItem('studentScores_教務組 Annie');
    if (!annieScores || annieScores === '[]') {
        console.log('Annie沒有成績數據，添加測試數據...');
        const testScores = [
            {
                id: Date.now(),
                studentName: '教務組 Annie',
                date: '2025-01-20',
                scores: {
                    magazine: 85,
                    spelling: 90
                },
                notes: '測試成績',
                timestamp: new Date().toISOString()
            }
        ];
        localStorage.setItem('studentScores_教務組 Annie', JSON.stringify(testScores));
        console.log('已添加Annie的測試數據');
    }

    // 更新管理員區域的統計顯示
    const adminStats = document.querySelectorAll('.admin-area .area-stats .stat-item span');
    if (adminStats.length >= 2) {
        adminStats[0].textContent = `總學生: ${totalStudents} 人`;
        adminStats[1].textContent = `總記錄: ${totalRecords} 筆`;
    }
}

// 顯示各級別單字練習提示
function showLevelPracticeNotice() {
    // 創建提示模態框
    const noticeHTML = `
        <div id="levelNoticeModal" class="modal">
            <div class="modal-content notice-content">
                <span class="close" onclick="closeModal('levelNoticeModal')">&times;</span>
                
                <!-- 提示標題 -->
                <div class="notice-header">
                    <div class="logo-section">
                        <div class="logo-text">
                            <div class="logo-main">課外練習</div>
                        </div>
                    </div>
                    <h1 class="notice-title">各級別單字練習</h1>
                </div>

                <!-- 提示內容 -->
                <div class="notice-body">
                    <div class="notice-icon">
                        <i class="fas fa-info-circle"></i>
                    </div>
                    <div class="notice-message">
                        <h3>請至佳音雲端學院官網練習</h3>
                        <p>額外的單字還在準備中，敬請期待！</p>
                        <p class="notice-subtitle">我們正在為您準備更豐富的練習內容</p>
                    </div>
                </div>

                <!-- 按鈕區域 -->
                <div class="notice-actions">
                    <button onclick="closeModal('levelNoticeModal')" class="notice-btn">
                        <i class="fas fa-check"></i> 我知道了
                    </button>
                </div>
            </div>
        </div>
    `;

    // 如果模態框已存在，先移除
    const existingModal = document.getElementById('levelNoticeModal');
    if (existingModal) {
        existingModal.remove();
    }

    // 添加新的模態框到頁面
    document.body.insertAdjacentHTML('beforeend', noticeHTML);

    // 顯示模態框
    document.getElementById('levelNoticeModal').style.display = 'block';
}

// 顯示管理員學生成績列表
function showAdminStudentsList() {
    const practiceSection = document.getElementById('practice');
    practiceSection.innerHTML = `
        <h2><i class="fas fa-chart-bar"></i> 學生成績管理</h2>
        <div class="admin-welcome">
            <h1>歡迎 ${getCurrentStudent()}！</h1>
            <p>查看所有學生的練習成績和學習狀況</p>
        </div>
        
        <div class="admin-dashboard">
            <!-- 統計概覽 -->
            <div class="admin-stats">
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="stat-content">
                        <div class="stat-number" id="totalStudents">0</div>
                        <div class="stat-label">總學生數</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <div class="stat-content">
                        <div class="stat-number" id="totalRecords">0</div>
                        <div class="stat-label">總成績記錄</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-calendar"></i>
                    </div>
                    <div class="stat-content">
                        <div class="stat-number" id="activeStudents">0</div>
                        <div class="stat-label">活躍學生</div>
                    </div>
                </div>
            </div>

            <!-- 學生列表 -->
            <div class="admin-students-section">
                <h3><i class="fas fa-list"></i> 學生列表</h3>
                <div class="students-filter">
                    <select id="groupFilter" onchange="filterStudents()">
                        <option value="">所有組別</option>
                        <option value="B組">B組</option>
                        <option value="C組">C組</option>
                        <option value="D組">D組</option>
                        <option value="E組">E組</option>
                        <option value="F組">F組</option>
                        <option value="教務組">教務組</option>
                    </select>
                </div>
                <div id="studentsList" class="students-list">
                    <!-- 學生列表將在這裡動態載入 -->
                </div>
            </div>

            <!-- 返回學習地圖按鈕 -->
            <div style="text-align: center; margin-top: 30px;">
                <button onclick="showLearningMap()" class="back-btn">
                    <i class="fas fa-arrow-left"></i> 返回學習地圖
                </button>
            </div>
        </div>
    `;

    // 載入管理員數據
    loadAdminData();
}

// 載入管理員數據
function loadAdminData() {
    // 計算統計數據
    const allStudents = Object.keys(students).filter(name => !students[name].isAdmin);
    const totalStudents = allStudents.length;

    // 計算總成績記錄
    let totalRecords = 0;
    let activeStudents = 0;
    allStudents.forEach(studentName => {
        const studentScores = JSON.parse(localStorage.getItem(`studentScores_${studentName}`) || '[]');
        totalRecords += studentScores.length;
        if (studentScores.length > 0) {
            activeStudents++;
        }
    });

    // 更新統計顯示
    document.getElementById('totalStudents').textContent = totalStudents;
    document.getElementById('totalRecords').textContent = totalRecords;
    document.getElementById('activeStudents').textContent = activeStudents;

    // 載入學生列表
    loadStudentsList();
}

// 載入學生列表
function loadStudentsList(filterGroup = '') {
    const studentsListContainer = document.getElementById('studentsList');
    const allStudents = Object.keys(students).filter(name => !students[name].isAdmin);

    // 調試：檢查Annie的數據
    console.log('=== 管理員載入學生列表 ===');
    console.log('所有學生:', allStudents);
    console.log('Annie是否在列表中:', allStudents.includes('教務組 Annie'));
    console.log('Annie的成績數據:', localStorage.getItem('studentScores_教務組 Annie'));

    // 檢查所有localStorage中的成績數據
    console.log('所有localStorage成績數據:');
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('studentScores_')) {
            console.log(key, ':', localStorage.getItem(key));
        }
    }

    let filteredStudents = allStudents;
    if (filterGroup) {
        filteredStudents = allStudents.filter(name => students[name].group === filterGroup);
    }

    if (filteredStudents.length === 0) {
        studentsListContainer.innerHTML = `
            <div class="no-students">
                <i class="fas fa-users-slash"></i>
                <p>沒有找到學生</p>
            </div>
        `;
        return;
    }

    const studentsHTML = filteredStudents.map(studentName => {
        const studentInfo = students[studentName];
        const studentScores = JSON.parse(localStorage.getItem(`studentScores_${studentName}`) || '[]');
        const recordCount = studentScores.length;

        // 計算平均分數
        let averageScore = 0;
        if (studentScores.length > 0) {
            const totalScore = studentScores.reduce((sum, record) => {
                const recordTotal = Object.values(record.scores).reduce((s, score) => s + score, 0);
                const recordCount = Object.keys(record.scores).filter(key => record.scores[key] > 0).length;
                return sum + (recordCount > 0 ? recordTotal / recordCount : 0);
            }, 0);
            averageScore = Math.round(totalScore / studentScores.length);
        }

        return `
            <div class="student-card" onclick="viewStudentDetails('${studentName}')">
                <div class="student-info">
                    <div class="student-name">${studentName}</div>
                    <div class="student-group">${studentInfo.group} - ${studentInfo.level}</div>
                </div>
                <div class="student-stats">
                    <div class="stat-item">
                        <span class="stat-label">記錄數</span>
                        <span class="stat-value">${recordCount}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">平均分</span>
                        <span class="stat-value">${averageScore}</span>
                    </div>
                </div>
                <div class="student-arrow">
                    <i class="fas fa-chevron-right"></i>
                </div>
            </div>
        `;
    }).join('');

    studentsListContainer.innerHTML = studentsHTML;
}

// 篩選學生
function filterStudents() {
    const filterGroup = document.getElementById('groupFilter').value;
    loadStudentsList(filterGroup);
}

// 查看學生詳細資料
function viewStudentDetails(studentName) {
    const studentInfo = students[studentName];
    const studentScores = JSON.parse(localStorage.getItem(`studentScores_${studentName}`) || '[]');

    // 創建學生詳細資料模態框
    const detailsHTML = `
        <div id="studentDetailsModal" class="modal">
            <div class="modal-content student-details-content">
                <span class="close" onclick="closeModal('studentDetailsModal')">&times;</span>
                
                <!-- 學生資訊標題 -->
                <div class="student-details-header">
                    <div class="logo-section">
                        <div class="logo-text">
                            <div class="logo-main">課外練習</div>
                        </div>
                    </div>
                    <h1 class="details-title">學生詳細資料</h1>
                </div>

                <!-- 學生基本資訊 -->
                <div class="student-details-info">
                    <div class="info-section">
                        <h3><i class="fas fa-user"></i> 基本資訊</h3>
                        <div class="info-grid">
                            <div class="info-item">
                                <label>姓名：</label>
                                <span>${studentName}</span>
                            </div>
                            <div class="info-item">
                                <label>組別：</label>
                                <span>${studentInfo.group}</span>
                            </div>
                            <div class="info-item">
                                <label>級別：</label>
                                <span>${studentInfo.level}</span>
                            </div>
                            <div class="info-item">
                                <label>成績記錄數：</label>
                                <span>${studentScores.length} 筆</span>
                            </div>
                        </div>
                    </div>

                    <!-- 成績記錄 -->
                    <div class="scores-section">
                        <h3><i class="fas fa-chart-line"></i> 成績記錄</h3>
                        <div id="studentScoresList" class="scores-list">
                            ${studentScores.length === 0 ? `
                                <div class="no-scores">
                                    <i class="fas fa-inbox"></i>
                                    <p>尚無成績記錄</p>
                                </div>
                            ` : studentScores.map(record => `
                                <div class="score-record">
                                    <div class="record-header">
                                        <div class="record-date">
                                            <i class="fas fa-calendar"></i>
                                            ${formatDate(record.date)}
                                        </div>
                                        <div class="record-scores">
                                            <span class="score-item">
                                                <span class="score-label">雜誌單字</span>
                                                <span class="score-value">${record.scores.magazine}</span>
                                            </span>
                                            <span class="score-item">
                                                <span class="score-label">拼字模擬</span>
                                                <span class="score-value">${record.scores.spelling}</span>
                                            </span>
                                        </div>
                                    </div>
                                    ${record.notes ? `
                                        <div class="record-notes">
                                            <i class="fas fa-comment"></i>
                                            ${record.notes}
                                        </div>
                                    ` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- 關閉按鈕 -->
                <div class="details-actions">
                    <button onclick="closeModal('studentDetailsModal')" class="close-btn">
                        <i class="fas fa-times"></i> 關閉
                    </button>
                </div>
            </div>
        </div>
    `;

    // 如果模態框已存在，先移除
    const existingModal = document.getElementById('studentDetailsModal');
    if (existingModal) {
        existingModal.remove();
    }

    // 添加新的模態框到頁面
    document.body.insertAdjacentHTML('beforeend', detailsHTML);

    // 顯示模態框
    document.getElementById('studentDetailsModal').style.display = 'block';
}



