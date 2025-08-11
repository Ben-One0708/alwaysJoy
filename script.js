// AlwaysJoy 教育平台 - JavaScript 功能文件

// 全局變數
let currentStudent = null;
let currentScores = {};
let practiceData = {};

// 學生資料
const students = {
    'C2 Yuni': { group: 'B組', level: 'C2', password: 'Yuni' },
    'C2 Emily': { group: 'B組', level: 'C2', password: 'Emily' },
    'A8 Vito': { group: 'B組', level: 'A8', password: 'Vito' },
    'A4 Eudora': { group: 'C組', level: 'A4', password: 'Eudora' },
    'A5 Zoe': { group: 'C組', level: 'A5', password: 'Zoe' },
    'N6 Bruce': { group: 'D組', level: 'N6', password: 'Bruce' },
    'N7 Laura': { group: 'D組', level: 'N7', password: 'Laura' },
    'K9 Lilian': { group: 'E組', level: 'K9', password: 'Lilian' },
    'K9 Jill': { group: 'E組', level: 'K9', password: 'Jill' },
    'I2 Candy': { group: 'F組', level: 'I2', password: 'Candy' },
    'N3 Avery': { group: 'F組', level: 'N3', password: 'Avery' }
};

// 組別對應的學生
const groupStudents = {
    'B組': ['C2 Yuni', 'C2 Emily', 'A8 Vito'],
    'C組': ['A4 Eudora', 'A5 Zoe'],
    'D組': ['N6 Bruce', 'N7 Laura'],
    'E組': ['K9 Lilian', 'K9 Jill'],
    'F組': ['I2 Candy', 'N3 Avery']
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

    // 檢查是否為 8/2 或 8/23 日期
    if (date === '8/2') {
        // 顯示 8/2 的 PDF 文件
        content.innerHTML = `
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <h3><i class="fas fa-file-pdf"></i> 課程資料 PDF</h3>
                <p><strong>日期：</strong>${date}</p>
                <p><strong>類型：</strong>課程總覽</p>
                <div style="margin: 20px 0;">
                    <iframe src="2025拼字練習2.pdf" width="100%" height="600px" style="border: 1px solid #ddd; border-radius: 5px;"></iframe>
                    <div style="margin-top: 15px;">
                        <button onclick="downloadPDF('${date}', '${type}')" style="background: #4a90e2; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-right: 10px;">
                            <i class="fas fa-download"></i> 下載 PDF
                        </button>
                        <a href="2025拼字練習2.pdf" target="_blank" style="background: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; text-decoration: none; display: inline-block;">
                            <i class="fas fa-external-link-alt"></i> 在新視窗開啟
                        </a>
                    </div>
                </div>
            </div>
        `;
    } else if (date === '8/23') {
        // 顯示 8/23 的 PDF 文件
        content.innerHTML = `
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <h3><i class="fas fa-file-pdf"></i> 課程資料 PDF</h3>
                <p><strong>日期：</strong>${date}</p>
                <p><strong>類型：</strong>課程總覽</p>
                <div style="margin: 20px 0;">
                    <iframe src="2025拼字練習3.pdf" width="100%" height="600px" style="border: 1px solid #ddd; border-radius: 5px;"></iframe>
                    <div style="margin-top: 15px;">
                        <button onclick="downloadPDF('${date}', '${type}')" style="background: #4a90e2; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-right: 10px;">
                            <i class="fas fa-download"></i> 下載 PDF
                        </button>
                        <a href="2025拼字練習3.pdf" target="_blank" style="background: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; text-decoration: none; display: inline-block;">
                            <i class="fas fa-external-link-alt"></i> 在新視窗開啟
                        </a>
                    </div>
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
    if (date === '8/2') {
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
    } else {
        // 這裡可以實現實際的 PDF 下載功能
        console.log(`下載 ${type} PDF: ${date}`);
        alert(`正在下載 ${date} 的課程總覽 PDF 文件...`);
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
    localStorage.removeItem('studentLoggedIn');
    localStorage.removeItem('currentStudent');
    localStorage.removeItem('studentLoginTime');
    showSuccessMessage('已登出');
    showStudentLogin();
}

// 顯示學習地圖
function showLearningMap() {
    const practiceSection = document.getElementById('practice');
    practiceSection.innerHTML = `
        <h2><i class="fas fa-map"></i> 學習地圖</h2>
        <div class="welcome-message">
            <h1>歡迎 ${getCurrentStudent()}！</h1>
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
}

// 顯示學生登入介面
function showStudentLogin() {
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
                    <select id="studentGroup" onchange="updateStudentNames()" class="form-select">
                        <option value="">請選擇組別</option>
                        <option value="B組">B組</option>
                        <option value="C組">C組</option>
                        <option value="D組">D組</option>
                        <option value="E組">E組</option>
                        <option value="F組">F組</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="studentName">
                        <i class="fas fa-user"></i> 姓名：
                    </label>
                    <select id="studentName" class="form-select" disabled>
                        <option value="">請先選擇組別</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="studentPassword">
                        <i class="fas fa-key"></i> 密碼：
                    </label>
                    <div class="password-container">
                        <input type="password" id="studentPassword" placeholder="請輸入密碼" class="form-input">
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

    // 已登入，直接打開練習
    openPracticeModal(areaType);
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
                    <p>100題雜誌單字測驗</p>
                    <button onclick="startMagazinePractice()" class="start-practice-btn" style="background: var(--primary-gradient); color: white; border: none; padding: 15px 30px; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; margin-top: 15px; display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-play"></i> 開始練習
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

// 儲存分數
function saveScores() {
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

    // 儲存到本地儲存（實際使用時可改為 API 呼叫）
    localStorage.setItem(`scores_${currentStudent}`, JSON.stringify({
        student: currentStudent,
        scores: scores,
        timestamp: new Date().toISOString()
    }));

    // 更新排行榜
    updateStudentScores(currentStudent, scores);

    // 顯示成功訊息
    showSuccessMessage('分數已成功儲存！');
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

// 雜誌練習題目（100題）
const magazineQuestions = [
    // 這裡將包含從 magazine practice.docx 匯入的100題
    // 格式範例：
    {
        id: 1,
        text: "The beautiful i___d is surrounded by crystal clear water.",
        answer: "s",
        fullWord: "island",
        explanation: "island - 島嶼"
    },
    {
        id: 2,
        text: "She loves to r___d books in her free time.",
        answer: "e",
        fullWord: "read",
        explanation: "read - 閱讀"
    },
    {
        id: 3,
        text: "The weather is w___m today, perfect for a picnic.",
        answer: "a",
        fullWord: "warm",
        explanation: "warm - 溫暖的"
    },
    {
        id: 4,
        text: "He works as a t___r at the local school.",
        answer: "e",
        fullWord: "teacher",
        explanation: "teacher - 老師"
    },
    {
        id: 5,
        text: "The movie was very e___y to understand.",
        answer: "a",
        fullWord: "easy",
        explanation: "easy - 容易的"
    }
    // ... 繼續添加剩餘95題
];

// 載入 Word 檔案題目的函數
function loadMagazineQuestionsFromFile() {
    // 這裡可以實現從 Word 檔案載入題目的邏輯
    // 可以使用 FileReader API 或其他方法
    console.log('載入雜誌練習題目...');
    return magazineQuestions;
}

// 開始雜誌練習
function startMagazinePractice() {
    // 關閉原來的模態框
    closeModal('practiceModal');

    // 載入題目
    const questions = loadMagazineQuestionsFromFile();

    // 初始化練習資料
    window.currentQuestions = [...questions];
    currentQuestionIndex = 0;
    userAnswers = new Array(questions.length).fill('');
    correctAnswers = 0;
    incorrectAnswers = 0;

    // 開始計時
    startPracticeTimer();

    // 顯示練習模態框
    document.getElementById('magazinePracticeModal').style.display = 'block';

    // 載入第一題
    loadQuestion(0);

    // 更新題目選單
    updateQuestionSelector();
}

// 開始練習計時器
function startPracticeTimer() {
    practiceStartTime = new Date();
    updateTimer();
    practiceTimer = setInterval(updateTimer, 1000);
}

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
