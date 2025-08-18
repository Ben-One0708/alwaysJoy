// AlwaysJoy 教育平台 - 簡化版本

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

// 簡化的主網站登入功能
function loginToSystem() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const errorDiv = document.getElementById('loginPageError');

    console.log('登入嘗試:', username, password);

    // 檢查 Joyloveyou 登入
    if (username === 'Joyloveyou' && password === 'Joyloveyou') {
        console.log('Joyloveyou 登入成功');
        setLoggedIn(true);
        showMainContent();
        showSuccessMessage('登入成功！歡迎使用 AlwaysJoy 教育平台');

        document.getElementById('loginUsername').value = '';
        document.getElementById('loginPassword').value = '';
        return;
    }

    // 檢查管理員登入
    if (username === 'admin' && password === 'admin123') {
        console.log('管理員登入成功');
        setLoggedIn(true);
        showMainContent();
        showSuccessMessage('登入成功！歡迎管理員使用 AlwaysJoy 教育平台');

        document.getElementById('loginUsername').value = '';
        document.getElementById('loginPassword').value = '';
        return;
    }

    // 登入失敗
    console.log('登入失敗');
    errorDiv.style.display = 'flex';
    errorDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> 帳號或密碼錯誤，請重新輸入';
    document.getElementById('loginPassword').value = '';
    document.getElementById('loginPassword').focus();

    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 3000);
}

// 基本功能函數
function setLoggedIn(status) {
    if (status) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('loginTime', new Date().toISOString());
    } else {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('loginTime');
    }
}

function showMainContent() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
}

function showLoginPage() {
    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('loginPage').style.display = 'block';
}

function showSuccessMessage(message) {
    alert(message);
}

function logoutFromSystem() {
    if (confirm('確定要登出系統嗎？')) {
        setLoggedIn(false);
        showLoginPage();
        showSuccessMessage('已成功登出系統');
    }
}

// 檢查登入狀態
function checkLoginStatus() {
    if (isLoggedIn()) {
        showMainContent();
    } else {
        showLoginPage();
    }
}

function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

// 啟動倒數計時器
function startCountdown() {
    const targetDate = new Date('2025-12-07T00:00:00');

    function updateCountdown() {
        const now = new Date();
        const timeDifference = targetDate - now;

        if (timeDifference > 0) {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            const daysElement = document.getElementById('days');
            const hoursElement = document.getElementById('hours');
            const minutesElement = document.getElementById('minutes');
            const secondsElement = document.getElementById('seconds');

            if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
            if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
            if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
            if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
        } else {
            const daysElement = document.getElementById('days');
            const hoursElement = document.getElementById('hours');
            const minutesElement = document.getElementById('minutes');
            const secondsElement = document.getElementById('seconds');

            if (daysElement) daysElement.textContent = '00';
            if (hoursElement) hoursElement.textContent = '00';
            if (minutesElement) minutesElement.textContent = '00';
            if (secondsElement) secondsElement.textContent = '00';
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// 學生登入功能
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');

    console.log('學生登入嘗試:', username, password);

    // 檢查 Joyloveyou 登入
    if (username === 'Joyloveyou' && password === 'Joyloveyou') {
        console.log('學生 Joyloveyou 登入成功');
        setLoggedIn(true);
        closeModal('loginModal');
        showSuccessMessage('登入成功！');
        return;
    }

    // 檢查其他學生登入
    const student = students[username];
    if (student && student.password === password) {
        console.log('學生登入成功:', username);
        currentStudent = username;
        setLoggedIn(true);
        closeModal('loginModal');
        showSuccessMessage(`歡迎 ${username}！`);
        return;
    }

    // 登入失敗
    console.log('學生登入失敗');
    errorDiv.style.display = 'flex';
    errorDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> 帳號或密碼錯誤，請重新輸入';
    document.getElementById('password').value = '';
    document.getElementById('password').focus();
}

// 學生登入驗證
function loginStudent() {
    const studentName = document.getElementById('studentName').value;
    const password = document.getElementById('studentPassword').value;
    const errorDiv = document.getElementById('studentLoginError');

    if (!studentName || !password) {
        errorDiv.style.display = 'flex';
        errorDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> 請選擇姓名並輸入密碼';
        return;
    }

    const student = students[studentName];
    if (student && student.password === password) {
        currentStudent = studentName;
        showSuccessMessage(`歡迎 ${studentName}！`);
        
        // 顯示練習選擇區域
        document.getElementById('practiceSelectionCard').style.display = 'block';
        
        // 隱藏登入表單
        document.querySelector('.login-form-card').style.display = 'none';
    } else {
        errorDiv.style.display = 'flex';
        errorDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> 密碼錯誤，請重新輸入';
        document.getElementById('studentPassword').value = '';
        document.getElementById('studentPassword').focus();
    }
}

// 學生登入（別名函數）
function studentLogin() {
    loginStudent();
}

// 更新學生列表
function updateStudentNames() {
    const group = document.getElementById('studentGroup').value;
    const studentSelect = document.getElementById('studentName');
    
    studentSelect.innerHTML = '<option value="">請選擇姓名</option>';
    studentSelect.disabled = !group;
    
    if (group && groupStudents[group]) {
        groupStudents[group].forEach(student => {
            const option = document.createElement('option');
            option.value = student;
            option.textContent = student;
            studentSelect.appendChild(option);
        });
    }
}

// 切換密碼顯示
function togglePassword() {
    const passwordInput = document.getElementById('studentPassword');
    const toggleButton = document.querySelector('.password-toggle i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        toggleButton.className = 'fas fa-eye';
    }
}

// 模態框功能
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// PDF 查看功能
function openPDF(date, type) {
    const modal = document.getElementById('pdfModal');
    const content = document.getElementById('pdfContent');
    const title = document.getElementById('pdfTitle');

    // 設置標題
    title.textContent = `${date} 課程資料`;

    // 根據日期顯示不同的內容
    const pdfContent = getPDFContent(date);
    content.innerHTML = pdfContent;
    
    modal.style.display = 'block';
}

// 獲取 PDF 內容
function getPDFContent(date) {
    const pdfData = {
        '7/26': `
            <div class="pdf-content">
                <h3>7月26日 課程內容</h3>
                <div class="pdf-section">
                    <h4>📚 今日課程重點</h4>
                    <ul>
                        <li>基礎詞彙練習</li>
                        <li>發音規則複習</li>
                        <li>句型結構練習</li>
                    </ul>
                </div>
                <div class="pdf-section">
                    <h4>📝 練習作業</h4>
                    <ul>
                        <li>完成詞彙練習冊第1-10頁</li>
                        <li>背誦今日新單字</li>
                        <li>預習下週課程內容</li>
                    </ul>
                </div>
            </div>
        `,
        '8/2': `
            <div class="pdf-content">
                <h3>8月2日 課程內容</h3>
                <div class="pdf-section">
                    <h4>📚 今日課程重點</h4>
                    <ul>
                        <li>進階詞彙學習</li>
                        <li>語法結構分析</li>
                        <li>閱讀理解練習</li>
                    </ul>
                </div>
                <div class="pdf-section">
                    <h4>📝 練習作業</h4>
                    <ul>
                        <li>完成閱讀練習題</li>
                        <li>複習語法重點</li>
                        <li>準備下週測驗</li>
                    </ul>
                </div>
            </div>
        `,
        '8/23': `
            <div class="pdf-content">
                <h3>8月23日 課程內容</h3>
                <div class="pdf-section">
                    <h4>📚 今日課程重點</h4>
                    <ul>
                        <li>綜合能力評估</li>
                        <li>模擬測驗練習</li>
                        <li>弱點分析與改進</li>
                    </ul>
                </div>
                <div class="pdf-section">
                    <h4>📝 練習作業</h4>
                    <ul>
                        <li>完成模擬測驗</li>
                        <li>檢討錯誤題目</li>
                        <li>加強弱點練習</li>
                    </ul>
                </div>
            </div>
        `,
        '9/13': `
            <div class="pdf-content">
                <h3>9月13日 課程內容</h3>
                <div class="pdf-section">
                    <h4>📚 今日課程重點</h4>
                    <ul>
                        <li>高級詞彙學習</li>
                        <li>寫作技巧訓練</li>
                        <li>口語表達練習</li>
                    </ul>
                </div>
                <div class="pdf-section">
                    <h4>📝 練習作業</h4>
                    <ul>
                        <li>完成寫作練習</li>
                        <li>練習口語表達</li>
                        <li>預習下週內容</li>
                    </ul>
                </div>
            </div>
        `,
        '9/27': `
            <div class="pdf-content">
                <h3>9月27日 課程內容</h3>
                <div class="pdf-section">
                    <h4>📚 今日課程重點</h4>
                    <ul>
                        <li>考試技巧指導</li>
                        <li>時間管理訓練</li>
                        <li>心理素質培養</li>
                    </ul>
                </div>
                <div class="pdf-section">
                    <h4>📝 練習作業</h4>
                    <ul>
                        <li>練習考試技巧</li>
                        <li>模擬考試環境</li>
                        <li>調整學習心態</li>
                    </ul>
                </div>
            </div>
        `,
        '10/18': `
            <div class="pdf-content">
                <h3>10月18日 課程內容</h3>
                <div class="pdf-section">
                    <h4>📚 今日課程重點</h4>
                    <ul>
                        <li>重點詞彙複習</li>
                        <li>常見錯誤分析</li>
                        <li>答題策略指導</li>
                    </ul>
                </div>
                <div class="pdf-section">
                    <h4>📝 練習作業</h4>
                    <ul>
                        <li>重點詞彙背誦</li>
                        <li>錯誤題目重做</li>
                        <li>策略練習應用</li>
                    </ul>
                </div>
            </div>
        `,
        '11/1': `
            <div class="pdf-content">
                <h3>11月1日 課程內容</h3>
                <div class="pdf-section">
                    <h4>📚 今日課程重點</h4>
                    <ul>
                        <li>最後衝刺準備</li>
                        <li>重點題型練習</li>
                        <li>信心建立訓練</li>
                    </ul>
                </div>
                <div class="pdf-section">
                    <h4>📝 練習作業</h4>
                    <ul>
                        <li>重點題型練習</li>
                        <li>建立考試信心</li>
                        <li>調整最佳狀態</li>
                    </ul>
                </div>
            </div>
        `,
        '11/15': `
            <div class="pdf-content">
                <h3>11月15日 課程內容</h3>
                <div class="pdf-section">
                    <h4>📚 今日課程重點</h4>
                    <ul>
                        <li>模擬考試進行</li>
                        <li>成績分析檢討</li>
                        <li>最後調整指導</li>
                    </ul>
                </div>
                <div class="pdf-section">
                    <h4>📝 練習作業</h4>
                    <ul>
                        <li>完成模擬考試</li>
                        <li>檢討考試結果</li>
                        <li>最後衝刺準備</li>
                    </ul>
                </div>
            </div>
        `,
        '11/22': `
            <div class="pdf-content">
                <h3>11月22日 課程內容</h3>
                <div class="pdf-section">
                    <h4>📚 今日課程重點</h4>
                    <ul>
                        <li>考試前最後準備</li>
                        <li>心理狀態調整</li>
                        <li>考試注意事項</li>
                    </ul>
                </div>
                <div class="pdf-section">
                    <h4>📝 練習作業</h4>
                    <ul>
                        <li>放鬆心情準備</li>
                        <li>檢查考試用品</li>
                        <li>保持最佳狀態</li>
                    </ul>
                </div>
            </div>
        `,
        '11/29': `
            <div class="pdf-content">
                <h3>11月29日 課程內容</h3>
                <div class="pdf-section">
                    <h4>📚 今日課程重點</h4>
                    <ul>
                        <li>考試後檢討</li>
                        <li>成績分析討論</li>
                        <li>未來學習規劃</li>
                    </ul>
                </div>
                <div class="pdf-section">
                    <h4>📝 練習作業</h4>
                    <ul>
                        <li>檢討考試表現</li>
                        <li>分析學習成果</li>
                        <li>規劃未來學習</li>
                    </ul>
                </div>
            </div>
        `
    };

    return pdfData[date] || `
        <div class="pdf-content">
            <h3>${date} 課程資料</h3>
            <p>此日期的課程資料正在準備中，敬請期待。</p>
        </div>
    `;
}

// 練習功能
function openPracticeModal(areaType) {
    currentStudent = areaType;
    const modal = document.getElementById('practiceModal');
    const title = document.getElementById('practiceTitle');

    const areaNames = {
        'magazine': '雜誌單字練習',
        'level': '各級別單字練習'
    };

    title.textContent = areaNames[areaType] || '練習內容';
    modal.style.display = 'block';
}

// 分頁切換功能
function setupTabs() {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function () {
            const targetTab = this.getAttribute('data-tab');

            // 更新分頁狀態
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // 更新內容顯示
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// 點擊模態框外部關閉
function setupModalClose() {
    window.onclick = function (event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    }
}

// 雜誌練習功能
function completeMagazinePractice() {
    showSuccessMessage('練習完成！');
    closeModal('magazineModal');
}

// 成績登記功能
function submitScoreRegistration() {
    const studentName = document.getElementById('studentNameDisplay').textContent;
    const studentGroup = document.getElementById('studentGroupDisplay').textContent;
    const practiceDate = document.getElementById('practiceDate').value;
    const magazineScore = document.getElementById('magazineScore').value;
    const spellingScore = document.getElementById('spellingScore').value;
    const practiceNotes = document.getElementById('practiceNotes').value;

    if (!practiceDate) {
        alert('請選擇練習日期');
        return;
    }

    if (!magazineScore && !spellingScore) {
        alert('請至少輸入一項成績');
        return;
    }

    // 儲存到本地儲存
    const scoreData = {
        studentName: studentName,
        studentGroup: studentGroup,
        practiceDate: practiceDate,
        magazineScore: magazineScore || 0,
        spellingScore: spellingScore || 0,
        practiceNotes: practiceNotes,
        timestamp: new Date().toISOString()
    };

    // 獲取現有記錄
    let existingScores = JSON.parse(localStorage.getItem('practiceScores') || '[]');
    existingScores.push(scoreData);
    localStorage.setItem('practiceScores', JSON.stringify(existingScores));

    // 如果有 Supabase 連接，也儲存到資料庫
    if (window.apiService) {
        try {
            if (magazineScore) {
                window.apiService.saveScore({
                    studentName: studentName,
                    quizType: 'personal_magazine_practice',
                    score: parseInt(magazineScore),
                    totalQuestions: 100,
                    percentage: 0,
                    date: practiceDate,
                    details: { notes: practiceNotes }
                });
            }
            if (spellingScore) {
                window.apiService.saveScore({
                    studentName: studentName,
                    quizType: 'personal_spelling_practice',
                    score: parseInt(spellingScore),
                    totalQuestions: 100,
                    percentage: 0,
                    date: practiceDate,
                    details: { notes: practiceNotes }
                });
            }
        } catch (error) {
            console.error('儲存到資料庫失敗:', error);
        }
    }

    showSuccessMessage('成績儲存成功！');
    closeModal('scoreRegistrationModal');
    loadScoreHistory();
}

// 載入成績歷史
function loadScoreHistory() {
    const historyContainer = document.getElementById('scoreHistory');
    const existingScores = JSON.parse(localStorage.getItem('practiceScores') || '[]');

    if (existingScores.length === 0) {
        historyContainer.innerHTML = '<p class="no-records">尚無成績記錄</p>';
        return;
    }

    const historyHTML = existingScores
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .map(score => `
            <div class="score-record">
                <div class="record-header">
                    <span class="record-date">${score.practiceDate}</span>
                    <span class="record-student">${score.studentName} (${score.studentGroup})</span>
                </div>
                <div class="record-scores">
                    ${score.magazineScore > 0 ? `<span class="score-item">雜誌練習：${score.magazineScore}分</span>` : ''}
                    ${score.spellingScore > 0 ? `<span class="score-item">拼字練習：${score.spellingScore}分</span>` : ''}
                </div>
                ${score.practiceNotes ? `<div class="record-notes">備註：${score.practiceNotes}</div>` : ''}
            </div>
        `)
        .join('');

    historyContainer.innerHTML = historyHTML;
}

// 打開成績登記模態框
function openScoreRegistration() {
    const studentName = currentStudent || '未登入學生';
    const studentGroup = students[currentStudent] ? students[currentStudent].group : '未知組別';

    document.getElementById('studentNameDisplay').textContent = studentName;
    document.getElementById('studentGroupDisplay').textContent = studentGroup;
    document.getElementById('practiceDate').value = new Date().toISOString().split('T')[0];

    openModal('scoreRegistrationModal');
    loadScoreHistory();
}

// 拼字練習功能
function openSpellingPractice() {
    openModal('spellingPracticeModal');
    initializeSpellingPractice();
}

function initializeSpellingPractice() {
    // 初始化拼字練習
    console.log('初始化拼字練習');
}

function goToQuestion() {
    const questionSelect = document.getElementById('questionSelect');
    const questionNumber = parseInt(questionSelect.value);
    console.log('跳轉到第', questionNumber, '題');
}

function submitAnswer() {
    console.log('提交答案');
}

function previousQuestion() {
    console.log('上一題');
}

function nextQuestion() {
    console.log('下一題');
}

function completePractice() {
    showSuccessMessage('練習完成！');
    closeModal('spellingPracticeModal');
}

// 雜誌練習功能
function openMagazinePractice() {
    openModal('magazineSelectionModal');
}

function openVocabularyQuiz(part) {
    closeModal('magazineSelectionModal');
    
    // 根據部分打開對應的練習頁面
    const quizPages = {
        'part1': 'vocabulary_quiz_part1.html',
        'part2': 'vocabulary_quiz_part2.html',
        'part3': 'vocabulary_quiz_part3.html',
        'full': 'vocabulary_quiz_full.html'
    };
    
    if (quizPages[part]) {
        window.open(quizPages[part], '_blank');
    }
}

function closeMagazinePractice() {
    closeModal('magazinePracticeModal');
}

function goToMagazineQuestion() {
    const questionSelect = document.getElementById('magazineQuestionSelect');
    const questionNumber = parseInt(questionSelect.value);
    console.log('跳轉到雜誌第', questionNumber, '題');
}

// 雲端學院功能
function openCloudAcademy() {
    openModal('cloudAcademyModal');
}

function startCloudAcademyPractice() {
    console.log('開始雲端學院練習');
    closeModal('cloudAcademyModal');
}

function startCloudAcademyTimed() {
    console.log('開始雲端學院計時模式');
    closeModal('cloudAcademyModal');
}

// 其他練習功能
function openOtherPractice() {
    openModal('otherPracticeModal');
}

function startOtherPractice(type) {
    console.log('開始其他練習:', type);
    closeModal('otherPracticeModal');
}

// 儲存分數功能
function saveScores() {
    const score1 = document.getElementById('score1').value;
    const score2 = document.getElementById('score2').value;
    const score3 = document.getElementById('score3').value;
    const score4 = document.getElementById('score4').value;
    const score5 = document.getElementById('score5').value;

    if (!score1 && !score2 && !score3 && !score4 && !score5) {
        alert('請至少輸入一項分數');
        return;
    }

    // 儲存到本地儲存
    const scores = {
        studentName: currentStudent,
        date: new Date().toISOString().split('T')[0],
        magazineScore: score1 || 0,
        levelScore: score2 || 0,
        paragraphScore: score3 || 0,
        mixedScore: score4 || 0,
        batchScore: score5 || 0,
        timestamp: new Date().toISOString()
    };

    let existingScores = JSON.parse(localStorage.getItem('studentScores') || '[]');
    existingScores.push(scores);
    localStorage.setItem('studentScores', JSON.stringify(existingScores));

    showSuccessMessage('分數儲存成功！');
    closeModal('practiceModal');
}

// 頁面載入時初始化
document.addEventListener('DOMContentLoaded', function () {
    console.log('AlwaysJoy 教育平台已載入完成！');
    checkLoginStatus();
    startCountdown();
    setupTabs();
    setupModalClose();
});
